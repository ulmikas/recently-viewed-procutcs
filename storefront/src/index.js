import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const Ecwid = window.Ecwid;
Ecwid.OnAPILoaded.add((page) => {
  const apiSettings = {
    token: Ecwid.getAppPublicToken('testapp-hackathon2016-3'),
    storeId: Ecwid.getOwnerId(),
  };
  const appId = 'testapp-hackathon2016-3';
  const appSettings = JSON.parse(Ecwid.getAppPublicConfig(appId));
  const maxProducts = parseInt(appSettings.maxShown, 10);
  const rvp = JSON.parse(localStorage.getItem('viewed')).slice(0, maxProducts) || [];

  const rvpWrapper = document.querySelector('[id*=ProductBrowser]');
  const rvpContainer = document.createElement('div');

  rvpContainer.id = 'rvp-products';
  rvpContainer.className = 'rvp-products--' + appSettings.direction;
  rvpWrapper.insertBefore(rvpContainer, rvpWrapper.childNodes[0]);

  ReactDOM.render(
    <App items={rvp} settings={apiSettings} maximum={maxProducts + 1} />,
    rvpContainer
  );
});
