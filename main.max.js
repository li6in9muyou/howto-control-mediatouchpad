/*! For license information please see main.js.LICENSE.txt */
require("source-map-support/source-map-support.js").install(),
  (module.exports = (function (e) {
    var t = {};
    function __webpack_require__(r) {
      if (t[r]) return t[r].exports;
      var n = (t[r] = {
        i: r,
        l: !1,
        exports: {},
      });
      return (
        e[r].call(n.exports, n, n.exports, __webpack_require__),
        (n.l = !0),
        n.exports
      );
    }
    return (
      (__webpack_require__.m = e),
      (__webpack_require__.c = t),
      (__webpack_require__.d = function (e, t, r) {
        __webpack_require__.o(e, t) ||
          Object.defineProperty(e, t, {
            enumerable: !0,
            get: r,
          });
      }),
      (__webpack_require__.r = function (e) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module",
          }),
          Object.defineProperty(e, "__esModule", {
            value: !0,
          });
      }),
      (__webpack_require__.t = function (e, t) {
        if ((1 & t && (e = __webpack_require__(e)), 8 & t)) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (
          (__webpack_require__.r(r),
          Object.defineProperty(r, "default", {
            enumerable: !0,
            value: e,
          }),
          2 & t && "string" != typeof e)
        )
          for (var n in e)
            __webpack_require__.d(
              r,
              n,
              function (t) {
                return e[t];
              }.bind(null, n),
            );
        return r;
      }),
      (__webpack_require__.n = function (e) {
        var t =
          e && e.__esModule
            ? function getDefault() {
                return e.default;
              }
            : function getModuleExports() {
                return e;
              };
        return __webpack_require__.d(t, "a", t), t;
      }),
      (__webpack_require__.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (__webpack_require__.p = ""),
      __webpack_require__((__webpack_require__.s = 31))
    );
  })([
    function (e, t) {
      e.exports = require("electron");
    },
    function (e, t) {
      e.exports = require("xsense_native");
    },
    function (e, t) {
      e.exports = require("path");
    },
    function (e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0,
      }),
        (t.LogIt =
          t.LOG_DEBUGVIEWE =
          t.LOG_ERROR =
          t.LOG_INFO =
          t.LOG_DEBUG =
          t.LOG_DUMMY =
            void 0);
      const n = r(0),
        i = r(1);
      (t.LOG_DUMMY = 0),
        (t.LOG_DEBUG = 1),
        (t.LOG_INFO = 2),
        (t.LOG_ERROR = 3),
        (t.LOG_DEBUGVIEWE = 4);
      class LogIt {
        constructor() {
          this.logConfig();
        }
        static getInstance() {
          return (
            LogIt.instance || (LogIt.instance = new LogIt()), LogIt.instance
          );
        }
        get logLevel() {
          const e = i.getRegistryValue(1, "SOFTWARE\\Acer\\xsense", "LogLevel");
          return "error" == e
            ? t.LOG_ERROR
            : "info" == e
              ? t.LOG_INFO
              : "debug" == e
                ? t.LOG_DEBUG
                : t.LOG_INFO;
        }
        get enableLog() {
          return !0;
        }
        logConfig() {
          i.initLogSystem(
            n.app.getPath("userData"),
            this.enableLog,
            this.logLevel,
          );
        }
        error(e) {
          i.ndLog(t.LOG_ERROR, e, 0);
        }
        info(e) {
          i.ndLog(t.LOG_INFO, e, 0);
        }
        debug(e) {
          i.ndLog(t.LOG_DEBUG, e, 0);
        }
        debugview(e) {
          i.ndLog(t.LOG_DEBUGVIEWE, e, 0);
        }
        dummy(e) {
          i.ndLog(t.LOG_DUMMY, e, 0);
        }
        warn(e) {
          throw new Error("Method not implemented.");
        }
      }
      t.LogIt = LogIt;
    },
    function (e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0,
      }),
        (t.EnvConfig = void 0);
      const n = r(34),
        i = r(35),
        o = r(36),
        s = r(10);
      class EnvConfig {
        constructor() {
          (this.advancedMode = !1),
            (this.devMode = process.argv.some((e) => "--dev" === e)),
            (this.seqMode = !1),
            (this.hwAcceleration = !0),
            (this.simulatorMode = !1),
            (this.isOled = !1),
            (this.periodToCheckNewContent = 864e5),
            (this.pendingReloadContent = !1),
            (this.sku = "prd");
          const e = this.getHKLMKeyValue("sku");
          e && e.length > 0 && (this.sku = e),
            (this.serviceCfg =
              "prd" === this.sku
                ? n.ServiceConfig
                : "uat" === this.sku
                  ? i.ServiceConfig
                  : o.ServiceConfig),
            (this.hwAcceleration = this.getHWAccMode()),
            (this.seqMode = this.devMode || this.getSeqMode()),
            (this.simulatorMode = this.getSimulatorMode()),
            (this.isOled = this.getIsOLED()),
            this.initDriverApi(),
            this.updatePeriodToCheckNewContent();
        }
        static getInstance() {
          return (
            EnvConfig.instance || (EnvConfig.instance = new EnvConfig()),
            EnvConfig.instance
          );
        }
        getBackendApiUrl() {
          return this.serviceCfg.backendURL;
        }
        getSKU() {
          return this.sku;
        }
        getFirebaseSenderId() {
          return this.serviceCfg.firebaseSenderId;
        }
        getKeyValue(e) {
          try {
            return r(1).getRegistryValue(1, "SOFTWARE\\Acer\\XSense", e);
          } catch (e) {
            return "";
          }
        }
        getKeyValueLM(e) {
          try {
            return r(1).getRegistryValue(2, "SOFTWARE\\Acer\\XSense", e);
          } catch (e) {
            return "";
          }
        }
        getHKLMKeyValue(e) {
          try {
            return r(1).getRegistryValue(2, "SOFTWARE\\Acer\\XSense", e);
          } catch (e) {
            return "";
          }
        }
        getAcerBoxTicked() {
          try {
            const e = "powershell",
              t = [
                "-command",
                "Get-Item -Path HKLM:\\SOFTWARE\\OEM\\Metadata | Select-Object -ExpandProperty Property | ConvertTo-Json -Depth 1",
              ],
              r = (0, s.spawnSync)(e, t, {
                windowsHide: !0,
              });
            return JSON.parse(r.stdout.toString()).find(
              (e) => "AcerBoxTicked" === e,
            );
          } catch (e) {
            return;
          }
        }
        updatePeriodToCheckNewContent() {
          const e = this.getKeyValue("periodToCheckNewContent");
          e &&
            e.length > 0 &&
            (this.periodToCheckNewContent = 1e3 * parseInt(e));
        }
        getHWAccMode() {
          return "0" != this.getKeyValue("HWAccMode");
        }
        getSeqMode() {
          return "0" != this.getKeyValue("SeqMode");
        }
        getSimulatorMode() {
          return "1" == this.getKeyValue("SimulatorMode");
        }
        getIsOLED() {
          try {
            const e = r(1);
            return (
              "true" ==
              e
                .getRegistryValue(
                  2,
                  "SOFTWARE\\OEM\\GCMReadiness\\IM",
                  "IM_OLED",
                )
                .toLowerCase()
            );
          } catch (e) {
            return !1;
          }
        }
        get purchaseEnabled() {
          return "1" == this.getKeyValue("PurchaseEnabled");
        }
        get devTool() {
          return "1" == this.getKeyValue("DevTool");
        }
        get AESkey() {
          try {
            const e = r(1);
            return 0 ==
              e.getRegistryUInt32(
                2,
                "SOFTWARE\\OEM\\AcerAgentService",
                "SupportAES",
              )
              ? ""
              : e.getRegistryValue(
                  2,
                  "SOFTWARE\\OEM\\AcerAgentService",
                  "AESkey",
                );
          } catch (e) {
            return "";
          }
        }
        get model3DFps() {
          const e = this.getKeyValue("Model3DFps");
          return e && e.length > 0 ? e : "-1";
        }
        get reCreateWin() {
          return "1" == this.getKeyValue("reCreateWin");
        }
        get useEmbedded() {
          return "0" != this.getKeyValue("useEmbedded");
        }
        get reCreateHome() {
          return "0" != this.getKeyValue("reCreateHome");
        }
        get skipCheck() {
          if ("1" == this.getKeyValue("skipCheck")) return !0;
          return "1" == this.getKeyValueLM("skipCheck");
        }
        initDriverApi() {
          (this.port = 54433),
            (this.apiURL = `https://localhost:${this.port}/api/v1`);
        }
        get updatePeriod() {
          const e = this.getKeyValue("periodToUpdate");
          return !!(e && e.length > 0) && 1e3 * parseInt(e);
        }
        get fakeCountry() {
          const e = this.getKeyValue("FAKE_COUNTRY");
          return !!(e && e.length > 0) && e;
        }
        getAcerAccount() {
          const {
            baseUrl: e,
            redirectUrl: t,
            apiUrl: r,
            clientId: n,
            clientSecret: i,
            tokenUrl: o,
          } = this.serviceCfg.acerAccount;
          return {
            baseUrl: e,
            apiUrl: r,
            redirectUrl: t,
            clientId: n,
            clientSecret: i,
            tokenUrl: o,
          };
        }
        get oobeNotiPeriod() {
          const e = this.getHKLMKeyValue("OobeNotificationPeriod");
          return !!(e && e.length > 0) && parseInt(e);
        }
        get hwacc() {
          return "1" == this.getKeyValue("hwacc");
        }
        get webConsoleLog() {
          return "0" != this.getKeyValue("webConsoleLog");
        }
        get adecReconnect() {
          return "0" != this.getKeyValue("adecReconnect");
        }
        get enableDeleteProd() {
          return "1" == this.getKeyValue("EnableDeleteProd");
        }
      }
      t.EnvConfig = EnvConfig;
    },
    function (e, t) {
      e.exports = require("fs");
    },
    function (e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0,
      }),
        (t.Store = void 0);
      const n = r(19),
        i = r(40),
        o = r(11),
        s = r(20),
        a = r(7),
        c = r(3),
        l = r(9);
      var u = r(2);
      class Store {
        constructor() {
          n.initRenderer();
          const e = u.join(a.oemFolder, "ProfilePool");
          this.store = new n({
            cwd: e,
          });
        }
        static getInstance() {
          return (
            Store.instance || (Store.instance = new Store()), Store.instance
          );
        }
        getElectronStore() {
          return this.store;
        }
        get(e) {
          return this.store.get(e);
        }
        set(e, t) {
          this.store.set(e, t);
        }
        delete(e) {
          if (!this.store.get(e))
            throw new ReferenceError(e + " is not exist.");
          this.store.delete(e);
        }
        onDidChange(e, t) {
          return this.store.onDidChange(e, t);
        }
        onDidAnyChange(e) {
          return this.store.onDidAnyChange(e);
        }
        createUUID() {
          return new Promise((e) => {
            const t = this.store.get("uuid");
            if (t) {
              console.log("existed uuid= " + t),
                c.LogIt.getInstance().info("existed uuid= " + t);
              const r = `${o.version()} ${o.release()}`,
                n = `${o.platform()} ${o.arch()}`;
              e({
                uuid: t,
                os: r,
                platform: n,
              });
            } else
              console.log("uuid not existed."),
                i.system().then((r) => {
                  const n = r.uuid;
                  console.log("new uuid = " + n),
                    c.LogIt.getInstance().info("new uuid = " + n),
                    Store.instance.set("uuid", n);
                  const i = `${o.version()} ${o.release()}`,
                    s = `${o.platform()} ${o.arch()}`;
                  e({
                    uuid: t,
                    os: i,
                    platform: s,
                  });
                });
          });
        }
        createKeyboarLEDs() {
          this.get(s.KB_LEDs) || this.set(s.KB_LEDs, s.DEFAULT_KEYBOARD_LEDs),
            this.get(s.LIGHTBAR_LEDs) ||
              this.set(s.LIGHTBAR_LEDs, s.DEFAULT_LIGHTBAR_LEDs),
            this.get(s.DEFAULT_KEYBOARD_3ZONES) ||
              this.set(s.KB_3ZONES, s.DEFAULT_KEYBOARD_3ZONES),
            this.get(s.DEFAULT_KEYBOARD_4ZONES) ||
              this.set(s.KB_4ZONES, s.DEFAULT_KEYBOARD_4ZONES);
        }
        initTutorialShowOnce() {
          c.LogIt.getInstance().info("[Store] init tutorial show once status"),
            null == this.get("modeSwitchKeyTutorial") &&
              this.set("modeSwitchKeyTutorial", !0),
            null == this.get("landingTutorial") &&
              this.set("landingTutorial", !0),
            null == this.get("areaPageTutorial") &&
              this.set("areaPageTutorial", !0),
            null == this.get("systemPageTutorial") &&
              this.set("systemPageTutorial", !0),
            null == this.get("profileManagerTutorial") &&
              this.set("profileManagerTutorial", !0),
            null == this.get("needShowPrivacyPolicy") &&
              this.set("needShowPrivacyPolicy", !0);
        }
        initTemperatureUnit() {
          null == this.get("temperatureUnit") && this.set("temperatureUnit", 1);
        }
        initFirstLaunchApp() {
          null == this.get("firstLaunchApp") &&
            (this.set("firstLaunchApp", !0),
            this.set("firstLaunchTime", Date.now()));
        }
        initPrivacyPolicy() {
          const e = l.Info.getInstance().getDeviceInfoAgree() || !1;
          null == this.get("IsAgreePrivacyPolicy") &&
            this.set("IsAgreePrivacyPolicy", e);
        }
        initWidgetsList() {
          if (null == this.get("WidgetsList")) {
            const e = ["Explore", "SpatialLabs", "Live_Update", "App_Shortcut"];
            this.set("WidgetsList", e);
          }
        }
      }
      t.Store = Store;
    },
    function (e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0,
      }),
        (t.getVFSSettings =
          t.isVFSFileExists =
          t.oemVFS =
          t.oemFolder =
            void 0);
      var n,
        i = r(2),
        o = r(5);
      r(11);
      function isVFSFileExists(e) {
        const r = e.split(";");
        for (let e = 0; e < r.length; e++) {
          const n = i.join(t.oemVFS, r[e]);
          try {
            if (o.existsSync(n)) return r[e];
          } catch (e) {}
        }
        return "";
      }
      (t.oemFolder = "C:/ProgramData/OEM/AcerSense"),
        (t.oemVFS = i.join(t.oemFolder, "vfs")),
        (t.isVFSFileExists = isVFSFileExists),
        (t.getVFSSettings = function getVFSSettings() {
          if (
            !n &&
            ((n = {
              theme: "default",
            }),
            isVFSFileExists("Setting.json"))
          )
            try {
              const e = o
                .readFileSync(i.join(t.oemVFS, "Setting.json"))
                .toString();
              n = JSON.parse(e);
            } catch (e) {
              console.log(e);
            }
          return n;
        });
    },
    function (e, t, r) {
      "use strict";
      var n =
        (this && this.__awaiter) ||
        function (e, t, r, n) {
          return new (r || (r = Promise))(function (i, o) {
            function fulfilled(e) {
              try {
                step(n.next(e));
              } catch (e) {
                o(e);
              }
            }
            function rejected(e) {
              try {
                step(n.throw(e));
              } catch (e) {
                o(e);
              }
            }
            function step(e) {
              e.done
                ? i(e.value)
                : (function adopt(e) {
                    return e instanceof r
                      ? e
                      : new r(function (t) {
                          t(e);
                        });
                  })(e.value).then(fulfilled, rejected);
            }
            step((n = n.apply(e, t || [])).next());
          });
        };
      Object.defineProperty(t, "__esModule", {
        value: !0,
      }),
        (t.MqttFunctionCall =
          t.CategoryXSenseService =
          t.CategoryXSenseApp =
          t.CategoryPWARuntime =
          t.Event_WhisperModeChanged =
          t.Event_ScenarioChanged =
            void 0);
      const i = r(13);
      (t.Event_ScenarioChanged = "ScenarioChanged"),
        (t.Event_WhisperModeChanged = "WhisperModeChanged"),
        (t.CategoryPWARuntime = "PWARuntime"),
        (t.CategoryXSenseApp = "XSenseApp"),
        (t.CategoryXSenseService = "XSenseService");
      class Log {
        error(e) {
          console.error(e);
        }
        info(e) {
          console.warn(e);
        }
        debug(e) {
          console.info(e);
        }
        debugview(e) {
          console.info(e);
        }
      }
      class MqttFunctionCall {
        constructor() {
          (this.client = null),
            (this.fnMap = new Map()),
            (this.cbMap = new Map()),
            (this.topicSet = new Set()),
            (this.funcCallbackId = 0),
            (this.eventEmitter = new i.EventEmitter()),
            (this.connected = !1),
            (this.log = new Log());
        }
        static getInstance() {
          return (
            MqttFunctionCall.instance ||
              (MqttFunctionCall.instance = new MqttFunctionCall()),
            MqttFunctionCall.instance
          );
        }
        init(e, t, r) {
          return n(this, void 0, void 0, function* () {
            return (
              (this.clientIdPrefix = e),
              (this.clientUrl = t),
              (this.mqtt = r),
              this.initInternal(this.clientIdPrefix, this.clientUrl, this.mqtt)
            );
          });
        }
        initInternal(e, t, r) {
          return n(this, void 0, void 0, function* () {
            (this.selfSubject = e),
              (this.clientId = `${e}_${Date.now()}`),
              (this.client = r.connect(t, {
                clientId: this.clientId,
                keepalive: 60,
                rejectUnauthorized: !1,
              })),
              this.client.on("connect", () => {
                this.log.debug(`MQTT ${this.clientId} connect`),
                  this.reSubscibeTopic(),
                  (this.connected = !0);
              }),
              this.client.on("error", (e) => {
                this.log.debug(
                  `MQTT ${this.clientId} error ${JSON.stringify(e)}`,
                );
              }),
              this.client.on("end", (e) => {
                this.log.debug(`MQTT ${this.clientId} end`);
              }),
              this.client.on("disconnect", (e) => {
                this.log.debug(`MQTT ${this.clientId} disconnect`);
              }),
              this.client.on("reconnect", (e) => {
                this.log.debug(`MQTT ${this.clientId} reconnect`);
              }),
              this.client.on("close", (e) => {
                this.log.debug(`MQTT ${this.clientId} close`),
                  (this.connected = !1);
              }),
              this.client.on("message", (t, r) =>
                n(this, void 0, void 0, function* () {
                  const n = r.toString();
                  if (this.topicSet.has(t)) {
                    const r = JSON.parse(n);
                    if (this.isCallTopic(t)) {
                      const t = r,
                        n = t.callId,
                        i = t.fnName,
                        o = t.param;
                      if (this.fnMap.has(i)) {
                        const t = this.fnMap.get(i);
                        let r = {
                          callId: n,
                          reason: "fromFunction",
                          result: yield t(...o),
                        };
                        this.client.publish(
                          this.getReplyTopic(e),
                          JSON.stringify(r),
                        );
                      } else {
                        let t = {
                          callId: n,
                          reason: "noImplement",
                          result: "",
                        };
                        this.client.publish(
                          this.getReplyTopic(e),
                          JSON.stringify(t),
                        );
                      }
                    } else if (this.isReplyTopic(t)) {
                      const e = r;
                      this.cbMap.has(e.callId) &&
                        (this.cbMap.get(e.callId)(e.result),
                        this.cbMap.delete(e.callId));
                    } else if (this.isBroadcastTopic(t)) {
                      const e = r;
                      e.sourceClientId != this.clientId &&
                        this.eventEmitter.emit(e.eventType, ...e.param);
                    }
                  }
                }),
              );
          });
        }
        isCallTopic(e) {
          return e.startsWith("call_");
        }
        isReplyTopic(e) {
          return e.startsWith("reply_");
        }
        isBroadcastTopic(e) {
          return e.startsWith("broadcast_");
        }
        getCallTopic(e) {
          return "call_" + e;
        }
        getReplyTopic(e) {
          return "reply_" + e;
        }
        getBroadcastTopic(e) {
          return "broadcast_" + e;
        }
        subscibeTopic(e) {
          return new Promise((t, r) => {
            this.client.subscribe(e, (n, i) => {
              n
                ? r(n)
                : (this.log.debug(`MQTT ${this.clientId} subscribe - ${e}`),
                  t(i));
            });
          });
        }
        reSubscibeTopic() {
          this.topicSet.forEach((e) => {
            this.subscibeTopic(e);
          });
        }
        subscribeCategory(e, t) {
          const r = e(t);
          this.topicSet.has(r) || (this.subscibeTopic(r), this.topicSet.add(r));
        }
        export(e, t) {
          this.subscribeCategory(this.getCallTopic, this.selfSubject),
            this.fnMap.set(e, t);
        }
        call(e, t, ...r) {
          this.subscribeCategory(this.getReplyTopic, e);
          return new Promise((n, i) => {
            const o = (this.funcCallbackId++).toString();
            var s = {
              callId: o,
              fnName: t,
              param: r,
            };
            this.client.publish(this.getCallTopic(e), JSON.stringify(s)),
              this.cbMap.set(o, n);
          });
        }
        listerenBroadcastChannel(e) {
          this.subscribeCategory(this.getBroadcastTopic, e);
        }
        broadcast(e, ...t) {
          var r = {
            eventType: e,
            param: t,
            sourceClientId: this.clientId,
          };
          this.client.publish(
            this.getBroadcastTopic(this.selfSubject),
            JSON.stringify(r),
          );
        }
        on(e, t) {
          this.eventEmitter.on(e, t);
        }
        off(e, t) {
          this.eventEmitter.off(e, t);
        }
      }
      t.MqttFunctionCall = MqttFunctionCall;
    },
    function (e, t, r) {
      "use strict";
      var n =
        (this && this.__awaiter) ||
        function (e, t, r, n) {
          return new (r || (r = Promise))(function (i, o) {
            function fulfilled(e) {
              try {
                step(n.next(e));
              } catch (e) {
                o(e);
              }
            }
            function rejected(e) {
              try {
                step(n.throw(e));
              } catch (e) {
                o(e);
              }
            }
            function step(e) {
              e.done
                ? i(e.value)
                : (function adopt(e) {
                    return e instanceof r
                      ? e
                      : new r(function (t) {
                          t(e);
                        });
                  })(e.value).then(fulfilled, rejected);
            }
            step((n = n.apply(e, t || [])).next());
          });
        };
      Object.defineProperty(t, "__esModule", {
        value: !0,
      }),
        (t.Info = void 0);
      const { app: i } = r(0),
        o = r(11),
        s = r(39),
        a = r(1),
        c = r(3),
        { shell: l } = r(0),
        u = r(6),
        d = r(7),
        g = r(4),
        p = r(5),
        h = r(2),
        f = r(41),
        m = r(10);
      class Info {
        constructor() {
          (this.store = u.Store.getInstance()),
            this.readOEMSettings(),
            (this.oemSettings = this.oemSettings || {
              Features: {
                Planet9: !0,
                Mobile: !1,
                EnableVR: !1,
              },
              Planet9_Url: "https://planet9.gg/",
              EnableAvatarVideo: !1,
              EnableAvatarApng: !1,
            });
          var e = !this.detectIfGCBase();
          try {
            this.oemSettings.Features.Planet9 = e;
          } catch (e) {
            c.LogIt.getInstance().info("p9Enable:" + e);
          }
        }
        static getInstance() {
          return Info.instance || (Info.instance = new Info()), Info.instance;
        }
        detectIfGCBase() {
          var e = !1;
          try {
            const r = p.readdirSync("C:/OEM/PRELOAD/command");
            for (var t = 0; t < r.length; t++) {
              const n = r[t].toLowerCase();
              n.length >= 12 &&
                n.startsWith("pop") >= 0 &&
                n.endsWith(".ini") >= 0 &&
                "x" == n[10] &&
                "1" == n[11] &&
                (e = !0);
            }
          } catch (e) {}
          return e;
        }
        getSerialNumber() {
          const e = g.EnvConfig.getInstance().getKeyValue("FAKE_SN");
          return e && e.length > 0
            ? e
            : a.getWMIValue("win32_bios", "SerialNumber");
        }
        getIsAcerIntelligence() {
          const e = g.EnvConfig.getInstance().getKeyValue("SHOW_AI");
          return !!(e && e.length > 0) && "1" == e;
        }
        getLanguage() {
          const e = g.EnvConfig.getInstance().getKeyValue("FAKE_LANG");
          if (e && e.length > 0) return e;
          return a.getDisplayLanguage();
        }
        getCountry() {
          const e = g.EnvConfig.getInstance().getKeyValue("FAKE_COUNTRY");
          if (e && e.length > 0) return e;
          return a.getCurrentLocation();
        }
        getSystemUuid() {
          return a.getWMIValue("Win32_ComputerSystemProduct", "UUID");
        }
        getLocaleCountryCode() {
          return i.getLocaleCountryCode();
        }
        getLocale() {
          return i.getLocale();
        }
        readOEMSettings() {
          const e = h.join(d.oemFolder, "Models/Default"),
            t = h.join(d.oemFolder, "Models", this.getSystemProductName()),
            r = h.join(p.existsSync(t) ? t : e, "Settings.json"),
            n = h.join(d.oemFolder, "Common", "Settings.json"),
            o = h.join(
              (function getWin32Folders() {
                return g.EnvConfig.getInstance().devMode
                  ? h.join(__dirname, "../../win32")
                  : h.join(h.dirname(i.getPath("exe")), "win32");
              })(),
              "Settings.json",
            );
          var s = {},
            a = {},
            l = {};
          try {
            const e = p.readFileSync(n, "utf8");
            s = JSON.parse(e);
          } catch (e) {}
          try {
            const e = p.readFileSync(r, "utf8");
            a = JSON.parse(e);
          } catch (e) {}
          try {
            const e = p.readFileSync(o, "utf8");
            l = JSON.parse(e);
          } catch (e) {}
          const u = Object.assign(Object.assign(Object.assign({}, s), a), l);
          (this.oemSettings = u),
            c.LogIt.getInstance().info(
              `OEM Setting Folder: ${r}, Setting: ${JSON.stringify(this.oemSettings)}`,
            );
        }
        getOEMSettings() {
          return this.oemSettings;
        }
        getAppVersion() {
          return i.getVersion();
        }
        getContentInfo() {
          const e = this.getLastActiveContentPath();
          var t = void 0,
            r = void 0;
          if (e && e.length > 0) {
            const n = e.split("\\"),
              i = n[n.length - 1].split("_");
            2 == i.length && ((t = i[0]), (r = i[1]));
          }
          return {
            id: t,
            uuid: r,
          };
        }
        getContentPath(e, t) {
          return h.join(d.oemFolder, "content", `${e}_${t}`);
        }
        getLastActiveContentPath() {
          return u.Store.getInstance().get("lastActiveContentPath");
        }
        getSystemFamily() {
          return a.getRegistryValue(
            2,
            "HARDWARE\\DESCRIPTION\\System\\BIOS",
            "SystemFamily",
          );
        }
        getSystemProductName() {
          const e = g.EnvConfig.getInstance().getKeyValue("FAKE_MODEL");
          if (e && e.length > 0) return e;
          const t = a.getRegistryValue(
            2,
            "HARDWARE\\DESCRIPTION\\System\\BIOS",
            "SystemProductName",
          );
          return c.LogIt.getInstance().debug("System Product Name: " + t), t;
        }
        getSystemCPUName() {
          const e = a.getRegistryValue(
            2,
            "HARDWARE\\DESCRIPTION\\System\\CentralProcessor\\0",
            "ProcessorNameString",
          );
          return c.LogIt.getInstance().debug("System CPU Name: " + e), e;
        }
        getMachineGuid() {
          return n(this, void 0, void 0, function* () {
            const e = yield this.getSerialNumber();
            if ("To be filled by O.E.M." == e || 22 != e.length) {
              return (0, s.machineIdSync)(!0);
            }
            return e;
          });
        }
        openHyperLink(e) {
          l.openExternal(e);
        }
        execSync(e) {
          try {
            m.execSync(e);
          } catch (e) {
            console.error(e);
          }
        }
        getNetworkInterfaces() {
          const e = (0, o.networkInterfaces)(),
            t = [];
          for (var r in e) {
            console.log(r),
              e[r].forEach((e) => {
                "IPv4" == e.family &&
                  "127.0.0.1" != e.address &&
                  t.push(e.address);
              });
          }
          return t;
        }
        getAutoCheckUpdate() {
          return (
            null == this.store.get("autoCheckUpdate") ||
            this.store.get("autoCheckUpdate")
          );
        }
        setAutoCheckUpdate(e) {
          c.LogIt.getInstance().info("[INFO] Set Auto Check Update: " + e),
            this.store.set("autoCheckUpdate", e);
        }
        getEnable3d() {
          return (
            null == this.store.get("enable3d") || this.store.get("enable3d")
          );
        }
        setEnable3d(e) {
          this.store.set("enable3d", e);
        }
        getTemperatureUnit() {
          return null == this.store.get("temperatureUnit")
            ? 1
            : this.store.get("temperatureUnit");
        }
        setTemperatureUnit(e) {
          this.store.set("temperatureUnit", e);
        }
        setSwitchKey(e) {
          this.store.set("switchkey", e);
        }
        getSwitchKey() {
          return this.store.get("switchkey");
        }
        getIsAgreePrivacyPolicy() {
          return n(this, void 0, void 0, function* () {
            if (null == this.store.get("IsAgreePrivacyPolicy")) {
              return this.getDeviceInfoAgree();
            }
            return this.store.get("IsAgreePrivacyPolicy");
          });
        }
        setIsAgreePrivacyPolicy(e) {
          this.store.set("IsAgreePrivacyPolicy", e);
        }
        getBackendApiUrl() {
          return g.EnvConfig.getInstance().getBackendApiUrl();
        }
        getFirebaseSenderId() {
          return g.EnvConfig.getInstance().getFirebaseSenderId();
        }
        getDDSCPath() {
          const e = h.join(__dirname, "preload/ddsc.js");
          return f.format({
            pathname: e,
            protocol: "file:",
            slashes: !0,
          });
        }
        setBiosUpdateResult(e) {
          this.store.set("biosUpdateCompleted", e);
        }
        getBiosUpdateResult() {
          return this.store.get("biosUpdateCompleted");
        }
        setLastCheckUpdate(e) {
          this.store.set("lastCheckingTime", e);
        }
        getLastCheckUpdate() {
          return this.store.get("lastCheckingTime");
        }
        getUpdateCheckPeriod() {
          const e = g.EnvConfig.getInstance().updatePeriod
            ? Number(g.EnvConfig.getInstance().updatePeriod)
            : 6048e5;
          return (
            c.LogIt.getInstance().info(
              `[INFO] get update checking period : ${e / 1e3} secconds`,
            ),
            e
          );
        }
        getSimulatorMode() {
          return g.EnvConfig.getInstance().simulatorMode;
        }
        getDeviceInfoAgree() {
          try {
            let e = g.EnvConfig.getInstance().getKeyValue("FAKE_UEIPTicked");
            if (
              ((e && 0 != e.length) ||
                (e = a.getRegistryValue(
                  2,
                  "SOFTWARE\\OEM\\Metadata",
                  "UEIPTicked",
                )),
              e && e.length > 0)
            ) {
              const t = e.codePointAt(0),
                r = "1" == t.toString(16).slice(-1);
              return (
                c.LogIt.getInstance().info(
                  `[INFO] get UEIPTicked key: ${e}, num: ${t}`,
                ),
                r
              );
            }
            return (
              c.LogIt.getInstance().info(
                "[INFO] fail to get UEIPTicked key: " + e,
              ),
              !1
            );
          } catch (e) {
            return (
              c.LogIt.getInstance().info(
                "[INFO] get deviceInfo UEIPTicked fail, error: " + e,
              ),
              !1
            );
          }
        }
        setAccessFromNoti(e) {
          c.LogIt.getInstance().info("[INFO] setAccessFromNoti to " + e),
            this.store.set("isAccessFromNoti", e);
        }
        getAccessFromNoti() {
          return this.store.get("isAccessFromNoti");
        }
        setRegFromNoti(e) {
          c.LogIt.getInstance().info("[INFO] setAccessFromNoti to " + e),
            this.store.set("isRegFromNoti", e);
        }
        getRegFromNoti() {
          return this.store.get("isRegFromNoti");
        }
        getFakeCountryCode() {}
        getGAInfoAgree() {
          return n(this, void 0, void 0, function* () {
            return (
              null != this.store.get("IsAgreePrivacyPolicy") &&
              this.store.get("IsAgreePrivacyPolicy")
            );
          });
        }
        setUpdateList(e) {
          c.LogIt.getInstance().info(
            "[info.ts] setUpdateList: " + JSON.stringify(e),
          ),
            this.store.set("updateList", e);
        }
        getUpdateList() {
          return this.store.get("updateList") || [];
        }
        getAcerAccount() {
          return g.EnvConfig.getInstance().getAcerAccount();
        }
        getIsMobilePlatform() {
          try {
            const e = a.isMobilePlatform();
            return (
              c.LogIt.getInstance().info("[info.ts] getIsMobilePlatform: " + e),
              e
            );
          } catch (e) {
            return (
              c.LogIt.getInstance().info(
                "[info.ts] getIsMobilePlatform error: " + e,
              ),
              !1
            );
          }
        }
        getAcerCredential() {
          return this.store.get("acerCredentials");
        }
        setAcerCredential(e) {
          c.LogIt.getInstance().info(
            "[info.ts] setAcerCredential: " + JSON.stringify(e),
          ),
            this.store.set("acerCredentials", e);
        }
        removeAcerCredential() {
          this.store.delete("acerCredentials");
        }
        setRegistrationDate(e) {
          this.store.set("registrationDate", e);
        }
        getRegistrationDate() {
          return this.store.get("registrationDate");
        }
        getAESkey() {
          return g.EnvConfig.getInstance().AESkey;
        }
        setQuickClean(e) {
          this.store.set("QuickCleanupList", e);
        }
        getQuickClean() {
          return this.store.get("QuickCleanupList");
        }
        setRamLastCheckedInfo(e) {
          this.store.set("RamLastCheckedInfo", e);
        }
        getRamLastCheckedInfo() {
          return this.store.get("RamLastCheckedInfo");
        }
        setBatteryLastCheckedInfo(e) {
          this.store.set("BatteryLastCheckedInfo", e);
        }
        getBatteryLastCheckedInfo() {
          return this.store.get("BatteryLastCheckedInfo");
        }
        setBatteryCalibrationLastCheckTime(e) {
          this.store.set("BatteryCalibrationLastCheckTime", e);
        }
        getBatteryCalibrationLastCheckTime() {
          return this.store.get("BatteryCalibrationLastCheckTime");
        }
        setStorageLastCheckedInfo(e) {
          this.store.set("StorageLastCheckedInfo", e);
        }
        getStorageLastCheckedInfo() {
          return this.store.get("StorageLastCheckedInfo");
        }
        settempBlueLight(e) {
          this.store.set("TempBlueLight", e);
        }
        gettempBlueLight() {
          return this.store.get("TempBlueLight");
        }
        recordoledPanels(e) {
          this.store.set("oledPanels", e);
        }
        getneedtosendpp() {
          return this.store.get("NeedtoSendPrivacyPolicy");
        }
        setneedtosendpp(e) {
          this.store.set("NeedtoSendPrivacyPolicy", e);
        }
        getDiskCleanSetting() {
          return this.store.get("DiskCleanSetting");
        }
        setDiskCleanSetting(e) {
          this.store.set("DiskCleanSetting", e);
        }
        getIsResumed() {
          return this.store.get("isResumed");
        }
        setIsResumed(e) {
          c.LogIt.getInstance().info("[info.ts] setIsResumed = " + e),
            this.store.set("isResumed", e);
        }
        getFirstLaunchTime() {
          return this.store.get("firstLaunchTime") || 0;
        }
        getLastRunTime() {
          return this.store.get("lastRunTime") || 0;
        }
        setLastRunTime(e) {
          this.store.set("lastRunTime", e);
        }
        getLastBootTime() {
          return this.store.get("lastBootTime");
        }
        setLastBootTime(e) {
          this.store.set("lastBootTime", e);
        }
        getLastCheckWinStoreUpdateTime() {
          return this.store.get("LastCheckWinStoreUpdateTime") || "--";
        }
        setLastCheckWinStoreUpdateTime(e) {
          return this.store.set("LastCheckWinStoreUpdateTime", e);
        }
        getIsOLED() {
          return g.EnvConfig.getInstance().isOled;
        }
        getAcerBoxTicked() {
          const e = performance.now(),
            t = g.EnvConfig.getInstance().getAcerBoxTicked();
          return (
            c.LogIt.getInstance().info(
              "[PowerShell] FunctionName: getAcerBoxTicked , PowerShell Call: 1  , ExecutionTime:" +
                (performance.now() - e),
            ),
            c.LogIt.getInstance().info("[info.ts] getAcerBoxTicked = " + t),
            !!t
          );
        }
        getBACNotifyLastPushTime() {
          return this.store.get("BACNotifyLastPushTime") || [];
        }
        setBACNotifyLastPushTime(e) {
          this.store.set("BACNotifyLastPushTime", e);
        }
        setMTPLocalCofig(e) {
          this.store.set("MediaTouchPadConfig", e);
        }
        getMTPLocalCofig() {
          return this.store.get("MediaTouchPadConfig");
        }
        getBACTimeZone() {
          return this.store.get("BACTimeZone") || "";
        }
        setBACTimeZone(e) {
          this.store.set("BACTimeZone", e);
        }
        getUpdateWarrantyDatePeriod() {
          const e = g.EnvConfig.getInstance().getKeyValue(
            "periodToWarrantyDate",
          );
          if (e && e.length > 0) {
            c.LogIt.getInstance().info(
              `[INFO] get update warranty date period : ${e} day`,
            );
            return 24 * Number(e) * 60 * 60 * 1e3;
          }
          return 0;
        }
        setWarrantyInfo(e) {
          this.store.set("WarrantyInfo", e);
        }
        getWarrantyInfo() {
          const e = this.store.get("WarrantyInfo");
          return 0 != !!e && e;
        }
        setRegistedInfoByAcerValidProdAPI(e) {
          this.store.set("RegistedInfoByAcerValidProdAPI", e);
        }
        getRegistedInfoByAcerValidProdAPI() {
          const e = this.store.get("RegistedInfoByAcerValidProdAPI");
          return null != e && null != e && e;
        }
        getEnableDeleteProd() {
          return g.EnvConfig.getInstance().enableDeleteProd;
        }
      }
      t.Info = Info;
    },
    function (e, t) {
      e.exports = require("child_process");
    },
    function (e, t) {
      e.exports = require("os");
    },
    function (e, t) {
      e.exports = require("rxjs");
    },
    function (e, t) {
      e.exports = require("events");
    },
    function (e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0,
      }),
        (t.setLogger = t.getLogger = void 0);
      let n = r(42).LogItConsole.getInstance();
      (t.getLogger = function getLogger() {
        return n;
      }),
        (t.setLogger = function setLogger(e) {
          n = e;
        });
    },
    function (e, t) {
      e.exports = require("crypto");
    },
    function (e, t, r) {
      "use strict";
      var n =
        (this && this.__awaiter) ||
        function (e, t, r, n) {
          return new (r || (r = Promise))(function (i, o) {
            function fulfilled(e) {
              try {
                step(n.next(e));
              } catch (e) {
                o(e);
              }
            }
            function rejected(e) {
              try {
                step(n.throw(e));
              } catch (e) {
                o(e);
              }
            }
            function step(e) {
              e.done
                ? i(e.value)
                : (function adopt(e) {
                    return e instanceof r
                      ? e
                      : new r(function (t) {
                          t(e);
                        });
                  })(e.value).then(fulfilled, rejected);
            }
            step((n = n.apply(e, t || [])).next());
          });
        };
      Object.defineProperty(t, "__esModule", {
        value: !0,
      }),
        (t.Util = void 0);
      const { shell: i, dialog: o } = r(0),
        s = r(2),
        a = r(7),
        c = r(1),
        l = r(0),
        u = r(6),
        d = r(3),
        g = r(21),
        p = r(4),
        h = r(24),
        f = r(44),
        m = r(28),
        S = r(45),
        E = r(46),
        b = r(47),
        A = r(10),
        { getColorHexRGB: I } = r(48);
      var y;
      !(function (e) {
        (e.system_page = "systemPageTutorial"),
          (e.area_page = "areaPageTutorial"),
          (e.profile_manager = "profileManagerTutorial"),
          (e.appcenter = "firstAppcenter"),
          (e.landing = "landingTutorial"),
          (e.mode_switch_key = "modeSwitchKeyTutorial"),
          (e.privacy_policy = "needShowPrivacyPolicy");
      })(y || (y = {}));
      class Util {
        constructor() {
          (this.store = u.Store.getInstance()),
            (this.FavColorKey = "FavoriteColors"),
            (this.popNotifiaction = void 0),
            (this.notificatQueue = []),
            (this.bEmitNotification = !1),
            (this.DisplayMaxResolution = {
              width: 0,
              height: 0,
            }),
            (this.TmLastPopMsg = 0),
            (this.sysAudio = b.speaker),
            (this.adapter = (0, h.getAdapter)()),
            (this.videoCaptureDevice = []),
            (this.serviceVersion = {
              v: 4,
              major: 0,
              minor: 0,
              build: 0,
            }),
            (this.SupportSystemCapability = {
              CPU_Thermal_Sensor: !1,
              CPU_FAN_Device: !1,
              System_Thermal_Sensor: !1,
              System_FAN_Device: !1,
              External_System_FAN_Device: !1,
              GPU_FAN_Device: !1,
              System_2_Thermal_Sensor: !1,
              System_2_FAN_Device: !1,
              GPU_2_FAN_Device: !1,
              GPU_1_Thermal_Sensor: !1,
              GPU_2_Thermal_Sensor: !1,
            }),
            (this.mainWindow = null),
            (this.FavoriteColors = this.store.get(this.FavColorKey)),
            null == this.FavoriteColors && this.setFavoriteColor([]),
            this.searchCameraId();
        }
        set ServiceVer(e) {
          let t = (e = e.replace("v", "")).split(".");
          (this.serviceVersion.v = Number(t[0])),
            (this.serviceVersion.build = Number(t[t.length - 1])),
            4 == t.length
              ? ((this.serviceVersion.major = Number(t[1])),
                (this.serviceVersion.minor = Number(t[2])))
              : ((this.serviceVersion.major = Number(t[1])),
                (this.serviceVersion.minor = Number(t[1])));
        }
        getServiceVer() {
          return this.serviceVersion;
        }
        getSupportSystemCapability() {
          const e = this.adapter.getSupportSystemCapability();
          if (
            (d.LogIt.getInstance().debug(
              "[PA] getSupportSystemCapability, get data: " + e,
            ),
            e)
          ) {
            const t = Number(e).toString(2),
              r = t.split("");
            let n = 11 - r.length;
            if (n > 0) for (let e = 0; e < n; e++) r.unshift("0");
            d.LogIt.getInstance().debug(
              `[util.ts]: set SupportSysCapability: base2= ${t}, type: ${typeof t}`,
            ),
              d.LogIt.getInstance().debug(
                "[util.ts]: set SupportSysCapability: base2 array= " + r,
              ),
              (this.SupportSystemCapability.CPU_Thermal_Sensor = "1" == r[10]),
              (this.SupportSystemCapability.CPU_FAN_Device = "1" == r[9]),
              (this.SupportSystemCapability.System_Thermal_Sensor =
                "1" == r[8]),
              (this.SupportSystemCapability.System_FAN_Device = "1" == r[7]),
              (this.SupportSystemCapability.External_System_FAN_Device =
                "1" == r[6]),
              (this.SupportSystemCapability.GPU_FAN_Device = "1" == r[5]),
              (this.SupportSystemCapability.System_2_Thermal_Sensor =
                "1" == r[4]),
              (this.SupportSystemCapability.System_2_FAN_Device = "1" == r[3]),
              (this.SupportSystemCapability.GPU_2_FAN_Device = "1" == r[2]),
              (this.SupportSystemCapability.GPU_1_Thermal_Sensor = "1" == r[1]),
              (this.SupportSystemCapability.GPU_2_Thermal_Sensor = "1" == r[0]);
          }
          return this.SupportSystemCapability;
        }
        static getInstance() {
          return Util.instance || (Util.instance = new Util()), Util.instance;
        }
        setMainWindow(e) {
          (this.mainWindow = e), this.CreateNotifcation();
        }
        setMainWinBackgroundColor(e) {
          if ("" == e) return;
          let t = new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).test(e);
          this.mainWindow && t && this.mainWindow.setBackgroundColor(e);
        }
        showMessageBox(e) {
          return o.showMessageBox(this.mainWindow, e);
        }
        minimizeMainWindow() {
          c.minimizeMainWindow();
        }
        isVFSFilsExist(e) {
          return (0, a.isVFSFileExists)(e);
        }
        callADES(e) {
          g.ades.instance.notificationdata(e);
        }
        getResolution() {
          return (
            0 == this.DisplayMaxResolution.width &&
              (this.DisplayMaxResolution = c.GetDisplayMaxResolution()),
            this.DisplayMaxResolution
          );
        }
        EmitNotification() {
          var e = this.notificatQueue[0];
          d.LogIt.getInstance().debug(
            `[util.ts]: EmitNotification ${this.notificatQueue.length}:${e.param}`,
          ),
            this.notificatQueue.shift(),
            (this.popNotifiaction.title = e.header),
            (this.popNotifiaction.icon = s.join(
              __dirname,
              "/assets/image/favicon.ico",
            )),
            (this.popNotifiaction.body = e.param),
            (this.popNotifiaction.toastXml = e.toastXml),
            this.popNotifiaction.show(),
            (this.TmLastPopMsg = Date.now()),
            (this.bEmitNotification = !0);
        }
        CreateNotifcation() {
          (this.popNotifiaction = new l.Notification({
            title: "",
            icon: s.join(__dirname, "/assets/image/favicon.ico"),
            body: "",
            toastXml: "",
          })),
            this.popNotifiaction.on("close", () => {
              (this.bEmitNotification = !1),
                0 != this.notificatQueue.length &&
                  (d.LogIt.getInstance().debug(
                    "[util.ts]: notification close and contiune",
                  ),
                  this.EmitNotification());
            }),
            this.popNotifiaction.on("failed", (e, t) => {
              this.ResetNotificaiton(),
                d.LogIt.getInstance().debug(
                  "[util.ts]: notification failed:" + t,
                );
            }),
            this.popNotifiaction.on("click", (e, t) => {
              d.LogIt.getInstance().info(
                "[util.ts]: notification click:" + JSON.stringify(e),
              );
            });
        }
        ResetNotificaiton() {
          (this.bEmitNotification = !1), (this.notificatQueue = []);
        }
        showNotification(e, t, r) {
          if (r) {
            d.LogIt.getInstance().debug("[util.ts] Button ver noti is shown");
            var n = {
              header: e,
              param: t,
              toastXml: r,
            };
          } else {
            d.LogIt.getInstance().debug("[util.ts] Original ver noti is shown");
            n = {
              header: e,
              param: t,
              toastXml: "",
            };
          }
          this.notificatQueue.push(n),
            this.notificatQueue.length >= 5 &&
              (this.notificatQueue.shift(),
              Date.now() - this.TmLastPopMsg > 1e4 &&
                (this.ResetNotificaiton(), this.notificatQueue.push(n))),
            d.LogIt.getInstance().debug(
              "[util.ts]: showNotification," + this.notificatQueue.length,
            ),
            this.EmitNotification();
        }
        getAddPreloadAsDefault() {
          return (
            null != this.store.get("addPreloadAsDefault") &&
            null != this.store.get("addPreloadAsDefault") &&
            this.store.get("addPreloadAsDefault")
          );
        }
        getHasShowUI() {
          return (
            null != this.store.get("HasShowUI") &&
            null != this.store.get("HasShowUI") &&
            !!this.store.get("HasShowUI")
          );
        }
        setAddPreloadAsDefault(e) {
          this.store.set("addPreloadAsDefault", e);
        }
        getTutorialShow(e) {
          return n(this, void 0, void 0, function* () {
            var t = e;
            let r = yield this.store.get(t);
            return (
              d.LogIt.getInstance().info(
                `[util] getTutorialShow ==> v: ${e}, data: ${r}`,
              ),
              null != r && null != r && r
            );
          });
        }
        setTutorialShow(e, t) {
          switch (e) {
            case y.system_page:
              this.store.set("systemPageTutorial", t);
              break;
            case y.area_page:
              this.store.set("areaPageTutorial", t);
              break;
            case y.profile_manager:
              this.store.set("profileManagerTutorial", t);
              break;
            case y.appcenter:
              this.store.set("firstAppcenter", t);
              break;
            case y.landing:
              this.store.set("landingTutorial", t);
              break;
            case y.mode_switch_key:
              this.store.set("modeSwitchKeyTutorial", t);
              break;
            case y.privacy_policy:
              this.store.set("needShowPrivacyPolicy", t);
          }
          d.LogIt.getInstance().info(
            `[util.ts]: Set Tutorial ${e} display: ${t}}`,
          );
        }
        getMonitoringWidgetData() {
          return this.store.get("monitoringWidget") || null;
        }
        setMonitoringWidgetData(e) {
          d.LogIt.getInstance().info(
            `[util.ts]: Set monitoring widget display: ${e}}`,
          ),
            this.store.set("monitoringWidget", e);
        }
        getWidgetsList() {
          const e = this.store.get("WidgetsList") || null;
          return (
            d.LogIt.getInstance().info(
              "[util.ts]: Get config.json WidgetsList: " + e,
            ),
            e ||
              (d.LogIt.getInstance().info(
                "[util.ts]: Get config.json WidgetsList fail.",
              ),
              ["Explore", "SpatialLabs", "Live_Update", "App_Shortcut"])
          );
        }
        setWidgetsList(e) {
          d.LogIt.getInstance().info(
            "[util.ts]: Set config.json WidgetsList: " + e,
          ),
            this.store.set("WidgetsList", e);
        }
        setFavoriteColor(e) {
          (this.FavoriteColors = e), this.store.set(this.FavColorKey, e);
        }
        getFavoriteColor() {
          return this.FavoriteColors;
        }
        restartComputer() {
          E.reboot();
        }
        OnEyeDropper() {
          return n(this, void 0, void 0, function* () {
            console.log("OnEyeDropper");
            let e = yield I();
            return console.log(e), e;
          });
        }
        IsEnableEco() {
          let e = this.store.get("Enable_Eco");
          return (
            d.LogIt.getInstance().debug("[ulti] Is Enable Eco Mode:" + e),
            1 == e
          );
        }
        EnableEco() {
          this.IsEnableEco() ||
            (this.EcoVol(!0),
            this.EcoBrightness(!0),
            this.store.set("Enable_Eco", 1));
        }
        ExitEco() {
          this.IsEnableEco() &&
            (this.EcoVol(!1),
            this.EcoBrightness(!1),
            this.store.set("Enable_Eco", 0));
        }
        EcoVol(e) {
          return n(this, void 0, void 0, function* () {
            this.GetSystem_volume().then((t) => {
              if (e)
                d.LogIt.getInstance().debug("[ulti] Enable eco,Volume:" + t),
                  t >= 40 &&
                    (this.store.set("Volume", t), (this.system_volume = 40));
              else if (
                (d.LogIt.getInstance().debug("[ulti] Exit eco,Volume:" + t),
                40 == t)
              ) {
                let e = this.store.get("Volume");
                null != e && (this.system_volume = Number(e));
              }
            });
          });
        }
        EcoBrightness(e) {
          return n(this, void 0, void 0, function* () {
            const setBrightness = (e) => {
              setTimeout(() => {
                let t = c.SetBrightness(e);
                d.LogIt.getInstance().debug(
                  `[ulti] Set Brightness:${e},${t.result}`,
                ),
                  t.result ||
                    d.LogIt.getInstance().debug("[ulti] Set Brightness fail.");
              }, 500);
            };
            clearInterval(this.intervalBr),
              (this.tmBr = Date.now()),
              new Promise((e, t) => {
                this.intervalBr = setInterval(() => {
                  console.log("Get Screen Brightness loop");
                  let r = c.GetBrightness().brightness;
                  d.LogIt.getInstance().debug(
                    "[ulti] Get Screen Brightness loop:" + r,
                  ),
                    NaN != r && e(r),
                    Date.now() - this.tmBr > 1e3 && t("Timeout");
                }, 100);
              })
                .then((t) => {
                  if (
                    (clearInterval(this.intervalBr),
                    d.LogIt.getInstance().debug(
                      "[ulti] Screen Brightness:" + t,
                    ),
                    e)
                  )
                    t >= 40 &&
                      (this.store.set("Screen_Brightness", t),
                      setBrightness(40),
                      d.LogIt.getInstance().debug(
                        "[ulti] Save Brightness:" + t,
                      ));
                  else if (40 == t) {
                    let e = this.store.get("Screen_Brightness");
                    if (null != e) {
                      let t = Number(e);
                      setBrightness(t);
                    }
                  }
                })
                .catch((e) => {
                  d.LogIt.getInstance().debug("[ulti] Get Brightness Timeout");
                })
                .finally(() => {
                  d.LogIt.getInstance().debug("[ulti] eco clear timer"),
                    clearInterval(this.intervalBr);
                });
          });
        }
        set system_volume(e) {
          this.sysAudio.set(e);
        }
        GetSystem_volume() {
          return n(this, void 0, void 0, function* () {
            return yield this.sysAudio.get();
          });
        }
        GetNotificationIcon() {
          try {
            return "" + s.join(__dirname, "/assets/image/favicon.ico");
          } catch (e) {
            d.LogIt.getInstance().debug(
              "[ulti] GetNotificationIcon error: " + e,
            );
          }
        }
        checkQAExist() {
          const e = {
            cwd: process.cwd(),
            exist: !1,
          };
          try {
            const t = A.execSync(
                "reg query HKEY_LOCAL_MACHINE\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{AB25551C-74EF-4BAB-9989-891517FCF9FF}",
              ).toString(),
              r = t.includes("Quick Access Service");
            d.LogIt.getInstance().info(
              "[util.ts] checkQAExist reg query Quick Access = " +
                JSON.stringify(t),
            ),
              (e.exist = r);
          } catch (e) {
            d.LogIt.getInstance().info(
              "[util.ts] checkQAExist fail, error = " + e,
            );
          }
          return e;
        }
        getOobePeriod() {
          return p.EnvConfig.getInstance().oobeNotiPeriod;
        }
        setOobeNotification(e, t, r, n, i) {
          d.LogIt.getInstance().info(
            `[util.ts] setOobeNotification => isCreate: ${n}, haspass: ${r}`,
          ),
            clearTimeout(this.OobeTimer);
          if (!!n) {
            const n = r,
              getPeriod = (e, t) => {
                var r = 0,
                  n = e,
                  i = t,
                  o = p.EnvConfig.getInstance().oobeNotiPeriod;
                if (
                  (d.LogIt.getInstance().info(
                    `[util.ts] setOobeNotification => getPeriod => fstOrSec: ${e}, haspass: ${i}`,
                  ),
                  o)
                ) {
                  var s = Number(o);
                  d.LogIt.getInstance().info(
                    "[util.ts] setOobeNotification => getPeriod => is fake, fakePeriodNum = " +
                      s,
                  ),
                    (r = s > i ? s * n - i + 1 : 1);
                } else r = 1728e3 > i ? 1728e3 - i + 1 : 1;
                return (
                  d.LogIt.getInstance().info(
                    "[util.ts] setOobeNotification => getPeriod => res = " + r,
                  ),
                  r
                );
              },
              o = getPeriod(1, n);
            this.OobeTimer = setTimeout(() => {
              const r = !this.mainWindow.isVisible(),
                o = e.replace("%AppName%", "AcerSense"),
                s = t,
                a = i;
              if (a && r) {
                this.showNotification(o, s, a);
                let e = this.store.get("OobeNotificationPopTwice") || !1,
                  t = new Date();
                if (
                  (d.LogIt.getInstance().info(
                    `[util.ts] setOobeNotification => popup first noti! Date: ${t.toLocaleTimeString()}, hasPopTwice? ${e}`,
                  ),
                  !e)
                ) {
                  const e = getPeriod(2, n);
                  this.setFourtyDaysOobeNoti(e, o, s, a);
                }
              }
            }, 1e3 * o);
          }
        }
        setFourtyDaysOobeNoti(e, t, r, n) {
          clearTimeout(this.OobeTimer);
          const i = t,
            o = r,
            s = n,
            a = e;
          this.OobeTimer = setTimeout(() => {
            this.store.set("OobeNotificationPopTwice", !0);
            var e = new Date();
            d.LogIt.getInstance().info(
              "[util.ts] setOobeNotification => popup second noti! Date: " +
                e.toLocaleTimeString(),
            ),
              this.showNotification(i, o, s);
          }, 1e3 * a);
        }
        openCameraSettings() {
          let e = this.encodedString;
          let t = new f("start ms-settings:camera?cameraId=" + e, {
            executionpolicy: "Bypass",
          });
          t.on("error", (e) => {
            d.LogIt.getInstance().error(
              "OpenMSCamera PS Error: " + e.toString(),
            ),
              console.error(e);
          }),
            t.on("output", (e) => {
              console.log(e);
            }),
            t.on("error-output", (e) => {
              console.error(e);
            }),
            t.on("end", (e) => {
              console.log("CMD_SCRIPT.OpenMSCamera END: " + Date());
            });
        }
        searchCameraId() {
          m.DeviceInformation.findAllAsync(4, (e, t) => {
            this.videoCaptureDevice = [];
            try {
              for (var r = 0; ; ) {
                const e = t.getAt(r++);
                this.videoCaptureDevice.push(e),
                  d.LogIt.getInstance().info(
                    `[VideoCaptureDevice - ${r}] id: ${e.id}, isDefault: ${e.isDefault}, isEnabled: ${e.isEnabled}, name: ${e.name}`,
                  ),
                  console.log(
                    `[VideoCaptureDevice - ${r}] id: ${e.id}, isDefault: ${e.isDefault}, isEnabled: ${e.isEnabled}, name: ${e.name}`,
                  ),
                  (this.encodedString = S.escape(e.id)),
                  d.LogIt.getInstance().info(
                    "encodedString=" + this.encodedString,
                  ),
                  console.log("encodedString=" + this.encodedString);
              }
            } catch (e) {}
          });
        }
        openPurifiedVoice() {
          Util.getInstance()
            .checkPurifiedVoicePackageName()
            .then((e) => {
              d.LogIt.getInstance().info("packageName? " + e),
                "" != e
                  ? Util.getInstance().OpenPurifiedVoice(e.toString())
                  : (d.LogIt.getInstance().error(
                      'APP "Purified Voice" NOT FOUND!',
                    ),
                    console.log('APP "Purified Voice" NOT FOUND!'));
            });
        }
        OpenPurifiedVoice(e) {
          let t = new f('explorer "shell:AppsFolder\\' + e + '"', {
            executionpolicy: "Bypass",
          });
          t.on("error", (e) => {
            d.LogIt.getInstance().error(
              "OpenPurifiedVoice PS Error: " + e.toString(),
            ),
              console.error(e);
          }),
            t.on("output", (e) => {
              console.log(e);
            }),
            t.on("error-output", (e) => {
              console.error(e);
            }),
            t.on("end", (e) => {
              console.log("CMD_SCRIPT.LAUNCH_PURIFIED_VOICE END: " + Date());
            });
        }
        checkPurifiedVoicePackageName() {
          return new Promise((e) => {
            try {
              let t = new f(
                "(Get-StartApps | Where {$_.Name -like '*Purified*Voice*'}).AppID",
                {
                  executionpolicy: "Bypass",
                },
              );
              t.on("error", (t) => {
                d.LogIt.getInstance().error(
                  "isPurifiedVoiceInstalled PS Error: " + t.toString(),
                ),
                  console.error(t),
                  e("");
              }),
                t.on("output", (t) => {
                  console.log(t), e("" === t ? "" : t);
                }),
                t.on("error-output", (t) => {
                  console.error(t), e("");
                }),
                t.on("end", (e) => {
                  console.log(
                    "CMD_SCRIPT.SEARCH_PURIFIED_VOICE END: " + Date(),
                  );
                });
            } catch (t) {
              d.LogIt.getInstance().error(
                "isPurifiedVoiceInstalled Error: " + t.toString(),
              ),
                console.log(t),
                e("");
            }
          });
        }
      }
      t.Util = Util;
    },
    function (e, t) {
      e.exports = require("mqtt");
    },
    function (e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0,
      }),
        (t.Admin = void 0);
      const { shell: n, app: i } = r(0);
      r(19),
        r(15),
        Buffer.from("9vApxLk5G3PAsJrM", "utf8"),
        Buffer.from("FnJL7EDzjqWjcaY9", "utf8");
      class Admin {
        constructor() {
          (this.uuid = ""),
            (this.userOS = ""),
            (this.userFrom = ""),
            (this.userLanguage = "");
        }
        static getInstance() {
          return (
            Admin.instance || (Admin.instance = new Admin()), Admin.instance
          );
        }
        getLocale() {
          return i.getLocale();
        }
        setUUID(e) {
          this.uuid = e;
        }
        getUUID() {
          return this.uuid;
        }
        setUserOS(e) {
          this.userOS = e;
        }
        getUserOS() {
          return this.userOS;
        }
        setUserFrom(e) {
          this.userFrom = e;
        }
        getUserFrom() {
          return this.userFrom;
        }
        setUserLanguage(e) {
          this.userLanguage = e;
        }
        getUserLanguage() {
          return this.userLanguage;
        }
      }
      t.Admin = Admin;
    },
    function (e, t) {
      e.exports = require("electron-store");
    },
    function (e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0,
      }),
        (t.DEFAULT_KEYBOARD_LEDs =
          t.DEFAULT_KEYBOARD_4ZONES =
          t.DEFAULT_KEYBOARD_3ZONES =
          t.DEFAULT_LIGHTBAR_3LEDs =
          t.DEFAULT_LIGHTBAR_LEDs =
          t.InteractiveMappingColor =
          t.KB_3ZONES =
          t.KB_4ZONES =
          t.LIGHTBAR_LEDs =
          t.KB_LEDs =
            void 0),
        (t.KB_LEDs = "keyboardLeds"),
        (t.LIGHTBAR_LEDs = "LightbarLeds"),
        (t.KB_4ZONES = "keyboard4Zones"),
        (t.KB_3ZONES = "keyboard3Zones");
      const n = "#ffa000";
      (t.InteractiveMappingColor = n),
        (t.DEFAULT_LIGHTBAR_LEDs = [
          {
            LED_id: 0,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 1,
            color: "" + n,
            status: 1,
          },
        ]),
        (t.DEFAULT_LIGHTBAR_3LEDs = [
          {
            LED_id: 0,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 1,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 2,
            color: "" + n,
            status: 1,
          },
        ]),
        (t.DEFAULT_KEYBOARD_3ZONES = [
          {
            LED_id: 0,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 1,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 2,
            color: "" + n,
            status: 1,
          },
        ]),
        (t.DEFAULT_KEYBOARD_4ZONES = [
          {
            LED_id: 0,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 1,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 2,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 3,
            color: "" + n,
            status: 1,
          },
        ]),
        (t.DEFAULT_KEYBOARD_LEDs = [
          {
            LED_id: 0,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 1,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 2,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 3,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 4,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 5,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 6,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 7,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 8,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 9,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 10,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 11,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 12,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 13,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 14,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 15,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 16,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 17,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 18,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 19,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 20,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 21,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 22,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 23,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 24,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 25,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 26,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 27,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 28,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 29,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 30,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 31,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 32,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 33,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 34,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 35,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 36,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 37,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 38,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 39,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 40,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 41,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 42,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 43,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 44,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 45,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 46,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 47,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 48,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 49,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 50,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 51,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 52,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 53,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 54,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 55,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 56,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 57,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 58,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 59,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 60,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 61,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 62,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 63,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 64,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 65,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 66,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 67,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 68,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 69,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 70,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 71,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 72,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 73,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 74,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 75,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 76,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 77,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 78,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 79,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 80,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 81,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 82,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 83,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 84,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 85,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 86,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 87,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 88,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 89,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 90,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 91,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 92,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 93,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 94,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 95,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 96,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 97,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 98,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 99,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 100,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 101,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 102,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 103,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 104,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 105,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 106,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 107,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 108,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 109,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 110,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 111,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 112,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 113,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 114,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 115,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 116,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 117,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 118,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 119,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 120,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 121,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 122,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 123,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 124,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 125,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 126,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 127,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 128,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 129,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 130,
            color: "" + n,
            status: 1,
          },
          {
            LED_id: 131,
            color: "" + n,
            status: 1,
          },
        ]);
    },
    function (e, t, r) {
      "use strict";
      var n =
        (this && this.__awaiter) ||
        function (e, t, r, n) {
          return new (r || (r = Promise))(function (i, o) {
            function fulfilled(e) {
              try {
                step(n.next(e));
              } catch (e) {
                o(e);
              }
            }
            function rejected(e) {
              try {
                step(n.throw(e));
              } catch (e) {
                o(e);
              }
            }
            function step(e) {
              e.done
                ? i(e.value)
                : (function adopt(e) {
                    return e instanceof r
                      ? e
                      : new r(function (t) {
                          t(e);
                        });
                  })(e.value).then(fulfilled, rejected);
            }
            step((n = n.apply(e, t || [])).next());
          });
        };
      Object.defineProperty(t, "__esModule", {
        value: !0,
      }),
        (t.ades = t.PSSdkStreamReader = t.PacketID = void 0);
      const i = r(6),
        o = r(14),
        s = r(12),
        a = r(9),
        c = r(4);
      var l = r(22),
        u = r(23);
      var d;
      !(function (e) {
        e[(e.NOTIFIACTION = 120)] = "NOTIFIACTION";
      })((d = t.PacketID || (t.PacketID = {})));
      class PSSdkStreamReader {
        constructor(e) {
          (this.callback = e),
            (this.bracketsCount = 0),
            (this.bufferedString = "");
        }
        flushSegment(e, t, r) {
          if (0 != this.bufferedString.length || t != r) {
            var n = this.bufferedString + e.substring(t, r);
            this.callback(n), (this.bufferedString = "");
          }
        }
        putData(e) {
          for (var t = 0, r = 0; r < e.length; r++)
            "{" == e[r]
              ? (0 == this.bracketsCount &&
                  (this.flushSegment(e, t, r), (t = r)),
                this.bracketsCount++)
              : "}" == e[r] &&
                (this.bracketsCount--,
                0 == this.bracketsCount &&
                  ("\n" == e[r + 1] && r++,
                  this.flushSegment(e, t, r + 1),
                  (t = r + 1)));
          t < e.length && (this.bufferedString += e.substring(t));
        }
      }
      t.PSSdkStreamReader = PSSdkStreamReader;
      class ades {
        constructor() {
          (this.connected = !1),
            (this.callbackArray = []),
            (this.info = a.Info.getInstance()),
            (this.store = i.Store.getInstance()),
            (this.seq_send_idx = 0),
            (this.seq_in_out = 0),
            (this.gotData = new s.Subject()),
            (this.delay = (e) => new Promise((t) => setTimeout(t, e))),
            this.connectToService();
        }
        static get instance() {
          return (
            ades._instance || (ades._instance = new ades()), ades._instance
          );
        }
        reConnectToService() {
          c.EnvConfig.getInstance().adecReconnect &&
            ((0, o.getLogger)().info("[ADES] Reconnect To Service"),
            console.log("[ADES] Reconnect To Service"),
            setTimeout(() => {
              this.connected || this.connectToService();
            }, 2e3));
        }
        connectToService() {
          const e = "127.0.0.1";
          (this.socket = l.createConnection(
            {
              host: e,
              port: 51779,
            },
            () => {
              (0, o.getLogger)().info("[ADES] connectToService"),
                console.log("[ADES] connectToService"),
                (this.connected = !0);
            },
          )),
            this.socket.on("connect", () =>
              n(this, void 0, void 0, function* () {
                if (
                  ((0, o.getLogger)().info(
                    `[ADES] success connect to ${e}:51779`,
                  ),
                  console.log(`[ADES] success connect to ${e}:51779!!`),
                  0 == (yield this.store.get("needShowPrivacyPolicy")))
                ) {
                  let e = yield this.info.getIsAgreePrivacyPolicy();
                  (0, o.getLogger)().info(
                    "[ADES] needShowPrivacyPolicy is false so to send IsAgreePrivacyPolicy",
                  ),
                    (0, o.getLogger)().info(
                      "[ADES] IsAgreePrivacyPolicy => " + e,
                    ),
                    this.notificationdata(e);
                }
              }),
            ),
            this.socket.on("close", () => {
              (0, o.getLogger)().info("[ADES] Close the connection"),
                console.log("[ADES] Close the connection"),
                (this.connected = !1),
                this.reConnectToService();
            }),
            this.socket.on("error", (e) => {
              (0, o.getLogger)().info("[ADES]  Error occur! Connection closed"),
                (0, o.getLogger)().info(e),
                console.log("[ADES] " + e);
            }),
            this.socket.on("drain", () => {
              (0, o.getLogger)().info("[ADES] Drain the data"),
                console.log("[ADES] Drain the data");
            }),
            this.socket.on("data", (e) =>
              n(this, void 0, void 0, function* () {
                var t = e.toString();
                if (this.decipher) {
                  var r = Buffer.from(t, "base64");
                  (t = this.decipher.update(r, void 0, "utf8")),
                    (t += this.decipher.final("utf8"));
                }
                this.streamReader.putData(t);
              }),
            ),
            (this.streamReader = new PSSdkStreamReader((e) =>
              n(this, void 0, void 0, function* () {
                (0, o.getLogger)().debug(`[ADES] '${e}'`);
                try {
                  const t = JSON.parse(e);
                  if (
                    ((0, o.getLogger)().debug(
                      "[ADES] rep = " + JSON.stringify(t),
                    ),
                    t.request && (0, o.getLogger)().info("RCV " + t.request),
                    this.gotData.next(t),
                    t.request)
                  ) {
                    const e = this.callbackArray.findIndex(
                      (e) => e.funcName === t.request,
                    );
                    -1 !== e
                      ? ((0, o.getLogger)().info(
                          `[ADES] Callback function for request: ${t.request},idx:${e}`,
                        ),
                        this.callbackArray[e].resolve(t),
                        this.callbackArray.splice(e, 1))
                      : (0, o.getLogger)().info(
                          "[ADES] Can not find any callback function for request: " +
                            t.request,
                        );
                  }
                } catch (e) {
                  (0, o.getLogger)().error(`${e.name} - ${e.message}`),
                    console.error(e);
                }
              }),
            ));
        }
        sendRequest(e, t) {
          this.seq_send_idx++;
          (0, o.getLogger)().debug(`sendRequest ${d[e]}: ${JSON.stringify(t)}`);
          return new Promise((r, i) =>
            n(this, void 0, void 0, function* () {
              var n = new u.WritableStreamBuffer();
              n.write("ACER");
              let s = Buffer.from(new Uint32Array([e]).buffer);
              n.write(s);
              var a = JSON.stringify(t);
              n.write(a);
              var c = n.getContents();
              this.cipher &&
                ((c = this.cipher.update(c, "binary", "base64")),
                (c += this.cipher.final("base64")),
                (c = Buffer.from(c, "base64"))),
                this.socket.write(c),
                (0, o.getLogger)().info("SND " + c),
                (0, o.getLogger)().info(`SND ${d[e]} / ${t.Function || d[e]}`),
                (0, o.getLogger)().debug(`${d[e]}: ${a}`);
              t.Function;
              this.callbackArray.push({
                funcName: t.Function || d[e],
                resolve: r,
                reject: i,
              });
            }),
          );
        }
        notificationdata(e) {
          return n(this, void 0, void 0, function* () {
            return (
              (0, o.getLogger)().info("[ADES] notificationdata!!"),
              console.log("[ADES] notificationdata!!"),
              e
                ? this.sendRequest(d.NOTIFIACTION, {
                    Function: "X-Sense_PrivacyPolicyConsensus_ADESV2",
                    Parameter: {
                      status: 1,
                    },
                  })
                : this.sendRequest(d.NOTIFIACTION, {
                    Function: "X-Sense_PrivacyPolicyConsensus_ADESV2",
                    Parameter: {
                      status: 0,
                    },
                  })
            );
          });
        }
      }
      t.ades = ades;
    },
    function (e, t) {
      e.exports = require("net");
    },
    function (e, t) {
      e.exports = require("stream-buffers");
    },
    function (e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0,
      }),
        (t.getAdapter = void 0);
      const n = r(4),
        i = r(25),
        o = r(43);
      t.getAdapter = function getAdapter() {
        return n.EnvConfig.getInstance().simulatorMode
          ? o.SimulatorAdapter.instance
          : i.PSSdkAdapter.instance;
      };
    },
    function (e, t, r) {
      "use strict";
      var n =
        (this && this.__awaiter) ||
        function (e, t, r, n) {
          return new (r || (r = Promise))(function (i, o) {
            function fulfilled(e) {
              try {
                step(n.next(e));
              } catch (e) {
                o(e);
              }
            }
            function rejected(e) {
              try {
                step(n.throw(e));
              } catch (e) {
                o(e);
              }
            }
            function step(e) {
              e.done
                ? i(e.value)
                : (function adopt(e) {
                    return e instanceof r
                      ? e
                      : new r(function (t) {
                          t(e);
                        });
                  })(e.value).then(fulfilled, rejected);
            }
            step((n = n.apply(e, t || [])).next());
          });
        };
      Object.defineProperty(t, "__esModule", {
        value: !0,
      }),
        (t.testServiceJSON =
          t.PSSdkAdapter =
          t.PSSdkStreamReader =
          t.PacketID =
            void 0);
      const i = r(8),
        o = r(26),
        s = r(4),
        a = r(12),
        c = r(0),
        l = r(27),
        u = r(15),
        d = r(0),
        g = r(14);
      var p = r(22),
        h = r(5),
        f = r(23);
      r(2);
      var m;
      !(function (e) {
        (e[(e.INITIALIZATION = 0)] = "INITIALIZATION"),
          (e[(e.GET_MONITOR_DATA = 10)] = "GET_MONITOR_DATA");
      })((m = t.PacketID || (t.PacketID = {})));
      class PSSdkStreamReader {
        constructor(e) {
          (this.callback = e),
            (this.bracketsCount = 0),
            (this.bufferedString = "");
        }
        flushSegment(e, t, r) {
          if (0 != this.bufferedString.length || t != r) {
            var n = this.bufferedString + e.substring(t, r);
            this.callback(n), (this.bufferedString = "");
          }
        }
        putData(e) {
          for (var t = 0, r = 0; r < e.length; r++)
            "{" == e[r]
              ? (0 == this.bracketsCount &&
                  (this.flushSegment(e, t, r), (t = r)),
                this.bracketsCount++)
              : "}" == e[r] &&
                (this.bracketsCount--,
                0 == this.bracketsCount &&
                  ("\n" == e[r + 1] && r++,
                  this.flushSegment(e, t, r + 1),
                  (t = r + 1)));
          t < e.length && (this.bufferedString += e.substring(t));
        }
      }
      t.PSSdkStreamReader = PSSdkStreamReader;
      class PSSdkAdapter extends l.AdapterBase {
        constructor() {
          super(),
            (this.gotData = new a.Subject()),
            (this.sequential = s.EnvConfig.getInstance().seqMode),
            (this.seq_in_out = 0),
            (this.seq_send_idx = 0),
            (this.callbackArray = []),
            (this.count = 0),
            (this.bResume = !1),
            (this.ServiceVer = void 0),
            (this.SupportSystemCapability = void 0),
            (this.autoReconnect = !0),
            (this.delay = (e) => new Promise((t) => setTimeout(t, e))),
            this.connectToService();
          const e = s.EnvConfig.getInstance().AESkey;
          if (e && 32 == e.length) {
            (0, g.getLogger)().debug(
              "Enable encryption for the socket channel - " + e,
            );
            const t = Buffer.from(e, "utf8");
            (this.cipher = (0, u.createCipheriv)("aes-256-ecb", t, null)),
              (this.decipher = (0, u.createDecipheriv)("aes-256-ecb", t, null)),
              this.cipher.setAutoPadding(!0),
              this.decipher.setAutoPadding(!0);
          }
          d.powerMonitor.on("resume", () => {
            try {
              (0, g.getLogger)().debug(
                `[PA]Power resume..connected: ${this.connected}.`,
              ),
                this.connected &&
                  (this.socket && this.socket.close(),
                  (this.connected = !1),
                  (this.bResume = !0),
                  (0, g.getLogger)().debug(
                    `[PA]Power resume..connected: ${this.connected}.done`,
                  ));
            } catch (e) {
              (0, g.getLogger)().info(
                `[PA]Power resume..connected error: ${JSON.stringify(e)}.`,
              );
            }
            (0, g.getLogger)().debug("[PA]Power resume emit"),
              this.powerResume.emit("resume"),
              (0, g.getLogger)().info("[PA]Power resume emit .. done");
          });
        }
        static get instance() {
          return (
            PSSdkAdapter._instance ||
              (PSSdkAdapter._instance = new PSSdkAdapter()),
            PSSdkAdapter._instance
          );
        }
        reConnectToService() {
          (0, g.getLogger)().info("[PA] reConnectToService"),
            setTimeout(() => {
              this.connected || this.connectToService();
            }, 2e3);
        }
        close() {
          var e;
          (this.autoReconnect = !1),
            null === (e = this.socket) || void 0 === e || e.destroy();
        }
        initVar() {
          this.callbackArray.forEach((e) => {
            (0, g.getLogger)().info("[PA] callback timeout:" + e.funcName),
              e.reject(e.funcName + " timeout");
          }),
            (this.callbackArray = []),
            this.socket && this.socket.close(),
            (this.socket = void 0),
            (this.connect = void 0),
            (this.connect = new a.BehaviorSubject(!1)),
            (this.streamReader = void 0),
            (this.gotData = void 0),
            (this.gotData = new a.Subject());
        }
        connectToService() {
          (0, g.getLogger)().info("[PA] connectToService");
          const e = (this.socket = p.createConnection({
            host: "127.0.0.1",
            port: 46753,
          }));
          e.on("connect", () => {
            (0, g.getLogger)().info("[PA] Connect to 127.0.0.1:46753"),
              this.connect.next(!0),
              (this.connected = !0),
              this.bResume && (this.bResume = !1);
            try {
              this.Initialization_ServiceVersion(),
                this.Initialization_SupportSystemCapability();
            } catch (e) {
              (0, g.getLogger)().info("[PA] Get Service version Error:" + e);
            }
          }),
            e.on("close", () => {
              (0, g.getLogger)().info("[PA] Close the connection"),
                (this.connected = !1),
                this.autoReconnect &&
                  (this.initVar(), this.reConnectToService());
            }),
            e.on("error", (e) => {
              (0, g.getLogger)().info("[PA]  Error occur! Connection closed"),
                (0, g.getLogger)().info(e);
            }),
            e.on("drain", () => {
              (0, g.getLogger)().info("[PA] Drain the data");
            }),
            e.on("data", (e) => {
              var t = e.toString();
              if (this.decipher) {
                var r = Buffer.from(t, "base64");
                (t = this.decipher.update(r, void 0, "utf8")),
                  (t += this.decipher.final("utf8"));
              }
              this.streamReader.putData(t);
            }),
            (this.socket = e),
            (this.streamReader = new PSSdkStreamReader((e) => {
              (0, g.getLogger)().debug("[PA] " + e);
              const t = JSON.parse(e);
              if (
                (t.request && (0, g.getLogger)().info("RCV " + t.request),
                this.gotData.next(t),
                t.request)
              ) {
                const e = this.callbackArray.findIndex(
                  (e) => e.funcName === t.request,
                );
                -1 !== e
                  ? ((0, g.getLogger)().info(
                      `[PA] Callback function for request: ${t.request},idx:${e}`,
                    ),
                    this.callbackArray[e].resolve(t.data),
                    this.callbackArray.splice(e, 1),
                    this.seq_in_out++)
                  : (0, g.getLogger)().info(
                      "[PA] Can not find any callback function for request: " +
                        t.request,
                    );
              } else
                i.MqttFunctionCall.getInstance().broadcast(
                  t.Function,
                  t.Parameter,
                );
            }));
        }
        broadcastRes(e) {
          e.request === o.UPDATED_DATA.CUSTOM_BOOT_LOGO &&
            ((0, g.getLogger)().debug("[PA] CUSTOM_BOOT_LOGO:" + e),
            i.MqttFunctionCall.getInstance().broadcast("SERVICE_RESPONSE", e));
        }
        sendRequest(e, t) {
          const r = this.seq_send_idx++;
          (0, g.getLogger)().debug(`sendRequest ${m[e]}: ${JSON.stringify(t)}`);
          return new Promise((i, o) =>
            n(this, void 0, void 0, function* () {
              for (; !this.connected; ) yield this.delay(1e3);
              if (this.sequential)
                for (; r !== this.seq_in_out; ) yield this.delay(50);
              var n = new f.WritableStreamBuffer();
              n.write("ACER");
              let s = Buffer.from(new Uint32Array([e]).buffer);
              n.write(s);
              var a = JSON.stringify(t);
              n.write(a);
              var c = n.getContents();
              this.cipher &&
                ((c = this.cipher.update(c, "binary", "base64")),
                (c += this.cipher.final("base64")),
                (c = Buffer.from(c, "base64"))),
                this.socket.write(c),
                (0, g.getLogger)().info(`SND ${m[e]} / ${t.Function || m[e]}`),
                (0, g.getLogger)().debug(`${m[e]}: ${a}`),
                this.callbackArray.push({
                  funcName: t.Function || m[e],
                  resolve: i,
                  reject: o,
                });
            }),
          );
        }
        Initialization_ServiceVersion() {
          return n(this, void 0, void 0, function* () {
            return (
              (0, g.getLogger)().debug("[PA] getVersion"),
              this.sendRequest(m.INITIALIZATION, {
                Function: "VERSION",
              }).then(
                (e) => (
                  (this.ServiceVer = e),
                  (0, g.getLogger)().info(
                    "[PA]INITIALIZATION Service version:" + this.ServiceVer,
                  ),
                  e
                ),
              )
            );
          });
        }
        getServiceVersion() {
          return (
            (0, g.getLogger)().info("[PA] Service version:" + this.ServiceVer),
            this.ServiceVer
          );
        }
        Initialization_SupportSystemCapability() {
          return n(this, void 0, void 0, function* () {
            return (
              (0, g.getLogger)().debug("[PA] getSupportSystemCapability"),
              this.sendRequest(m.INITIALIZATION, {
                Function: "SUPPORT_SYSTEM_CAPABILITY",
              }).then(
                (e) => (
                  (this.SupportSystemCapability = e),
                  (0, g.getLogger)().info(
                    "[PA]INITIALIZATION Support System Capability:" +
                      this.SupportSystemCapability,
                  ),
                  e
                ),
              )
            );
          });
        }
        getSupportSystemCapability() {
          return (
            (0, g.getLogger)().info(
              "[PA] Service version:" + this.SupportSystemCapability,
            ),
            this.SupportSystemCapability
          );
        }
        getMonitorData() {
          return n(this, void 0, void 0, function* () {
            return (
              (0, g.getLogger)().debug("[PA] getMonitorData"),
              this.sendRequest(m.GET_MONITOR_DATA, {}).then(
                (e) => ((e.timeStamp = new Date()), e),
              )
            );
          });
        }
      }
      (t.PSSdkAdapter = PSSdkAdapter),
        (t.testServiceJSON = function testServiceJSON(e) {
          const t = h.readFileSync(e, "utf-8"),
            r = JSON.parse(t),
            n = PSSdkAdapter.instance;
          n.connect.asObservable().subscribe((e) => {
            e &&
              r.forEach((e) => {
                n.sendRequest(m[e.cmd], e.data);
              });
          }),
            n.gotData.asObservable().subscribe((e) => {
              console.log(e);
            }),
            console.log("App will be terminated in 10 seconds..."),
            setTimeout(() => c.app.quit(), 1e4);
        });
    },
    function (e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0,
      }),
        (t.CareCenterWS =
          t.DeviceInfoWS =
          t.QuickAccessWS =
          t.DeviceInfoCategory =
          t.EnableSpatialLabs =
          t.SPATIALLABS_DEVICE =
          t.AC_hasAnyPD =
          t.AC_hasAnyAC =
          t.PushMsg =
          t.PushMsgCategory =
          t.SCENARIO_EDIT =
          t.TEMPERATURE_UNIT =
          t.GPU_DATA_TYPE =
          t.TUTORIO_SHOW =
          t.DisplayPort =
          t.FanName =
          t.UPDATED_DATA =
          t.DEFAULT_SCENARIO =
          t.DEFAULT_LIGHTING_LOGO =
          t.DEFAULT_LIGHTING_BAR_REAR =
          t.DEFAULT_LIGHTING_BAR =
          t.DEFAULT_LIGHTING_KEYBOARD =
          t.DEFAULT_LIGHTING_EFFECT =
          t.KEYBOARD_DEVICE =
          t.LIGHTBAR_DEVICE =
          t.INTERACTIVE_EFFECT =
          t.SupportedEffect =
          t.DEVICE_TYPE =
          t.KEYBOARD_LANGUAGE =
          t.COLOR_MODE =
          t.LIGHTBAR_TYPE =
          t.MainTab =
          t.SystemTab =
          t.FN_LIGHTING_DEVICE =
          t.SYSTEM_USAGE_MODE =
          t.ServiceSubPage =
          t.KEYBOARD_ZONE_INDEX =
          t.LIGHTBAR_INDEX =
          t.EFFECT_DIRECTION =
          t.LIGHTING_MODE =
          t.LIGHTING_DEVICE_INDEX =
          t.LIGHTING_DEVICE =
          t.KEYBOARD_BACKLIGHT_COLOR_CONTROL =
          t.KEYBOARD_LED_TYPE =
          t.NOTIFICATION_FUNCTION =
          t.DTS_SOUND_MODE =
          t.FAN_MODE =
          t.OVERCLOCKING_MODE =
          t.OPERATING_MODE =
          t.RETURN_CODE =
            void 0),
        (t.CheckingUpdateStatus =
          t.GPUMode =
          t.BACEventId =
          t.ConvertDiskMediaType =
          t.DiskMediaType =
          t.AIZoneData =
          t.BATTERY_CHARGE_MODE =
          t.PersonalSettingsItem =
            void 0);
      const n = r(20);
      var i, o, s, a, c, l, u, d;
      function FN_LIGHTING_DEVICE(e) {
        return e == a.GLOBAL
          ? c.GLOBAL
          : e == a.KEYBOARD
            ? c.INDEX_1
            : e == a.LIGHTBAR || e == a.LIGHTBAR_REAR || e == a.LOGO
              ? c.INDEX_2
              : e;
      }
      !(function (e) {
        (e[(e.SUCCESS = 0)] = "SUCCESS"),
          (e[(e.FAIL_TO_GET_DATA = 1)] = "FAIL_TO_GET_DATA"),
          (e[(e.TIMEOUT = 2)] = "TIMEOUT"),
          (e[(e.WRONG_PARAMETERS = 3)] = "WRONG_PARAMETERS");
      })(t.RETURN_CODE || (t.RETURN_CODE = {})),
        (function (e) {
          (e[(e.QUIET = 0)] = "QUIET"),
            (e[(e.DEFAULT = 1)] = "DEFAULT"),
            (e[(e.EXTREME = 4)] = "EXTREME"),
            (e[(e.TURBO = 5)] = "TURBO"),
            (e[(e.ECO = 6)] = "ECO");
        })((i = t.OPERATING_MODE || (t.OPERATING_MODE = {}))),
        (function (e) {
          (e[(e.Default = 0)] = "Default"),
            (e[(e.Extreme = 1)] = "Extreme"),
            (e[(e.Turbo = 2)] = "Turbo");
        })(t.OVERCLOCKING_MODE || (t.OVERCLOCKING_MODE = {})),
        (function (e) {
          (e[(e.Auto = 0)] = "Auto"),
            (e[(e.Max = 1)] = "Max"),
            (e[(e.Custom = 2)] = "Custom");
        })((o = t.FAN_MODE || (t.FAN_MODE = {}))),
        (function (e) {
          (e[(e.MUSIC = 0)] = "MUSIC"),
            (e[(e.MOVIE = 1)] = "MOVIE"),
            (e[(e.VOICE = 2)] = "VOICE"),
            (e[(e.STRATEGY = 3)] = "STRATEGY"),
            (e[(e.RPG = 4)] = "RPG"),
            (e[(e.SHOOTER = 5)] = "SHOOTER"),
            (e[(e.CUSTOM_AUDIO = 6)] = "CUSTOM_AUDIO"),
            (e[(e.AUTOMATIC = 10)] = "AUTOMATIC");
        })((s = t.DTS_SOUND_MODE || (t.DTS_SOUND_MODE = {}))),
        (function (e) {
          (e[(e.PRESS_TURBO_BUTTON = 0)] = "PRESS_TURBO_BUTTON"),
            (e[(e.ADAPTOR_CHANGED = 1)] = "ADAPTOR_CHANGED"),
            (e[(e.BATTERY_BOOST = 2)] = "BATTERY_BOOST"),
            (e[(e.LIGHTING_DEVICE_CHANGED = 3)] = "LIGHTING_DEVICE_CHANGED"),
            (e[(e.GAMESYNC_CHANGED = 4)] = "GAMESYNC_CHANGED"),
            (e[(e.KEYBOARD_SLIDER_ON = 5)] = "KEYBOARD_SLIDER_ON"),
            (e[(e.KEYBOARD_SLIDER_OFF = 6)] = "KEYBOARD_SLIDER_OFF");
        })(t.NOTIFICATION_FUNCTION || (t.NOTIFICATION_FUNCTION = {})),
        (function (e) {
          (e[(e.PERKEY = 0)] = "PERKEY"),
            (e[(e.ONE_AREA = 1)] = "ONE_AREA"),
            (e[(e.THREE_AREA = 3)] = "THREE_AREA"),
            (e[(e.FOUR_AREA = 4)] = "FOUR_AREA");
        })(t.KEYBOARD_LED_TYPE || (t.KEYBOARD_LED_TYPE = {})),
        (function (e) {
          (e[(e.NOT_SUPPORT = 0)] = "NOT_SUPPORT"),
            (e[(e.SINGLE_COLOR = 1)] = "SINGLE_COLOR"),
            (e[(e.RGB = 2)] = "RGB");
        })(
          t.KEYBOARD_BACKLIGHT_COLOR_CONTROL ||
            (t.KEYBOARD_BACKLIGHT_COLOR_CONTROL = {}),
        ),
        (function (e) {
          (e[(e.GLOBAL = 0)] = "GLOBAL"),
            (e[(e.KEYBOARD = 1)] = "KEYBOARD"),
            (e[(e.LIGHTBAR = 2)] = "LIGHTBAR"),
            (e[(e.LIGHTBAR_REAR = 3)] = "LIGHTBAR_REAR"),
            (e[(e.LOGO = 4)] = "LOGO");
        })((a = t.LIGHTING_DEVICE || (t.LIGHTING_DEVICE = {}))),
        (function (e) {
          (e[(e.GLOBAL = 0)] = "GLOBAL"),
            (e[(e.INDEX_1 = 1)] = "INDEX_1"),
            (e[(e.INDEX_2 = 2)] = "INDEX_2");
        })((c = t.LIGHTING_DEVICE_INDEX || (t.LIGHTING_DEVICE_INDEX = {}))),
        (function (e) {
          (e[(e.GLOBAL = 0)] = "GLOBAL"), (e[(e.AREA = 1)] = "AREA");
        })((l = t.LIGHTING_MODE || (t.LIGHTING_MODE = {}))),
        (function (e) {
          (e[(e.RIGHT = 1)] = "RIGHT"),
            (e[(e.LEFT = 2)] = "LEFT"),
            (e[(e.UP = 3)] = "UP"),
            (e[(e.DOWN = 4)] = "DOWN"),
            (e[(e.CLOCK = 5)] = "CLOCK"),
            (e[(e.ANTICLOCK = 6)] = "ANTICLOCK");
        })((u = t.EFFECT_DIRECTION || (t.EFFECT_DIRECTION = {}))),
        (function (e) {
          (e[(e.LEFT = 0)] = "LEFT"), (e[(e.RIGHT = 1)] = "RIGHT");
        })(t.LIGHTBAR_INDEX || (t.LIGHTBAR_INDEX = {})),
        (function (e) {
          (e[(e.zone1 = 0)] = "zone1"),
            (e[(e.zone2 = 1)] = "zone2"),
            (e[(e.zone3 = 2)] = "zone3"),
            (e[(e.zone4 = 3)] = "zone4");
        })(t.KEYBOARD_ZONE_INDEX || (t.KEYBOARD_ZONE_INDEX = {})),
        (function (e) {
          (e[(e.DEVICE = 0)] = "DEVICE"),
            (e[(e.LIVE_UPDATE = 1)] = "LIVE_UPDATE"),
            (e[(e.ANSWER = 2)] = "ANSWER");
        })(t.ServiceSubPage || (t.ServiceSubPage = {})),
        (function (e) {
          (e[(e.Silent = 0)] = "Silent"),
            (e[(e.Normal = 1)] = "Normal"),
            (e[(e.Performance = 2)] = "Performance"),
            (e[(e.Turbo = 3)] = "Turbo"),
            (e[(e.Eco = 4)] = "Eco"),
            (e[(e["Eco+"] = 6)] = "Eco+"),
            (e[(e.Balanced = 1)] = "Balanced");
        })(t.SYSTEM_USAGE_MODE || (t.SYSTEM_USAGE_MODE = {})),
        (t.FN_LIGHTING_DEVICE = FN_LIGHTING_DEVICE),
        (function (e) {
          (e.Mode = "Mode"),
            (e.Fan = "Fan_Control"),
            (e.Lighting = "Pulsar_Lighting"),
            (e.Monitor = "Monitoring"),
            (e.AdvanceSettings = "Advanced_Settings"),
            (e.ScenarioManager = "Scenario_Manager");
        })(t.SystemTab || (t.SystemTab = {})),
        (function (e) {
          (e.Home = "Home"),
            (e.Scenario = "Scenario"),
            (e.AppCenter = "AppCenter"),
            (e.App_Settings = "SETTINGS"),
            (e.Support = "Account_and_Support"),
            (e.CN_Support = "Support"),
            (e.Answer = "Answer"),
            (e.LiveUpdate = "LiveUpdate"),
            (e.WebsocketTestPage = "WebsocketTestpage"),
            (e.Checkup = "Checkup"),
            (e.SystemInfo = "SystemInfo"),
            (e.PersonalSettings = "PersonalSettings"),
            (e.AdvancedCleanup = "AdvancedCleanup"),
            (e.AcerAccount = "AcerAccount"),
            (e.HighlightFeature = "HighlightFeature");
        })(t.MainTab || (t.MainTab = {})),
        (function (e) {
          (e[(e.EC_CONTROL = 1)] = "EC_CONTROL"),
            (e[(e.USB_CONTROL = 2)] = "USB_CONTROL"),
            (e[(e.NON_SUPPORT = 255)] = "NON_SUPPORT");
        })(t.LIGHTBAR_TYPE || (t.LIGHTBAR_TYPE = {})),
        (function (e) {
          (e[(e.None = 0)] = "None"),
            (e[(e.PerLed = 1)] = "PerLed"),
            (e[(e.ModeSpecific = 2)] = "ModeSpecific"),
            (e[(e.Random = 3)] = "Random");
        })(t.COLOR_MODE || (t.COLOR_MODE = {})),
        (function (e) {
          (e[(e.ENUS = 0)] = "ENUS"),
            (e[(e.ENUK = 1)] = "ENUK"),
            (e[(e.JAJA = 2)] = "JAJA");
        })(t.KEYBOARD_LANGUAGE || (t.KEYBOARD_LANGUAGE = {})),
        (function (e) {
          (e[(e.MOTHERBOARD = 0)] = "MOTHERBOARD"),
            (e[(e.DRAM = 1)] = "DRAM"),
            (e[(e.GPU = 2)] = "GPU"),
            (e[(e.COOLER = 3)] = "COOLER"),
            (e[(e.LED_STRIP = 4)] = "LED_STRIP"),
            (e[(e.KEYBOARD = 5)] = "KEYBOARD"),
            (e[(e.MOUSE = 6)] = "MOUSE"),
            (e[(e.MOUSEMAT = 8)] = "MOUSEMAT"),
            (e[(e.HEADSET = 9)] = "HEADSET"),
            (e[(e.HEADSTAND = 10)] = "HEADSTAND"),
            (e[(e.LIGHTBAR = 11)] = "LIGHTBAR");
        })(t.DEVICE_TYPE || (t.DEVICE_TYPE = {})),
        (function (e) {
          (e[(e.STATIC = 0)] = "STATIC"),
            (e[(e.BREATHING = 1)] = "BREATHING"),
            (e[(e.WAVE = 2)] = "WAVE"),
            (e[(e.SNAKE = 3)] = "SNAKE"),
            (e[(e.RIPPLE = 4)] = "RIPPLE"),
            (e[(e.NEON = 5)] = "NEON"),
            (e[(e.RAIN_DROP = 6)] = "RAIN_DROP"),
            (e[(e.LIGHTNING = 7)] = "LIGHTNING"),
            (e[(e.SPOT = 8)] = "SPOT"),
            (e[(e.STAR = 9)] = "STAR"),
            (e[(e.FIREBALL = 10)] = "FIREBALL"),
            (e[(e.SNOW = 11)] = "SNOW"),
            (e[(e.HEARTBEAT = 12)] = "HEARTBEAT"),
            (e[(e.SHIFTING = 13)] = "SHIFTING"),
            (e[(e.ZOOM = 14)] = "ZOOM"),
            (e[(e.METEOR = 15)] = "METEOR"),
            (e[(e.TWINKLING = 16)] = "TWINKLING"),
            (e[(e.MUSIC = 17)] = "MUSIC"),
            (e[(e.SCREEN = 18)] = "SCREEN");
        })(t.SupportedEffect || (t.SupportedEffect = {})),
        (function (e) {
          (e[(e.sunrex_Stop = 0)] = "sunrex_Stop"),
            (e[(e.sunrex_Wave = 1)] = "sunrex_Wave"),
            (e[(e.sunrex_Neon = 2)] = "sunrex_Neon"),
            (e[(e.sunrex_Rock = 3)] = "sunrex_Rock"),
            (e[(e.sunrex_Lightning = 4)] = "sunrex_Lightning"),
            (e[(e.sunrex_Xlight = 5)] = "sunrex_Xlight"),
            (e[(e.sunrex_Rain = 6)] = "sunrex_Rain"),
            (e[(e.sunrex_Digital = 7)] = "sunrex_Digital"),
            (e[(e.sunrex_Spectrum = 8)] = "sunrex_Spectrum"),
            (e[(e.sunrex_ScreenSync = 9)] = "sunrex_ScreenSync");
        })(t.INTERACTIVE_EFFECT || (t.INTERACTIVE_EFFECT = {})),
        (function (e) {
          (e.Helios_16_Discovery_RTX = "Predator PH16-71"),
            (e.Helios_18_EQS_RTX = "Predator PH18-71"),
            (e.Helios_GLA_RTX = "Predator PH3D15-71");
        })(t.LIGHTBAR_DEVICE || (t.LIGHTBAR_DEVICE = {})),
        (function (e) {
          (e.Helios = "Helios"), (e.Triton = "Triton");
        })(t.KEYBOARD_DEVICE || (t.KEYBOARD_DEVICE = {})),
        (t.DEFAULT_LIGHTING_EFFECT = {
          device: a.GLOBAL,
          effect: "WAVE",
          speed: 3,
          duration: 3,
          direction: u.RIGHT,
          brightness: 5,
          color: "#ffa000",
          random: !0,
          LEDs: [],
          dyEffect: "WAVE",
          sunrex_effect: 1,
        }),
        (t.DEFAULT_LIGHTING_KEYBOARD = {
          device: a.KEYBOARD,
          effect: "STATIC",
          speed: 5,
          duration: 5,
          direction: u.RIGHT,
          brightness: 5,
          color: "#ffa000",
          random: !0,
          LEDs: n.DEFAULT_KEYBOARD_LEDs,
          dyEffect: "WAVE",
          sunrex_effect: 1,
        }),
        (t.DEFAULT_LIGHTING_BAR = {
          device: a.LIGHTBAR,
          effect: "STATIC",
          speed: 3,
          duration: 3,
          direction: u.RIGHT,
          brightness: 5,
          color: "#ffa000",
          random: !0,
          LEDs: n.DEFAULT_LIGHTBAR_LEDs,
          dyEffect: "WAVE",
        }),
        (t.DEFAULT_LIGHTING_BAR_REAR = {
          device: FN_LIGHTING_DEVICE(a.LIGHTBAR_REAR),
          effect: "STATIC",
          speed: 3,
          duration: 3,
          direction: u.RIGHT,
          brightness: 5,
          color: "#ffa000",
          random: !0,
          LEDs: n.DEFAULT_LIGHTBAR_3LEDs,
          dyEffect: "WAVE",
        }),
        (t.DEFAULT_LIGHTING_LOGO = {
          device: FN_LIGHTING_DEVICE(a.LOGO),
          effect: "STATIC",
          speed: 3,
          duration: 3,
          direction: u.RIGHT,
          brightness: 5,
          color: "#ffa000",
          random: !0,
          dyEffect: "WAVE",
        }),
        (t.DEFAULT_SCENARIO = {
          name: "",
          appNames: [],
          enabled: !0,
          opMode: i.DEFAULT,
          dcMode: i.DEFAULT,
          LastOpMode: i.DEFAULT,
          fanControl: {
            mode: o.Auto,
            custom_fan_data: [
              {
                fan_custom_auto: 1,
                fan_custom_speed: 30,
                fan_index: 0,
                fan_name: "CPU",
              },
              {
                fan_custom_auto: 1,
                fan_custom_speed: 30,
                fan_index: 0,
                fan_name: "GPU",
              },
              {
                fan_custom_auto: 1,
                fan_custom_speed: 30,
                fan_index: 1,
                fan_name: "GPU2",
              },
            ],
          },
          audioMode: s.MUSIC,
          lighting: {
            mode: l.GLOBAL,
            GlobalEffect: t.DEFAULT_LIGHTING_EFFECT,
            Keyboard: t.DEFAULT_LIGHTING_KEYBOARD,
            Lightbar: t.DEFAULT_LIGHTING_BAR,
            tempBrightness: void 0,
          },
          EnableEco: !1,
        }),
        (function (e) {
          (e.LIGHTING = "LIGHTING"),
            (e.LIGHTING_MODE = "LIGHTING_MODE"),
            (e.FAN_CONTROL = "FAN_CONTROL"),
            (e.OPERATING_MODE = "OPERATING_MODE"),
            (e.OVERCLOCKING_MODE = "OVERCLOCKING_MODE"),
            (e.AC_STATUS = "AC_STATUS"),
            (e.TURBO_BUTTON_STATUS = "TURBO_BUTTON_STATUS"),
            (e.SOUND_MODE = "SOUND_MODE"),
            (e.STICKY_KEY = "STICKY_KEY"),
            (e.WIN_KEY = "WIN_KEY"),
            (e.LCD_OVERDRIVE = "LCD_OVERDRIVE"),
            (e.BOOT_SOUND = "BOOT_SOUND"),
            (e.SUPPORT_OPERATING_MODE = "SUPPORT_OPERATING_MODE"),
            (e.SUPPORT_AUDIO_MODE = "SUPPORT_AUDIO_MODE"),
            (e.SUPPORT_CPU_INFO = "SUPPORT_CPU_INFO"),
            (e.SUPPORT_GPU_INFO = "SUPPORT_GPU_INFO"),
            (e.BACKLIGHT_30S = "BACKLIGHT_30S"),
            (e.GPU_MODE = "GPU_MODE"),
            (e.CUSTOM_BOOT_LOGO = "CUSTOM_BOOT_LOGO"),
            (e.BATTERY_BOOST = "BATTERY_BOOST"),
            (e.ADAPTOR_STATUS = "ADAPTOR_STATUS");
        })(t.UPDATED_DATA || (t.UPDATED_DATA = {})),
        (function (e) {
          (e.CPU = "CPU"), (e.GPU = "GPU"), (e.GPU2 = "GPU2");
        })(t.FanName || (t.FanName = {})),
        (function (e) {
          (e.Unsupport = "Unsupport"),
            (e.Full = "Full"),
            (e.Partial = "Partial");
        })(t.DisplayPort || (t.DisplayPort = {})),
        (function (e) {
          (e.system_page = "systemPageTutorial"),
            (e.area_page = "areaPageTutorial"),
            (e.profile_manager = "profileManagerTutorial"),
            (e.appcenter = "firstAppcenter"),
            (e.landing = "landingTutorial"),
            (e.mode_switch_key = "modeSwitchKeyTutorial"),
            (e.privacy_policy = "needShowPrivacyPolicy");
        })(t.TUTORIO_SHOW || (t.TUTORIO_SHOW = {})),
        (function (e) {
          (e[(e.temperture = 0)] = "temperture"),
            (e[(e.usage = 1)] = "usage"),
            (e[(e.other = 2)] = "other");
        })(t.GPU_DATA_TYPE || (t.GPU_DATA_TYPE = {})),
        (function (e) {
          (e[(e.Fahrenheit = 0)] = "Fahrenheit"),
            (e[(e.Celsius = 1)] = "Celsius");
        })(t.TEMPERATURE_UNIT || (t.TEMPERATURE_UNIT = {})),
        (function (e) {
          (e[(e.CREATE = 0)] = "CREATE"),
            (e[(e.EDIT = 1)] = "EDIT"),
            (e[(e.DUPLICATE = 2)] = "DUPLICATE"),
            (e[(e.REMOVE = 3)] = "REMOVE"),
            (e[(e.RESTORE = 4)] = "RESTORE");
        })(t.SCENARIO_EDIT || (t.SCENARIO_EDIT = {})),
        (function (e) {
          (e.device_registed = "device_registed"),
            (e.device_not_registed = "device_not_registed"),
            (e.critical_update = "critical_update");
        })(t.PushMsgCategory || (t.PushMsgCategory = {})),
        (function (e) {
          (e.CriticalNeedInstalled = "Critical_Need_Installed"),
            (e.RegisterDevice = "Register_Device");
        })(t.PushMsg || (t.PushMsg = {})),
        (t.AC_hasAnyAC = function AC_hasAnyAC(e) {
          return 0 != (1 & e) || 0 != (2 & e);
        }),
        (t.AC_hasAnyPD = function AC_hasAnyPD(e) {
          return 0 != (4 & e) || 0 != (8 & e);
        }),
        (function (e) {
          (e.Aspire_A3D15_71GM = "Aspire A3D15-71GM"),
            (e.Aspire_AX3D15_71GM = "Aspire AX3D15-71GM");
        })((d = t.SPATIALLABS_DEVICE || (t.SPATIALLABS_DEVICE = {}))),
        (t.EnableSpatialLabs = function EnableSpatialLabs(e) {
          return e == d.Aspire_A3D15_71GM || e == d.Aspire_AX3D15_71GM;
        }),
        (function (e) {
          (e.computer = "computer"),
            (e.baseboard = "baseboard"),
            (e.systemid = "systemid"),
            (e.bios = "bios"),
            (e.os = "os"),
            (e.processor = "processor"),
            (e.memory = "memory"),
            (e.storage = "storage"),
            (e.graphics = "graphics"),
            (e.audio = "audio"),
            (e.networkadapter = "networkadapter"),
            (e.battery = "battery"),
            (e.device = "device");
        })(t.DeviceInfoCategory || (t.DeviceInfoCategory = {})),
        (function (e) {
          (e.FunctionQuery = "FunctionQuery"),
            (e.USBChargeSwitch = "USBChargeSwitch"),
            (e.USBCharge = "USBCharge"),
            (e.CoolBoost = "CoolBoost"),
            (e.DustDefender = "DustDefender"),
            (e.SIMControl = "SIMControl"),
            (e.BluelightShield = "BluelightShield"),
            (e.SystemUsageControl = "SystemUsageControl"),
            (e.SystemUsageModes = "SystemUsageModes"),
            (e.AdaptiveBrightness = "AdaptiveBrightness"),
            (e.DarkMode = "DarkMode"),
            (e.TransparentEffect = "TransparentEffect"),
            (e.AutoHideTaskbar = "AutoHideTaskbar"),
            (e.ScreenSaver = "ScreenSaver"),
            (e.ScreenSaverTimeout = "ScreenSaverTimeout"),
            (e.HighlightFeature = "HighlightFeature"),
            (e.Features = "Features"),
            (e.SystemUsageOSD = "SystemUsageOSD"),
            (e.SenseAppStatus = "SenseAppStatus"),
            (e.VeroEcoPlusUSBCharge = "VeroEcoPlusUSBCharge"),
            (e.VeroModeQuery = "VeroModeQuery"),
            (e.DisplayModeCapability = "DisplayModeCapability"),
            (e.DisplayModeSwitch = "DisplayModeSwitch"),
            (e.ColorProfileSwitch = "ColorProfileSwitch"),
            (e.ColorProfileActive = "ColorProfileActive");
        })(t.QuickAccessWS || (t.QuickAccessWS = {})),
        (function (e) {
          (e.SystemInfo = "SystemInfo"),
            (e.SMBIOS = "SMBIOS"),
            (e.DeviceManager = "DeviceManager"),
            (e.MotherBoard = "MotherBoard"),
            (e.OS = "OS"),
            (e.Storage = "Storage"),
            (e.StorageVolumes = "StorageVolumes"),
            (e.Network = "Network");
        })(t.DeviceInfoWS || (t.DeviceInfoWS = {})),
        (function (e) {
          (e.CheckBattery = "CheckBattery"),
            (e.CheckStorage = "CheckStorage"),
            (e.CheckMemory = "CheckMemory"),
            (e.QuickCleanup = "QuickCleanup"),
            (e.BatteryStatus = "BatteryStatus"),
            (e.BatteryHealthy = "BatteryHealthy"),
            (e.BatteryCalibration = "BatteryCalibration"),
            (e.CleanDisk = "CleanDisk"),
            (e.BatteryAdaptiveCharging = "BatteryAdaptiveCharging"),
            (e.BatteryBoost = "BatteryBoost");
        })(t.CareCenterWS || (t.CareCenterWS = {})),
        (function (e) {
          (e.SystemUsageMode = "SystemUsageMode"),
            (e.BatteryCharge = "Battery_&_Charge"),
            (e.Screen = "Screen"),
            (e.Keyboard = "Keyboard"),
            (e.SystemBootEffect = "SystemBootEffect"),
            (e.CellularData = "CellularData"),
            (e.AcerDustDefender = "AcerDustDefender"),
            (e.GPUOperating = "GPUOperating"),
            (e.ColorProfile = "ColorProfile"),
            (e.TouchPad = "TouchPad");
        })(t.PersonalSettingsItem || (t.PersonalSettingsItem = {})),
        (function (e) {
          (e[(e.OptimizedBatteryCharging = 0)] = "OptimizedBatteryCharging"),
            (e[(e.FullBatteryCharging = 1)] = "FullBatteryCharging"),
            (e[(e.AISmartCharging = 2)] = "AISmartCharging");
        })(t.BATTERY_CHARGE_MODE || (t.BATTERY_CHARGE_MODE = {})),
        (function (e) {
          (e.None = "None"),
            (e.AIZoneIndex = "AIZoneIndex"),
            (e.LiveArt = "LiveArt"),
            (e.AlterView = "AlterView"),
            (e.GIMP = "GIMP"),
            (e.AcerPurifiedView = "PurifiedView"),
            (e.AcerPurifiedVoice = "PurifiedVoice"),
            (e.AcerOLED = "OLED"),
            (e.AISmartCharging = "AISmartCharging"),
            (e.MediaTouchPad = "MediaTouchPad");
        })(t.AIZoneData || (t.AIZoneData = {})),
        (function (e) {
          (e[(e.UnknownMediaType = 0)] = "UnknownMediaType"),
            (e[(e.HDD = 3)] = "HDD"),
            (e[(e.SSD = 4)] = "SSD"),
            (e[(e.SCM = 5)] = "SCM"),
            (e[(e.NVME = 6)] = "NVME"),
            (e[(e.EMMC = 7)] = "EMMC"),
            (e[(e.UFS = 8)] = "UFS"),
            (e[(e.OPTANE = 9)] = "OPTANE"),
            (e[(e.OPTANE_SSD = 10)] = "OPTANE_SSD");
        })(t.DiskMediaType || (t.DiskMediaType = {})),
        (function (e) {
          (e.UnknownMediaType = "UNKNOWN"),
            (e.HDD = "HDD"),
            (e.SSD = "SSD"),
            (e.SCM = "SSD"),
            (e.NVME = "SSD"),
            (e.EMMC = "EMMC"),
            (e.UFS = "HDD"),
            (e.OPTANE = "HDD"),
            (e.OPTANE_SSD = "SSD");
        })(t.ConvertDiskMediaType || (t.ConvertDiskMediaType = {})),
        (function (e) {
          (e[(e.UnknownEvent = 0)] = "UnknownEvent"),
            (e[(e.Stop = 1)] = "Stop"),
            (e[(e.Start = 2)] = "Start"),
            (e[(e.Terminate = 3)] = "Terminate"),
            (e[(e.UpdateData = 4)] = "UpdateData");
        })(t.BACEventId || (t.BACEventId = {})),
        (function (e) {
          (e[(e.NotSuport = 255)] = "NotSuport"),
            (e[(e.MUI_Discrete_GPU_Optimus = 1)] = "MUI_Discrete_GPU_Optimus"),
            (e[(e.MUI_Discrete_GPU = 2)] = "MUI_Discrete_GPU"),
            (e[(e.MUI_Discrete_GPU_Automatic_Select = 3)] =
              "MUI_Discrete_GPU_Automatic_Select");
        })(t.GPUMode || (t.GPUMode = {})),
        (function (e) {
          (e[(e.Checking = 0)] = "Checking"),
            (e[(e.HasNewerVersion = 1)] = "HasNewerVersion"),
            (e[(e.NoNewerVersion = 2)] = "NoNewerVersion");
        })(t.CheckingUpdateStatus || (t.CheckingUpdateStatus = {}));
    },
    function (e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0,
      }),
        (t.AdapterBase = void 0);
      const n = r(12),
        i = r(14),
        o = r(13);
      t.AdapterBase = class AdapterBase {
        constructor() {
          (this.connect = new n.BehaviorSubject(!1)),
            (this.powerResume = new o.EventEmitter()),
            (this.connected = !1);
        }
        getServiceVersion() {
          throw (
            ((0, i.getLogger)().debug(
              "[PA] getServiceVersion - Method not implemented.",
            ),
            new Error("Method not implemented."))
          );
        }
        getMonitorData() {
          throw (
            ((0, i.getLogger)().debug(
              "[PA] getMonitorData - Method not implemented.",
            ),
            new Error("Method not implemented."))
          );
        }
        getSupportSystemCapability() {
          throw (
            ((0, i.getLogger)().debug(
              "[PA] getSupportSystemCapability - Method not implemented.",
            ),
            new Error("Method not implemented."))
          );
        }
      };
    },
    function (e, t) {
      e.exports = require("@nodert-win10-rs4/windows.devices.enumeration");
    },
    function (e, t, r) {
      "use strict";
      var n =
        (this && this.__awaiter) ||
        function (e, t, r, n) {
          return new (r || (r = Promise))(function (i, o) {
            function fulfilled(e) {
              try {
                step(n.next(e));
              } catch (e) {
                o(e);
              }
            }
            function rejected(e) {
              try {
                step(n.throw(e));
              } catch (e) {
                o(e);
              }
            }
            function step(e) {
              e.done
                ? i(e.value)
                : (function adopt(e) {
                    return e instanceof r
                      ? e
                      : new r(function (t) {
                          t(e);
                        });
                  })(e.value).then(fulfilled, rejected);
            }
            step((n = n.apply(e, t || [])).next());
          });
        };
      Object.defineProperty(t, "__esModule", {
        value: !0,
      }),
        (t.PSSdk = void 0);
      const i = r(8),
        o = r(3),
        s = r(1),
        a = r(24),
        c = r(6),
        l = r(16),
        u = r(9);
      class PSSdk {
        constructor() {
          (this.adapter = (0, a.getAdapter)()),
            (this.pumpData = !1),
            (this.isGettingMonitorData = !1),
            (this.isGetBatteryStatus = !1),
            (this.bEnableWhisper = !1),
            (this.bAppAcitveWhisper = !1),
            (this.store = c.Store.getInstance());
        }
        static getInstance() {
          return (
            PSSdk.instance || (PSSdk.instance = new PSSdk()), PSSdk.instance
          );
        }
        enablePumpData(e) {
          (this.pumpData = e),
            clearInterval(this.timerId),
            (this.timerId = null),
            e &&
              ((this.timerId = setInterval(
                () =>
                  n(this, void 0, void 0, function* () {
                    this.pumpMonitorData();
                  }),
                5e3,
              )),
              this.pumpMonitorData()),
            o.LogIt.getInstance().info(
              `Moniter service timer, set:${e},${this.timerId}`,
            );
        }
        broadcast(e, ...t) {}
        getWhisperMode() {
          return (
            o.LogIt.getInstance().info(
              "getWhisperMode: " + JSON.stringify(this.whisperInfo),
            ),
            this.whisperInfo.enable && this.whisperInfo.support
          );
        }
        setWhisperMode(e, t) {
          (this.bEnableWhisper = e),
            t || (this.bAppAcitveWhisper = !0),
            clearInterval(this.tmWhisper),
            o.LogIt.getInstance().info("setWhisperMode: " + e);
          const r = s.setWhisperMode(e);
          o.LogIt.getInstance().info("return from setWhisperMode: " + r);
        }
        pumpMonitorData() {
          return n(this, void 0, void 0, function* () {
            if (
              this.pumpData &&
              !this.isGettingMonitorData &&
              this.adapter.connected
            ) {
              this.isGettingMonitorData = !0;
              const e = yield this.adapter.getMonitorData().then((e) => {
                const t = e;
                for (var r = 0; r < t.CPU_CORE_AMOUNT; r++)
                  t.CPU_CORE_FREQUENCY[r] = Math.ceil(t.CPU_CORE_FREQUENCY[r]);
                return (
                  (t.CPU_FREQUENCY = Math.ceil(t.CPU_FREQUENCY)),
                  (t.CPU_USAGE = Math.ceil(100 * t.CPU_USAGE) / 100),
                  (t.RAM_TOTAL = Math.ceil(t.RAM_TOTAL)),
                  (t.RAM_USAGE = Math.ceil(100 * t.RAM_USAGE) / 100),
                  (t.WIFI_DOWNLOAD = Math.ceil(t.WIFI_DOWNLOAD)),
                  (t.WIFI_UPLOAD = Math.ceil(t.WIFI_UPLOAD)),
                  t
                );
              });
              (this.isGettingMonitorData = !1),
                i.MqttFunctionCall.getInstance().broadcast(
                  "UPDATE_MONITOR_DATA",
                  e,
                );
            }
          });
        }
        getServiceVersion() {
          o.LogIt.getInstance().debug("[PA] getVersion");
          const e = this.adapter.getServiceVersion();
          return (l.Util.getInstance().ServiceVer = e), e;
        }
        ServiceResume() {
          this.adapter.powerResume.on("resume", () => {
            o.LogIt.getInstance().info("[PSS]Power Resume"),
              u.Info.getInstance().setIsResumed(!0);
          });
        }
      }
      t.PSSdk = PSSdk;
    },
    function (e, t, r) {
      "use strict";
      var n =
        (this && this.__awaiter) ||
        function (e, t, r, n) {
          return new (r || (r = Promise))(function (i, o) {
            function fulfilled(e) {
              try {
                step(n.next(e));
              } catch (e) {
                o(e);
              }
            }
            function rejected(e) {
              try {
                step(n.throw(e));
              } catch (e) {
                o(e);
              }
            }
            function step(e) {
              e.done
                ? i(e.value)
                : (function adopt(e) {
                    return e instanceof r
                      ? e
                      : new r(function (t) {
                          t(e);
                        });
                  })(e.value).then(fulfilled, rejected);
            }
            step((n = n.apply(e, t || [])).next());
          });
        };
      Object.defineProperty(t, "__esModule", {
        value: !0,
      }),
        (t.WinStore = void 0);
      const i = r(0),
        o = r(3),
        s = r(4),
        a = r(54);
      var c;
      !(function (e) {
        (e[(e.Checking = 0)] = "Checking"),
          (e[(e.HasNewerVersion = 1)] = "HasNewerVersion"),
          (e[(e.NoNewerVersion = 2)] = "NoNewerVersion");
      })(c || (c = {}));
      class WinStore {
        constructor() {
          (this.hasStoreNewerVersion = c.Checking),
            (this.mainWindow = null),
            this.checkNewStoreVersion();
        }
        static getInstance() {
          return (
            WinStore.instance || (WinStore.instance = new WinStore()),
            WinStore.instance
          );
        }
        setMainWindow(e) {
          this.mainWindow = e;
        }
        getNewerUpdates(e) {
          return (
            e && this.checkNewStoreVersion(),
            this.hasStoreNewerVersion != c.Checking
              ? (o.LogIt.getInstance().info(
                  "getNewerUpdates hasStoreNewerVersion: " +
                    this.hasStoreNewerVersion,
                ),
                this.hasStoreNewerVersion == c.HasNewerVersion)
              : new Promise((e, t) => {
                  this.newUpdateResolved = e;
                })
          );
        }
        getHasStoreNewerVersionStatus() {
          return this.hasStoreNewerVersion;
        }
        checkNewStoreVersion() {
          return n(this, void 0, void 0, function* () {
            this.hasStoreNewerVersion = c.Checking;
            var e = a.StoreContext.getDefault();
            o.LogIt.getInstance().info(
              "Current Version: " + i.app.getVersion(),
            ),
              o.LogIt.getInstance().info("checkNewStoreVersion......."),
              e.getAppAndOptionalStorePackageUpdatesAsync((e, t) => {
                const r = t;
                o.LogIt.getInstance().info(JSON.stringify(e)),
                  o.LogIt.getInstance().info(JSON.stringify(t)),
                  (null == r ? void 0 : r.size) > 0
                    ? (this.hasStoreNewerVersion = c.HasNewerVersion)
                    : (this.hasStoreNewerVersion = c.NoNewerVersion),
                  this.newUpdateResolved &&
                    this.newUpdateResolved((null == r ? void 0 : r.size) > 0),
                  (this.newUpdateResolved = null),
                  o.LogIt.getInstance().info(
                    "hasStoreNewerVersion = " + this.hasStoreNewerVersion,
                  );
              });
          });
        }
        isPurchaseEnabled() {
          return s.EnvConfig.getInstance().purchaseEnabled;
        }
        checkProductStatus(e) {
          return new Promise((t, r) => {
            a.StoreContext.getDefault().getStoreProductsAsync(
              ["Durable"],
              e,
              (e, n) => {
                if (e) r(e);
                else {
                  for (var i = n.products.first(), o = {}; i.hasCurrent; ) {
                    var s = i.current;
                    i.moveNext();
                    const e = s.value,
                      t = {};
                    (t.description = e.description),
                      (t.extendedJsonData = JSON.parse(e.extendedJsonData)),
                      (t.hasDigitalDownload = e.hasDigitalDownload),
                      (t.inAppOfferToken = e.inAppOfferToken),
                      (t.isInUserCollection = e.isInUserCollection),
                      (t.productKind = e.productKind),
                      (t.storeId = e.storeId),
                      (t.title = e.title);
                    const r = {},
                      n = e.price;
                    (t.price = r),
                      (r.currencyCode = n.currencyCode),
                      (r.formattedBasePrice = n.formattedBasePrice),
                      (r.formattedPrice = n.formattedPrice),
                      (r.isOnSale = n.isOnSale),
                      (r.saleEndDate = n.saleEndDate),
                      (o[s.key] = t);
                  }
                  t(o);
                }
              },
            );
          });
        }
        requestPurchaseAsync(e) {
          return new Promise((t, r) => {
            var n = a.StoreContext.getDefault();
            const i = this.mainWindow.getNativeWindowHandle().readUInt32LE(0);
            n.requestPurchaseAsync2(i, e, (e, n) => {
              e ? r(e) : (console.log(n), t(n));
            });
          });
        }
      }
      t.WinStore = WinStore;
    },
    function (e, t, r) {
      e.exports = r(32);
    },
    function (e, t, r) {
      "use strict";
      var n =
        (this && this.__awaiter) ||
        function (e, t, r, n) {
          return new (r || (r = Promise))(function (i, o) {
            function fulfilled(e) {
              try {
                step(n.next(e));
              } catch (e) {
                o(e);
              }
            }
            function rejected(e) {
              try {
                step(n.throw(e));
              } catch (e) {
                o(e);
              }
            }
            function step(e) {
              e.done
                ? i(e.value)
                : (function adopt(e) {
                    return e instanceof r
                      ? e
                      : new r(function (t) {
                          t(e);
                        });
                  })(e.value).then(fulfilled, rejected);
            }
            step((n = n.apply(e, t || [])).next());
          });
        };
      Object.defineProperty(t, "__esModule", {
        value: !0,
      });
      const i = r(0),
        o = new (r(33).MainApp)();
      i.app.commandLine.appendSwitch("remote-debugging-port", "9993"),
        i.app.commandLine.appendSwitch("no-sandbox"),
        i.app.commandLine.appendSwitch("ignore-certificate-errors"),
        (process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"),
        (function main() {
          return n(this, void 0, void 0, function* () {
            (yield o.init()) || i.app.quit();
          });
        })();
    },
    function (e, t, r) {
      "use strict";
      var n =
        (this && this.__awaiter) ||
        function (e, t, r, n) {
          return new (r || (r = Promise))(function (i, o) {
            function fulfilled(e) {
              try {
                step(n.next(e));
              } catch (e) {
                o(e);
              }
            }
            function rejected(e) {
              try {
                step(n.throw(e));
              } catch (e) {
                o(e);
              }
            }
            function step(e) {
              e.done
                ? i(e.value)
                : (function adopt(e) {
                    return e instanceof r
                      ? e
                      : new r(function (t) {
                          t(e);
                        });
                  })(e.value).then(fulfilled, rejected);
            }
            step((n = n.apply(e, t || [])).next());
          });
        };
      Object.defineProperty(t, "__esModule", {
        value: !0,
      }),
        (t.MainApp = void 0);
      const i = r(4),
        o = r(37),
        s = r(0),
        a = r(2),
        c = r(3),
        l = r(38),
        u = r(18),
        d = r(9),
        g = r(16),
        p = r(58),
        h = r(5),
        f = r(1),
        m = r(0),
        S = r(6),
        E = r(8),
        b = r(17),
        A = r(59),
        I = r(25),
        y = r(7),
        v = r(65),
        D = r(0),
        w = r(29),
        L = r(71),
        T = r(72),
        C = r(78);
      var _ = r(79);
      const O = r(0),
        P = r(11),
        R = r(10),
        N = r(14),
        k = r(30),
        q = r(21);
      var M, B;
      !(function (e) {
        (e.minimize = "minimize"),
          (e.restore = "restore"),
          (e.resized = "resized"),
          (e.maximize = "maximize"),
          (e.unmaximize = "unmaximize"),
          (e.moved = "moved"),
          (e.close = "close");
      })(M || (M = {})),
        (function (e) {
          (e.open = "open"), (e.close = "close");
        })(B || (B = {}));
      t.MainApp = class MainApp {
        constructor() {
          (this.fps = -1),
            (this.model = 0),
            (this.bCapture = !0),
            (this.devMode = process.argv.slice(1).some((e) => "--dev" === e)),
            (this.disableAutoQuit = !1),
            (this.port = 15150),
            (this.hideWhenReady = f.isMutextExists(
              "AcerSenseLauncher_HideWhenReady",
            )),
            (this.showWhenReady = !!this.devMode || !this.hideWhenReady),
            (this.calledReadyShow = !1),
            (this.isAppLaunch = !1),
            (this.oldWinEvent = ""),
            (this.verosku = !1),
            (this.mqttFunctionCall = null),
            (this.AppShowTm = -1),
            (this.AppLaunchCount = 0);
        }
        App_LaunchRecord(e) {
          if (e == B.open)
            -1 == this.AppShowTm && (this.AppShowTm = Date.now()),
              this.AppLaunchCount++,
              this.mainWin &&
                this.mainWin.webContents.send(
                  "DESKTOP_MSG",
                  "AppOpenCount",
                  this.AppLaunchCount,
                );
          else if (e == B.close) {
            let e = Date.now() - this.AppShowTm;
            if (e > 0) {
              let t = (e / 1e3).toFixed(0);
              console.log(t),
                this.mainWin &&
                  this.mainWin.webContents.send(
                    "DESKTOP_MSG",
                    "AppOpenDuration",
                    t,
                  );
            }
            this.AppShowTm = -1;
          }
        }
        checkVeroSku() {
          return n(this, void 0, void 0, function* () {
            this.info.getSystemFamily();
            const e = this.info.getSystemProductName();
            return (
              (e.includes("AV") && e.includes("Aspire")) ||
              (e.includes("TMV") && e.includes("TravelMate"))
                ? (this.verosku = !0)
                : (this.verosku = !1),
              c.LogIt.getInstance().info(
                `[Main] ${e} CheckVeroSku is :  ${this.verosku}`,
              ),
              this.verosku
            );
          });
        }
        checkUpdateStatus(e) {
          if (f.getRegistryValue(2, "SOFTWARE\\Acer\\AcerSense", "Guid") == e) {
            c.LogIt.getInstance().info(
              "MSI version does not update yet, wait a second and try again. ",
            );
            const e = Date.now();
            for (; Date.now() - e <= 1e3; );
            return !1;
          }
          return !0;
        }
        checkMSIVersion() {
          return n(this, void 0, void 0, function* () {
            let e = !0,
              t = "0.0.0.0";
            const r = f.getRegistryValue(
              2,
              "SOFTWARE\\Acer\\AcerSense",
              "Guid",
            );
            "" !== r &&
              (t = f.getRegistryValue(
                2,
                "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\" + r,
                "DisplayVersion",
              ));
            const n = this.info.getAppVersion();
            if (
              (c.LogIt.getInstance().info("Installed version = " + t),
              c.LogIt.getInstance().info("Current running version: " + n),
              _.compare(t, n, "<"))
            ) {
              c.LogIt.getInstance().info(
                "Need to install AcerSenseConfig.msi...",
              ),
                f.messageBox(
                  'To complete the setup process, please select "Yes" when the User Account Control notification appears.',
                  "AcerSense",
                );
              try {
                const t = process.execPath,
                  i = a.join(a.dirname(t), "resources/elevate.exe"),
                  o = a.join(a.dirname(t), "win32/AcerSenseConfig.msi"),
                  s = `${process.env.TEMP}\\elevate-${n}.exe`,
                  l = `${process.env.TEMP}\\AcerSenseConfig-${n}.msi`,
                  u = `${process.env.TEMP}\\AcerSenseConfig-${n}.log`,
                  d = `copy /Y "${i}" "${s}"`;
                c.LogIt.getInstance().info(d), R.execSync(d);
                const g = `copy /Y "${o}" "${l}"`;
                c.LogIt.getInstance().info(g), R.execSync(g);
                const p = `"${s}" "msiexec.exe" /i "${l}" /q /L*V "${u}"`;
                c.LogIt.getInstance().info(p),
                  R.execSync(p),
                  c.LogIt.getInstance().info(
                    "Start to check MSI update status",
                  );
                for (let t = 0; t < 30; t++)
                  if (((e = this.checkUpdateStatus(r)), e)) {
                    c.LogIt.getInstance().info("MSI updated successfully!");
                    break;
                  }
              } catch (t) {
                c.LogIt.getInstance().error(t), (e = !1);
              }
            }
            return e;
          });
        }
        init() {
          return n(this, void 0, void 0, function* () {
            if (!s.app.requestSingleInstanceLock()) return !1;
            if (
              (s.app.on("second-instance", (e, t, r) => {
                if (t.slice(-1)[0].includes("xsense:")) {
                  var n = t.slice(-1)[0].replace("xsense:", "");
                  "?" == n[0] && (n = n.slice(1));
                  const e = "XSense Protocol Parameter: " + n;
                  console.log(e),
                    c.LogIt.getInstance().info(e),
                    e.includes("gotoPage") &&
                      (e.includes("liveUpdatePage")
                        ? (c.LogIt.getInstance().info(
                            "[Main] Click Notification => Remote to Support Page!",
                          ),
                          this.mainWin &&
                            (this.mainWin.webContents.send(
                              "DESKTOP_MSG",
                              "TO_LiveUpdate_PAGE",
                            ),
                            (this.mainWin.isVisible() &&
                              !this.mainWin.isMinimized()) ||
                              this.ShowMainWindow(!0, "OOBE-Notifi")))
                        : e.includes("MainPage") &&
                          (c.LogIt.getInstance().info(
                            "[Main] Click Notification => Remote to Main Page!",
                          ),
                          this.mainWin &&
                            (this.mainWin.webContents.send(
                              "DESKTOP_MSG",
                              "TO_Main_PAGE",
                            ),
                            (this.mainWin.isVisible() &&
                              !this.mainWin.isMinimized()) ||
                              this.ShowMainWindow(!0, "OOBE-Notifi")))),
                    e.includes("BAC") &&
                      (c.LogIt.getInstance().info(
                        "[Main] Click Notification => BAC Handle!",
                      ),
                      e.includes("igotit")
                        ? this.mainWin.webContents.send(
                            "DESKTOP_MSG",
                            "BAC_IGOTIT",
                          )
                        : e.includes("skip") &&
                          this.mainWin.webContents.send(
                            "DESKTOP_MSG",
                            "BAC_SKIP",
                          ));
                } else if (t.includes("--quit"))
                  setTimeout(() => {
                    var e;
                    console.log("quit app!"),
                      null === (e = this.mainWin) ||
                        void 0 === e ||
                        e.destroy(),
                      s.app.quit();
                  }, 2e3);
                else if (this.mainWin) {
                  if (this.calledReadyShow) {
                    const e = S.Store.getInstance().get(
                        "windowSize.isMaximized",
                      ),
                      t = S.Store.getInstance().get("firstLaunchApp");
                    c.LogIt.getInstance().info(
                      `[Main] second-instance isFirstTime: ${t}, isMaximized: ${e}, isAppLaunch: ${this.isAppLaunch}, isMinimize: ${this.mainWin.isMinimized()}, isVisible: ${this.mainWin.isVisible()}`,
                    ),
                      t
                        ? (S.Store.getInstance().set("firstLaunchApp", !1),
                          this.ShowMainWindow(!0, "init"))
                        : this.isAppLaunch
                          ? (this.mainWin.isVisible() &&
                              !this.mainWin.isMinimized()) ||
                            this.ShowMainWindow(!0, "isAppLaunch")
                          : this.mainWin.isVisible()
                            ? this.mainWin.isMinimized()
                              ? this.ShowMainWindow(e, "minimized")
                              : c.LogIt.getInstance().info(
                                  "[Main] second-instance: not show mainWin",
                                )
                            : this.ShowMainWindow(!0, "init"),
                      E.MqttFunctionCall.getInstance().broadcast(
                        "REFRESH_APPLICATION",
                      );
                  } else this.showWhenReady = !0;
                  this.App_LaunchRecord(B.open);
                }
              }),
              (this.info = d.Info.getInstance()),
              (this.util = g.Util.getInstance()),
              (this.envConfig = i.EnvConfig.getInstance()),
              !this.devMode && !(yield this.checkMSIVersion()))
            )
              return (
                f.messageBox(
                  'AcerSense setup is not completed. Please select AcerSense from Windows Start menu and select "Yes" when the User Account Control notification appears.',
                  "AcerSense",
                ),
                !1
              );
            this.checkVeroSku(),
              (this.winStore = k.WinStore.getInstance()),
              (this.admin = u.Admin.getInstance()),
              (0, N.setLogger)(c.LogIt.getInstance()),
              c.LogIt.getInstance().info("SKU: " + this.envConfig.getSKU()),
              c.LogIt.getInstance().info(
                "Backend URL: " + this.envConfig.getBackendApiUrl(),
              ),
              c.LogIt.getInstance().info(
                "hideWhenReady: " + this.hideWhenReady,
              ),
              "win32" === process.platform &&
                s.app.setAppUserModelId(o.Manifest.productAppId),
              s.app.on("window-all-closed", (e) => {
                c.LogIt.getInstance().info(
                  "======================= window-all-closed =======================",
                ),
                  this.disableAutoQuit ||
                    (c.LogIt.getInstance().info(
                      "======================= window-all-closed>>app.quit =======================",
                    ),
                    s.app.quit());
              }),
              c.LogIt.getInstance().info("[MA] testService =====");
            const e = process.argv
                .slice(1)
                .find((e) => e.startsWith("--testService")),
              t = process.argv
                .slice(1)
                .find((e) => e.startsWith("--testScenario"));
            if (e || t) {
              const r = e ? e.split("=") : t.split("=");
              if (2 == r.length) {
                const t = r[1].replace(/["]+/g, "");
                e && (0, I.testServiceJSON)(t);
              }
            } else
              process.on("uncaughtException", (e) => {
                console.log(
                  "Uncaughted Exception or Unhandled Rejection happens!",
                ),
                  console.log(e),
                  "EADDRINUSE" == e.code &&
                    (this.port++,
                    (0, A.connectToServer)(this.httpsServer, this.port));
              }),
                c.LogIt.getInstance().info("[MA] ddshInit ====="),
                (0, l.ddshInit)(),
                v.initialize(),
                c.LogIt.getInstance().info("[MA] onReady ====="),
                this.onReady(),
                this.onIpcRegister(),
                this.onDestroy(),
                i.EnvConfig.getInstance().hwacc ||
                  s.app.disableHardwareAcceleration(),
                (this.httpsServer = (0, A.setupWebApp)(this.renderedRoot())),
                (0, A.connectToServer)(this.httpsServer, this.port),
                this.httpsServer.on("listening", () => {
                  this.setupMqttService();
                }),
                this.envConfig.hwAcceleration ||
                  s.app.disableHardwareAcceleration();
            return c.LogIt.getInstance().info("[MA] finish init ====="), !0;
          });
        }
        setupMqttService() {
          (this.mqttFunctionCall = E.MqttFunctionCall.getInstance()),
            (this.mqttFunctionCall.log = c.LogIt.getInstance()),
            this.mqttFunctionCall.init(
              E.CategoryPWARuntime,
              `wss://localhost:${this.port}/mqtt`,
              b,
            ),
            this.mqttFunctionCall.export("ddsc", (e, t, r) =>
              (0, l.call_ddsc)(e, t, r),
            ),
            this.mqttFunctionCall.export("getAllFuncs", (e) =>
              (0, l.call_getAllFuncs)(e),
            );
        }
        onRenderProcessGone() {
          console.log("onRenderProcessGone"),
            this.mainWin.webContents.on("render-process-gone", (e) => {
              0 ===
              s.dialog.showMessageBoxSync(null, {
                type: "question",
                buttons: ["Yes", "No"],
                title: "Restart the app?",
                message: "Your app is crashed, do you want to restart the app?",
                defaultId: 0,
                cancelId: 1,
              })
                ? (e.preventDefault(), this.createWindow())
                : s.app.quit();
            });
        }
        composeParameters() {
          var e;
          var t = "theme=" + (0, y.getVFSSettings)().theme;
          return (
            (t += "&wssport=" + this.port),
            (t +=
              "&Planet9=" +
              (null === (e = this.info.oemSettings.Features) || void 0 === e
                ? void 0
                : e.Planet9)),
            (t += "&Enable3d=" + this.info.getEnable3d()),
            (t +=
              "&EnableAvatarVideo=" + this.info.oemSettings.EnableAvatarVideo),
            (t +=
              "&EnableAvatarApng=" + this.info.oemSettings.EnableAvatarApng),
            (t += "&fps=" + this.envConfig.model3DFps),
            (t += "&useEmbedded=" + this.envConfig.useEmbedded),
            (t += "&reCreateHome=" + this.envConfig.reCreateHome),
            (t += "&sku=" + this.envConfig.getSKU()),
            (t += "&devTool=" + this.envConfig.devTool),
            (t += "&showWhenReady=" + this.showWhenReady),
            (t += "&verosku=" + this.verosku),
            c.LogIt.getInstance().info("[MainApp] composeParameters: " + t),
            t
          );
        }
        urlFormat(e, t = "") {
          var r = `${e ? "https://localhost:6888/" + t : `https://localhost:${this.port}/${t}`}?${this.composeParameters()}`;
          return console.log(r), r;
        }
        renderedRoot() {
          var e = "",
            t = d.Info.getInstance().getLastActiveContentPath();
          return (
            (e = this.devMode
              ? a.join(__dirname, "/../widgets/main")
              : t && t.length > 0 && h.existsSync(a.join(t, "index.html"))
                ? t
                : a.join(__dirname, "/dist/widgets/main")),
            c.LogIt.getInstance().info("Content Path: " + e),
            e
          );
        }
        showAvatar(e, t = !1) {
          e
            ? w.PSSdk.getInstance().enablePumpData(!0)
            : t
              ? w.PSSdk.getInstance().enablePumpData(!1)
              : w.PSSdk.getInstance().enablePumpData(!0),
            this.mainWin.webContents.send(
              "DESKTOP_MSG",
              e ? "ShowAvatar" : "HideAvatar",
            );
        }
        createWindow() {
          this.mainWin &&
            ((this.disableAutoQuit = !0),
            this.mainWin.destroy(),
            (this.mainWin = null),
            (this.disableAutoQuit = !1),
            0 != L.get("modeswitchkey") && L.destroy("modeswitchkey"),
            this.modeSwitchKeyWin &&
              (this.modeSwitchKeyWin.destroy(),
              (this.modeSwitchKeyWin = null))),
            (this.mainWin = new s.BrowserWindow({
              width: 1168,
              minWidth: 500,
              height: 780,
              minHeight: 660,
              frame: !1,
              show: !1,
              resizable: !0,
              center: !0,
              fullscreenable: !0,
              backgroundColor: "#ededec",
              webPreferences: {
                nodeIntegration: !0,
                webviewTag: !0,
                webSecurity: !1,
                contextIsolation: !1,
                nodeIntegrationInSubFrames: !1,
                backgroundThrottling: !1,
                devTools: this.envConfig.devTool,
              },
            })),
            f.setupMainWindow(
              this.mainWin.getNativeWindowHandle().readUInt32LE(0),
              (e) => {
                console.log(
                  `Try to get something ${e.msg} \n ${JSON.stringify(e)}`,
                ),
                  "WM_SETTINGCHANGE" == e.msg
                    ? this.mainWin.webContents.send(
                        "DESKTOP_MSG",
                        "Check_WinSettingChange",
                      )
                    : this.mainWin.webContents.send(
                        "DESKTOP_MSG",
                        "MinimizeWindow",
                      );
              },
            ),
            T.ContentManager.getInstance().startCheckNewContent(this.mainWin),
            this.mainWin.loadURL(this.urlFormat(this.devMode)),
            v.enable(this.mainWin.webContents);
          try {
            r(80).setup(this.mainWin.webContents);
          } catch (e) {
            c.LogIt.getInstance().error(JSON.stringify(e)),
              c.LogIt.getInstance().error(e.toString()),
              c.LogIt.getInstance().error(e.stack);
          }
          i.EnvConfig.getInstance().webConsoleLog &&
            this.mainWin.webContents.on("console-message", (e, t, r) => {
              if (r.indexOf("MQTT") >= 0) {
                const e = "console-message: " + r;
                t >= 2
                  ? c.LogIt.getInstance().error(e)
                  : 1 == t
                    ? c.LogIt.getInstance().info(e)
                    : c.LogIt.getInstance().debug(e);
              } else if (t >= 2) {
                const e = "console-error: " + r;
                c.LogIt.getInstance().error(e);
              }
              this.util.getResolution();
            }),
            s.app.on("web-contents-created", (e, t) => {}),
            this.util.setMainWindow(this.mainWin),
            this.winStore.setMainWindow(this.mainWin),
            this.mainWin.removeMenu(),
            this.onRenderProcessGone(),
            this.mainWin.once("ready-to-show", () => {
              (this.calledReadyShow = !0),
                this.mainWin.setOpacity(0),
                this.showWhenReady
                  ? setTimeout(() => {
                      c.LogIt.getInstance().info(
                        "[Main] ready-to-show: devMode, show main win",
                      ),
                        this.ShowMainWindow(!0, "Ready"),
                        this.App_LaunchRecord(B.open);
                    }, 1500)
                  : (c.LogIt.getInstance().info(
                      "[Main] ready-to-show: first launch by installer, hide main win",
                    ),
                    this.mainWin.hide(),
                    (this.isAppLaunch = !0)),
                D.screen.on("display-metrics-changed", (e) => {
                  c.LogIt.getInstance().info("[Main] display-metrics-changed");
                });
            }),
            C.default.setWindowHandle(this.mainWin.getNativeWindowHandle()),
            C.default.on("shutdown", () =>
              n(this, void 0, void 0, function* () {
                c.LogIt.getInstance().info(
                  "======================= System is shutting down =======================",
                ),
                  c.LogIt.getInstance().info(
                    "======================= Please wait for some data to be saved =======================",
                  ),
                  this.mainWin.webContents.send("DESKTOP_MSG", "shotdown"),
                  yield setTimeout(() => {
                    c.LogIt.getInstance().info(
                      "======================= Shutting down Now =======================",
                    );
                  }, 5e3);
              }),
            ),
            this.mainWin.on("close", (e) => {
              c.LogIt.getInstance().info("[Main] close main win");
              const t = this.mainWin;
              return (
                this.saveConfigOnCloseBefore(t, "close"),
                this.App_LaunchRecord(B.close),
                d.Info.getInstance().setLastRunTime(Date.now()),
                (this.showWhenReady = !1),
                this.envConfig.reCreateWin
                  ? this.createWindow()
                  : this.envConfig.pendingReloadContent
                    ? (s.app.relaunch(), s.app.exit(-1))
                    : this.disableAutoQuit
                      ? c.LogIt.getInstance().info(
                          "======================= shut down? =======================",
                        )
                      : (c.LogIt.getInstance().info(
                          "======================= minmize =======================",
                        ),
                        e.preventDefault(),
                        this.mainWin.minimize(),
                        this.mainWin.setSkipTaskbar(!0),
                        this.showAvatar(!1, !0)),
                !1
              );
            }),
            this.mainWin.on("minimize", (e) => {
              c.LogIt.getInstance().info("[Monitering service] when minimize"),
                -1 == this.AppShowTm
                  ? (c.LogIt.getInstance().info(
                      "Try to stop polling data.(moniter service)",
                    ),
                    this.showAvatar(!1, !0),
                    this.mainWin.webContents.send("DESKTOP_MSG", "BGMinimize"))
                  : this.showAvatar(!1);
            }),
            this.mainWin.on("restore", (e) => {
              c.LogIt.getInstance().info("[Monitering service] when restore"),
                this.mainWin.setSkipTaskbar(!1),
                this.showAvatar(!0);
            }),
            this.mainWin.on("resized", (e) => {
              const t = this.mainWin;
              this.saveConfigOnCloseBefore(t, "resized"),
                c.LogIt.getInstance().info("[Main] main win resize");
            }),
            this.mainWin.on("maximize", (e) => {
              c.LogIt.getInstance().info("[Monitering service] when maximize"),
                this.mainWin.setSkipTaskbar(!1);
              const t = this.mainWin;
              this.saveConfigOnCloseBefore(t, "maximize"), this.showAvatar(!0);
            }),
            this.mainWin.on("unmaximize", (e) => {
              const t = this.mainWin;
              this.saveConfigOnCloseBefore(t, "unmaximize"),
                c.LogIt.getInstance().info(
                  "[Monitering service] when unmaximize",
                ),
                this.showAvatar(!0);
            }),
            this.mainWin.on("moved", (e) => {
              const t = this.mainWin;
              this.saveConfigOnCloseBefore(t, "moved"),
                c.LogIt.getInstance().info("[Main] main win moved");
            }),
            (this.modeSwitchKeyWin = null),
            (this.modeSwitchKey = (e) => {
              e
                ? null == this.modeSwitchKeyWin &&
                  ((this.modeSwitchKeyWin = L.createNew(
                    "modeswitchkey",
                    "",
                    "",
                    !1,
                    {
                      frame: !1,
                      show: !0,
                      resizable: !1,
                      center: !0,
                      transparent: !0,
                      fullscreenable: !1,
                      alwaysOnTop: !0,
                      skipTaskbar: !0,
                      parent: this.mainWin,
                      webPreferences: {
                        nodeIntegration: !0,
                        webviewTag: !0,
                        webSecurity: !1,
                        nativeWindowOpen: !0,
                        enableRemoteModule: !0,
                      },
                    },
                  )),
                  this.modeSwitchKeyWin.create(),
                  this.modeSwitchKeyWin.loadURL(
                    this.urlFormat(this.devMode, "mode-switch-key"),
                  ),
                  this.modeSwitchKeyWin.object.webContents.on(
                    "console-message",
                    (e, t, r) => {
                      c.LogIt.getInstance().debug(
                        "user-guide-console-message: " + JSON.stringify(r),
                      );
                    },
                  ),
                  this.modeSwitchKeyWin.object.once("ready-to-show", () => {
                    this.modeSwitchKeyWin.maximize(),
                      this.modeSwitchKeyWin.object.setKiosk(!0),
                      setTimeout(() => {
                        this.modeSwitchKeyWin.object.show();
                      }, 300);
                  }),
                  this.modeSwitchKeyWin.object.once("show", () => {
                    this.modeSwitchKeyWin.object.setAlwaysOnTop(!1);
                  }))
                : 0 != L.get("modeswitchkey") &&
                  (L.destroy("modeswitchkey"), (this.modeSwitchKeyWin = null));
            }),
            E.MqttFunctionCall.getInstance().on(
              "Create-Mode-Switch-Key-Win",
              () => {
                this.modeSwitchKey(!0);
              },
            ),
            E.MqttFunctionCall.getInstance().on(
              "Close-Mode-Switch-Key-Win",
              () => {
                this.modeSwitchKey(!1),
                  this.mainWin.webContents.send(
                    "DESKTOP_MSG",
                    "UPDATE_SWITCHKEY",
                  );
              },
            ),
            E.MqttFunctionCall.getInstance().on(
              "Update-Mode-Switch-Key-Win",
              () => {
                this.mainWin.webContents.send(
                  "DESKTOP_MSG",
                  "UPDATE_SWITCHKEY",
                );
              },
            ),
            E.MqttFunctionCall.getInstance().on("SHOW_MAIN_WIN", () => {
              if (
                (c.LogIt.getInstance().info(
                  "[MainApp] MqttFunctionCall SHOW_MAIN_WIN, calledReadyShow: " +
                    this.calledReadyShow,
                ),
                this.calledReadyShow)
              ) {
                let e = !!this.mainWin.isVisible();
                this.ShowMainWindow(!e, "mqtt-call-SHOW_MAIN_WIN");
              }
            });
        }
        saveConfigOnCloseBefore(e, t) {
          if (
            (c.LogIt.getInstance().info(
              "[Main] saveConfigOnCloseBefore CallFromEvent: " + t,
            ),
            t == M.maximize)
          )
            S.Store.getInstance().set("windowSize.isMaximized", !0);
          else {
            const r = e.getBounds().width,
              n = e.getBounds().height,
              i = e.getBounds().x,
              o = e.getBounds().y;
            if (
              (S.Store.getInstance().set("windowSize.width", r),
              S.Store.getInstance().set("windowSize.height", n),
              S.Store.getInstance().set("windowSize.x", i),
              S.Store.getInstance().set("windowSize.y", o),
              this.oldWinEvent == M.close && t == M.resized)
            )
              c.LogIt.getInstance().info(
                "[Main] oldWinEvent = close && CallFromEvent == resize, do not record windowSize.isMaximized",
              );
            else {
              const t = e.isMaximized();
              S.Store.getInstance().set("windowSize.isMaximized", t);
            }
          }
          (this.oldWinEvent = t),
            this.mainWin.webContents.send("DESKTOP_MSG", "CHECK_MAXIMIZED");
        }
        getWin32Folders() {
          var e = this.devMode
            ? a.join(__dirname, "../../win32")
            : a.join(a.dirname(s.app.getPath("exe")), "win32");
          return console.log(e), e;
        }
        CopyDefault_logo() {
          const copyFile = (e) => {
            let t = a.join(
              __dirname,
              "/assets/image/BootLogo/PredatorLogo.jpeg",
            );
            h.existsSync(t)
              ? (h.copyFileSync(t, e),
                c.LogIt.getInstance().debug("[PA] default logo path:" + e))
              : c.LogIt.getInstance().debug("[PA] Not find default logo:" + t);
          };
          try {
            var e,
              t = "";
            (t = this.devMode
              ? a.join(this.getWin32Folders(), "/Logo/")
              : a.join(y.oemFolder, "BIOSLogo")),
              (e = a.join(t, "PredatorLogo.jpeg")),
              h.existsSync(e) ||
                (h.existsSync(t)
                  ? copyFile(e)
                  : h.mkdir(
                      t,
                      {
                        recursive: !0,
                      },
                      (t) => {
                        t
                          ? c.LogIt.getInstance().debug(
                              "[PA] Mk logo dir fail:" + t,
                            )
                          : copyFile(e);
                      },
                    ));
          } catch (e) {
            c.LogIt.getInstance().debug("logo intitial" + e);
          }
        }
        onReady() {
          s.app.on("ready", () =>
            n(this, void 0, void 0, function* () {
              try {
                this.getWin32Folders();
                (this.logIt = c.LogIt.getInstance()),
                  S.Store.getInstance()
                    .createUUID()
                    .then((e) =>
                      n(this, void 0, void 0, function* () {
                        this.logIt.info(
                          "[MainApp] app.on('ready') => registerKey(), devTool = " +
                            this.envConfig.devTool,
                        ),
                          this.registerKey(),
                          this.admin.setUUID(String(e.uuid)),
                          this.admin.setUserOS(String(e.os)),
                          this.admin.setUserFrom(
                            "" + String(e.platform).toUpperCase(),
                          ),
                          this.admin.setUserLanguage(s.app.getLocale()),
                          this.createWindow();
                      }),
                    ),
                  S.Store.getInstance().initFirstLaunchApp(),
                  S.Store.getInstance().initTutorialShowOnce(),
                  S.Store.getInstance().initTemperatureUnit(),
                  S.Store.getInstance().initPrivacyPolicy(),
                  S.Store.getInstance().initWidgetsList(),
                  q.ades.instance;
                const e = 1e3 * P.uptime(),
                  t = Date.now() - e;
                c.LogIt.getInstance().info(`lastBootTime = ${t} ms`),
                  d.Info.getInstance().setLastBootTime(t),
                  O.powerMonitor.on("suspend", () => {
                    c.LogIt.getInstance().info(
                      "[MA] electron powerMonitor event: suspend",
                    );
                  }),
                  O.powerMonitor.on("resume", () => {
                    this.mainWin.webContents.send(
                      "DESKTOP_MSG",
                      "END_UPDATE_TASK",
                    ),
                      this.mainWin.webContents.send("DESKTOP_MSG", "WSResume"),
                      c.LogIt.getInstance().info(
                        "[MA] electron powerMonitor event: resume",
                      );
                  }),
                  O.powerMonitor.on("lock-screen", () => {
                    c.LogIt.getInstance().info(
                      "[MA] electron powerMonitor event: lock-screen",
                    );
                  }),
                  O.powerMonitor.on("unlock-screen", () => {
                    c.LogIt.getInstance().info(
                      "[MA] electron powerMonitor event: unlock-screen",
                    );
                  }),
                  O.powerMonitor.on("shutdown", () => {
                    c.LogIt.getInstance().info(
                      "[MA] electron powerMonitor event: shutdown",
                    );
                  }),
                  w.PSSdk.getInstance().ServiceResume();
              } catch (e) {
                c.LogIt.getInstance().info(
                  "[MA] electron powerMonitor error: " + e,
                ),
                  console.error(e);
              }
            }),
          ),
            s.app.on("will-quit", () => {
              c.LogIt.getInstance().info("[MainApp] [MA] app event: will-quit");
            }),
            s.app.whenReady().then(() => {
              m.protocol.registerFileProtocol("file", (e, t) => {
                t(decodeURI(e.url.replace("file:///", "")).split("?")[0]);
              });
            });
        }
        registerKey() {
          c.LogIt.getInstance().info(
            "[MainApp] register key " + this.envConfig.devTool,
          ),
            this.envConfig.devTool &&
              p.register("Control+Shift+P", () => {
                this.mainWin.webContents.openDevTools();
              });
        }
        initSetLanguage() {}
        onDestroy() {
          s.app.on("before-quit", () => {
            c.LogIt.getInstance().info("before-quit");
          }),
            s.app.on("will-quit", () => {
              c.LogIt.getInstance().info("will-quit");
            });
        }
        onIpcRegister() {
          s.ipcMain.on("startPowerSaveBlocker", (e, t) => {
            const r = s.powerSaveBlocker.start("prevent-display-sleep");
            c.LogIt.getInstance().info(
              `startPowerSaveBlocker is called, blockerId = ${r}, blocker is started = ${s.powerSaveBlocker.isStarted(r)}`,
            ),
              (e.returnValue = r);
          }),
            s.ipcMain.on("stopPowerSaveBlocker", (e, t) => {
              s.powerSaveBlocker.stop(t),
                c.LogIt.getInstance().info(
                  `stopPowerSaveBlocker is called, blockerId = ${t}, blocker is working = ${s.powerSaveBlocker.isStarted(t)}`,
                ),
                (e.returnValue = !0);
            });
        }
        ShowMainWindow(e, t) {
          try {
            c.LogIt.getInstance().debug("[Main] Show main window from: " + t),
              c.LogIt.getInstance().info(
                "[Main] Show Main Window => bMaximize: " + e,
              ),
              ("Ready" !== t || this.devMode) &&
                (S.Store.getInstance().set("landingTutorial", !1),
                S.Store.getInstance().set("needShowPrivacyPolicy", !1));
            const r = this.mainWin.isVisible(),
              n = this.mainWin.isMinimized();
            if (
              ((r && !n) || this.mainWin.setOpacity(0),
              c.LogIt.getInstance().info(
                `[Main] Show Main Window => isVisible = ${r}, isMinimized = ${n}`,
              ),
              c.LogIt.getInstance().info(
                "[mainApp] send CancelOobeNoti => cancel notification",
              ),
              this.mainWin.webContents.send("DESKTOP_MSG", "CancelOobeNoti"),
              this.mainWin.show(),
              e)
            )
              this.mainWin.maximize(),
                c.LogIt.getInstance().info(
                  "[Main] Show Main Window => main win maximize ",
                );
            else {
              const e = S.Store.getInstance().get("windowSize.width") || 1168,
                t = S.Store.getInstance().get("windowSize.height") || 780,
                r = S.Store.getInstance().get("windowSize.x") || 0,
                n = S.Store.getInstance().get("windowSize.y") || 0;
              this.mainWin.setBounds({
                x: r,
                y: n,
                width: e,
                height: t,
              }),
                c.LogIt.getInstance().info(
                  `[Main] Show Main Window => x = ${r}, y = ${n}, w = ${e}, h = ${t}`,
                );
            }
            r && n && this.mainWin.webContents.send("DESKTOP_MSG", "restore"),
              this.mainWin.setSkipTaskbar(!1),
              c.LogIt.getInstance().info(
                "[Monitering service] when show main win",
              ),
              this.showAvatar(!0),
              S.Store.getInstance().set("HasShowUI", !0),
              setTimeout(() => {
                this.mainWin.setOpacity(1),
                  e &&
                    this.mainWin.webContents.send("DESKTOP_MSG", "OpenWidget");
              }, 500);
          } catch (e) {
            c.LogIt.getInstance().debug("[Main] Show main window error:" + e);
          }
        }
      };
    },
    function (e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0,
      }),
        (t.ServiceConfig = void 0),
        (t.ServiceConfig = {
          backendURL: "https://backend-prd-imub2p4wyq-uc.a.run.app/xsense",
          firebaseSenderId: "1069735664624",
          acerAccount: {
            baseUrl: "https://www.acer.com",
            apiUrl: "https://account.acer.com/",
            redirectUrl: "https%3A%2F%2Fapp.acer.com%2Fcallback",
            tokenUrl:
              "https://acer-id.auth.eu-central-1.amazoncognito.com/oauth2/token",
            clientId: "7eu5prb3fdktm7djoqaer3l3k8",
            clientSecret:
              "1b5v0s4k9uoruvn2iti7j0m6u8:1596fm5nt5t9onqo5ggaa6fe6d5sbld7f982set3thshpc9dgg9u",
          },
        });
    },
    function (e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0,
      }),
        (t.ServiceConfig = void 0),
        (t.ServiceConfig = {
          backendURL: "https://backend-uat-ycrmvsk7ia-uc.a.run.app/xsense",
          firebaseSenderId: "663435422680",
          acerAccount: {
            baseUrl: "https://uat.acer.com",
            apiUrl: "https://uat-account.acer.com/",
            redirectUrl: "https%3A%2F%2Fapp.acer.com%2Fcallback",
            tokenUrl:
              "https://acer-id-uat.auth.eu-central-1.amazoncognito.com/oauth2/token",
            clientId: "33qh6p6o452irnj79rn6hv3up9",
            clientSecret:
              "7mrjhmlc8m6j189k220ivn6j42:507t32qadrdoqo5459jtf05hksjdvq6m3h8452ca940jnaph5sl",
          },
        });
    },
    function (e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0,
      }),
        (t.ServiceConfig = void 0),
        (t.ServiceConfig = {
          backendURL: "https://backend-dev-gohxob7h2q-uc.a.run.app/xsense",
          firebaseSenderId: "122837269860",
          acerAccount: {
            baseUrl: "https://uat.acer.com",
            apiUrl: "https://uat-account.acer.com/",
            redirectUrl: "https%3A%2F%2Fapp.acer.com%2Fcallback",
            tokenUrl:
              "https://acer-id-uat.auth.eu-central-1.amazoncognito.com/oauth2/token",
            clientId: "33qh6p6o452irnj79rn6hv3up9",
            clientSecret:
              "7mrjhmlc8m6j189k220ivn6j42:507t32qadrdoqo5459jtf05hksjdvq6m3h8452ca940jnaph5sl",
          },
        });
    },
    function (e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0,
      }),
        (t.Manifest = void 0);
      class Manifest {}
      (t.Manifest = Manifest), (Manifest.productAppId = "AcerSense");
    },
    function (e, t, r) {
      "use strict";
      var n =
        (this && this.__awaiter) ||
        function (e, t, r, n) {
          return new (r || (r = Promise))(function (i, o) {
            function fulfilled(e) {
              try {
                step(n.next(e));
              } catch (e) {
                o(e);
              }
            }
            function rejected(e) {
              try {
                step(n.throw(e));
              } catch (e) {
                o(e);
              }
            }
            function step(e) {
              e.done
                ? i(e.value)
                : (function adopt(e) {
                    return e instanceof r
                      ? e
                      : new r(function (t) {
                          t(e);
                        });
                  })(e.value).then(fulfilled, rejected);
            }
            step((n = n.apply(e, t || [])).next());
          });
        };
      Object.defineProperty(t, "__esModule", {
        value: !0,
      }),
        (t.ddshInit = t.call_getAllFuncs = t.call_ddsc = void 0);
      const i = r(0),
        o = r(18),
        s = r(9),
        a = r(3),
        c = r(16),
        l = r(29),
        u = r(49),
        d = r(30),
        g = r(55);
      function getAllFuncs(e) {
        let t = [],
          r = e;
        do {
          t = t.concat(Object.getOwnPropertyNames(r));
        } while ((r = Object.getPrototypeOf(r)));
        return t.sort().filter(function (t, r, n) {
          if (t !== n[r + 1] && "function" == typeof e[t]) return !0;
        });
      }
      var p;
      (t.call_ddsc = function call_ddsc(e, t, r) {
        return n(this, void 0, void 0, function* () {
          const n = p[e];
          return yield n.instance[t](...r);
        });
      }),
        (t.call_getAllFuncs = function call_getAllFuncs(e) {
          const t = process.argv.slice(1).some((e) => "--dev" === e),
            r = [];
          for (let e in p) {
            const o = p[e];
            if (!o.adminOnly || (o.adminOnly && t))
              for (let t in o.module) {
                var n =
                  o.moduleMetadata &&
                  o.moduleMetadata.hasOwnProperty(o.module[t] + "_syncType")
                    ? o.moduleMetadata[o.module[t] + "_syncType"]
                    : "sync";
                n = o.module.hasOwnProperty("syncType") ? o.syncType : n;
                const s = o.module[t];
                if (
                  "constructor" != s &&
                  "hasOwnProperty" != s &&
                  "isPrototypeOf" != s &&
                  "propertyIsEnumerable" != s &&
                  "toLocaleString" != s &&
                  "toString" != s &&
                  "valueOf" != s &&
                  !s.startsWith("__")
                ) {
                  var i = {
                    moduleName: e,
                    func: s,
                  };
                  r.push(i);
                }
              }
          }
          return r;
        }),
        (t.ddshInit = function ddshInit() {
          (p = {
            admin: {
              module: getAllFuncs(o.Admin.prototype),
              instance: o.Admin.getInstance(),
              adminOnly: !1,
            },
            info: {
              module: getAllFuncs(s.Info.prototype),
              instance: s.Info.getInstance(),
              adminOnly: !1,
            },
            winStore: {
              module: getAllFuncs(d.WinStore.prototype),
              instance: d.WinStore.getInstance(),
              adminOnly: !1,
            },
            util: {
              module: getAllFuncs(c.Util.prototype),
              instance: c.Util.getInstance(),
              adminOnly: !1,
            },
            appCenter: {
              module: getAllFuncs(u.AppCenter.prototype),
              instance: u.AppCenter.getInstance(),
              adminOnly: !1,
            },
            logIt: {
              module: getAllFuncs(a.LogIt.prototype),
              instance: a.LogIt.getInstance(),
              adminOnly: !1,
            },
            pssdk: {
              module: getAllFuncs(l.PSSdk.prototype),
              instance: l.PSSdk.getInstance(),
              adminOnly: !1,
            },
            mediaTouchpad: {
              module: getAllFuncs(g.MediaTouchpad.prototype),
              instance: g.MediaTouchpad.getInstance(),
              adminOnly: !1,
            },
          }),
            i.ipcMain.on("call", (e, t, r, i) =>
              n(this, void 0, void 0, function* () {
                const n = p[t],
                  o = yield n.instance[r](i);
                e.returnValue = o;
              }),
            ),
            i.ipcMain.on("registAsyncCall", (e, t, r, o, s) =>
              n(this, void 0, void 0, function* () {
                var n = p[t],
                  o = !1;
                n.instance[r] &&
                  s &&
                  (i.ipcMain.once(`asyncCall_${t}_${r}_${s}`, (e, i) => {
                    const o = `asyncCall_${t}_${r}_${s}_reply`;
                    n.instance[r](i, (t) => {
                      e.sender.send(o, t);
                    });
                  }),
                  (o = !0)),
                  (e.returnValue = o);
              }),
            ),
            i.ipcMain.on("getAllFuns", (e, t) => {
              const r = process.argv.slice(1).some((e) => "--dev" === e),
                n = [];
              for (let e in p) {
                const t = p[e];
                if (!t.adminOnly || (t.adminOnly && r))
                  for (let r in t.module) {
                    var i =
                      t.moduleMetadata &&
                      t.moduleMetadata.hasOwnProperty(t.module[r] + "_syncType")
                        ? t.moduleMetadata[t.module[r] + "_syncType"]
                        : "sync";
                    i = t.module.hasOwnProperty("syncType") ? t.syncType : i;
                    const o = t.module[r];
                    n.push(e + "&" + o + "&" + i);
                  }
              }
              e.returnValue = n;
            });
        });
    },
    function (e, t) {
      e.exports = require("node-machine-id");
    },
    function (e, t) {
      e.exports = require("systeminformation");
    },
    function (e, t) {
      e.exports = require("url");
    },
    function (e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0,
      }),
        (t.LogItConsole = void 0);
      class LogItConsole {
        static getInstance() {
          return (
            LogItConsole.instance ||
              (LogItConsole.instance = new LogItConsole()),
            LogItConsole.instance
          );
        }
        error(e) {
          console.error(e);
        }
        info(e) {
          console.info(e);
        }
        debug(e) {
          console.debug(e);
        }
        debugview(e) {
          console.debug(e);
        }
      }
      t.LogItConsole = LogItConsole;
    },
    function (e, t, r) {
      "use strict";
      var n =
        (this && this.__awaiter) ||
        function (e, t, r, n) {
          return new (r || (r = Promise))(function (i, o) {
            function fulfilled(e) {
              try {
                step(n.next(e));
              } catch (e) {
                o(e);
              }
            }
            function rejected(e) {
              try {
                step(n.throw(e));
              } catch (e) {
                o(e);
              }
            }
            function step(e) {
              e.done
                ? i(e.value)
                : (function adopt(e) {
                    return e instanceof r
                      ? e
                      : new r(function (t) {
                          t(e);
                        });
                  })(e.value).then(fulfilled, rejected);
            }
            step((n = n.apply(e, t || [])).next());
          });
        };
      Object.defineProperty(t, "__esModule", {
        value: !0,
      }),
        (t.SimulatorAdapter = void 0);
      const i = r(26),
        o = r(3),
        s = r(27),
        a = r(8),
        c = r(2),
        l = r(7),
        u = r(5);
      class SimulatorAdapter extends s.AdapterBase {
        constructor() {
          super(),
            (this.baseDataFolder = c.join(l.oemFolder, "PSSimulator")),
            (this.lastNotifyCheckTime = new Date().getTime()),
            (this.ServiceVer = void 0),
            (this.SupportSystemCapability = void 0),
            (this.supportInfo = JSON.parse(
              u.readFileSync(this.baseDataFolder + "\\supportInfo.json"),
            )),
            (this.connectedDevice = JSON.parse(
              u.readFileSync(this.baseDataFolder + "\\connectedDevice.json"),
            )),
            setTimeout(() => {
              this.connect.next(!0), (this.connected = !0);
              let e = this.Initialization_ServiceVersion(),
                t = this.Initialization_SupportSystemCapability();
              o.LogIt.getInstance().debug(`[SA]service version:${e}.`),
                o.LogIt.getInstance().debug(
                  `[SA]support system capability:${t}.`,
                );
            }, 200),
            setInterval(() => {
              var e = u.statSync(this.baseDataFolder + "\\notify.json");
              if (this.lastNotifyCheckTime < e.mtimeMs) {
                this.lastNotifyCheckTime = e.mtimeMs;
                const t = JSON.parse(
                  u.readFileSync(this.baseDataFolder + "\\notify.json"),
                );
                t.Notify &&
                  a.MqttFunctionCall.getInstance().broadcast(
                    t.Notify.Function,
                    t.Notify.Parameter,
                  );
              }
            }, 2e3);
        }
        static get instance() {
          return (
            SimulatorAdapter._instance ||
              (SimulatorAdapter._instance = new SimulatorAdapter()),
            SimulatorAdapter._instance
          );
        }
        Initialization_ServiceVersion() {
          return n(this, void 0, void 0, function* () {
            return (
              o.LogIt.getInstance().debug("[PA] getVersion"),
              (this.ServiceVer = this.supportInfo.VERSION),
              this.supportInfo.VERSION
            );
          });
        }
        Initialization_SupportSystemCapability() {
          return n(this, void 0, void 0, function* () {
            return (
              o.LogIt.getInstance().debug("[PA] getSupportSystemCapability"),
              (this.SupportSystemCapability =
                this.supportInfo.SUPPORT_SYSTEM_CAPABILITY),
              this.supportInfo.SUPPORT_SYSTEM_CAPABILITY
            );
          });
        }
        readData(e) {
          const t = JSON.parse(
              u.readFileSync(this.baseDataFolder + "\\data.json"),
            ),
            r = t[e];
          return (
            e in t || console.error("Not defined key - " + e),
            o.LogIt.getInstance().debug(
              `[SA] readData:key:${e},value:${JSON.stringify(r)}.`,
            ),
            null == r ? null : r
          );
        }
        readDataParam(e, t) {
          const r = JSON.parse(
              u.readFileSync(this.baseDataFolder + "\\data.json"),
            ),
            n = r[e];
          if (e in r) {
            if ("LIGHTING" == e) return n[t.device];
          } else console.error("Not defined key - " + e);
          return n;
        }
        DeviceData(e, t, r = !1) {
          const n = JSON.parse(
            u.readFileSync(this.baseDataFolder + "\\data.json"),
          );
          return (
            "LIGHTING" == e
              ? (e in n || (n[e] = {}), (n[e][t.device] = t))
              : (n[e] = t),
            n
          );
        }
        writeData(e, t) {
          if ("ScenarioChanged" == e) return null;
          o.LogIt.getInstance().debug(
            `[PA] WriteData:key:${e},value:${JSON.stringify(t)}.`,
          );
          const r = this.DeviceData(e, t);
          u.writeFileSync(
            this.baseDataFolder + "\\data.json",
            JSON.stringify(r, null, 4),
          );
        }
        writeDataWithoutScenario(e, t) {
          const r = this.DeviceData(e, t, !0);
          o.LogIt.getInstance().debug(
            `[PA] WriteDataWithout:key:${e},value:${JSON.stringify(t)}.`,
          ),
            u.writeFileSync(
              this.baseDataFolder + "\\data.json",
              JSON.stringify(r, null, 4),
            );
        }
        getServiceVersion() {
          return this.ServiceVer;
        }
        getSupportSystemCapability() {
          return this.SupportSystemCapability;
        }
        getMonitorData() {
          const e = JSON.parse(
            u.readFileSync(this.baseDataFolder + "\\monitorData.json"),
          ).GET_MONITOR_DATA;
          return (e.timeStamp = new Date()), Promise.resolve(e);
        }
        getBatteryBoost() {
          return this.readData("BATTERY_BOOST");
        }
        getSupportOperatingMode() {
          o.LogIt.getInstance().debug(
            "[PA] SUPPORT_OPERATING_MODE_CAPABILITY:" + this.ServiceVer,
          );
          return this.supportInfo.SUPPORT_OPERATING_MODE_CAPABILITY;
        }
        getSupportOverclockingMode() {
          return this.supportInfo.SUPPORT_OVERCLOCKING_MODE_CAPABILITY;
        }
        getSupportAudioMode() {
          return this.supportInfo.SUPPORT_AUDIO_MODE.map(
            (e) => i.DTS_SOUND_MODE[e],
          );
        }
        getSupportKerboardInfo() {
          return this.supportInfo.SUPPORT_KEYBOARD_INFO;
        }
        getSupportAdaptorType() {
          throw (
            (o.LogIt.getInstance().debug(
              "[PA] getSupportKerboardInfo - Method not implemented.",
            ),
            new Error("Method not implemented."))
          );
        }
        getSupportFanControl() {
          return this.supportInfo.SUPPORT_FAN_CONTROL;
        }
        getSupportLCDOverdrive() {
          return this.supportInfo.SUPPORT_LCD_OVERDRIVE;
        }
        getSupportGPUMode() {
          return this.supportInfo.SUPPORT_GPU_MODE;
        }
        getSupportCPUInfo() {
          return this.supportInfo.SUPPORT_CPU_INFO;
        }
        getSupportGPUInfo() {
          return this.supportInfo.SUPPORT_GPU_INFO;
        }
        getUpdatedData(e) {
          return this.readData(e);
        }
        getUpdatedDataParam(e, t) {
          return this.readDataParam(e, t);
        }
        getConnectedDevice() {
          return this.connectedDevice.GET_CONNECTED_DEVICE;
        }
        getLightingEffectCapability() {
          throw (
            (o.LogIt.getInstance().debug(
              "[PA] getLightingEffectCapability - Method not implemented.",
            ),
            new Error("Method not implemented."))
          );
        }
        setDeviceData(e, t) {
          this.writeData(e, t);
        }
        setDataWithoutScenario(e, t) {
          this.writeDataWithoutScenario(e, t);
        }
      }
      t.SimulatorAdapter = SimulatorAdapter;
    },
    function (e, t) {
      e.exports = require("powershell");
    },
    function (e, t) {
      e.exports = require("querystring");
    },
    function (e, t) {
      e.exports = require("electron-shutdown-command");
    },
    function (e, t) {
      e.exports = require("win-audio");
    },
    function (e, t) {
      e.exports = require("electron-color-picker");
    },
    function (e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0,
      }),
        (t.AppCenter = void 0);
      const { app: n } = r(0),
        i = r(3),
        o = r(0),
        s = r(50),
        a = r(1),
        c = r(7),
        l = r(10),
        u = r(6);
      var d = r(51);
      const g = r(5),
        p = r(2);
      var h = r(52);
      class AppCenter {
        constructor() {
          if (
            ((this.savedPath = p.join(
              n.getPath("userData"),
              "appUsageInfo.json",
            )),
            (this.widgetSavedPath = p.join(
              n.getPath("userData"),
              "widgetApps.json",
            )),
            (this.userAppsPath = p.join(
              c.oemFolder,
              "ProfilePool/UserAppInfo.json",
            )),
            (this.pinAppsPath = p.join(
              c.oemFolder,
              "ProfilePool/PinApps.json",
            )),
            (this.lastSave = Date.now()),
            (this.capturePeriod = 36e5),
            (this.saveDuration = 36e5),
            (this.appUsageInfo = []),
            (this.userApps = []),
            (this.pinApps = []),
            (this.AppCenterFilterType = "AppCenterFilterType"),
            (this.ScenarioFilterType = "ScenarioFilterType"),
            (this.bInteractiveLighting = !1),
            (this.groups = []),
            this.load(),
            this.setupAppUsageMonitoring(),
            this.SortupAppToGroups(),
            (this.ApcFilterType = u.Store.getInstance().get(
              this.AppCenterFilterType,
            )),
            null == this.ApcFilterType)
          ) {
            const e = {
              filterBy: 1,
              SortBy: 0,
            };
            this.setAppCenterFilterByType(e);
          }
          if (
            ((this.ScFilterType = u.Store.getInstance().get(
              this.ScenarioFilterType,
            )),
            null == this.ScFilterType)
          ) {
            const e = {
              filterBy: 0,
              SortBy: 0,
            };
            this.setScenarioFilterByType(e);
          }
        }
        static getInstance() {
          return (
            AppCenter.instance || (AppCenter.instance = new AppCenter()),
            AppCenter.instance
          );
        }
        getAllWidgetApps() {
          var e = [];
          try {
            const t = g.readFileSync(this.widgetSavedPath);
            e = JSON.parse(t);
          } catch (e) {}
          return e;
        }
        setAllWidgetApps(e) {
          try {
            g.writeFileSync(this.widgetSavedPath, JSON.stringify(e));
          } catch (e) {}
        }
        getAllInstallLocationInfos() {
          return new Promise((e) => {
            const t = performance.now();
            let r = new s.PowerShell();
            const n =
              ' | Get-ItemProperty | Where {$_.InstallLocation -ne "" -and $_.InstallLocation -ne $Null -and $_.InstallDate -ne "" -and $_.InstallDate -ne $Null} | Select InstallLocation, InstallDate';
            var o = [];
            r
              .call(
                'Get-ChildItem "HKLM:\\Software\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall"' +
                  n,
                "json",
              )
              .subscribe((t) => {
                const i = t.success;
                (o = i),
                  r
                    .call(
                      'Get-ChildItem "HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall"' +
                        n,
                      "json",
                    )
                    .subscribe((t) => {
                      const r = t.success;
                      (o = o.concat(r)), e(o);
                    });
              }),
              i.LogIt.getInstance().info(
                "[PowerShell] FunctionName: getAllInstallLocationInfos ,Powershell call : 2 ,ExecutionTime:" +
                  (performance.now() - t),
              );
          });
        }
        load() {
          try {
            const e = g.readFileSync(this.savedPath);
            this.appUsageInfo = JSON.parse(e);
          } catch (e) {}
        }
        save() {
          try {
            g.writeFileSync(this.savedPath, JSON.stringify(this.appUsageInfo));
          } catch (e) {}
        }
        setUserApps(e) {
          try {
            g.writeFileSync(this.userAppsPath, JSON.stringify(e));
          } catch (e) {}
        }
        getUserApps() {
          try {
            if (g.existsSync(this.userAppsPath)) {
              const e = g.readFileSync(this.userAppsPath);
              e && (this.userApps = JSON.parse(e));
            }
          } catch (e) {}
          return this.userApps;
        }
        setPinApps(e) {
          try {
            g.writeFileSync(this.pinAppsPath, JSON.stringify(e));
          } catch (e) {}
        }
        getPinApps() {
          try {
            if (g.existsSync(this.pinAppsPath)) {
              const e = g.readFileSync(this.pinAppsPath);
              e && (this.pinApps = JSON.parse(e));
            }
          } catch (e) {}
          return this.pinApps;
        }
        setupAppUsageMonitoring() {
          setInterval(() => {
            this.doRunningAppCapture();
          }, this.capturePeriod);
        }
        getAppUsageInfo(e) {
          var t = this.appUsageInfo.find((t) => t.exeName == e);
          return (
            t ||
              ((t = {
                exeName: e,
                usageCount: 0,
                invokeCount: 0,
                lastUsed: Date.now(),
                lastInvoke: Date.now(),
                processId: 0,
              }),
              this.appUsageInfo.push(t)),
            t
          );
        }
        doRunningAppCapture() {
          const e = a.getAllProcess(),
            t = new Set();
          e.forEach((e) => {
            if (!t.has(e.exeFile)) {
              const r = this.getAppUsageInfo(e.exeFile);
              r.usageCount++,
                r.processId != e.processId &&
                  (r.invokeCount++,
                  (r.processId = e.processId),
                  (r.lastInvoke = Date.now())),
                (r.lastUsed = Date.now()),
                t.add(e.exeFile);
            }
          }),
            Date.now() - this.lastSave > this.saveDuration &&
              (this.save(), (this.lastSave = Date.now()));
        }
        getAllAppUsageInfos() {
          return this.appUsageInfo;
        }
        getUserFileInfo(e) {
          return a.getUserFileInfo(e);
        }
        getAllInstalledApps() {
          const e = a.getAllInstalledApps(),
            t = [];
          return (
            e.forEach((e, r) => {
              try {
                if (
                  ((e.isWin32Desktop = 0 == e.packageInstallPath.length),
                  0 == e.linkTargetParsingPath.length)
                ) {
                  const t = g.readFileSync(
                    p.join(e.packageInstallPath, "AppxManifest.xml"),
                    {
                      encoding: "utf8",
                    },
                  );
                  var n = {
                      attributeNamePrefix: "",
                      textNodeName: "#text",
                      ignoreAttributes: !1,
                      ignoreNameSpace: !1,
                      allowBooleanAttributes: !0,
                      parseNodeValue: !0,
                      parseAttributeValue: !0,
                      trimValues: !0,
                      cdataTagName: "__cdata",
                      cdataPositionChar: "\\c",
                      parseTrueNumberOnly: !1,
                      arrayMode: !1,
                      attrValueProcessor: (e, t) =>
                        h.decode(e, {
                          isAttributeValue: !0,
                        }),
                      tagValueProcessor: (e, t) => h.decode(e),
                      stopNodes: ["parse-me-as-string"],
                    },
                    o = d.parse(t, n, !0),
                    s = "",
                    a = "";
                  Array.isArray(o.Package.Applications.Application)
                    ? o.Package.Applications.Application.forEach((t) => {
                        e.id
                          .toString()
                          .toLowerCase()
                          .includes(t.Id.toString().toLowerCase()) &&
                          ((s = t.Executable),
                          t.Id,
                          (a = t["uap:VisualElements"].BackgroundColor));
                      })
                    : ((s = o.Package.Applications.Application.Executable),
                      o.Package.Applications.Application.Id,
                      (a =
                        o.Package.Applications.Application["uap:VisualElements"]
                          .BackgroundColor)),
                    (e.linkTargetParsingPath = p.join(e.packageInstallPath, s));
                }
                e.folderCreationTime = 0;
                try {
                  var c = p.dirname(e.linkTargetParsingPath);
                  const t = g.statSync(c);
                  (e.folderCreationTime = t.ctimeMs),
                    null == a && (a = "transparent"),
                    (e.backgroundColor = a);
                } catch (e) {}
                var l = `App${r} - id: ${e.id}, display: ${e.display}, packageInstallPath: ${e.packageInstallPath}, linkTargetParsingPath: ${e.linkTargetParsingPath}, folderCreationTime: ${e.folderCreationTime}`;
                if (
                  (i.LogIt.getInstance().debug(l),
                  e.display.includes("SpatialLabs"))
                ) {
                  var u = this.checkSpatialLabs(e.display);
                  i.LogIt.getInstance().info(
                    `app.display: ${e.display}, exist: ${JSON.stringify(u)}`,
                  ),
                    u || t.push(r);
                }
              } catch (e) {
                i.LogIt.getInstance().debug(e.toString());
              }
            }),
            e.filter(
              (r, n) =>
                null != r.display &&
                r.display.length > 0 &&
                r.linkTargetParsingPath.length > 0 &&
                "Microsoft.MicrosoftEdge_8wekyb3d8bbwe!MicrosoftEdge" != r.id &&
                r.linkTargetParsingPath.toLowerCase().endsWith(".exe") &&
                this.GroupsFilter(e, r) &&
                !t.includes(n),
            )
          );
        }
        getAppIconDataUri(e) {
          const t = a.getAppIconDataUri(e.id);
          if (e.isWin32Desktop) return t;
          if ("transparent" == e.backgroundColor) {
            const e = o.nativeImage.createFromDataURL(t),
              i = e.getSize(),
              s = e.getBitmap();
            var r = 0,
              n = 0;
            for (let e = 0; e < s.length / 4; e++) {
              const t = s[4 * e + 3] / 255;
              n += 255 - (255 * (1 - t) + s[4 * e + 0] * t);
              n += 255 - (255 * (1 - t) + s[4 * e + 1] * t);
              (n += 255 - (255 * (1 - t) + s[4 * e + 2] * t)),
                r++,
                (s[4 * e + 0] = 255 - s[4 * e + 0]),
                (s[4 * e + 1] = 255 - s[4 * e + 1]),
                (s[4 * e + 2] = 255 - s[4 * e + 2]);
            }
            const a = n / (3 * r);
            if ((console.log("Std Deltas: " + a), a >= 20)) return t;
            return o.nativeImage.createFromBuffer(s, i).toDataURL();
          }
          return t;
        }
        checkSpatialLabs(e) {
          var t = "",
            r = "";
          switch (e) {
            case "SpatialLabs Experience Center":
              (t = "ExperienceCenter"), (r = "SpatialLabs Experience Center");
              break;
            case "SpatialLabs Player":
              (t = "Player"), (r = "SpatialLabsPlayer");
              break;
            case "SpatialLabs Model Viewer":
              (t = "Model Viewer"), (r = "FVMVLauncher");
              break;
            case "SpatialLabs Go":
              (t = "ExperienceCenter"), (r = "SpatialLabs Experience Center");
          }
          if ("" !== t && "" !== r) {
            let e = `C://Program Files//Acer//SpatialLabs//${t}//${r}.exe`;
            return !!g.existsSync(e);
          }
          return !1;
        }
        getRunningApps() {
          return a.getRunningApps();
        }
        LaunchApp(e) {
          if (g.existsSync(e.linkTargetParsingPath)) {
            if (e.packageInstallPath && e.packageInstallPath.length > 0) {
              var t = "shell:AppsFolder\\" + e.id;
              i.LogIt.getInstance().debug(`explorer "${t}"`),
                (0, l.spawnSync)("explorer", [t], {
                  stdio: "ignore",
                });
            } else {
              var r = a.shellExecute(e.linkTargetParsingPath, "open");
              if (null != e.arguments) {
                let t = e.arguments
                  .replaceAll('"', "")
                  .replaceAll(" --", ",--")
                  .split(",");
                (0, l.spawnSync)(e.linkTargetParsingPath, t, {
                  stdio: "ignore",
                });
              } else if (r <= 32 && e.isWin32Desktop) {
                const t = process.execPath,
                  r = p.join(p.dirname(t), "resources/elevate.exe");
                (0, l.spawnSync)(r, [e.linkTargetParsingPath], {
                  stdio: "ignore",
                });
              }
            }
            return !0;
          }
          return !1;
        }
        Launch_Rpdbq_Digital_music() {
          try {
            i.LogIt.getInstance().debug("Launch interactive");
            a.shellExecute(
              "C://Program Files//PredatorSense//Prerequisites//RPDBQ_DIGITAL_MUSIC.exe",
              "open",
            );
            const e = process.execPath,
              t = p.join(p.dirname(e), "resources/elevate.exe");
            (0, l.spawnSync)(t, [p], {
              stdio: "ignore",
            }),
              setTimeout(() => {
                let e = a.IsRpdbqDigitalMusicExist();
                console.log("IsRpdbqDigitalMusicExist", e),
                  i.LogIt.getInstance().debug("Is interactive exist :" + e);
              }, 1e3);
          } catch (e) {
            i.LogIt.getInstance().debug("Launch interactive error :" + e);
          }
        }
        SetInteractiveLighting(e) {
          try {
            let t = a.IsRpdbqDigitalMusicExist();
            t
              ? a.SetInteractiveLighting(e)
              : (this.Launch_Rpdbq_Digital_music(),
                setTimeout(() => {
                  a.SetInteractiveLighting(e);
                }, 1e3)),
              i.LogIt.getInstance().debug(`Set interactive Lighting ${e}:${t}`),
              (this.bInteractiveLighting = !0);
          } catch (e) {
            i.LogIt.getInstance().debug("Set interactive error :" + e);
          }
        }
        StopInterativeEffect() {
          this.bInteractiveLighting &&
            (this.SetInteractiveLighting(0),
            i.LogIt.getInstance().debug("Stop interactive"),
            (this.bInteractiveLighting = !1));
        }
        SetSortFilter(e, t) {
          u.Store.getInstance().set(e, t);
        }
        setAppCenterFilterByType(e) {
          (this.ApcFilterType = e),
            this.SetSortFilter(this.AppCenterFilterType, e);
        }
        setScenarioFilterByType(e) {
          (this.ScFilterType = e),
            this.SetSortFilter(this.ScenarioFilterType, e);
        }
        getAppCenterFilterByType() {
          return this.ApcFilterType;
        }
        getScenarioFilterByType() {
          return this.ScFilterType;
        }
        SortupAppToGroups() {
          this.groups.push({
            apps: ["IntelUnison.exe", "PhoneExperienceHost.exe"],
            ShowMe: "IntelUnison.exe",
          });
        }
        GroupsFilter(e, t) {
          let r = !0;
          return (
            this.groups.forEach((n) => {
              if (
                -1 !=
                n.apps.findIndex((e) => t.linkTargetParsingPath.includes(e))
              ) {
                if (t.linkTargetParsingPath.includes(n.ShowMe))
                  return void (r = !0);
                {
                  const checkApp = (e, t) => null != e && e.includes(t);
                  return 1 ==
                    e.filter((e) => checkApp(e.linkTargetParsingPath, n.ShowMe))
                      .length
                    ? void (r = !1)
                    : void (r = !0);
                }
              }
            }),
            r
          );
        }
      }
      t.AppCenter = AppCenter;
    },
    function (e, t) {
      e.exports = require("full-powershell");
    },
    function (e, t) {
      e.exports = require("fast-xml-parser");
    },
    function (e, t, r) {
      (function (e) {
        var n;
        !(function (i) {
          var o = t,
            s = (e && e.exports, "object" == typeof global && global);
          s.global !== s && s.window;
          var a = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
            c = /[\x01-\x7F]/g,
            l = /[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g,
            u =
              /<\u20D2|=\u20E5|>\u20D2|\u205F\u200A|\u219D\u0338|\u2202\u0338|\u2220\u20D2|\u2229\uFE00|\u222A\uFE00|\u223C\u20D2|\u223D\u0331|\u223E\u0333|\u2242\u0338|\u224B\u0338|\u224D\u20D2|\u224E\u0338|\u224F\u0338|\u2250\u0338|\u2261\u20E5|\u2264\u20D2|\u2265\u20D2|\u2266\u0338|\u2267\u0338|\u2268\uFE00|\u2269\uFE00|\u226A\u0338|\u226A\u20D2|\u226B\u0338|\u226B\u20D2|\u227F\u0338|\u2282\u20D2|\u2283\u20D2|\u228A\uFE00|\u228B\uFE00|\u228F\u0338|\u2290\u0338|\u2293\uFE00|\u2294\uFE00|\u22B4\u20D2|\u22B5\u20D2|\u22D8\u0338|\u22D9\u0338|\u22DA\uFE00|\u22DB\uFE00|\u22F5\u0338|\u22F9\u0338|\u2933\u0338|\u29CF\u0338|\u29D0\u0338|\u2A6D\u0338|\u2A70\u0338|\u2A7D\u0338|\u2A7E\u0338|\u2AA1\u0338|\u2AA2\u0338|\u2AAC\uFE00|\u2AAD\uFE00|\u2AAF\u0338|\u2AB0\u0338|\u2AC5\u0338|\u2AC6\u0338|\u2ACB\uFE00|\u2ACC\uFE00|\u2AFD\u20E5|[\xA0-\u0113\u0116-\u0122\u0124-\u012B\u012E-\u014D\u0150-\u017E\u0192\u01B5\u01F5\u0237\u02C6\u02C7\u02D8-\u02DD\u0311\u0391-\u03A1\u03A3-\u03A9\u03B1-\u03C9\u03D1\u03D2\u03D5\u03D6\u03DC\u03DD\u03F0\u03F1\u03F5\u03F6\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E\u045F\u2002-\u2005\u2007-\u2010\u2013-\u2016\u2018-\u201A\u201C-\u201E\u2020-\u2022\u2025\u2026\u2030-\u2035\u2039\u203A\u203E\u2041\u2043\u2044\u204F\u2057\u205F-\u2063\u20AC\u20DB\u20DC\u2102\u2105\u210A-\u2113\u2115-\u211E\u2122\u2124\u2127-\u2129\u212C\u212D\u212F-\u2131\u2133-\u2138\u2145-\u2148\u2153-\u215E\u2190-\u219B\u219D-\u21A7\u21A9-\u21AE\u21B0-\u21B3\u21B5-\u21B7\u21BA-\u21DB\u21DD\u21E4\u21E5\u21F5\u21FD-\u2205\u2207-\u2209\u220B\u220C\u220F-\u2214\u2216-\u2218\u221A\u221D-\u2238\u223A-\u2257\u2259\u225A\u225C\u225F-\u2262\u2264-\u228B\u228D-\u229B\u229D-\u22A5\u22A7-\u22B0\u22B2-\u22BB\u22BD-\u22DB\u22DE-\u22E3\u22E6-\u22F7\u22F9-\u22FE\u2305\u2306\u2308-\u2310\u2312\u2313\u2315\u2316\u231C-\u231F\u2322\u2323\u232D\u232E\u2336\u233D\u233F\u237C\u23B0\u23B1\u23B4-\u23B6\u23DC-\u23DF\u23E2\u23E7\u2423\u24C8\u2500\u2502\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2550-\u256C\u2580\u2584\u2588\u2591-\u2593\u25A1\u25AA\u25AB\u25AD\u25AE\u25B1\u25B3-\u25B5\u25B8\u25B9\u25BD-\u25BF\u25C2\u25C3\u25CA\u25CB\u25EC\u25EF\u25F8-\u25FC\u2605\u2606\u260E\u2640\u2642\u2660\u2663\u2665\u2666\u266A\u266D-\u266F\u2713\u2717\u2720\u2736\u2758\u2772\u2773\u27C8\u27C9\u27E6-\u27ED\u27F5-\u27FA\u27FC\u27FF\u2902-\u2905\u290C-\u2913\u2916\u2919-\u2920\u2923-\u292A\u2933\u2935-\u2939\u293C\u293D\u2945\u2948-\u294B\u294E-\u2976\u2978\u2979\u297B-\u297F\u2985\u2986\u298B-\u2996\u299A\u299C\u299D\u29A4-\u29B7\u29B9\u29BB\u29BC\u29BE-\u29C5\u29C9\u29CD-\u29D0\u29DC-\u29DE\u29E3-\u29E5\u29EB\u29F4\u29F6\u2A00-\u2A02\u2A04\u2A06\u2A0C\u2A0D\u2A10-\u2A17\u2A22-\u2A27\u2A29\u2A2A\u2A2D-\u2A31\u2A33-\u2A3C\u2A3F\u2A40\u2A42-\u2A4D\u2A50\u2A53-\u2A58\u2A5A-\u2A5D\u2A5F\u2A66\u2A6A\u2A6D-\u2A75\u2A77-\u2A9A\u2A9D-\u2AA2\u2AA4-\u2AB0\u2AB3-\u2AC8\u2ACB\u2ACC\u2ACF-\u2ADB\u2AE4\u2AE6-\u2AE9\u2AEB-\u2AF3\u2AFD\uFB00-\uFB04]|\uD835[\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDD6B]/g,
            d = {
              "Â­": "shy",
              "â€Œ": "zwnj",
              "â€": "zwj",
              "â€Ž": "lrm",
              "â£": "ic",
              "â¢": "it",
              "â¡": "af",
              "â€": "rlm",
              "â€‹": "ZeroWidthSpace",
              "â ": "NoBreak",
              "Ì‘": "DownBreve",
              "âƒ›": "tdot",
              âƒœ: "DotDot",
              "\t": "Tab",
              "\n": "NewLine",
              "â€ˆ": "puncsp",
              "âŸ": "MediumSpace",
              "â€‰": "thinsp",
              "â€Š": "hairsp",
              "â€„": "emsp13",
              "â€‚": "ensp",
              "â€…": "emsp14",
              "â€ƒ": "emsp",
              "â€‡": "numsp",
              "Â ": "nbsp",
              "âŸâ€Š": "ThickSpace",
              "â€¾": "oline",
              _: "lowbar",
              "â€": "dash",
              "â€“": "ndash",
              "â€”": "mdash",
              "â€•": "horbar",
              ",": "comma",
              ";": "semi",
              "â": "bsemi",
              ":": "colon",
              "â©´": "Colone",
              "!": "excl",
              "Â¡": "iexcl",
              "?": "quest",
              "Â¿": "iquest",
              ".": "period",
              "â€¥": "nldr",
              "â€¦": "mldr",
              "Â·": "middot",
              "'": "apos",
              "â€˜": "lsquo",
              "â€™": "rsquo",
              "â€š": "sbquo",
              "â€¹": "lsaquo",
              "â€º": "rsaquo",
              '"': "quot",
              "â€œ": "ldquo",
              "â€": "rdquo",
              "â€ž": "bdquo",
              "Â«": "laquo",
              "Â»": "raquo",
              "(": "lpar",
              ")": "rpar",
              "[": "lsqb",
              "]": "rsqb",
              "{": "lcub",
              "}": "rcub",
              âŒˆ: "lceil",
              "âŒ‰": "rceil",
              âŒŠ: "lfloor",
              "âŒ‹": "rfloor",
              "â¦…": "lopar",
              "â¦†": "ropar",
              "â¦‹": "lbrke",
              "â¦Œ": "rbrke",
              "â¦": "lbrkslu",
              "â¦Ž": "rbrksld",
              "â¦": "lbrksld",
              "â¦": "rbrkslu",
              "â¦‘": "langd",
              "â¦’": "rangd",
              "â¦“": "lparlt",
              "â¦”": "rpargt",
              "â¦•": "gtlPar",
              "â¦–": "ltrPar",
              "âŸ¦": "lobrk",
              "âŸ§": "robrk",
              "âŸ¨": "lang",
              "âŸ©": "rang",
              âŸª: "Lang",
              "âŸ«": "Rang",
              "âŸ¬": "loang",
              "âŸ­": "roang",
              "â²": "lbbrk",
              "â³": "rbbrk",
              "â€–": "Vert",
              "Â§": "sect",
              "Â¶": "para",
              "@": "commat",
              "*": "ast",
              "/": "sol",
              undefined: null,
              "&": "amp",
              "#": "num",
              "%": "percnt",
              "â€°": "permil",
              "â€±": "pertenk",
              "â€ ": "dagger",
              "â€¡": "Dagger",
              "â€¢": "bull",
              "âƒ": "hybull",
              "â€²": "prime",
              "â€³": "Prime",
              "â€´": "tprime",
              "â—": "qprime",
              "â€µ": "bprime",
              "â": "caret",
              "`": "grave",
              "Â´": "acute",
              Ëœ: "tilde",
              "^": "Hat",
              "Â¯": "macr",
              "Ë˜": "breve",
              "Ë™": "dot",
              "Â¨": "die",
              Ëš: "ring",
              "Ë": "dblac",
              "Â¸": "cedil",
              "Ë›": "ogon",
              "Ë†": "circ",
              "Ë‡": "caron",
              "Â°": "deg",
              "Â©": "copy",
              "Â®": "reg",
              "â„—": "copysr",
              "â„˜": "wp",
              "â„ž": "rx",
              "â„§": "mho",
              "â„©": "iiota",
              "â†": "larr",
              "â†š": "nlarr",
              "â†’": "rarr",
              "â†›": "nrarr",
              "â†‘": "uarr",
              "â†“": "darr",
              "â†”": "harr",
              "â†®": "nharr",
              "â†•": "varr",
              "â†–": "nwarr",
              "â†—": "nearr",
              "â†˜": "searr",
              "â†™": "swarr",
              "â†": "rarrw",
              "â†Ì¸": "nrarrw",
              "â†ž": "Larr",
              "â†Ÿ": "Uarr",
              "â† ": "Rarr",
              "â†¡": "Darr",
              "â†¢": "larrtl",
              "â†£": "rarrtl",
              "â†¤": "mapstoleft",
              "â†¥": "mapstoup",
              "â†¦": "map",
              "â†§": "mapstodown",
              "â†©": "larrhk",
              "â†ª": "rarrhk",
              "â†«": "larrlp",
              "â†¬": "rarrlp",
              "â†­": "harrw",
              "â†°": "lsh",
              "â†±": "rsh",
              "â†²": "ldsh",
              "â†³": "rdsh",
              "â†µ": "crarr",
              "â†¶": "cularr",
              "â†·": "curarr",
              "â†º": "olarr",
              "â†»": "orarr",
              "â†¼": "lharu",
              "â†½": "lhard",
              "â†¾": "uharr",
              "â†¿": "uharl",
              "â‡€": "rharu",
              "â‡": "rhard",
              "â‡‚": "dharr",
              "â‡ƒ": "dharl",
              "â‡„": "rlarr",
              "â‡…": "udarr",
              "â‡†": "lrarr",
              "â‡‡": "llarr",
              "â‡ˆ": "uuarr",
              "â‡‰": "rrarr",
              "â‡Š": "ddarr",
              "â‡‹": "lrhar",
              "â‡Œ": "rlhar",
              "â‡": "lArr",
              "â‡": "nlArr",
              "â‡‘": "uArr",
              "â‡’": "rArr",
              "â‡": "nrArr",
              "â‡“": "dArr",
              "â‡”": "iff",
              "â‡Ž": "nhArr",
              "â‡•": "vArr",
              "â‡–": "nwArr",
              "â‡—": "neArr",
              "â‡˜": "seArr",
              "â‡™": "swArr",
              "â‡š": "lAarr",
              "â‡›": "rAarr",
              "â‡": "zigrarr",
              "â‡¤": "larrb",
              "â‡¥": "rarrb",
              "â‡µ": "duarr",
              "â‡½": "loarr",
              "â‡¾": "roarr",
              "â‡¿": "hoarr",
              "âˆ€": "forall",
              "âˆ": "comp",
              "âˆ‚": "part",
              "âˆ‚Ì¸": "npart",
              âˆƒ: "exist",
              "âˆ„": "nexist",
              "âˆ…": "empty",
              "âˆ‡": "Del",
              âˆˆ: "in",
              "âˆ‰": "notin",
              "âˆ‹": "ni",
              âˆŒ: "notni",
              "Ï¶": "bepsi",
              "âˆ": "prod",
              "âˆ": "coprod",
              "âˆ‘": "sum",
              "+": "plus",
              "Â±": "pm",
              "Ã·": "div",
              "Ã—": "times",
              "<": "lt",
              "â‰®": "nlt",
              "<âƒ’": "nvlt",
              "=": "equals",
              "â‰ ": "ne",
              "=âƒ¥": "bne",
              "â©µ": "Equal",
              ">": "gt",
              "â‰¯": "ngt",
              ">âƒ’": "nvgt",
              "Â¬": "not",
              "|": "vert",
              "Â¦": "brvbar",
              "âˆ’": "minus",
              "âˆ“": "mp",
              "âˆ”": "plusdo",
              "â„": "frasl",
              "âˆ–": "setmn",
              "âˆ—": "lowast",
              "âˆ˜": "compfn",
              âˆš: "Sqrt",
              "âˆ": "prop",
              âˆž: "infin",
              âˆŸ: "angrt",
              "âˆ ": "ang",
              "âˆ âƒ’": "nang",
              "âˆ¡": "angmsd",
              "âˆ¢": "angsph",
              "âˆ£": "mid",
              "âˆ¤": "nmid",
              "âˆ¥": "par",
              "âˆ¦": "npar",
              "âˆ§": "and",
              "âˆ¨": "or",
              "âˆ©": "cap",
              "âˆ©ï¸€": "caps",
              âˆª: "cup",
              "âˆªï¸€": "cups",
              "âˆ«": "int",
              "âˆ¬": "Int",
              "âˆ­": "tint",
              "â¨Œ": "qint",
              "âˆ®": "oint",
              "âˆ¯": "Conint",
              "âˆ°": "Cconint",
              "âˆ±": "cwint",
              "âˆ²": "cwconint",
              "âˆ³": "awconint",
              "âˆ´": "there4",
              âˆµ: "becaus",
              "âˆ¶": "ratio",
              "âˆ·": "Colon",
              "âˆ¸": "minusd",
              âˆº: "mDDot",
              "âˆ»": "homtht",
              "âˆ¼": "sim",
              "â‰": "nsim",
              "âˆ¼âƒ’": "nvsim",
              "âˆ½": "bsim",
              "âˆ½Ì±": "race",
              "âˆ¾": "ac",
              "âˆ¾Ì³": "acE",
              "âˆ¿": "acd",
              "â‰€": "wr",
              "â‰‚": "esim",
              "â‰‚Ì¸": "nesim",
              "â‰ƒ": "sime",
              "â‰„": "nsime",
              "â‰…": "cong",
              "â‰‡": "ncong",
              "â‰†": "simne",
              "â‰ˆ": "ap",
              "â‰‰": "nap",
              "â‰Š": "ape",
              "â‰‹": "apid",
              "â‰‹Ì¸": "napid",
              "â‰Œ": "bcong",
              "â‰": "CupCap",
              "â‰­": "NotCupCap",
              "â‰âƒ’": "nvap",
              "â‰Ž": "bump",
              "â‰ŽÌ¸": "nbump",
              "â‰": "bumpe",
              "â‰Ì¸": "nbumpe",
              "â‰": "doteq",
              "â‰Ì¸": "nedot",
              "â‰‘": "eDot",
              "â‰’": "efDot",
              "â‰“": "erDot",
              "â‰”": "colone",
              "â‰•": "ecolon",
              "â‰–": "ecir",
              "â‰—": "cire",
              "â‰™": "wedgeq",
              "â‰š": "veeeq",
              "â‰œ": "trie",
              "â‰Ÿ": "equest",
              "â‰¡": "equiv",
              "â‰¢": "nequiv",
              "â‰¡âƒ¥": "bnequiv",
              "â‰¤": "le",
              "â‰°": "nle",
              "â‰¤âƒ’": "nvle",
              "â‰¥": "ge",
              "â‰±": "nge",
              "â‰¥âƒ’": "nvge",
              "â‰¦": "lE",
              "â‰¦Ì¸": "nlE",
              "â‰§": "gE",
              "â‰§Ì¸": "ngE",
              "â‰¨ï¸€": "lvnE",
              "â‰¨": "lnE",
              "â‰©": "gnE",
              "â‰©ï¸€": "gvnE",
              "â‰ª": "ll",
              "â‰ªÌ¸": "nLtv",
              "â‰ªâƒ’": "nLt",
              "â‰«": "gg",
              "â‰«Ì¸": "nGtv",
              "â‰«âƒ’": "nGt",
              "â‰¬": "twixt",
              "â‰²": "lsim",
              "â‰´": "nlsim",
              "â‰³": "gsim",
              "â‰µ": "ngsim",
              "â‰¶": "lg",
              "â‰¸": "ntlg",
              "â‰·": "gl",
              "â‰¹": "ntgl",
              "â‰º": "pr",
              "âŠ€": "npr",
              "â‰»": "sc",
              "âŠ": "nsc",
              "â‰¼": "prcue",
              "â‹ ": "nprcue",
              "â‰½": "sccue",
              "â‹¡": "nsccue",
              "â‰¾": "prsim",
              "â‰¿": "scsim",
              "â‰¿Ì¸": "NotSucceedsTilde",
              "âŠ‚": "sub",
              "âŠ„": "nsub",
              "âŠ‚âƒ’": "vnsub",
              âŠƒ: "sup",
              "âŠ…": "nsup",
              "âŠƒâƒ’": "vnsup",
              "âŠ†": "sube",
              âŠˆ: "nsube",
              "âŠ‡": "supe",
              "âŠ‰": "nsupe",
              "âŠŠï¸€": "vsubne",
              âŠŠ: "subne",
              "âŠ‹ï¸€": "vsupne",
              "âŠ‹": "supne",
              "âŠ": "cupdot",
              âŠŽ: "uplus",
              "âŠ": "sqsub",
              "âŠÌ¸": "NotSquareSubset",
              "âŠ": "sqsup",
              "âŠÌ¸": "NotSquareSuperset",
              "âŠ‘": "sqsube",
              "â‹¢": "nsqsube",
              "âŠ’": "sqsupe",
              "â‹£": "nsqsupe",
              "âŠ“": "sqcap",
              "âŠ“ï¸€": "sqcaps",
              "âŠ”": "sqcup",
              "âŠ”ï¸€": "sqcups",
              "âŠ•": "oplus",
              "âŠ–": "ominus",
              "âŠ—": "otimes",
              "âŠ˜": "osol",
              "âŠ™": "odot",
              âŠš: "ocir",
              "âŠ›": "oast",
              "âŠ": "odash",
              âŠž: "plusb",
              âŠŸ: "minusb",
              "âŠ ": "timesb",
              "âŠ¡": "sdotb",
              "âŠ¢": "vdash",
              "âŠ¬": "nvdash",
              "âŠ£": "dashv",
              "âŠ¤": "top",
              "âŠ¥": "bot",
              "âŠ§": "models",
              "âŠ¨": "vDash",
              "âŠ­": "nvDash",
              "âŠ©": "Vdash",
              "âŠ®": "nVdash",
              âŠª: "Vvdash",
              "âŠ«": "VDash",
              "âŠ¯": "nVDash",
              "âŠ°": "prurel",
              "âŠ²": "vltri",
              "â‹ª": "nltri",
              "âŠ³": "vrtri",
              "â‹«": "nrtri",
              "âŠ´": "ltrie",
              "â‹¬": "nltrie",
              "âŠ´âƒ’": "nvltrie",
              âŠµ: "rtrie",
              "â‹­": "nrtrie",
              "âŠµâƒ’": "nvrtrie",
              "âŠ¶": "origof",
              "âŠ·": "imof",
              "âŠ¸": "mumap",
              "âŠ¹": "hercon",
              âŠº: "intcal",
              "âŠ»": "veebar",
              "âŠ½": "barvee",
              "âŠ¾": "angrtvb",
              "âŠ¿": "lrtri",
              "â‹€": "Wedge",
              "â‹": "Vee",
              "â‹‚": "xcap",
              "â‹ƒ": "xcup",
              "â‹„": "diam",
              "â‹…": "sdot",
              "â‹†": "Star",
              "â‹‡": "divonx",
              "â‹ˆ": "bowtie",
              "â‹‰": "ltimes",
              "â‹Š": "rtimes",
              "â‹‹": "lthree",
              "â‹Œ": "rthree",
              "â‹": "bsime",
              "â‹Ž": "cuvee",
              "â‹": "cuwed",
              "â‹": "Sub",
              "â‹‘": "Sup",
              "â‹’": "Cap",
              "â‹“": "Cup",
              "â‹”": "fork",
              "â‹•": "epar",
              "â‹–": "ltdot",
              "â‹—": "gtdot",
              "â‹˜": "Ll",
              "â‹˜Ì¸": "nLl",
              "â‹™": "Gg",
              "â‹™Ì¸": "nGg",
              "â‹šï¸€": "lesg",
              "â‹š": "leg",
              "â‹›": "gel",
              "â‹›ï¸€": "gesl",
              "â‹ž": "cuepr",
              "â‹Ÿ": "cuesc",
              "â‹¦": "lnsim",
              "â‹§": "gnsim",
              "â‹¨": "prnsim",
              "â‹©": "scnsim",
              "â‹®": "vellip",
              "â‹¯": "ctdot",
              "â‹°": "utdot",
              "â‹±": "dtdot",
              "â‹²": "disin",
              "â‹³": "isinsv",
              "â‹´": "isins",
              "â‹µ": "isindot",
              "â‹µÌ¸": "notindot",
              "â‹¶": "notinvc",
              "â‹·": "notinvb",
              "â‹¹": "isinE",
              "â‹¹Ì¸": "notinE",
              "â‹º": "nisd",
              "â‹»": "xnis",
              "â‹¼": "nis",
              "â‹½": "notnivc",
              "â‹¾": "notnivb",
              "âŒ…": "barwed",
              "âŒ†": "Barwed",
              âŒŒ: "drcrop",
              "âŒ": "dlcrop",
              âŒŽ: "urcrop",
              "âŒ": "ulcrop",
              "âŒ": "bnot",
              "âŒ’": "profline",
              "âŒ“": "profsurf",
              "âŒ•": "telrec",
              "âŒ–": "target",
              âŒœ: "ulcorn",
              "âŒ": "urcorn",
              âŒž: "dlcorn",
              âŒŸ: "drcorn",
              "âŒ¢": "frown",
              "âŒ£": "smile",
              "âŒ­": "cylcty",
              "âŒ®": "profalar",
              "âŒ¶": "topbot",
              "âŒ½": "ovbar",
              "âŒ¿": "solbar",
              "â¼": "angzarr",
              "âŽ°": "lmoust",
              "âŽ±": "rmoust",
              "âŽ´": "tbrk",
              âŽµ: "bbrk",
              "âŽ¶": "bbrktbrk",
              "âœ": "OverParenthesis",
              "â": "UnderParenthesis",
              "âž": "OverBrace",
              "âŸ": "UnderBrace",
              "â¢": "trpezium",
              "â§": "elinters",
              "â£": "blank",
              "â”€": "boxh",
              "â”‚": "boxv",
              "â”Œ": "boxdr",
              "â”": "boxdl",
              "â””": "boxur",
              "â”˜": "boxul",
              "â”œ": "boxvr",
              "â”¤": "boxvl",
              "â”¬": "boxhd",
              "â”´": "boxhu",
              "â”¼": "boxvh",
              "â•": "boxH",
              "â•‘": "boxV",
              "â•’": "boxdR",
              "â•“": "boxDr",
              "â•”": "boxDR",
              "â••": "boxdL",
              "â•–": "boxDl",
              "â•—": "boxDL",
              "â•˜": "boxuR",
              "â•™": "boxUr",
              "â•š": "boxUR",
              "â•›": "boxuL",
              "â•œ": "boxUl",
              "â•": "boxUL",
              "â•ž": "boxvR",
              "â•Ÿ": "boxVr",
              "â• ": "boxVR",
              "â•¡": "boxvL",
              "â•¢": "boxVl",
              "â•£": "boxVL",
              "â•¤": "boxHd",
              "â•¥": "boxhD",
              "â•¦": "boxHD",
              "â•§": "boxHu",
              "â•¨": "boxhU",
              "â•©": "boxHU",
              "â•ª": "boxvH",
              "â•«": "boxVh",
              "â•¬": "boxVH",
              "â–€": "uhblk",
              "â–„": "lhblk",
              "â–ˆ": "block",
              "â–‘": "blk14",
              "â–’": "blk12",
              "â–“": "blk34",
              "â–¡": "squ",
              "â–ª": "squf",
              "â–«": "EmptyVerySmallSquare",
              "â–­": "rect",
              "â–®": "marker",
              "â–±": "fltns",
              "â–³": "xutri",
              "â–´": "utrif",
              "â–µ": "utri",
              "â–¸": "rtrif",
              "â–¹": "rtri",
              "â–½": "xdtri",
              "â–¾": "dtrif",
              "â–¿": "dtri",
              "â—‚": "ltrif",
              "â—ƒ": "ltri",
              "â—Š": "loz",
              "â—‹": "cir",
              "â—¬": "tridot",
              "â—¯": "xcirc",
              "â—¸": "ultri",
              "â—¹": "urtri",
              "â—º": "lltri",
              "â—»": "EmptySmallSquare",
              "â—¼": "FilledSmallSquare",
              "â˜…": "starf",
              "â˜†": "star",
              "â˜Ž": "phone",
              "â™€": "female",
              "â™‚": "male",
              "â™ ": "spades",
              "â™£": "clubs",
              "â™¥": "hearts",
              "â™¦": "diams",
              "â™ª": "sung",
              "âœ“": "check",
              "âœ—": "cross",
              "âœ ": "malt",
              "âœ¶": "sext",
              "â˜": "VerticalSeparator",
              âŸˆ: "bsolhsub",
              "âŸ‰": "suphsol",
              âŸµ: "xlarr",
              "âŸ¶": "xrarr",
              "âŸ·": "xharr",
              "âŸ¸": "xlArr",
              "âŸ¹": "xrArr",
              âŸº: "xhArr",
              "âŸ¼": "xmap",
              "âŸ¿": "dzigrarr",
              "â¤‚": "nvlArr",
              "â¤ƒ": "nvrArr",
              "â¤„": "nvHarr",
              "â¤…": "Map",
              "â¤Œ": "lbarr",
              "â¤": "rbarr",
              "â¤Ž": "lBarr",
              "â¤": "rBarr",
              "â¤": "RBarr",
              "â¤‘": "DDotrahd",
              "â¤’": "UpArrowBar",
              "â¤“": "DownArrowBar",
              "â¤–": "Rarrtl",
              "â¤™": "latail",
              "â¤š": "ratail",
              "â¤›": "lAtail",
              "â¤œ": "rAtail",
              "â¤": "larrfs",
              "â¤ž": "rarrfs",
              "â¤Ÿ": "larrbfs",
              "â¤ ": "rarrbfs",
              "â¤£": "nwarhk",
              "â¤¤": "nearhk",
              "â¤¥": "searhk",
              "â¤¦": "swarhk",
              "â¤§": "nwnear",
              "â¤¨": "toea",
              "â¤©": "tosa",
              "â¤ª": "swnwar",
              "â¤³": "rarrc",
              "â¤³Ì¸": "nrarrc",
              "â¤µ": "cudarrr",
              "â¤¶": "ldca",
              "â¤·": "rdca",
              "â¤¸": "cudarrl",
              "â¤¹": "larrpl",
              "â¤¼": "curarrm",
              "â¤½": "cularrp",
              "â¥…": "rarrpl",
              "â¥ˆ": "harrcir",
              "â¥‰": "Uarrocir",
              "â¥Š": "lurdshar",
              "â¥‹": "ldrushar",
              "â¥Ž": "LeftRightVector",
              "â¥": "RightUpDownVector",
              "â¥": "DownLeftRightVector",
              "â¥‘": "LeftUpDownVector",
              "â¥’": "LeftVectorBar",
              "â¥“": "RightVectorBar",
              "â¥”": "RightUpVectorBar",
              "â¥•": "RightDownVectorBar",
              "â¥–": "DownLeftVectorBar",
              "â¥—": "DownRightVectorBar",
              "â¥˜": "LeftUpVectorBar",
              "â¥™": "LeftDownVectorBar",
              "â¥š": "LeftTeeVector",
              "â¥›": "RightTeeVector",
              "â¥œ": "RightUpTeeVector",
              "â¥": "RightDownTeeVector",
              "â¥ž": "DownLeftTeeVector",
              "â¥Ÿ": "DownRightTeeVector",
              "â¥ ": "LeftUpTeeVector",
              "â¥¡": "LeftDownTeeVector",
              "â¥¢": "lHar",
              "â¥£": "uHar",
              "â¥¤": "rHar",
              "â¥¥": "dHar",
              "â¥¦": "luruhar",
              "â¥§": "ldrdhar",
              "â¥¨": "ruluhar",
              "â¥©": "rdldhar",
              "â¥ª": "lharul",
              "â¥«": "llhard",
              "â¥¬": "rharul",
              "â¥­": "lrhard",
              "â¥®": "udhar",
              "â¥¯": "duhar",
              "â¥°": "RoundImplies",
              "â¥±": "erarr",
              "â¥²": "simrarr",
              "â¥³": "larrsim",
              "â¥´": "rarrsim",
              "â¥µ": "rarrap",
              "â¥¶": "ltlarr",
              "â¥¸": "gtrarr",
              "â¥¹": "subrarr",
              "â¥»": "suplarr",
              "â¥¼": "lfisht",
              "â¥½": "rfisht",
              "â¥¾": "ufisht",
              "â¥¿": "dfisht",
              "â¦š": "vzigzag",
              "â¦œ": "vangrt",
              "â¦": "angrtvbd",
              "â¦¤": "ange",
              "â¦¥": "range",
              "â¦¦": "dwangle",
              "â¦§": "uwangle",
              "â¦¨": "angmsdaa",
              "â¦©": "angmsdab",
              "â¦ª": "angmsdac",
              "â¦«": "angmsdad",
              "â¦¬": "angmsdae",
              "â¦­": "angmsdaf",
              "â¦®": "angmsdag",
              "â¦¯": "angmsdah",
              "â¦°": "bemptyv",
              "â¦±": "demptyv",
              "â¦²": "cemptyv",
              "â¦³": "raemptyv",
              "â¦´": "laemptyv",
              "â¦µ": "ohbar",
              "â¦¶": "omid",
              "â¦·": "opar",
              "â¦¹": "operp",
              "â¦»": "olcross",
              "â¦¼": "odsold",
              "â¦¾": "olcir",
              "â¦¿": "ofcir",
              "â§€": "olt",
              "â§": "ogt",
              "â§‚": "cirscir",
              "â§ƒ": "cirE",
              "â§„": "solb",
              "â§…": "bsolb",
              "â§‰": "boxbox",
              "â§": "trisb",
              "â§Ž": "rtriltri",
              "â§": "LeftTriangleBar",
              "â§Ì¸": "NotLeftTriangleBar",
              "â§": "RightTriangleBar",
              "â§Ì¸": "NotRightTriangleBar",
              "â§œ": "iinfin",
              "â§": "infintie",
              "â§ž": "nvinfin",
              "â§£": "eparsl",
              "â§¤": "smeparsl",
              "â§¥": "eqvparsl",
              "â§«": "lozf",
              "â§´": "RuleDelayed",
              "â§¶": "dsol",
              "â¨€": "xodot",
              "â¨": "xoplus",
              "â¨‚": "xotime",
              "â¨„": "xuplus",
              "â¨†": "xsqcup",
              "â¨": "fpartint",
              "â¨": "cirfnint",
              "â¨‘": "awint",
              "â¨’": "rppolint",
              "â¨“": "scpolint",
              "â¨”": "npolint",
              "â¨•": "pointint",
              "â¨–": "quatint",
              "â¨—": "intlarhk",
              "â¨¢": "pluscir",
              "â¨£": "plusacir",
              "â¨¤": "simplus",
              "â¨¥": "plusdu",
              "â¨¦": "plussim",
              "â¨§": "plustwo",
              "â¨©": "mcomma",
              "â¨ª": "minusdu",
              "â¨­": "loplus",
              "â¨®": "roplus",
              "â¨¯": "Cross",
              "â¨°": "timesd",
              "â¨±": "timesbar",
              "â¨³": "smashp",
              "â¨´": "lotimes",
              "â¨µ": "rotimes",
              "â¨¶": "otimesas",
              "â¨·": "Otimes",
              "â¨¸": "odiv",
              "â¨¹": "triplus",
              "â¨º": "triminus",
              "â¨»": "tritime",
              "â¨¼": "iprod",
              "â¨¿": "amalg",
              "â©€": "capdot",
              "â©‚": "ncup",
              "â©ƒ": "ncap",
              "â©„": "capand",
              "â©…": "cupor",
              "â©†": "cupcap",
              "â©‡": "capcup",
              "â©ˆ": "cupbrcap",
              "â©‰": "capbrcup",
              "â©Š": "cupcup",
              "â©‹": "capcap",
              "â©Œ": "ccups",
              "â©": "ccaps",
              "â©": "ccupssm",
              "â©“": "And",
              "â©”": "Or",
              "â©•": "andand",
              "â©–": "oror",
              "â©—": "orslope",
              "â©˜": "andslope",
              "â©š": "andv",
              "â©›": "orv",
              "â©œ": "andd",
              "â©": "ord",
              "â©Ÿ": "wedbar",
              "â©¦": "sdote",
              "â©ª": "simdot",
              "â©­": "congdot",
              "â©­Ì¸": "ncongdot",
              "â©®": "easter",
              "â©¯": "apacir",
              "â©°": "apE",
              "â©°Ì¸": "napE",
              "â©±": "eplus",
              "â©²": "pluse",
              "â©³": "Esim",
              "â©·": "eDDot",
              "â©¸": "equivDD",
              "â©¹": "ltcir",
              "â©º": "gtcir",
              "â©»": "ltquest",
              "â©¼": "gtquest",
              "â©½": "les",
              "â©½Ì¸": "nles",
              "â©¾": "ges",
              "â©¾Ì¸": "nges",
              "â©¿": "lesdot",
              "âª€": "gesdot",
              "âª": "lesdoto",
              "âª‚": "gesdoto",
              âªƒ: "lesdotor",
              "âª„": "gesdotol",
              "âª…": "lap",
              "âª†": "gap",
              "âª‡": "lne",
              âªˆ: "gne",
              "âª‰": "lnap",
              âªŠ: "gnap",
              "âª‹": "lEg",
              âªŒ: "gEl",
              "âª": "lsime",
              âªŽ: "gsime",
              "âª": "lsimg",
              "âª": "gsiml",
              "âª‘": "lgE",
              "âª’": "glE",
              "âª“": "lesges",
              "âª”": "gesles",
              "âª•": "els",
              "âª–": "egs",
              "âª—": "elsdot",
              "âª˜": "egsdot",
              "âª™": "el",
              âªš: "eg",
              "âª": "siml",
              âªž: "simg",
              âªŸ: "simlE",
              "âª ": "simgE",
              "âª¡": "LessLess",
              "âª¡Ì¸": "NotNestedLessLess",
              "âª¢": "GreaterGreater",
              "âª¢Ì¸": "NotNestedGreaterGreater",
              "âª¤": "glj",
              "âª¥": "gla",
              "âª¦": "ltcc",
              "âª§": "gtcc",
              "âª¨": "lescc",
              "âª©": "gescc",
              âªª: "smt",
              "âª«": "lat",
              "âª¬": "smte",
              "âª¬ï¸€": "smtes",
              "âª­": "late",
              "âª­ï¸€": "lates",
              "âª®": "bumpE",
              "âª¯": "pre",
              "âª¯Ì¸": "npre",
              "âª°": "sce",
              "âª°Ì¸": "nsce",
              "âª³": "prE",
              "âª´": "scE",
              âªµ: "prnE",
              "âª¶": "scnE",
              "âª·": "prap",
              "âª¸": "scap",
              "âª¹": "prnap",
              âªº: "scnap",
              "âª»": "Pr",
              "âª¼": "Sc",
              "âª½": "subdot",
              "âª¾": "supdot",
              "âª¿": "subplus",
              "â«€": "supplus",
              "â«": "submult",
              "â«‚": "supmult",
              "â«ƒ": "subedot",
              "â«„": "supedot",
              "â«…": "subE",
              "â«…Ì¸": "nsubE",
              "â«†": "supE",
              "â«†Ì¸": "nsupE",
              "â«‡": "subsim",
              "â«ˆ": "supsim",
              "â«‹ï¸€": "vsubnE",
              "â«‹": "subnE",
              "â«Œï¸€": "vsupnE",
              "â«Œ": "supnE",
              "â«": "csub",
              "â«": "csup",
              "â«‘": "csube",
              "â«’": "csupe",
              "â«“": "subsup",
              "â«”": "supsub",
              "â«•": "subsub",
              "â«–": "supsup",
              "â«—": "suphsub",
              "â«˜": "supdsub",
              "â«™": "forkv",
              "â«š": "topfork",
              "â«›": "mlcp",
              "â«¤": "Dashv",
              "â«¦": "Vdashl",
              "â«§": "Barv",
              "â«¨": "vBar",
              "â«©": "vBarv",
              "â««": "Vbar",
              "â«¬": "Not",
              "â«­": "bNot",
              "â«®": "rnmid",
              "â«¯": "cirmid",
              "â«°": "midcir",
              "â«±": "topcir",
              "â«²": "nhpar",
              "â«³": "parsim",
              "â«½": "parsl",
              "â«½âƒ¥": "nparsl",
              "â™­": "flat",
              "â™®": "natur",
              "â™¯": "sharp",
              "Â¤": "curren",
              "Â¢": "cent",
              $: "dollar",
              "Â£": "pound",
              "Â¥": "yen",
              "â‚¬": "euro",
              "Â¹": "sup1",
              "Â½": "half",
              "â…“": "frac13",
              "Â¼": "frac14",
              "â…•": "frac15",
              "â…™": "frac16",
              "â…›": "frac18",
              "Â²": "sup2",
              "â…”": "frac23",
              "â…–": "frac25",
              "Â³": "sup3",
              "Â¾": "frac34",
              "â…—": "frac35",
              "â…œ": "frac38",
              "â…˜": "frac45",
              "â…š": "frac56",
              "â…": "frac58",
              "â…ž": "frac78",
              "ð’¶": "ascr",
              "ð•’": "aopf",
              "ð”ž": "afr",
              "ð”¸": "Aopf",
              "ð”„": "Afr",
              "ð’œ": "Ascr",
              Âª: "ordf",
              "Ã¡": "aacute",
              "Ã": "Aacute",
              "Ã ": "agrave",
              "Ã€": "Agrave",
              Äƒ: "abreve",
              "Ä‚": "Abreve",
              "Ã¢": "acirc",
              "Ã‚": "Acirc",
              "Ã¥": "aring",
              "Ã…": "angst",
              "Ã¤": "auml",
              "Ã„": "Auml",
              "Ã£": "atilde",
              Ãƒ: "Atilde",
              "Ä…": "aogon",
              "Ä„": "Aogon",
              "Ä": "amacr",
              "Ä€": "Amacr",
              "Ã¦": "aelig",
              "Ã†": "AElig",
              "ð’·": "bscr",
              "ð•“": "bopf",
              "ð”Ÿ": "bfr",
              "ð”¹": "Bopf",
              "â„¬": "Bscr",
              "ð”…": "Bfr",
              "ð” ": "cfr",
              "ð’¸": "cscr",
              "ð•”": "copf",
              "â„­": "Cfr",
              "ð’ž": "Cscr",
              "â„‚": "Copf",
              "Ä‡": "cacute",
              "Ä†": "Cacute",
              "Ä‰": "ccirc",
              Äˆ: "Ccirc",
              "Ä": "ccaron",
              ÄŒ: "Ccaron",
              "Ä‹": "cdot",
              ÄŠ: "Cdot",
              "Ã§": "ccedil",
              "Ã‡": "Ccedil",
              "â„…": "incare",
              "ð”¡": "dfr",
              "â…†": "dd",
              "ð••": "dopf",
              "ð’¹": "dscr",
              "ð’Ÿ": "Dscr",
              "ð”‡": "Dfr",
              "â……": "DD",
              "ð”»": "Dopf",
              "Ä": "dcaron",
              ÄŽ: "Dcaron",
              "Ä‘": "dstrok",
              "Ä": "Dstrok",
              "Ã°": "eth",
              "Ã": "ETH",
              "â…‡": "ee",
              "â„¯": "escr",
              "ð”¢": "efr",
              "ð•–": "eopf",
              "â„°": "Escr",
              "ð”ˆ": "Efr",
              "ð”¼": "Eopf",
              "Ã©": "eacute",
              "Ã‰": "Eacute",
              "Ã¨": "egrave",
              Ãˆ: "Egrave",
              Ãª: "ecirc",
              ÃŠ: "Ecirc",
              "Ä›": "ecaron",
              Äš: "Ecaron",
              "Ã«": "euml",
              "Ã‹": "Euml",
              "Ä—": "edot",
              "Ä–": "Edot",
              "Ä™": "eogon",
              "Ä˜": "Eogon",
              "Ä“": "emacr",
              "Ä’": "Emacr",
              "ð”£": "ffr",
              "ð•—": "fopf",
              "ð’»": "fscr",
              "ð”‰": "Ffr",
              "ð”½": "Fopf",
              "â„±": "Fscr",
              "ï¬€": "fflig",
              "ï¬ƒ": "ffilig",
              "ï¬„": "ffllig",
              "ï¬": "filig",
              fj: "fjlig",
              "ï¬‚": "fllig",
              "Æ’": "fnof",
              "â„Š": "gscr",
              "ð•˜": "gopf",
              "ð”¤": "gfr",
              "ð’¢": "Gscr",
              "ð”¾": "Gopf",
              "ð”Š": "Gfr",
              Çµ: "gacute",
              ÄŸ: "gbreve",
              Äž: "Gbreve",
              "Ä": "gcirc",
              Äœ: "Gcirc",
              "Ä¡": "gdot",
              "Ä ": "Gdot",
              "Ä¢": "Gcedil",
              "ð”¥": "hfr",
              "â„Ž": "planckh",
              "ð’½": "hscr",
              "ð•™": "hopf",
              "â„‹": "Hscr",
              "â„Œ": "Hfr",
              "â„": "Hopf",
              "Ä¥": "hcirc",
              "Ä¤": "Hcirc",
              "â„": "hbar",
              "Ä§": "hstrok",
              "Ä¦": "Hstrok",
              "ð•š": "iopf",
              "ð”¦": "ifr",
              "ð’¾": "iscr",
              "â…ˆ": "ii",
              "ð•€": "Iopf",
              "â„": "Iscr",
              "â„‘": "Im",
              "Ã­": "iacute",
              "Ã": "Iacute",
              "Ã¬": "igrave",
              ÃŒ: "Igrave",
              "Ã®": "icirc",
              ÃŽ: "Icirc",
              "Ã¯": "iuml",
              "Ã": "Iuml",
              "Ä©": "itilde",
              "Ä¨": "Itilde",
              "Ä°": "Idot",
              "Ä¯": "iogon",
              "Ä®": "Iogon",
              "Ä«": "imacr",
              Äª: "Imacr",
              "Ä³": "ijlig",
              "Ä²": "IJlig",
              "Ä±": "imath",
              "ð’¿": "jscr",
              "ð•›": "jopf",
              "ð”§": "jfr",
              "ð’¥": "Jscr",
              "ð”": "Jfr",
              "ð•": "Jopf",
              Äµ: "jcirc",
              "Ä´": "Jcirc",
              "È·": "jmath",
              "ð•œ": "kopf",
              "ð“€": "kscr",
              "ð”¨": "kfr",
              "ð’¦": "Kscr",
              "ð•‚": "Kopf",
              "ð”Ž": "Kfr",
              "Ä·": "kcedil",
              "Ä¶": "Kcedil",
              "ð”©": "lfr",
              "ð“": "lscr",
              "â„“": "ell",
              "ð•": "lopf",
              "â„’": "Lscr",
              "ð”": "Lfr",
              "ð•ƒ": "Lopf",
              Äº: "lacute",
              "Ä¹": "Lacute",
              "Ä¾": "lcaron",
              "Ä½": "Lcaron",
              "Ä¼": "lcedil",
              "Ä»": "Lcedil",
              "Å‚": "lstrok",
              "Å": "Lstrok",
              "Å€": "lmidot",
              "Ä¿": "Lmidot",
              "ð”ª": "mfr",
              "ð•ž": "mopf",
              "ð“‚": "mscr",
              "ð”": "Mfr",
              "ð•„": "Mopf",
              "â„³": "Mscr",
              "ð”«": "nfr",
              "ð•Ÿ": "nopf",
              "ð“ƒ": "nscr",
              "â„•": "Nopf",
              "ð’©": "Nscr",
              "ð”‘": "Nfr",
              "Å„": "nacute",
              Åƒ: "Nacute",
              Åˆ: "ncaron",
              "Å‡": "Ncaron",
              "Ã±": "ntilde",
              "Ã‘": "Ntilde",
              "Å†": "ncedil",
              "Å…": "Ncedil",
              "â„–": "numero",
              "Å‹": "eng",
              ÅŠ: "ENG",
              "ð• ": "oopf",
              "ð”¬": "ofr",
              "â„´": "oscr",
              "ð’ª": "Oscr",
              "ð”’": "Ofr",
              "ð•†": "Oopf",
              Âº: "ordm",
              "Ã³": "oacute",
              "Ã“": "Oacute",
              "Ã²": "ograve",
              "Ã’": "Ograve",
              "Ã´": "ocirc",
              "Ã”": "Ocirc",
              "Ã¶": "ouml",
              "Ã–": "Ouml",
              "Å‘": "odblac",
              "Å": "Odblac",
              Ãµ: "otilde",
              "Ã•": "Otilde",
              "Ã¸": "oslash",
              "Ã˜": "Oslash",
              "Å": "omacr",
              ÅŒ: "Omacr",
              "Å“": "oelig",
              "Å’": "OElig",
              "ð”­": "pfr",
              "ð“…": "pscr",
              "ð•¡": "popf",
              "â„™": "Popf",
              "ð”“": "Pfr",
              "ð’«": "Pscr",
              "ð•¢": "qopf",
              "ð”®": "qfr",
              "ð“†": "qscr",
              "ð’¬": "Qscr",
              "ð””": "Qfr",
              "â„š": "Qopf",
              "Ä¸": "kgreen",
              "ð”¯": "rfr",
              "ð•£": "ropf",
              "ð“‡": "rscr",
              "â„›": "Rscr",
              "â„œ": "Re",
              "â„": "Ropf",
              "Å•": "racute",
              "Å”": "Racute",
              "Å™": "rcaron",
              "Å˜": "Rcaron",
              "Å—": "rcedil",
              "Å–": "Rcedil",
              "ð•¤": "sopf",
              "ð“ˆ": "sscr",
              "ð”°": "sfr",
              "ð•Š": "Sopf",
              "ð”–": "Sfr",
              "ð’®": "Sscr",
              "â“ˆ": "oS",
              "Å›": "sacute",
              Åš: "Sacute",
              "Å": "scirc",
              Åœ: "Scirc",
              "Å¡": "scaron",
              "Å ": "Scaron",
              ÅŸ: "scedil",
              Åž: "Scedil",
              ÃŸ: "szlig",
              "ð”±": "tfr",
              "ð“‰": "tscr",
              "ð•¥": "topf",
              "ð’¯": "Tscr",
              "ð”—": "Tfr",
              "ð•‹": "Topf",
              "Å¥": "tcaron",
              "Å¤": "Tcaron",
              "Å£": "tcedil",
              "Å¢": "Tcedil",
              "â„¢": "trade",
              "Å§": "tstrok",
              "Å¦": "Tstrok",
              "ð“Š": "uscr",
              "ð•¦": "uopf",
              "ð”²": "ufr",
              "ð•Œ": "Uopf",
              "ð”˜": "Ufr",
              "ð’°": "Uscr",
              Ãº: "uacute",
              Ãš: "Uacute",
              "Ã¹": "ugrave",
              "Ã™": "Ugrave",
              "Å­": "ubreve",
              "Å¬": "Ubreve",
              "Ã»": "ucirc",
              "Ã›": "Ucirc",
              "Å¯": "uring",
              "Å®": "Uring",
              "Ã¼": "uuml",
              Ãœ: "Uuml",
              "Å±": "udblac",
              "Å°": "Udblac",
              "Å©": "utilde",
              "Å¨": "Utilde",
              "Å³": "uogon",
              "Å²": "Uogon",
              "Å«": "umacr",
              Åª: "Umacr",
              "ð”³": "vfr",
              "ð•§": "vopf",
              "ð“‹": "vscr",
              "ð”™": "Vfr",
              "ð•": "Vopf",
              "ð’±": "Vscr",
              "ð•¨": "wopf",
              "ð“Œ": "wscr",
              "ð”´": "wfr",
              "ð’²": "Wscr",
              "ð•Ž": "Wopf",
              "ð”š": "Wfr",
              Åµ: "wcirc",
              "Å´": "Wcirc",
              "ð”µ": "xfr",
              "ð“": "xscr",
              "ð•©": "xopf",
              "ð•": "Xopf",
              "ð”›": "Xfr",
              "ð’³": "Xscr",
              "ð”¶": "yfr",
              "ð“Ž": "yscr",
              "ð•ª": "yopf",
              "ð’´": "Yscr",
              "ð”œ": "Yfr",
              "ð•": "Yopf",
              "Ã½": "yacute",
              "Ã": "Yacute",
              "Å·": "ycirc",
              "Å¶": "Ycirc",
              "Ã¿": "yuml",
              "Å¸": "Yuml",
              "ð“": "zscr",
              "ð”·": "zfr",
              "ð•«": "zopf",
              "â„¨": "Zfr",
              "â„¤": "Zopf",
              "ð’µ": "Zscr",
              Åº: "zacute",
              "Å¹": "Zacute",
              "Å¾": "zcaron",
              "Å½": "Zcaron",
              "Å¼": "zdot",
              "Å»": "Zdot",
              Æµ: "imped",
              "Ã¾": "thorn",
              Ãž: "THORN",
              "Å‰": "napos",
              "Î±": "alpha",
              "Î‘": "Alpha",
              "Î²": "beta",
              "Î’": "Beta",
              "Î³": "gamma",
              "Î“": "Gamma",
              "Î´": "delta",
              "Î”": "Delta",
              Îµ: "epsi",
              Ïµ: "epsiv",
              "Î•": "Epsilon",
              "Ï": "gammad",
              Ïœ: "Gammad",
              "Î¶": "zeta",
              "Î–": "Zeta",
              "Î·": "eta",
              "Î—": "Eta",
              "Î¸": "theta",
              "Ï‘": "thetav",
              "Î˜": "Theta",
              "Î¹": "iota",
              "Î™": "Iota",
              Îº: "kappa",
              "Ï°": "kappav",
              Îš: "Kappa",
              "Î»": "lambda",
              "Î›": "Lambda",
              "Î¼": "mu",
              Âµ: "micro",
              Îœ: "Mu",
              "Î½": "nu",
              "Î": "Nu",
              "Î¾": "xi",
              Îž: "Xi",
              "Î¿": "omicron",
              ÎŸ: "Omicron",
              "Ï€": "pi",
              "Ï–": "piv",
              "Î ": "Pi",
              "Ï": "rho",
              "Ï±": "rhov",
              "Î¡": "Rho",
              Ïƒ: "sigma",
              "Î£": "Sigma",
              "Ï‚": "sigmaf",
              "Ï„": "tau",
              "Î¤": "Tau",
              "Ï…": "upsi",
              "Î¥": "Upsilon",
              "Ï’": "Upsi",
              "Ï†": "phi",
              "Ï•": "phiv",
              "Î¦": "Phi",
              "Ï‡": "chi",
              "Î§": "Chi",
              Ïˆ: "psi",
              "Î¨": "Psi",
              "Ï‰": "omega",
              "Î©": "ohm",
              "Ð°": "acy",
              "Ð": "Acy",
              "Ð±": "bcy",
              "Ð‘": "Bcy",
              "Ð²": "vcy",
              "Ð’": "Vcy",
              "Ð³": "gcy",
              "Ð“": "Gcy",
              "Ñ“": "gjcy",
              Ðƒ: "GJcy",
              "Ð´": "dcy",
              "Ð”": "Dcy",
              "Ñ’": "djcy",
              "Ð‚": "DJcy",
              Ðµ: "iecy",
              "Ð•": "IEcy",
              "Ñ‘": "iocy",
              "Ð": "IOcy",
              "Ñ”": "jukcy",
              "Ð„": "Jukcy",
              "Ð¶": "zhcy",
              "Ð–": "ZHcy",
              "Ð·": "zcy",
              "Ð—": "Zcy",
              "Ñ•": "dscy",
              "Ð…": "DScy",
              "Ð¸": "icy",
              "Ð˜": "Icy",
              "Ñ–": "iukcy",
              "Ð†": "Iukcy",
              "Ñ—": "yicy",
              "Ð‡": "YIcy",
              "Ð¹": "jcy",
              "Ð™": "Jcy",
              "Ñ˜": "jsercy",
              Ðˆ: "Jsercy",
              Ðº: "kcy",
              Ðš: "Kcy",
              Ñœ: "kjcy",
              ÐŒ: "KJcy",
              "Ð»": "lcy",
              "Ð›": "Lcy",
              "Ñ™": "ljcy",
              "Ð‰": "LJcy",
              "Ð¼": "mcy",
              Ðœ: "Mcy",
              "Ð½": "ncy",
              "Ð": "Ncy",
              Ñš: "njcy",
              ÐŠ: "NJcy",
              "Ð¾": "ocy",
              Ðž: "Ocy",
              "Ð¿": "pcy",
              ÐŸ: "Pcy",
              "Ñ€": "rcy",
              "Ð ": "Rcy",
              "Ñ": "scy",
              "Ð¡": "Scy",
              "Ñ‚": "tcy",
              "Ð¢": "Tcy",
              "Ñ›": "tshcy",
              "Ð‹": "TSHcy",
              Ñƒ: "ucy",
              "Ð£": "Ucy",
              Ñž: "ubrcy",
              ÐŽ: "Ubrcy",
              "Ñ„": "fcy",
              "Ð¤": "Fcy",
              "Ñ…": "khcy",
              "Ð¥": "KHcy",
              "Ñ†": "tscy",
              "Ð¦": "TScy",
              "Ñ‡": "chcy",
              "Ð§": "CHcy",
              ÑŸ: "dzcy",
              "Ð": "DZcy",
              Ñˆ: "shcy",
              "Ð¨": "SHcy",
              "Ñ‰": "shchcy",
              "Ð©": "SHCHcy",
              ÑŠ: "hardcy",
              Ðª: "HARDcy",
              "Ñ‹": "ycy",
              "Ð«": "Ycy",
              ÑŒ: "softcy",
              "Ð¬": "SOFTcy",
              "Ñ": "ecy",
              "Ð­": "Ecy",
              ÑŽ: "yucy",
              "Ð®": "YUcy",
              "Ñ": "yacy",
              "Ð¯": "YAcy",
              "â„µ": "aleph",
              "â„¶": "beth",
              "â„·": "gimel",
              "â„¸": "daleth",
            },
            g = /["&'<>`]/g,
            p = {
              '"': "&quot;",
              "&": "&amp;",
              "'": "&#x27;",
              "<": "&lt;",
              ">": "&gt;",
              "`": "&#x60;",
            },
            h = /&#(?:[xX][^a-fA-F0-9]|[^0-9xX])/,
            f =
              /[\0-\x08\x0B\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]|[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,
            m =
              /&(CounterClockwiseContourIntegral|DoubleLongLeftRightArrow|ClockwiseContourIntegral|NotNestedGreaterGreater|NotSquareSupersetEqual|DiacriticalDoubleAcute|NotRightTriangleEqual|NotSucceedsSlantEqual|NotPrecedesSlantEqual|CloseCurlyDoubleQuote|NegativeVeryThinSpace|DoubleContourIntegral|FilledVerySmallSquare|CapitalDifferentialD|OpenCurlyDoubleQuote|EmptyVerySmallSquare|NestedGreaterGreater|DoubleLongRightArrow|NotLeftTriangleEqual|NotGreaterSlantEqual|ReverseUpEquilibrium|DoubleLeftRightArrow|NotSquareSubsetEqual|NotDoubleVerticalBar|RightArrowLeftArrow|NotGreaterFullEqual|NotRightTriangleBar|SquareSupersetEqual|DownLeftRightVector|DoubleLongLeftArrow|leftrightsquigarrow|LeftArrowRightArrow|NegativeMediumSpace|blacktriangleright|RightDownVectorBar|PrecedesSlantEqual|RightDoubleBracket|SucceedsSlantEqual|NotLeftTriangleBar|RightTriangleEqual|SquareIntersection|RightDownTeeVector|ReverseEquilibrium|NegativeThickSpace|longleftrightarrow|Longleftrightarrow|LongLeftRightArrow|DownRightTeeVector|DownRightVectorBar|GreaterSlantEqual|SquareSubsetEqual|LeftDownVectorBar|LeftDoubleBracket|VerticalSeparator|rightleftharpoons|NotGreaterGreater|NotSquareSuperset|blacktriangleleft|blacktriangledown|NegativeThinSpace|LeftDownTeeVector|NotLessSlantEqual|leftrightharpoons|DoubleUpDownArrow|DoubleVerticalBar|LeftTriangleEqual|FilledSmallSquare|twoheadrightarrow|NotNestedLessLess|DownLeftTeeVector|DownLeftVectorBar|RightAngleBracket|NotTildeFullEqual|NotReverseElement|RightUpDownVector|DiacriticalTilde|NotSucceedsTilde|circlearrowright|NotPrecedesEqual|rightharpoondown|DoubleRightArrow|NotSucceedsEqual|NonBreakingSpace|NotRightTriangle|LessEqualGreater|RightUpTeeVector|LeftAngleBracket|GreaterFullEqual|DownArrowUpArrow|RightUpVectorBar|twoheadleftarrow|GreaterEqualLess|downharpoonright|RightTriangleBar|ntrianglerighteq|NotSupersetEqual|LeftUpDownVector|DiacriticalAcute|rightrightarrows|vartriangleright|UpArrowDownArrow|DiacriticalGrave|UnderParenthesis|EmptySmallSquare|LeftUpVectorBar|leftrightarrows|DownRightVector|downharpoonleft|trianglerighteq|ShortRightArrow|OverParenthesis|DoubleLeftArrow|DoubleDownArrow|NotSquareSubset|bigtriangledown|ntrianglelefteq|UpperRightArrow|curvearrowright|vartriangleleft|NotLeftTriangle|nleftrightarrow|LowerRightArrow|NotHumpDownHump|NotGreaterTilde|rightthreetimes|LeftUpTeeVector|NotGreaterEqual|straightepsilon|LeftTriangleBar|rightsquigarrow|ContourIntegral|rightleftarrows|CloseCurlyQuote|RightDownVector|LeftRightVector|nLeftrightarrow|leftharpoondown|circlearrowleft|SquareSuperset|OpenCurlyQuote|hookrightarrow|HorizontalLine|DiacriticalDot|NotLessGreater|ntriangleright|DoubleRightTee|InvisibleComma|InvisibleTimes|LowerLeftArrow|DownLeftVector|NotSubsetEqual|curvearrowleft|trianglelefteq|NotVerticalBar|TildeFullEqual|downdownarrows|NotGreaterLess|RightTeeVector|ZeroWidthSpace|looparrowright|LongRightArrow|doublebarwedge|ShortLeftArrow|ShortDownArrow|RightVectorBar|GreaterGreater|ReverseElement|rightharpoonup|LessSlantEqual|leftthreetimes|upharpoonright|rightarrowtail|LeftDownVector|Longrightarrow|NestedLessLess|UpperLeftArrow|nshortparallel|leftleftarrows|leftrightarrow|Leftrightarrow|LeftRightArrow|longrightarrow|upharpoonleft|RightArrowBar|ApplyFunction|LeftTeeVector|leftarrowtail|NotEqualTilde|varsubsetneqq|varsupsetneqq|RightTeeArrow|SucceedsEqual|SucceedsTilde|LeftVectorBar|SupersetEqual|hookleftarrow|DifferentialD|VerticalTilde|VeryThinSpace|blacktriangle|bigtriangleup|LessFullEqual|divideontimes|leftharpoonup|UpEquilibrium|ntriangleleft|RightTriangle|measuredangle|shortparallel|longleftarrow|Longleftarrow|LongLeftArrow|DoubleLeftTee|Poincareplane|PrecedesEqual|triangleright|DoubleUpArrow|RightUpVector|fallingdotseq|looparrowleft|PrecedesTilde|NotTildeEqual|NotTildeTilde|smallsetminus|Proportional|triangleleft|triangledown|UnderBracket|NotHumpEqual|exponentiale|ExponentialE|NotLessTilde|HilbertSpace|RightCeiling|blacklozenge|varsupsetneq|HumpDownHump|GreaterEqual|VerticalLine|LeftTeeArrow|NotLessEqual|DownTeeArrow|LeftTriangle|varsubsetneq|Intersection|NotCongruent|DownArrowBar|LeftUpVector|LeftArrowBar|risingdotseq|GreaterTilde|RoundImplies|SquareSubset|ShortUpArrow|NotSuperset|quaternions|precnapprox|backepsilon|preccurlyeq|OverBracket|blacksquare|MediumSpace|VerticalBar|circledcirc|circleddash|CircleMinus|CircleTimes|LessGreater|curlyeqprec|curlyeqsucc|diamondsuit|UpDownArrow|Updownarrow|RuleDelayed|Rrightarrow|updownarrow|RightVector|nRightarrow|nrightarrow|eqslantless|LeftCeiling|Equilibrium|SmallCircle|expectation|NotSucceeds|thickapprox|GreaterLess|SquareUnion|NotPrecedes|NotLessLess|straightphi|succnapprox|succcurlyeq|SubsetEqual|sqsupseteq|Proportion|Laplacetrf|ImaginaryI|supsetneqq|NotGreater|gtreqqless|NotElement|ThickSpace|TildeEqual|TildeTilde|Fouriertrf|rmoustache|EqualTilde|eqslantgtr|UnderBrace|LeftVector|UpArrowBar|nLeftarrow|nsubseteqq|subsetneqq|nsupseteqq|nleftarrow|succapprox|lessapprox|UpTeeArrow|upuparrows|curlywedge|lesseqqgtr|varepsilon|varnothing|RightFloor|complement|CirclePlus|sqsubseteq|Lleftarrow|circledast|RightArrow|Rightarrow|rightarrow|lmoustache|Bernoullis|precapprox|mapstoleft|mapstodown|longmapsto|dotsquare|downarrow|DoubleDot|nsubseteq|supsetneq|leftarrow|nsupseteq|subsetneq|ThinSpace|ngeqslant|subseteqq|HumpEqual|NotSubset|triangleq|NotCupCap|lesseqgtr|heartsuit|TripleDot|Leftarrow|Coproduct|Congruent|varpropto|complexes|gvertneqq|LeftArrow|LessTilde|supseteqq|MinusPlus|CircleDot|nleqslant|NotExists|gtreqless|nparallel|UnionPlus|LeftFloor|checkmark|CenterDot|centerdot|Mellintrf|gtrapprox|bigotimes|OverBrace|spadesuit|therefore|pitchfork|rationals|PlusMinus|Backslash|Therefore|DownBreve|backsimeq|backprime|DownArrow|nshortmid|Downarrow|lvertneqq|eqvparsl|imagline|imagpart|infintie|integers|Integral|intercal|LessLess|Uarrocir|intlarhk|sqsupset|angmsdaf|sqsubset|llcorner|vartheta|cupbrcap|lnapprox|Superset|SuchThat|succnsim|succneqq|angmsdag|biguplus|curlyvee|trpezium|Succeeds|NotTilde|bigwedge|angmsdah|angrtvbd|triminus|cwconint|fpartint|lrcorner|smeparsl|subseteq|urcorner|lurdshar|laemptyv|DDotrahd|approxeq|ldrushar|awconint|mapstoup|backcong|shortmid|triangle|geqslant|gesdotol|timesbar|circledR|circledS|setminus|multimap|naturals|scpolint|ncongdot|RightTee|boxminus|gnapprox|boxtimes|andslope|thicksim|angmsdaa|varsigma|cirfnint|rtriltri|angmsdab|rppolint|angmsdac|barwedge|drbkarow|clubsuit|thetasym|bsolhsub|capbrcup|dzigrarr|doteqdot|DotEqual|dotminus|UnderBar|NotEqual|realpart|otimesas|ulcorner|hksearow|hkswarow|parallel|PartialD|elinters|emptyset|plusacir|bbrktbrk|angmsdad|pointint|bigoplus|angmsdae|Precedes|bigsqcup|varkappa|notindot|supseteq|precneqq|precnsim|profalar|profline|profsurf|leqslant|lesdotor|raemptyv|subplus|notnivb|notnivc|subrarr|zigrarr|vzigzag|submult|subedot|Element|between|cirscir|larrbfs|larrsim|lotimes|lbrksld|lbrkslu|lozenge|ldrdhar|dbkarow|bigcirc|epsilon|simrarr|simplus|ltquest|Epsilon|luruhar|gtquest|maltese|npolint|eqcolon|npreceq|bigodot|ddagger|gtrless|bnequiv|harrcir|ddotseq|equivDD|backsim|demptyv|nsqsube|nsqsupe|Upsilon|nsubset|upsilon|minusdu|nsucceq|swarrow|nsupset|coloneq|searrow|boxplus|napprox|natural|asympeq|alefsym|congdot|nearrow|bigstar|diamond|supplus|tritime|LeftTee|nvinfin|triplus|NewLine|nvltrie|nvrtrie|nwarrow|nexists|Diamond|ruluhar|Implies|supmult|angzarr|suplarr|suphsub|questeq|because|digamma|Because|olcross|bemptyv|omicron|Omicron|rotimes|NoBreak|intprod|angrtvb|orderof|uwangle|suphsol|lesdoto|orslope|DownTee|realine|cudarrl|rdldhar|OverBar|supedot|lessdot|supdsub|topfork|succsim|rbrkslu|rbrksld|pertenk|cudarrr|isindot|planckh|lessgtr|pluscir|gesdoto|plussim|plustwo|lesssim|cularrp|rarrsim|Cayleys|notinva|notinvb|notinvc|UpArrow|Uparrow|uparrow|NotLess|dwangle|precsim|Product|curarrm|Cconint|dotplus|rarrbfs|ccupssm|Cedilla|cemptyv|notniva|quatint|frac35|frac38|frac45|frac56|frac58|frac78|tridot|xoplus|gacute|gammad|Gammad|lfisht|lfloor|bigcup|sqsupe|gbreve|Gbreve|lharul|sqsube|sqcups|Gcedil|apacir|llhard|lmidot|Lmidot|lmoust|andand|sqcaps|approx|Abreve|spades|circeq|tprime|divide|topcir|Assign|topbot|gesdot|divonx|xuplus|timesd|gesles|atilde|solbar|SOFTcy|loplus|timesb|lowast|lowbar|dlcorn|dlcrop|softcy|dollar|lparlt|thksim|lrhard|Atilde|lsaquo|smashp|bigvee|thinsp|wreath|bkarow|lsquor|lstrok|Lstrok|lthree|ltimes|ltlarr|DotDot|simdot|ltrPar|weierp|xsqcup|angmsd|sigmav|sigmaf|zeetrf|Zcaron|zcaron|mapsto|vsupne|thetav|cirmid|marker|mcomma|Zacute|vsubnE|there4|gtlPar|vsubne|bottom|gtrarr|SHCHcy|shchcy|midast|midcir|middot|minusb|minusd|gtrdot|bowtie|sfrown|mnplus|models|colone|seswar|Colone|mstpos|searhk|gtrsim|nacute|Nacute|boxbox|telrec|hairsp|Tcedil|nbumpe|scnsim|ncaron|Ncaron|ncedil|Ncedil|hamilt|Scedil|nearhk|hardcy|HARDcy|tcedil|Tcaron|commat|nequiv|nesear|tcaron|target|hearts|nexist|varrho|scedil|Scaron|scaron|hellip|Sacute|sacute|hercon|swnwar|compfn|rtimes|rthree|rsquor|rsaquo|zacute|wedgeq|homtht|barvee|barwed|Barwed|rpargt|horbar|conint|swarhk|roplus|nltrie|hslash|hstrok|Hstrok|rmoust|Conint|bprime|hybull|hyphen|iacute|Iacute|supsup|supsub|supsim|varphi|coprod|brvbar|agrave|Supset|supset|igrave|Igrave|notinE|Agrave|iiiint|iinfin|copysr|wedbar|Verbar|vangrt|becaus|incare|verbar|inodot|bullet|drcorn|intcal|drcrop|cularr|vellip|Utilde|bumpeq|cupcap|dstrok|Dstrok|CupCap|cupcup|cupdot|eacute|Eacute|supdot|iquest|easter|ecaron|Ecaron|ecolon|isinsv|utilde|itilde|Itilde|curarr|succeq|Bumpeq|cacute|ulcrop|nparsl|Cacute|nprcue|egrave|Egrave|nrarrc|nrarrw|subsup|subsub|nrtrie|jsercy|nsccue|Jsercy|kappav|kcedil|Kcedil|subsim|ulcorn|nsimeq|egsdot|veebar|kgreen|capand|elsdot|Subset|subset|curren|aacute|lacute|Lacute|emptyv|ntilde|Ntilde|lagran|lambda|Lambda|capcap|Ugrave|langle|subdot|emsp13|numero|emsp14|nvdash|nvDash|nVdash|nVDash|ugrave|ufisht|nvHarr|larrfs|nvlArr|larrhk|larrlp|larrpl|nvrArr|Udblac|nwarhk|larrtl|nwnear|oacute|Oacute|latail|lAtail|sstarf|lbrace|odblac|Odblac|lbrack|udblac|odsold|eparsl|lcaron|Lcaron|ograve|Ograve|lcedil|Lcedil|Aacute|ssmile|ssetmn|squarf|ldquor|capcup|ominus|cylcty|rharul|eqcirc|dagger|rfloor|rfisht|Dagger|daleth|equals|origof|capdot|equest|dcaron|Dcaron|rdquor|oslash|Oslash|otilde|Otilde|otimes|Otimes|urcrop|Ubreve|ubreve|Yacute|Uacute|uacute|Rcedil|rcedil|urcorn|parsim|Rcaron|Vdashl|rcaron|Tstrok|percnt|period|permil|Exists|yacute|rbrack|rbrace|phmmat|ccaron|Ccaron|planck|ccedil|plankv|tstrok|female|plusdo|plusdu|ffilig|plusmn|ffllig|Ccedil|rAtail|dfisht|bernou|ratail|Rarrtl|rarrtl|angsph|rarrpl|rarrlp|rarrhk|xwedge|xotime|forall|ForAll|Vvdash|vsupnE|preceq|bigcap|frac12|frac13|frac14|primes|rarrfs|prnsim|frac15|Square|frac16|square|lesdot|frac18|frac23|propto|prurel|rarrap|rangle|puncsp|frac25|Racute|qprime|racute|lesges|frac34|abreve|AElig|eqsim|utdot|setmn|urtri|Equal|Uring|seArr|uring|searr|dashv|Dashv|mumap|nabla|iogon|Iogon|sdote|sdotb|scsim|napid|napos|equiv|natur|Acirc|dblac|erarr|nbump|iprod|erDot|ucirc|awint|esdot|angrt|ncong|isinE|scnap|Scirc|scirc|ndash|isins|Ubrcy|nearr|neArr|isinv|nedot|ubrcy|acute|Ycirc|iukcy|Iukcy|xutri|nesim|caret|jcirc|Jcirc|caron|twixt|ddarr|sccue|exist|jmath|sbquo|ngeqq|angst|ccaps|lceil|ngsim|UpTee|delta|Delta|rtrif|nharr|nhArr|nhpar|rtrie|jukcy|Jukcy|kappa|rsquo|Kappa|nlarr|nlArr|TSHcy|rrarr|aogon|Aogon|fflig|xrarr|tshcy|ccirc|nleqq|filig|upsih|nless|dharl|nlsim|fjlig|ropar|nltri|dharr|robrk|roarr|fllig|fltns|roang|rnmid|subnE|subne|lAarr|trisb|Ccirc|acirc|ccups|blank|VDash|forkv|Vdash|langd|cedil|blk12|blk14|laquo|strns|diams|notin|vDash|larrb|blk34|block|disin|uplus|vdash|vBarv|aelig|starf|Wedge|check|xrArr|lates|lbarr|lBarr|notni|lbbrk|bcong|frasl|lbrke|frown|vrtri|vprop|vnsup|gamma|Gamma|wedge|xodot|bdquo|srarr|doteq|ldquo|boxdl|boxdL|gcirc|Gcirc|boxDl|boxDL|boxdr|boxdR|boxDr|TRADE|trade|rlhar|boxDR|vnsub|npart|vltri|rlarr|boxhd|boxhD|nprec|gescc|nrarr|nrArr|boxHd|boxHD|boxhu|boxhU|nrtri|boxHu|clubs|boxHU|times|colon|Colon|gimel|xlArr|Tilde|nsime|tilde|nsmid|nspar|THORN|thorn|xlarr|nsube|nsubE|thkap|xhArr|comma|nsucc|boxul|boxuL|nsupe|nsupE|gneqq|gnsim|boxUl|boxUL|grave|boxur|boxuR|boxUr|boxUR|lescc|angle|bepsi|boxvh|varpi|boxvH|numsp|Theta|gsime|gsiml|theta|boxVh|boxVH|boxvl|gtcir|gtdot|boxvL|boxVl|boxVL|crarr|cross|Cross|nvsim|boxvr|nwarr|nwArr|sqsup|dtdot|Uogon|lhard|lharu|dtrif|ocirc|Ocirc|lhblk|duarr|odash|sqsub|Hacek|sqcup|llarr|duhar|oelig|OElig|ofcir|boxvR|uogon|lltri|boxVr|csube|uuarr|ohbar|csupe|ctdot|olarr|olcir|harrw|oline|sqcap|omacr|Omacr|omega|Omega|boxVR|aleph|lneqq|lnsim|loang|loarr|rharu|lobrk|hcirc|operp|oplus|rhard|Hcirc|orarr|Union|order|ecirc|Ecirc|cuepr|szlig|cuesc|breve|reals|eDDot|Breve|hoarr|lopar|utrif|rdquo|Umacr|umacr|efDot|swArr|ultri|alpha|rceil|ovbar|swarr|Wcirc|wcirc|smtes|smile|bsemi|lrarr|aring|parsl|lrhar|bsime|uhblk|lrtri|cupor|Aring|uharr|uharl|slarr|rbrke|bsolb|lsime|rbbrk|RBarr|lsimg|phone|rBarr|rbarr|icirc|lsquo|Icirc|emacr|Emacr|ratio|simne|plusb|simlE|simgE|simeq|pluse|ltcir|ltdot|empty|xharr|xdtri|iexcl|Alpha|ltrie|rarrw|pound|ltrif|xcirc|bumpe|prcue|bumpE|asymp|amacr|cuvee|Sigma|sigma|iiint|udhar|iiota|ijlig|IJlig|supnE|imacr|Imacr|prime|Prime|image|prnap|eogon|Eogon|rarrc|mdash|mDDot|cuwed|imath|supne|imped|Amacr|udarr|prsim|micro|rarrb|cwint|raquo|infin|eplus|range|rangd|Ucirc|radic|minus|amalg|veeeq|rAarr|epsiv|ycirc|quest|sharp|quot|zwnj|Qscr|race|qscr|Qopf|qopf|qint|rang|Rang|Zscr|zscr|Zopf|zopf|rarr|rArr|Rarr|Pscr|pscr|prop|prod|prnE|prec|ZHcy|zhcy|prap|Zeta|zeta|Popf|popf|Zdot|plus|zdot|Yuml|yuml|phiv|YUcy|yucy|Yscr|yscr|perp|Yopf|yopf|part|para|YIcy|Ouml|rcub|yicy|YAcy|rdca|ouml|osol|Oscr|rdsh|yacy|real|oscr|xvee|andd|rect|andv|Xscr|oror|ordm|ordf|xscr|ange|aopf|Aopf|rHar|Xopf|opar|Oopf|xopf|xnis|rhov|oopf|omid|xmap|oint|apid|apos|ogon|ascr|Ascr|odot|odiv|xcup|xcap|ocir|oast|nvlt|nvle|nvgt|nvge|nvap|Wscr|wscr|auml|ntlg|ntgl|nsup|nsub|nsim|Nscr|nscr|nsce|Wopf|ring|npre|wopf|npar|Auml|Barv|bbrk|Nopf|nopf|nmid|nLtv|beta|ropf|Ropf|Beta|beth|nles|rpar|nleq|bnot|bNot|nldr|NJcy|rscr|Rscr|Vscr|vscr|rsqb|njcy|bopf|nisd|Bopf|rtri|Vopf|nGtv|ngtr|vopf|boxh|boxH|boxv|nges|ngeq|boxV|bscr|scap|Bscr|bsim|Vert|vert|bsol|bull|bump|caps|cdot|ncup|scnE|ncap|nbsp|napE|Cdot|cent|sdot|Vbar|nang|vBar|chcy|Mscr|mscr|sect|semi|CHcy|Mopf|mopf|sext|circ|cire|mldr|mlcp|cirE|comp|shcy|SHcy|vArr|varr|cong|copf|Copf|copy|COPY|malt|male|macr|lvnE|cscr|ltri|sime|ltcc|simg|Cscr|siml|csub|Uuml|lsqb|lsim|uuml|csup|Lscr|lscr|utri|smid|lpar|cups|smte|lozf|darr|Lopf|Uscr|solb|lopf|sopf|Sopf|lneq|uscr|spar|dArr|lnap|Darr|dash|Sqrt|LJcy|ljcy|lHar|dHar|Upsi|upsi|diam|lesg|djcy|DJcy|leqq|dopf|Dopf|dscr|Dscr|dscy|ldsh|ldca|squf|DScy|sscr|Sscr|dsol|lcub|late|star|Star|Uopf|Larr|lArr|larr|uopf|dtri|dzcy|sube|subE|Lang|lang|Kscr|kscr|Kopf|kopf|KJcy|kjcy|KHcy|khcy|DZcy|ecir|edot|eDot|Jscr|jscr|succ|Jopf|jopf|Edot|uHar|emsp|ensp|Iuml|iuml|eopf|isin|Iscr|iscr|Eopf|epar|sung|epsi|escr|sup1|sup2|sup3|Iota|iota|supe|supE|Iopf|iopf|IOcy|iocy|Escr|esim|Esim|imof|Uarr|QUOT|uArr|uarr|euml|IEcy|iecy|Idot|Euml|euro|excl|Hscr|hscr|Hopf|hopf|TScy|tscy|Tscr|hbar|tscr|flat|tbrk|fnof|hArr|harr|half|fopf|Fopf|tdot|gvnE|fork|trie|gtcc|fscr|Fscr|gdot|gsim|Gscr|gscr|Gopf|gopf|gneq|Gdot|tosa|gnap|Topf|topf|geqq|toea|GJcy|gjcy|tint|gesl|mid|Sfr|ggg|top|ges|gla|glE|glj|geq|gne|gEl|gel|gnE|Gcy|gcy|gap|Tfr|tfr|Tcy|tcy|Hat|Tau|Ffr|tau|Tab|hfr|Hfr|ffr|Fcy|fcy|icy|Icy|iff|ETH|eth|ifr|Ifr|Eta|eta|int|Int|Sup|sup|ucy|Ucy|Sum|sum|jcy|ENG|ufr|Ufr|eng|Jcy|jfr|els|ell|egs|Efr|efr|Jfr|uml|kcy|Kcy|Ecy|ecy|kfr|Kfr|lap|Sub|sub|lat|lcy|Lcy|leg|Dot|dot|lEg|leq|les|squ|div|die|lfr|Lfr|lgE|Dfr|dfr|Del|deg|Dcy|dcy|lne|lnE|sol|loz|smt|Cup|lrm|cup|lsh|Lsh|sim|shy|map|Map|mcy|Mcy|mfr|Mfr|mho|gfr|Gfr|sfr|cir|Chi|chi|nap|Cfr|vcy|Vcy|cfr|Scy|scy|ncy|Ncy|vee|Vee|Cap|cap|nfr|scE|sce|Nfr|nge|ngE|nGg|vfr|Vfr|ngt|bot|nGt|nis|niv|Rsh|rsh|nle|nlE|bne|Bfr|bfr|nLl|nlt|nLt|Bcy|bcy|not|Not|rlm|wfr|Wfr|npr|nsc|num|ocy|ast|Ocy|ofr|xfr|Xfr|Ofr|ogt|ohm|apE|olt|Rho|ape|rho|Rfr|rfr|ord|REG|ang|reg|orv|And|and|AMP|Rcy|amp|Afr|ycy|Ycy|yen|yfr|Yfr|rcy|par|pcy|Pcy|pfr|Pfr|phi|Phi|afr|Acy|acy|zcy|Zcy|piv|acE|acd|zfr|Zfr|pre|prE|psi|Psi|qfr|Qfr|zwj|Or|ge|Gg|gt|gg|el|oS|lt|Lt|LT|Re|lg|gl|eg|ne|Im|it|le|DD|wp|wr|nu|Nu|dd|lE|Sc|sc|pi|Pi|ee|af|ll|Ll|rx|gE|xi|pm|Xi|ic|pr|Pr|in|ni|mp|mu|ac|Mu|or|ap|Gt|GT|ii);|&(Aacute|Agrave|Atilde|Ccedil|Eacute|Egrave|Iacute|Igrave|Ntilde|Oacute|Ograve|Oslash|Otilde|Uacute|Ugrave|Yacute|aacute|agrave|atilde|brvbar|ccedil|curren|divide|eacute|egrave|frac12|frac14|frac34|iacute|igrave|iquest|middot|ntilde|oacute|ograve|oslash|otilde|plusmn|uacute|ugrave|yacute|AElig|Acirc|Aring|Ecirc|Icirc|Ocirc|THORN|Ucirc|acirc|acute|aelig|aring|cedil|ecirc|icirc|iexcl|laquo|micro|ocirc|pound|raquo|szlig|thorn|times|ucirc|Auml|COPY|Euml|Iuml|Ouml|QUOT|Uuml|auml|cent|copy|euml|iuml|macr|nbsp|ordf|ordm|ouml|para|quot|sect|sup1|sup2|sup3|uuml|yuml|AMP|ETH|REG|amp|deg|eth|not|reg|shy|uml|yen|GT|LT|gt|lt)(?!;)([=a-zA-Z0-9]?)|&#([0-9]+)(;?)|&#[xX]([a-fA-F0-9]+)(;?)|&([0-9a-zA-Z]+)/g,
            S = {
              aacute: "Ã¡",
              Aacute: "Ã",
              abreve: "Äƒ",
              Abreve: "Ä‚",
              ac: "âˆ¾",
              acd: "âˆ¿",
              acE: "âˆ¾Ì³",
              acirc: "Ã¢",
              Acirc: "Ã‚",
              acute: "Â´",
              acy: "Ð°",
              Acy: "Ð",
              aelig: "Ã¦",
              AElig: "Ã†",
              af: "â¡",
              afr: "ð”ž",
              Afr: "ð”„",
              agrave: "Ã ",
              Agrave: "Ã€",
              alefsym: "â„µ",
              aleph: "â„µ",
              alpha: "Î±",
              Alpha: "Î‘",
              amacr: "Ä",
              Amacr: "Ä€",
              amalg: "â¨¿",
              amp: "&",
              AMP: "&",
              and: "âˆ§",
              And: "â©“",
              andand: "â©•",
              andd: "â©œ",
              andslope: "â©˜",
              andv: "â©š",
              ang: "âˆ ",
              ange: "â¦¤",
              angle: "âˆ ",
              angmsd: "âˆ¡",
              angmsdaa: "â¦¨",
              angmsdab: "â¦©",
              angmsdac: "â¦ª",
              angmsdad: "â¦«",
              angmsdae: "â¦¬",
              angmsdaf: "â¦­",
              angmsdag: "â¦®",
              angmsdah: "â¦¯",
              angrt: "âˆŸ",
              angrtvb: "âŠ¾",
              angrtvbd: "â¦",
              angsph: "âˆ¢",
              angst: "Ã…",
              angzarr: "â¼",
              aogon: "Ä…",
              Aogon: "Ä„",
              aopf: "ð•’",
              Aopf: "ð”¸",
              ap: "â‰ˆ",
              apacir: "â©¯",
              ape: "â‰Š",
              apE: "â©°",
              apid: "â‰‹",
              apos: "'",
              ApplyFunction: "â¡",
              approx: "â‰ˆ",
              approxeq: "â‰Š",
              aring: "Ã¥",
              Aring: "Ã…",
              ascr: "ð’¶",
              Ascr: "ð’œ",
              Assign: "â‰”",
              ast: "*",
              asymp: "â‰ˆ",
              asympeq: "â‰",
              atilde: "Ã£",
              Atilde: "Ãƒ",
              auml: "Ã¤",
              Auml: "Ã„",
              awconint: "âˆ³",
              awint: "â¨‘",
              backcong: "â‰Œ",
              backepsilon: "Ï¶",
              backprime: "â€µ",
              backsim: "âˆ½",
              backsimeq: "â‹",
              Backslash: "âˆ–",
              Barv: "â«§",
              barvee: "âŠ½",
              barwed: "âŒ…",
              Barwed: "âŒ†",
              barwedge: "âŒ…",
              bbrk: "âŽµ",
              bbrktbrk: "âŽ¶",
              bcong: "â‰Œ",
              bcy: "Ð±",
              Bcy: "Ð‘",
              bdquo: "â€ž",
              becaus: "âˆµ",
              because: "âˆµ",
              Because: "âˆµ",
              bemptyv: "â¦°",
              bepsi: "Ï¶",
              bernou: "â„¬",
              Bernoullis: "â„¬",
              beta: "Î²",
              Beta: "Î’",
              beth: "â„¶",
              between: "â‰¬",
              bfr: "ð”Ÿ",
              Bfr: "ð”…",
              bigcap: "â‹‚",
              bigcirc: "â—¯",
              bigcup: "â‹ƒ",
              bigodot: "â¨€",
              bigoplus: "â¨",
              bigotimes: "â¨‚",
              bigsqcup: "â¨†",
              bigstar: "â˜…",
              bigtriangledown: "â–½",
              bigtriangleup: "â–³",
              biguplus: "â¨„",
              bigvee: "â‹",
              bigwedge: "â‹€",
              bkarow: "â¤",
              blacklozenge: "â§«",
              blacksquare: "â–ª",
              blacktriangle: "â–´",
              blacktriangledown: "â–¾",
              blacktriangleleft: "â—‚",
              blacktriangleright: "â–¸",
              blank: "â£",
              blk12: "â–’",
              blk14: "â–‘",
              blk34: "â–“",
              block: "â–ˆ",
              bne: "=âƒ¥",
              bnequiv: "â‰¡âƒ¥",
              bnot: "âŒ",
              bNot: "â«­",
              bopf: "ð•“",
              Bopf: "ð”¹",
              bot: "âŠ¥",
              bottom: "âŠ¥",
              bowtie: "â‹ˆ",
              boxbox: "â§‰",
              boxdl: "â”",
              boxdL: "â••",
              boxDl: "â•–",
              boxDL: "â•—",
              boxdr: "â”Œ",
              boxdR: "â•’",
              boxDr: "â•“",
              boxDR: "â•”",
              boxh: "â”€",
              boxH: "â•",
              boxhd: "â”¬",
              boxhD: "â•¥",
              boxHd: "â•¤",
              boxHD: "â•¦",
              boxhu: "â”´",
              boxhU: "â•¨",
              boxHu: "â•§",
              boxHU: "â•©",
              boxminus: "âŠŸ",
              boxplus: "âŠž",
              boxtimes: "âŠ ",
              boxul: "â”˜",
              boxuL: "â•›",
              boxUl: "â•œ",
              boxUL: "â•",
              boxur: "â””",
              boxuR: "â•˜",
              boxUr: "â•™",
              boxUR: "â•š",
              boxv: "â”‚",
              boxV: "â•‘",
              boxvh: "â”¼",
              boxvH: "â•ª",
              boxVh: "â•«",
              boxVH: "â•¬",
              boxvl: "â”¤",
              boxvL: "â•¡",
              boxVl: "â•¢",
              boxVL: "â•£",
              boxvr: "â”œ",
              boxvR: "â•ž",
              boxVr: "â•Ÿ",
              boxVR: "â• ",
              bprime: "â€µ",
              breve: "Ë˜",
              Breve: "Ë˜",
              brvbar: "Â¦",
              bscr: "ð’·",
              Bscr: "â„¬",
              bsemi: "â",
              bsim: "âˆ½",
              bsime: "â‹",
              bsol: "\\",
              bsolb: "â§…",
              bsolhsub: "âŸˆ",
              bull: "â€¢",
              bullet: "â€¢",
              bump: "â‰Ž",
              bumpe: "â‰",
              bumpE: "âª®",
              bumpeq: "â‰",
              Bumpeq: "â‰Ž",
              cacute: "Ä‡",
              Cacute: "Ä†",
              cap: "âˆ©",
              Cap: "â‹’",
              capand: "â©„",
              capbrcup: "â©‰",
              capcap: "â©‹",
              capcup: "â©‡",
              capdot: "â©€",
              CapitalDifferentialD: "â……",
              caps: "âˆ©ï¸€",
              caret: "â",
              caron: "Ë‡",
              Cayleys: "â„­",
              ccaps: "â©",
              ccaron: "Ä",
              Ccaron: "ÄŒ",
              ccedil: "Ã§",
              Ccedil: "Ã‡",
              ccirc: "Ä‰",
              Ccirc: "Äˆ",
              Cconint: "âˆ°",
              ccups: "â©Œ",
              ccupssm: "â©",
              cdot: "Ä‹",
              Cdot: "ÄŠ",
              cedil: "Â¸",
              Cedilla: "Â¸",
              cemptyv: "â¦²",
              cent: "Â¢",
              centerdot: "Â·",
              CenterDot: "Â·",
              cfr: "ð” ",
              Cfr: "â„­",
              chcy: "Ñ‡",
              CHcy: "Ð§",
              check: "âœ“",
              checkmark: "âœ“",
              chi: "Ï‡",
              Chi: "Î§",
              cir: "â—‹",
              circ: "Ë†",
              circeq: "â‰—",
              circlearrowleft: "â†º",
              circlearrowright: "â†»",
              circledast: "âŠ›",
              circledcirc: "âŠš",
              circleddash: "âŠ",
              CircleDot: "âŠ™",
              circledR: "Â®",
              circledS: "â“ˆ",
              CircleMinus: "âŠ–",
              CirclePlus: "âŠ•",
              CircleTimes: "âŠ—",
              cire: "â‰—",
              cirE: "â§ƒ",
              cirfnint: "â¨",
              cirmid: "â«¯",
              cirscir: "â§‚",
              ClockwiseContourIntegral: "âˆ²",
              CloseCurlyDoubleQuote: "â€",
              CloseCurlyQuote: "â€™",
              clubs: "â™£",
              clubsuit: "â™£",
              colon: ":",
              Colon: "âˆ·",
              colone: "â‰”",
              Colone: "â©´",
              coloneq: "â‰”",
              comma: ",",
              commat: "@",
              comp: "âˆ",
              compfn: "âˆ˜",
              complement: "âˆ",
              complexes: "â„‚",
              cong: "â‰…",
              congdot: "â©­",
              Congruent: "â‰¡",
              conint: "âˆ®",
              Conint: "âˆ¯",
              ContourIntegral: "âˆ®",
              copf: "ð•”",
              Copf: "â„‚",
              coprod: "âˆ",
              Coproduct: "âˆ",
              copy: "Â©",
              COPY: "Â©",
              copysr: "â„—",
              CounterClockwiseContourIntegral: "âˆ³",
              crarr: "â†µ",
              cross: "âœ—",
              Cross: "â¨¯",
              cscr: "ð’¸",
              Cscr: "ð’ž",
              csub: "â«",
              csube: "â«‘",
              csup: "â«",
              csupe: "â«’",
              ctdot: "â‹¯",
              cudarrl: "â¤¸",
              cudarrr: "â¤µ",
              cuepr: "â‹ž",
              cuesc: "â‹Ÿ",
              cularr: "â†¶",
              cularrp: "â¤½",
              cup: "âˆª",
              Cup: "â‹“",
              cupbrcap: "â©ˆ",
              cupcap: "â©†",
              CupCap: "â‰",
              cupcup: "â©Š",
              cupdot: "âŠ",
              cupor: "â©…",
              cups: "âˆªï¸€",
              curarr: "â†·",
              curarrm: "â¤¼",
              curlyeqprec: "â‹ž",
              curlyeqsucc: "â‹Ÿ",
              curlyvee: "â‹Ž",
              curlywedge: "â‹",
              curren: "Â¤",
              curvearrowleft: "â†¶",
              curvearrowright: "â†·",
              cuvee: "â‹Ž",
              cuwed: "â‹",
              cwconint: "âˆ²",
              cwint: "âˆ±",
              cylcty: "âŒ­",
              dagger: "â€ ",
              Dagger: "â€¡",
              daleth: "â„¸",
              darr: "â†“",
              dArr: "â‡“",
              Darr: "â†¡",
              dash: "â€",
              dashv: "âŠ£",
              Dashv: "â«¤",
              dbkarow: "â¤",
              dblac: "Ë",
              dcaron: "Ä",
              Dcaron: "ÄŽ",
              dcy: "Ð´",
              Dcy: "Ð”",
              dd: "â…†",
              DD: "â……",
              ddagger: "â€¡",
              ddarr: "â‡Š",
              DDotrahd: "â¤‘",
              ddotseq: "â©·",
              deg: "Â°",
              Del: "âˆ‡",
              delta: "Î´",
              Delta: "Î”",
              demptyv: "â¦±",
              dfisht: "â¥¿",
              dfr: "ð”¡",
              Dfr: "ð”‡",
              dHar: "â¥¥",
              dharl: "â‡ƒ",
              dharr: "â‡‚",
              DiacriticalAcute: "Â´",
              DiacriticalDot: "Ë™",
              DiacriticalDoubleAcute: "Ë",
              DiacriticalGrave: "`",
              DiacriticalTilde: "Ëœ",
              diam: "â‹„",
              diamond: "â‹„",
              Diamond: "â‹„",
              diamondsuit: "â™¦",
              diams: "â™¦",
              die: "Â¨",
              DifferentialD: "â…†",
              digamma: "Ï",
              disin: "â‹²",
              div: "Ã·",
              divide: "Ã·",
              divideontimes: "â‹‡",
              divonx: "â‹‡",
              djcy: "Ñ’",
              DJcy: "Ð‚",
              dlcorn: "âŒž",
              dlcrop: "âŒ",
              dollar: "$",
              dopf: "ð••",
              Dopf: "ð”»",
              dot: "Ë™",
              Dot: "Â¨",
              DotDot: "âƒœ",
              doteq: "â‰",
              doteqdot: "â‰‘",
              DotEqual: "â‰",
              dotminus: "âˆ¸",
              dotplus: "âˆ”",
              dotsquare: "âŠ¡",
              doublebarwedge: "âŒ†",
              DoubleContourIntegral: "âˆ¯",
              DoubleDot: "Â¨",
              DoubleDownArrow: "â‡“",
              DoubleLeftArrow: "â‡",
              DoubleLeftRightArrow: "â‡”",
              DoubleLeftTee: "â«¤",
              DoubleLongLeftArrow: "âŸ¸",
              DoubleLongLeftRightArrow: "âŸº",
              DoubleLongRightArrow: "âŸ¹",
              DoubleRightArrow: "â‡’",
              DoubleRightTee: "âŠ¨",
              DoubleUpArrow: "â‡‘",
              DoubleUpDownArrow: "â‡•",
              DoubleVerticalBar: "âˆ¥",
              downarrow: "â†“",
              Downarrow: "â‡“",
              DownArrow: "â†“",
              DownArrowBar: "â¤“",
              DownArrowUpArrow: "â‡µ",
              DownBreve: "Ì‘",
              downdownarrows: "â‡Š",
              downharpoonleft: "â‡ƒ",
              downharpoonright: "â‡‚",
              DownLeftRightVector: "â¥",
              DownLeftTeeVector: "â¥ž",
              DownLeftVector: "â†½",
              DownLeftVectorBar: "â¥–",
              DownRightTeeVector: "â¥Ÿ",
              DownRightVector: "â‡",
              DownRightVectorBar: "â¥—",
              DownTee: "âŠ¤",
              DownTeeArrow: "â†§",
              drbkarow: "â¤",
              drcorn: "âŒŸ",
              drcrop: "âŒŒ",
              dscr: "ð’¹",
              Dscr: "ð’Ÿ",
              dscy: "Ñ•",
              DScy: "Ð…",
              dsol: "â§¶",
              dstrok: "Ä‘",
              Dstrok: "Ä",
              dtdot: "â‹±",
              dtri: "â–¿",
              dtrif: "â–¾",
              duarr: "â‡µ",
              duhar: "â¥¯",
              dwangle: "â¦¦",
              dzcy: "ÑŸ",
              DZcy: "Ð",
              dzigrarr: "âŸ¿",
              eacute: "Ã©",
              Eacute: "Ã‰",
              easter: "â©®",
              ecaron: "Ä›",
              Ecaron: "Äš",
              ecir: "â‰–",
              ecirc: "Ãª",
              Ecirc: "ÃŠ",
              ecolon: "â‰•",
              ecy: "Ñ",
              Ecy: "Ð­",
              eDDot: "â©·",
              edot: "Ä—",
              eDot: "â‰‘",
              Edot: "Ä–",
              ee: "â…‡",
              efDot: "â‰’",
              efr: "ð”¢",
              Efr: "ð”ˆ",
              eg: "âªš",
              egrave: "Ã¨",
              Egrave: "Ãˆ",
              egs: "âª–",
              egsdot: "âª˜",
              el: "âª™",
              Element: "âˆˆ",
              elinters: "â§",
              ell: "â„“",
              els: "âª•",
              elsdot: "âª—",
              emacr: "Ä“",
              Emacr: "Ä’",
              empty: "âˆ…",
              emptyset: "âˆ…",
              EmptySmallSquare: "â—»",
              emptyv: "âˆ…",
              EmptyVerySmallSquare: "â–«",
              emsp: "â€ƒ",
              emsp13: "â€„",
              emsp14: "â€…",
              eng: "Å‹",
              ENG: "ÅŠ",
              ensp: "â€‚",
              eogon: "Ä™",
              Eogon: "Ä˜",
              eopf: "ð•–",
              Eopf: "ð”¼",
              epar: "â‹•",
              eparsl: "â§£",
              eplus: "â©±",
              epsi: "Îµ",
              epsilon: "Îµ",
              Epsilon: "Î•",
              epsiv: "Ïµ",
              eqcirc: "â‰–",
              eqcolon: "â‰•",
              eqsim: "â‰‚",
              eqslantgtr: "âª–",
              eqslantless: "âª•",
              Equal: "â©µ",
              equals: "=",
              EqualTilde: "â‰‚",
              equest: "â‰Ÿ",
              Equilibrium: "â‡Œ",
              equiv: "â‰¡",
              equivDD: "â©¸",
              eqvparsl: "â§¥",
              erarr: "â¥±",
              erDot: "â‰“",
              escr: "â„¯",
              Escr: "â„°",
              esdot: "â‰",
              esim: "â‰‚",
              Esim: "â©³",
              eta: "Î·",
              Eta: "Î—",
              eth: "Ã°",
              ETH: "Ã",
              euml: "Ã«",
              Euml: "Ã‹",
              euro: "â‚¬",
              excl: "!",
              exist: "âˆƒ",
              Exists: "âˆƒ",
              expectation: "â„°",
              exponentiale: "â…‡",
              ExponentialE: "â…‡",
              fallingdotseq: "â‰’",
              fcy: "Ñ„",
              Fcy: "Ð¤",
              female: "â™€",
              ffilig: "ï¬ƒ",
              fflig: "ï¬€",
              ffllig: "ï¬„",
              ffr: "ð”£",
              Ffr: "ð”‰",
              filig: "ï¬",
              FilledSmallSquare: "â—¼",
              FilledVerySmallSquare: "â–ª",
              fjlig: "fj",
              flat: "â™­",
              fllig: "ï¬‚",
              fltns: "â–±",
              fnof: "Æ’",
              fopf: "ð•—",
              Fopf: "ð”½",
              forall: "âˆ€",
              ForAll: "âˆ€",
              fork: "â‹”",
              forkv: "â«™",
              Fouriertrf: "â„±",
              fpartint: "â¨",
              frac12: "Â½",
              frac13: "â…“",
              frac14: "Â¼",
              frac15: "â…•",
              frac16: "â…™",
              frac18: "â…›",
              frac23: "â…”",
              frac25: "â…–",
              frac34: "Â¾",
              frac35: "â…—",
              frac38: "â…œ",
              frac45: "â…˜",
              frac56: "â…š",
              frac58: "â…",
              frac78: "â…ž",
              frasl: "â„",
              frown: "âŒ¢",
              fscr: "ð’»",
              Fscr: "â„±",
              gacute: "Çµ",
              gamma: "Î³",
              Gamma: "Î“",
              gammad: "Ï",
              Gammad: "Ïœ",
              gap: "âª†",
              gbreve: "ÄŸ",
              Gbreve: "Äž",
              Gcedil: "Ä¢",
              gcirc: "Ä",
              Gcirc: "Äœ",
              gcy: "Ð³",
              Gcy: "Ð“",
              gdot: "Ä¡",
              Gdot: "Ä ",
              ge: "â‰¥",
              gE: "â‰§",
              gel: "â‹›",
              gEl: "âªŒ",
              geq: "â‰¥",
              geqq: "â‰§",
              geqslant: "â©¾",
              ges: "â©¾",
              gescc: "âª©",
              gesdot: "âª€",
              gesdoto: "âª‚",
              gesdotol: "âª„",
              gesl: "â‹›ï¸€",
              gesles: "âª”",
              gfr: "ð”¤",
              Gfr: "ð”Š",
              gg: "â‰«",
              Gg: "â‹™",
              ggg: "â‹™",
              gimel: "â„·",
              gjcy: "Ñ“",
              GJcy: "Ðƒ",
              gl: "â‰·",
              gla: "âª¥",
              glE: "âª’",
              glj: "âª¤",
              gnap: "âªŠ",
              gnapprox: "âªŠ",
              gne: "âªˆ",
              gnE: "â‰©",
              gneq: "âªˆ",
              gneqq: "â‰©",
              gnsim: "â‹§",
              gopf: "ð•˜",
              Gopf: "ð”¾",
              grave: "`",
              GreaterEqual: "â‰¥",
              GreaterEqualLess: "â‹›",
              GreaterFullEqual: "â‰§",
              GreaterGreater: "âª¢",
              GreaterLess: "â‰·",
              GreaterSlantEqual: "â©¾",
              GreaterTilde: "â‰³",
              gscr: "â„Š",
              Gscr: "ð’¢",
              gsim: "â‰³",
              gsime: "âªŽ",
              gsiml: "âª",
              gt: ">",
              Gt: "â‰«",
              GT: ">",
              gtcc: "âª§",
              gtcir: "â©º",
              gtdot: "â‹—",
              gtlPar: "â¦•",
              gtquest: "â©¼",
              gtrapprox: "âª†",
              gtrarr: "â¥¸",
              gtrdot: "â‹—",
              gtreqless: "â‹›",
              gtreqqless: "âªŒ",
              gtrless: "â‰·",
              gtrsim: "â‰³",
              gvertneqq: "â‰©ï¸€",
              gvnE: "â‰©ï¸€",
              Hacek: "Ë‡",
              hairsp: "â€Š",
              half: "Â½",
              hamilt: "â„‹",
              hardcy: "ÑŠ",
              HARDcy: "Ðª",
              harr: "â†”",
              hArr: "â‡”",
              harrcir: "â¥ˆ",
              harrw: "â†­",
              Hat: "^",
              hbar: "â„",
              hcirc: "Ä¥",
              Hcirc: "Ä¤",
              hearts: "â™¥",
              heartsuit: "â™¥",
              hellip: "â€¦",
              hercon: "âŠ¹",
              hfr: "ð”¥",
              Hfr: "â„Œ",
              HilbertSpace: "â„‹",
              hksearow: "â¤¥",
              hkswarow: "â¤¦",
              hoarr: "â‡¿",
              homtht: "âˆ»",
              hookleftarrow: "â†©",
              hookrightarrow: "â†ª",
              hopf: "ð•™",
              Hopf: "â„",
              horbar: "â€•",
              HorizontalLine: "â”€",
              hscr: "ð’½",
              Hscr: "â„‹",
              hslash: "â„",
              hstrok: "Ä§",
              Hstrok: "Ä¦",
              HumpDownHump: "â‰Ž",
              HumpEqual: "â‰",
              hybull: "âƒ",
              hyphen: "â€",
              iacute: "Ã­",
              Iacute: "Ã",
              ic: "â£",
              icirc: "Ã®",
              Icirc: "ÃŽ",
              icy: "Ð¸",
              Icy: "Ð˜",
              Idot: "Ä°",
              iecy: "Ðµ",
              IEcy: "Ð•",
              iexcl: "Â¡",
              iff: "â‡”",
              ifr: "ð”¦",
              Ifr: "â„‘",
              igrave: "Ã¬",
              Igrave: "ÃŒ",
              ii: "â…ˆ",
              iiiint: "â¨Œ",
              iiint: "âˆ­",
              iinfin: "â§œ",
              iiota: "â„©",
              ijlig: "Ä³",
              IJlig: "Ä²",
              Im: "â„‘",
              imacr: "Ä«",
              Imacr: "Äª",
              image: "â„‘",
              ImaginaryI: "â…ˆ",
              imagline: "â„",
              imagpart: "â„‘",
              imath: "Ä±",
              imof: "âŠ·",
              imped: "Æµ",
              Implies: "â‡’",
              in: "âˆˆ",
              incare: "â„…",
              infin: "âˆž",
              infintie: "â§",
              inodot: "Ä±",
              int: "âˆ«",
              Int: "âˆ¬",
              intcal: "âŠº",
              integers: "â„¤",
              Integral: "âˆ«",
              intercal: "âŠº",
              Intersection: "â‹‚",
              intlarhk: "â¨—",
              intprod: "â¨¼",
              InvisibleComma: "â£",
              InvisibleTimes: "â¢",
              iocy: "Ñ‘",
              IOcy: "Ð",
              iogon: "Ä¯",
              Iogon: "Ä®",
              iopf: "ð•š",
              Iopf: "ð•€",
              iota: "Î¹",
              Iota: "Î™",
              iprod: "â¨¼",
              iquest: "Â¿",
              iscr: "ð’¾",
              Iscr: "â„",
              isin: "âˆˆ",
              isindot: "â‹µ",
              isinE: "â‹¹",
              isins: "â‹´",
              isinsv: "â‹³",
              isinv: "âˆˆ",
              it: "â¢",
              itilde: "Ä©",
              Itilde: "Ä¨",
              iukcy: "Ñ–",
              Iukcy: "Ð†",
              iuml: "Ã¯",
              Iuml: "Ã",
              jcirc: "Äµ",
              Jcirc: "Ä´",
              jcy: "Ð¹",
              Jcy: "Ð™",
              jfr: "ð”§",
              Jfr: "ð”",
              jmath: "È·",
              jopf: "ð•›",
              Jopf: "ð•",
              jscr: "ð’¿",
              Jscr: "ð’¥",
              jsercy: "Ñ˜",
              Jsercy: "Ðˆ",
              jukcy: "Ñ”",
              Jukcy: "Ð„",
              kappa: "Îº",
              Kappa: "Îš",
              kappav: "Ï°",
              kcedil: "Ä·",
              Kcedil: "Ä¶",
              kcy: "Ðº",
              Kcy: "Ðš",
              kfr: "ð”¨",
              Kfr: "ð”Ž",
              kgreen: "Ä¸",
              khcy: "Ñ…",
              KHcy: "Ð¥",
              kjcy: "Ñœ",
              KJcy: "ÐŒ",
              kopf: "ð•œ",
              Kopf: "ð•‚",
              kscr: "ð“€",
              Kscr: "ð’¦",
              lAarr: "â‡š",
              lacute: "Äº",
              Lacute: "Ä¹",
              laemptyv: "â¦´",
              lagran: "â„’",
              lambda: "Î»",
              Lambda: "Î›",
              lang: "âŸ¨",
              Lang: "âŸª",
              langd: "â¦‘",
              langle: "âŸ¨",
              lap: "âª…",
              Laplacetrf: "â„’",
              laquo: "Â«",
              larr: "â†",
              lArr: "â‡",
              Larr: "â†ž",
              larrb: "â‡¤",
              larrbfs: "â¤Ÿ",
              larrfs: "â¤",
              larrhk: "â†©",
              larrlp: "â†«",
              larrpl: "â¤¹",
              larrsim: "â¥³",
              larrtl: "â†¢",
              lat: "âª«",
              latail: "â¤™",
              lAtail: "â¤›",
              late: "âª­",
              lates: "âª­ï¸€",
              lbarr: "â¤Œ",
              lBarr: "â¤Ž",
              lbbrk: "â²",
              lbrace: "{",
              lbrack: "[",
              lbrke: "â¦‹",
              lbrksld: "â¦",
              lbrkslu: "â¦",
              lcaron: "Ä¾",
              Lcaron: "Ä½",
              lcedil: "Ä¼",
              Lcedil: "Ä»",
              lceil: "âŒˆ",
              lcub: "{",
              lcy: "Ð»",
              Lcy: "Ð›",
              ldca: "â¤¶",
              ldquo: "â€œ",
              ldquor: "â€ž",
              ldrdhar: "â¥§",
              ldrushar: "â¥‹",
              ldsh: "â†²",
              le: "â‰¤",
              lE: "â‰¦",
              LeftAngleBracket: "âŸ¨",
              leftarrow: "â†",
              Leftarrow: "â‡",
              LeftArrow: "â†",
              LeftArrowBar: "â‡¤",
              LeftArrowRightArrow: "â‡†",
              leftarrowtail: "â†¢",
              LeftCeiling: "âŒˆ",
              LeftDoubleBracket: "âŸ¦",
              LeftDownTeeVector: "â¥¡",
              LeftDownVector: "â‡ƒ",
              LeftDownVectorBar: "â¥™",
              LeftFloor: "âŒŠ",
              leftharpoondown: "â†½",
              leftharpoonup: "â†¼",
              leftleftarrows: "â‡‡",
              leftrightarrow: "â†”",
              Leftrightarrow: "â‡”",
              LeftRightArrow: "â†”",
              leftrightarrows: "â‡†",
              leftrightharpoons: "â‡‹",
              leftrightsquigarrow: "â†­",
              LeftRightVector: "â¥Ž",
              LeftTee: "âŠ£",
              LeftTeeArrow: "â†¤",
              LeftTeeVector: "â¥š",
              leftthreetimes: "â‹‹",
              LeftTriangle: "âŠ²",
              LeftTriangleBar: "â§",
              LeftTriangleEqual: "âŠ´",
              LeftUpDownVector: "â¥‘",
              LeftUpTeeVector: "â¥ ",
              LeftUpVector: "â†¿",
              LeftUpVectorBar: "â¥˜",
              LeftVector: "â†¼",
              LeftVectorBar: "â¥’",
              leg: "â‹š",
              lEg: "âª‹",
              leq: "â‰¤",
              leqq: "â‰¦",
              leqslant: "â©½",
              les: "â©½",
              lescc: "âª¨",
              lesdot: "â©¿",
              lesdoto: "âª",
              lesdotor: "âªƒ",
              lesg: "â‹šï¸€",
              lesges: "âª“",
              lessapprox: "âª…",
              lessdot: "â‹–",
              lesseqgtr: "â‹š",
              lesseqqgtr: "âª‹",
              LessEqualGreater: "â‹š",
              LessFullEqual: "â‰¦",
              LessGreater: "â‰¶",
              lessgtr: "â‰¶",
              LessLess: "âª¡",
              lesssim: "â‰²",
              LessSlantEqual: "â©½",
              LessTilde: "â‰²",
              lfisht: "â¥¼",
              lfloor: "âŒŠ",
              lfr: "ð”©",
              Lfr: "ð”",
              lg: "â‰¶",
              lgE: "âª‘",
              lHar: "â¥¢",
              lhard: "â†½",
              lharu: "â†¼",
              lharul: "â¥ª",
              lhblk: "â–„",
              ljcy: "Ñ™",
              LJcy: "Ð‰",
              ll: "â‰ª",
              Ll: "â‹˜",
              llarr: "â‡‡",
              llcorner: "âŒž",
              Lleftarrow: "â‡š",
              llhard: "â¥«",
              lltri: "â—º",
              lmidot: "Å€",
              Lmidot: "Ä¿",
              lmoust: "âŽ°",
              lmoustache: "âŽ°",
              lnap: "âª‰",
              lnapprox: "âª‰",
              lne: "âª‡",
              lnE: "â‰¨",
              lneq: "âª‡",
              lneqq: "â‰¨",
              lnsim: "â‹¦",
              loang: "âŸ¬",
              loarr: "â‡½",
              lobrk: "âŸ¦",
              longleftarrow: "âŸµ",
              Longleftarrow: "âŸ¸",
              LongLeftArrow: "âŸµ",
              longleftrightarrow: "âŸ·",
              Longleftrightarrow: "âŸº",
              LongLeftRightArrow: "âŸ·",
              longmapsto: "âŸ¼",
              longrightarrow: "âŸ¶",
              Longrightarrow: "âŸ¹",
              LongRightArrow: "âŸ¶",
              looparrowleft: "â†«",
              looparrowright: "â†¬",
              lopar: "â¦…",
              lopf: "ð•",
              Lopf: "ð•ƒ",
              loplus: "â¨­",
              lotimes: "â¨´",
              lowast: "âˆ—",
              lowbar: "_",
              LowerLeftArrow: "â†™",
              LowerRightArrow: "â†˜",
              loz: "â—Š",
              lozenge: "â—Š",
              lozf: "â§«",
              lpar: "(",
              lparlt: "â¦“",
              lrarr: "â‡†",
              lrcorner: "âŒŸ",
              lrhar: "â‡‹",
              lrhard: "â¥­",
              lrm: "â€Ž",
              lrtri: "âŠ¿",
              lsaquo: "â€¹",
              lscr: "ð“",
              Lscr: "â„’",
              lsh: "â†°",
              Lsh: "â†°",
              lsim: "â‰²",
              lsime: "âª",
              lsimg: "âª",
              lsqb: "[",
              lsquo: "â€˜",
              lsquor: "â€š",
              lstrok: "Å‚",
              Lstrok: "Å",
              lt: "<",
              Lt: "â‰ª",
              LT: "<",
              ltcc: "âª¦",
              ltcir: "â©¹",
              ltdot: "â‹–",
              lthree: "â‹‹",
              ltimes: "â‹‰",
              ltlarr: "â¥¶",
              ltquest: "â©»",
              ltri: "â—ƒ",
              ltrie: "âŠ´",
              ltrif: "â—‚",
              ltrPar: "â¦–",
              lurdshar: "â¥Š",
              luruhar: "â¥¦",
              lvertneqq: "â‰¨ï¸€",
              lvnE: "â‰¨ï¸€",
              macr: "Â¯",
              male: "â™‚",
              malt: "âœ ",
              maltese: "âœ ",
              map: "â†¦",
              Map: "â¤…",
              mapsto: "â†¦",
              mapstodown: "â†§",
              mapstoleft: "â†¤",
              mapstoup: "â†¥",
              marker: "â–®",
              mcomma: "â¨©",
              mcy: "Ð¼",
              Mcy: "Ðœ",
              mdash: "â€”",
              mDDot: "âˆº",
              measuredangle: "âˆ¡",
              MediumSpace: "âŸ",
              Mellintrf: "â„³",
              mfr: "ð”ª",
              Mfr: "ð”",
              mho: "â„§",
              micro: "Âµ",
              mid: "âˆ£",
              midast: "*",
              midcir: "â«°",
              middot: "Â·",
              minus: "âˆ’",
              minusb: "âŠŸ",
              minusd: "âˆ¸",
              minusdu: "â¨ª",
              MinusPlus: "âˆ“",
              mlcp: "â«›",
              mldr: "â€¦",
              mnplus: "âˆ“",
              models: "âŠ§",
              mopf: "ð•ž",
              Mopf: "ð•„",
              mp: "âˆ“",
              mscr: "ð“‚",
              Mscr: "â„³",
              mstpos: "âˆ¾",
              mu: "Î¼",
              Mu: "Îœ",
              multimap: "âŠ¸",
              mumap: "âŠ¸",
              nabla: "âˆ‡",
              nacute: "Å„",
              Nacute: "Åƒ",
              nang: "âˆ âƒ’",
              nap: "â‰‰",
              napE: "â©°Ì¸",
              napid: "â‰‹Ì¸",
              napos: "Å‰",
              napprox: "â‰‰",
              natur: "â™®",
              natural: "â™®",
              naturals: "â„•",
              nbsp: "Â ",
              nbump: "â‰ŽÌ¸",
              nbumpe: "â‰Ì¸",
              ncap: "â©ƒ",
              ncaron: "Åˆ",
              Ncaron: "Å‡",
              ncedil: "Å†",
              Ncedil: "Å…",
              ncong: "â‰‡",
              ncongdot: "â©­Ì¸",
              ncup: "â©‚",
              ncy: "Ð½",
              Ncy: "Ð",
              ndash: "â€“",
              ne: "â‰ ",
              nearhk: "â¤¤",
              nearr: "â†—",
              neArr: "â‡—",
              nearrow: "â†—",
              nedot: "â‰Ì¸",
              NegativeMediumSpace: "â€‹",
              NegativeThickSpace: "â€‹",
              NegativeThinSpace: "â€‹",
              NegativeVeryThinSpace: "â€‹",
              nequiv: "â‰¢",
              nesear: "â¤¨",
              nesim: "â‰‚Ì¸",
              NestedGreaterGreater: "â‰«",
              NestedLessLess: "â‰ª",
              NewLine: "\n",
              nexist: "âˆ„",
              nexists: "âˆ„",
              nfr: "ð”«",
              Nfr: "ð”‘",
              nge: "â‰±",
              ngE: "â‰§Ì¸",
              ngeq: "â‰±",
              ngeqq: "â‰§Ì¸",
              ngeqslant: "â©¾Ì¸",
              nges: "â©¾Ì¸",
              nGg: "â‹™Ì¸",
              ngsim: "â‰µ",
              ngt: "â‰¯",
              nGt: "â‰«âƒ’",
              ngtr: "â‰¯",
              nGtv: "â‰«Ì¸",
              nharr: "â†®",
              nhArr: "â‡Ž",
              nhpar: "â«²",
              ni: "âˆ‹",
              nis: "â‹¼",
              nisd: "â‹º",
              niv: "âˆ‹",
              njcy: "Ñš",
              NJcy: "ÐŠ",
              nlarr: "â†š",
              nlArr: "â‡",
              nldr: "â€¥",
              nle: "â‰°",
              nlE: "â‰¦Ì¸",
              nleftarrow: "â†š",
              nLeftarrow: "â‡",
              nleftrightarrow: "â†®",
              nLeftrightarrow: "â‡Ž",
              nleq: "â‰°",
              nleqq: "â‰¦Ì¸",
              nleqslant: "â©½Ì¸",
              nles: "â©½Ì¸",
              nless: "â‰®",
              nLl: "â‹˜Ì¸",
              nlsim: "â‰´",
              nlt: "â‰®",
              nLt: "â‰ªâƒ’",
              nltri: "â‹ª",
              nltrie: "â‹¬",
              nLtv: "â‰ªÌ¸",
              nmid: "âˆ¤",
              NoBreak: "â ",
              NonBreakingSpace: "Â ",
              nopf: "ð•Ÿ",
              Nopf: "â„•",
              not: "Â¬",
              Not: "â«¬",
              NotCongruent: "â‰¢",
              NotCupCap: "â‰­",
              NotDoubleVerticalBar: "âˆ¦",
              NotElement: "âˆ‰",
              NotEqual: "â‰ ",
              NotEqualTilde: "â‰‚Ì¸",
              NotExists: "âˆ„",
              NotGreater: "â‰¯",
              NotGreaterEqual: "â‰±",
              NotGreaterFullEqual: "â‰§Ì¸",
              NotGreaterGreater: "â‰«Ì¸",
              NotGreaterLess: "â‰¹",
              NotGreaterSlantEqual: "â©¾Ì¸",
              NotGreaterTilde: "â‰µ",
              NotHumpDownHump: "â‰ŽÌ¸",
              NotHumpEqual: "â‰Ì¸",
              notin: "âˆ‰",
              notindot: "â‹µÌ¸",
              notinE: "â‹¹Ì¸",
              notinva: "âˆ‰",
              notinvb: "â‹·",
              notinvc: "â‹¶",
              NotLeftTriangle: "â‹ª",
              NotLeftTriangleBar: "â§Ì¸",
              NotLeftTriangleEqual: "â‹¬",
              NotLess: "â‰®",
              NotLessEqual: "â‰°",
              NotLessGreater: "â‰¸",
              NotLessLess: "â‰ªÌ¸",
              NotLessSlantEqual: "â©½Ì¸",
              NotLessTilde: "â‰´",
              NotNestedGreaterGreater: "âª¢Ì¸",
              NotNestedLessLess: "âª¡Ì¸",
              notni: "âˆŒ",
              notniva: "âˆŒ",
              notnivb: "â‹¾",
              notnivc: "â‹½",
              NotPrecedes: "âŠ€",
              NotPrecedesEqual: "âª¯Ì¸",
              NotPrecedesSlantEqual: "â‹ ",
              NotReverseElement: "âˆŒ",
              NotRightTriangle: "â‹«",
              NotRightTriangleBar: "â§Ì¸",
              NotRightTriangleEqual: "â‹­",
              NotSquareSubset: "âŠÌ¸",
              NotSquareSubsetEqual: "â‹¢",
              NotSquareSuperset: "âŠÌ¸",
              NotSquareSupersetEqual: "â‹£",
              NotSubset: "âŠ‚âƒ’",
              NotSubsetEqual: "âŠˆ",
              NotSucceeds: "âŠ",
              NotSucceedsEqual: "âª°Ì¸",
              NotSucceedsSlantEqual: "â‹¡",
              NotSucceedsTilde: "â‰¿Ì¸",
              NotSuperset: "âŠƒâƒ’",
              NotSupersetEqual: "âŠ‰",
              NotTilde: "â‰",
              NotTildeEqual: "â‰„",
              NotTildeFullEqual: "â‰‡",
              NotTildeTilde: "â‰‰",
              NotVerticalBar: "âˆ¤",
              npar: "âˆ¦",
              nparallel: "âˆ¦",
              nparsl: "â«½âƒ¥",
              npart: "âˆ‚Ì¸",
              npolint: "â¨”",
              npr: "âŠ€",
              nprcue: "â‹ ",
              npre: "âª¯Ì¸",
              nprec: "âŠ€",
              npreceq: "âª¯Ì¸",
              nrarr: "â†›",
              nrArr: "â‡",
              nrarrc: "â¤³Ì¸",
              nrarrw: "â†Ì¸",
              nrightarrow: "â†›",
              nRightarrow: "â‡",
              nrtri: "â‹«",
              nrtrie: "â‹­",
              nsc: "âŠ",
              nsccue: "â‹¡",
              nsce: "âª°Ì¸",
              nscr: "ð“ƒ",
              Nscr: "ð’©",
              nshortmid: "âˆ¤",
              nshortparallel: "âˆ¦",
              nsim: "â‰",
              nsime: "â‰„",
              nsimeq: "â‰„",
              nsmid: "âˆ¤",
              nspar: "âˆ¦",
              nsqsube: "â‹¢",
              nsqsupe: "â‹£",
              nsub: "âŠ„",
              nsube: "âŠˆ",
              nsubE: "â«…Ì¸",
              nsubset: "âŠ‚âƒ’",
              nsubseteq: "âŠˆ",
              nsubseteqq: "â«…Ì¸",
              nsucc: "âŠ",
              nsucceq: "âª°Ì¸",
              nsup: "âŠ…",
              nsupe: "âŠ‰",
              nsupE: "â«†Ì¸",
              nsupset: "âŠƒâƒ’",
              nsupseteq: "âŠ‰",
              nsupseteqq: "â«†Ì¸",
              ntgl: "â‰¹",
              ntilde: "Ã±",
              Ntilde: "Ã‘",
              ntlg: "â‰¸",
              ntriangleleft: "â‹ª",
              ntrianglelefteq: "â‹¬",
              ntriangleright: "â‹«",
              ntrianglerighteq: "â‹­",
              nu: "Î½",
              Nu: "Î",
              num: "#",
              numero: "â„–",
              numsp: "â€‡",
              nvap: "â‰âƒ’",
              nvdash: "âŠ¬",
              nvDash: "âŠ­",
              nVdash: "âŠ®",
              nVDash: "âŠ¯",
              nvge: "â‰¥âƒ’",
              nvgt: ">âƒ’",
              nvHarr: "â¤„",
              nvinfin: "â§ž",
              nvlArr: "â¤‚",
              nvle: "â‰¤âƒ’",
              nvlt: "<âƒ’",
              nvltrie: "âŠ´âƒ’",
              nvrArr: "â¤ƒ",
              nvrtrie: "âŠµâƒ’",
              nvsim: "âˆ¼âƒ’",
              nwarhk: "â¤£",
              nwarr: "â†–",
              nwArr: "â‡–",
              nwarrow: "â†–",
              nwnear: "â¤§",
              oacute: "Ã³",
              Oacute: "Ã“",
              oast: "âŠ›",
              ocir: "âŠš",
              ocirc: "Ã´",
              Ocirc: "Ã”",
              ocy: "Ð¾",
              Ocy: "Ðž",
              odash: "âŠ",
              odblac: "Å‘",
              Odblac: "Å",
              odiv: "â¨¸",
              odot: "âŠ™",
              odsold: "â¦¼",
              oelig: "Å“",
              OElig: "Å’",
              ofcir: "â¦¿",
              ofr: "ð”¬",
              Ofr: "ð”’",
              ogon: "Ë›",
              ograve: "Ã²",
              Ograve: "Ã’",
              ogt: "â§",
              ohbar: "â¦µ",
              ohm: "Î©",
              oint: "âˆ®",
              olarr: "â†º",
              olcir: "â¦¾",
              olcross: "â¦»",
              oline: "â€¾",
              olt: "â§€",
              omacr: "Å",
              Omacr: "ÅŒ",
              omega: "Ï‰",
              Omega: "Î©",
              omicron: "Î¿",
              Omicron: "ÎŸ",
              omid: "â¦¶",
              ominus: "âŠ–",
              oopf: "ð• ",
              Oopf: "ð•†",
              opar: "â¦·",
              OpenCurlyDoubleQuote: "â€œ",
              OpenCurlyQuote: "â€˜",
              operp: "â¦¹",
              oplus: "âŠ•",
              or: "âˆ¨",
              Or: "â©”",
              orarr: "â†»",
              ord: "â©",
              order: "â„´",
              orderof: "â„´",
              ordf: "Âª",
              ordm: "Âº",
              origof: "âŠ¶",
              oror: "â©–",
              orslope: "â©—",
              orv: "â©›",
              oS: "â“ˆ",
              oscr: "â„´",
              Oscr: "ð’ª",
              oslash: "Ã¸",
              Oslash: "Ã˜",
              osol: "âŠ˜",
              otilde: "Ãµ",
              Otilde: "Ã•",
              otimes: "âŠ—",
              Otimes: "â¨·",
              otimesas: "â¨¶",
              ouml: "Ã¶",
              Ouml: "Ã–",
              ovbar: "âŒ½",
              OverBar: "â€¾",
              OverBrace: "âž",
              OverBracket: "âŽ´",
              OverParenthesis: "âœ",
              par: "âˆ¥",
              para: "Â¶",
              parallel: "âˆ¥",
              parsim: "â«³",
              parsl: "â«½",
              part: "âˆ‚",
              PartialD: "âˆ‚",
              pcy: "Ð¿",
              Pcy: "ÐŸ",
              percnt: "%",
              period: ".",
              permil: "â€°",
              perp: "âŠ¥",
              pertenk: "â€±",
              pfr: "ð”­",
              Pfr: "ð”“",
              phi: "Ï†",
              Phi: "Î¦",
              phiv: "Ï•",
              phmmat: "â„³",
              phone: "â˜Ž",
              pi: "Ï€",
              Pi: "Î ",
              pitchfork: "â‹”",
              piv: "Ï–",
              planck: "â„",
              planckh: "â„Ž",
              plankv: "â„",
              plus: "+",
              plusacir: "â¨£",
              plusb: "âŠž",
              pluscir: "â¨¢",
              plusdo: "âˆ”",
              plusdu: "â¨¥",
              pluse: "â©²",
              PlusMinus: "Â±",
              plusmn: "Â±",
              plussim: "â¨¦",
              plustwo: "â¨§",
              pm: "Â±",
              Poincareplane: "â„Œ",
              pointint: "â¨•",
              popf: "ð•¡",
              Popf: "â„™",
              pound: "Â£",
              pr: "â‰º",
              Pr: "âª»",
              prap: "âª·",
              prcue: "â‰¼",
              pre: "âª¯",
              prE: "âª³",
              prec: "â‰º",
              precapprox: "âª·",
              preccurlyeq: "â‰¼",
              Precedes: "â‰º",
              PrecedesEqual: "âª¯",
              PrecedesSlantEqual: "â‰¼",
              PrecedesTilde: "â‰¾",
              preceq: "âª¯",
              precnapprox: "âª¹",
              precneqq: "âªµ",
              precnsim: "â‹¨",
              precsim: "â‰¾",
              prime: "â€²",
              Prime: "â€³",
              primes: "â„™",
              prnap: "âª¹",
              prnE: "âªµ",
              prnsim: "â‹¨",
              prod: "âˆ",
              Product: "âˆ",
              profalar: "âŒ®",
              profline: "âŒ’",
              profsurf: "âŒ“",
              prop: "âˆ",
              Proportion: "âˆ·",
              Proportional: "âˆ",
              propto: "âˆ",
              prsim: "â‰¾",
              prurel: "âŠ°",
              pscr: "ð“…",
              Pscr: "ð’«",
              psi: "Ïˆ",
              Psi: "Î¨",
              puncsp: "â€ˆ",
              qfr: "ð”®",
              Qfr: "ð””",
              qint: "â¨Œ",
              qopf: "ð•¢",
              Qopf: "â„š",
              qprime: "â—",
              qscr: "ð“†",
              Qscr: "ð’¬",
              quaternions: "â„",
              quatint: "â¨–",
              quest: "?",
              questeq: "â‰Ÿ",
              quot: '"',
              QUOT: '"',
              rAarr: "â‡›",
              race: "âˆ½Ì±",
              racute: "Å•",
              Racute: "Å”",
              radic: "âˆš",
              raemptyv: "â¦³",
              rang: "âŸ©",
              Rang: "âŸ«",
              rangd: "â¦’",
              range: "â¦¥",
              rangle: "âŸ©",
              raquo: "Â»",
              rarr: "â†’",
              rArr: "â‡’",
              Rarr: "â† ",
              rarrap: "â¥µ",
              rarrb: "â‡¥",
              rarrbfs: "â¤ ",
              rarrc: "â¤³",
              rarrfs: "â¤ž",
              rarrhk: "â†ª",
              rarrlp: "â†¬",
              rarrpl: "â¥…",
              rarrsim: "â¥´",
              rarrtl: "â†£",
              Rarrtl: "â¤–",
              rarrw: "â†",
              ratail: "â¤š",
              rAtail: "â¤œ",
              ratio: "âˆ¶",
              rationals: "â„š",
              rbarr: "â¤",
              rBarr: "â¤",
              RBarr: "â¤",
              rbbrk: "â³",
              rbrace: "}",
              rbrack: "]",
              rbrke: "â¦Œ",
              rbrksld: "â¦Ž",
              rbrkslu: "â¦",
              rcaron: "Å™",
              Rcaron: "Å˜",
              rcedil: "Å—",
              Rcedil: "Å–",
              rceil: "âŒ‰",
              rcub: "}",
              rcy: "Ñ€",
              Rcy: "Ð ",
              rdca: "â¤·",
              rdldhar: "â¥©",
              rdquo: "â€",
              rdquor: "â€",
              rdsh: "â†³",
              Re: "â„œ",
              real: "â„œ",
              realine: "â„›",
              realpart: "â„œ",
              reals: "â„",
              rect: "â–­",
              reg: "Â®",
              REG: "Â®",
              ReverseElement: "âˆ‹",
              ReverseEquilibrium: "â‡‹",
              ReverseUpEquilibrium: "â¥¯",
              rfisht: "â¥½",
              rfloor: "âŒ‹",
              rfr: "ð”¯",
              Rfr: "â„œ",
              rHar: "â¥¤",
              rhard: "â‡",
              rharu: "â‡€",
              rharul: "â¥¬",
              rho: "Ï",
              Rho: "Î¡",
              rhov: "Ï±",
              RightAngleBracket: "âŸ©",
              rightarrow: "â†’",
              Rightarrow: "â‡’",
              RightArrow: "â†’",
              RightArrowBar: "â‡¥",
              RightArrowLeftArrow: "â‡„",
              rightarrowtail: "â†£",
              RightCeiling: "âŒ‰",
              RightDoubleBracket: "âŸ§",
              RightDownTeeVector: "â¥",
              RightDownVector: "â‡‚",
              RightDownVectorBar: "â¥•",
              RightFloor: "âŒ‹",
              rightharpoondown: "â‡",
              rightharpoonup: "â‡€",
              rightleftarrows: "â‡„",
              rightleftharpoons: "â‡Œ",
              rightrightarrows: "â‡‰",
              rightsquigarrow: "â†",
              RightTee: "âŠ¢",
              RightTeeArrow: "â†¦",
              RightTeeVector: "â¥›",
              rightthreetimes: "â‹Œ",
              RightTriangle: "âŠ³",
              RightTriangleBar: "â§",
              RightTriangleEqual: "âŠµ",
              RightUpDownVector: "â¥",
              RightUpTeeVector: "â¥œ",
              RightUpVector: "â†¾",
              RightUpVectorBar: "â¥”",
              RightVector: "â‡€",
              RightVectorBar: "â¥“",
              ring: "Ëš",
              risingdotseq: "â‰“",
              rlarr: "â‡„",
              rlhar: "â‡Œ",
              rlm: "â€",
              rmoust: "âŽ±",
              rmoustache: "âŽ±",
              rnmid: "â«®",
              roang: "âŸ­",
              roarr: "â‡¾",
              robrk: "âŸ§",
              ropar: "â¦†",
              ropf: "ð•£",
              Ropf: "â„",
              roplus: "â¨®",
              rotimes: "â¨µ",
              RoundImplies: "â¥°",
              rpar: ")",
              rpargt: "â¦”",
              rppolint: "â¨’",
              rrarr: "â‡‰",
              Rrightarrow: "â‡›",
              rsaquo: "â€º",
              rscr: "ð“‡",
              Rscr: "â„›",
              rsh: "â†±",
              Rsh: "â†±",
              rsqb: "]",
              rsquo: "â€™",
              rsquor: "â€™",
              rthree: "â‹Œ",
              rtimes: "â‹Š",
              rtri: "â–¹",
              rtrie: "âŠµ",
              rtrif: "â–¸",
              rtriltri: "â§Ž",
              RuleDelayed: "â§´",
              ruluhar: "â¥¨",
              rx: "â„ž",
              sacute: "Å›",
              Sacute: "Åš",
              sbquo: "â€š",
              sc: "â‰»",
              Sc: "âª¼",
              scap: "âª¸",
              scaron: "Å¡",
              Scaron: "Å ",
              sccue: "â‰½",
              sce: "âª°",
              scE: "âª´",
              scedil: "ÅŸ",
              Scedil: "Åž",
              scirc: "Å",
              Scirc: "Åœ",
              scnap: "âªº",
              scnE: "âª¶",
              scnsim: "â‹©",
              scpolint: "â¨“",
              scsim: "â‰¿",
              scy: "Ñ",
              Scy: "Ð¡",
              sdot: "â‹…",
              sdotb: "âŠ¡",
              sdote: "â©¦",
              searhk: "â¤¥",
              searr: "â†˜",
              seArr: "â‡˜",
              searrow: "â†˜",
              sect: "Â§",
              semi: ";",
              seswar: "â¤©",
              setminus: "âˆ–",
              setmn: "âˆ–",
              sext: "âœ¶",
              sfr: "ð”°",
              Sfr: "ð”–",
              sfrown: "âŒ¢",
              sharp: "â™¯",
              shchcy: "Ñ‰",
              SHCHcy: "Ð©",
              shcy: "Ñˆ",
              SHcy: "Ð¨",
              ShortDownArrow: "â†“",
              ShortLeftArrow: "â†",
              shortmid: "âˆ£",
              shortparallel: "âˆ¥",
              ShortRightArrow: "â†’",
              ShortUpArrow: "â†‘",
              shy: "Â­",
              sigma: "Ïƒ",
              Sigma: "Î£",
              sigmaf: "Ï‚",
              sigmav: "Ï‚",
              sim: "âˆ¼",
              simdot: "â©ª",
              sime: "â‰ƒ",
              simeq: "â‰ƒ",
              simg: "âªž",
              simgE: "âª ",
              siml: "âª",
              simlE: "âªŸ",
              simne: "â‰†",
              simplus: "â¨¤",
              simrarr: "â¥²",
              slarr: "â†",
              SmallCircle: "âˆ˜",
              smallsetminus: "âˆ–",
              smashp: "â¨³",
              smeparsl: "â§¤",
              smid: "âˆ£",
              smile: "âŒ£",
              smt: "âªª",
              smte: "âª¬",
              smtes: "âª¬ï¸€",
              softcy: "ÑŒ",
              SOFTcy: "Ð¬",
              sol: "/",
              solb: "â§„",
              solbar: "âŒ¿",
              sopf: "ð•¤",
              Sopf: "ð•Š",
              spades: "â™ ",
              spadesuit: "â™ ",
              spar: "âˆ¥",
              sqcap: "âŠ“",
              sqcaps: "âŠ“ï¸€",
              sqcup: "âŠ”",
              sqcups: "âŠ”ï¸€",
              Sqrt: "âˆš",
              sqsub: "âŠ",
              sqsube: "âŠ‘",
              sqsubset: "âŠ",
              sqsubseteq: "âŠ‘",
              sqsup: "âŠ",
              sqsupe: "âŠ’",
              sqsupset: "âŠ",
              sqsupseteq: "âŠ’",
              squ: "â–¡",
              square: "â–¡",
              Square: "â–¡",
              SquareIntersection: "âŠ“",
              SquareSubset: "âŠ",
              SquareSubsetEqual: "âŠ‘",
              SquareSuperset: "âŠ",
              SquareSupersetEqual: "âŠ’",
              SquareUnion: "âŠ”",
              squarf: "â–ª",
              squf: "â–ª",
              srarr: "â†’",
              sscr: "ð“ˆ",
              Sscr: "ð’®",
              ssetmn: "âˆ–",
              ssmile: "âŒ£",
              sstarf: "â‹†",
              star: "â˜†",
              Star: "â‹†",
              starf: "â˜…",
              straightepsilon: "Ïµ",
              straightphi: "Ï•",
              strns: "Â¯",
              sub: "âŠ‚",
              Sub: "â‹",
              subdot: "âª½",
              sube: "âŠ†",
              subE: "â«…",
              subedot: "â«ƒ",
              submult: "â«",
              subne: "âŠŠ",
              subnE: "â«‹",
              subplus: "âª¿",
              subrarr: "â¥¹",
              subset: "âŠ‚",
              Subset: "â‹",
              subseteq: "âŠ†",
              subseteqq: "â«…",
              SubsetEqual: "âŠ†",
              subsetneq: "âŠŠ",
              subsetneqq: "â«‹",
              subsim: "â«‡",
              subsub: "â«•",
              subsup: "â«“",
              succ: "â‰»",
              succapprox: "âª¸",
              succcurlyeq: "â‰½",
              Succeeds: "â‰»",
              SucceedsEqual: "âª°",
              SucceedsSlantEqual: "â‰½",
              SucceedsTilde: "â‰¿",
              succeq: "âª°",
              succnapprox: "âªº",
              succneqq: "âª¶",
              succnsim: "â‹©",
              succsim: "â‰¿",
              SuchThat: "âˆ‹",
              sum: "âˆ‘",
              Sum: "âˆ‘",
              sung: "â™ª",
              sup: "âŠƒ",
              Sup: "â‹‘",
              sup1: "Â¹",
              sup2: "Â²",
              sup3: "Â³",
              supdot: "âª¾",
              supdsub: "â«˜",
              supe: "âŠ‡",
              supE: "â«†",
              supedot: "â«„",
              Superset: "âŠƒ",
              SupersetEqual: "âŠ‡",
              suphsol: "âŸ‰",
              suphsub: "â«—",
              suplarr: "â¥»",
              supmult: "â«‚",
              supne: "âŠ‹",
              supnE: "â«Œ",
              supplus: "â«€",
              supset: "âŠƒ",
              Supset: "â‹‘",
              supseteq: "âŠ‡",
              supseteqq: "â«†",
              supsetneq: "âŠ‹",
              supsetneqq: "â«Œ",
              supsim: "â«ˆ",
              supsub: "â«”",
              supsup: "â«–",
              swarhk: "â¤¦",
              swarr: "â†™",
              swArr: "â‡™",
              swarrow: "â†™",
              swnwar: "â¤ª",
              szlig: "ÃŸ",
              Tab: "\t",
              target: "âŒ–",
              tau: "Ï„",
              Tau: "Î¤",
              tbrk: "âŽ´",
              tcaron: "Å¥",
              Tcaron: "Å¤",
              tcedil: "Å£",
              Tcedil: "Å¢",
              tcy: "Ñ‚",
              Tcy: "Ð¢",
              tdot: "âƒ›",
              telrec: "âŒ•",
              tfr: "ð”±",
              Tfr: "ð”—",
              there4: "âˆ´",
              therefore: "âˆ´",
              Therefore: "âˆ´",
              theta: "Î¸",
              Theta: "Î˜",
              thetasym: "Ï‘",
              thetav: "Ï‘",
              thickapprox: "â‰ˆ",
              thicksim: "âˆ¼",
              ThickSpace: "âŸâ€Š",
              thinsp: "â€‰",
              ThinSpace: "â€‰",
              thkap: "â‰ˆ",
              thksim: "âˆ¼",
              thorn: "Ã¾",
              THORN: "Ãž",
              tilde: "Ëœ",
              Tilde: "âˆ¼",
              TildeEqual: "â‰ƒ",
              TildeFullEqual: "â‰…",
              TildeTilde: "â‰ˆ",
              times: "Ã—",
              timesb: "âŠ ",
              timesbar: "â¨±",
              timesd: "â¨°",
              tint: "âˆ­",
              toea: "â¤¨",
              top: "âŠ¤",
              topbot: "âŒ¶",
              topcir: "â«±",
              topf: "ð•¥",
              Topf: "ð•‹",
              topfork: "â«š",
              tosa: "â¤©",
              tprime: "â€´",
              trade: "â„¢",
              TRADE: "â„¢",
              triangle: "â–µ",
              triangledown: "â–¿",
              triangleleft: "â—ƒ",
              trianglelefteq: "âŠ´",
              triangleq: "â‰œ",
              triangleright: "â–¹",
              trianglerighteq: "âŠµ",
              tridot: "â—¬",
              trie: "â‰œ",
              triminus: "â¨º",
              TripleDot: "âƒ›",
              triplus: "â¨¹",
              trisb: "â§",
              tritime: "â¨»",
              trpezium: "â¢",
              tscr: "ð“‰",
              Tscr: "ð’¯",
              tscy: "Ñ†",
              TScy: "Ð¦",
              tshcy: "Ñ›",
              TSHcy: "Ð‹",
              tstrok: "Å§",
              Tstrok: "Å¦",
              twixt: "â‰¬",
              twoheadleftarrow: "â†ž",
              twoheadrightarrow: "â† ",
              uacute: "Ãº",
              Uacute: "Ãš",
              uarr: "â†‘",
              uArr: "â‡‘",
              Uarr: "â†Ÿ",
              Uarrocir: "â¥‰",
              ubrcy: "Ñž",
              Ubrcy: "ÐŽ",
              ubreve: "Å­",
              Ubreve: "Å¬",
              ucirc: "Ã»",
              Ucirc: "Ã›",
              ucy: "Ñƒ",
              Ucy: "Ð£",
              udarr: "â‡…",
              udblac: "Å±",
              Udblac: "Å°",
              udhar: "â¥®",
              ufisht: "â¥¾",
              ufr: "ð”²",
              Ufr: "ð”˜",
              ugrave: "Ã¹",
              Ugrave: "Ã™",
              uHar: "â¥£",
              uharl: "â†¿",
              uharr: "â†¾",
              uhblk: "â–€",
              ulcorn: "âŒœ",
              ulcorner: "âŒœ",
              ulcrop: "âŒ",
              ultri: "â—¸",
              umacr: "Å«",
              Umacr: "Åª",
              uml: "Â¨",
              UnderBar: "_",
              UnderBrace: "âŸ",
              UnderBracket: "âŽµ",
              UnderParenthesis: "â",
              Union: "â‹ƒ",
              UnionPlus: "âŠŽ",
              uogon: "Å³",
              Uogon: "Å²",
              uopf: "ð•¦",
              Uopf: "ð•Œ",
              uparrow: "â†‘",
              Uparrow: "â‡‘",
              UpArrow: "â†‘",
              UpArrowBar: "â¤’",
              UpArrowDownArrow: "â‡…",
              updownarrow: "â†•",
              Updownarrow: "â‡•",
              UpDownArrow: "â†•",
              UpEquilibrium: "â¥®",
              upharpoonleft: "â†¿",
              upharpoonright: "â†¾",
              uplus: "âŠŽ",
              UpperLeftArrow: "â†–",
              UpperRightArrow: "â†—",
              upsi: "Ï…",
              Upsi: "Ï’",
              upsih: "Ï’",
              upsilon: "Ï…",
              Upsilon: "Î¥",
              UpTee: "âŠ¥",
              UpTeeArrow: "â†¥",
              upuparrows: "â‡ˆ",
              urcorn: "âŒ",
              urcorner: "âŒ",
              urcrop: "âŒŽ",
              uring: "Å¯",
              Uring: "Å®",
              urtri: "â—¹",
              uscr: "ð“Š",
              Uscr: "ð’°",
              utdot: "â‹°",
              utilde: "Å©",
              Utilde: "Å¨",
              utri: "â–µ",
              utrif: "â–´",
              uuarr: "â‡ˆ",
              uuml: "Ã¼",
              Uuml: "Ãœ",
              uwangle: "â¦§",
              vangrt: "â¦œ",
              varepsilon: "Ïµ",
              varkappa: "Ï°",
              varnothing: "âˆ…",
              varphi: "Ï•",
              varpi: "Ï–",
              varpropto: "âˆ",
              varr: "â†•",
              vArr: "â‡•",
              varrho: "Ï±",
              varsigma: "Ï‚",
              varsubsetneq: "âŠŠï¸€",
              varsubsetneqq: "â«‹ï¸€",
              varsupsetneq: "âŠ‹ï¸€",
              varsupsetneqq: "â«Œï¸€",
              vartheta: "Ï‘",
              vartriangleleft: "âŠ²",
              vartriangleright: "âŠ³",
              vBar: "â«¨",
              Vbar: "â««",
              vBarv: "â«©",
              vcy: "Ð²",
              Vcy: "Ð’",
              vdash: "âŠ¢",
              vDash: "âŠ¨",
              Vdash: "âŠ©",
              VDash: "âŠ«",
              Vdashl: "â«¦",
              vee: "âˆ¨",
              Vee: "â‹",
              veebar: "âŠ»",
              veeeq: "â‰š",
              vellip: "â‹®",
              verbar: "|",
              Verbar: "â€–",
              vert: "|",
              Vert: "â€–",
              VerticalBar: "âˆ£",
              VerticalLine: "|",
              VerticalSeparator: "â˜",
              VerticalTilde: "â‰€",
              VeryThinSpace: "â€Š",
              vfr: "ð”³",
              Vfr: "ð”™",
              vltri: "âŠ²",
              vnsub: "âŠ‚âƒ’",
              vnsup: "âŠƒâƒ’",
              vopf: "ð•§",
              Vopf: "ð•",
              vprop: "âˆ",
              vrtri: "âŠ³",
              vscr: "ð“‹",
              Vscr: "ð’±",
              vsubne: "âŠŠï¸€",
              vsubnE: "â«‹ï¸€",
              vsupne: "âŠ‹ï¸€",
              vsupnE: "â«Œï¸€",
              Vvdash: "âŠª",
              vzigzag: "â¦š",
              wcirc: "Åµ",
              Wcirc: "Å´",
              wedbar: "â©Ÿ",
              wedge: "âˆ§",
              Wedge: "â‹€",
              wedgeq: "â‰™",
              weierp: "â„˜",
              wfr: "ð”´",
              Wfr: "ð”š",
              wopf: "ð•¨",
              Wopf: "ð•Ž",
              wp: "â„˜",
              wr: "â‰€",
              wreath: "â‰€",
              wscr: "ð“Œ",
              Wscr: "ð’²",
              xcap: "â‹‚",
              xcirc: "â—¯",
              xcup: "â‹ƒ",
              xdtri: "â–½",
              xfr: "ð”µ",
              Xfr: "ð”›",
              xharr: "âŸ·",
              xhArr: "âŸº",
              xi: "Î¾",
              Xi: "Îž",
              xlarr: "âŸµ",
              xlArr: "âŸ¸",
              xmap: "âŸ¼",
              xnis: "â‹»",
              xodot: "â¨€",
              xopf: "ð•©",
              Xopf: "ð•",
              xoplus: "â¨",
              xotime: "â¨‚",
              xrarr: "âŸ¶",
              xrArr: "âŸ¹",
              xscr: "ð“",
              Xscr: "ð’³",
              xsqcup: "â¨†",
              xuplus: "â¨„",
              xutri: "â–³",
              xvee: "â‹",
              xwedge: "â‹€",
              yacute: "Ã½",
              Yacute: "Ã",
              yacy: "Ñ",
              YAcy: "Ð¯",
              ycirc: "Å·",
              Ycirc: "Å¶",
              ycy: "Ñ‹",
              Ycy: "Ð«",
              yen: "Â¥",
              yfr: "ð”¶",
              Yfr: "ð”œ",
              yicy: "Ñ—",
              YIcy: "Ð‡",
              yopf: "ð•ª",
              Yopf: "ð•",
              yscr: "ð“Ž",
              Yscr: "ð’´",
              yucy: "ÑŽ",
              YUcy: "Ð®",
              yuml: "Ã¿",
              Yuml: "Å¸",
              zacute: "Åº",
              Zacute: "Å¹",
              zcaron: "Å¾",
              Zcaron: "Å½",
              zcy: "Ð·",
              Zcy: "Ð—",
              zdot: "Å¼",
              Zdot: "Å»",
              zeetrf: "â„¨",
              ZeroWidthSpace: "â€‹",
              zeta: "Î¶",
              Zeta: "Î–",
              zfr: "ð”·",
              Zfr: "â„¨",
              zhcy: "Ð¶",
              ZHcy: "Ð–",
              zigrarr: "â‡",
              zopf: "ð•«",
              Zopf: "â„¤",
              zscr: "ð“",
              Zscr: "ð’µ",
              zwj: "â€",
              zwnj: "â€Œ",
            },
            E = {
              aacute: "Ã¡",
              Aacute: "Ã",
              acirc: "Ã¢",
              Acirc: "Ã‚",
              acute: "Â´",
              aelig: "Ã¦",
              AElig: "Ã†",
              agrave: "Ã ",
              Agrave: "Ã€",
              amp: "&",
              AMP: "&",
              aring: "Ã¥",
              Aring: "Ã…",
              atilde: "Ã£",
              Atilde: "Ãƒ",
              auml: "Ã¤",
              Auml: "Ã„",
              brvbar: "Â¦",
              ccedil: "Ã§",
              Ccedil: "Ã‡",
              cedil: "Â¸",
              cent: "Â¢",
              copy: "Â©",
              COPY: "Â©",
              curren: "Â¤",
              deg: "Â°",
              divide: "Ã·",
              eacute: "Ã©",
              Eacute: "Ã‰",
              ecirc: "Ãª",
              Ecirc: "ÃŠ",
              egrave: "Ã¨",
              Egrave: "Ãˆ",
              eth: "Ã°",
              ETH: "Ã",
              euml: "Ã«",
              Euml: "Ã‹",
              frac12: "Â½",
              frac14: "Â¼",
              frac34: "Â¾",
              gt: ">",
              GT: ">",
              iacute: "Ã­",
              Iacute: "Ã",
              icirc: "Ã®",
              Icirc: "ÃŽ",
              iexcl: "Â¡",
              igrave: "Ã¬",
              Igrave: "ÃŒ",
              iquest: "Â¿",
              iuml: "Ã¯",
              Iuml: "Ã",
              laquo: "Â«",
              lt: "<",
              LT: "<",
              macr: "Â¯",
              micro: "Âµ",
              middot: "Â·",
              nbsp: "Â ",
              not: "Â¬",
              ntilde: "Ã±",
              Ntilde: "Ã‘",
              oacute: "Ã³",
              Oacute: "Ã“",
              ocirc: "Ã´",
              Ocirc: "Ã”",
              ograve: "Ã²",
              Ograve: "Ã’",
              ordf: "Âª",
              ordm: "Âº",
              oslash: "Ã¸",
              Oslash: "Ã˜",
              otilde: "Ãµ",
              Otilde: "Ã•",
              ouml: "Ã¶",
              Ouml: "Ã–",
              para: "Â¶",
              plusmn: "Â±",
              pound: "Â£",
              quot: '"',
              QUOT: '"',
              raquo: "Â»",
              reg: "Â®",
              REG: "Â®",
              sect: "Â§",
              shy: "Â­",
              sup1: "Â¹",
              sup2: "Â²",
              sup3: "Â³",
              szlig: "ÃŸ",
              thorn: "Ã¾",
              THORN: "Ãž",
              times: "Ã—",
              uacute: "Ãº",
              Uacute: "Ãš",
              ucirc: "Ã»",
              Ucirc: "Ã›",
              ugrave: "Ã¹",
              Ugrave: "Ã™",
              uml: "Â¨",
              uuml: "Ã¼",
              Uuml: "Ãœ",
              yacute: "Ã½",
              Yacute: "Ã",
              yen: "Â¥",
              yuml: "Ã¿",
            },
            b = {
              0: "ï¿½",
              128: "â‚¬",
              130: "â€š",
              131: "Æ’",
              132: "â€ž",
              133: "â€¦",
              134: "â€ ",
              135: "â€¡",
              136: "Ë†",
              137: "â€°",
              138: "Å ",
              139: "â€¹",
              140: "Å’",
              142: "Å½",
              145: "â€˜",
              146: "â€™",
              147: "â€œ",
              148: "â€",
              149: "â€¢",
              150: "â€“",
              151: "â€”",
              152: "Ëœ",
              153: "â„¢",
              154: "Å¡",
              155: "â€º",
              156: "Å“",
              158: "Å¾",
              159: "Å¸",
            },
            A = [
              1, 2, 3, 4, 5, 6, 7, 8, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21,
              22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 127, 128, 129, 130, 131,
              132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144,
              145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157,
              158, 159, 64976, 64977, 64978, 64979, 64980, 64981, 64982, 64983,
              64984, 64985, 64986, 64987, 64988, 64989, 64990, 64991, 64992,
              64993, 64994, 64995, 64996, 64997, 64998, 64999, 65e3, 65001,
              65002, 65003, 65004, 65005, 65006, 65007, 65534, 65535, 131070,
              131071, 196606, 196607, 262142, 262143, 327678, 327679, 393214,
              393215, 458750, 458751, 524286, 524287, 589822, 589823, 655358,
              655359, 720894, 720895, 786430, 786431, 851966, 851967, 917502,
              917503, 983038, 983039, 1048574, 1048575, 1114110, 1114111,
            ],
            I = String.fromCharCode,
            y = {}.hasOwnProperty,
            has = function (e, t) {
              return y.call(e, t);
            },
            merge = function (e, t) {
              if (!e) return t;
              var r,
                n = {};
              for (r in t) n[r] = has(e, r) ? e[r] : t[r];
              return n;
            },
            codePointToSymbol = function (e, t) {
              var r = "";
              return (e >= 55296 && e <= 57343) || e > 1114111
                ? (t &&
                    parseError(
                      "character reference outside the permissible Unicode range",
                    ),
                  "ï¿½")
                : has(b, e)
                  ? (t && parseError("disallowed character reference"), b[e])
                  : (t &&
                      (function (e, t) {
                        for (var r = -1, n = e.length; ++r < n; )
                          if (e[r] == t) return !0;
                        return !1;
                      })(A, e) &&
                      parseError("disallowed character reference"),
                    e > 65535 &&
                      ((r += I((((e -= 65536) >>> 10) & 1023) | 55296)),
                      (e = 56320 | (1023 & e))),
                    (r += I(e)));
            },
            hexEscape = function (e) {
              return "&#x" + e.toString(16).toUpperCase() + ";";
            },
            decEscape = function (e) {
              return "&#" + e + ";";
            },
            parseError = function (e) {
              throw Error("Parse error: " + e);
            },
            encode = function (e, t) {
              (t = merge(t, encode.options)).strict &&
                f.test(e) &&
                parseError("forbidden code point");
              var r = t.encodeEverything,
                n = t.useNamedReferences,
                i = t.allowUnsafeSymbols,
                o = t.decimal ? decEscape : hexEscape,
                escapeBmpSymbol = function (e) {
                  return o(e.charCodeAt(0));
                };
              return (
                r
                  ? ((e = e.replace(c, function (e) {
                      return n && has(d, e)
                        ? "&" + d[e] + ";"
                        : escapeBmpSymbol(e);
                    })),
                    n &&
                      (e = e
                        .replace(/&gt;\u20D2/g, "&nvgt;")
                        .replace(/&lt;\u20D2/g, "&nvlt;")
                        .replace(/&#x66;&#x6A;/g, "&fjlig;")),
                    n &&
                      (e = e.replace(u, function (e) {
                        return "&" + d[e] + ";";
                      })))
                  : n
                    ? (i ||
                        (e = e.replace(g, function (e) {
                          return "&" + d[e] + ";";
                        })),
                      (e = (e = e
                        .replace(/&gt;\u20D2/g, "&nvgt;")
                        .replace(/&lt;\u20D2/g, "&nvlt;")).replace(
                        u,
                        function (e) {
                          return "&" + d[e] + ";";
                        },
                      )))
                    : i || (e = e.replace(g, escapeBmpSymbol)),
                e
                  .replace(a, function (e) {
                    var t = e.charCodeAt(0),
                      r = e.charCodeAt(1);
                    return o(1024 * (t - 55296) + r - 56320 + 65536);
                  })
                  .replace(l, escapeBmpSymbol)
              );
            };
          encode.options = {
            allowUnsafeSymbols: !1,
            encodeEverything: !1,
            strict: !1,
            useNamedReferences: !1,
            decimal: !1,
          };
          var decode = function (e, t) {
            var r = (t = merge(t, decode.options)).strict;
            return (
              r && h.test(e) && parseError("malformed character reference"),
              e.replace(m, function (e, n, i, o, s, a, c, l, u) {
                var d, g, p, h, f, m;
                return n
                  ? S[(f = n)]
                  : i
                    ? ((f = i),
                      (m = o) && t.isAttributeValue
                        ? (r &&
                            "=" == m &&
                            parseError(
                              "`&` did not start a character reference",
                            ),
                          e)
                        : (r &&
                            parseError(
                              "named character reference was not terminated by a semicolon",
                            ),
                          E[f] + (m || "")))
                    : s
                      ? ((p = s),
                        (g = a),
                        r &&
                          !g &&
                          parseError(
                            "character reference was not terminated by a semicolon",
                          ),
                        (d = parseInt(p, 10)),
                        codePointToSymbol(d, r))
                      : c
                        ? ((h = c),
                          (g = l),
                          r &&
                            !g &&
                            parseError(
                              "character reference was not terminated by a semicolon",
                            ),
                          (d = parseInt(h, 16)),
                          codePointToSymbol(d, r))
                        : (r &&
                            parseError(
                              "named character reference was not terminated by a semicolon",
                            ),
                          e);
              })
            );
          };
          decode.options = {
            isAttributeValue: !1,
            strict: !1,
          };
          var v = {
            version: "1.2.0",
            encode: encode,
            decode: decode,
            escape: function (e) {
              return e.replace(g, function (e) {
                return p[e];
              });
            },
            unescape: decode,
          };
          void 0 ===
            (n = function () {
              return v;
            }.call(t, r, t, e)) || (e.exports = n);
        })();
      }).call(this, r(53)(e));
    },
    function (e, t) {
      e.exports = function (e) {
        return (
          e.webpackPolyfill ||
            ((e.deprecate = function () {}),
            (e.paths = []),
            e.children || (e.children = []),
            Object.defineProperty(e, "loaded", {
              enumerable: !0,
              get: function () {
                return e.l;
              },
            }),
            Object.defineProperty(e, "id", {
              enumerable: !0,
              get: function () {
                return e.i;
              },
            }),
            (e.webpackPolyfill = 1)),
          e
        );
      };
    },
    function (e, t) {
      e.exports = require("@nodert-win10-rs4/windows.services.store");
    },
    function (e, t, r) {
      "use strict";
      var n =
        (this && this.__awaiter) ||
        function (e, t, r, n) {
          return new (r || (r = Promise))(function (i, o) {
            function fulfilled(e) {
              try {
                step(n.next(e));
              } catch (e) {
                o(e);
              }
            }
            function rejected(e) {
              try {
                step(n.throw(e));
              } catch (e) {
                o(e);
              }
            }
            function step(e) {
              e.done
                ? i(e.value)
                : (function adopt(e) {
                    return e instanceof r
                      ? e
                      : new r(function (t) {
                          t(e);
                        });
                  })(e.value).then(fulfilled, rejected);
            }
            step((n = n.apply(e, t || [])).next());
          });
        };
      Object.defineProperty(t, "__esModule", {
        value: !0,
      }),
        (t.MediaTouchpad = void 0);
      const i = r(28),
        o = r(56),
        s = r(3),
        a = r(57),
        c = r(4);
      class MediaTouchpad {
        constructor() {
          (this.supportDeviceList = [
            {
              usagePage: 65280,
              usageId: 1,
              VID: 2362,
              PID: 14389,
              HidAddress: 32,
            },
            {
              usagePage: 65280,
              usageId: 1,
              VID: 2362,
              PID: 14390,
              HidAddress: 32,
            },
          ]),
            this.init();
        }
        static getInstance() {
          return (
            MediaTouchpad.instance ||
              (MediaTouchpad.instance = new MediaTouchpad()),
            MediaTouchpad.instance
          );
        }
        init() {
          return n(this, void 0, void 0, function* () {
            for (const e of this.supportDeviceList)
              if (
                (s.LogIt.getInstance().debug(
                  `[mtp] == Try to find "${e.PID}" .....  `,
                ),
                (this.hidDevice = yield this.connectDevice(
                  e.usagePage,
                  e.usageId,
                  e.VID,
                  e.PID,
                  e.HidAddress,
                )),
                s.LogIt.getInstance().debug(
                  `[mtp] == Try to find "${e.PID}" .....${JSON.stringify(this.hidDevice)}  `,
                ),
                this.hidDevice)
              ) {
                if (
                  (s.LogIt.getInstance().debug(
                    `[mtp] == Try to find "${e.PID}" ..... SUCCESSED!  `,
                  ),
                  12821 != e.PID)
                )
                  break;
                c.EnvConfig.getInstance().devTool ||
                c.EnvConfig.getInstance().devMode
                  ? s.LogIt.getInstance().debug(
                      "[mtp] == This device only for testModel.. Found devMode or devTool key!",
                    )
                  : (s.LogIt.getInstance().debug(
                      "[mtp] == This device only for testModel.. NoFound devMode or devTool key!Please add devMode or devTool key ,if you want to open Media touchpad control section.",
                    ),
                    (this.hidDevice = null));
              } else
                s.LogIt.getInstance().debug(
                  `[mtp] == Try to find "${e.PID}" ..... FAILED!  `,
                );
          });
        }
        connectDevice(e, t, r, a, c) {
          return n(this, void 0, void 0, function* () {
            return new Promise((n, c) => {
              try {
                const c = o.HidDevice.getDeviceSelector(e, t, r, a);
                i.DeviceInformation.findAllAsync(c, (e, t) => {
                  var r;
                  try {
                    if (
                      null === (r = null == t ? void 0 : t.first()) ||
                      void 0 === r
                        ? void 0
                        : r.current
                    ) {
                      const e = t.first().current;
                      s.LogIt.getInstance().info(
                        "mtp device - Found, id: " + e.id,
                      ),
                        o.HidDevice.fromIdAsync(e.id, 0, (e, t) => {
                          t
                            ? (s.LogIt.getInstance().info(
                                "mtp device open success",
                              ),
                              n(t))
                            : (s.LogIt.getInstance().error(
                                "mtp HidDevice.fromIdAsync: " +
                                  JSON.stringify(e),
                              ),
                              n(null));
                        });
                    } else
                      s.LogIt.getInstance().info("mtp device Not found"),
                        n(null);
                  } catch (e) {
                    s.LogIt.getInstance().info(
                      "connectDevice1: " + JSON.stringify(e),
                    ),
                      n(null);
                  }
                });
              } catch (e) {
                s.LogIt.getInstance().error(
                  "connectDevice: " + JSON.stringify(e),
                ),
                  n(null);
              }
            });
          });
        }
        isDeviceAvailable() {
          return null != this.hidDevice;
        }
        readRegister(e, t) {
          return n(this, void 0, void 0, function* () {
            return new Promise((r, i) => {
              const o = this.hidDevice.createFeatureReport(),
                s = new Uint8Array(o.data.capacity);
              (s[0] = 67), (s[1] = e), (s[2] = 16 | t), (s[3] = 0);
              const c = new a.DataWriter();
              s.forEach((e) => c.writeByte(e)),
                (o.data = c.detachBuffer()),
                this.hidDevice.sendFeatureReportAsync(o, () =>
                  n(this, void 0, void 0, function* () {
                    this.hidDevice.getFeatureReportAsync(67, (e, t) => {
                      var n = a.DataReader.fromBuffer(t.data);
                      const i = new Uint8Array(4);
                      (i[0] = n.readByte()),
                        (i[1] = n.readByte()),
                        (i[2] = n.readByte()),
                        (i[3] = n.readByte()),
                        r(i);
                    });
                  }),
                );
            });
          });
        }
        writeRegister(e, t, r) {
          return n(this, void 0, void 0, function* () {
            return new Promise((i, o) => {
              const s = this.hidDevice.createFeatureReport(),
                c = new Uint8Array(s.data.capacity);
              (c[0] = 67), (c[1] = e), (c[2] = t), (c[3] = r);
              const l = new a.DataWriter();
              c.forEach((e) => l.writeByte(e)),
                (s.data = l.detachBuffer()),
                this.hidDevice.sendFeatureReportAsync(s, () =>
                  n(this, void 0, void 0, function* () {
                    i(!0);
                  }),
                );
            });
          });
        }
      }
      t.MediaTouchpad = MediaTouchpad;
    },
    function (e, t) {
      e.exports = require("@nodert-win10-rs4/windows.devices.humaninterfacedevice");
    },
    function (e, t) {
      e.exports = require("@nodert-win10-rs4/windows.storage.streams");
    },
    function (e, t) {
      e.exports = require("electron-localshortcut");
    },
    function (e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0,
      }),
        (t.connectToServer = t.setupWebApp = void 0);
      const n = r(60),
        i = r(7);
      var o = r(2),
        s = (r(5), r(63)),
        a = s(),
        c = r(64);
      (t.setupWebApp = function setupWebApp(e) {
        const t = {
            pfx: new Buffer(
              "MIIKSQIBAzCCCgUGCSqGSIb3DQEHAaCCCfYEggnyMIIJ7jCCBg8GCSqGSIb3DQEHAaCCBgAEggX8MIIF+DCCBfQGCyqGSIb3DQEMCgECoIIE/jCCBPowHAYKKoZIhvcNAQwBAzAOBAiBfboUmJb/YgICB9AEggTY6zHSEh6omXAkZR2ecqvGAbXyscnbsovSVojp74LCuX/WZzKLjRUhWl6v6suZQwCmCndkTWcaBDtaACgIaP+dl6OLlLAy7UIvr7zyMfHH1AISKKo74luONThKEY8TCsVH4qkmarr+slQKsvHEikXeuoZlvCIMhUOwSBBE2gU8S/mBpAzCk/zyWyR7fz1eQFoOf41toGcEW60W0PBdJgFWjFZdgfcyUmrVRtmRakbM27p+nf864uKkiAIcIHcDio4thyPHpzXwrzckpVZzuz58hAfCK15izGETolk1SFtQD4BrAeQLcBwuSDqK/WtnoUz8QKEi7hAoYGJPXZ4+cQz6+w7wUk1sa0pA4Tp9D+vJjJ1I/RGT5axDN3vYkjbIXew9rTPdl3Mtx+LV2c+LTmIGsgrsFFPcwRRJkp7F7BJVDi2RY/uC/IWBMeZ+PzzJsYT9KuOta1SnKF7gIpKgrwJrIkWTQaSeyrnNcfnx+ARFVCoq6QOW61selObUal/SP3r+5jQukc5bd33S/bKqHSQD9tQNh4iaHS8RgZXGipkj6d1AvdoUWRwbqAarUFvZaPcPLFT6DhaOL/tP62UtUt4vh+Qcj6I9VuAwMOzH5hXf1l1Xhkt0/MLxHXgT+cTFayvheaZItD9My/4fzRRKQeZGam8g2VPWqx0K0sbrZO4uW6W52ZNe9eF6DIXSiA1h7lvEuPg/qF+Y7ZkurctSVrMVlnykliKrnBQtONs6TiUzSw++rfTCIlCzqnSnaIjdQTc5xvCYXu825rfM57gu++rggh8leuFlLGTC/Gu9h2oIRojqFLxp3pMHQBxn7oSGWNXHcW+VBu2S226zTFyXXKm5bAOHuNn7GjKKwH80Cx0C4bYZFkqP0p7V0d16lbazuh51UEGJhEujLk4V7iZrG+WV99cSxW5tLl4l9g6TzB0Fbsc2q2ZaglW0XRaQw5xhE/drbvHB6MhWqWC6sr1tw8eByJHFPST4lH0it6BPVdMxlBe9kFlQhuUsESrlHcYOHwOky1a4VvYKB+gtE3CBqxjNpicDER9Vl5hVCj03C880LV62LZoox8tgrLlpEHBhtmALlCA6Dq0PxY8eERSym9C2rFmglsTrvNrEGlPbPclBmqWM7m9nDxWT6nE+jbmn87MOTgji2SBbSpbFmKISqUa38oqJ/OEsHeYCs+w8BKYrWvyEUQSAMAyomJfqDUufI1wLo3yw1gtp3gAa3466gdLpYROy1vyz42g8n11riDLHTJyoedEFTkX81Om0P444+YDz6UOCLfiGgS4MxzPKSHDQUwuIXcm3EUe57l47B8Be5aqrabj7IH4xynDrXhB6Mi+4HtI4kj9ouJvaDOeSseTBW086FGIiBociLJGA4Hh4dumJpS1YHbnfl1GLx6B7VT//a50cuJAAqWiJh+KmhaXE+zsPnnQ5k3pqzzREQtz03eGS58CUYkajolrvLbnyYNzyITsBrrLmYT2vdlXeOSOh3rOjsAmjib0qJIAZ6aL9u4NRi7Pyelo+IQjLyQr2aRNKz56+BEDymIhVFdXmShGfyZ4PvS6hGLpJj7PkHtxbFI4Otr+QvXF1fWebONht5i8EAWtfvAHj0hZQCZUZoDNs7pvaI6SBLdB9kep7ek4OyvVjazs+ZiljAzGB4jANBgkrBgEEAYI3EQIxADATBgkqhkiG9w0BCRUxBgQEAQAAADBdBgkqhkiG9w0BCRQxUB5OAHQAZQAtADQAYgA4ADcAZABmADQAZQAtADUANQBhAGIALQA0ADcAMABiAC0AYgA0ADMANAAtADAAMwAzADkAZABlADYAZABhAGQAZQA0MF0GCSsGAQQBgjcRATFQHk4ATQBpAGMAcgBvAHMAbwBmAHQAIABTAG8AZgB0AHcAYQByAGUAIABLAGUAeQAgAFMAdABvAHIAYQBnAGUAIABQAHIAbwB2AGkAZABlAHIwggPXBgkqhkiG9w0BBwagggPIMIIDxAIBADCCA70GCSqGSIb3DQEHATAcBgoqhkiG9w0BDAEDMA4ECAvi69yTeYufAgIH0ICCA5DLvzeu792IbxaZhfBObHVsG43gA6mNhdPNnLzOmxAFgCF82qJU7UNMNMdnZqhG0IBpdaxH2JgaNK77rVbKT1QSmzT33tQFp3qatl21MgzkOmSAX1jxzUTVfdBrHsLz11f4YE9lWQOB/ikYBUKM/tftemve5MyXTNjcrTb9AKG5JiPn1ODjLn/Dya9/nhIWMy/t5nNZsLD6SpmDnC9d/+yWhIQGZiDOF2VH//DYZozyyAXavpM9z8Alj7NaJpTqJtw2BbhXBTT+d6lo6tTVAfTTcA0dzMpX2Cg2vlpJX5dJNohj/ADX5f8mHLzX5SRhH7vuPEL3WdLZcgf6VjQCRahW3lBHoBc27azIidAPpnuoIaY8GcaVApEyk5JG/UbaQu87H2CGQU8mD5XeHowtwXdq9SrcVCuRAXhX37mXNNOTdo40jwW2A3E/gkK3JCRZORgXNlFJzWogJVXrs4zP8FJpG4L1Yi96aaTMErsVzoxDlBNdd7K6pSvmfKKjSyfSJPexDzl+F028SNrX+NlwXAYaXLygvSuTxn+ONtXOb3dPZnGrw3/tsv7DKnZw/FudsWQNA8v5Q+D7Tt7NOaGdQO+ts8b0jSKjDdeF7ILsKg0wUc5nQrFQl/4NZdMGzXjKyPgxMLhEdc0tBQw/zoGln6mTNg7pxSGanfe2HlBkcTh9o3py2hcCixs/3e2DItCDeq25OFqw9+u0lBr4wOFC9rBWscOca6xmsj8uojIAcl8XHTij17F2O2pXUE0xd3sJblVrwPc4JpEAdnBISIezoDpPzomyo6+lXvBVh6iS0eUmfPRCJA+fqbniOHLSAhElDckYcujWivuLfzXRgFgh+7qHH3zTWOYtJpgxALeRaiFhQXXs4YxRHwOeFimQhBOyaDLhN8n1mKV+5yG4WB0KUvB1bGY0JtEzHEY4boDMML8zLGha93mYaW7q3VZ6DSXdiqC7I0ROlZN+ckVwn5KgUq+tQVYTfxw5wPByYuX1/C5U+MPpA9qiHh6ZmgJTpMK4pDXs0ysV4XXghDu+b+OUOJ9codeZPJgW5HYx+A+KdAjaq5gUAW+W9rzzmphFdn4zfbEMPJ2P4o1ldGw5sQ4V6nMzAzTDe3JgPiS35E6HE2d1rpvJnvd3VPxlkVtPJEH9jDYyaMU6cD/LryMoSf3zJ68A3zKhQZjTH+K00k7mr3zfS3zxoX4iyX4uSK++xwO+amQwOzAfMAcGBSsOAwIaBBQ/dhFaZx+Ue0dwQq1Wk5TramIBbwQUaAp0mQUeYEBTz1BX/k+BYKGXPaQCAgfQ",
              "base64",
            ),
            passphrase: "password",
            rejectUnauthorized: !1,
          },
          r = c.createServer(t, a);
        return (
          n.MQTTServer.getInstance().init(a, r),
          a.use("/", function (e, t, r) {
            const n = e.originalUrl.substring(e.baseUrl.length);
            if ((0, i.isVFSFileExists)(n)) {
              const e = o.join(i.oemVFS, n);
              t.sendFile(e);
            } else r();
          }),
          a.use("/planet9", s.static(o.join(i.oemFolder, "Common/Planet9"))),
          a.use("/", s.static(e)),
          a.use(function (t, r, n) {
            r.sendFile(o.join(e, "index.html"));
          }),
          r
        );
      }),
        (t.connectToServer = function connectToServer(e, t) {
          e.listen(t);
        });
    },
    function (e, t, r) {
      "use strict";
      var n =
        (this && this.__awaiter) ||
        function (e, t, r, n) {
          return new (r || (r = Promise))(function (i, o) {
            function fulfilled(e) {
              try {
                step(n.next(e));
              } catch (e) {
                o(e);
              }
            }
            function rejected(e) {
              try {
                step(n.throw(e));
              } catch (e) {
                o(e);
              }
            }
            function step(e) {
              e.done
                ? i(e.value)
                : (function adopt(e) {
                    return e instanceof r
                      ? e
                      : new r(function (t) {
                          t(e);
                        });
                  })(e.value).then(fulfilled, rejected);
            }
            step((n = n.apply(e, t || [])).next());
          });
        };
      Object.defineProperty(t, "__esModule", {
        value: !0,
      }),
        (t.MQTTServer = void 0);
      const i = r(2),
        o = r(61);
      class MQTTServer {
        constructor() {}
        static getInstance() {
          return (
            MQTTServer.instance || (MQTTServer.instance = new MQTTServer()),
            MQTTServer.instance
          );
        }
        init(e, t) {
          (this.mqttBroker = r(62)()),
            this.init_host(e),
            this.init_aedes(this.mqttBroker),
            (this.httpsServer = t),
            (this.websocketServer = o.createServer(
              {
                server: this.httpsServer,
                path: "/mqtt",
              },
              this.mqttBroker.handle,
            ));
        }
        init_host(e) {
          e.get("/api", (e, t) => {
            t.send("Server is Working!");
          }),
            e.get("/api/js/mqtt_ddsc.js", (e, t) => {
              t.type(".js");
              const r = {
                root: i.join(__dirname, "assets/js/"),
              };
              t.sendFile("mqtt_ddsc.js", r, (e) => {
                console.log("Sent mqtt_ddsc...");
              });
            });
        }
        init_aedes(e) {
          e.on("subscribe", function (t, r) {
            console.log(
              "MQTT client [32m" +
                (r ? r.id : r) +
                "[0m subscribed to topics: " +
                t.map((e) => e.topic).join("\n"),
              "from broker",
              e.id,
            );
          }),
            e.on("unsubscribe", function (t, r) {
              console.log(
                "MQTT client [32m" +
                  (r ? r.id : r) +
                  "[0m unsubscribed to topics: " +
                  t.join("\n"),
                "from broker",
                e.id,
              );
            }),
            e.on("client", function (t) {
              console.log(
                "Client Connected: [33m" + (t ? t.id : t) + "[0m",
                "to broker",
                e.id,
              );
            }),
            e.on("clientDisconnect", function (t) {
              console.log(
                "Client Disconnected: [31m" + (t ? t.id : t) + "[0m",
                "to broker",
                e.id,
              );
            }),
            e.on("publish", function (e, t) {
              return n(this, void 0, void 0, function* () {});
            }),
            e.on("connectionError", function (e, t) {
              console.log("connectionError", t);
            }),
            e.on("keepaliveTimeout", function (e, t) {
              console.log("keepaliveTimeout", t);
            }),
            e.on("ack", function (e, t) {
              console.log("brokerObj ack", t);
            }),
            e.on("ping", function (e, t) {
              console.log("brokerObj ping");
            }),
            e.on("connackSent", function (e, t) {
              console.log("brokerObj connackSent");
            }),
            e.on("closed", function (e, t) {
              console.log("closed", t);
            });
        }
      }
      t.MQTTServer = MQTTServer;
    },
    function (e, t) {
      e.exports = require("websocket-stream");
    },
    function (e, t) {
      e.exports = require("aedes");
    },
    function (e, t) {
      e.exports = require("express");
    },
    function (e, t) {
      e.exports = require("https");
    },
    function (e, t, r) {
      e.exports = r(66);
    },
    function (e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0,
      }),
        (t.enable = t.initialize = void 0);
      var n = r(67);
      Object.defineProperty(t, "initialize", {
        enumerable: !0,
        get: function () {
          return n.initialize;
        },
      }),
        Object.defineProperty(t, "enable", {
          enumerable: !0,
          get: function () {
            return n.enable;
          },
        });
    },
    function (e, t, r) {
      "use strict";
      var n =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule
            ? e
            : {
                default: e,
              };
        };
      Object.defineProperty(t, "__esModule", {
        value: !0,
      }),
        (t.initialize = t.enable = t.isRemoteModuleEnabled = void 0);
      const i = r(13),
        o = n(r(68)),
        s = r(69),
        a = r(0),
        c = r(70).getElectronBinding("v8_util"),
        l = (() => {
          var e, t;
          const r = Number(
            null ===
              (t =
                null === (e = process.versions.electron) || void 0 === e
                  ? void 0
                  : e.split(".")) || void 0 === t
              ? void 0
              : t[0],
          );
          return Number.isNaN(r) || r < 14;
        })(),
        u = ["length", "name", "arguments", "caller", "prototype"],
        d = new Map(),
        g = new FinalizationRegistry((e) => {
          const t = e.id[0] + "~" + e.id[1],
            r = d.get(t);
          if (
            void 0 !== r &&
            void 0 === r.deref() &&
            (d.delete(t), !e.webContents.isDestroyed())
          )
            try {
              e.webContents.sendToFrame(
                e.frameId,
                "REMOTE_RENDERER_RELEASE_CALLBACK",
                e.id[0],
                e.id[1],
              );
            } catch (e) {
              console.warn("sendToFrame() failed: " + e);
            }
        });
      function getCachedRendererFunction(e) {
        const t = e[0] + "~" + e[1],
          r = d.get(t);
        if (void 0 !== r) {
          const e = r.deref();
          if (void 0 !== e) return e;
        }
      }
      const p = new WeakMap(),
        getObjectMembers = function (e) {
          let t = Object.getOwnPropertyNames(e);
          return (
            "function" == typeof e && (t = t.filter((e) => !u.includes(e))),
            t.map((t) => {
              const r = Object.getOwnPropertyDescriptor(e, t);
              let n,
                i = !1;
              return (
                void 0 === r.get && "function" == typeof e[t]
                  ? (n = "method")
                  : ((r.set || r.writable) && (i = !0), (n = "get")),
                {
                  name: t,
                  enumerable: r.enumerable,
                  writable: i,
                  type: n,
                }
              );
            })
          );
        },
        getObjectPrototype = function (e) {
          const t = Object.getPrototypeOf(e);
          return null === t || t === Object.prototype
            ? null
            : {
                members: getObjectMembers(t),
                proto: getObjectPrototype(t),
              };
        },
        valueToMeta = function (e, t, r, n = !1) {
          let i;
          switch (typeof r) {
            case "object":
              i =
                r instanceof Buffer
                  ? "buffer"
                  : r && r.constructor && "NativeImage" === r.constructor.name
                    ? "nativeimage"
                    : Array.isArray(r)
                      ? "array"
                      : r instanceof Error
                        ? "error"
                        : s.isSerializableObject(r)
                          ? "value"
                          : s.isPromise(r)
                            ? "promise"
                            : Object.prototype.hasOwnProperty.call(
                                  r,
                                  "callee",
                                ) && null != r.length
                              ? "array"
                              : n && c.getHiddenValue(r, "simple")
                                ? "value"
                                : "object";
              break;
            case "function":
              i = "function";
              break;
            default:
              i = "value";
          }
          return "array" === i
            ? {
                type: i,
                members: r.map((r) => valueToMeta(e, t, r, n)),
              }
            : "nativeimage" === i
              ? {
                  type: i,
                  value: s.serialize(r),
                }
              : "object" === i || "function" === i
                ? {
                    type: i,
                    name: r.constructor ? r.constructor.name : "",
                    id: o.default.add(e, t, r),
                    members: getObjectMembers(r),
                    proto: getObjectPrototype(r),
                  }
                : "buffer" === i
                  ? {
                      type: i,
                      value: r,
                    }
                  : "promise" === i
                    ? (r.then(
                        function () {},
                        function () {},
                      ),
                      {
                        type: i,
                        then: valueToMeta(e, t, function (e, t) {
                          r.then(e, t);
                        }),
                      })
                    : "error" === i
                      ? {
                          type: i,
                          value: r,
                          members: Object.keys(r).map((n) => ({
                            name: n,
                            value: valueToMeta(e, t, r[n]),
                          })),
                        }
                      : {
                          type: "value",
                          value: r,
                        };
        },
        throwRPCError = function (e) {
          const t = new Error(e);
          throw ((t.code = "EBADRPC"), (t.errno = -72), t);
        },
        removeRemoteListenersAndLogWarning = (e, t) => {
          let r =
            "Attempting to call a function in a renderer window that has been closed or released.\nFunction provided here: " +
            p.get(t);
          if (e instanceof i.EventEmitter) {
            const n = e.eventNames().filter((r) => e.listeners(r).includes(t));
            n.length > 0 &&
              ((r += "\nRemote event names: " + n.join(", ")),
              n.forEach((r) => {
                e.removeListener(r, t);
              }));
          }
          console.warn(r);
        },
        unwrapArgs = function (e, t, r, n) {
          const metaToValue = function (n) {
            switch (n.type) {
              case "nativeimage":
                return s.deserialize(n.value);
              case "value":
                return n.value;
              case "remote-object":
                return o.default.get(n.id);
              case "array":
                return unwrapArgs(e, t, r, n.value);
              case "buffer":
                return Buffer.from(
                  n.value.buffer,
                  n.value.byteOffset,
                  n.value.byteLength,
                );
              case "promise":
                return Promise.resolve({
                  then: metaToValue(n.then),
                });
              case "object": {
                const e =
                  "Object" !== n.name
                    ? Object.create({
                        constructor:
                          ((i = n.name),
                          new Proxy(Object, {
                            get: (e, t, r) =>
                              "name" === t ? i : Reflect.get(e, t, r),
                          })),
                      })
                    : {};
                for (const { name: t, value: r } of n.members)
                  e[t] = metaToValue(r);
                return e;
              }
              case "function-with-return-value": {
                const e = metaToValue(n.value);
                return function () {
                  return e;
                };
              }
              case "function": {
                const i = [r, n.id],
                  o = getCachedRendererFunction(i);
                if (void 0 !== o) return o;
                const callIntoRenderer = function (...i) {
                  let o = !1;
                  if (!e.isDestroyed())
                    try {
                      o =
                        !1 !==
                        e.sendToFrame(
                          t,
                          "REMOTE_RENDERER_CALLBACK",
                          r,
                          n.id,
                          valueToMeta(e, r, i),
                        );
                    } catch (e) {
                      console.warn("sendToFrame() failed: " + e);
                    }
                  o ||
                    removeRemoteListenersAndLogWarning(this, callIntoRenderer);
                };
                return (
                  p.set(callIntoRenderer, n.location),
                  Object.defineProperty(callIntoRenderer, "length", {
                    value: n.length,
                  }),
                  (function setCachedRendererFunction(e, t, r, n) {
                    const i = new WeakRef(n),
                      o = e[0] + "~" + e[1];
                    return (
                      d.set(o, i),
                      g.register(n, {
                        id: e,
                        webContents: t,
                        frameId: r,
                      }),
                      n
                    );
                  })(i, e, t, callIntoRenderer),
                  callIntoRenderer
                );
              }
              default:
                throw new TypeError("Unknown type: " + n.type);
            }
            var i;
          };
          return n.map(metaToValue);
        },
        h = new WeakMap();
      (t.isRemoteModuleEnabled = function (e) {
        return (
          l &&
            !h.has(e) &&
            h.set(
              e,
              (function (e) {
                const t = e.getLastWebPreferences() || {};
                return null != t.enableRemoteModule && !!t.enableRemoteModule;
              })(e),
            ),
          h.get(e)
        );
      }),
        (t.enable = function enable(e) {
          h.set(e, !0);
        });
      const handleRemoteCommand = function (e, r) {
          a.ipcMain.on(e, (e, n, ...i) => {
            let o;
            if (t.isRemoteModuleEnabled(e.sender)) {
              try {
                o = r(e, n, ...i);
              } catch (t) {
                o = {
                  type: "exception",
                  value: valueToMeta(e.sender, n, t),
                };
              }
              void 0 !== o && (e.returnValue = o);
            } else
              e.returnValue = {
                type: "exception",
                value: valueToMeta(
                  e.sender,
                  n,
                  new Error(
                    '@electron/remote is disabled for this WebContents. Call require("@electron/remote/main").enable(webContents) to enable it.',
                  ),
                ),
              };
          });
        },
        emitCustomEvent = function (e, t, ...r) {
          const n = {
            sender: e,
            returnValue: void 0,
            defaultPrevented: !1,
          };
          return a.app.emit(t, n, e, ...r), e.emit(t, n, ...r), n;
        },
        logStack = function (e, t, r) {
          r && console.warn(`WebContents (${e.id}): ${t}`, r);
        };
      let f = !1;
      t.initialize = function initialize() {
        if (f) throw new Error("@electron/remote has already been initialized");
        (f = !0),
          handleRemoteCommand(
            "REMOTE_BROWSER_WRONG_CONTEXT_ERROR",
            function (e, t, r, n) {
              const i = getCachedRendererFunction([r, n]);
              void 0 !== i && removeRemoteListenersAndLogWarning(e.sender, i);
            },
          ),
          handleRemoteCommand("REMOTE_BROWSER_REQUIRE", function (e, t, r, n) {
            logStack(e.sender, `remote.require('${r}')`, n);
            const i = emitCustomEvent(e.sender, "remote-require", r);
            if (void 0 === i.returnValue) {
              if (i.defaultPrevented)
                throw new Error(`Blocked remote.require('${r}')`);
              i.returnValue = process.mainModule.require(r);
            }
            return valueToMeta(e.sender, t, i.returnValue);
          }),
          handleRemoteCommand(
            "REMOTE_BROWSER_GET_BUILTIN",
            function (e, t, n, i) {
              logStack(e.sender, `remote.getBuiltin('${n}')`, i);
              const o = emitCustomEvent(e.sender, "remote-get-builtin", n);
              if (void 0 === o.returnValue) {
                if (o.defaultPrevented)
                  throw new Error(`Blocked remote.getBuiltin('${n}')`);
                o.returnValue = r(0)[n];
              }
              return valueToMeta(e.sender, t, o.returnValue);
            },
          ),
          handleRemoteCommand(
            "REMOTE_BROWSER_GET_GLOBAL",
            function (e, t, r, n) {
              logStack(e.sender, `remote.getGlobal('${r}')`, n);
              const i = emitCustomEvent(e.sender, "remote-get-global", r);
              if (void 0 === i.returnValue) {
                if (i.defaultPrevented)
                  throw new Error(`Blocked remote.getGlobal('${r}')`);
                i.returnValue = global[r];
              }
              return valueToMeta(e.sender, t, i.returnValue);
            },
          ),
          handleRemoteCommand(
            "REMOTE_BROWSER_GET_CURRENT_WINDOW",
            function (e, t, r) {
              logStack(e.sender, "remote.getCurrentWindow()", r);
              const n = emitCustomEvent(e.sender, "remote-get-current-window");
              if (void 0 === n.returnValue) {
                if (n.defaultPrevented)
                  throw new Error("Blocked remote.getCurrentWindow()");
                n.returnValue = e.sender.getOwnerBrowserWindow();
              }
              return valueToMeta(e.sender, t, n.returnValue);
            },
          ),
          handleRemoteCommand(
            "REMOTE_BROWSER_GET_CURRENT_WEB_CONTENTS",
            function (e, t, r) {
              logStack(e.sender, "remote.getCurrentWebContents()", r);
              const n = emitCustomEvent(
                e.sender,
                "remote-get-current-web-contents",
              );
              if (void 0 === n.returnValue) {
                if (n.defaultPrevented)
                  throw new Error("Blocked remote.getCurrentWebContents()");
                n.returnValue = e.sender;
              }
              return valueToMeta(e.sender, t, n.returnValue);
            },
          ),
          handleRemoteCommand(
            "REMOTE_BROWSER_CONSTRUCTOR",
            function (e, t, r, n) {
              n = unwrapArgs(e.sender, e.frameId, t, n);
              const i = o.default.get(r);
              return (
                null == i &&
                  throwRPCError(
                    "Cannot call constructor on missing remote object " + r,
                  ),
                valueToMeta(e.sender, t, new i(...n))
              );
            },
          ),
          handleRemoteCommand(
            "REMOTE_BROWSER_FUNCTION_CALL",
            function (e, t, r, n) {
              n = unwrapArgs(e.sender, e.frameId, t, n);
              const i = o.default.get(r);
              null == i &&
                throwRPCError(
                  "Cannot call function on missing remote object " + r,
                );
              try {
                return valueToMeta(e.sender, t, i(...n), !0);
              } catch (e) {
                const t = new Error(
                  `Could not call remote function '${i.name || "anonymous"}'. Check that the function signature is correct. Underlying error: ${e}\n` +
                    (e instanceof Error
                      ? `Underlying stack: ${e.stack}\n`
                      : ""),
                );
                throw ((t.cause = e), t);
              }
            },
          ),
          handleRemoteCommand(
            "REMOTE_BROWSER_MEMBER_CONSTRUCTOR",
            function (e, t, r, n, i) {
              i = unwrapArgs(e.sender, e.frameId, t, i);
              const s = o.default.get(r);
              return (
                null == s &&
                  throwRPCError(
                    `Cannot call constructor '${n}' on missing remote object ${r}`,
                  ),
                valueToMeta(e.sender, t, new s[n](...i))
              );
            },
          ),
          handleRemoteCommand(
            "REMOTE_BROWSER_MEMBER_CALL",
            function (e, t, r, n, i) {
              i = unwrapArgs(e.sender, e.frameId, t, i);
              const s = o.default.get(r);
              null == s &&
                throwRPCError(
                  `Cannot call method '${n}' on missing remote object ${r}`,
                );
              try {
                return valueToMeta(e.sender, t, s[n](...i), !0);
              } catch (e) {
                const t = new Error(
                  `Could not call remote method '${n}'. Check that the method signature is correct. Underlying error: ${e}` +
                    (e instanceof Error
                      ? `Underlying stack: ${e.stack}\n`
                      : ""),
                );
                throw ((t.cause = e), t);
              }
            },
          ),
          handleRemoteCommand(
            "REMOTE_BROWSER_MEMBER_SET",
            function (e, t, r, n, i) {
              i = unwrapArgs(e.sender, e.frameId, t, i);
              const s = o.default.get(r);
              return (
                null == s &&
                  throwRPCError(
                    `Cannot set property '${n}' on missing remote object ${r}`,
                  ),
                (s[n] = i[0]),
                null
              );
            },
          ),
          handleRemoteCommand(
            "REMOTE_BROWSER_MEMBER_GET",
            function (e, t, r, n) {
              const i = o.default.get(r);
              return (
                null == i &&
                  throwRPCError(
                    `Cannot get property '${n}' on missing remote object ${r}`,
                  ),
                valueToMeta(e.sender, t, i[n])
              );
            },
          ),
          handleRemoteCommand("REMOTE_BROWSER_DEREFERENCE", function (e, t, r) {
            o.default.remove(e.sender, t, r);
          }),
          handleRemoteCommand(
            "REMOTE_BROWSER_CONTEXT_RELEASE",
            (e, t) => (o.default.clear(e.sender, t), null),
          );
      };
    },
    function (e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0,
      });
      const getOwnerKey = (e, t) => `${e.id}-${t}`;
      t.default = new (class ObjectsRegistry {
        constructor() {
          (this.nextId = 0),
            (this.storage = {}),
            (this.owners = {}),
            (this.electronIds = new WeakMap());
        }
        add(e, t, r) {
          const n = this.saveToStorage(r),
            i = getOwnerKey(e, t);
          let o = this.owners[i];
          return (
            o ||
              ((o = this.owners[i] = new Map()),
              this.registerDeleteListener(e, t)),
            o.has(n) || (o.set(n, 0), this.storage[n].count++),
            o.set(n, o.get(n) + 1),
            n
          );
        }
        get(e) {
          const t = this.storage[e];
          if (null != t) return t.object;
        }
        remove(e, t, r) {
          const n = getOwnerKey(e, t),
            i = this.owners[n];
          if (i && i.has(r)) {
            const e = i.get(r) - 1;
            e <= 0 ? (i.delete(r), this.dereference(r)) : i.set(r, e);
          }
        }
        clear(e, t) {
          const r = getOwnerKey(e, t),
            n = this.owners[r];
          if (n) {
            for (const e of n.keys()) this.dereference(e);
            delete this.owners[r];
          }
        }
        saveToStorage(e) {
          let t = this.electronIds.get(e);
          return (
            t ||
              ((t = ++this.nextId),
              (this.storage[t] = {
                count: 0,
                object: e,
              }),
              this.electronIds.set(e, t)),
            t
          );
        }
        dereference(e) {
          const t = this.storage[e];
          null != t &&
            ((t.count -= 1),
            0 === t.count &&
              (this.electronIds.delete(t.object), delete this.storage[e]));
        }
        registerDeleteListener(e, t) {
          const r = t.split("-")[0],
            listener = (n, i) => {
              i &&
                i.toString() === r &&
                (e.removeListener("render-view-deleted", listener),
                this.clear(e, t));
            };
          e.on("render-view-deleted", listener);
        }
      })();
    },
    function (e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0,
      }),
        (t.deserialize =
          t.serialize =
          t.isSerializableObject =
          t.isPromise =
            void 0);
      const n = r(0);
      t.isPromise = function isPromise(e) {
        return (
          e &&
          e.then &&
          e.then instanceof Function &&
          e.constructor &&
          e.constructor.reject &&
          e.constructor.reject instanceof Function &&
          e.constructor.resolve &&
          e.constructor.resolve instanceof Function
        );
      };
      const i = [Boolean, Number, String, Date, Error, RegExp, ArrayBuffer];
      function isSerializableObject(e) {
        return (
          null === e || ArrayBuffer.isView(e) || i.some((t) => e instanceof t)
        );
      }
      t.isSerializableObject = isSerializableObject;
      const objectMap = function (e, t) {
        const r = Object.entries(e).map(([e, r]) => [e, t(r)]);
        return Object.fromEntries(r);
      };
      (t.serialize = function serialize(e) {
        return e && e.constructor && "NativeImage" === e.constructor.name
          ? (function serializeNativeImage(e) {
              const t = [],
                r = e.getScaleFactors();
              if (1 === r.length) {
                const n = r[0],
                  i = e.getSize(n),
                  o = e.toBitmap({
                    scaleFactor: n,
                  });
                t.push({
                  scaleFactor: n,
                  size: i,
                  buffer: o,
                });
              } else
                for (const n of r) {
                  const r = e.getSize(n),
                    i = e.toDataURL({
                      scaleFactor: n,
                    });
                  t.push({
                    scaleFactor: n,
                    size: r,
                    dataURL: i,
                  });
                }
              return {
                __ELECTRON_SERIALIZED_NativeImage__: !0,
                representations: t,
              };
            })(e)
          : Array.isArray(e)
            ? e.map(serialize)
            : isSerializableObject(e)
              ? e
              : e instanceof Object
                ? objectMap(e, serialize)
                : e;
      }),
        (t.deserialize = function deserialize(e) {
          return e && e.__ELECTRON_SERIALIZED_NativeImage__
            ? (function deserializeNativeImage(e) {
                const t = n.nativeImage.createEmpty();
                if (1 === e.representations.length) {
                  const {
                      buffer: r,
                      size: n,
                      scaleFactor: i,
                    } = e.representations[0],
                    { width: o, height: s } = n;
                  t.addRepresentation({
                    buffer: r,
                    scaleFactor: i,
                    width: o,
                    height: s,
                  });
                } else
                  for (const r of e.representations) {
                    const { dataURL: e, size: n, scaleFactor: i } = r,
                      { width: o, height: s } = n;
                    t.addRepresentation({
                      dataURL: e,
                      scaleFactor: i,
                      width: o,
                      height: s,
                    });
                  }
                return t;
              })(e)
            : Array.isArray(e)
              ? e.map(deserialize)
              : isSerializableObject(e)
                ? e
                : e instanceof Object
                  ? objectMap(e, deserialize)
                  : e;
        });
    },
    function (e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0,
      }),
        (t.getElectronBinding = void 0);
      t.getElectronBinding = (e) =>
        process._linkedBinding
          ? process._linkedBinding("electron_common_" + e)
          : process.electronBinding
            ? process.electronBinding(e)
            : null;
    },
    function (e, t) {
      e.exports = require("electron-window-manager");
    },
    function (e, t, r) {
      "use strict";
      var n =
        (this && this.__awaiter) ||
        function (e, t, r, n) {
          return new (r || (r = Promise))(function (i, o) {
            function fulfilled(e) {
              try {
                step(n.next(e));
              } catch (e) {
                o(e);
              }
            }
            function rejected(e) {
              try {
                step(n.throw(e));
              } catch (e) {
                o(e);
              }
            }
            function step(e) {
              e.done
                ? i(e.value)
                : (function adopt(e) {
                    return e instanceof r
                      ? e
                      : new r(function (t) {
                          t(e);
                        });
                  })(e.value).then(fulfilled, rejected);
            }
            step((n = n.apply(e, t || [])).next());
          });
        };
      Object.defineProperty(t, "__esModule", {
        value: !0,
      }),
        (t.ContentManager = void 0);
      const i = r(9),
        o = r(6),
        s = r(73),
        a = r(74),
        c = r(0),
        l = r(3),
        u = r(75),
        d = r(4),
        g = r(76);
      var p = r(15);
      const h = r(11),
        f = r(5),
        m = r(2);
      var S = r(77);
      class ContentManager {
        constructor() {}
        static getInstance() {
          return (
            ContentManager.instance ||
              (ContentManager.instance = new ContentManager()),
            ContentManager.instance
          );
        }
        startCheckNewContent(e) {
          return n(this, void 0, void 0, function* () {
            try {
              l.LogIt.getInstance().info("Start check New Content...");
              const o = i.Info.getInstance().getSystemProductName(),
                c = yield i.Info.getInstance().getSerialNumber(),
                E = d.EnvConfig.getInstance().getBackendApiUrl(),
                b = yield i.Info.getInstance().getLanguage(),
                A = {
                  model: o,
                  sn: c,
                  lang: b,
                  country: yield i.Info.getInstance().getCountry(),
                };
              l.LogIt.getInstance().info(
                `queryContent4 param: ${JSON.stringify(A)}...`,
              );
              var t = E + "/api/queryContent4";
              const I = (function getJWT() {
                  return (
                    Math.ceil(Date.now() / 1e3),
                    S.sign(
                      {
                        iss: g.issuer,
                      },
                      g.backendSecret,
                      {
                        algorithm: "HS256",
                      },
                    )
                  );
                })(),
                y = yield (0, s.default)(t, {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + I,
                  },
                  body: JSON.stringify(A),
                }),
                {
                  id: v,
                  name: D,
                  uuid: w,
                  sha256: L,
                  querySteps: T,
                } = yield y.json();
              if (
                (l.LogIt.getInstance().info(
                  `Content info ${v},${D},${w},${L}...`,
                ),
                null == T ||
                  T.forEach((e) => {
                    l.LogIt.getInstance().info("querySteps - " + e);
                  }),
                v)
              ) {
                const o = i.Info.getInstance().getContentPath(v, w),
                  c = o + ".bak";
                if (
                  i.Info.getInstance().getLastActiveContentPath() == o &&
                  f.existsSync(o)
                )
                  l.LogIt.getInstance().info(
                    "The local content is same as server side - " + w,
                  );
                else if (D) {
                  l.LogIt.getInstance().info("Fetch New Content url..."),
                    (t = `${E}/api/appcontents/${v}/downloadUrl`);
                  var r = yield (0, s.default)(t);
                  const i = yield r.json();
                  l.LogIt.getInstance().info(
                    "Download New Content - " + i.downloadUrl,
                  );
                  const d = yield (yield (0, s.default)(
                    i.downloadUrl,
                  )).buffer();
                  if (L == p.createHash("sha256").update(d).digest("hex")) {
                    const t = m.join(h.tmpdir(), w + ".zip");
                    l.LogIt.getInstance().info(
                      "Pass sha256 check, Write New Content to " + t,
                    );
                    try {
                      yield (0, u.writeFile)(t, d),
                        l.LogIt.getInstance().info(
                          "New Content is ready at " + t,
                        );
                    } catch (e) {
                      l.LogIt.getInstance().error("writeFile: " + e);
                    }
                    try {
                      yield (0, u.rm)(o, {
                        force: !0,
                        recursive: !0,
                      });
                    } catch (e) {}
                    try {
                      yield (0, u.rm)(c, {
                        force: !0,
                        recursive: !0,
                      });
                    } catch (e) {}
                    l.LogIt.getInstance().info(
                      "Start to extract New Content to " + c,
                    ),
                      a(t, {
                        dir: c,
                      })
                        .then((t) =>
                          n(this, void 0, void 0, function* () {
                            l.LogIt.getInstance().info(
                              "Done the extraction at " + c,
                            );
                            try {
                              yield (0, u.rename)(c, o),
                                l.LogIt.getInstance().info(
                                  `Rename ${c} to ${o}`,
                                );
                            } catch (e) {
                              l.LogIt.getInstance().error("rename: " + e);
                            }
                            this.setContentPath(o, e);
                          }),
                        )
                        .catch((e) => {
                          l.LogIt.getInstance().error(
                            "extract: " + JSON.stringify(e),
                          );
                        });
                  }
                }
              } else this.setContentPath("", e);
            } catch (e) {
              l.LogIt.getInstance().error(JSON.stringify(e));
            }
            this.timeId && clearTimeout(this.timeId),
              (this.timeId = setTimeout(
                () =>
                  n(this, void 0, void 0, function* () {
                    yield ContentManager.getInstance().startCheckNewContent(e);
                  }),
                d.EnvConfig.getInstance().periodToCheckNewContent,
              ));
          });
        }
        setContentPath(e, t) {
          (i.Info.getInstance().getLastActiveContentPath() || "") != e &&
            (o.Store.getInstance().set("lastActiveContentPath", e),
            l.LogIt.getInstance().info("set lastActiveContentPath to " + e),
            t.isMinimized() || !t.isVisible()
              ? (c.app.relaunch(), c.app.exit(-1))
              : (d.EnvConfig.getInstance().pendingReloadContent = !0));
        }
      }
      t.ContentManager = ContentManager;
    },
    function (e, t) {
      e.exports = require("electron-fetch");
    },
    function (e, t) {
      e.exports = require("extract-zip");
    },
    function (e, t) {
      e.exports = require("fs/promises");
    },
    function (e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0,
      }),
        (t.changingPkey =
          t.issuer =
          t.validateDuration =
          t.backendSecret =
          t.secret =
          t.algorithm =
            void 0),
        (t.algorithm = "HS256"),
        (t.secret = "18F826BC492E6B8B3C6B5E69B6F73"),
        (t.backendSecret = "19CA183FABB6FCFAB5F9E3F71D816"),
        (t.validateDuration = 590),
        (t.issuer = "PWA"),
        (t.changingPkey =
          "\n-----BEGIN PRIVATE KEY-----\nMIIJQgIBADANBgkqhkiG9w0BAQEFAASCCSwwggkoAgEAAoICAQDsaaCFZOanIWvC\nJB1d7KZzZOye3c1il3tlapLkUEj362OIme/EnEdykmHe41iNJ+DBwcTXDnrioX91\nzsiNGoifQd6/RgpKEtrIfBiOtg47L8DQ0R5dy7hAoNgnCvBNtLA+2dg8Kg6An8Se\n8ic9ayD8t21A0jwy6jEZl8PW0NVeuE3qaHa47FIBfUEnWARZBefM7kWIjOLQ9Nqp\nsL1KzLOtLp2dHRo26RsvrCYn1eR+WrL1qkwh7MI4WLflD0m0Kxzjyfn2iEGkPrL1\nw5lmc+fQaFW/mioqKmrzh47J4aWXkptBqnbPqReGb907N1ls3V4vI2hhQYbXc+5c\nPQRpisfw4NsFdpRT/ekFurHWUXttIus6xF6rq1MzHLqfe+7ffd5O0mDQ/Ffh6K/J\nuXQj86peJ5uhxjlvGrmeBRwjvSUa3CME+ln8LQCnRuuXYqFTG1+aO70d1gSoM/8d\nhg37q6JjHnlOjXJdbAZ73eRkJ3wx/FWBhrsg9wWWItczSRo2e4QflRyjxYn9oxae\n4R8kfJVNQRYnohMdOwIbmdefireAVDaZ0otTqdLFadQzX3g1+pPAJyZj/2i/U3qt\nIvTZEdbdMSzRKb3zypWgK87C/l6eAgABLdVUs584hAoNBGSOLgRq63YY51kCwtzz\ny/Vm2HCvIkowoPnxavCQ+OLtggpPVQIDAQABAoICABnrJqcZPdRa7KZ3MSUH+eOy\nz+JG7Op/Mw8WVQ5k4usTSnFCdy/19jtQYxx9jkrDcXesl7kAJGbOT9wJlKErpIjZ\nPuN3eU9Pq97JBCQ5P2wruxbppkugNw4W1DvLjjbmtV/eoD9QWRCu8259m+G26gHq\n1jaCFgl69XEZ22WktY/R4vDtDP8PIZp6MfdvReLAq/4irUrgL0m7XnG2J7qYoKY+\n8xazhxk4Czv5wqEhaRCVPwOB7SDXBSAKUfbx6yGujFdI4HevzoqEOTiKfjnmQSbv\nGV+NNkwzJFCYrwXhEDeC4jSbzLTNk/+wKfABDHPL/TRrzFjFR1Q9qIdCRUaQ6YSA\nHXCdyaybmGd77aR0AhUu5cT62+4diOiXU3O6Wish1YYmRS7rAvzEmabt6tGUnl1i\nkHExP1v8rqk/J9BXGhAWgQT9JW1X793Abg7Oq8HQ1OFJVmaU0JjIzkGLmD1+RuWQ\nYtYwZNawEt93iPMRZ4yuq1+jxdJtgB0gAf4DFemi1/cDx0Cew49Gi8DFoJVSeX4C\nI7JdgNgvd1ESjzDezeRE4nphUCtwr51zgR+63Qw4qirwiaBuzZPYTHd9F7tPXgDD\n7WfNm5XSZR51c0GiSbFLfE8Af/gHmM+VzCEdeV4ydn4oA+3B/BvXQ3ANLLDqIxsj\nhdPEk8tcALlKDe6y0zwtAoIBAQD7uDwpRdaazVvKDB0mYAjtySYAe512tYbf9g+c\n3IY9NJYuDUhwqTpXm5khaGkfGAr9jW1Z87/TbnTcLo0MkS5LwB4f1CDx8ix/NUe8\nL12hxsF2nZQ8txnk3a3oixevQ+yxjO1ywzhJHy7wnIUPDQ6Uqu/5AUBw1C3PuNwf\nuh5mv18PTLO37wSloayMcqJTAgUXssjYLkm4k8b8ODy1wjoy9J45Gpl4XqfknDlk\n6ntGQ6xw+b1B26e7yNTi3qucTEhogh8vRIRNUVY3DO/utoYocxBeaoUo0Zxn/5LX\naN1sn+uh2RIqURr1//TFc8huWm3wVzTxZDYBj1/cZvYXxwSvAoIBAQDwbsI0GyIY\nEkE2Va9rFDkYoYiBA1ZEnOJsAumF278eOKIGOZ+ys0I29Mf279l99SBJmBCpZKya\n0oVXNYHrrFv+aEOpzVkP5sN0T0LnhUncaMcpQQhKaYogRqgYA54rLDHT/G2H43JZ\nZaj6ziN99P8OBQ6lAvJT3UyHdFmeB6u9WOfd/IgxFhJ2K2U5J66ylBWLfMq9YV0H\nhqV/7wDZolM/6Iro6Soux4UOaJExJXk6H9kusJbnzsU4jVTvRTrsdl/XKXnBD5mI\nfgOsgpQenAePhqcHG40brfbNIZGHAJ57v1TDW3nBIhBeiySzLWwlmxKaxe/OhvKu\nP8K88/DVDDU7AoIBADmTJD+Ud8eknRATwT8bzC8HSSfnHlceoiDr2RpZ3mJ1erxB\n0YXjTzLmphncFd9E0o64IIDoncGwjA4on552Po6Y/Mru7DIq4D6gYy4J73KnUWze\nEh/pCYUtpy9/UQWHlcXupAkR2ffvp/7k7hJJPEKI7qaXwLON9ISEleSz32xE7WtE\ncf7qLrfryNm/Bp3R4nRPMl0wCTCsrGDYRBqWuFUbWm1ZRi0gCWriyMXqVBP4OqME\nnGNJ6I2tG/RgVgRD9nPg/10CYPiGWB/zV5XULc9msiHGX3q8pveqn12h4LONyImW\nau8+6dnGl6fqGbgT+v10FOn5r9ifgJ+a9ULvBIUCggEAE86cExzVHzSJyMcgT2r4\nFS5hh3dV6QsfoBRRVqS2xu+VcXvXyyn3X32k55P0z+qcwVNUtA/GJG8JaxjOXjLx\n1TCTum5fUu8I1REeiuIxJoY/OgfQfgjZxzTq7ieGJTpb1IHsKBC1v+WfGSJYTC0d\nwfLqtO9cNUp63oHYTCuHm26yk1gVhC20UaXbjezV+II4kCg0r4tQ1ajjA3oWENfN\nkes/XlavEfF/5aL5qxnSNdaf1rfXhrtDBhimkZubchWCacBR9nSpilQPS2vqdecW\nvF00b2J2qnwXY+jLC1sis0Ec44cqrZ13ycIewOASE7sFulhqHBKD9ZTtHxHdmj+K\nNwKCAQEAupvDunz2hxq+GCl5AfQ4IM2Hgtc/TxWwpiNjQlgLyuE1yxsqjWXuJXkH\n02MT8YgGbxjGe97ch8Cj6v+A9AI0w/hsYh9pj2eNu7fRjeVX7m1n7THwaA/qkEc3\n9FtTDS/EMsfTHrM864aJHkENSrtaZkHFAqfRw2C1xeTbrYNU2vrNz7b86xfSghP8\nQKl7T+0pprl/mJDBNBF3kSmjh8n/OFK6M67ThV0Q/1X7lbp77YJT8ncmYmNiBi1o\nwrznw8j6wJ87x5O25udxpzccKerXtM5iYimfi8UOBx58lf+JbaQH3Cfq73YNQ40b\nvChQVdWGYrUftqaUpuKuTvdHgqvp4A==\n-----END PRIVATE KEY-----");
    },
    function (e, t) {
      e.exports = require("jsonwebtoken");
    },
    function (e, t) {
      e.exports = require("@paymoapp/electron-shutdown-handler");
    },
    function (e, t) {
      e.exports = require("compare-versions");
    },
    function (e, t) {
      e.exports = require("electron-fcm-push-receiver");
    },
  ]));
//# sourceMappingURL=main.js.map
