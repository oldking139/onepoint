const $imports = require('../art-runtime');module.exports={name:"w.w.art"};module.exports.render=function($data){
'use strict'
$data=$data||{}
var $$out='',$escape=$imports.$escape,$V=$data.$V,navs=$data.navs,$each=$imports.$each,$value=$data.$value,$index=$data.$index,response=$data.response,type=$data.type,url=$data.url,oUrl=$data.oUrl
$$out+="<!DOCTYPE html><html lang=\"zh-CN\"><head><meta charset=\"utf-8\"><meta name=\"github\" content=\"https://github.com/ukuq/onepoint\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1,shrink-to-fit=no\"><link rel=\"shortcut icon\" href=\""
$$out+=$escape($V.site.logo)
$$out+="\"><meta name=\"referrer\" content=\"same-origin\"><link href=\"//cdn.staticfile.org/twitter-bootstrap/4.6.0/css/bootstrap.min.css\" rel=\"stylesheet\"><link href=\"//cdn.staticfile.org/github-markdown-css/4.0.0/github-markdown.min.css\" rel=\"stylesheet\"><title>"
$$out+=$escape($V.site.name)
$$out+="</title><style>a:hover{color:red;text-decoration:none}@media (max-width:768px){#op-list tr>td:nth-child(3),#op-list tr>th:nth-child(3){display:none}}@media (max-width:992px){#op-list tr>td:nth-child(2),#op-list tr>th:nth-child(2){display:none}}.artplayer-app{width:100%;height:45vw}.art-danmuku-emitter,.art-danmuku-theme-dark{display:none!important}</style></head><body><nav class=\"navbar sticky-top navbar-dark bg-dark navbar-expand-lg\"><div class=\"container\"><a href=\"#\" class=\"navbar-brand\"><img src=\""
$$out+=$escape($V.site.logo)
$$out+="\" alt=\"logo\" class=\"d-inline-block align-top\" style=\"width:32px\"> "
$$out+=$escape($V.site.name)
$$out+=" </a></div></nav><div class=\"container mt-3\"><nav id=\"navbar-href\" aria-label=\"breadcrumb\"> "
var navs=$V.navs
$$out+=" <ol class=\"breadcrumb\"> "
$each(navs,function($value,$index){
$$out+=" <li class=\"breadcrumb-item\"><a href=\""
$$out+=$escape($value.href)
$$out+="\">"
$$out+=$escape($index===0?'Home':$value.name)
$$out+="</a></li> "
})
$$out+=" </ol></nav> "
if(response.isList){
$$out+=" <div class=\"border rounded mt-3 table-responsive\"><table class=\"table table-hover mb-0\" id=\"op-list\"><thead class=\"thead-light\"><tr><th>Name</th><th style=\"min-width:220px;width:220px\">Time</th><th class=\"text-right\" style=\"min-width:120px;width:120px\">Size</th></tr></thead><tbody> "
if($V.hasPrev){
$$out+=" <tr><td><a href=\""
$$out+=$escape($V.prevHref)
$$out+="\">👆Previous...</a></td><td></td><td></td></tr> "
}else if($V.hasParent){
$$out+=" <tr><td><a href=\"../\">👈..</a></td><td></td><td></td></tr> "
}
$$out+=" "
$each($V.list,function($value,$index){
$$out+=" <tr><td><a href=\""
$$out+=$escape($V.previewHref($value))
$$out+="\" class=\""
$$out+=$escape($value.type===0?'file':'folder')
$$out+="\">"
$$out+=$escape(($value.type===0?'':'📁') + $value.name)
$$out+="</a></td><td>"
$$out+=$escape($value.time)
$$out+="</td><td class=\"text-right\">"
$$out+=$escape($value.size)
$$out+="</td></tr> "
})
$$out+=" "
if($V.hasNext){
$$out+=" <tr><td><a href=\""
$$out+=$escape($V.nextHref)
$$out+="\">👇Next...</a></td><td></td><td></td></tr> "
}
$$out+=" </tbody></table><script>function formatSize(size) {\r\n                if (size === \"\" || size === \"NaN\") {\r\n                    return \"\";\r\n                }\r\n                size = Number(size);\r\n                let count = 0;\r\n                while (size >= 1024) {\r\n                    //faster than 1000\r\n                    size /= 1024;\r\n                    count++;\r\n                }\r\n                return size.toFixed(2) + [' B', ' KB', ' MB', ' GB', ' TB'][count];\r\n            }\r\n\r\n            function formatDate(str) {\r\n                let oDate = new Date(str);\r\n                if ('Invalid Date' === oDate.toString()) {\r\n                    return \"\";\r\n                }\r\n                let oYear = oDate.getFullYear(),\r\n                    oMonth = oDate.getMonth() < 9 ? \"0\" + (oDate.getMonth() + 1) : (oDate.getMonth() + 1),\r\n                    oDay = oDate.getDate() < 10 ? \"0\" + oDate.getDate() : oDate.getDate(),\r\n                    oHour = oDate.getHours() < 10 ? \"0\" + oDate.getHours() : oDate.getHours(),\r\n                    oMinute = oDate.getMinutes() < 10 ? \"0\" + oDate.getMinutes() : oDate.getMinutes(),\r\n                    oSecond = oDate.getSeconds() < 10 ? \"0\" + oDate.getSeconds() : oDate.getSeconds();\r\n                return oYear + '-' + oMonth + '-' + oDay + \" \" + oHour + \":\" + oMinute + \":\" + oSecond;\r\n            }\r\n\r\n            document.querySelectorAll('#op-list').forEach(e => {\r\n                e.querySelectorAll('tr>td:nth-child(2)').forEach(e => e.textContent = formatDate(e.textContent));\r\n                e.querySelectorAll('tr>td:nth-child(3)').forEach(e => e.textContent = formatSize(e.textContent));\r\n            });</script> "
if($V.isEmpty){
$$out+=" <p style=\"text-align:center\" class=\"mt-2\">Empty Folder!</p> "
}
$$out+=" </div> "
}else if(response.isFile){
$$out+=" "
var type=$V.previewType
$$out+=" "
var url=$V.downloadUrl
$$out+=" "
var oUrl=$V.previewHref($V.file,false)
$$out+=" <div class=\"input-group\"><input type=\"url\" class=\"form-control\" id=\"op-share-url\"><div class=\"input-group-append\"><button type=\"button\" class=\"btn btn-outline-secondary\" id=\"op-share-btn\" data-clipboard-target=\"#op-share-url\" data-clipboard-action=\"cut\">复 制</button> <a type=\"button\" class=\"btn btn-outline-secondary\" href=\""
$$out+=$escape(oUrl)
$$out+="\" target=\"_blank\">下 载</a></div></div><div class=\"border rounded my-3 p-3\" id=\"op-file\"> "
if(type === 'image'){
$$out+=" <img src=\""
$$out+=$escape(url)
$$out+="\" class=\"rounded mx-auto d-block img-fluid\" max-width=\"100%\" alt=\"图片加载失败\"> "
}else if(type === 'video' || $V.file.name.endsWith('.m3u8')){
$$out+=" <div id=\"op-preview-video\" data-url=\""
$$out+=$escape(url)
$$out+="\" source-url=\""
$$out+=$escape(oUrl)
$$out+="\" class=\"artplayer-app\"></div><script src=\"//cdn.staticfile.org/hls.js/1.0.4/hls.min.js\"></script><script src=\"//cdn.staticfile.org/flv.js/1.5.0/flv.min.js\"></script><script src=\"//cdn.staticfile.org/dplayer/1.26.0/DPlayer.min.js\"></script><script src=\"//unpkg.com/artplayer/dist/artplayer.js\"></script><script src=\"//unpkg.com/artplayer-plugin-danmuku/dist/artplayer-plugin-danmuku.js\"></script><script>artElement = document.getElementById('op-preview-video');\r\n        // $(function() {\r\n            window.art = new Artplayer({\r\n            container: '.artplayer-app',\r\n            url: artElement.getAttribute('source-url'),\r\n            autoSize: true,\r\n            fullscreen: true,\r\n            fullscreenWeb: true,\r\n            flip: true,\r\n            playbackRate: true,\r\n            aspectRatio: true,\r\n            setting: true,\r\n            autoMini: true,\r\n            rotate: true,\r\n            hotkey: true,\r\n            pip: true,\r\n            whitelist: ['*'],\r\n            plugins: [\r\n                artplayerPluginDanmuku({\r\n                    danmuku: artElement.getAttribute('source-url').replace(\".flv.mp4\",\".xml\"),\r\n                    speed: 10,\r\n                    opacity: 0.75,\r\n                    fontSize: 25,\r\n                    color: '#FFFFFF',\r\n                    mode: 0,\r\n                    margin: [10, 10],\r\n                    antiOverlap: true,\r\n                    useWorker: true,\r\n                    synchronousPlayback: false,\r\n                    filter: (danmu) => danmu.text.length < 50,\r\n                    lockTime: 5,\r\n                    maxLength: 100,\r\n                    minWidth: 200,\r\n                    maxWidth: 400,\r\n                    theme: 'dark',\r\n                    beforeEmit: (danmu) => !!danmu.text.trim(), \r\n\r\n                }),\r\n            ],\r\n        });\r\n        // 监听准备完成\r\n        art.on('ready', () => {\r\n            console.info('加载完毕');\r\n            console.info(art.autoHeight);\r\n            art.autoHeight = true;\r\n            console.info(art.autoHeight);\r\n            // $(\"div.art-danmuku-emitter.art-danmuku-theme-dark\").remove();\r\n            // (\"div.art-controls-center\").remove;\r\n        });\r\n        // 监听加载到的弹幕数组\r\n        art.on('artplayerPluginDanmuku:loaded', (danmus) => {\r\n            console.info('加载弹幕', danmus.length);\r\n        });\r\n\r\n        // 监听加载到弹幕的错误\r\n        art.on('artplayerPluginDanmuku:error', (error) => {\r\n            console.info('加载错误', error);\r\n        });\r\n\r\n        // 监听弹幕配置变化\r\n        art.on('artplayerPluginDanmuku:config', (option) => {\r\n            console.info('配置变化', option);\r\n        });\r\n\r\n        // 监听弹幕停止\r\n        art.on('artplayerPluginDanmuku:stop', () => {\r\n            console.info('弹幕停止');\r\n        });\r\n\r\n        // 监听弹幕开始\r\n        art.on('artplayerPluginDanmuku:start', () => {\r\n            console.info('弹幕开始');\r\n        });\r\n\r\n        // 监听弹幕隐藏\r\n        art.on('artplayerPluginDanmuku:hide', () => {\r\n            console.info('弹幕隐藏');\r\n        });\r\n\r\n        // 监听弹幕显示\r\n        art.on('artplayerPluginDanmuku:show', () => {\r\n            console.info('弹幕显示');\r\n        });\r\n\r\n        // 监听弹幕销毁\r\n        art.on('artplayerPluginDanmuku:destroy', () => {\r\n            console.info('弹幕销毁');\r\n        });\r\n\r\n        // 防止出现401 token过期\r\n        art.on('error', function() {\r\n            console.log('获取资源错误，开始重新加载！');\r\n            let last = art.currentTime;\r\n            art.url = artElement.getAttribute('source-url');\r\n            art.load();\r\n            art.currentTime = last;\r\n            art.play();\r\n        });\r\n        // 如果是播放状态 & 没有播放完 每25分钟重载视频防止卡死\r\n        setInterval(function() {\r\n            if (!art.video.paused && !art.video.ended) {\r\n                console.log('开始重新加载！');\r\n                let last = art.currentTime;\r\n                art.url = artElement.getAttribute('source-url');\r\n                art.load();\r\n                art.currentTime = last;\r\n                art.play();\r\n            }\r\n        }, 1000 * 60 * 25)\r\n        // });</script> "
}else if(type === 'audio'){
$$out+=" <audio src=\""
$$out+=$escape(url)
$$out+="\" controls autoplay style=\"width:75%\" class=\"rounded mx-auto d-block\"></audio> "
}else if(type === 'office'){
$$out+=" <ul style=\"margin:0\"><li><a target=\"_blank\" href=\"https://view.officeapps.live.com/op/view.aspx?src="
$$out+=$escape($V.encodeURIComponent(url))
$$out+="\">使用 office apps 预览</a></li><li><a target=\"_blank\" href=\"http://api.idocv.com/view/url?url="
$$out+=$escape($V.encodeURIComponent(url))
$$out+="\">使用 I Doc View 预览</a></li></ul> "
}else if(type==='pdf'){
$$out+=" <div id=\"op-preview-pdf\" data-url=\""
$$out+=$escape(url)
$$out+="\"></div><script src=\"//cdn.staticfile.org/pdfobject/2.2.4/pdfobject.min.js\"></script><script>PDFObject.embed(document.querySelector(\"#op-preview-pdf\").getAttribute(\"data-url\"),\"#op-preview-pdf\")</script> "
}else if(type==='text'){
$$out+=" <pre><code id=\"op-preview-text\" data-url=\""
$$out+=$escape(url)
$$out+="\">loading...</code></pre><link href=\"//cdn.staticfile.org/highlight.js/10.4.1/styles/xcode.min.css\" rel=\"stylesheet\"><script src=\"//cdn.staticfile.org/highlight.js/10.4.1/highlight.min.js\"></script><script>document.querySelectorAll('#op-preview-text').forEach(e => {\r\n                fetch(e.getAttribute('data-url')).then(response => response.ok ? response.text() : Promise.reject(new Error('response error'))).then(data => {\r\n                    e.textContent = data;\r\n                    hljs.highlightBlock(e);\r\n                }).catch(err => e.textContent = \"Oh, \" + err);\r\n            });</script> "
}else if(type==='bigText'){
$$out+=" <p style=\"text-align:center\" class=\"mb-0\">该文本文件太大, 不支持预览 :-(</p> "
}else{
$$out+=" <p style=\"text-align:center\" class=\"mb-0\">此格式("
$$out+=$escape($V.file.mime)
$$out+=")不支持预览 :-(</p> "
}
$$out+=" </div><script src=\"https://cdn.staticfile.org/clipboard.js/2.0.8/clipboard.min.js\"></script><script>document.querySelectorAll('#op-share-url').forEach(e => {\r\n            e.value = new URL('?', window.location).href.slice(0, -1);\r\n            new ClipboardJS('#op-share-btn');\r\n        });</script> "
}else{
$$out+=" "
if($V.hasPassword){
$$out+=" <div class=\"border rounded my-3 pt-3\"><form method=\"post\" class=\"form-inline\"><div class=\"form-group mx-sm-3 mb-2\"><label><input type=\"password\" name=\"password\" class=\"form-control\" placeholder=\""
$$out+=$escape($V.passwordHint)
$$out+="\"></label></div><button type=\"submit\" class=\"btn btn-primary mb-2\">Submit</button></form></div> "
}
$$out+=" <div class=\"border rounded my-3 p-3\"><div>"
$$out+=$escape(response.message)
$$out+="</div><pre><code>"
$$out+=$escape($V.jsonData)
$$out+="</code></pre></div> "
}
$$out+=" <div class=\"card mt-3\"><div class=\"card-header\">README</div><div class=\"card-body markdown-body\" id=\"op-readme\" data-url=\""
$$out+=$escape($V.readmeUrl)
$$out+="\">"
$$out+=$escape($V.readme)
$$out+="</div><script src=\"https://cdn.staticfile.org/marked/2.0.3/marked.min.js\"></script><script>document.getElementById(\"op-readme\").innerHTML=marked(document.getElementById(\"op-readme\").textContent)</script> "
if($V.readmeUrl){
$$out+=" <script>document.querySelectorAll('#op-readme').forEach(e => fetch(e.getAttribute('data-url')).then(response => response.ok ? response.text() : Promise.reject(new Error('response error'))).then(data => e.innerHTML = marked(data)).catch(err => e.innerHTML = \"Oh, \" + err));</script> "
}
$$out+=" </div><div class=\"text-right py-3 pl-3\"><a class=\"text-muted\" target=\"_blank\" href=\"https://github.com/oldking139/onepointS\">Just One Point S.</a> <a class=\"text-muted ml-2\" href=\""
$$out+=$escape($V.refreshHref)
$$out+="\">Cache "
$$out+=$escape($V.cacheTime?'Hit':'Miss')
$$out+=".</a></div> "
$$out+=$V.site.html
$$out+=" </div></body></html>"
return $$out
}