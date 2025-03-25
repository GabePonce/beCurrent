import NavButton from '../../Navbar/NavButtons/NavButton'
import CustomButton from '../../Customs/CustomButton';
import './HangOutNavBar.css'

const displayNavOptions = () => {

  var options = document.getElementById('nav-options');

  if (window.getComputedStyle(options).display === 'none') {
    options.style.display = 'block';
  }
  else {
    options.style.display = 'none';
    // document.getElementById('dropdown-arrow').innerHTML = <NavButton id="dropdown-arrow" onClick={displayNavOptions}>up.png</NavButton>; // Not working right now.
  }

}

const HangoutNavBar = () => {
  return ( 
    <> 
        {/* The placeholder image is currently set in CSS.
            It will be a lot easier to move the CSS that handles that to an inline style
            to dynamically set it here. */}
        <div id="header-bar">
          <header id="group-image">
            {/* You can replace Camping with a retrieved Group name and August 17 with the retrieved date.
                Or you can not retrieve the date of the hangout and just start drinking. */}
              <p id="hangout-header-text">
                <div id="hangout-title">Camping</div>
                <div id="hangout-date">August 17</div>
              </p>
          </header>
          <div id="dropdown-button-area">
              <NavButton id="dropdown-arrow" onClick={displayNavOptions}>down.png</NavButton>
          </div>
        </div>
        <div id="nav-options">
          <div id="button-grid">
            <CustomButton>Info</CustomButton>
            <CustomButton>List</CustomButton>
            {/* Render only if user is the owner. */}
            <CustomButton>Settings</CustomButton>
          </div>
        </div>
    </>
  )
}

export default HangoutNavBar