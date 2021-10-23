
function _appendScript(instance) {
  const { coreScript } = instance.setting;
  const s = document.createElement("script");
  s.type = "text/javascript";
  s.src = coreScript;
  const isCheckAppend = document.querySelectorAll(`script[src="${coreScript}"]`);
  if (isCheckAppend.length === 0) {
    document.body.appendChild(s);
  }
}

class coreScript {
  constructor(setting) {
    const defaultSetting = {
      selector: '[data-core-script]',
    };

    const s = Object.assign({}, defaultSetting, setting || {});
    this.setting = s;
    this.instances = [];
    this.init(s);
    return this.instances;
  }

  init(setting) {
    const $this = this;
    const els = document.querySelectorAll(setting.selector);

    els.forEach(x => {
      const obj = {};
      const s = Object.assign({}, $this.setting, x.dataset || {});
      obj.setting = s;
      if (obj.setting.coreScript) {
        _appendScript(obj);
      }
      $this.instances.push(obj);
      return obj;
    });
  }
}

export default coreScript;