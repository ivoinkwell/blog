import type { FriendLink, FriendsPageConfig } from "../types/friendsConfig";

// 可以在src/content/spec/friends.md中编写友链页面下方的自定义内容

// 友链页面配置
export const friendsPageConfig: FriendsPageConfig = {
	// 页面标题，如果留空则使用 i18n 中的翻译
	title: "",

	// 页面描述文本，如果留空则使用 i18n 中的翻译
	description: "",

	// 是否显示底部自定义内容（friends.mdx 中的内容）
	showCustomContent: true,

	// 是否显示评论区，需要先在commentConfig.ts启用评论系统
	showComment: true,

	// 是否开启随机排序配置，如果开启，就会忽略权重，构建时进行一次随机排序
	randomizeSort: false,
};

// 友链配置
export const friendsConfig: FriendLink[] = [
	{
		title: "夏夜流萤",
		imgurl:
			"https://weavatar.com/avatar/d252655d40d6874417a720bad0a6c5f77f8f6a1fd2f882f8f338402dc37e4190?s=640",
		desc: "飞萤之火自无梦的长夜亮起，绽放在终竟的明天。",
		siteurl: "https://blog.cuteleaf.cn",
		tags: ["Blog"],
		weight: 8, // 权重，数字越大排序越靠前
		enabled: false, // 是否启用
	},
	{
		title: "Firefly Docs",
		imgurl: "https://docs-firefly.cuteleaf.cn/logo.png",
		desc: "Firefly主题模板文档",
		siteurl: "https://docs-firefly.cuteleaf.cn",
		tags: ["Docs"],
		weight: 9,
		enabled: false,
	},
	{
		title: "Astro",
		imgurl: "https://avatars.githubusercontent.com/u/44914786?v=4&s=640",
		desc: "The web framework for content-driven websites. ⭐️ Star to support our work!",
		siteurl: "https://github.com/withastro/astro",
		tags: ["Framework"],
		weight: 8,
		enabled: false,
	},
	{
		title: "个人主页",
		imgurl:"https://ivoinkwell.xyz/favicon/apple-touch-icon-180x180.png",
		desc: "我的个人主页，欢迎与我联系",
		siteurl: "https://ivoinkwell.xyz",
		tags: ["Homepage"],
		weight: 10, // 权重，数字越大排序越靠前
		enabled: true, // 是否启用
	},
	{
		title: "Inkwell Notes",
		imgurl:"https://docs.ivoinkwell.xyz/apple-touch-icon-167x167.png",
		desc: "我的文档知识库，持续更新中……",
		siteurl: "https://docs.ivoinkwell.xyz",
		tags: ["Docs"],
		weight: 9, // 权重，数字越大排序越靠前
		enabled: true, // 是否启用
	},
	{
		title: "云泽の小屋",
		imgurl:"https://zeyun.org/favicon/Happy_Mac.PNG",
		desc: "朋友，最详细网络安全实践笔记",
		siteurl: "https://zeyun.org",
		tags: ["Blog"],
		weight: 9, // 权重，数字越大排序越靠前
		enabled: true, // 是否启用
	},
	{
		title: "猪老师在线",
		imgurl:"https://www.pigteacher.com/wp-content/uploads/2025/01/cropped-1-180x180.jpg",
		desc: "我的老师，网络安全专家",
		siteurl: "https://www.pigteacher.com",
		tags: ["Blog"],
		weight: 9, // 权重，数字越大排序越靠前
		enabled: true, // 是否启用
	},
	{
		title: "Codec",
		imgurl:"https://codec.tools.ivoinkwell.xyz/favicon.svg",
		desc: "自制CTF编解码网页",
		siteurl: "https://codec.tools.ivoinkwell.xyz",
		tags: ["Tools"],
		weight: 8, // 权重，数字越大排序越靠前
		enabled: false, // 是否启用
	},
	{
		title: "Quick Reference",
		imgurl:"https://wangchujiang.com/reference/icons/touch-icon-iphone-retina.png",
		desc: "一个好用的编程知识点速查网站",
		siteurl: "https://wangchujiang.com/reference/",
		tags: ["Tools"],
		weight: 7, // 权重，数字越大排序越靠前
		enabled: true, // 是否启用
	},
];

// 获取启用的友链并进行排序
export const getEnabledFriends = (): FriendLink[] => {
	const friends = friendsConfig.filter((friend) => friend.enabled);

	if (friendsPageConfig.randomizeSort) {
		return friends.sort(() => Math.random() - 0.5);
	}

	return friends.sort((a, b) => b.weight - a.weight);
};
