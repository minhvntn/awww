class App {

  constructor(setting) {
    window.addEventListener('DOMContentLoaded', () => {
      const html = document.querySelector('html');
      html.classList.remove('no-js');

    }, false);
  }

  ready(f) {
    window.addEventListener('DOMContentLoaded', () => {
      if (typeof f === 'function') f();
    }, false);
    return this;
  }
  load(f) {
    window.addEventListener('load', () => {
      if (typeof f === 'function') f();
    }, false);
    return this;
  }

}

export default App;