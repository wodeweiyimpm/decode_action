//Wed Nov 27 2024 06:43:56 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const $ = new Env("霸王茶姬"),
  axios = require("axios"),
  axiosRetry = require("axios-retry").default,
  {
    sendNotify
  } = require("./sendNotify"),
  SyncRequest = require("sync-request"),
  CryptoJS = require("crypto-js");
let notifyStr = "",
  appid = atob("d3hhZmVjNmY4NDIyY2IzNTdi");
(async () => {
  axiosRetry(axios, {
    retries: 3
  });
  checkVersion("bwcj.js", "cb975d12c9b25ce0269196ec287a59ee");
  const _0x9366c6 = process.env.bwcj_ck;
  if (!_0x9366c6) {
    logAndNotify("bwcj_ck");
    return;
  }
  let _0x5e4d5f = _0x9366c6.replaceAll("&", "\n").split("\n");
  for (let _0x36daa2 = 0; _0x36daa2 < _0x5e4d5f.length; _0x36daa2++) {
    if (_0x5e4d5f[_0x36daa2].indexOf("#") === -1) {
      logAndNotify("账号【" + (_0x36daa2 + 1) + "】 ck格式有变化，新版本需要有userId☹");
      continue;
    }
    const _0x10d344 = _0x5e4d5f[_0x36daa2].split("#")[0],
      _0xafbab7 = _0x5e4d5f[_0x36daa2].split("#")[1];
    logAndNotify("🧐" + _0xafbab7 + "🧐");
    const _0x22c2da = await sendGetRequest("https://webapi2.qmai.cn/web/catering2-apiserver/crm/customer-center?appid=" + appid, _0x10d344);
    if (!_0x22c2da.data.status) {
      logAndNotify("账号【" + (_0x36daa2 + 1) + "】 登录失败☹");
      continue;
    }
    const _0x1b177c = await sendPostRequest("https://webapi2.qmai.cn/web/cmk-center/sign/userSignStatistics", _0x10d344, {
      activityId: "947079313798000641",
      appid: appid
    });
    if (_0x1b177c.data.status) {
      logAndNotify("账号【" + (_0x36daa2 + 1) + "】 连续签到" + _0x1b177c.data.data.signDays + "天");
      if (_0x1b177c.data.data.signStatus != 1) {
        const _0x1aac39 = new Date().getTime(),
          _0x347dcb = await sendPostRequest("https://webapi2.qmai.cn/web/cmk-center/sign/takePartInSign", _0x10d344, {
            activityId: "947079313798000641",
            appid: appid,
            storeId: 49006,
            timestamp: _0x1aac39,
            signature: sgin(_0x1aac39, _0xafbab7),
            store_id: 49006
          });
        if (!_0x347dcb.data.status) {
          _0x347dcb.data.message.indexOf("已签到") !== -1 && logAndNotify("账号【" + (_0x36daa2 + 1) + "】 签到失败：【" + _0x347dcb.data.message + "】");
          if (_0x347dcb.data.message.indexOf("请重试") !== -1) {
            logAndNotify("账号【" + (_0x36daa2 + 1) + "】 签到失败：【" + _0x347dcb.data.message + "】");
            logAndNotify("账号【" + (_0x36daa2 + 1) + "】 触发ip限制 本次不再执行脚本，号多的每天多运行几次脚本，间隔2小时以上");
            break;
          } else {
            logAndNotify("账号【" + (_0x36daa2 + 1) + "】 签到失败☹：【" + _0x347dcb.data.message + "】");
          }
        } else {
          logAndNotify("账号【" + (_0x36daa2 + 1) + "】 签到成功");
        }
      } else {
        logAndNotify("账号【" + (_0x36daa2 + 1) + "】 已签到");
      }
    }
    const _0x58879b = await sendGetRequest("https://webapi2.qmai.cn/web/catering2-apiserver/crm/customer-center?appid=" + appid, _0x10d344);
    _0x58879b.data.status && logAndNotify("账号【" + (_0x36daa2 + 1) + "】 积分：【" + _0x58879b.data.data.customerAssertInfo.integral + "】");
    const _0x4d843f = await sendPostRequest("https://webapi2.qmai.cn/web/cmk-center/sign/userReward", _0x10d344, {
      activityId: "947079313798000641",
      appid: appid,
      pageNo: 1,
      pageSize: 30
    });
    if (_0x4d843f.data.status) {
      const _0x2a35c7 = _0x4d843f.data.data.list;
      for (let _0xe88a98 = 0; _0xe88a98 < _0x2a35c7.length; _0xe88a98++) {
        _0x2a35c7[_0xe88a98].rewardType === 1 && logAndNotify("账号【" + (_0x36daa2 + 1) + "】 奖品领取时间【" + _0x2a35c7[_0xe88a98].date + "】【" + _0x2a35c7[_0xe88a98].rewardName + "】");
      }
    }
  }
})().catch(_0x5746f1 => {
  logAndNotify(_0x5746f1);
}).finally(() => {
  pushLog("bwcj.js", notifyStr);
  sendNotify("霸王茶姬", notifyStr);
  $.done();
});
async function sendPostRequest(_0x1af85d, _0x5431c3, _0x240be8) {
  try {
    const _0x29d332 = {
        scene: 1027,
        "Qm-From": "wechat",
        "store-id": 49006,
        "Qm-From-Type": "catering",
        Referer: "https://servicewechat.com/wxafec6f8422cb357b/175/page-frame.html"
      },
      _0x25db6d = {
        ..._0x29d332,
        ...{
          "Qm-User-Token": _0x5431c3
        }
      },
      _0x56c75d = axios.create({
        headers: _0x25db6d,
        timeout: 60000
      });
    return _0x56c75d.post(_0x1af85d, _0x240be8);
  } catch (_0x46ba70) {
    if (axios.isAxiosError(_0x46ba70)) {
      _0x46ba70.code === "ECONNABORTED" && _0x46ba70.message.includes("timeout") ? console.error("请求超时：", _0x46ba70.message) : console.error("其他错误：", _0x46ba70.message);
    } else {
      console.error("未知错误：", _0x46ba70);
    }
    throw _0x46ba70;
  }
}
async function sendGetRequest(_0x50bd8f, _0x418442) {
  try {
    const _0x50fe27 = {
        scene: 1027,
        "Qm-From": "wechat",
        "store-id": 49006,
        "Qm-From-Type": "catering",
        Referer: "https://servicewechat.com/wxafec6f8422cb357b/175/page-frame.html"
      },
      _0x55302c = {
        ..._0x50fe27,
        ...{
          "Qm-User-Token": _0x418442
        }
      },
      _0x324779 = axios.create({
        headers: _0x55302c,
        timeout: 60000
      });
    return _0x324779.get(_0x50bd8f);
  } catch (_0x2250b0) {
    if (axios.isAxiosError(_0x2250b0)) {
      if (_0x2250b0.code === "ECONNABORTED" && _0x2250b0.message.includes("timeout")) {
        console.error("请求超时：", _0x2250b0.message);
      } else {
        console.error("其他错误：", _0x2250b0.message);
      }
    } else {
      console.error("未知错误：", _0x2250b0);
    }
    throw _0x2250b0;
  }
}
function delay(_0x33f610) {
  return new Promise(_0x20d54d => setTimeout(_0x20d54d, _0x33f610));
}
function logAndNotify(_0x1bd58b) {
  1;
  $.log(_0x1bd58b);
  notifyStr += _0x1bd58b;
  notifyStr += "\n";
}
function sgin(_0x3476a5, _0x4ddd3e) {
  var _0x376619 = "947079313798000641",
    _0x2b7dd8 = 49006,
    _0x353e1c = _0x2b7dd8 ? _0x2b7dd8.toString() : undefined,
    _0x51bf46 = {
      activityId: _0x376619,
      sellerId: _0x353e1c,
      timestamp: _0x3476a5,
      userId: _0x4ddd3e
    },
    _0x3b1a6d = Object.keys(_0x51bf46).sort(),
    _0x13e143 = _0x3b1a6d.reduce(function (_0x103a9d, _0x3759b6) {
      _0x103a9d[_0x3759b6] = _0x51bf46[_0x3759b6];
      return _0x103a9d;
    }, {}),
    _0x68bc1a = Object.entries(_0x13e143).map(function (_0x4f33ee) {
      var [_0x404623, _0x400f86] = _0x4f33ee;
      return _0x404623 + "=" + _0x400f86;
    }).join("&") + "&key=" + _0x376619.split("").reverse().join(""),
    _0x17e02e = CryptoJS.MD5(_0x68bc1a).toString(CryptoJS.enc.Hex).toUpperCase();
  return _0x17e02e;
}
function Env(_0x2158dc, _0x319f5c) {
  "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
  class _0x43719d {
    constructor(_0x1731ae) {
      this.env = _0x1731ae;
    }
    send(_0x48ad83, _0x285c1a = "GET") {
      _0x48ad83 = "string" == typeof _0x48ad83 ? {
        url: _0x48ad83
      } : _0x48ad83;
      let _0x392801 = this.get;
      "POST" === _0x285c1a && (_0x392801 = this.post);
      return new Promise((_0xcfadf0, _0x2bf3ff) => {
        _0x392801.call(this, _0x48ad83, (_0x4e51ca, _0x2bc37b, _0x523f13) => {
          _0x4e51ca ? _0x2bf3ff(_0x4e51ca) : _0xcfadf0(_0x2bc37b);
        });
      });
    }
    get(_0x10ec53) {
      return this.send.call(this.env, _0x10ec53);
    }
    post(_0x2f1c22) {
      return this.send.call(this.env, _0x2f1c22, "POST");
    }
  }
  return new class {
    constructor(_0x4cdf2f, _0x34c45e) {
      this.name = _0x4cdf2f;
      this.http = new _0x43719d(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = !1;
      this.isNeedRewrite = !1;
      this.logSeparator = "\n";
      this.startTime = new Date().getTime();
      Object.assign(this, _0x34c45e);
      this.log("", "🔔" + this.name + ", 开始!");
    }
    isNode() {
      return "undefined" != typeof module && !!module.exports;
    }
    isQuanX() {
      return "undefined" != typeof $task;
    }
    isSurge() {
      return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
    }
    isLoon() {
      return "undefined" != typeof $loon;
    }
    toObj(_0x18ada2, _0x318baa = null) {
      try {
        return JSON.parse(_0x18ada2);
      } catch {
        return _0x318baa;
      }
    }
    toStr(_0x16036a, _0x2b61aa = null) {
      try {
        return JSON.stringify(_0x16036a);
      } catch {
        return _0x2b61aa;
      }
    }
    getjson(_0x360035, _0x34f561) {
      let _0x651b80 = _0x34f561;
      const _0x4c6b47 = this.getdata(_0x360035);
      if (_0x4c6b47) {
        try {
          _0x651b80 = JSON.parse(this.getdata(_0x360035));
        } catch {}
      }
      return _0x651b80;
    }
    setjson(_0x5420f3, _0x33b26b) {
      try {
        return this.setdata(JSON.stringify(_0x5420f3), _0x33b26b);
      } catch {
        return !1;
      }
    }
    getScript(_0x4668a0) {
      return new Promise(_0x5089ca => {
        this.get({
          url: _0x4668a0
        }, (_0x43c8b8, _0x2ed94c, _0x26ebd1) => _0x5089ca(_0x26ebd1));
      });
    }
    runScript(_0x4d5c6c, _0x1d5039) {
      return new Promise(_0x50eca6 => {
        let _0x1d7b4b = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        _0x1d7b4b = _0x1d7b4b ? _0x1d7b4b.replace(/\n/g, "").trim() : _0x1d7b4b;
        let _0x10a834 = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        _0x10a834 = _0x10a834 ? 1 * _0x10a834 : 20;
        _0x10a834 = _0x1d5039 && _0x1d5039.timeout ? _0x1d5039.timeout : _0x10a834;
        const [_0x40675c, _0x1e7795] = _0x1d7b4b.split("@"),
          _0x3e24a9 = {
            url: "http://" + _0x1e7795 + "/v1/scripting/evaluate",
            body: {
              script_text: _0x4d5c6c,
              mock_type: "cron",
              timeout: _0x10a834
            },
            headers: {
              "X-Key": _0x40675c,
              Accept: "*/*"
            }
          };
        this.post(_0x3e24a9, (_0x561eb9, _0x94cf46, _0x39da0b) => _0x50eca6(_0x39da0b));
      }).catch(_0x131c75 => this.logErr(_0x131c75));
    }
    loaddata() {
      if (!this.isNode()) {
        return {};
      }
      {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const _0x27794a = this.path.resolve(this.dataFile),
          _0x452396 = this.path.resolve(process.cwd(), this.dataFile),
          _0x5b3291 = this.fs.existsSync(_0x27794a),
          _0x1f4621 = !_0x5b3291 && this.fs.existsSync(_0x452396);
        if (!_0x5b3291 && !_0x1f4621) {
          return {};
        }
        {
          const _0x167bb1 = _0x5b3291 ? _0x27794a : _0x452396;
          try {
            return JSON.parse(this.fs.readFileSync(_0x167bb1));
          } catch (_0x2cf1a8) {
            return {};
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const _0x300f30 = this.path.resolve(this.dataFile),
          _0x3e68cf = this.path.resolve(process.cwd(), this.dataFile),
          _0x2c1e3d = this.fs.existsSync(_0x300f30),
          _0x157c41 = !_0x2c1e3d && this.fs.existsSync(_0x3e68cf),
          _0x3fbce0 = JSON.stringify(this.data);
        _0x2c1e3d ? this.fs.writeFileSync(_0x300f30, _0x3fbce0) : _0x157c41 ? this.fs.writeFileSync(_0x3e68cf, _0x3fbce0) : this.fs.writeFileSync(_0x300f30, _0x3fbce0);
      }
    }
    lodash_get(_0x250ae5, _0xcac6a7, _0x4394e7) {
      const _0x427ac8 = _0xcac6a7.replace(/\[(\d+)\]/g, ".$1").split(".");
      let _0xbd4cf1 = _0x250ae5;
      for (const _0x42f3c4 of _0x427ac8) if (_0xbd4cf1 = Object(_0xbd4cf1)[_0x42f3c4], void 0 === _0xbd4cf1) {
        return _0x4394e7;
      }
      return _0xbd4cf1;
    }
    lodash_set(_0x2d120c, _0x566954, _0x2c3a5a) {
      return Object(_0x2d120c) !== _0x2d120c ? _0x2d120c : (Array.isArray(_0x566954) || (_0x566954 = _0x566954.toString().match(/[^.[\]]+/g) || []), _0x566954.slice(0, -1).reduce((_0x5747a1, _0x2e6a0b, _0xac0409) => Object(_0x5747a1[_0x2e6a0b]) === _0x5747a1[_0x2e6a0b] ? _0x5747a1[_0x2e6a0b] : _0x5747a1[_0x2e6a0b] = Math.abs(_0x566954[_0xac0409 + 1]) >> 0 == +_0x566954[_0xac0409 + 1] ? [] : {}, _0x2d120c)[_0x566954[_0x566954.length - 1]] = _0x2c3a5a, _0x2d120c);
    }
    getdata(_0x35dcad) {
      let _0x221bfa = this.getval(_0x35dcad);
      if (/^@/.test(_0x35dcad)) {
        const [, _0x92b75e, _0x20639e] = /^@(.*?)\.(.*?)$/.exec(_0x35dcad),
          _0x4642af = _0x92b75e ? this.getval(_0x92b75e) : "";
        if (_0x4642af) {
          try {
            const _0x4f0835 = JSON.parse(_0x4642af);
            _0x221bfa = _0x4f0835 ? this.lodash_get(_0x4f0835, _0x20639e, "") : _0x221bfa;
          } catch (_0x5b071e) {
            _0x221bfa = "";
          }
        }
      }
      return _0x221bfa;
    }
    setdata(_0x394de3, _0x33757b) {
      let _0x156cef = !1;
      if (/^@/.test(_0x33757b)) {
        const [, _0x31bb11, _0x4b07af] = /^@(.*?)\.(.*?)$/.exec(_0x33757b),
          _0x2b6f7a = this.getval(_0x31bb11),
          _0x34a837 = _0x31bb11 ? "null" === _0x2b6f7a ? null : _0x2b6f7a || "{}" : "{}";
        try {
          const _0x468bc8 = JSON.parse(_0x34a837);
          this.lodash_set(_0x468bc8, _0x4b07af, _0x394de3);
          _0x156cef = this.setval(JSON.stringify(_0x468bc8), _0x31bb11);
        } catch (_0x31c72e) {
          const _0x5470f2 = {};
          this.lodash_set(_0x5470f2, _0x4b07af, _0x394de3);
          _0x156cef = this.setval(JSON.stringify(_0x5470f2), _0x31bb11);
        }
      } else {
        _0x156cef = this.setval(_0x394de3, _0x33757b);
      }
      return _0x156cef;
    }
    getval(_0x246b51) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(_0x246b51) : this.isQuanX() ? $prefs.valueForKey(_0x246b51) : this.isNode() ? (this.data = this.loaddata(), this.data[_0x246b51]) : this.data && this.data[_0x246b51] || null;
    }
    setval(_0x33fd13, _0x43ce49) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(_0x33fd13, _0x43ce49) : this.isQuanX() ? $prefs.setValueForKey(_0x33fd13, _0x43ce49) : this.isNode() ? (this.data = this.loaddata(), this.data[_0x43ce49] = _0x33fd13, this.writedata(), !0) : this.data && this.data[_0x43ce49] || null;
    }
    initGotEnv(_0x9a680a) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      _0x9a680a && (_0x9a680a.headers = _0x9a680a.headers ? _0x9a680a.headers : {}, void 0 === _0x9a680a.headers.Cookie && void 0 === _0x9a680a.cookieJar && (_0x9a680a.cookieJar = this.ckjar));
    }
    get(_0x44ec3b, _0x1d9b04 = () => {}) {
      _0x44ec3b.headers && (delete _0x44ec3b.headers["Content-Type"], delete _0x44ec3b.headers["Content-Length"]);
      this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (_0x44ec3b.headers = _0x44ec3b.headers || {}, Object.assign(_0x44ec3b.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.get(_0x44ec3b, (_0x379e65, _0x1353f2, _0x418f71) => {
        !_0x379e65 && _0x1353f2 && (_0x1353f2.body = _0x418f71, _0x1353f2.statusCode = _0x1353f2.status);
        _0x1d9b04(_0x379e65, _0x1353f2, _0x418f71);
      })) : this.isQuanX() ? (this.isNeedRewrite && (_0x44ec3b.opts = _0x44ec3b.opts || {}, Object.assign(_0x44ec3b.opts, {
        hints: !1
      })), $task.fetch(_0x44ec3b).then(_0x574a81 => {
        const {
          statusCode: _0xba3382,
          statusCode: _0x47b991,
          headers: _0x263cda,
          body: _0x389451
        } = _0x574a81;
        _0x1d9b04(null, {
          status: _0xba3382,
          statusCode: _0x47b991,
          headers: _0x263cda,
          body: _0x389451
        }, _0x389451);
      }, _0x2f8ce2 => _0x1d9b04(_0x2f8ce2))) : this.isNode() && (this.initGotEnv(_0x44ec3b), this.got(_0x44ec3b).on("redirect", (_0x28e619, _0x18ede4) => {
        try {
          if (_0x28e619.headers["set-cookie"]) {
            const _0x3cfa6b = _0x28e619.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
            _0x3cfa6b && this.ckjar.setCookieSync(_0x3cfa6b, null);
            _0x18ede4.cookieJar = this.ckjar;
          }
        } catch (_0x129009) {
          this.logErr(_0x129009);
        }
      }).then(_0x2d2b4e => {
        const {
          statusCode: _0x2b7093,
          statusCode: _0x466765,
          headers: _0x1519c6,
          body: _0x293eec
        } = _0x2d2b4e;
        _0x1d9b04(null, {
          status: _0x2b7093,
          statusCode: _0x466765,
          headers: _0x1519c6,
          body: _0x293eec
        }, _0x293eec);
      }, _0xce96ac => {
        const {
          message: _0x5dccbd,
          response: _0x406ab9
        } = _0xce96ac;
        _0x1d9b04(_0x5dccbd, _0x406ab9, _0x406ab9 && _0x406ab9.body);
      }));
    }
    post(_0x3e8928, _0x5c84fc = () => {}) {
      if (_0x3e8928.body && _0x3e8928.headers && !_0x3e8928.headers["Content-Type"] && (_0x3e8928.headers["Content-Type"] = "application/x-www-form-urlencoded"), _0x3e8928.headers && delete _0x3e8928.headers["Content-Length"], this.isSurge() || this.isLoon()) {
        this.isSurge() && this.isNeedRewrite && (_0x3e8928.headers = _0x3e8928.headers || {}, Object.assign(_0x3e8928.headers, {
          "X-Surge-Skip-Scripting": !1
        }));
        $httpClient.post(_0x3e8928, (_0x13bcfb, _0x4a20d0, _0x29a8b4) => {
          !_0x13bcfb && _0x4a20d0 && (_0x4a20d0.body = _0x29a8b4, _0x4a20d0.statusCode = _0x4a20d0.status);
          _0x5c84fc(_0x13bcfb, _0x4a20d0, _0x29a8b4);
        });
      } else {
        if (this.isQuanX()) {
          _0x3e8928.method = "POST";
          this.isNeedRewrite && (_0x3e8928.opts = _0x3e8928.opts || {}, Object.assign(_0x3e8928.opts, {
            hints: !1
          }));
          $task.fetch(_0x3e8928).then(_0x49676d => {
            const {
              statusCode: _0x7d1882,
              statusCode: _0x1c35c5,
              headers: _0x114b2f,
              body: _0xaf592
            } = _0x49676d;
            _0x5c84fc(null, {
              status: _0x7d1882,
              statusCode: _0x1c35c5,
              headers: _0x114b2f,
              body: _0xaf592
            }, _0xaf592);
          }, _0x3fcf55 => _0x5c84fc(_0x3fcf55));
        } else {
          if (this.isNode()) {
            this.initGotEnv(_0x3e8928);
            const {
              url: _0x5e3b8f,
              ..._0x7b1510
            } = _0x3e8928;
            this.got.post(_0x5e3b8f, _0x7b1510).then(_0x23f50a => {
              const {
                statusCode: _0x4b6c5d,
                statusCode: _0x43a014,
                headers: _0x25158f,
                body: _0x2075a9
              } = _0x23f50a;
              _0x5c84fc(null, {
                status: _0x4b6c5d,
                statusCode: _0x43a014,
                headers: _0x25158f,
                body: _0x2075a9
              }, _0x2075a9);
            }, _0x12b622 => {
              const {
                message: _0x3707d0,
                response: _0x5b2628
              } = _0x12b622;
              _0x5c84fc(_0x3707d0, _0x5b2628, _0x5b2628 && _0x5b2628.body);
            });
          }
        }
      }
    }
    time(_0x3fa627, _0xe04c7d = null) {
      const _0x402ac6 = _0xe04c7d ? new Date(_0xe04c7d) : new Date();
      let _0x5eaffc = {
        "M+": _0x402ac6.getMonth() + 1,
        "d+": _0x402ac6.getDate(),
        "H+": _0x402ac6.getHours(),
        "m+": _0x402ac6.getMinutes(),
        "s+": _0x402ac6.getSeconds(),
        "q+": Math.floor((_0x402ac6.getMonth() + 3) / 3),
        S: _0x402ac6.getMilliseconds()
      };
      /(y+)/.test(_0x3fa627) && (_0x3fa627 = _0x3fa627.replace(RegExp.$1, (_0x402ac6.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let _0x3ba4d7 in _0x5eaffc) new RegExp("(" + _0x3ba4d7 + ")").test(_0x3fa627) && (_0x3fa627 = _0x3fa627.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x5eaffc[_0x3ba4d7] : ("00" + _0x5eaffc[_0x3ba4d7]).substr(("" + _0x5eaffc[_0x3ba4d7]).length)));
      return _0x3fa627;
    }
    msg(_0x2e9f26 = _0x2158dc, _0xc07ca8 = "", _0x13a0e6 = "", _0x987f46) {
      const _0x47621e = _0x285971 => {
        if (!_0x285971) {
          return _0x285971;
        }
        if ("string" == typeof _0x285971) {
          return this.isLoon() ? _0x285971 : this.isQuanX() ? {
            "open-url": _0x285971
          } : this.isSurge() ? {
            url: _0x285971
          } : void 0;
        }
        if ("object" == typeof _0x285971) {
          if (this.isLoon()) {
            let _0x2fc5da = _0x285971.openUrl || _0x285971.url || _0x285971["open-url"],
              _0x3c2c3e = _0x285971.mediaUrl || _0x285971["media-url"];
            return {
              openUrl: _0x2fc5da,
              mediaUrl: _0x3c2c3e
            };
          }
          if (this.isQuanX()) {
            let _0xaf25a0 = _0x285971["open-url"] || _0x285971.url || _0x285971.openUrl,
              _0x2c38bd = _0x285971["media-url"] || _0x285971.mediaUrl;
            return {
              "open-url": _0xaf25a0,
              "media-url": _0x2c38bd
            };
          }
          if (this.isSurge()) {
            let _0x4a7527 = _0x285971.url || _0x285971.openUrl || _0x285971["open-url"];
            return {
              url: _0x4a7527
            };
          }
        }
      };
      if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(_0x2e9f26, _0xc07ca8, _0x13a0e6, _0x47621e(_0x987f46)) : this.isQuanX() && $notify(_0x2e9f26, _0xc07ca8, _0x13a0e6, _0x47621e(_0x987f46))), !this.isMuteLog) {
        let _0x4bf541 = ["", "==============📣系统通知📣=============="];
        _0x4bf541.push(_0x2e9f26);
        _0xc07ca8 && _0x4bf541.push(_0xc07ca8);
        _0x13a0e6 && _0x4bf541.push(_0x13a0e6);
        console.log(_0x4bf541.join("\n"));
        this.logs = this.logs.concat(_0x4bf541);
      }
    }
    log(..._0x42ab03) {
      _0x42ab03.length > 0 && (this.logs = [...this.logs, ..._0x42ab03]);
      console.log(_0x42ab03.join(this.logSeparator));
    }
    logErr(_0x29d6c2, _0xfb3713) {
      const _0x26ca84 = !this.isSurge() && !this.isQuanX() && !this.isLoon();
      _0x26ca84 ? this.log("", "❗️" + this.name + ", 错误!", _0x29d6c2.stack) : this.log("", "❗️" + this.name + ", 错误!", _0x29d6c2);
    }
    wait(_0xf702c) {
      return new Promise(_0x2406ae => setTimeout(_0x2406ae, _0xf702c));
    }
    done(_0x1acc11 = {}) {
      const _0x533473 = new Date().getTime(),
        _0x2dead8 = (_0x533473 - this.startTime) / 1000;
      this.log("", "🔔" + this.name + ", 结束! 🕛 " + _0x2dead8 + " 秒");
      this.log();
      (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(_0x1acc11);
    }
  }(_0x2158dc, _0x319f5c);
}
function checkVersion(_0x2a2887, _0xd97ffd) {
  try {
    logAndNotify("文件md5：" + _0xd97ffd);
    const _0x1eaca6 = SyncRequest("GET", "https://checktoke.filegear-sg.me/api/update/check?fileName=" + _0x2a2887 + "&fileMd5=" + _0xd97ffd),
      _0x473c45 = JSON.parse(_0x1eaca6.getBody("utf8"));
    _0x473c45.code === 301 ? process.exit(0) : logAndNotify(_0x473c45.data);
  } catch (_0x153a28) {
    logAndNotify("版本检查失败:", _0x153a28);
  }
}
function pushLog(_0x28a93b, _0x2a3dc3) {
  try {
    const _0x409fdd = "fileName=" + encodeURIComponent(_0x28a93b) + "&log=" + encodeURIComponent(_0x2a3dc3);
    SyncRequest("POST", "https://checktoke.filegear-sg.me/api/update/pushLog", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: _0x409fdd
    });
  } catch (_0x3a6013) {}
}