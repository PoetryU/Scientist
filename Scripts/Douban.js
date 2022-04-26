/*
Douban Movie Add-ons for Surge by Neurogram

modified Poet

 - 豆瓣电影移动版网页增强
 - 快捷跳转 茶杯狐、奈菲影视、555电影 搜索
 - 快捷收藏电影至 Airtable

使用说明

[Script]

Surge4.0:
茶杯狐、奈菲影视、555电影
http-response ^https://m.douban.com/movie/subject/.+ script-path=https://sci.poetyin.com/Public/Scripts/Douban.js,requires-body=true,max-size=307200

Airtable 收藏
http-request ^https://m.douban.com/movie/subject/.+\?seen=\d script-path=https://sci.poetyin.com/Public/Scripts/Douban.js

QX1.0.0:
茶杯狐、奈菲影视、555电影
^https://m.douban.com/movie/subject/.+ url script-response-body https://sci.poetyin.com/Public/Scripts/Douban.js

Airtable 收藏
^https://m.douban.com/movie/subject/.+\?seen=\d url script-request-body https://sci.poetyin.com/Public/Scripts/Douban.js
[MITM]
hostname = m.douban.com

收藏功能，需自行修改代码，点击 想看 / 看过 触发收藏
*/

let url = $request.url
let movieId = url.match(/subject\/(\d+)/)
let seen = url.match(/\?seen=(\d)$/)
let collect = false  //收藏功能，默认关闭，需自行配置
if (!seen) {
    let body = $response.body
    let title = body.match(/"sub-title">([^<]+)/)
    if (title) {

        let mweb = `<a href="https://www.cupfox.com/search?key=${title[1]}"><img src="https://files.catbox.moe/c8vszl.png" height="25" width="34.78" style="vertical-align: text-top;" /></a>
        <a href="https://www.nfmovies.com/search.php?searchword=${title[1]}"><img src="https://files.catbox.moe/gog93l.png" height="25" width="20.11" style="vertical-align: text-top;" /></a>
<a href="https://www.o8tv.com/index.php/vod/search.html?wd=${title[1]}&submit="><img src="https://files.catbox.moe/27bzxu.png" height="25" width="25" style="vertical-align: text-top;" /></a>`

        body = body.replace(/("sub-title">.+?)(<\/div>)/, `$1${mweb}$2`)

        if (collect) {
            body = body.replace(/<a.+pbtn.+wish.+>/, `<a href="${url}?seen=0">`)
            body = body.replace(/<a.+pbtn.+collect.+>/, `<a href="${url}?seen=1">`)
        }

        $done({ body })
    } else {
        $done({})
    }
} else {
    let options = {
        url: `https://frodo.douban.com/api/v2/movie/${movieId[1]}?apiKey=0ac44ae016490db2204ce0a042db2916`,
        headers: {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.3(0x18000323) NetType/WIFI Language/en",
            "Referer": "https://servicewechat.com/wx2f9b06c1de1ccfca/82/page-frame.html"
        }
    }
    $httpClient.get(options, function (error, response, data) {
        let info = JSON.parse(data)
        if (error) {
            $notification.post('获取影片信息失败', error, "");
        } else if (data.msg == "movie_not_found") {
            $notification.post('豆瓣电影', data.msg, "");
        } else {
            let casts = ""
            for (var i = 0; i < info.casts.length; i++) {
                casts = casts + info.casts[i].name + " / "
            }
            let directors = ""
            for (var k = 0; k < info.directors.length; k++) {
                directors = directors + info.directors[k].name + " / "
            }
            let title = info.title + "  " + info.original_title
            let table = {
                url: "https://api.airtable.com/v0/BASE_ID/Douban",
                headers: {
                    Authorization: "API_KEY"
                },
                body: {
                    records: [
                        {
                            "fields": {
                                "Title": title,
                                "Description": info.summary,
                                "Poster": [
                                    {
                                        "url": info.images.large
                                    }
                                ],
                                "Seen": seen[1] == 1 ? true : false,
                                "Actors": casts.replace(/\s\/\s$/, ""),
                                "Director": directors.replace(/\s\/\s$/, ""),
                                "Genre": info.genres.toString(),
                                "Douban": "https://movie.douban.com/subject/" + movieId[1],
                                "Rating": info.rating.average,
                                "Year": info.year
                            }
                        }
                    ]
                }
            }
            $httpClient.post(table, function (error, response, data) {
                data = JSON.parse(data)
                if (error) {
                    $notification.post('收藏失败', error, "");
                } else if (data.records) {
                    $notification.post('豆瓣电影', title + " 收藏成功", "");
                } else {
                    $notification.post('收藏失败', data.error.type, data.error.message);
                }
            })
        }
    })
    $done({ url: url.replace(/\?seen=\d/, "") })
}
