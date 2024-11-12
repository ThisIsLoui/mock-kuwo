<h1 align="center">
  <a href="https://github.com/ThisIsLoui/mock-kuwo">
    <img src="public/logo.png" alt="Logo" width="50" height="50">
  </a>
  <br/>
  React Kuwo Music Website Clone
</h1>

<div align="center">
  Kuwo Music is a famous Chinese Music Platform. This is a clone of its webite in Desktop version. The data is sourced from the Kuwo Music API.
  <br />
  ⭐Please star if intersted. Thank you for your support!⭐
  <br />
  <br />
  <a href="http://mock-kuwo.dynv6.net/">👉👉Clike me to view demo👈👈</a>
  <a href="./README-ZH.md">点此查看中文文档</a>
</div>

<div align="center">
<br />

[![license](https://img.shields.io/github/license/ThisIsLoui/mock-kuwo?style=flat-square)](LICENSE)
[![made with hearth by Loui](https://img.shields.io/badge/made%20with%20%E2%99%A5%20by-Loui-fce53f.svg?style=flat-square)](https://github.com/ThisIsLoui)
[![github repo star](https://img.shields.io/github/stars/ThisIsLoui/mock-kuwo)](https://github.com/ThisIsLoui)

</div>

# 🎉 Introduction

![Project Picture](public/preview_1.png)

"React Kuwo Music Website Clone" is an open-source React project that replicates all main pages and most features of the Kuwo Music PC website. All data is synchronized from the official Kuwo Music API. It supports playing songs and MVs (only free content, no hacks). The project includes a complete music player logic with features like scrolling lyrics, previous/next track, single loop, playlist loop, sequential play, and volume adjustment. Users can also view rankings, search for songs/albums/playlists/MVs/artists, check details, and retrieve relevant comments.

This project is written in TypeScript and uses the following tech stack:

- Base Framework: React
- Bundler: Vite
- Styling: CSS Modules + SCSS + classnames
- Routing: React Router
- State Management: Redux (with Toolkit) + Redux Persist
- Network Requests: RTK Query + Axios
- Frontend Standardization: Eslint + Prettier + Stylelint + husky + lint-staged + commitlint
- Other Libraries Used: swiper、react-icons、react-paginate、react-use-audio-player、video.js、ahooks, etc.

> If you're interested in this project, feel free to star!🤪 Your support really means a lot to me.

# ⚡ Quick Start

**Clone the Repositary**

```bash
git clone https://github.com/ThisIsLoui/mock-kuwo.git
```

**Install Dependencies**

```bash
npm i
```

**Preview the website using development mode**

```bash
npm run dev
```

**Build the website using production mode**

```bash
npm run build
```

> Note: This project uses commitlint to standardize `git commit`.
> 
> For further development, please install commitizen globally first.
> 
> ```bash
> npm install -g commitizen
> ```
> 
> Then, use  `cz`  instead of `git commit` to make commits. The project already has the cz-git adapter installed, which will automatically be used as the commit message standard.

**Deploy the website to the server**

Please check this tutorial for more information: [《React 之仿酷我音乐 - docker + nginx + 宝塔面板部署前端项目并配置跨域》](https://juejin.cn/post/7361204571827437620) 

# 🌐 About the API

The APIs in this project are collected and organized from publicly available endpoints on the Kuwo Music website. For details on which APIs are used, please [check this API document](https://mock-kuwo.apifox.cn/).

**These APIs may not always be accessible. If you find that any APIs have become invalid and the website content cannot be fetched or displayed properly, please feel free to open an issue to notify me.**

You can also check [this passage](https://blog.csdn.net/u012981972/article/details/131717687) for more information.

> When making requests to the Kuwo Music website API, you need to configure a proxy for cross-origin requests in advance; otherwise, the requests will not work properly.
> 
> I have already configured the proxy for cross-origin requests in the development environment in vite.config.ts, so when previewing the website using `npm run dev` , there won't be any issues with API requests due to cross-origin restrictions.
> 
> These configurations will not take effect in the production environment. Therefore, when deploying the website to your own server, you will need to handle the proxy for cross-origin requests yourself. If you are using nginx, you can copy the relevant content from the [deployment tutorial](https://juejin.cn/post/7361204571827437620) for the configuration.

# 💫 Routes List

**`/`: Homepage Recommendations**

![Homepage Recommendations](public/preview_1.png)

**`/rankList`: Rank List**

![Rank List](public/preview_2.png)

**`/singerList`: Singer List**

![Singer List](public/preview_3.png)

**`/playList`: Play List**

![Play List](public/preview_4.png)

**`/mvList`: MV List**

![MV List](public/preview_5.png)

**`/singer/:id`: Singer Details_Single**

![Singer Details_Single](public/preview_6.png)

**`/singer/:id/album`: Singer Details_Album**

![Singer Details_Album](public/preview_7.png)

**`/singer/:id/mv`: Singer Details_MV**

![Singer Details_MV](public/preview_8.png)

**`/singer/:id/info`: Singer Details_Info**

![Singer Details_Info](public/preview_9.png)

**`/album/:id`: Album Details**

![Album Details](public/preview_10.png)

**`/play/:id`: Play Details**

![Play Details](public/preview_12.png)

**`/song/:id`: Song Details**

![Song Details](public/preview_11.png)

**`/mvplay/:id`: MV Details**

![MV Details](public/preview_13.png)

**`/search?key=xxx&type=xx`: Search**

![Search](public/preview_14.png)

Route|Description
-------------|-------------
/|Homepage Recommendations
/rankList|Rank List
/singerList|Singer List
/playList|Play List
/mvList|MV List
/singer/:id/|Singer Details_Single
/singer/:id/album|Singer Details_Album
/singer/:id/mv|Singer Details_MV
/singer/:id/info|Singer Details_Info
/album/:id|Album Details
/play/:id|Play Details
/song/:id|Song Details
/mvplay/:id|MV Details
/search?key=xxx&type=xx|Search

# 📖 License

This project uses **GPL v3**. See [LICENSE](/LICENSE) for more information.

# 📢 Disclaimer

All images and APIs used in this project and the demo website are collected and organized from publicly available online content, and are for educational and research purposes only. They must not be used for commercial purposes. No individual or organization is allowed to use them for illegal activities; any consequences arising from such use will be at their own risk.