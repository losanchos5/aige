// Umami before-send hook (data-before-send="umamiBeforeSend" on the tracker tag in
// src/layouts/Base.astro). Returning a falsy value cancels the send.
// shortcut: only drops automation that reports navigator.webdriver; stealth headless browsers still count. Upgrade to server-side filtering if the direct, zero-engagement share stays high.
window.umamiBeforeSend = function (type, payload) {
  return navigator.webdriver === true ? null : payload;
};
