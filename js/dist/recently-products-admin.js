'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  EcwidApp.init({
    app_id: 'recently-viewed-products',
    autoloadedflag: true,
    autoheight: true
  });

  var Settings = function Settings(limit, place) {
    _classCallCheck(this, Settings);

    this.maxItems = 5;
    this.maxShown = limit || this.maxItems;
    this.place = place || 'above';
    this.container = '.ecwid-productBrowser';
  };

  var labels = {
    en: {
      'rvp-title': 'Recently Viewed Products',
      'rvp-legend': 'Settings',
      'rvp-max-shown': 'Max products shown (< 6)',
      'rvp-place': 'Place for Recently Viewed',
      'rvp-save': 'Save',
      'rvp-above': 'Above Storefront',
      'rvp-under': 'Under Storefront',
      'rvp-saved': 'Settings were successfully saved!'
    },
    ru: {
      'rvp-title': 'Недавно просмотренные товары',
      'rvp-legend': 'Настройки',
      'rvp-max-shown': 'Максимальное количество (< 6)',
      'rvp-place': 'Размещение виджета',
      'rvp-save': 'Сохранить',
      'rvp-above': 'Над товарами',
      'rvp-under': 'Под товарами',
      'rvp-saved': 'Настройки успешно сохранены!'
    }
  };

  var setLabels = function setLabels(lbls) {
    document.querySelector('#rvp-title').innerText = lbls['rvp-title'];
    document.querySelector('#rvp-legend').innerText = lbls['rvp-legend'];
    document.querySelector('#rvp-max-shown').innerText = lbls['rvp-max-shown'];
    document.querySelector('#rvp-place').innerText = lbls['rvp-place'];
    document.querySelector('#rvp-save').innerText = lbls['rvp-save'];
    document.querySelector('#rvp-place-select').options[0].innerText = lbls['rvp-above'];
    document.querySelector('#rvp-place-select').options[1].innerText = lbls['rvp-under'];
  };

  var rvpForm = document.forms['rvp-settings'];

  EcwidApp.getAppStorage('public', function (value) {
    var param = JSON.parse(value);
    var rvpSettings = new Settings(param.maxShown, param.place);

    rvpForm.maximum.value = rvpSettings.maxShown;
    rvpForm.querySelector('#rvp-place-select').value = rvpSettings.place;

    rvpForm.maximum.addEventListener('change', function (e) {
      var val = parseInt(e.target.value, 10);
      rvpForm.maximum.value = val > 0 && val < 5 ? val : rvpSettings.maxItems;
    });
  });

  var lang = EcwidApp.getPayload().lang === 'ru' ? 'ru' : 'en';
  setLabels(labels[lang]);

  rvpForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var newSettings = {
      maxShown: e.target.maximum.value,
      place: e.target.querySelector('#rvp-place-select').value
    };
    EcwidApp.setAppPublicConfig(JSON.stringify(newSettings), function () {
      var alertMsg = document.querySelector('#rvp-settings .rvp-settings-saved-alert');
      if (!alertMsg) {
        alertMsg = document.createElement('div');
        alertMsg.className = 'rvp-settings-saved-alert';
        alertMsg.innerHTML = '<br/><div>' + labels[lang]['rvp-saved'] + '</div>';
        document.querySelector('#rvp-settings').appendChild(alertMsg);
      }
      setTimeout(function () {
        alertMsg.remove();
      }, 5000);
    });
  });
})();