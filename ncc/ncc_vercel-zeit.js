/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 667:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

function __ncc_wildcard$0 (arg) {
  if (arg === "alidrive") return __nccwpck_require__(893);
  else if (arg === "coding") return __nccwpck_require__(795);
  else if (arg === "googledrive") return __nccwpck_require__(583);
  else if (arg === "node_fs") return __nccwpck_require__(53);
  else if (arg === "onedrive") return __nccwpck_require__(714);
  else if (arg === "phony") return __nccwpck_require__(582);
  else if (arg === "teambition") return __nccwpck_require__(822);
}
function __ncc_wildcard$1 (arg) {
  if (arg === "simple.art") return __nccwpck_require__(136);
  else if (arg === "w.w.art") return __nccwpck_require__(255);
  else if (arg === "w.w") return __nccwpck_require__(155);
}
const op = __nccwpck_require__(146);
const app = __nccwpck_require__(329);

const { MODULES, THEMES } = __nccwpck_require__(936);

const { modules, themes } = op;

MODULES.forEach((k) => {
    modules[k] = __ncc_wildcard$0(k);
});

THEMES.forEach((k) => {
    themes[k] = __ncc_wildcard$1(k);
});

const header = __nccwpck_require__(543);
const template = __nccwpck_require__(755);
const admin = __nccwpck_require__(783);
const invokeModule = __nccwpck_require__(639);
const logger = __nccwpck_require__(309);

// fake koa app
app.use(header);
app.use(template);
app.use(admin);
app.use(__nccwpck_require__(452));
app.use(__nccwpck_require__(726));
app.use(__nccwpck_require__(645));
app.use(invokeModule);

module.exports = {
    initialize(starter) {
        op.initialize(starter);
    },
    async _handle(req) {
        if (op.config.version === -1) {
            // ? 代表未加载设置，尝试加载，若加载失败自动使用默认配置
            await op.readConfig();
        }
        return app.handleRequest(req).then(({ response }) => {
            if (typeof response.status !== 'number' || typeof response.headers !== 'object' || typeof response.body !== 'string') {
                throw new Error('Internal Response Error');
            }
            return response;
        });
    },
    async handleRequest(req) {
        return this._handle(req).catch((err) => {
            // 这一步遇到的错误一般都是请求类错误 格式错误 无法解析之类的
            logger.error(err);
            return {
                status: 500,
                headers: {
                    'access-control-allow-origin': '*',
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ error: 'InternalError', message: err.message }),
            };
        });
    },
};


/***/ }),

/***/ 936:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

// 系统配置参数,运行时只读
const config = {
    PORT: process.env.PORT || 8020,
    NODE_ENV: 'production',

    SIGN_DELIMITER: '.',
    PAGE_SIZE: 200,

    ID_SIGN_LEN: 7,
    PAGE_SIGN_LEN: 7,

    CACHE_TIME_FILE: 15 * 60 * 1000,
    CACHE_TIME_LIST: 30 * 60 * 1000,

    AC_PASS_FILE: '.password=',

    PATH_ADMIN: '/admin/',
    PATH_API: '/api/',
    PATH_DOWN: '/down:',
    PATH_SHARE: '/s/',

    THEMES: ['w.w.art', 'simple.art'],
    MODULES: ['node_fs', 'onedrive', 'coding', 'teambition', 'googledrive', 'alidrive', 'phony'],
};

const configTemplate = {
    html: '<div>这是一段自定义html，你也可以在这里放置一些脚本文件</div>',
    logo: 'https://cdn.onesrc.cn/uploads/images/onepoint_30.png',
    name: 'DemoSite',
    readme: `## 部署成功

恭喜部署成功，但这并不意味着系统能使用了

接下来，你需要进入 [admin](/admin/) 页面，完成一些必须的配置

要注意，某些平台的配置参数，可能需要你在平台上自行配置

配置完成后，就可以添加云盘了
`,
    cors: ['*'],
    proxy: [],
    theme: config.THEMES[0],
    share_aeskey: 'password_len==16',
};
config.configTemplate = configTemplate;

const { _P } = __nccwpck_require__(792);

const commonSParams = [
    _P('theme', '', '', 8, config.THEMES, false, false),
    _P('logo', '', '', 6, 'consume your own logo', false, false),
    _P('name', '', '', 6, 'consume your site name', false, false),
    _P('html', '', '', 6, 'embed html code', true, false),
    _P('readme', '', '', 6, 'markdown supported', true, false),
    _P('proxy', [], 'proxy for download', 4, '', false, false),
    _P('cors', [], 'Allow CORS', 4, '', false, false),
    _P('share_aeskey', 'password_len==16', 'share link encryption key', 4, '', true, false),
];
commonSParams.forEach((e) => {
    e.value = configTemplate[e.name];
});
config.commonSParams = commonSParams;

const commonMParams = [
    _P('path', '', '', 8, 'mount path', false, true),
    _P('module', '', '', 8, config.MODULES, false, true),
    _P('password', '', '', 2, 'drive password', false, false),
    _P('readme', '', '', 2, 'markdown supported', true, false),
    // _P('desc', '', '', 2, 'short desc', false, false),
    _P('hidden', [], '當前想要隱藏的文件或文件夾，例如 /images/today, /video/something.mp4', 2, '', false, false),
];
config.commonMParams = commonMParams;

config.getAdminHtml = function (baseURL, version) {
    return `<!DOCTYPE html><html lang="en"><head><script>window.opConfigVersion=${version};window.opConfig=${JSON.stringify({
        baseURL,
        PATH_ADMIN: config.PATH_ADMIN,
        PATH_API: config.PATH_API,
    })}</script><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="referrer" content="same-origin"><link rel="icon" href="https://cdn.onesrc.cn/uploads/images/onepoint_30.png"><title>Just One Point</title><link href="https://cdn.jsdelivr.net/gh/ukuq/onepoint-vue@v210503/dist/static/css/app.820c0513.css" rel="preload" as="style"><link href="https://cdn.jsdelivr.net/gh/ukuq/onepoint-vue@v210503/dist/static/css/chunk-elementUI.6e808e7d.css" rel="preload" as="style"><link href="https://cdn.jsdelivr.net/gh/ukuq/onepoint-vue@v210503/dist/static/css/chunk-libs.1fd47c5d.css" rel="preload" as="style"><link href="https://cdn.jsdelivr.net/gh/ukuq/onepoint-vue@v210503/dist/static/js/app.1397f3a6.js" rel="preload" as="script"><link href="https://cdn.jsdelivr.net/gh/ukuq/onepoint-vue@v210503/dist/static/js/chunk-elementUI.46046ffc.js" rel="preload" as="script"><link href="https://cdn.jsdelivr.net/gh/ukuq/onepoint-vue@v210503/dist/static/js/chunk-libs.e78b2083.js" rel="preload" as="script"><link href="https://cdn.jsdelivr.net/gh/ukuq/onepoint-vue@v210503/dist/static/css/chunk-elementUI.6e808e7d.css" rel="stylesheet"><link href="https://cdn.jsdelivr.net/gh/ukuq/onepoint-vue@v210503/dist/static/css/chunk-libs.1fd47c5d.css" rel="stylesheet"><link href="https://cdn.jsdelivr.net/gh/ukuq/onepoint-vue@v210503/dist/static/css/app.820c0513.css" rel="stylesheet"></head><body><noscript><strong>We're sorry but this app doesn't work properly without JavaScript enabled. Please enable it to continue.</strong></noscript><div id="app"></div><script>(function(e){function t(t){for(var n,i,l=t[0],p=t[1],a=t[2],c=0,s=[];c<l.length;c++)i=l[c],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&s.push(o[i][0]),o[i]=0;for(n in p)Object.prototype.hasOwnProperty.call(p,n)&&(e[n]=p[n]);f&&f(t);while(s.length)s.shift()();return u.push.apply(u,a||[]),r()}function r(){for(var e,t=0;t<u.length;t++){for(var r=u[t],n=!0,l=1;l<r.length;l++){var p=r[l];0!==o[p]&&(n=!1)}n&&(u.splice(t--,1),e=i(i.s=r[0]))}return e}var n={},o={runtime:0},u=[];function i(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=n,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(r,n,function(t){return e[t]}.bind(null,n));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="https://cdn.jsdelivr.net/gh/ukuq/onepoint-vue@v210503/dist/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],p=l.push.bind(l);l.push=t,l=l.slice();for(var a=0;a<l.length;a++)t(l[a]);var f=p;r()})([]);</script><script src="https://cdn.jsdelivr.net/gh/ukuq/onepoint-vue@v210503/dist/static/js/chunk-elementUI.46046ffc.js"></script><script src="https://cdn.jsdelivr.net/gh/ukuq/onepoint-vue@v210503/dist/static/js/chunk-libs.e78b2083.js"></script><script src="https://cdn.jsdelivr.net/gh/ukuq/onepoint-vue@v210503/dist/static/js/app.1397f3a6.js"></script></body></html>`;
};

module.exports = config;


/***/ }),

/***/ 329:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { RTError, cookie2Str, query2Obj } = __nccwpck_require__(792);

class AppRequest {
    constructor({ method, path, headers, body, query, cookies, baseURL, ip }) {
        // UpperCase
        this.method = method;

        // parse path, path is just path,not url
        this.path = decodeURIComponent(/^[^?]+/.exec(path)[0]);

        this.headers = headers;

        // parse body, stream is not supposed
        this.body = typeof body === 'object' ? body : {};
        if (method === 'POST' && typeof body === 'string' && headers['content-type']) {
            if (headers['content-type'].includes('application/x-www-form-urlencoded')) {
                this.body = query2Obj(body);
            } else if (headers['content-type'].includes('application/json')) {
                this.body = JSON.parse(body);
            }
        }

        // parse query, object or like ?a=1&b=2 or a=1&b=2 or /a/b?aa
        this.query = typeof query === 'string' ? query2Obj(query[0] === '/' ? /^[^?]+(.*)$/.exec(query)[1] : query) : query;

        // parse cookie
        this.cookies = cookies ? cookies : headers.cookie ? query2Obj(headers.cookie.replace(/;\s/g, '&')) : {};

        // empty or like https://example.com or https://example.com/sub
        if (baseURL) {
            this.baseURL = baseURL;
            const p0 = new URL(baseURL).pathname;
            this.baseURLP0 = p0.endsWith('/') ? p0.slice(0, -1) : p0;
        } else {
            this.baseURL = 'https://' + headers.host;
            this.baseURLP0 = '';
        }
        this.ip = ip;
    }
}

class AppResponse {
    constructor() {
        this.headers = { 'content-type': 'text/html; charset=utf-8' };
        this.body = '[Default Message]';
        this.update(200);
    }

    update(status, type = '', data = { message: 'success' }) {
        this.status = status;
        this.type = type;
        this.data = data;
    }

    get isPlain() {
        return this.type === '';
    }

    get isFile() {
        return this.type === 'file';
    }

    get isFolder() {
        return this.type === 'folder';
    }

    get isList() {
        return this.type === 'list';
    }

    get isRaw() {
        return this.type === 'raw';
    }

    addCookie(name, value, options) {
        if (!this.headers['set-cookie']) {
            this.headers['set-cookie'] = [];
        }
        this.headers['set-cookie'].push(cookie2Str(name, value, options));
    }
}

class AppContext {
    constructor(request) {
        this.request = new AppRequest(request);
        this.response = new AppResponse();
        this.state = { level: 0, time: Date.now(), p1: '', p2: '/' };
    }

    get path() {
        return this.state.p1 + this.state.p2;
    }

    throw(status, msg, properties) {
        throw new RTError(status, msg, properties);
    }

    assert(value, status, message, properties) {
        if (!value) {
            this.throw(status, message, properties);
        }
    }

    respond(status, data = 'success') {
        if (typeof data === 'string') {
            this.response.update(status, '', { message: data });
        } else {
            this.response.update(status, '', data);
        }
    }

    respondList(list, nextToken = null) {
        this.response.update(200, 'list', { list, nextToken });
    }

    respondOne(item, down = null) {
        if (item.type === 0) {
            this.response.update(200, 'file', { file: item });
            this.response.down = down;
        } else {
            this.response.update(200, 'folder', { folder: item });
        }
    }

    respondRaw(status, headers = {}, body) {
        headers['content-type'] = headers['content-type'] || 'text/html; charset=utf-8';
        this.response.update(status, 'raw', '[raw object]');
        this.response.headers = headers;
        this.response.body = body;
    }

    redirect(url, always = false) {
        if (url.startsWith('&')) {
            const { path, query, baseURL } = this.request;
            url = baseURL + encodeURI(path) + '?' + new URLSearchParams(Object.assign({}, query, query2Obj(url))).toString();
        } else if (url.startsWith('?')) {
            const { path, baseURL } = this.request;
            url = baseURL + encodeURI(path) + url;
        } else if (!url.startsWith('//') && url.startsWith('/')) {
            url = this.request.baseURL + encodeURI(url);
        }
        const headers = this.response.headers;
        headers.Location = url;
        headers['content-type'] = 'text/html; charset=utf-8';
        headers['referrer-policy'] = 'same-origin'; // ali-drive none referrer
        this.respondRaw(always ? 301 : 302, headers, `Redirecting to <a href="${url}">${url}</a>.`);
    }

    addCookie(name, value, options) {
        if (this.request.baseURLP0 && options && options.path) {
            options.path = this.request.baseURLP0 + options.path;
        }
        this.response.addCookie(name, value, options);
    }
}

module.exports = {
    middleware: [],
    use(fn) {
        if (typeof fn === 'function' && !this.middleware.includes(fn)) {
            this.middleware.push(fn);
        }
        return this;
    },
    async handleRequest(req) {
        const ctx = new AppContext(req);
        const middleware = this.middleware;
        await (async function useMiddleware(ctx, index) {
            if (index < middleware.length) {
                return middleware[index](ctx, async () => useMiddleware(ctx, index + 1));
            }
        })(ctx, 0);
        return ctx;
    },
};


/***/ }),

/***/ 146:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const sysConfig = __nccwpck_require__(936);
const logger = __nccwpck_require__(309);
const { _sha1, NumberUtil, RTError, beautifyObject } = __nccwpck_require__(792);
const packageInfo = __nccwpck_require__(306);
module.exports = {
    modules: {},
    themes: {},
    handleRequest: null,
    server: {
        version: packageInfo.version,
        version2: packageInfo.version2,
    },
    initialize(starter) {
        this.runtime = {
            time_start: Date.now(),
            time_read: null,
            time_save: null,
            error_read: null,
            error_write: null,
        };
        this.starter = starter;
        this.loadConfig({ version: -1 });
    },

    get params() {
        return (this.starter.params || []).concat(sysConfig.commonSParams);
    },

    get privateModuleParams() {
        return Object.entries(this.modules).reduce((o, [k, m]) => {
            o[k] = typeof m.params === 'function' ? m.params() : m.params || [];
            return o;
        }, {});
    },

    get needConfig() {
        return this.config.version === 1;
    },

    loadConfig(config) {
        config = config || {};
        config.site = Object.assign({}, sysConfig.configTemplate, config.site);
        config.drives = config.drives || {};
        config.users = config.users || { admin: { password: 'admin' } };
        config.starter = config.starter || {};
        config.version = config.version || 1;

        const root = { $config: {}, $path: '/', next: {}, $cache: {} };

        Object.entries(config.drives).forEach(([path, c]) => {
            const m = this.modules[c.module];
            if (m) {
                let p = root;
                for (const i of path.split('/').filter((e) => e)) {
                    if (!p.next[i]) {
                        p.next[i] = { $config: {}, $path: p.$path + i + '/', next: {}, $cache: {} };
                    }
                    p = p.next[i];
                }
                p.$config = c;
                p.$module = m;
            } else {
                logger.warn('no such module: ' + path + ' ' + c.module);
            }
        });

        this.root = root;
        this.config = config;
        this.salt = config.salt || '';
    },

    async readConfig() {
        logger.debug('read config...');
        this.runtime.time_read = Date.now();
        this.runtime.error_read = null;
        return this.starter
            .readConfig()
            .catch((e) => {
                this.runtime.error_read = e;
                logger.warn('read config... err:' + this.runtime.time_read);
                logger.warn(e);
                throw new RTError(500, 'ReadError', { msg: e.message });
            })
            .then((d) => {
                logger.debug('read config... ok');
                this.loadConfig(d);
            });
    },

    // @Todo 后续可以考虑使用version解决 nowsh 异步保存的问题
    async saveConfig(msg = '') {
        logger.debug('save config...');
        this.runtime.time_save = Date.now();
        this.runtime.last_save = msg;
        this.runtime.error_write = null;
        const copy = beautifyObject(this.config);
        copy.versionLast = copy.version;
        copy.version = Date.now();
        return await this.starter
            .writeConfig(copy, copy.starter)
            .then((m) => {
                logger.debug('save config... ok');
                this.config.version = copy.version;
                this.config.versionLast = copy.versionLast;
                this.salt = copy.salt;
                return m || 'success';
            })
            .catch((err) => {
                this.runtime.error_write = err;
                logger.error('save config... err:' + this.runtime.time_save);
                throw new RTError(500, 'SaveError', { msg: err.message });
            });
    },

    sign(text, hours = 24, len = 16) {
        const time = NumberUtil.to62(Math.floor(Date.now() / 1000 / 3600 + hours));
        return time + _sha1(this.salt + time + text).slice(0, len - 4);
    },
    verify(text, sign, len = 16) {
        const time = NumberUtil.parse62(sign.slice(0, 4)) * 3600 * 1000;
        return time > Date.now() && sign.slice(4) === _sha1(this.salt + sign.slice(0, 4) + text).slice(0, len - 4);
    },

    signUser(name) {
        const { password } = this.config.users[name];
        return name + '.' + this.sign('$' + name + '.' + password + '$', 24);
    },
    verifyUser(token) {
        const [n, s] = token.split('.');
        const user = this.config.users[n];
        return user && this.verify('$' + n + '.' + user.password + '$', s) && n;
    },

    deepestNode(path) {
        let p = this.root;
        for (const i of path.split('/').filter((e) => e)) {
            if (p.next[i]) {
                p = p.next[i];
            } else {
                return p;
            }
        }
        return p;
    },

    // 设置p1 p2 $node, 调用模块前必须调用此函数以确认调用哪一个
    parsePathBeforeInvoke(ctx, path) {
        const node = this.deepestNode(path);
        const p1 = node.$path.slice(0, -1);
        ctx.assert(path.startsWith(p1), 400, 'InvalidRequestPath', { path, format: p1 + '**' });
        const p2 = path.slice(node.$path.length - 1);
        ctx.$node = node;
        ctx.state.p1 = p1;
        ctx.state.p2 = p2;
    },
};


/***/ }),

/***/ 452:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const logger = __nccwpck_require__(309);
const op = __nccwpck_require__(146);
const { AC_PASS_FILE } = __nccwpck_require__(936);

/**
 * @errors [Unauthorized,ItemNotExist]
 */
module.exports = async (ctx, next) => {
    const { hidden, password } = ctx.$node.$config;
    if (ctx.state.level === 0) {
        // hidden file
        if (hidden && hidden.length > 0) {
            ctx.assert(!hidden.find((e) => ctx.state.p2.startsWith(e)), 404, 'ItemNotExist', { path: ctx.state.p1 + ctx.state.p2 });
        }
        // drive-pass
        if (password) {
            checkPass(ctx, 'drive_pass', password, ctx.state.p1 + '/');
        }
    }

    await next();

    if (ctx.state.level === 0 && ctx.response.isList) {
        // hidden list item
        if (hidden && hidden.length > 0) {
            const p2 = ctx.state.p2;
            const h = hidden.map((e) => (e.startsWith(p2) ? e.slice(p2.length) : null)).filter((e) => e && !e.includes('/'));
            if (h.length > 0) {
                ctx.response.data.list = ctx.response.data.list.filter((e) => !h.includes(e.name));
            }
        }

        // list-pass
        const o = ctx.response.data.list.reduce(
            (o, e) => {
                if (e.name.startsWith(AC_PASS_FILE)) {
                    o[0].push(e.name.slice(AC_PASS_FILE.length));
                } else {
                    o[1].push(e);
                }
                return o;
            },
            [[], []]
        );
        ctx.response.data.list = o[1];
        if (o[0].length > 0) {
            checkPass(ctx, 'list_pass', o[0], ctx.state.p1 + ctx.state.p2);
        }
    }
};

function checkPass(ctx, name, pass, path) {
    const { cookies, body, method, query } = ctx.request;

    let type = 'empty';
    const uname = name.toUpperCase();
    if (cookies[uname]) {
        type = 'expired';
        if (op.verify(uname + path, cookies[uname])) {
            logger.log('use cookie:' + cookies[uname]);
            return;
        }
    }

    if (method === 'POST' && (body[name] || body.password)) {
        type = 'wrong';
        // 可以使用通用字段password，也可以用对应的专用字段name
        const uPass = body[name] || body.password;
        if (uPass === pass || (Array.isArray(pass) && pass.includes(uPass))) {
            // 单个云盘登录
            logger.log('use pass:' + uPass);
            ctx.addCookie(uname, op.sign(uname + path, 24 * 31), { path, maxAge: 3600 * 24 * 30 });
            return;
        }
    }

    // 分享专用
    if (method === 'GET' && query[name]) {
        type = 'invalid';
        if (op.verify(uname + path, query[name])) {
            ctx.addCookie(uname, op.sign(uname + path, 24 * 31), { path, maxAge: 3600 * 24 * 30 });
            return;
        }
    }

    ctx.throw(401, 'Unauthorized', { field: name, type });
}


/***/ }),

/***/ 783:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const logger = __nccwpck_require__(309);
const sysConfig = __nccwpck_require__(936);
const op = __nccwpck_require__(146);
const SimpleRouter = __nccwpck_require__(678);
const { P } = __nccwpck_require__(792);
const { beautifyObject } = __nccwpck_require__(792);
const CryptoJS = __nccwpck_require__(616);

const { PATH_API, PATH_ADMIN, PATH_DOWN, PATH_SHARE, SHARE_ENCRYPT_AESKEY } = sysConfig;

const api_router = new SimpleRouter();
api_router.setDefault((ctx) => {
    ctx.throw(400, 'UnsupportedAPI', { path: ctx.request.path });
});

function equalsObj(a, b) {
    return JSON.stringify(beautifyObject(a)) === JSON.stringify(beautifyObject(b));
}

function paramsCopy(params, src) {
    if (!src) {
        return {};
    }
    const c = {};
    params.forEach(({ name }) => {
        if (src[name]) {
            c[name] = src[name];
        }
    });
    return c;
}

async function versionCheckAndLazySave(a, f, v, ctx) {
    if (!op.needConfig && equalsObj(a[0], a[1])) {
        logger.info('Nothing Changed, Lazy Save');
        ctx.respond(200, { message: 'Nothing Changed', version: op.config.version });
    } else {
        ctx.assert(v === op.config.version, 400, 'InvalidVersion', { version: op.config.version });
        f();
        ctx.respond(200, { message: await op.saveConfig(), version: op.config.version });
    }
}

// 读写基本配置
api_router.get('config/basic', async (ctx) => {
    const params = op.params;
    if (op.needConfig) {
        [
            P('admin_salt', String(Math.random()), '签名salt，仅限输入一次，以后不可更改', 9, '', false, false),
            P('admin_pass', 'admin', '密码', 9, '', false, true),
            P('admin_name', 'admin', '用户名，仅限输入一次，以后不可更改', 9, '', false, true),
        ].forEach((e) => params.unshift(e));
    }

    ctx.respond(200, {
        basic: Object.assign({}, paramsCopy(sysConfig.commonSParams, op.config.site), paramsCopy(op.starter.params, op.config.starter)),
        params: params,
        version: op.config.version,
    });
});

api_router.post('config/basic', async (ctx) => {
    const { basic, version } = ctx.request.body;
    const c0 = paramsCopy(sysConfig.commonSParams, basic);
    const c1 = paramsCopy(op.starter.params, basic);
    const flag = op.needConfig;
    await versionCheckAndLazySave(
        [
            [op.config.site, op.config.starter],
            [c0, c1],
        ],
        () => {
            if (op.config.version === 1) {
                op.config.salt = basic.admin_salt;
                const users = {};
                users[basic.admin_name] = { password: basic.admin_pass };
                op.config.users = users;
            }
            op.config.site = c0;
            op.config.starter = c1;
        },
        version,
        ctx
    );
    if (flag) {
        ctx.response.data.token = op.signUser(basic.admin_name);
    }
});

// 获取所有的云盘信息，增加乐观锁，弥补token不能识别多处登录的问题
api_router.get('config/drives', async (ctx) => {
    ctx.respond(200, {
        drives: op.config.drives,
        moduleParams: sysConfig.commonMParams,
        privateModuleParams: op.privateModuleParams,
        version: op.config.version,
    });
});

// 如果要删除一个盘，需要传递一个空值，否则不执行删除操作
api_router.post('config/drives', async (ctx) => {
    const copy = beautifyObject(op.config.drives);
    const { drives, version } = ctx.request.body;
    Object.entries(drives).forEach(([p, c]) => {
        if (!c) {
            delete copy[p];
        } else {
            copy[p] = paramsCopy(sysConfig.commonMParams, c);
            const m = op.modules[c.module];
            copy[p].config = m ? paramsCopy(typeof m.params === 'function' ? m.params() : m.params, c.config) : {};
        }
    });
    await versionCheckAndLazySave(
        [op.config.drives, copy],
        () => {
            op.config.drives = copy;
            op.loadConfig(op.config);
        },
        version,
        ctx
    );
});

api_router.post('config/export', async (ctx) => {
    const u = op.config.users[ctx.state.user];
    ctx.assert(ctx.request.body.password === u.password, 400, 'InvalidUserAuth', { user: ctx.state.user });
    ctx.respond(200, { config: op.config });
});

// 整体导入的配置 不再检验version的有效性
api_router.post('config/import', async (ctx) => {
    const u = op.config.users[ctx.state.user];
    const { config, password } = ctx.request.body;
    ctx.assert(password === u.password, 400, 'InvalidUserAuth', { user: ctx.state.user });
    await versionCheckAndLazySave(
        [op.config, config],
        () => {
            op.loadConfig(config);
        },
        op.config.version,
        ctx
    );
});

// 修改密码
api_router.post('user/password', async (ctx) => {
    const u = op.config.users[ctx.state.user];
    const { password0, password, version } = ctx.request.body;
    ctx.assert(password0 === u.password, 400, 'InvalidUserAuth', { user: ctx.state.user });
    await versionCheckAndLazySave(
        [u.password, password],
        () => {
            // change password
            u.password = password;
        },
        version,
        ctx
    );
});

api_router.get('system/runtime', async (ctx) => {
    ctx.respond(200, { runtime: op.runtime, version: op.config.version });
});

api_router.get('system/reload', async (ctx) => {
    op.config.version = -1;
    ctx.respond(200);
});

api_router.prefix('file:', async (ctx, next, path) => {
    const m = ctx.request.method;
    const b = ctx.request.body;
    const $data = (ctx.$data = {});
    b.path && (path = b.path);
    ctx.assert(path, 400, 'InvalidRequestParam', { expect: ['path'] });
    if (m === 'GET') {
        $data.command = 'ls';
    } else if (m === 'DELETE') {
        $data.command = 'rm';
    } else if (m === 'POST') {
        const c = ($data.command = b.command);
        if (c === 'mkdir' || c === 'ren' || c === 'touch' || c === 'upload') {
            ctx.assert(($data.name = b.name), 400, 'InvalidRequestParam', { expect: ['name'] });
            if (c === 'touch') {
                const { content, base64 } = b;
                ctx.assert(content !== undefined || base64, 400, 'InvalidRequestParam', { expect: ['content||base64'] });
                $data.mime = b.mime || 'text/plain';
                if (content) {
                    $data.content = Buffer.from(content, 'utf-8');
                } else if (base64) {
                    // base64
                    $data.content = Buffer.from(base64, 'base64');
                }
            }
        } else if (c === 'mv' || c === 'cp') {
            const { desPath } = b;
            ctx.assert(path !== desPath && op.deepestNode(path) === op.deepestNode(desPath), 400, 'InvalidRequestParam', { expect: ['desPath'] });
            $data.desPath = desPath.slice(op.deepestNode(desPath).$path.length - 1);
        } else {
            ctx.throw(400, 'InvalidRequestParam', { expect: ['command'] });
        }
    }
    op.parsePathBeforeInvoke(ctx, path);
    await next();
});

const router = new SimpleRouter();

router.prefix(PATH_ADMIN, async (ctx, _, path) => {
    if (path === '') {
        ctx.respondRaw(200, {}, sysConfig.getAdminHtml(ctx.request.baseURL, op.config.version));
    } else {
        ctx.assert(ctx.state.level > 0, 401, 'Unauthorized', {
            field: 'admin-token',
            type: 'login please',
        });
    }
});
router.prefix(PATH_API, async (ctx, next, path) => {
    if (path === 'login') {
        const { username, password } = ctx.request.body;
        const u = op.config.users[username];
        ctx.assert(u && password && u.password === password, 400, 'InvalidUserAuth', { username });
        const token = op.signUser(username);
        ctx.addCookie('X_TOKEN', token, { path: '/' });
        ctx.respond(200, { token, version: op.config.version });
    } else if (path === 'public/site') {
        ctx.respond(200, {
            site: op.config.site,
            drives: Object.entries(op.config.drives).map(([path, { readme = '' }]) => ({ path, readme })),
            version: op.server.version,
            version2: op.server.version2,
        });
    } else {
        ctx.assert(op.needConfig || ctx.state.level > 0, 401, 'UnauthorizedToken', { token: null });
        await api_router.handle(ctx, next, path);
    }
});
router.prefix(PATH_DOWN, async (ctx, next, path) => {
    ctx.$data = { command: 'download' };
    op.parsePathBeforeInvoke(ctx, path);
    await next();
});
router.prefix(PATH_SHARE, async (ctx, next, path) => {
    decodeEncPart = (encBase64, key) => {
        // console.log(encBase64);
        const encRaw = CryptoJS.enc.Base64.parse(encBase64.replace(/_/g, '/').replace(/-/g, '+'));
        // console.log(encRaw.toString());
        const iv = CryptoJS.enc.Hex.parse(encRaw.toString().slice(0, 32)); // first 16 bytes
        // console.log(iv.toString());
        const encData = CryptoJS.enc.Hex.parse(encRaw.toString().slice(32)); // remaining
        // console.log(encData.toString());
        //const iv =  CryptoJS.enc.Hex.parse('00000000000000000000000000000000');
        const rawkey =  CryptoJS.enc.Utf8.parse(key);
        // console.log(encData.toString());
        const aesDecryptor = CryptoJS.algo.AES.createDecryptor(rawkey, { iv: iv }); // aes-128-cbc
        let decData = aesDecryptor.finalize(encData);
        let decString = CryptoJS.enc.Utf8.stringify(decData);
        return decString;
    }    
    let path_parts = path.split('/');
    encryptedBase64 = path_parts.pop();
    param = decodeEncPart(encryptedBase64, op.config.site.share_aeskey);
    console.log("Decoded encrypted part: " + param);
    param = JSON.parse(param);
    if (param.gen === undefined || param.exp === undefined || param.path === undefined) {
        ctx.throw(400, 'Invalid Encrypted Param');
    }
    if (Date.now() / 1000 > param.gen + param.exp) {
        ctx.throw(401, 'Share Link Expired');
    }
    
    path_parts.push(param.path);
    new_path = '/' + path_parts.join('/');
    console.log("newpath: " + new_path);
    ctx.state.level = 1;
    
    ctx.state.html = true;
    ctx.$data = { command: 'ls' };
    op.parsePathBeforeInvoke(ctx, new_path);
    await next();
});
router.setDefault(async (ctx, next) => {
    ctx.state.html = ctx.request.headers.accept !== 'application/json';
    ctx.state.useCache = ctx.request.query.refresh === undefined;
    ctx.$data = { command: 'ls' };
    op.parsePathBeforeInvoke(ctx, ctx.request.path);
    await next();
});

module.exports = async (ctx, next) => {
    const { cookies, path, headers } = ctx.request;
    const token = headers['x-token'] || cookies.X_TOKEN;
    if (token) {
        const user = op.verifyUser(token);
        if (user) {
            ctx.state.user = user;
            ctx.state.level = 1;
        } else {
            ctx.addCookie('X_TOKEN', '', { path: '/' });
            ctx.throw(401, 'UnauthorizedToken', { token });
        }
    }
    await router.handle(ctx, next, path);
};


/***/ }),

/***/ 645:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const logger = __nccwpck_require__(309);
const { RTError } = __nccwpck_require__(792);
const { CACHE_TIME_FILE, CACHE_TIME_LIST } = __nccwpck_require__(936);
module.exports = async (ctx, next) => {
    const path = ctx.state.p1 + ctx.state.p2;
    // use cache
    if (ctx.state.useCache) {
        const m = oneCache.getMsg(path, ctx.$data.page);
        if (m) {
            logger.info('cache hit');
            if (m.list) {
                ctx.respondList(m.list, m.nextToken);
            } else if (m.one) {
                ctx.respondOne(m.one, m.down);
            }
            ctx.response.data.cached = m.time;
            return;
        }
    }

    await next();

    if (ctx.response.isList) {
        const d = ctx.response.data;
        oneCache.addList(path, d.list, d.nextToken, ctx.$data.page);
    } else if (ctx.response.isFile) {
        oneCache.addOne(path, ctx.response.data.file, ctx.response.down);
    } else if (ctx.response.isFolder) {
        oneCache.addOne(path, ctx.response.data.folder);
    }
};

class OneCache {
    constructor() {
        this.root = { next: {} };
    }

    addList(path, list, nextToken, page = 0) {
        const p = this.getNode(path, true);
        const oNext = p.next;
        const next = {};
        const time = Date.now();
        list.forEach((e) => {
            next[e.name] = {
                value: e,
                next: oNext[e.name] ? oNext[e.name].next : {},
                time: e.url || e.type !== 0 ? time : 0,
            };
        });
        p.next = next;

        if (page || nextToken) {
            // 一锅炖不下
            if (!p.pages) {
                p.pages = {};
            }
            const t = { list, nextToken, listTime: Date.now() };
            t.time = t.listTime;
            p.pages[page] = t;
        } else {
            p.listTime = Date.now();
        }
    }

    addOne(path, item, down = null) {
        const p = this.getNode(path, true);
        p.value = item;
        p.down = down ? JSON.stringify(down) : null;
        p.time = Date.now();
    }

    getNode(path, addIfAbsent) {
        let p = this.root;
        for (const i of path.split('/').filter((e) => e)) {
            if (!p.next[i]) {
                if (!addIfAbsent) {
                    return;
                }
                p.next[i] = { next: {} };
            }
            p = p.next[i];
        }
        return p;
    }

    getMsg(path, page = 0) {
        const p = this.getNode(path);
        if (!p) {
            return;
        }

        if (path.endsWith('/')) {
            if ((p.listTime || 0) > Date.now() - CACHE_TIME_LIST) {
                return { list: Object.values(p.next).map((e) => e.value), time: p.listTime };
            }
            if (p.pages && p.pages[page] && p.pages[page].listTime > Date.now() - CACHE_TIME_LIST) {
                return p.pages[page];
            }
            if (p.value && p.value.type === 0) {
                throw new RTError(400, 'ItemIsFile');
            }
        } else {
            if ((p.time || 0) > Date.now() - CACHE_TIME_FILE) {
                return { one: p.value, down: p.down ? JSON.parse(p.down) : null, time: p.time };
            }
        }
    }

    drop(path = '/') {
        if (path.endsWith('/')) {
            path = path.slice(0, -1);
        }
        const pPath = path.slice(0, path.lastIndexOf('/'));
        if (pPath === '') {
            this.root = { next: {} };
            return;
        }
        const pp = this.getNode(pPath);
        if (!pp) {
            return;
        }
        const name = path.slice(path.lastIndexOf('/') + 1);
        delete pp.next[name];
        delete pp.pages;
    }
}

const oneCache = new OneCache();


/***/ }),

/***/ 543:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const logger = __nccwpck_require__(309);
const op = __nccwpck_require__(146);

module.exports = async (ctx, next) => {
    const { method, path, query, headers, ip } = ctx.request;
    logger.log(method + ' ' + path + ' ' + new URLSearchParams(query).toString() + ' ' + ip);
    // OPTIONS method for CORS
    if (method === 'OPTIONS') {
        // @Todo origin检查
        ctx.respondRaw(
            204,
            {
                'access-control-allow-methods': 'GET,POST,PUT,PATCH,TRACE,DELETE,HEAD,OPTIONS',
                'access-control-allow-headers': 'content-type,content-range,x-token',
                'access-control-max-age': '86400',
                'access-control-allow-origin': headers.origin || '*',
            },
            ''
        );
        return;
    }

    if (path === '/favicon.ico') {
        ctx.redirect(op.config.site.logo);
        ctx.response.status = 301;
        return;
    }

    await next();

    // allow * temporarily
    if (checkCors(headers.origin, op.config.site.cors)) {
        ctx.response.headers['access-control-allow-origin'] = '*';
    }
};

function checkCors(origin, cors) {
    if (!origin) {
        return true;
    }
    if (cors) {
        return cors.includes('*') || cors.includes(origin);
    } else {
        return false;
    }
}


/***/ }),

/***/ 639:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const logger = __nccwpck_require__(309);
const op = __nccwpck_require__(146);
const { ID_SIGN_LEN } = __nccwpck_require__(936);
const { mime } = __nccwpck_require__(792);

function signId(p2, id) {
    // 1-10年有效期, 纯粹是为了让生成的签名不那么一样
    return id + op.sign(p2 + id, Math.floor(Math.random() * 78840) + 8760, ID_SIGN_LEN);
}

function verifyId(p2, id, ctx) {
    if (id) {
        // verify id
        const oid = id.slice(0, id.length - ID_SIGN_LEN);
        if (oid && op.verify((p2.endsWith('/') ? p2.slice(0, -1) : p2) + oid, id.slice(id.length - ID_SIGN_LEN), ID_SIGN_LEN)) {
            ctx.$data.id = oid;
        } else {
            ctx.throw(403, 'InvalidId', { id });
        }
    }
}

/**
 * @errors [CommandNotAllowed,ItemNotExist,InvalidId]
 */
module.exports = async (ctx) => {
    const node = ctx.$node;
    const cmd = ctx.$data.command;
    const p2 = (ctx.$data.path = ctx.state.p2);
    if (p2 === '') {
        ctx.assert(cmd === 'ls', 403, 'CommandNotAllowed', { command: cmd });
        const p1 = ctx.state.p1;
        ctx.respondOne({
            type: 3,
            name: p1.slice(p1.lastIndexOf('/') + 1) || '$root',
            size: null,
            mime: '',
            time: new Date().toISOString(),
        });
    } else if (node.$module) {
        verifyId(p2, ctx.request.query.id, ctx);
        logger.log('use: ' + node.$config.module + ', drivePath:' + ctx.state.p1);
        ctx.assert(node.$module[cmd], 403, 'CommandNotAllowed', { command: cmd });
        await node.$module.handle(node.$config.config, ctx.$data, node.$cache, ctx);
    } else {
        ctx.assert(cmd === 'ls', 403, 'CommandNotAllowed', { command: cmd });
        ctx.assert(ctx.state.p2 === '/', 404, 'ItemNotExist', { path: ctx.state.p1 + ctx.state.p2 });
        ctx.respondList([]);
    }

    if (ctx.response.isList) {
        const list = ctx.response.data.list;
        list.forEach((e) => {
            if (e.id) {
                e.id = signId(p2 + e.name, e.id);
            }
            if (e.mime === undefined) {
                e.mime = e.type === 0 ? mime.get(e.name) : '';
            }
        });
        if (ctx.state.p2 === '/') {
            Object.keys(node.next).forEach((e) =>
                list.push({
                    type: 3,
                    name: e,
                    size: null,
                    mime: '',
                    time: new Date().toISOString(),
                })
            );
        }
        // sort
        list.sort((e1, e2) => e2.type - e1.type || e1.name.localeCompare(e2.name));
    } else if (ctx.response.isFile) {
        const e = ctx.response.data.file;
        if (e.id) {
            // 文档有要求,返回file时,必须为规范路径
            e.id = signId(p2, e.id);
        }
        // 简化模块代码重复度
        if (e.mime === undefined) {
            e.mime = mime.get(e.name);
        }
    } else if (ctx.response.isFolder) {
        const e = ctx.response.data.folder;
        if (e.id) {
            // 文档有要求,返回file时,必须为规范路径
            e.id = signId(p2, e.id);
        }
        // 简化模块代码重复度
        if (e.mime === undefined) {
            e.mime = '';
        }
    }
};


/***/ }),

/***/ 726:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const logger = __nccwpck_require__(309);
const op = __nccwpck_require__(146);
const { PAGE_SIGN_LEN } = __nccwpck_require__(936);

function signPage(p2, page) {
    return page + op.sign(p2 + page, Math.floor(Math.random() * 78840) + 8760, PAGE_SIGN_LEN);
}

function verifyPage(p2, page, ctx) {
    const oPage = page.slice(0, page.length - PAGE_SIGN_LEN);
    if (oPage && op.verify(p2 + oPage, page.slice(page.length - PAGE_SIGN_LEN), PAGE_SIGN_LEN)) {
        ctx.$data.page = oPage;
        logger.log('page: ' + oPage);
    } else {
        ctx.throw(403, 'InvalidPage', { page });
    }
}

/**
 * @errors [InvalidPage]
 */
module.exports = async (ctx, next) => {
    const page = ctx.request.query.page;
    if (ctx.state.p2.endsWith('/') && page) {
        // verify page
        verifyPage(ctx.state.p2, page, ctx);
    }
    await next();
    if (ctx.response.isList) {
        const data = ctx.response.data;
        if (data.nextToken) {
            data.nextToken = signPage(ctx.state.p2, data.nextToken);
        }
    }
};


/***/ }),

/***/ 755:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const logger = __nccwpck_require__(309);
const op = __nccwpck_require__(146);
const V = __nccwpck_require__(545);
const { RTError } = __nccwpck_require__(792);

module.exports = async (ctx, next) => {
    await next().catch((err) => {
        if (err instanceof RTError) {
            logger.log('request error:' + err.type);
            ctx.respond(err.status, { error: err.type, data: err.data, message: err.message });
        } else {
            logger.error(err.stack);
            ctx.respond(400, { error: 'UnknownError', data: {}, message: err.message });
        }
    });

    if (ctx.response.isRaw) {
        return;
    }

    // 解决缓存引起的 多baseURL下 url不变的问题
    if (ctx.response.isFile && !ctx.response.data.file.url) {
        ctx.response.data.file = Object.assign({}, ctx.response.data.file, { url: ctx.request.baseURL + encodeURI(ctx.state.p1 + ctx.state.p2) });
    }

    if (ctx.state.html && ctx.request.query.json === undefined) {
        if (ctx.response.isFile) {
            if (ctx.request.query.preview === undefined) {
                if (ctx.response.down) {
                    ctx.response.callback_down = ctx.response.down;
                } else {
                    ctx.redirect(ctx.response.data.file.url);
                }
                return;
            }
        }

        const theme = op.themes[op.config.site.theme] || op.themes['w.w.art'];
        ctx.$V = new V(ctx);
        ctx.response.body = theme.render(ctx);
    } else {
        ctx.response.headers['content-type'] = 'application/json';
        ctx.response.body = JSON.stringify(ctx.response.data);
    }
};


/***/ }),

/***/ 893:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { request, IDHelper, _P } = __nccwpck_require__(792);
const logger = __nccwpck_require__(309);
const { RTError } = __nccwpck_require__(792);

// 支持分页、id寻址

const { PAGE_SIZE } = __nccwpck_require__(936);

function filter(e) {
    const r = {
        type: 1,
        name: e.name,
        time: e.updated_at,
        id: e.file_id,
    };

    if (e.type === 'file') {
        r.type = 0;
        r.mime = e.mimeType;
        r.size = e.size;
        r.url = e.url;
    }
    return r;
}

class AliDrive extends IDHelper {
    static async build(config) {
        const m = new AliDrive(config);
        const { access_token, default_drive_id } = await m.refreshToken(config);
        // @warning refresh_token 有效期未知，暂时按永久有效处理
        m.access_token = access_token;
        m.service.defaults.headers.Authorization = 'Bearer ' + access_token;
        m.drive_id = default_drive_id;
        return m;
    }

    constructor({ root }) {
        super(root || 'root');
        this.service = request.create({
            baseURL: 'https://api.aliyundrive.com/v2/',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
                Origin: 'https://aliyundrive.com',
                Accept: '*/*',
                'Accept-Language': 'zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3',
                Connection: 'keep-alive',
            },
            onResponse: (res) => {
                const { status, data } = res;
                if (status >= 300) {
                    if (status === 404) {
                        return Promise.reject(new RTError(404, 'ItemNotExist'));
                    }

                    if (!data || !data.message) {
                        return Promise.reject(new RTError(500, 'HttpError'));
                    }
                    return Promise.reject(new RTError(400, 'ModuleError', data.message));
                }
                return data;
            },
        });
    }

    async refreshToken({ refresh_token }) {
        const data = await this.service.post('https://auth.aliyundrive.com/v2/account/token', {
            grant_type: 'refresh_token',
            refresh_token,
        });
        logger.log('ali drive access_token:' + data.access_token);
        return data;
    }

    async findChildItem(pid, name) {
        return this.service
            .post('file/search', {
                drive_id: this.drive_id,
                limit: 10,
                query: `parent_file_id = "${pid}" and name = "${name}"`,
                order_by: 'name ASC',
            })
            .then((data) => data.items.map(filter).find((e) => e.name === name));
    }

    async itemInfo(file_id) {
        return this.service.post('file/get', { drive_id: this.drive_id, file_id }).then(filter);
    }

    async fetchList(pid, pageToken = null) {
        return this.service
            .post('file/list', {
                drive_id: this.drive_id,
                parent_file_id: pid,
                limit: PAGE_SIZE,
                all: false,
                fields: '*',
                order_by: 'name',
                order_direction: 'ASC',
                marker: pageToken,
            })
            .then((data) => ({
                list: data.items.map(filter),
                next: data.next_marker,
            }));
    }
}

module.exports = {
    get params() {
        return [_P('refresh_token', '', '', 7, '', false, true), _P('root', '', '', 5, 'root', false, false)];
    },
    async handle(config, data, cache, ctx) {
        let $m = cache.$m || {};
        ctx.assert($m.isValid || (config.refresh_token && (cache.$m = $m = await AliDrive.build(config))), 400, 'ConfigError', { fields: ['refresh_token'] });
        data.id = data.id || (await $m.getIDByPath(data.path));
        return this[data.command](data, cache, ctx);
    },
    async ls({ path, id, page }, { $m }, ctx) {
        if (path.endsWith('/')) {
            const { list, next } = await $m.fetchList(id, page);
            ctx.assert(list.length > 0 || (await $m.itemInfo(id)).type === 1, 400, 'ItemIsFile');
            ctx.respondList(list, next);
        } else {
            ctx.respondOne(await $m.itemInfo(id));
        }
    },
};


/***/ }),

/***/ 795:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { request, RTError, IDHelper, _P } = __nccwpck_require__(792);

const { PAGE_SIZE } = __nccwpck_require__(936);
const ID_DELIMITER = 'l';

function filter(e) {
    const res = {
        type: 1,
        name: e.name,
        time: new Date(e.updatedAt || e.updated_at).toISOString(),
        size: null,
    };
    if (!e.folderId) {
        res.type = 0;
        res.size = e.size;
        if (e.url.startsWith('http')) {
            res.url = e.url;
        }
        // 列表没有直链了
    }
    // 记录下父id id 和类型
    res.id = (e.id || e.file_id) + ID_DELIMITER + e.parentId + ID_DELIMITER + res.type;
    return res;
}

function parseId(id) {
    const idInfo = id.split(ID_DELIMITER);
    return {
        id: idInfo[0],
        pid: idInfo[1],
        type: Number(idInfo[2]),
    };
}

// 因token能使用的api有限 所以改用cookie eid 默认是一年的有效期
class Coding extends IDHelper {
    static async build(config) {
        const c = new Coding(config);
        // 设置 X-XSRF-TOKEN
        await c.fetchList(0, 1);
        return c;
    }

    constructor({ root, api_url, cookie_eid }) {
        super(root);
        // service.defaults.headers.common['Authorization'] = 'token ' + api_token;
        this.service = request.create({
            baseURL: api_url,
            headers: {
                Cookie: 'eid=' + cookie_eid,
            },
            onResponse: (res) => {
                const { status, headers, data } = res;

                if (status >= 300) {
                    return Promise.reject(new RTError(500, 'HttpError'));
                }

                if (data.code !== 0) {
                    const code = data.code;
                    if (code === 1302 || code === 1217) {
                        return Promise.reject(new RTError(400, 'ItemAlreadyExist'));
                    }
                    if (code === 1304) {
                        return Promise.reject(new RTError(404, 'ItemNotExist'));
                    }
                    return Promise.reject(new RTError(400, 'ModuleError', 'error coding code:' + data.code));
                }

                if (headers['set-cookie']) {
                    const match = /XSRF-TOKEN=(?<token>[^;]+);/.exec(headers['set-cookie']);
                    if (match && match.groups.token) {
                        this.service.defaults.headers.Cookie = `eid=${cookie_eid};XSRF-TOKEN=${match.groups.token};`;
                        this.service.defaults.headers['X-XSRF-TOKEN'] = match.groups.token;
                    }
                }

                return data.data;
            },
        });
    }

    async findChildItem(pid, name) {
        const data = await this.service.get(`folders/${pid}/all/masonry?sortName=name&sortValue=asc&pageSize=10&keyword=${encodeURIComponent(name)}&recursive=false`);
        const e = data.list.find((e) => e.name === name);
        if (!e) {
            throw new RTError(404, 'ItemNotExist');
        }
        return { type: e.url ? 0 : 1, name: e.name, id: e.id, pid };
    }

    async fetchList(id, page = 1) {
        const data = await this.service.get(`folders/${id}/all/masonry?sortName=name&sortValue=asc&page=${page}&pageSize=${PAGE_SIZE}`);
        const list = data.list.map(filter);
        const next = data.page < data.totalPage ? data.page + 1 : null;
        return { list, next };
    }

    // 1302
    async mkdir(pid, name) {
        const params = new URLSearchParams();
        params.set('parentId', pid);
        params.set('name', name);
        return filter(await this.service.post('mkdir', params));
    }

    // 1302
    async renameFolder(id, name) {
        const params = new URLSearchParams();
        params.set('name', name);
        return this.service.put(`folder/${id}`, params);
    }

    // 1302
    async renameFile(id, name) {
        const params = new URLSearchParams();
        params.set('name', name);
        return this.service.put(`files/${id}/rename`, params);
    }

    // 1217
    async touch(pid, name, content) {
        const params = new URLSearchParams();
        params.set('name', name);
        params.set('content', content);
        return this.service.post(`files/${pid}/create`, params);
    }

    async delete(ids) {
        const params = new URLSearchParams();
        ids.forEach((id) => params.append('fileIds', id));
        return this.service.post(`/files/recycle-bin/async`, params);
    }

    // 1304
    async fileInfo(id) {
        return filter(await this.service.get(`files/${id}/attribute`));
    }

    // 1304
    async folderInfo(id) {
        return filter(await this.service.get(`folders/${id}/attribute`));
    }

    async move(pid, ids) {
        const params = new URLSearchParams();
        params.set('toFolderId', pid);
        ids.forEach((id) => params.append('fileIds', id));
        return this.service.post(`files/move/async`, params);
    }

    async copy(pid, ids) {
        const params = new URLSearchParams();
        params.set('toFolderId', pid);
        ids.forEach((id) => params.append('fileIds', id));
        return this.service.post(`files/copy/async`, params);
    }

    async asyncTask(jid) {
        return this.service.get(`files/async-jobs/${jid}`);
    }

    async mulDownload(ids) {
        const params = new URLSearchParams();
        ids.forEach((id) => params.append('fileIds', id));
        params.set('withDirName', 'true');
        return this.service.get(`files/mixed/download/`, { params });
    }
}

module.exports = {
    params() {
        return [
            _P('api_url', '', '形如: https://<团队名>.coding.net/api/user/<用户名>/project/<项目名>/folder/', 7, '', false, true),
            _P('cookie_eid', '', 'cookie中的eid项', 7, '', false, true),
            _P('root', '', '根目录或文件夹id', 5, '0', false, false),
        ];
    },
    async handle(config, data, cache, ctx) {
        if ((cache.etime || 0) < Date.now()) {
            const fields = [];
            if (!/https:\/\/.+.coding.net\/api\/project\/.+\//.exec(config.api_url)) {
                fields.push('api_url');
            }
            if (!config.cookie_eid) {
                fields.push('cookie_eid');
            }
            if (isNaN(Number(config.root))) {
                delete config.root;
            }
            config.root = Number(config.root) || 0;
            if (fields.length > 0) {
                throw new RTError(400, 'ConfigError', { fields });
            }

            cache.$U = await Coding.build(config);
            cache.etime = Date.now() + 3600 * 1000;
        }
        data._item = data.id ? parseId(data.id) : await cache.$U.getItemByPath(data.path);

        if (data.desPath) {
            data._desItem = data.desId ? parseId(data.desId) : await cache.$U.getItemByPath(data.desPath);
        }

        return this[data.command](data, cache, ctx);
    },
    async ls({ path, page, _item }, { $U }, ctx) {
        if (path.endsWith('/')) {
            if (_item.type === 0) {
                throw new RTError(403, 'ItemIsFile');
            }
            const { list, next } = await $U.fetchList(_item.id, page);
            ctx.respondList(list, next);
        } else {
            ctx.respondOne(await $U[_item.type === 0 ? 'fileInfo' : 'folderInfo'](_item.id));
        }
    },
    async mkdir({ name, _item }, { $U }) {
        if (_item.type === 0) {
            throw new RTError(403, 'ItemIsFile');
        }
        await $U.mkdir(_item.id, name);
    },
    async mv({ _item, _desItem }, { $U }, ctx) {
        if (_desItem.type === 0) {
            throw new RTError(403, 'ItemIsFile');
        }
        const { job_id } = await $U.move(_desItem.id, [_item.id]);
        ctx.respond(202, { async: job_id });
    },
    async cp({ _item, _desItem }, { $U }, ctx) {
        if (_desItem.type === 0) {
            throw new RTError(403, 'ItemIsFile');
        }
        const { job_id } = await $U.copy(_desItem.id, [_item.id]);
        ctx.respond(202, { async: job_id });
    },
    async rm({ _item }, { $U }, ctx) {
        const { job_id } = await $U.delete([_item.id]);
        ctx.respond(202, { async: job_id });
    },
    async ren({ name, _item }, { $U }) {
        await $U[_item.type === 0 ? 'renameFile' : 'renameFolder'](_item.id, name);
    },
    async touch({ name, content, _item }, { $U }, ctx) {
        await $U.touch(_item.id, name, content);
        ctx.respond(201);
    },
};


/***/ }),

/***/ 583:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { request, RTError, IDHelper, _P } = __nccwpck_require__(792);
const logger = __nccwpck_require__(309);

// 支持分页、id寻址、中转下载

const { PAGE_SIZE } = __nccwpck_require__(936);

function filter(e) {
    // 处理shortcut
    if (e.shortcutDetails) {
        e.id = e.shortcutDetails.targetId;
        e.mimeType = e.shortcutDetails.targetMimeType;
    }

    const r = {
        type: 1,
        name: e.name,
        time: e.modifiedTime,
        id: e.id,
    };

    if (e.mimeType !== 'application/vnd.google-apps.folder') {
        r.type = 0;
        r.mime = e.mimeType;
        r.size = Number(e.size);
    }
    return r;
}

class GoogleDrive extends IDHelper {
    static async build(config) {
        const g = new GoogleDrive(config);
        const { access_token } = await g.refreshToken(config);
        g.access_token = access_token;
        g.service.defaults.headers.Authorization = 'Bearer ' + access_token;
        return g;
    }

    constructor({ root }) {
        super(root || 'root');
        this.service = request.create({
            baseURL: 'https://www.googleapis.com/',
            onResponse: (res) => {
                const { status, data } = res;
                if (status >= 300) {
                    if (status === 404) {
                        return Promise.reject(new RTError(404, 'ItemNotExist'));
                    }

                    if (!data || !data.error) {
                        return Promise.reject(new RTError(500, 'HttpError'));
                    }
                    return Promise.reject(new RTError(400, 'ModuleError', data.error.message || data.error));
                }
                return data;
            },
        });
    }

    async refreshToken({ client_id, client_secret, refresh_token }) {
        const o = GoogleDrive.oauth2s[0];
        const data = await this.service.post(
            'https://www.googleapis.com/oauth2/v4/token',
            new URLSearchParams({
                client_id: client_id || o.client_id,
                client_secret: client_secret || o.client_secret,
                grant_type: 'refresh_token',
                refresh_token,
            })
        );
        logger.log('google drive access_token:' + data.access_token);
        return data;
    }

    async findChildItem(pid, name) {
        return this.service
            .get('drive/v3/files', {
                params: {
                    includeItemsFromAllDrives: true,
                    supportsAllDrives: true,
                    q: `name = '${name}' and '${pid}' in parents and trashed = false`,
                    orderBy: 'folder,name,modifiedTime desc',
                    fields: 'files(id,name,mimeType,size,modifiedTime,shortcutDetails),nextPageToken',
                    pageSize: 10,
                },
            })
            .then((data) => data.files.map(filter).find((e) => e.name === name));
    }

    async itemInfo(id) {
        return this.service
            .get(`drive/v3/files/${id}`, {
                params: {
                    supportsAllDrives: true,
                    fields: 'id,name,mimeType,size,modifiedTime,shortcutDetails',
                },
            })
            .then(filter);
    }

    async fetchList(parentId, pageToken) {
        const params = {
            includeItemsFromAllDrives: true,
            supportsAllDrives: true,
            q: `'${parentId}' in parents and trashed = false`,
            orderBy: 'folder,name,modifiedTime desc',
            fields: 'files(id,name,mimeType,size,modifiedTime,shortcutDetails,webContentLink,thumbnailLink),nextPageToken',
            pageSize: PAGE_SIZE,
        };
        if (pageToken) {
            params.pageToken = pageToken;
        }
        return this.service.get('drive/v3/files', { params }).then((data) => ({
            list: data.files.map(filter),
            next: data.nextPageToken,
        }));
    }

    downInfo(id) {
        return {
            url: `https://www.googleapis.com/drive/v3/files/${id}?alt=media&supportsAllDrives=true`,
            headers: {
                Authorization: 'Bearer ' + this.access_token,
            },
        };
    }
}

GoogleDrive.oauth2s = [
    {
        client_id: '202264815644.apps.googleusercontent.com',
        client_secret: 'X4Z3ca8xfWDb1Voo-F9a7ZxJ',
        redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
    },
    {
        client_id: '695250577395-08nocpbl8suogn56vjlpmifnhp5a4d7e.apps.googleusercontent.com',
        client_secret: 'k8xsOAGqhcmF1peWUDhZOeCK',
        redirect_uri: 'https://point.onesrc.cn/oauth2',
    },
];

module.exports = {
    get params() {
        return [
            _P('refresh_token', '', '<a href="https://point.onesrc.cn/oauth2/" target="_blank">获取refresh_token</a>', 7, '', false, true),
            _P('root', '', '默认为根目录;如果想使用子目录,请填写目录id;如果想使用团队盘,请使用团队盘id', 5, 'root', false, false),
            _P('client_id', '', '', 5, '', false, false),
            _P('client_secret', '', '', 5, '', false, false),
        ];
    },
    async handle(config, data, cache, ctx) {
        let $m = cache.$m || {};
        ctx.assert($m.isValid || (config.refresh_token && (cache.$m = $m = await GoogleDrive.build(config))), 400, 'ConfigError', { fields: ['refresh_token'] });
        data.id = data.id || (await $m.getIDByPath(data.path));
        return this[data.command](data, cache, ctx);
    },
    async ls({ path, id, page }, { $m }, ctx) {
        if (path.endsWith('/')) {
            const { list, next } = await $m.fetchList(id, page);
            ctx.assert(list.length > 0 || (await $m.itemInfo(id)).type === 1, 400, 'ItemIsFile');
            ctx.respondList(list, next);
        } else {
            const e = await $m.itemInfo(id);
            ctx.respondOne(e, e.type ? null : $m.downInfo(e.id));
        }
    },
};


/***/ }),

/***/ 53:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const logger = __nccwpck_require__(309);
const fs = __nccwpck_require__(747);
const { _P, path: _path } = __nccwpck_require__(792);

const { PAGE_SIZE: PAGE } = __nccwpck_require__(936);

module.exports = {
    params() {
        return [_P('root', '', '', 5, '', false, false)];
    },
    async handle(config, data, cache, ctx) {
        if (!cache.flag) {
            if (!config.root) {
                config.root = '';
            } else if (config.root.endsWith('/')) {
                config.root = config.root.slice(0, -1);
            }
            cache.flag = true;
        }
        data.path = config.root + data.path;
        ctx.assert(fs.existsSync(data.path), 404, 'ItemNotExist');
        return this.ls(data, cache, ctx);
    },
    async ls({ path, page }, _1, ctx) {
        const stats = fs.statSync(path);
        if (stats.isDirectory()) {
            if (!path.endsWith('/')) {
                ctx.respondOne({
                    type: 1,
                    name: _path.basename(path),
                    size: process.platform === 'win32' ? null : stats.size,
                    time: new Date(stats.mtime).toISOString(),
                });
                return;
            } // 可
            page = Number(page && page.slice(1)) || 0;
            const list = await Promise.all(
                fs.readdirSync(path).map(
                    (fileName) =>
                        new Promise((resolve) => {
                            fs.stat(path + fileName, (err, st) => {
                                if (err) {
                                    logger.warn(path + ':' + fileName + ', ' + err.message);
                                    resolve(null);
                                } else if (st.isDirectory()) {
                                    resolve({
                                        type: 1,
                                        name: fileName,
                                        size: process.platform === 'win32' ? null : st.size,
                                        time: new Date(st.mtime).toISOString(),
                                    });
                                } else if (st.isFile()) {
                                    resolve({
                                        type: 0,
                                        name: fileName,
                                        size: st.size,
                                        time: new Date(st.mtime).toISOString(),
                                    });
                                } else {
                                    resolve(null);
                                }
                            });
                        })
                )
            );
            ctx.respondList(list.filter((e) => e).slice(page * PAGE, page * PAGE + PAGE), page * PAGE + PAGE < list.length ? 'l' + (page + 1) : null);
        } else if (stats.isFile()) {
            ctx.assert(!path.endsWith('/'), 403, 'ItemIsFile');
            ctx.respondOne(
                {
                    type: 0,
                    name: _path.basename(path),
                    size: stats.size,
                    time: new Date(stats.mtime).toISOString(),
                },
                { url: 'file://' + path }
            );
        } else {
            ctx.throw(404, 'ItemNotExist');
        }
    },
};


/***/ }),

/***/ 714:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { request, RTError } = __nccwpck_require__(792);
const logger = __nccwpck_require__(309);
const { _P, deleteAttributes } = __nccwpck_require__(792);
const op = __nccwpck_require__(146);

const { PAGE_SIZE } = __nccwpck_require__(936);

function filter(e) {
    const res = {
        type: 1,
        name: e.name,
        size: e.size,
        mime: '',
        time: e.lastModifiedDateTime,
    };
    if (e.file) {
        res.type = 0;
        res.mime = e.file.mimeType;
        res.url = e['@microsoft.graph.downloadUrl'] || e['@content.downloadUrl'] || null;
    }
    return res;
}

module.exports = {
    get params() {
        return [
            _P('type', 'com', 'com:国际版 cn:世纪互联特供版', 7, ['com', 'cn'], false, true),
            _P('refresh_token', '', '<a href="https://point.onesrc.cn/oauth2/" target="_blank">获取refresh_token</a>', 7, '', true, true),
            _P('share_url', '', 'OneDrive分享链接', 7, 'https://{?}-my.sharepoint.com/:f:/g/personal/{?}/{?}', false, true),
            _P('root', '', '', 5, '/', false, false),
            _P('api_url', '', 'sharepoint 使用此项', 5, 'https://graph.microsoft.com/v1.0/sites/{site-id}/drive/', false, false),
            _P('client_id', '', '', 5, '', false, false),
            _P('client_secret', '', '', 5, '', false, false),
            _P('refresh_etime', Date.now() + 3600 * 24 * 10 + '', '', 1, { hidden: true }, false, false),
        ];
    },

    async handle(config, data, cache, ctx) {
        // 逻辑略显臃肿 为了统一所有的onedrive
        if ((cache.etime || 0) < Date.now()) {
            if (!config.root) {
                config.root = '';
            } else if (config.root.endsWith('/')) {
                config.root = config.root.slice(0, -1);
            }
            // 控制，删除无用属性 type 默认为com
            if (config.type !== 'cn') {
                deleteAttributes(config, ['type']);
            }

            if (config.share_url) {
                deleteAttributes(config, ['refresh_token', 'api_url', 'client_id', 'client_secret', 'refresh_etime']);
                if (config.type === 'cn') {
                    cache.$point = await SharePoint.build(config.share_url);
                } else {
                    cache.$one = await OneDrive.build(config);
                }
            } else if (config.refresh_token) {
                cache.$one = await OneDrive.build(config);
                deleteAttributes(config, ['share_url']);
                if ((config.refresh_etime || 0) < Date.now()) {
                    config.refresh_etime = Date.now() + 30 * 24 * 3600 * 1000;
                    config.refresh_token = cache.$one.refresh_token;
                    await op.saveConfig('onedrive refresh_token auto save');
                }
            } else {
                throw new RTError(400, 'ConfigError', { fields: ['refresh_token', 'share_url'] });
            }
            cache.etime = Date.now() + 3600 * 1000;
        }
        if (config.root) {
            data.path = config.root + data.path;
            if (data.desPath) {
                data.desPath = config.root + data.desPath;
            }
        }
        if (cache.$point) {
            ctx.assert(data.command === 'ls', 403, 'CommandNotAllowed', { command: data.command });
            return this.ls_cn(data, cache, ctx);
        } else {
            return this[data.command](data, cache, ctx);
        }
    },

    async ls({ path, page }, { $one }, ctx) {
        if (!path.endsWith('/')) {
            // 处理文件情况
            ctx.respondOne(filter(await $one.itemInfo(path)));
        } else {
            const data = await $one.fetchItems(path === '/' ? path : path.slice(0, -1), page);
            ctx.respondList(data.value.map(filter), data['@odata.nextLink'] ? /skiptoken=(\w*)/.exec(data['@odata.nextLink'])[1] : null);
        }
    },

    // @Todo page

    async ls_cn({ path }, { $point }, ctx) {
        const data = await $point.spListData(path);
        const offset = (new Date().getTimezoneOffset() - data.RegionalSettingsTimeZoneBias || 0) * 3600000;
        if (path.endsWith('/')) {
            // 文件夹
            ctx.respondList(
                data.ListData.Row.map((e) => ({
                    type: Number(e.FSObjType),
                    name: e.LinkFilename,
                    size: Number(e.SMTotalFileStreamSize),
                    time: new Date(new Date(e.SMLastModifiedDate) - offset).toISOString(),
                }))
            );
        } else {
            const info = await $point.spGetItemInfo(data.ListData.CurrentFolderSpItemUrl);
            ctx.respondOne({
                type: info.file ? 0 : 1,
                name: info.name,
                size: Number(info.size),
                time: new Date(new Date(info.lastModifiedDateTime) - offset).toISOString(),
                url: info['@content.downloadUrl'],
            });
        }
    },

    async mkdir({ path, name }, { $one }) {
        await $one.mkdir(path, name);
    },
    async mv({ path, desPath }, { $one }) {
        await $one.move(path, desPath);
    },
    async cp({ path, desPath }, { $one }) {
        await $one.copy(path, desPath);
    },
    async rm({ path }, { $one }, ctx) {
        await $one.delete(path);
        ctx.respond(204);
    },
    async ren({ path, name }, { $one }) {
        await $one.rename(path, name);
    },
    async touch({ path, name, content, mime }, { $one }, ctx) {
        await $one.touch(path, name, content, mime);
        ctx.respond(201);
    },
    async upload({ path, name, size }, { $one }, ctx) {
        ctx.respond(201, await $one.uploadSession(path, name, size));
    },
};

class OneDrive {
    static async build(config) {
        const o = new OneDrive(config);
        const { api_url, access_token, refresh_token } = config.share_url ? await SharePoint.getAccessToken(config.share_url) : await o.getAccessToken(config);
        o.api_url = api_url;
        o.access_token = access_token;
        o.refresh_token = refresh_token;
        o.service.defaults.baseURL = api_url;
        o.service.defaults.headers.Authorization = 'Bearer ' + access_token;
        return o;
    }

    async getAccessToken({ refresh_token, type, api_url, client_id, client_secret }) {
        const o = OneDrive.oauth2s[type] || OneDrive.oauth2s.com;
        api_url = api_url || o.api_url;
        return this.service
            .post(
                o.oauth_url + 'token',
                new URLSearchParams({
                    client_id: client_id || o.client_id,
                    client_secret: client_secret || o.client_secret,
                    grant_type: 'refresh_token',
                    requested_token_use: 'on_behalf_of',
                    refresh_token: refresh_token,
                })
            )
            .then((data) => (data.api_url = api_url) && data);
    }

    constructor() {
        this.service = request.create({
            onResponse: (res) => {
                const { status, data } = res;
                if (status >= 300) {
                    if (status === 404) {
                        return Promise.reject(new RTError(404, 'ItemNotExist'));
                    }

                    if (!data || !data.error) {
                        return Promise.reject(new RTError(500, 'HttpError'));
                    }

                    if (data.error_description) {
                        return Promise.reject(new RTError(400, 'ModuleError', data.error + ':' + data.error_description));
                    } else {
                        return Promise.reject(new RTError(400, 'ModuleError', data.error.code + ':' + data.error.message));
                    }
                }
                return data;
            },
        });
    }

    async itemInfo(path) {
        const data = await this.service.get('root' + (path === '/' ? '' : ':' + encodeURI(path)));
        logger.log(path + ':' + data.id);
        return data;
    }

    async getIdByPath(path) {
        return this.itemInfo(path).then(({ id }) => id);
    }

    async fetchItems(path, pageToken) {
        const params = { $top: PAGE_SIZE };
        if (pageToken) {
            params.$skiptoken = pageToken;
        }
        return this.service.get('root' + (path === '/' ? '' : ':' + encodeURI(path) + ':') + '/children', { params });
    }

    async mkdir(path, name) {
        return this.service.post('items/' + (await this.getIdByPath(path)) + '/children', {
            name: name,
            folder: {},
            '@microsoft.graph.conflictBehavior': 'fail',
        });
    }

    async move(path, desPath) {
        return this.service.patch('items/' + (await this.getIdByPath(path)), {
            parentReference: {
                id: await this.getIdByPath(desPath),
            },
        });
    }

    async copy(path, desPath) {
        return this.service.post('items/' + (await this.getIdByPath(path)) + '/copy', {
            parentReference: {
                id: await this.getIdByPath(desPath),
            },
        });
    }

    async delete(path) {
        return this.service.delete('items/' + (await this.getIdByPath(path)));
    }

    async rename(path, name) {
        return this.service.patch('items/' + (await this.getIdByPath(path)), { name });
    }

    async touch(path, name, content, mime) {
        return this.service.put('items/' + (await this.getIdByPath(path)) + ':/' + name + ':/content', content, {
            headers: {
                'Content-Type': mime,
            },
        });
    }

    async uploadSession(path, name) {
        return this.service.post('root:' + encodeURI(path + name) + ':/createUploadSession', {
            item: {
                '@microsoft.graph.conflictBehavior': 'fail',
            },
        });
    }
}

OneDrive.oauth2s = {
    com: {
        client_id: 'ca39c9ea-01b7-4199-b663-07cc3406196c',
        client_secret: 'AVMUwY_9_K8CbCXltBnNVi1~-5v6cM8qt6',
        oauth_url: 'https://login.microsoftonline.com/common/oauth2/v2.0/',
        api_url: 'https://graph.microsoft.com/v1.0/me/drive/',
    },
    cn: {
        client_id: '320ca2f3-9411-401e-99df-bcf163561733',
        client_secret: 'VHTu]JW?m5qQxER]klkks9XHRY]y8Et0',
        oauth_url: 'https://login.partner.microsoftonline.cn/common/oauth2/v2.0/',
        api_url: 'https://microsoftgraph.chinacloudapi.cn/v1.0/me/drive/',
    },
};

class SharePoint {
    static async build(share_url) {
        const o = new SharePoint();
        return o.init(share_url);
    }

    static async getAccessToken(share_url) {
        const point = await SharePoint.build(share_url);
        const data = await point.spListData('/');
        if (data.ListSchema && data.ListSchema['.driveUrl']) {
            return {
                api_url: data.ListSchema['.driveUrl'] + '/',
                access_token: data.ListSchema['.driveAccessToken'].slice('access_token='.length),
            };
        } else {
            throw new RTError(500, 'ConfigError', { fields: ['share_url'] });
        }
    }

    async init(share_url) {
        const match = /https:\/\/(?<origin>[^/]*)\/:f:\/g\/personal\/(?<account>[^/]*).*/.exec(share_url);
        this.cookie = await this.getCookie(match[0]);
        this.origin = match.groups.origin;
        this.account = match.groups.account;
        return this;
    }

    async getCookie(shareUrl) {
        const config = {
            maxRedirects: 0,
            validateStatus: function (status) {
                return status >= 200 && status < 400;
            },
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:69.0) Gecko/20100101 Firefox/69.0',
                Cookie: '',
            },
        };
        const { headers } = await request.get(shareUrl, config);
        if (!headers['set-cookie'] || !headers['set-cookie'][0]) {
            throw new RTError(500, 'ModuleError', 'This sharing link has been canceled');
        }
        logger.log('sharepoint cookie:' + headers['set-cookie'][0]);
        return headers['set-cookie'][0];
    }

    async spListData(path) {
        const url = `https://${this.origin}/personal/${this.account}/_api/web/GetListUsingPath(DecodedUrl=@a1)/RenderListDataAsStream`;
        const config = {
            headers: {
                origin: 'https://' + this.origin,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:69.0) Gecko/20100101 Firefox/69.0',
                Cookie: this.cookie,
            },
            params: {
                '@a1': `'/personal/${this.account}/Documents'`,
                RootFolder: `/personal/${this.account}/Documents${path}`,
                TryNewExperienceSingle: 'TRUE',
            },
        };
        const data = {
            parameters: {
                ViewXml: `<View ><Query><OrderBy><FieldRef Name="LinkFilename" Ascending="true"></FieldRef></OrderBy></Query><ViewFields>
<FieldRef Name="CurrentFolderSpItemUrl"/>
<FieldRef Name="FileLeafRef"/>
<FieldRef Name="FSObjType"/>
<FieldRef Name="SMLastModifiedDate"/>
<FieldRef Name="SMTotalFileStreamSize"/>
<FieldRef Name="SMTotalFileCount"/>
</ViewFields><RowLimit Paged="TRUE">${PAGE_SIZE}</RowLimit></View>`,
                RenderOptions: 136967,
                AllowMultipleValueFilterForTaxonomyFields: true,
                AddRequiredFields: true,
            },
        };
        const res = await request.post(url, data, config);
        return res.data;
    }

    async spGetItemInfo(spItemUrl) {
        const config = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:69.0) Gecko/20100101 Firefox/69.0',
                Cookie: this.cookie,
            },
        };
        const res = await request.get(spItemUrl, config);
        return res.data;
    }
}


/***/ }),

/***/ 582:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { _P } = __nccwpck_require__(792);
module.exports = {
    get params() {
        return [_P('nothing', '', '文件挂载专用，可用于补充挂载文件，请不要填写此选项', 7, '', false, false)];
    },
    async handle(_, data, cache, ctx) {
        return this[data.command](data, cache, ctx);
    },
    async ls({ path }, _, ctx) {
        ctx.assert(path === '/', 404, 'ItemNotExist');
        ctx.respondList([]);
    },
};


/***/ }),

/***/ 822:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { request, RTError, IDHelper, _P } = __nccwpck_require__(792);
const { PAGE_SIZE } = __nccwpck_require__(936);

function folderFilter(e) {
    return {
        type: 1,
        name: e.title,
        time: e.updated,
        size: null,
        id: e._id,
    };
}

function fileFilter(e) {
    return {
        type: 0,
        name: e.fileName,
        time: e.updated,
        size: e.fileSize,
        id: e._id,
        url: e.downloadUrl,
    };
}

class Teambition extends IDHelper {
    constructor({ parentId, projectId, cookie }) {
        super(parentId);
        this._projectId = projectId;
        this.service = request.create({
            baseURL: 'https://www.teambition.com/api/',
            headers: { cookie },
            onResponse: (res) => {
                const { status, data } = res;
                if (status >= 300) {
                    if (status === 404) {
                        return Promise.reject(new RTError(404, 'ItemNotExist'));
                    }

                    if (!data || !data.message) {
                        return Promise.reject(new RTError(500, 'HttpError'));
                    }

                    return Promise.reject(new RTError(400, 'ModuleError', data.message));
                }
                return data;
            },
        });
    }

    async findChildItem(pid, name) {
        let e = await this.fetchFolders(pid, 1, 500).then((arr) => arr.find((e) => e.name === name));
        if (!e) {
            e = await this.fetchFiles(pid, 1, 1000).then((arr) => arr.find((e) => e.name === name));
            if (!e) {
                throw new RTError(404, 'ItemNotExist');
            }
        }
        e.pid = pid;
        return e;
    }

    async fetchFiles(pid, page = 1, count = PAGE_SIZE) {
        return this.service
            .get(`works`, {
                params: {
                    _parentId: pid,
                    _projectId: this._projectId,
                    order: 'nameAsc',
                    count: count,
                    page: page,
                },
            })
            .then((data) => data.map(fileFilter));
    }

    async fetchFolders(pid, page = 1, count = 200) {
        return this.service
            .get(`collections`, {
                params: {
                    _parentId: pid,
                    _projectId: this._projectId,
                    order: 'nameAsc',
                    count: count,
                    page: page,
                },
            })
            .then((data) => data.map(folderFilter).filter((e) => e.name));
    }

    async fetchList(pid, page = 1) {
        if (page === 1) {
            const folders = await this.fetchFolders(pid);
            const files = await this.fetchFiles(pid);
            const next = files.length === PAGE_SIZE ? 2 : null;
            return { list: folders.concat(files), next };
        } else {
            const list = await this.fetchFiles(pid, page);
            // 尽可能提高准确性
            const next = list.length === PAGE_SIZE ? page + 1 : null;
            return { list, next };
        }
    }

    async fileInfo(id) {
        return this.service.get('works/' + id).then(fileFilter);
    }

    async folderInfo(id) {
        return this.service.get('collections/' + id).then(folderFilter);
    }
}

module.exports = {
    params() {
        return [_P('cookie', '', '形如TEAMBITION_SESSIONID=*; TEAMBITION_SESSIONID.sig=*', 7, '', true, true), _P('projectId', '', '项目id', 7, '', false, true), _P('parentId', '', '根目录或文件夹id', 7, '', false, true)];
    },
    async handle(config, data, cache, ctx) {
        if ((cache.etime || 0) < Date.now()) {
            if (!config.cookie || !config.projectId || !config.parentId) {
                throw new RTError(400, 'ConfigError', { fields: ['cookie', 'projectId', 'parentId'] });
            }
            cache.$t = new Teambition(config);
            cache.etime = Date.now() + 3600 * 1000;
        }
        if (!data.id) {
            data.id = await cache.$t.getIDByPath(data.path);
        }
        return this.ls(data, cache, ctx);
    },
    async ls({ path, id, page = 1 }, { $t }, ctx) {
        if (path.endsWith('/')) {
            await $t
                .fetchList(id, page)
                .then(({ list, next }) => {
                    ctx.respondList(list, next);
                })
                .catch(async (err) => {
                    if (err.type === 'ItemNotExist') {
                        // 不报错则是文件 报错正常退出
                        await $t.fileInfo(id);
                        throw new RTError(400, 'ItemIsFile');
                    }
                });
        } else {
            await $t
                .folderInfo(id)
                .catch((err) => {
                    if (err.type === 'ItemNotExist') {
                        return $t.fileInfo(id);
                    }
                })
                .then((e) => {
                    const o = Object.assign({}, e);
                    delete o.pid;
                    ctx.respondOne(o);
                });
        }
    },
};


/***/ }),

/***/ 517:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const fs = __nccwpck_require__(747);
const app = __nccwpck_require__(667);
const { request, P } = __nccwpck_require__(792);
const logger = __nccwpck_require__(309);
const op = __nccwpck_require__(146);

let META; // process.env['VERCEL_URL'];

async function readConfig() {
    return typeof CONFIG_OBJ === 'undefined' ? {} : CONFIG_OBJ;
}

async function writeConfig(config, { x_zeit_token, x_zeit_project_name }) {
    if (!x_zeit_token) {
        return Promise.reject(new Error('未配置 zeit token'));
    }
    const flag = await checkDeployment(x_zeit_token);
    if (op.config.version !== 1 && !flag) {
        return Promise.reject(new Error('lock! 之前已经提交过部署了，请等待生效后再试'));
    }
    const c = `const CONFIG_OBJ=${JSON.stringify(config)};const r3030958164335045=19218526256549961;\n`;
    let f = fs.readFileSync(__filename, 'utf-8').replace(/^const CONFIG_OBJ=.*;const r3030958164335045=19218526256549961;\n/, c);
    if (!f.startsWith('const CONFIG_OBJ=')) {
        f = c + f;
    }
    return request
        .post(
            'https://api.vercel.com/v12/now/deployments', {
                name: x_zeit_project_name,
                files: [{ file: 'api/index.js', data: f }],
                target: 'production',
                meta: { last: META },
                functions: { 'api/index.js': { maxDuration: 10 } },
                routes: [{ src: '/.*', dest: 'api/index.js' }],
                projectSettings: { framework: null },
            }, {
                headers: {
                    Authorization: `Bearer ${x_zeit_token}`,
                },
            }
        )
        .then((d) => {
            logger.log(d);
            return (op.runtime.now = d.data.url);
        });
}

async function checkDeployment(token) {
    return request
        .get('https://api.vercel.com/v5/now/deployments/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                'meta-last': META,
            },
        })
        .then((d) => {
            logger.log(d.request.header);
            logger.log(d.data.deployments.length);
            return d.data.deployments.length === 0;
        });
}

app.initialize({
    name: 'now.sh',
    readConfig,
    writeConfig,
    params: [
        P('x_zeit_token', '', 'token', 8, '', false, true),
        P('x_zeit_project_name', 'onepoint', 'project name', 8, '', false, true)
    ]
});

module.exports = async(req, res) => {
    try {
        if (META === undefined) {
            META = req.headers['x-vercel-deployment-url'];
        }
        req.path = req.url;
        const r = await app.handleRequest(req);
        res.writeHead(r.status, r.headers);
        res.end(r.body);
    } catch (err) {
        logger.log(err);
        res.writeHead(err.status || 500, {
            'access-control-allow-origin': '*',
            'content-type': 'application/json',
        });
        res.end(
            JSON.stringify({
                error: err.type || 'UnknownError',
                data: err.data || {},
                message: err.message,
            })
        );
    }
};

/***/ }),

/***/ 616:
/***/ ((module) => {

/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(u,p){var d={},l=d.lib={},s=function(){},t=l.Base={extend:function(a){s.prototype=this;var c=new s;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
r=l.WordArray=t.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=p?c:4*a.length},toString:function(a){return(a||v).stringify(this)},concat:function(a){var c=this.words,e=a.words,j=this.sigBytes;a=a.sigBytes;this.clamp();if(j%4)for(var k=0;k<a;k++)c[j+k>>>2]|=(e[k>>>2]>>>24-8*(k%4)&255)<<24-8*((j+k)%4);else if(65535<e.length)for(k=0;k<a;k+=4)c[j+k>>>2]=e[k>>>2];else c.push.apply(c,e);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=u.ceil(c/4)},clone:function(){var a=t.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],e=0;e<a;e+=4)c.push(4294967296*u.random()|0);return new r.init(c,a)}}),w=d.enc={},v=w.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++){var k=c[j>>>2]>>>24-8*(j%4)&255;e.push((k>>>4).toString(16));e.push((k&15).toString(16))}return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j+=2)e[j>>>3]|=parseInt(a.substr(j,
2),16)<<24-4*(j%8);return new r.init(e,c/2)}},b=w.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++)e.push(String.fromCharCode(c[j>>>2]>>>24-8*(j%4)&255));return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j++)e[j>>>2]|=(a.charCodeAt(j)&255)<<24-8*(j%4);return new r.init(e,c)}},x=w.Utf8={stringify:function(a){try{return decodeURIComponent(escape(b.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return b.parse(unescape(encodeURIComponent(a)))}},
q=l.BufferedBlockAlgorithm=t.extend({reset:function(){this._data=new r.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=x.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,e=c.words,j=c.sigBytes,k=this.blockSize,b=j/(4*k),b=a?u.ceil(b):u.max((b|0)-this._minBufferSize,0);a=b*k;j=u.min(4*a,j);if(a){for(var q=0;q<a;q+=k)this._doProcessBlock(e,q);q=e.splice(0,a);c.sigBytes-=j}return new r.init(q,j)},clone:function(){var a=t.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});l.Hasher=q.extend({cfg:t.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){q.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,e){return(new a.init(e)).finalize(b)}},_createHmacHelper:function(a){return function(b,e){return(new n.HMAC.init(a,
e)).finalize(b)}}});var n=d.algo={};return d}(Math);
(function(){var u=CryptoJS,p=u.lib.WordArray;u.enc.Base64={stringify:function(d){var l=d.words,p=d.sigBytes,t=this._map;d.clamp();d=[];for(var r=0;r<p;r+=3)for(var w=(l[r>>>2]>>>24-8*(r%4)&255)<<16|(l[r+1>>>2]>>>24-8*((r+1)%4)&255)<<8|l[r+2>>>2]>>>24-8*((r+2)%4)&255,v=0;4>v&&r+0.75*v<p;v++)d.push(t.charAt(w>>>6*(3-v)&63));if(l=t.charAt(64))for(;d.length%4;)d.push(l);return d.join("")},parse:function(d){var l=d.length,s=this._map,t=s.charAt(64);t&&(t=d.indexOf(t),-1!=t&&(l=t));for(var t=[],r=0,w=0;w<
l;w++)if(w%4){var v=s.indexOf(d.charAt(w-1))<<2*(w%4),b=s.indexOf(d.charAt(w))>>>6-2*(w%4);t[r>>>2]|=(v|b)<<24-8*(r%4);r++}return p.create(t,r)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();
(function(u){function p(b,n,a,c,e,j,k){b=b+(n&a|~n&c)+e+k;return(b<<j|b>>>32-j)+n}function d(b,n,a,c,e,j,k){b=b+(n&c|a&~c)+e+k;return(b<<j|b>>>32-j)+n}function l(b,n,a,c,e,j,k){b=b+(n^a^c)+e+k;return(b<<j|b>>>32-j)+n}function s(b,n,a,c,e,j,k){b=b+(a^(n|~c))+e+k;return(b<<j|b>>>32-j)+n}for(var t=CryptoJS,r=t.lib,w=r.WordArray,v=r.Hasher,r=t.algo,b=[],x=0;64>x;x++)b[x]=4294967296*u.abs(u.sin(x+1))|0;r=r.MD5=v.extend({_doReset:function(){this._hash=new w.init([1732584193,4023233417,2562383102,271733878])},
_doProcessBlock:function(q,n){for(var a=0;16>a;a++){var c=n+a,e=q[c];q[c]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360}var a=this._hash.words,c=q[n+0],e=q[n+1],j=q[n+2],k=q[n+3],z=q[n+4],r=q[n+5],t=q[n+6],w=q[n+7],v=q[n+8],A=q[n+9],B=q[n+10],C=q[n+11],u=q[n+12],D=q[n+13],E=q[n+14],x=q[n+15],f=a[0],m=a[1],g=a[2],h=a[3],f=p(f,m,g,h,c,7,b[0]),h=p(h,f,m,g,e,12,b[1]),g=p(g,h,f,m,j,17,b[2]),m=p(m,g,h,f,k,22,b[3]),f=p(f,m,g,h,z,7,b[4]),h=p(h,f,m,g,r,12,b[5]),g=p(g,h,f,m,t,17,b[6]),m=p(m,g,h,f,w,22,b[7]),
f=p(f,m,g,h,v,7,b[8]),h=p(h,f,m,g,A,12,b[9]),g=p(g,h,f,m,B,17,b[10]),m=p(m,g,h,f,C,22,b[11]),f=p(f,m,g,h,u,7,b[12]),h=p(h,f,m,g,D,12,b[13]),g=p(g,h,f,m,E,17,b[14]),m=p(m,g,h,f,x,22,b[15]),f=d(f,m,g,h,e,5,b[16]),h=d(h,f,m,g,t,9,b[17]),g=d(g,h,f,m,C,14,b[18]),m=d(m,g,h,f,c,20,b[19]),f=d(f,m,g,h,r,5,b[20]),h=d(h,f,m,g,B,9,b[21]),g=d(g,h,f,m,x,14,b[22]),m=d(m,g,h,f,z,20,b[23]),f=d(f,m,g,h,A,5,b[24]),h=d(h,f,m,g,E,9,b[25]),g=d(g,h,f,m,k,14,b[26]),m=d(m,g,h,f,v,20,b[27]),f=d(f,m,g,h,D,5,b[28]),h=d(h,f,
m,g,j,9,b[29]),g=d(g,h,f,m,w,14,b[30]),m=d(m,g,h,f,u,20,b[31]),f=l(f,m,g,h,r,4,b[32]),h=l(h,f,m,g,v,11,b[33]),g=l(g,h,f,m,C,16,b[34]),m=l(m,g,h,f,E,23,b[35]),f=l(f,m,g,h,e,4,b[36]),h=l(h,f,m,g,z,11,b[37]),g=l(g,h,f,m,w,16,b[38]),m=l(m,g,h,f,B,23,b[39]),f=l(f,m,g,h,D,4,b[40]),h=l(h,f,m,g,c,11,b[41]),g=l(g,h,f,m,k,16,b[42]),m=l(m,g,h,f,t,23,b[43]),f=l(f,m,g,h,A,4,b[44]),h=l(h,f,m,g,u,11,b[45]),g=l(g,h,f,m,x,16,b[46]),m=l(m,g,h,f,j,23,b[47]),f=s(f,m,g,h,c,6,b[48]),h=s(h,f,m,g,w,10,b[49]),g=s(g,h,f,m,
E,15,b[50]),m=s(m,g,h,f,r,21,b[51]),f=s(f,m,g,h,u,6,b[52]),h=s(h,f,m,g,k,10,b[53]),g=s(g,h,f,m,B,15,b[54]),m=s(m,g,h,f,e,21,b[55]),f=s(f,m,g,h,v,6,b[56]),h=s(h,f,m,g,x,10,b[57]),g=s(g,h,f,m,t,15,b[58]),m=s(m,g,h,f,D,21,b[59]),f=s(f,m,g,h,z,6,b[60]),h=s(h,f,m,g,C,10,b[61]),g=s(g,h,f,m,j,15,b[62]),m=s(m,g,h,f,A,21,b[63]);a[0]=a[0]+f|0;a[1]=a[1]+m|0;a[2]=a[2]+g|0;a[3]=a[3]+h|0},_doFinalize:function(){var b=this._data,n=b.words,a=8*this._nDataBytes,c=8*b.sigBytes;n[c>>>5]|=128<<24-c%32;var e=u.floor(a/
4294967296);n[(c+64>>>9<<4)+15]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360;n[(c+64>>>9<<4)+14]=(a<<8|a>>>24)&16711935|(a<<24|a>>>8)&4278255360;b.sigBytes=4*(n.length+1);this._process();b=this._hash;n=b.words;for(a=0;4>a;a++)c=n[a],n[a]=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360;return b},clone:function(){var b=v.clone.call(this);b._hash=this._hash.clone();return b}});t.MD5=v._createHelper(r);t.HmacMD5=v._createHmacHelper(r)})(Math);
(function(){var u=CryptoJS,p=u.lib,d=p.Base,l=p.WordArray,p=u.algo,s=p.EvpKDF=d.extend({cfg:d.extend({keySize:4,hasher:p.MD5,iterations:1}),init:function(d){this.cfg=this.cfg.extend(d)},compute:function(d,r){for(var p=this.cfg,s=p.hasher.create(),b=l.create(),u=b.words,q=p.keySize,p=p.iterations;u.length<q;){n&&s.update(n);var n=s.update(d).finalize(r);s.reset();for(var a=1;a<p;a++)n=s.finalize(n),s.reset();b.concat(n)}b.sigBytes=4*q;return b}});u.EvpKDF=function(d,l,p){return s.create(p).compute(d,
l)}})();
CryptoJS.lib.Cipher||function(u){var p=CryptoJS,d=p.lib,l=d.Base,s=d.WordArray,t=d.BufferedBlockAlgorithm,r=p.enc.Base64,w=p.algo.EvpKDF,v=d.Cipher=t.extend({cfg:l.extend(),createEncryptor:function(e,a){return this.create(this._ENC_XFORM_MODE,e,a)},createDecryptor:function(e,a){return this.create(this._DEC_XFORM_MODE,e,a)},init:function(e,a,b){this.cfg=this.cfg.extend(b);this._xformMode=e;this._key=a;this.reset()},reset:function(){t.reset.call(this);this._doReset()},process:function(e){this._append(e);return this._process()},
finalize:function(e){e&&this._append(e);return this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(e){return{encrypt:function(b,k,d){return("string"==typeof k?c:a).encrypt(e,b,k,d)},decrypt:function(b,k,d){return("string"==typeof k?c:a).decrypt(e,b,k,d)}}}});d.StreamCipher=v.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var b=p.mode={},x=function(e,a,b){var c=this._iv;c?this._iv=u:c=this._prevBlock;for(var d=0;d<b;d++)e[a+d]^=
c[d]},q=(d.BlockCipherMode=l.extend({createEncryptor:function(e,a){return this.Encryptor.create(e,a)},createDecryptor:function(e,a){return this.Decryptor.create(e,a)},init:function(e,a){this._cipher=e;this._iv=a}})).extend();q.Encryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize;x.call(this,e,a,c);b.encryptBlock(e,a);this._prevBlock=e.slice(a,a+c)}});q.Decryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize,d=e.slice(a,a+c);b.decryptBlock(e,a);x.call(this,
e,a,c);this._prevBlock=d}});b=b.CBC=q;q=(p.pad={}).Pkcs7={pad:function(a,b){for(var c=4*b,c=c-a.sigBytes%c,d=c<<24|c<<16|c<<8|c,l=[],n=0;n<c;n+=4)l.push(d);c=s.create(l,c);a.concat(c)},unpad:function(a){a.sigBytes-=a.words[a.sigBytes-1>>>2]&255}};d.BlockCipher=v.extend({cfg:v.cfg.extend({mode:b,padding:q}),reset:function(){v.reset.call(this);var a=this.cfg,b=a.iv,a=a.mode;if(this._xformMode==this._ENC_XFORM_MODE)var c=a.createEncryptor;else c=a.createDecryptor,this._minBufferSize=1;this._mode=c.call(a,
this,b&&b.words)},_doProcessBlock:function(a,b){this._mode.processBlock(a,b)},_doFinalize:function(){var a=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){a.pad(this._data,this.blockSize);var b=this._process(!0)}else b=this._process(!0),a.unpad(b);return b},blockSize:4});var n=d.CipherParams=l.extend({init:function(a){this.mixIn(a)},toString:function(a){return(a||this.formatter).stringify(this)}}),b=(p.format={}).OpenSSL={stringify:function(a){var b=a.ciphertext;a=a.salt;return(a?s.create([1398893684,
1701076831]).concat(a).concat(b):b).toString(r)},parse:function(a){a=r.parse(a);var b=a.words;if(1398893684==b[0]&&1701076831==b[1]){var c=s.create(b.slice(2,4));b.splice(0,4);a.sigBytes-=16}return n.create({ciphertext:a,salt:c})}},a=d.SerializableCipher=l.extend({cfg:l.extend({format:b}),encrypt:function(a,b,c,d){d=this.cfg.extend(d);var l=a.createEncryptor(c,d);b=l.finalize(b);l=l.cfg;return n.create({ciphertext:b,key:c,iv:l.iv,algorithm:a,mode:l.mode,padding:l.padding,blockSize:a.blockSize,formatter:d.format})},
decrypt:function(a,b,c,d){d=this.cfg.extend(d);b=this._parse(b,d.format);return a.createDecryptor(c,d).finalize(b.ciphertext)},_parse:function(a,b){return"string"==typeof a?b.parse(a,this):a}}),p=(p.kdf={}).OpenSSL={execute:function(a,b,c,d){d||(d=s.random(8));a=w.create({keySize:b+c}).compute(a,d);c=s.create(a.words.slice(b),4*c);a.sigBytes=4*b;return n.create({key:a,iv:c,salt:d})}},c=d.PasswordBasedCipher=a.extend({cfg:a.cfg.extend({kdf:p}),encrypt:function(b,c,d,l){l=this.cfg.extend(l);d=l.kdf.execute(d,
b.keySize,b.ivSize);l.iv=d.iv;b=a.encrypt.call(this,b,c,d.key,l);b.mixIn(d);return b},decrypt:function(b,c,d,l){l=this.cfg.extend(l);c=this._parse(c,l.format);d=l.kdf.execute(d,b.keySize,b.ivSize,c.salt);l.iv=d.iv;return a.decrypt.call(this,b,c,d.key,l)}})}();
(function(){for(var u=CryptoJS,p=u.lib.BlockCipher,d=u.algo,l=[],s=[],t=[],r=[],w=[],v=[],b=[],x=[],q=[],n=[],a=[],c=0;256>c;c++)a[c]=128>c?c<<1:c<<1^283;for(var e=0,j=0,c=0;256>c;c++){var k=j^j<<1^j<<2^j<<3^j<<4,k=k>>>8^k&255^99;l[e]=k;s[k]=e;var z=a[e],F=a[z],G=a[F],y=257*a[k]^16843008*k;t[e]=y<<24|y>>>8;r[e]=y<<16|y>>>16;w[e]=y<<8|y>>>24;v[e]=y;y=16843009*G^65537*F^257*z^16843008*e;b[k]=y<<24|y>>>8;x[k]=y<<16|y>>>16;q[k]=y<<8|y>>>24;n[k]=y;e?(e=z^a[a[a[G^z]]],j^=a[a[j]]):e=j=1}var H=[0,1,2,4,8,
16,32,64,128,27,54],d=d.AES=p.extend({_doReset:function(){for(var a=this._key,c=a.words,d=a.sigBytes/4,a=4*((this._nRounds=d+6)+1),e=this._keySchedule=[],j=0;j<a;j++)if(j<d)e[j]=c[j];else{var k=e[j-1];j%d?6<d&&4==j%d&&(k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255]):(k=k<<8|k>>>24,k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255],k^=H[j/d|0]<<24);e[j]=e[j-d]^k}c=this._invKeySchedule=[];for(d=0;d<a;d++)j=a-d,k=d%4?e[j]:e[j-4],c[d]=4>d||4>=j?k:b[l[k>>>24]]^x[l[k>>>16&255]]^q[l[k>>>
8&255]]^n[l[k&255]]},encryptBlock:function(a,b){this._doCryptBlock(a,b,this._keySchedule,t,r,w,v,l)},decryptBlock:function(a,c){var d=a[c+1];a[c+1]=a[c+3];a[c+3]=d;this._doCryptBlock(a,c,this._invKeySchedule,b,x,q,n,s);d=a[c+1];a[c+1]=a[c+3];a[c+3]=d},_doCryptBlock:function(a,b,c,d,e,j,l,f){for(var m=this._nRounds,g=a[b]^c[0],h=a[b+1]^c[1],k=a[b+2]^c[2],n=a[b+3]^c[3],p=4,r=1;r<m;r++)var q=d[g>>>24]^e[h>>>16&255]^j[k>>>8&255]^l[n&255]^c[p++],s=d[h>>>24]^e[k>>>16&255]^j[n>>>8&255]^l[g&255]^c[p++],t=
d[k>>>24]^e[n>>>16&255]^j[g>>>8&255]^l[h&255]^c[p++],n=d[n>>>24]^e[g>>>16&255]^j[h>>>8&255]^l[k&255]^c[p++],g=q,h=s,k=t;q=(f[g>>>24]<<24|f[h>>>16&255]<<16|f[k>>>8&255]<<8|f[n&255])^c[p++];s=(f[h>>>24]<<24|f[k>>>16&255]<<16|f[n>>>8&255]<<8|f[g&255])^c[p++];t=(f[k>>>24]<<24|f[n>>>16&255]<<16|f[g>>>8&255]<<8|f[h&255])^c[p++];n=(f[n>>>24]<<24|f[g>>>16&255]<<16|f[h>>>8&255]<<8|f[k&255])^c[p++];a[b]=q;a[b+1]=s;a[b+2]=t;a[b+3]=n},keySize:8});u.AES=p._createHelper(d)})();

module.exports = CryptoJS;

/***/ }),

/***/ 994:
/***/ ((module) => {

const e = {
    ItemNotExist({ path }) {
        return `文件(夹)${path || '?'}不存在`;
    },
    Unauthorized({ field, type }) {
        let s = '';
        if (type === 'empty') {
            s = '为空,请输入后重试';
        } else if (type === 'invalid') {
            s = '已过期或不合法,请重新认证';
        } else if (type === 'wrong') {
            s = '有误,请重新输入';
        }
        return `字段${field}${s}`;
    },
    CommandNotAllowed({ command }) {
        return `暂不支持${command}命令`;
    },
    DriveNotExist({ path }) {
        return `路径${path}下未配置云盘`;
    },
    ModuleNotExist({ module }) {
        return `模块${module}不存在`;
    },
    InvalidPage({ page }) {
        return `分页参数${page}不合法`;
    },
    ItemIsFile({ path }) {
        return `路径${path || '?'}对应一个文件,请注意path格式`;
    },
    ConfigError({ fields }) {
        return `参数配置有误,请注意一下这些参数[${fields.toString()}]`;
    },
    ModuleError(msg) {
        return `模块内部错误: ${msg || '???'}`;
    },
    ReadError({ msg }) {
        return `配置读取失败: ${msg}`;
    },
    SaveError({ msg }) {
        return `配置保存失败: ${msg}`;
    },
    default(type) {
        return `发生错误${type || '?'}`;
    },
};

module.exports.parseErrorMsg = function (type, data) {
    return e[type] ? e[type](data) : e.default(type);
};


/***/ }),

/***/ 309:
/***/ ((module) => {

module.exports = console;


/***/ }),

/***/ 105:
/***/ ((module) => {

const m = {
    'application/andrew-inset': ['ez'],
    'application/applixware': ['aw'],
    'application/atom+xml': ['atom'],
    'application/atomcat+xml': ['atomcat'],
    'application/atomdeleted+xml': ['atomdeleted'],
    'application/atomsvc+xml': ['atomsvc'],
    'application/atsc-dwd+xml': ['dwd'],
    'application/atsc-held+xml': ['held'],
    'application/atsc-rsat+xml': ['rsat'],
    'application/bdoc': ['bdoc'],
    'application/calendar+xml': ['xcs'],
    'application/ccxml+xml': ['ccxml'],
    'application/cdfx+xml': ['cdfx'],
    'application/cdmi-capability': ['cdmia'],
    'application/cdmi-container': ['cdmic'],
    'application/cdmi-domain': ['cdmid'],
    'application/cdmi-object': ['cdmio'],
    'application/cdmi-queue': ['cdmiq'],
    'application/cu-seeme': ['cu'],
    'application/dash+xml': ['mpd'],
    'application/davmount+xml': ['davmount'],
    'application/docbook+xml': ['dbk'],
    'application/dssc+der': ['dssc'],
    'application/dssc+xml': ['xdssc'],
    'application/ecmascript': ['ecma', 'es'],
    'application/emma+xml': ['emma'],
    'application/emotionml+xml': ['emotionml'],
    'application/epub+zip': ['epub'],
    'application/exi': ['exi'],
    'application/fdt+xml': ['fdt'],
    'application/font-tdpfr': ['pfr'],
    'application/geo+json': ['geojson'],
    'application/gml+xml': ['gml'],
    'application/gpx+xml': ['gpx'],
    'application/gxf': ['gxf'],
    'application/gzip': ['gz'],
    'application/hjson': ['hjson'],
    'application/hyperstudio': ['stk'],
    'application/inkml+xml': ['ink', 'inkml'],
    'application/ipfix': ['ipfix'],
    'application/its+xml': ['its'],
    'application/java-archive': ['jar', 'war', 'ear'],
    'application/java-serialized-object': ['ser'],
    'application/java-vm': ['class'],
    'application/javascript': ['js', 'mjs'],
    'application/json': ['json', 'map'],
    'application/json5': ['json5'],
    'application/jsonml+json': ['jsonml'],
    'application/ld+json': ['jsonld'],
    'application/lgr+xml': ['lgr'],
    'application/lost+xml': ['lostxml'],
    'application/mac-binhex40': ['hqx'],
    'application/mac-compactpro': ['cpt'],
    'application/mads+xml': ['mads'],
    'application/manifest+json': ['webmanifest'],
    'application/marc': ['mrc'],
    'application/marcxml+xml': ['mrcx'],
    'application/mathematica': ['ma', 'nb', 'mb'],
    'application/mathml+xml': ['mathml'],
    'application/mbox': ['mbox'],
    'application/mediaservercontrol+xml': ['mscml'],
    'application/metalink+xml': ['metalink'],
    'application/metalink4+xml': ['meta4'],
    'application/mets+xml': ['mets'],
    'application/mmt-aei+xml': ['maei'],
    'application/mmt-usd+xml': ['musd'],
    'application/mods+xml': ['mods'],
    'application/mp21': ['m21', 'mp21'],
    'application/mp4': ['mp4s', 'm4p'],
    'application/mrb-consumer+xml': ['*xdf'],
    'application/mrb-publish+xml': ['*xdf'],
    'application/msword': ['doc', 'dot'],
    'application/mxf': ['mxf'],
    'application/n-quads': ['nq'],
    'application/n-triples': ['nt'],
    'application/node': ['cjs'],
    'application/octet-stream': ['bin', 'dms', 'lrf', 'mar', 'so', 'dist', 'distz', 'pkg', 'bpk', 'dump', 'elc', 'deploy', 'exe', 'dll', 'deb', 'dmg', 'iso', 'img', 'msi', 'msp', 'msm', 'buffer'],
    'application/oda': ['oda'],
    'application/oebps-package+xml': ['opf'],
    'application/ogg': ['ogx'],
    'application/omdoc+xml': ['omdoc'],
    'application/onenote': ['onetoc', 'onetoc2', 'onetmp', 'onepkg'],
    'application/oxps': ['oxps'],
    'application/p2p-overlay+xml': ['relo'],
    'application/patch-ops-error+xml': ['*xer'],
    'application/pdf': ['pdf'],
    'application/pgp-encrypted': ['pgp'],
    'application/pgp-signature': ['asc', 'sig'],
    'application/pics-rules': ['prf'],
    'application/pkcs10': ['p10'],
    'application/pkcs7-mime': ['p7m', 'p7c'],
    'application/pkcs7-signature': ['p7s'],
    'application/pkcs8': ['p8'],
    'application/pkix-attr-cert': ['ac'],
    'application/pkix-cert': ['cer'],
    'application/pkix-crl': ['crl'],
    'application/pkix-pkipath': ['pkipath'],
    'application/pkixcmp': ['pki'],
    'application/pls+xml': ['pls'],
    'application/postscript': ['ai', 'eps', 'ps'],
    'application/provenance+xml': ['provx'],
    'application/pskc+xml': ['pskcxml'],
    'application/raml+yaml': ['raml'],
    'application/rdf+xml': ['rdf', 'owl'],
    'application/reginfo+xml': ['rif'],
    'application/relax-ng-compact-syntax': ['rnc'],
    'application/resource-lists+xml': ['rl'],
    'application/resource-lists-diff+xml': ['rld'],
    'application/rls-services+xml': ['rs'],
    'application/route-apd+xml': ['rapd'],
    'application/route-s-tsid+xml': ['sls'],
    'application/route-usd+xml': ['rusd'],
    'application/rpki-ghostbusters': ['gbr'],
    'application/rpki-manifest': ['mft'],
    'application/rpki-roa': ['roa'],
    'application/rsd+xml': ['rsd'],
    'application/rss+xml': ['rss'],
    'application/rtf': ['rtf'],
    'application/sbml+xml': ['sbml'],
    'application/scvp-cv-request': ['scq'],
    'application/scvp-cv-response': ['scs'],
    'application/scvp-vp-request': ['spq'],
    'application/scvp-vp-response': ['spp'],
    'application/sdp': ['sdp'],
    'application/senml+xml': ['senmlx'],
    'application/sensml+xml': ['sensmlx'],
    'application/set-payment-initiation': ['setpay'],
    'application/set-registration-initiation': ['setreg'],
    'application/shf+xml': ['shf'],
    'application/sieve': ['siv', 'sieve'],
    'application/smil+xml': ['smi', 'smil'],
    'application/sparql-query': ['rq'],
    'application/sparql-results+xml': ['srx'],
    'application/srgs': ['gram'],
    'application/srgs+xml': ['grxml'],
    'application/sru+xml': ['sru'],
    'application/ssdl+xml': ['ssdl'],
    'application/ssml+xml': ['ssml'],
    'application/swid+xml': ['swidtag'],
    'application/tei+xml': ['tei', 'teicorpus'],
    'application/thraud+xml': ['tfi'],
    'application/timestamped-data': ['tsd'],
    'application/toml': ['toml'],
    'application/ttml+xml': ['ttml'],
    'application/urc-ressheet+xml': ['rsheet'],
    'application/voicexml+xml': ['vxml'],
    'application/wasm': ['wasm'],
    'application/widget': ['wgt'],
    'application/winhlp': ['hlp'],
    'application/wsdl+xml': ['wsdl'],
    'application/wspolicy+xml': ['wspolicy'],
    'application/xaml+xml': ['xaml'],
    'application/xcap-att+xml': ['xav'],
    'application/xcap-caps+xml': ['xca'],
    'application/xcap-diff+xml': ['xdf'],
    'application/xcap-el+xml': ['xel'],
    'application/xcap-error+xml': ['xer'],
    'application/xcap-ns+xml': ['xns'],
    'application/xenc+xml': ['xenc'],
    'application/xhtml+xml': ['xhtml', 'xht'],
    'application/xliff+xml': ['xlf'],
    'application/xml': ['xml', 'xsl', 'xsd', 'rng'],
    'application/xml-dtd': ['dtd'],
    'application/xop+xml': ['xop'],
    'application/xproc+xml': ['xpl'],
    'application/xslt+xml': ['xslt'],
    'application/xspf+xml': ['xspf'],
    'application/xv+xml': ['mxml', 'xhvml', 'xvml', 'xvm'],
    'application/yang': ['yang'],
    'application/yin+xml': ['yin'],
    'application/zip': ['zip'],
    'audio/3gpp': ['*3gpp'],
    'audio/adpcm': ['adp'],
    'audio/basic': ['au', 'snd'],
    'audio/midi': ['mid', 'midi', 'kar', 'rmi'],
    'audio/mobile-xmf': ['mxmf'],
    'audio/mp3': ['*mp3'],
    'audio/mp4': ['m4a', 'mp4a'],
    'audio/mpeg': ['mpga', 'mp2', 'mp2a', 'mp3', 'm2a', 'm3a'],
    'audio/ogg': ['oga', 'ogg', 'spx'],
    'audio/s3m': ['s3m'],
    'audio/silk': ['sil'],
    'audio/wav': ['wav'],
    'audio/wave': ['*wav'],
    'audio/webm': ['weba'],
    'audio/xm': ['xm'],
    'font/collection': ['ttc'],
    'font/otf': ['otf'],
    'font/ttf': ['ttf'],
    'font/woff': ['woff'],
    'font/woff2': ['woff2'],
    'image/aces': ['exr'],
    'image/apng': ['apng'],
    'image/bmp': ['bmp'],
    'image/cgm': ['cgm'],
    'image/dicom-rle': ['drle'],
    'image/emf': ['emf'],
    'image/fits': ['fits'],
    'image/g3fax': ['g3'],
    'image/gif': ['gif'],
    'image/heic': ['heic'],
    'image/heic-sequence': ['heics'],
    'image/heif': ['heif'],
    'image/heif-sequence': ['heifs'],
    'image/hej2k': ['hej2'],
    'image/hsj2': ['hsj2'],
    'image/ief': ['ief'],
    'image/jls': ['jls'],
    'image/jp2': ['jp2', 'jpg2'],
    'image/jpeg': ['jpeg', 'jpg', 'jpe'],
    'image/jph': ['jph'],
    'image/jphc': ['jhc'],
    'image/jpm': ['jpm'],
    'image/jpx': ['jpx', 'jpf'],
    'image/jxr': ['jxr'],
    'image/jxra': ['jxra'],
    'image/jxrs': ['jxrs'],
    'image/jxs': ['jxs'],
    'image/jxsc': ['jxsc'],
    'image/jxsi': ['jxsi'],
    'image/jxss': ['jxss'],
    'image/ktx': ['ktx'],
    'image/png': ['png'],
    'image/sgi': ['sgi'],
    'image/svg+xml': ['svg', 'svgz'],
    'image/t38': ['t38'],
    'image/tiff': ['tif', 'tiff'],
    'image/tiff-fx': ['tfx'],
    'image/webp': ['webp'],
    'image/wmf': ['wmf'],
    'message/disposition-notification': ['disposition-notification'],
    'message/global': ['u8msg'],
    'message/global-delivery-status': ['u8dsn'],
    'message/global-disposition-notification': ['u8mdn'],
    'message/global-headers': ['u8hdr'],
    'message/rfc822': ['eml', 'mime'],
    'model/3mf': ['3mf'],
    'model/gltf+json': ['gltf'],
    'model/gltf-binary': ['glb'],
    'model/iges': ['igs', 'iges'],
    'model/mesh': ['msh', 'mesh', 'silo'],
    'model/mtl': ['mtl'],
    'model/obj': ['obj'],
    'model/stl': ['stl'],
    'model/vrml': ['wrl', 'vrml'],
    'model/x3d+binary': ['*x3db', 'x3dbz'],
    'model/x3d+fastinfoset': ['x3db'],
    'model/x3d+vrml': ['*x3dv', 'x3dvz'],
    'model/x3d+xml': ['x3d', 'x3dz'],
    'model/x3d-vrml': ['x3dv'],
    'text/cache-manifest': ['appcache', 'manifest'],
    'text/calendar': ['ics', 'ifb'],
    'text/coffeescript': ['coffee', 'litcoffee'],
    'text/css': ['css'],
    'text/csv': ['csv'],
    'text/html': ['html', 'htm', 'shtml'],
    'text/jade': ['jade'],
    'text/jsx': ['jsx'],
    'text/less': ['less'],
    'text/markdown': ['markdown', 'md'],
    'text/mathml': ['mml'],
    'text/mdx': ['mdx'],
    'text/n3': ['n3'],
    'text/plain': ['txt', 'text', 'conf', 'def', 'list', 'log', 'in', 'ini'],
    'text/richtext': ['rtx'],
    'text/rtf': ['*rtf'],
    'text/sgml': ['sgml', 'sgm'],
    'text/shex': ['shex'],
    'text/slim': ['slim', 'slm'],
    'text/stylus': ['stylus', 'styl'],
    'text/tab-separated-values': ['tsv'],
    'text/troff': ['t', 'tr', 'roff', 'man', 'me', 'ms'],
    'text/turtle': ['ttl'],
    'text/uri-list': ['uri', 'uris', 'urls'],
    'text/vcard': ['vcard'],
    'text/vtt': ['vtt'],
    'text/xml': ['*xml'],
    'text/yaml': ['yaml', 'yml'],
    'video/3gpp': ['3gp', '3gpp'],
    'video/3gpp2': ['3g2'],
    'video/h261': ['h261'],
    'video/h263': ['h263'],
    'video/h264': ['h264'],
    'video/jpeg': ['jpgv'],
    'video/jpm': ['*jpm', 'jpgm'],
    'video/mj2': ['mj2', 'mjp2'],
    'video/mp2t': ['ts'],
    'video/mp4': ['mp4', 'mp4v', 'mpg4'],
    'video/mpeg': ['mpeg', 'mpg', 'mpe', 'm1v', 'm2v'],
    'video/ogg': ['ogv'],
    'video/quicktime': ['qt', 'mov'],
    'video/webm': ['webm'],
};

const map = {};
Object.keys(m).forEach((t) => {
    m[t].forEach((e) => {
        map[e] = t;
    });
});

map.mkv = 'video/x-matroska';
map.flv = 'video/x-flv';
map.m3u8 = 'application/x-mpegURL';

module.exports = map;


/***/ }),

/***/ 792:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

exports.query2Obj = function (s = '', o = {}) {
    for (const [k, v] of new URLSearchParams(s)) {
        o[k] = v;
    }
    return o;
};

exports.cookie2Str = function (n, v, o = {}) {
    let s = encodeURIComponent(n) + '=' + encodeURIComponent(v);
    const { maxAge, domain, path, expires, httpOnly, secure, sameSite } = o;
    s += typeof maxAge === 'number' ? '; Max-Age=' + maxAge : '';
    domain ? (s += '; Domain=' + domain) : '';
    path ? (s += '; Path=' + path) : '';
    expires ? (s += '; Expires=' + expires) : '';
    httpOnly ? (s += '; HttpOnly') : '';
    secure ? (s += '; Secure') : '';
    sameSite ? (s += '; SameSite=' + sameSite) : '';
    return s;
};

exports._sha1 = __nccwpck_require__(579);

exports.path = {
    basename: (s) => (s ? s.slice(s.lastIndexOf('/') + 1) : ''),
    extname: (s) => (s ? s.slice(s.lastIndexOf('.') + 1) : ''),
};

const request = (exports.request = __nccwpck_require__(855));
request.defaults.timeout = 5000;

exports.exposeHeadersWhenProxy = function (k) {
    if (typeof k !== 'string') {
        return false;
    }
    k = k.toLowerCase();
    if (k.startsWith('content-')) {
        return k;
    }
    return ['accept-ranges', 'date'].includes(k);
};

const mime = __nccwpck_require__(105);
exports.mime = {
    get: (path) => mime[path.slice(path.lastIndexOf('.') + 1)] || 'application/vnd.op-unknown',
};

const NUM_CHARS = {};
'0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ'.split('').forEach((v, i) => {
    NUM_CHARS[i] = v;
    NUM_CHARS[v] = i;
});

exports.NumberUtil = {
    parse62: (s) => {
        let num = 0,
            base = 1;
        s.split('')
            .reverse()
            .forEach((c) => {
                num += NUM_CHARS[c] * base;
                base *= 62;
            });
        return num;
    },
    to62: (n) => {
        const arr = [];
        while (n > 0) {
            arr.push(NUM_CHARS[n % 62]);
            n = Math.floor(n / 62);
        }
        if (arr.length === 0) {
            return '0';
        }
        return arr.reverse().join('');
    },
};

const { parseErrorMsg } = __nccwpck_require__(994);

class RTError extends Error {
    constructor(status, type, data) {
        super(parseErrorMsg(type, data || {}));
        this.status = status;
        this.type = type;
        this.data = data || {};
        this.expose = true;
    }
}

exports.RTError = RTError;

const logger = __nccwpck_require__(309);

class IDHelper {
    constructor(root) {
        this.root = root;
        this.icache = {};
        this.etime = Date.now() + 3600 * 1000;
    }

    get isValid() {
        return Date.now() < this.etime;
    }

    async findChildItem(pid, name) {
        return Promise.reject(new RTError(500, 'unsupported method: findChildItem(' + pid + ',' + name + ')'));
    }

    async getIDByPath(path = '/') {
        return this.getItemByPath(path).then((e) => e.id);
    }

    async getItemByPath(path) {
        return this._getItemByPath(
            path.split('/').filter((e) => e),
            { type: 1, id: this.root }
        );
    }

    async _getItemByPath(paths, item) {
        if (paths.length === 0) {
            return item;
        }
        const pid = item.id;
        const cache = this.icache[pid] || {};
        const name = paths.shift();
        if (!cache[name] || cache[name].etime < Date.now()) {
            logger.info('pid:' + pid + ' ' + name);
            const cItem = await this.findChildItem(pid, name);
            if (!cItem) {
                throw new RTError(404, 'ItemNotExist');
            }
            cItem.etime = Date.now() + 300000;
            cache[name] = cItem;
            // 保证path中出现的都是文件夹
            if (cItem.type !== 1 && paths.length > 0) {
                throw new RTError(404, 'ItemNotExist');
            }
        }
        this.icache[pid] = cache;
        return this._getItemByPath(paths, cache[name]);
    }
}

exports.IDHelper = IDHelper;

exports.P = exports._P = (name, value, desc, level, meta, textarea, star) => {
    const r = { name, value, desc, level };
    if (Array.isArray(meta)) {
        r.select = meta;
    } else {
        r.placeholder = meta;
        if (textarea) {
            r.textarea = true;
        }
    }
    if (star) {
        r.star = true;
    }
    if (meta.hidden) {
        r.hidden = true;
    }
    return r;
};

exports.beautifyObject = function beautifyObject(ob) {
    if (Array.isArray(ob)) {
        return ob.map((e) => beautifyObject(e));
    }
    if (typeof ob === 'string' || typeof ob === 'number' || typeof ob === 'boolean') {
        return ob;
    }
    const nob = {};
    Object.keys(ob)
        .sort()
        .forEach((k) => {
            nob[k] = typeof ob[k] === 'object' ? beautifyObject(ob[k]) : ob[k];
        });
    return nob;
};

exports.deleteAttributes = function (obj, arr) {
    arr.forEach((e) => delete obj[e]);
};


/***/ }),

/***/ 678:
/***/ ((module) => {

const SimpleRouter = function () {
    this.routers = {
        GET: {},
        POST: {},
        DELETE: {},
        prefix: [],
        regex: [],
        default: () => {},
    };
};
SimpleRouter.prototype.add = function (m, p, f) {
    if (Array.isArray(m)) {
        m.forEach((e) => {
            this.routers[e][p] = f;
        });
    }
    if (typeof m === 'string') {
        this.routers[m][p] = f;
    }
};

SimpleRouter.prototype.get = function (p, f) {
    this.routers.GET[p] = f;
};
SimpleRouter.prototype.post = function (p, f) {
    this.routers.POST[p] = f;
};
SimpleRouter.prototype.delete = function (p, f) {
    this.routers.DELETE[p] = f;
};
SimpleRouter.prototype.setDefault = function (f) {
    this.routers.default = f;
};
SimpleRouter.prototype.regex = function (p, f) {
    this.routers.regex.push({ p, f });
};
SimpleRouter.prototype.prefix = function (p, f) {
    this.routers.prefix.push({ p, f });
};
SimpleRouter.prototype.handle = async function (ctx, next, path) {
    const m = ctx.request.method;
    if (this.routers[m] && this.routers[m][path]) {
        return this.routers[m][path](ctx);
    }
    const item = this.routers.regex.find(({ p }) => p.test(path));
    if (item) {
        return item.f(ctx, next, path);
    }

    const item1 = this.routers.prefix.find(({ p }) => path.startsWith(p));
    if (item1) {
        return item1.f(ctx, next, path.slice(item1.p.length));
    }
    return this.routers.default(ctx, next, path);
};

module.exports = SimpleRouter;


/***/ }),

/***/ 220:
/***/ ((module) => {

function request({ method, url, headers, body }, config) {
    return new Promise((resolve, reject) => {
        const abort = { state: false, schedule: null };

        if (config.timeout) {
            abort.schedule = setTimeout(() => {
                abort.state = true;
                reject(new Error('timeout of ' + config.timeout + 'ms exceeded'));
            }, config.timeout);
        }
        fetch(url, {
            method,
            headers: new Headers(headers),
            body,
            redirect: 'manual',
        })
            .then((res) => {
                if (abort.state) {
                    return;
                }
                if (abort.schedule) {
                    clearTimeout(abort.schedule);
                }

                const h = {};
                for (const [k, v] of res.headers) {
                    h[k] = v;
                }
                if (h['set-cookie']) {
                    // set-cookie is special
                    h['set-cookie'] = h['set-cookie'].split(/(?<!=\w{3}),/).filter((e) => e.trim());
                }

                const response = {
                    status: res.status,
                    headers: h,
                    data: '',
                };

                if (config.responseType === 'stream') {
                    response.data = res.body;
                    return resolve(response);
                }

                if ((response.status >= 300 && response.status < 400) || response.status === 204 || method === 'HEAD') {
                    return resolve(response);
                }

                // just delete
                if (['gzip', 'compress', 'deflate'].includes(response.headers['content-encoding'])) {
                    delete response.headers['content-encoding'];
                }

                let responseData = res;
                switch (config.responseType) {
                    case 'arraybuffer':
                        responseData = responseData.arrayBuffer();
                        break;
                    case 'blob':
                        responseData = responseData.blob();
                        break;
                    default:
                        responseData = responseData.text();
                }

                // consume response
                if (!responseData) {
                    reject(new Error('Failed to resolve response stream.'));
                } else {
                    responseData.then(
                        (data) => {
                            response.data = data;
                            resolve(response);
                        },
                        (dataErr) => {
                            reject(dataErr || new Error('Stream decode error'));
                        }
                    );
                }
            })
            .catch((err) => {
                if (abort.state) {
                    return;
                }
                if (abort.schedule) {
                    clearTimeout(abort.schedule);
                }
                if (err instanceof Error) {
                    reject(err);
                } else {
                    reject(new Error('Network Error'));
                }
            });
    });
}

module.exports = request;


/***/ }),

/***/ 855:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

/**
 * 很純粹的http请求工具
 *
 * 不支持重定向，需要手动处理
 *
 * method 需要大写
 * url 可以包含中文字符
 * headers 字段大写格式
 * responseType 支持 json text
 *
 * 支持默认baseURL, headers
 */

function setIfUndefined(o, a, v) {
    o[a] === undefined ? (o[a] = v) : '';
}

const adapters = {};
adapters.n = __nccwpck_require__(468);
adapters.f = __nccwpck_require__(220);

function getDefaultAdapter() {
    return adapters[typeof fetch === 'function' ? 'f' : 'n'];
}

function mergeConfig(config1, config2) {
    return Object.assign({}, config1, config2, { headers: Object.assign({}, config1.headers, config2.headers) });
}

function buildFullURL(url, baseURL, params) {
    const u = new URL(url, baseURL || 'http://example.com');
    if (!['http:', 'https:'].includes(u.protocol)) {
        // url中包含了 :
        if (url[0] === '/') {
            u.href = baseURL;
            u.pathname = url;
        } else {
            u.href = baseURL + url;
        }
    }

    if (params) {
        const _searchParams = u.searchParams;
        Object.entries(params).forEach(([k, v]) => _searchParams.set(k, v.toString()));
    }

    return u.href;
}

const defaults = {
    baseURL: '',
    headers: {},
    responseType: 'json',
    adapter: getDefaultAdapter(),
    onResponse: (d) => d,
};

class Request {
    constructor(config) {
        this.defaults = config;
    }

    async request(config) {
        config = mergeConfig(this.defaults, config);

        const { url, method, headers, body, data, baseURL, params } = config;
        const req = { method: (method || 'GET').toUpperCase(), headers };

        req.url = buildFullURL(url, baseURL, params);

        setIfUndefined(headers, 'User-Agent', 'tiny-request/0.0');
        setIfUndefined(headers, 'Accept', 'application/json, text/plain, */*');

        if (['GET', 'HEAD'].includes(req.method)) {
            req.body = null;
        } else if (body) {
            req.body = body;
        } else if (data instanceof URLSearchParams) {
            setIfUndefined(headers, 'Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            req.body = data.toString();
        } else if (data && typeof data === 'object') {
            setIfUndefined(headers, 'Content-Type', 'application/json;charset=utf-8');
            req.body = JSON.stringify(data);
        } else if (typeof data === 'string') {
            req.body = data;
        } else {
            req.body = '';
        }

        return config
            .adapter(req, config)
            .then((res) => {
                if (res.data && config.responseType === 'json' && typeof res.data === 'string') {
                    try {
                        res.data = JSON.parse(res.data);
                    } catch (e) {}
                }
                res.request = req;
                res.config = config;
                return res;
            })
            .then(config.onResponse)
            .catch((e) => {
                e.isHttpError = true;
                if (Object.getPrototypeOf(e) === Error.prototype) {
                    e.message = 'Internal HttpError: ' + e.message;
                }
                return Promise.reject(e);
            });
    }

    async reject() {}
}

// Provide aliases for supported request methods
['delete', 'get', 'head', 'options'].forEach((m) => {
    Request.prototype[m] = function (url, config = {}) {
        config.method = m;
        config.url = url;
        return this.request(config);
    };
});

['post', 'put', 'patch'].forEach((m) => {
    Request.prototype[m] = function (url, data = '', config = {}) {
        config.method = m;
        config.url = url;
        config.data = data;
        return this.request(config);
    };
});

// Create the default instance to be exported
const request = new Request(defaults);

request.Request = Request;

// Factory for creating new instances
request.create = function create(config) {
    return new Request(mergeConfig(this.defaults, config));
};

module.exports = request;

// Allow use of default import syntax in TypeScript
module.exports.default = request;


/***/ }),

/***/ 468:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const http = __nccwpck_require__(605);
const https = __nccwpck_require__(211);
const zlib = __nccwpck_require__(761);

// utf8解码未处理bom
async function request({ method, url, headers, body }, config) {
    const u = new URL(url);
    const options = {
        hostname: u.hostname,
        port: u.port,
        path: u.pathname + u.search,
        method,
        headers,
    };

    if (config.proxy) {
        options.hostname = config.proxy.host;
        options.port = config.proxy.port;
        options.path = url;
        headers.Host = u.host;
    }

    return new Promise((resolve, reject) => {
        const transport = u.protocol === 'https:' && !config.proxy ? https : http;

        // Create the request
        const req = transport.request(options, function handleResponse(res) {
            if (req.aborted) {
                return;
            }

            const response = {
                status: res.statusCode,
                headers: res.headers,
                data: '',
            };
            // forward stream, do nothing!
            if (config.responseType === 'stream') {
                response.data = res;
                resolve(response);
                return;
            }

            // if redirect or no content or HEAD method, do not need body!
            if ((response.status >= 300 && response.status < 400) || response.status === 204 || method === 'HEAD') {
                resolve(response);
                return;
            }

            let stream = res;

            if (['gzip', 'compress', 'deflate'].includes(response.headers['content-encoding'])) {
                // add the unzipper to the body stream processing pipeline
                stream = stream.pipe(zlib.createUnzip());
                // remove the content-encoding in order to not confuse downstream operations
                delete response.headers['content-encoding'];
            }

            const responseBuffer = [];
            stream.on('data', function handleStreamData(chunk) {
                responseBuffer.push(chunk);
            });

            stream.on('error', function handleStreamError(err) {
                if (req.aborted) {
                    return;
                }
                reject(err);
            });

            stream.on('end', function handleStreamEnd() {
                let responseData = Buffer.concat(responseBuffer);
                if (config.responseType !== 'arraybuffer') {
                    responseData = responseData.toString('utf8');
                }
                response.data = responseData;
                resolve(response);
            });
        });

        // Handle errors
        req.on('error', function handleRequestError(err) {
            if (req.aborted) {
                return;
            }
            reject(err);
        });

        // Handle request timeout
        if (config.timeout) {
            // Sometime, the response will be very slow, and does not respond, the connect event will be block by event loop system.
            // And timer callback will be fired, and abort() will be invoked before connection, then get "socket hang up" and code ECONNRESET.
            // At this time, if we have a large number of request, nodejs will hang up some socket on background. and the number will up and up.
            // And then these socket which be hang up will devoring CPU little by little.
            // ClientRequest.setTimeout will be fired on the specify milliseconds, and can make sure that abort() will be fired after connect.
            req.setTimeout(config.timeout, function handleRequestTimeout() {
                req.abort();
                reject(new Error('timeout of ' + config.timeout + 'ms exceeded'));
            });
        }

        // Send the request
        req.end(body);
    });
}

module.exports = request;


/***/ }),

/***/ 579:
/***/ ((module) => {

// https://github.com/jbt/tiny-hashes/blob/master/sha1/sha1.js
function sha1(b) {
    var i,
        W = [],
        A,
        B,
        C,
        D,
        h = [(A = 0x67452301), (B = 0xefcdab89), ~A, ~B, 0xc3d2e1f0],
        words = [],
        s = unescape(encodeURI(b)) + '\x80',
        j = s.length;

    // See "Length bits" in notes
    words[(b = (--j / 4 + 2) | 15)] = j * 8;

    for (; ~j; ) {
        // j !== -1
        words[j >> 2] |= s.charCodeAt(j) << (8 * ~j--);
        // words[j >> 2] |= s.charCodeAt(j) << 24 - 8 * j--;
    }

    for (i = j = 0; i < b; i += 16) {
        A = h;

        for (
            ;
            j < 80;
            A = [
                A[4] +
                    (W[j] = j < 16 ? ~~words[i + j] : (s * 2) | (s < 0)) + // s << 1 | s >>> 31
                    1518500249 +
                    [(B & C) | (~B & D), (s = (B ^ C ^ D) + 341275144), ((B & C) | (B & D) | (C & D)) + 882459459, s + 1535694389][/* 0 | (j++ / 20)*/ (j++ / 5) >> 2] +
                    (((s = A[0]) << 5) | (s >>> 27)),
                s,
                (B << 30) | (B >>> 2),
                C,
                D,
            ]
        ) {
            s = W[j - 3] ^ W[j - 8] ^ W[j - 14] ^ W[j - 16];
            B = A[1];
            C = A[2];
            D = A[3];
        }

        // See "Integer safety" in notes
        for (j = 5; j; ) {
            h[--j] += A[j];
        }

        // j === 0
    }

    for (s = ''; j < 40; ) {
        // s += ((h[j >> 3] >> 4 * ~j++) & 15).toString(16);
        s += ((h[j >> 3] >> ((7 - j++) * 4)) & 15).toString(16);
        // s += ((h[j >> 3] >> -4 * ++j) & 15).toString(16);
    }

    return s;
}

module.exports = sha1;


/***/ }),

/***/ 545:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const op = __nccwpck_require__(146);

class V {
    constructor(ctx) {
        this.ctx = ctx;
        this.request = ctx.request;
        this.response = ctx.response;
        this.site = op.config.site;
    }

    get navs() {
        const path = this.request.path;
        const q = this.request.query;
        const arr = [{ name: 'root' }];
        path.split('/')
            .filter((e) => e)
            .forEach((e) => {
                arr.push({ name: e });
            });
        if (path.endsWith('/')) {
            let p = './';
            for (let i = arr.length - 1; i >= 0; i--) {
                arr[i].href = p;
                p += '../';
            }
            if (q.id) {
                arr[arr.length - 1].href += '?id=' + encodeURIComponent(q.id);
            }
        } else {
            arr[arr.length - 1].href = (q.preview !== undefined ? '?preview' : '?') + this.appendReqQueryID;
            let p = './';
            for (let i = arr.length - 2; i >= 0; i--) {
                arr[i].href = p;
                p += '../';
            }
        }
        return arr;
    }

    get list() {
        return this.response.data.list;
    }

    get hasPrev() {
        return this.response.data.prevToken;
    }

    get prevHref() {
        return '?page=' + encodeURIComponent(this.response.data.prevToken) + this.appendReqQueryID;
    }

    get hasParent() {
        return this.request.path !== '/';
    }

    get hasNext() {
        return this.response.data.nextToken;
    }

    get nextHref() {
        return '?page=' + encodeURIComponent(this.response.data.nextToken) + this.appendReqQueryID;
    }

    get appendReqQueryID() {
        const id = this.request.query.id;
        return id ? '&id=' + encodeURIComponent(id) : '';
    }

    get isEmpty() {
        return this.response.data.list.length === 0;
    }

    previewHref(e, p = true) {
        if (e.type === 0) {
            return `${e.name}${e.id ? '?id=' + encodeURIComponent(e.id) : ''}${p ? (e.id ? '&preview' : '?preview') : ''}`;
        } else {
            return `${e.name}/${e.id ? '?id=' + encodeURIComponent(e.id) : ''}`;
        }
    }

    get file() {
        return this.response.data.file;
    }

    get previewType() {
        const f = this.file;
        const m = f.mime;
        if (m.startsWith('image/')) {
            return 'image';
        }
        if (m.startsWith('video/')) {
            return 'video';
        }
        if (m.startsWith('audio/')) {
            return 'audio';
        }
        if (['doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'mpp', 'rtf', 'vsd', 'vsdx'].includes(f.name.slice(f.name.lastIndexOf('.') + 1))) {
            return 'office';
        }
        if (m.endsWith('pdf')) {
            return 'pdf';
        }
        if (f.size < 16 * 1024) {
            return 'text';
        }
        if (m.startsWith('text')) {
            return 'bigText';
        }
        return '';
    }

    // @warning 考虑放弃proxy功能
    get downloadUrl() {
        return (this.request.cookies.PROXY_DOWN || '') + this.response.data.file.url;
    }

    get hasPassword() {
        return this.response.data.error === 'Unauthorized';
    }

    get passwordHint() {
        const { type, field } = this.response.data.data;
        return field + ' ' + type;
    }

    get jsonData() {
        return JSON.stringify(this.response.data, null, 2);
    }

    get readme() {
        return ((this.ctx.$node || {}).$config || {}).readme || op.config.site.readme;
    }

    get readmeUrl() {
        return this.response.isList && this.response.data.list.find((e) => e.name === 'README.md') ? 'README.md' : '';
    }

    get cacheTime() {
        return this.response.data.cached;
    }

    get refreshHref() {
        const q = this.request.query;
        return '?refresh' + (q.preview === undefined ? '' : '&preview') + this.appendReqQueryID + (q.page ? '&page=' + encodeURIComponent(q.page) : '');
    }

    encodeURIComponent(u) {
        return encodeURIComponent(u);
    }
}

module.exports = V;


/***/ }),

/***/ 950:
/***/ ((module) => {

"use strict";


/*! art-template@runtime | https://github.com/aui/art-template */

var globalThis = typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {};

var runtime = Object.create(globalThis);
var ESCAPE_REG = /["&'<>]/;

/**
 * 编码模板输出的内容
 * @param  {any}        content
 * @return {string}
 */
runtime.$escape = function (content) {
    return xmlEscape(toString(content));
};

/**
 * 迭代器，支持数组与对象
 * @param {array|Object} data
 * @param {function}     callback
 */
runtime.$each = function (data, callback) {
    if (Array.isArray(data)) {
        for (var i = 0, len = data.length; i < len; i++) {
            callback(data[i], i);
        }
    } else {
        for (var _i in data) {
            callback(data[_i], _i);
        }
    }
};

// 将目标转成字符
function toString(value) {
    if (typeof value !== 'string') {
        if (value === undefined || value === null) {
            value = '';
        } else if (typeof value === 'function') {
            value = toString(value.call(value));
        } else {
            value = JSON.stringify(value);
        }
    }

    return value;
}

// 编码 HTML 内容
function xmlEscape(content) {
    var html = '' + content;
    var regexResult = ESCAPE_REG.exec(html);
    if (!regexResult) {
        return content;
    }

    var result = '';
    var i = void 0,
        lastIndex = void 0,
        char = void 0;
    for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
        switch (html.charCodeAt(i)) {
            case 34:
                char = '&#34;';
                break;
            case 38:
                char = '&#38;';
                break;
            case 39:
                char = '&#39;';
                break;
            case 60:
                char = '&#60;';
                break;
            case 62:
                char = '&#62;';
                break;
            default:
                continue;
        }

        if (lastIndex !== i) {
            result += html.substring(lastIndex, i);
        }

        lastIndex = i + 1;
        result += char;
    }

    if (lastIndex !== i) {
        return result + html.substring(lastIndex, i);
    } else {
        return result;
    }
}

module.exports = runtime;

/***/ }),

/***/ 136:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const $imports = __nccwpck_require__(950);module.exports={name:"simple.art"};module.exports.render=function($data){
'use strict'
$data=$data||{}
var $$out='',$escape=$imports.$escape,$V=$data.$V,navs=$data.navs,$each=$imports.$each,$value=$data.$value,$index=$data.$index,response=$data.response
$$out+="<!DOCTYPE html><html lang=\"zh-CN\"><head><meta charset=\"utf-8\"><link rel=\"shortcut icon\" href=\""
$$out+=$escape($V.site.logo)
$$out+="\"><title>"
$$out+=$escape($V.site.name)
$$out+="</title></head><body><div class=\"content\"><div> "
var navs=$V.navs
$$out+=" "
$each(navs,function($value,$index){
$$out+=" "
if($index===0){
$$out+=" <span><a href=\""
$$out+=$value.href
$$out+="\">Home</a></span> "
}else{
$$out+=" <span>/</span> <span><a href=\""
$$out+=$value.href
$$out+="\">"
$$out+=$escape($value.name)
$$out+="</a></span> "
}
$$out+=" "
})
$$out+=" </div> "
if(response.isList){
$$out+=" "
$each($V.list,function($value,$index){
$$out+=" <div><a href=\""
$$out+=$V.previewHref($value,false)
$$out+="\">"
$$out+=$escape($value.name)
$$out+="</a></div> "
})
$$out+=" "
if($V.hasNext){
$$out+=" <div><a href=\""
$$out+=$V.nextHref
$$out+="\">Next...</a></div> "
}
$$out+=" "
}else{
$$out+=" <div><pre><code>"
$$out+=$escape($V.jsonData)
$$out+="</code></pre></div> "
}
$$out+=" </div></body></html>"
return $$out
}

/***/ }),

/***/ 255:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const $imports = __nccwpck_require__(950);module.exports={name:"w.w.art"};module.exports.render=function($data){
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
$$out+=" </div><div class=\"text-right py-3 pl-3\"><a class=\"text-muted\" target=\"_blank\" href=\"https://github.com/ukuq/onepoint\">Just One Point.</a> <a class=\"text-muted ml-2\" href=\""
$$out+=$escape($V.refreshHref)
$$out+="\">Cache "
$$out+=$escape($V.cacheTime?'Hit':'Miss')
$$out+=".</a></div> "
$$out+=$V.site.html
$$out+=" </div></body></html>"
return $$out
}

/***/ }),

/***/ 155:
/***/ ((module) => {

module.exports = {
    render: () => {}
};


/***/ }),

/***/ 306:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"author":"ukuq","bugs":{"url":"https://github.com/ukuq/onepoint/issues"},"dependencies":{},"description":"a tiny file index and manage program","devDependencies":{"@vercel/ncc":"^0.28.6","art-template":"^4.13.2","eslint":"^7.16.0","eslint-config-prettier":"^7.1.0","eslint-plugin-prettier":"^3.3.0","html-minifier-terser":"^5.1.1","prettier":"^2.2.1"},"files":["lib"],"homepage":"https://github.com/ukuq/onepoint#readme","keywords":["onepoint","onedrive","google-drive","scf","serverless"],"license":"MIT","main":"lib/app.js","name":"onepoint","prettier":{"printWidth":233,"singleQuote":true,"tabWidth":4,"trailingComma":"es5"},"repository":{"type":"git","url":"git+https://github.com/ukuq/onepoint.git"},"scripts":{"__local_start":"node lib/starters/local-test.js","__pre_commit":"node tmp/pre-commit.js","build:ncc":"node ncc/build.js","format":"eslint \\"**/*.js\\" --fix && prettier \\"**/*.{js,json}\\" --write","format:check":"eslint \\"**/*.js\\" && prettier \\"**/*.{js,json}\\" --check","start":"node lib/starters/node-http.js"},"version":"2.0.1","version2":"210620"}');

/***/ }),

/***/ 747:
/***/ ((module) => {

"use strict";
module.exports = require("fs");;

/***/ }),

/***/ 605:
/***/ ((module) => {

"use strict";
module.exports = require("http");;

/***/ }),

/***/ 211:
/***/ ((module) => {

"use strict";
module.exports = require("https");;

/***/ }),

/***/ 761:
/***/ ((module) => {

"use strict";
module.exports = require("zlib");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(517);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;