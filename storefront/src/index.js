import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const Ecwid = window.Ecwid;
Ecwid.OnAPILoaded.add((page) => {
  const apiSettings = {
    token: Ecwid.getAppPublicToken('testapp-hackathon2016-3'),
    storeId: Ecwid.getOwnerId(),
    lang: Ecwid.getStorefrontLang()
  };
  const appId = 'testapp-hackathon2016-3';
  const appSettings = JSON.parse(Ecwid.getAppPublicConfig(appId));
  const maxProducts = parseInt(appSettings.maxShown, 10);
  const rvp = sessionStorage.getItem('viewed') && JSON.parse(sessionStorage.getItem('viewed')).slice(0, maxProducts + 1) || [];

  const rvpWrapper = document.querySelector('[id*=ProductBrowser]');
  let rvpContainer = document.querySelector('#rvp-products');
  if (!rvpContainer) {
    rvpContainer = document.createElement('div');
    rvpContainer.id = 'rvp-products';
    rvpContainer.className = 'rvp-products--' + appSettings.place;
  } else {
    rvpContainer.parentElement.remove(rvpContainer);
  }

  if (appSettings.place === 'above') {
    rvpWrapper.insertBefore(rvpContainer, rvpWrapper.childNodes[0]);
  } else {
    rvpWrapper.appendChild(rvpContainer);
  }

  ReactDOM.render(
    <App items={rvp} settings={apiSettings} maximum={maxProducts + 1} />,
    rvpContainer
  );
});
