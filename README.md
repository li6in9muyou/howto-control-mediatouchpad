# Most interesting piece of code

```js
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
      MediaTouchpad.instance || (MediaTouchpad.instance = new MediaTouchpad()),
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
          c.EnvConfig.getInstance().devTool || c.EnvConfig.getInstance().devMode
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
                null === (r = null == t ? void 0 : t.first()) || void 0 === r
                  ? void 0
                  : r.current
              ) {
                const e = t.first().current;
                s.LogIt.getInstance().info("mtp device - Found, id: " + e.id),
                  o.HidDevice.fromIdAsync(e.id, 0, (e, t) => {
                    t
                      ? (s.LogIt.getInstance().info("mtp device open success"),
                        n(t))
                      : (s.LogIt.getInstance().error(
                          "mtp HidDevice.fromIdAsync: " + JSON.stringify(e),
                        ),
                        n(null));
                  });
              } else
                s.LogIt.getInstance().info("mtp device Not found"), n(null);
            } catch (e) {
              s.LogIt.getInstance().info(
                "connectDevice1: " + JSON.stringify(e),
              ),
                n(null);
            }
          });
        } catch (e) {
          s.LogIt.getInstance().error("connectDevice: " + JSON.stringify(e)),
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
```

# References

[Connecting to uncommon HID devices](https://backend-prd-imub2p4wyq-uc.a.run.app/xsense/api)
