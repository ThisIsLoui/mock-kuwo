# 路由

/                             首页推荐
/rankList                     排行榜
/singerList                   歌手列表
/playList                     歌单列表
/mvList                       MV列表

/album/:id                    专辑详情(使用 Detail 组件)
/play/:id                     歌单详情(使用 Detail 组件)
/song/:id                     歌曲详情(使用 Detail 组件)
/mvplay/:id                   MV详情
/singer/:id/                  歌手详情_单曲
/singer/:id/album             歌手详情_专辑
/singer/:id/mv                歌手详情_MV
/singer/:id/info              歌手详情_简介

/search?key=xxx&type=xx       搜索

docker run --name kuwo-nginx -p 5688:5688 -v /www/kuwo-nginx/nginx.conf:/etc/nginx/nginx.conf -v /www/kuwo-nginx/logs:/var/log/nginx -v /www/wwwroot/mock-kuwo/dist:/www/wwwroot/mock-kuwo/dist -d nginx:latest