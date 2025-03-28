import { useState } from 'react';
import CustomButton from '../Customs/CustomButton';
import './MapComponent.css'

const MapScreen = ({ navigate }) => (
  <div id="map-screen">
    <h2 id="map-title">Hangout Map</h2>
    <div id="map"></div>
    <CustomButton id="manage-addresses" onClick={() => navigate('screenTwo')}>Manage Addresses</CustomButton>
  </div>
);

const AddNewAddress = ({ navigate }) => (
  <div>
    <h2 id="add-address-title">Add New Address</h2>
    <input id="input-new-address" type="text" placeholder='45 Lampkin Lane, Haddonfield, Illinois'></input>
    <CustomButton id="add-new-address">Confirm</CustomButton>
    <CustomButton onClick={() => navigate('screenTwo')}>Cancel</CustomButton>
  </div>
);


const showCalculate = () => {
  var addressA = document.getElementById('select-address-list-a').value;
  var addressB = document.getElementById('select-address-list-b').value;
  var showButton = document.getElementById('btn');

  addressA != '...' && addressB != '...' && addressA != addressB ? showButton.innerHTML = '<button>Calculate Route</button>' : showButton.innerHTML = '';


};

// Array of hangouts
const addresses = [
  { id: 1, address: "Sam's House" },
  { id: 2, address: "Kaitlyn's House" },
  { id: 3, address: "Gabe's House" },
  { id: 4, address: "Kendra's House" },
  { id: 5, address: "Evan's House" },
  { id: 6, address: "Alfred's Dungeon" }
];


const ViewAddresses = ({ navigate }) => (
  <>
    <button id="back-arrow" onClick={() => navigate('main')}><img id="back-arrow-image" src={"./src/assets/left.png"} width="32vw" height="32vw" /></button>
    <div id="view-addresses">
      <div id="address-list-section">
        <h3 id="address-list-title">Hangout Addresses</h3>
        <ul id="address-ul">
          <button id="add-new-address-button" onClick={() => navigate('screenOne')}>Add New Address</button>
          {addresses.map((address) => (
            <li key={address.id}>
              <div className="address-list-contents">
                <p className="address-list-item-text">{address.address}</p>
                <button id="remove-address">&#128465;</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div id="calc-route-section">
        <h3 id="calc-route-title">Calculate Route</h3>
        <div id="point-a">
          <label for="point-a-address-list" id="a-label">Point A:</label>
          <select name="point-a-address-list" id="select-address-list-a" onChange={showCalculate}>
            <option value="..." selected>...</option>
            {addresses.map((address) => (
              <option value={address.address}>{address.address}</option>
            ))}
          </select>
        </div>
        <div id="point-b">
          <label for="point-b-address-list" id="b-label">Point B:</label>
          <select name="point-b-address-list" id="select-address-list-b" onChange={showCalculate}>
            <option value="..." selected>...</option>
            {addresses.map((address) => (
              <option value={address.address}>{address.address}</option>
            ))}
          </select>
        </div>
        <div id="btn"></div>
      </div>
    </div>
  </>
);

const ScreenNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('main');

  const navigate = (screen) => setCurrentScreen(screen);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'screenOne':
        return <AddNewAddress navigate={navigate} />;
      case 'screenTwo':
        return <ViewAddresses navigate={navigate} />;
      default:
        return <MapScreen navigate={navigate} />;
    }
  };

  return renderScreen();
}

export default ScreenNavigator;
