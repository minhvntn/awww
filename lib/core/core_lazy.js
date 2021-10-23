function _initLazy(instance) {
  const { selector } = instance.setting;
  const allSelector = [].slice.call(document.querySelectorAll(selector));
  if ("IntersectionObserver" in window) {
    // Create new observer object
    let lazyImageObserver = new IntersectionObserver((entries, observer) => {
      // ... callback function content here
      entries.forEach((entry) => {
        // Do these if the target intersects with the root
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    allSelector.forEach((lazyImage) => {
      lazyImageObserver.observe(lazyImage);
    });
  }
}

class coreLazy {
  constructor(setting) {
    const defaultSetting = {
      selector: 'img[data-lazy]',
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

      $this.instances.push(obj);

      return obj;
    });

    _initLazy($this);
  }
}

export default coreLazy;