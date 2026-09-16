# 友链

欢迎与我交换友链！请先添加本站，再通过邮件或 Telegram 联系我，并附上你的站点信息：

- 站点名称
- 站点地址
- 头像地址
- 一句话简介

确认后我会尽快把好友添加到下面的列表里～

<div id="friends-links" class="not-prose" role="list" aria-label="友链列表"></div>

<style>
/* 友链网格布局 */
#friends-links {
  margin: 20px 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 240px), 1fr));
  gap: 16px;
}

/* 友链卡片图标样式 */
.friend-card .friend-icon {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  flex-shrink: 0;
  position: relative;
  background: var(--btn-card-bg);
  border: 2px solid var(--btn-card-border);
  overflow: hidden;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
  transform-origin: center center;
}

.friend-card:hover .friend-icon {
  transform: scale(1.1);
  border-color: oklch(0.7 0.15 var(--hue));
  box-shadow: 0 4px 14px oklch(0.6 0.15 var(--hue) / 0.3);
}

.friend-card .friend-icon .icon-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, oklch(0.65 0.15 var(--hue)), oklch(0.55 0.18 var(--hue)));
}

.friend-card .friend-icon .icon-img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 80%;
  max-height: 80%;
}
</style>

<script>
(function () {
  // 友链数据：添加或修改友链只需编辑下面的数组
  // 字段说明：name(站点名称) / desc(一句话简介) / url(站点地址) / logo(图标地址)
  const friendLinks = [
  { name: "Inkwell Notes", desc: "我的文档知识库，更新中……", url: "https://docs.ivoinkwell.xyz", logo: "https://docs.ivoinkwell.xyz/apple-touch-icon-167x167.png" },
  { name: "Inkwell Drive", desc: "我的网盘，博客以及文档站文章中出现的附件均可以在网盘中下载", url: "https://drive.ivoinkwell.xyz", logo: "https://ivoinkwell.xyz/favicon/favicon.ico" },
  { name: "Quick Reference", desc: "一个好用的编程知识点速查网站", url: "https://wangchujiang.com/reference/", logo: "https://wangchujiang.com/reference/icons/touch-icon-iphone-retina.png" },
  { name: "Codec", desc: "CTF 编解码网页", url: "https://codec.tools.ivoinkwell.xyz", logo: "https://codec.tools.ivoinkwell.xyz/favicon.svg" },
  { name: "云泽の小屋", desc: "最好的朋友，他的博客是世界上最详细网络安全实践笔记！", url: "https://zeyun.org", logo: "https://zeyun.org/favicon/Happy_Mac.PNG" },
  { name: "猪老师在线", desc: "最有能力的老师，网络安全没人比他讲的更好！", url: "https://www.pigteacher.com", logo: "https://www.pigteacher.com/wp-content/uploads/2025/01/cropped-1-180x180.jpg" },
  { name: "云泽の小屋-网站推荐", desc: "优秀网站的收藏夹", url: "https://zeyun.org/good-web/", logo: "https://zeyun.org/favicon/Happy_Mac.PNG" },
  // { name: "陆某的恋爱小笔记", desc: "不定时吃瓜~", url: "https://luhaorantxm0906.dpdns.org", logo: "https://luhaorantxm0906.dpdns.org/media/website/favicon.ico" },
  { name: "xuan301", desc: "新手必看的Python学习笔记", url: "https://xuan301.ccwu.cc", logo: "https://xuan301.ccwu.cc/images/favicon.ico" },
  ];

  const container = document.getElementById("friends-links");
  if (!container) return;

  friendLinks.forEach((item) => {
    const initial = [...item.name.trim()][0] || "?";
    const card = document.createElement("a");
    card.className =
      "friend-card no-styling card-base group flex items-start gap-4 p-4 hover:bg-[var(--btn-card-bg-hover)] active:bg-[var(--btn-card-bg-active)] active:scale-95";
    card.href = item.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.setAttribute("role", "listitem");
    card.setAttribute("aria-label", `访问 ${item.name} - ${item.desc}`);

    card.innerHTML = `
      <span class="friend-icon">
        <span class="icon-placeholder">${initial}</span>
        <img class="icon-img" src="${item.logo}" alt="${item.name}" loading="lazy" onload="this.previousElementSibling.style.color='transparent'" onerror="this.style.display='none'" />
      </span>
      <span class="flex-1 min-w-0">
        <span class="flex items-center gap-1.5 font-bold text-lg text-90">
          <span class="truncate">${item.name}</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" class="text-30 opacity-0 group-hover:opacity-100 transition flex-shrink-0"><path stroke-linecap="round" stroke-linejoin="round" d="M7 17 17 7M9 7h8v8"/></svg>
        </span>
        <span class="block text-sm text-75 mt-1 line-clamp-2">${item.desc}</span>
      </span>
    `;

    container.appendChild(card);
  });
})();
</script>