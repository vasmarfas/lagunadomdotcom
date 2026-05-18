(function () {
  'use strict';

  var STORAGE_KEY = 'lagunaCookieConsent';
  var DECLINE_REDIRECT = 'https://yandex.ru/maps/-/CHbIUAnA';

  try {
    if (localStorage.getItem(STORAGE_KEY) === 'accepted') return;
  } catch (e) {
    // localStorage недоступен (приватный режим и т.п.) — показываем баннер каждый раз
  }

  function buildBanner() {
    var banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Использование cookie');

    banner.innerHTML =
      '<div class="cookie-banner__content">' +
        '<p class="cookie-banner__text">' +
          'Мы используем cookie и сервисы аналитики. Продолжая, вы соглашаетесь с использованием cookie.' +
        '</p>' +
        '<div class="cookie-banner__actions">' +
          '<button type="button" class="cookie-banner__btn cookie-banner__btn--decline">Отказаться</button>' +
          '<button type="button" class="cookie-banner__btn cookie-banner__btn--accept">Принять</button>' +
        '</div>' +
      '</div>';

    return banner;
  }

  function mount() {
    if (document.querySelector('.cookie-banner')) return;
    var banner = buildBanner();
    document.body.appendChild(banner);

    banner.querySelector('.cookie-banner__btn--accept').addEventListener('click', function () {
      try { localStorage.setItem(STORAGE_KEY, 'accepted'); } catch (e) {}
      banner.parentNode && banner.parentNode.removeChild(banner);
    });

    banner.querySelector('.cookie-banner__btn--decline').addEventListener('click', function () {
      window.location.href = DECLINE_REDIRECT;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
