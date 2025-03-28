import CustomButton from '../../Customs/CustomButton';
import './HangOutNavBar.css'


// Handle clicking on the dropdown arrow.
const displayNavOptions = () => {

  var isOwner = false; // REPLACE THIS WITH A CHECK TO SEE IF THEY ARE THE OWNER OR NOT
  var settingsButton = document.getElementById('settings');
  isOwner ? settingsButton.style.display = 'block' : settingsButton.style.display = 'none';

  var options = document.getElementById('nav-options');
  var dropdownButton = document.getElementById('dropdown-button');

  if (window.getComputedStyle(options).display === 'none') {
    options.style.display = 'block';
    dropdownButton.innerHTML = '<img id="button-image" src="./src/assets/up.png" width="32vw" height="32vw"/>';
  }
  else {
    options.style.display = 'none';
    dropdownButton.innerHTML = '<img id="button-image" src="./src/assets/down.png" width="32vw" height="32vw"/>';  }

}

// Set the name of the image for the hangout here.
var backgroundImageName = "lake.jpg";


const HangoutNavBar = () => {
  return ( 
    <> 
        <div id="header-bar">
          <header id="group-image" style={{backgroundImage: 'linear-gradient(to right, transparent, #6495bd), url(./src/assets/' + backgroundImageName + ')'}}>

            {/* You can replace Camping with a retrieved Group name and August 17 with the retrieved date.
                Or you can not retrieve the date of the hangout and just start day drinking. */}
              <p id="hangout-header-text">
                <div id="hangout-title">Camping</div>
                <div id="hangout-date">August 17</div>
              </p>
          </header>
          <div id="dropdown-button-area">
            <button id="dropdown-button" onClick={displayNavOptions}><img id="button-image" src={"./src/assets/down.png"} width="32vw" height="32vw"/></button>
          </div>
        </div>
        <div id="nav-options">
          <div id="button-grid">
            <CustomButton>Info</CustomButton>
            <CustomButton>Chat</CustomButton>
            <CustomButton>List</CustomButton>
            <CustomButton>Map</CustomButton>
            <div id="photos"><CustomButton>Photos</CustomButton></div>
            <div id="settings"><CustomButton>Settings</CustomButton></div>
          </div>
        </div>
    </>
  )
}

export default HangoutNavBar