export function setCookie(key, value, options = { expires: 1 }) {
  if (typeof options.expires === 'number') {
    var days = options.expires || 1;
    var now = new Date();
    options.expires = now;

    options.expires.setMilliseconds(
      options.expires.getMilliseconds() + days * 864e5
    );
  }

  return (document.cookie = [
    key,
    '=',
    value,
    // 兼容ie
    options.expires ? '; expires=' + options.expires.toUTCString() : '',
    document.domain
  ].join(''));
}

export function getCookie(key, pool) {
  var cookieString =
    (typeof window === `object` ? document.cookie : pool) || ``;
  var cookies = cookieString.split(`; `);

  for (var i = 0, len = cookies.length; i < len; i++) {
    var [name, cookie] = cookies[i].split('=');

    if (name === key) {
      return cookie;
    }
  }
}
