import fs from "node:fs";
import path from "node:path";
import { h } from "hastscript";
import { visit } from "unist-util-visit";

/**
 * 内部文章卡片（::post{slug="..."} 指令）
 * 用法：::post{slug="specks/use-tailscale-instead-of-openvpn"}
 * slug 为文章相对 src/content/posts/ 的路径（不含扩展名）
 *
 * 实现说明：构建时直接从文件系统读取文章 frontmatter（不依赖 astro:content，
 * 避免在 markdown 渲染管线内调用内容集合 API 导致校验冲突）。
 * 封面图：dev 下用 /src/content/posts/...（Vite 直接服务），
 * 生产用 /posts/...（原图由 astro.config.mjs 的 vite 插件复制到 dist）。
 */

const POSTS_ROOT = path.resolve(import.meta.dirname, "../content/posts");

const isDev = import.meta.env?.DEV;
const coverBase = isDev ? "/src/content/posts" : "/posts";

// 缓存：slug -> frontmatter
const fmCache = new Map();

function parseFrontmatter(md) {
	const fm = md.match(/^---\n([\s\S]*?)\n---/);
	if (!fm) return {};
	const body = fm[1];
	const get = (key) => {
		const m = body.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
		return m ? m[1].trim() : undefined;
	};
	const unquote = (s) => (s ? s.replace(/^["']|["']$/g, "") : s);
	const tagsMatch = body.match(/^tags:\s*\[([^\]]*)\]/m);
	const tags = tagsMatch
		? tagsMatch[1]
				.split(",")
				.map((s) => unquote(s.trim()))
				.filter(Boolean)
		: [];
	return {
		title: unquote(get("title")),
		published: get("published"),
		description: unquote(get("description")),
		image: unquote(get("image")),
		tags,
	};
}

function readPostFm(slug) {
	if (fmCache.has(slug)) return fmCache.get(slug);
	const mdPath = path.join(POSTS_ROOT, slug, "index.md");
	let fm = null;
	if (fs.existsSync(mdPath)) {
		fm = parseFrontmatter(fs.readFileSync(mdPath, "utf8"));
	}
	fmCache.set(slug, fm);
	return fm;
}

function formatDate(date) {
	const d = new Date(date);
	if (Number.isNaN(d.getTime())) return "";
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function rehypePostCard() {
	return (tree) => {
		const postNodes = [];
		visit(tree, (node) => {
			if (node.tagName === "post") {
				postNodes.push(node);
			}
		});

		for (const node of postNodes) {
			const slug = node.properties?.slug ? String(node.properties.slug) : "";
			const fm = slug ? readPostFm(slug) : null;

			if (!slug || !fm || !fm.title) {
				Object.assign(
					node,
					h(
						"div",
						{ class: "hidden" },
						`Invalid post directive. ("${slug}" not found)`,
					),
				);
				continue;
			}

			// 封面图：image 形如 "./cover.png"，生成稳定 URL
			let coverUrl = "";
			if (fm.image) {
				const imgRel = fm.image.replace(/^\.\//, "");
				coverUrl = `${coverBase}/${slug}/${imgRel}`;
			}

			const tags = (fm.tags || []).slice(0, 3);

			const children = [];
			if (coverUrl) {
				children.push(
					h("div", {
						class: "pc-cover",
						style: `background-image:url('${coverUrl}')`,
					}),
				);
			}

			const meta = [];
			const dateStr = formatDate(fm.published);
			if (dateStr) {
				meta.push(h("span", { class: "pc-date" }, dateStr));
			}
			for (const t of tags) {
				meta.push(h("span", { class: "pc-tag" }, t));
			}

			const body = [h("div", { class: "pc-title" }, fm.title)];
			body.push(h("div", { class: "pc-meta" }, meta));
			if (fm.description) {
				body.push(h("div", { class: "pc-desc" }, fm.description));
			}
			children.push(h("div", { class: "pc-body" }, body));

			Object.assign(
				node,
				h(
					"a",
					{
						class: "post-card no-styling",
						href: `/posts/${slug}/`,
					},
					children,
				),
			);
		}
	};
}
