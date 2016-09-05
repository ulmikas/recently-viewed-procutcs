(()=> {
	EcwidApp.init({
		app_id: "testapp-hackathon2016-3",
		autoloadedflag: true,
		autoheight: true
	});

	const storeData = EcwidApp.getPayload();
	const storeId = storeData.store_id;
	const token = storeData.access_token;

	const maxLimit = 5;
	const defaultContainer = '.ecwid-productBrowser';

	const rvpForm = document.forms['rvp-settings'];
	const rvpMaximum = rvpForm.maximum;
	const rvpContainer = rvpForm.container;

	// let rvpSettings = {
	// 	maxShown: maxLimit,
	// 	container: defaultContainer
	// }

	let rvpSettings = {}

	EcwidApp.getAppStorage('public', function (value) {
		const param = JSON.parse(value)
		rvpSettings = {
			maxShown: param.maxShown || maxLimit ,
			container: param.container || defaultContainer
		}
		updateForm()
	})

	const validateForm = (form) => {
		if (parseInt(form.maximum.value) < 1 || parseInt(form.maximum.value) > maxLimit )
			form.maximum.value = maxLimit

		if (form.container === '') {
			form.container = defaultContainer
		}
	}

	const updateForm = () => {
		rvpForm.maximum.value = rvpSettings.maxShown
		rvpForm.container.value = rvpSettings.container
	}

	const maximumChangeHandler = (e) => {
		e.target.value = (e.target.value <= maxLimit) ? e.target.value : maxLimit
	}

	const containerChangeHandler = (e) => {
		rvpSettings.container = e.target.value
	}

	const onSubmit = (e) => {
		e.preventDefault()
		validateForm(e.target)
		saveSettings(e.target)
	}

	const saveSettings = (form) => {
		const newSettings = {
			maxShown: form.maximum.value,
			container: form.container.value
		}
		EcwidApp.setAppPublicConfig(JSON.stringify(newSettings), ()=> {
			console.info('Public config saved!');
		})
	}


	rvpMaximum.addEventListener('change', maximumChangeHandler, false)
	rvpContainer.addEventListener('change', containerChangeHandler, false)
	rvpForm.addEventListener('submit', onSubmit, false)

	// const saveSettings = () => {
	// 	EcwidApp.setAppPublicConfig(JSON.stringify(rvpSettings), ()=>{
	// 		console.log('Public config saved!');
	// 	})
	// }

	// EcwidApp.setAppPublicConfig(JSON.stringify(rvpSettings), ()=>{
	// 	console.log('Public config saved!');
	// })

	const a = 2;

})();