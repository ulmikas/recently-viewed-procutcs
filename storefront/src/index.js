import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

//export const token = 'public_j4W4SHTxTg2eSkVphEqNsJwSpwz9vVfi'
export const token = Ecwid.getAppPublicToken('testapp-hackathon2016-3')
export const apiProductUrl = 'https://app.ecwid.com/api/v3'
export const storeId = '7022058'
//export const storeId = Ecwid.getOwnerId()
const rvp = JSON.parse(localStorage.getItem('viewed')) || []
const app_id = "testapp-hackathon2016-3"
const appSettings = JSON.parse(Ecwid.getAppPublicConfig(app_id))
const maxProducts = parseInt(appSettings.maxShown) || 5
const containerProducts = appSettings.container
let rvpContainer

if ( containerProducts && document.querySelector(containerProducts) ){
	rvpContainer = document.querySelector(containerProducts)
} else {
	const pb = document.querySelector('[id*=ProductBrowser]')
	rvpContainer = document.createElement('div')
	rvpContainer.id = 'rvp-products'
	pb.insertBefore(rvpContainer, pb.childNodes[0])
}
ReactDOM.render(
  <App items={rvp} maximum={maxProducts + 1} />,
  rvpContainer
);
