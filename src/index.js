// import 'promise-polyfill';
// import 'isomorphic-fetch';
import { h, render } from 'preact';
import './styles/index.css';

function init(rvp, apiSettings, maxProducts, container) {
	let App = require('./components/app').default;
	render(<App items={rvp} settings={apiSettings} maximum={maxProducts + 1} />, container);
}

// register ServiceWorker via OfflinePlugin, for prod only:
if (process.env.NODE_ENV==='production') {
	require('./pwa');
}

// in development, set up HMR:
if (module.hot) {
	//require('preact/devtools');   // turn this on if you want to enable React DevTools!
	module.hot.accept('./components/app', () => requestAnimationFrame(init) );
}

const Ecwid = window.Ecwid;
Ecwid.OnAPILoaded.add((page) => {
	const apiSettings = {
		token: Ecwid.getAppPublicToken('recently-viewed-products'),
		storeId: Ecwid.getOwnerId(),
		lang: Ecwid.getStorefrontLang()
	};
	const appId = 'recently-viewed-products';
	const appSettings = (Ecwid.getAppPublicConfig(appId) === '') ? { maxShown: 5, place: 'above' } : JSON.parse(Ecwid.getAppPublicConfig(appId));
	const maxProducts = parseInt(appSettings.maxShown, 10);
	const appPlace = appSettings.place || 'above';
	const rvp = sessionStorage.getItem('viewed') && JSON.parse(sessionStorage.getItem('viewed')).slice(0, maxProducts + 1) || [];

	const rvpWrapper = document.querySelector('.ecwid-productBrowser');
	let rvpContainer = document.querySelector('#rvp-products');
	if (!rvpContainer) {
		rvpContainer = document.createElement('div');
		rvpContainer.id = 'rvp-products';
		rvpContainer.className = 'rvp-products--' + appPlace;
	} else {
		rvpContainer.parentElement.remove(rvpContainer);
	}

	if (appPlace === 'above') {
		rvpWrapper.insertBefore(rvpContainer, rvpWrapper.childNodes[0]);
	} else {
		rvpWrapper.appendChild(rvpContainer);
	}

	init(rvp, apiSettings, maxProducts, rvpContainer);
});
