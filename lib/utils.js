// import UAParser from 'ua-parser-js';
// import smoothscroll from 'smoothscroll-polyfill';
// import Handlebars from './handlerbars';
// import './polyfill';

// smoothscroll.polyfill();

class Utils {
  static ajaxRequest(request) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(request.method || 'GET', request.url);
      if (request.headers) {
        Object
          .keys(request.headers)
          .forEach((key) => {
            console.log(key, request.headers[key]);
            xhr.setRequestHeader(key, request.headers[key]);
          });
      }
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject(new Error(`${xhr.status} ${xhr.statusText}`));
        }
      };
      xhr.onerror = () => reject(new Error(`${xhr.status}:${xhr.statusText}`));
      xhr.send(request.body);
    });
  }
}

export default Utils;

// export const { setCookie } = Utils;
// export const { getCookie } = Utils;
// export const { checkCookie } = Utils;
// export const { getLocalData } = Utils;
// export const { setLocalData } = Utils;
// export const { getSystemInformation } = Utils;
// export const { getUrlQueryString } = Utils;
// export const { fireEvent } = Utils;
// export const { getScrollbarWidth } = Utils;
// export const { convertNodeListToArray } = Utils;
export const { ajaxRequest } = Utils;
// export const { loadTemplate } = Utils;
// export const { processTemplate } = Utils;
// export const { wrap } = Utils;
// export const { unWrap } = Utils;
// export const { prepend } = Utils;
// export const { debounce } = Utils;
// export const { scrollToTop } = Utils;
// export const { scrollToElement } = Utils;
// export const { insertAfter } = Utils;
// export const { getElementStyle } = Utils;
// export const { requestInterval } = Utils;
// export const { clearRequestInterval } = Utils;
// export const { getAllDatesInMonth } = Utils;
// export const { isToday } = Utils;
// export const { getSelectors } = Utils;
// export const { getOffset } = Utils;
// export const { getClosestByClass } = Utils;