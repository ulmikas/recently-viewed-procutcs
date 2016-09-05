'use strict';

(function () {
	EcwidApp.init({
		app_id: "testapp-hackathon2016-3",
		autoloadedflag: true,
		autoheight: true
	});

	var storeData = EcwidApp.getPayload();
	var storeId = storeData.store_id;
	var token = storeData.access_token;

	var maxLimit = 5;
	var defaultContainer = '.ecwid-productBrowser';

	var rvpForm = document.forms['rvp-settings'];
	var rvpMaximum = rvpForm.maximum;
	var rvpContainer = rvpForm.container;

	// let rvpSettings = {
	// 	maxShown: maxLimit,
	// 	container: defaultContainer
	// }

	var rvpSettings = {};

	EcwidApp.getAppStorage('public', function (value) {
		var param = JSON.parse(value);
		rvpSettings = {
			maxShown: param.maxShown || maxLimit,
			container: param.container || defaultContainer
		};
		updateForm();
	});

	var validateForm = function validateForm(form) {
		if (parseInt(form.maximum.value) < 1 || parseInt(form.maximum.value) > maxLimit) form.maximum.value = maxLimit;

		if (form.container === '') {
			form.container = defaultContainer;
		}
	};

	var updateForm = function updateForm() {
		rvpForm.maximum.value = rvpSettings.maxShown;
		rvpForm.container.value = rvpSettings.container;
	};

	var maximumChangeHandler = function maximumChangeHandler(e) {
		e.target.value = e.target.value <= maxLimit ? e.target.value : maxLimit;
	};

	var containerChangeHandler = function containerChangeHandler(e) {
		rvpSettings.container = e.target.value;
	};

	var onSubmit = function onSubmit(e) {
		e.preventDefault();
		validateForm(e.target);
		saveSettings(e.target);
	};

	var saveSettings = function saveSettings(form) {
		var newSettings = {
			maxShown: form.maximum.value,
			container: form.container.value
		};
		EcwidApp.setAppPublicConfig(JSON.stringify(newSettings), function () {
			console.info('Public config saved!');
		});
	};

	rvpMaximum.addEventListener('change', maximumChangeHandler, false);
	rvpContainer.addEventListener('change', containerChangeHandler, false);
	rvpForm.addEventListener('submit', onSubmit, false);

	// const saveSettings = () => {
	// 	EcwidApp.setAppPublicConfig(JSON.stringify(rvpSettings), ()=>{
	// 		console.log('Public config saved!');
	// 	})
	// }

	// EcwidApp.setAppPublicConfig(JSON.stringify(rvpSettings), ()=>{
	// 	console.log('Public config saved!');
	// })
})();