(() => {
  EcwidApp.init({
    app_id: 'testapp-hackathon2016-3',
    autoloadedflag: true,
    autoheight: true,
  });

  class Settings {
    constructor(limit, direction) {
      this.maxItems = 5;
      this.maxShown = limit || this.maxItems;
      this.direction = direction || 'horizontal';
      this.container = '.ecwid-productBrowser';
    }
  }

  const rvpForm = document.forms['rvp-settings'];

  EcwidApp.getAppStorage('public', (value) => {
    const param = JSON.parse(value);
    const rvpSettings = new Settings(param.maxShown, param.direction);

    rvpForm.maximum.value = rvpSettings.maxShown;
    rvpForm.direction.value = rvpSettings.direction;

    rvpForm.maximum.addEventListener('change', (e) => {
      const val = parseInt(e.target.value, 10);
      rvpForm.maximum.value = (val > 0 && val < 5) ? val : rvpSettings.maxItems;
    });
  });

  rvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newSettings = {
      maxShown: e.target.maximum.value,
      direction: e.target.direction.value,
    };
    EcwidApp.setAppPublicConfig(JSON.stringify(newSettings), () => {
      let alertMsg = document.querySelector('#rvp-settings .rvp-settings-saved-alert');
      if (!alertMsg) {
        alertMsg = document.createElement('div');
        alertMsg.className = 'rvp-settings-saved-alert';
        alertMsg.innerHTML = '<br/><div>Settings was successfully saved!</div>';
        document.querySelector('#rvp-settings').appendChild(alertMsg);
      }
      setTimeout(() => {
        alertMsg.remove();
      }, 5000);
    });
  });
})();














//
//   const maxLimit = 5;
//   const defaultContainer = '.ecwid-productBrowser';
//   const defaultDirection = 'horizontal';
//
//   const rvpForm = document.forms['rvp-settings'];
//   const rvpMaximum = rvpForm.maximum;
//   const rvpContainer = rvpForm.container;
//   const rvpDirection = rvpForm.direction;
//
//   let rvpSettings = {};
//
//   const validateForm = (form) => {
//     if (parseInt(form.maximum.value) < 1 || parseInt(form.maximum.value) > maxLimit) {
//       form.maximum.value = maxLimit;
//     }
//
//     // if (form.container.value === '') {
//     //   form.container.value = defaultContainer;
//     // }
//
//     // if (form.direction.value.toLowerCase() !== 'vertical' && form.direction.value.toLowerCase() !== 'horizontal') {
//     //   form.direction.value = defaultDirection;
//     // }
//   }

//
//   const updateForm = () => {
//     rvpForm.maximum.value = rvpSettings.maxShown;
//     rvpForm.container.value = rvpSettings.container;
//     rvpForm.direction.value = rvpSettings.direction;
//   };
//
//   const saveSettings = (form) => {
//     const newSettings = {
//       maxShown: form.maximum.value,
//       container: form.container.value,
//       direction: form.direction.value,
//     };
//     EcwidApp.setAppPublicConfig(JSON.stringify(newSettings), ()=> {
//       console.info('Public config saved!');
//     });
//   };
//
//
//   const onSubmit = (e) => {
//     e.preventDefault();
//     validateForm(e.target);
//     saveSettings(e.target);
//   };
//
//   rvpMaximum.addEventListener('change', maximumChangeHandler, false);
//   rvpContainer.addEventListener('change', containerChangeHandler, false);
//   rvpDirection.addEventListener('change', directionChangeHandler, false);
//   rvpForm.addEventListener('submit', onSubmit, false);
//
//   EcwidApp.getAppStorage('public', (value) => {
//     const param = JSON.parse(value);
//     rvpSettings = {
//       maxShown: param.maxShown || maxLimit,
//       container: param.container || defaultContainer,
//       direction: param.direction || defaultDirection,
//     };
//     updateForm();
//   });
// })();
