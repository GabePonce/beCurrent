import NavButton from '../../Navbar/NavButtons/NavButton'
import CustomButton from '../../Customs/CustomButton';
import './HangOutNavBar.css'

const displayNavOptions = () => {

  var options = document.getElementById('nav-options');

  window.getComputedStyle(options).display === 'none' ? options.style.display = 'block' : options.style.display = 'none';

}

const HangoutNavBar = () => {
  return (
    <> 
        {/* The placeholder image is currently set in CSS.
            It will be a lot easier to move the CSS that handles that to an inline style
            to dynamically set it here. */}
        <div id="header-bar">
          <header id="group-image">
            {/* You can replace the Camping with a retrieved Group name and August 17 with the retrieved date.
                Or you can not retrieve the date of the hangout and just start drinking. */}
              <p>Camping<br/>August 17</p>
          </header>
          <div id="dropdown-button-area">
              <NavButton onClick={displayNavOptions}>down.png</NavButton>
          </div>
        </div>
        <div id="nav-options">
          <CustomButton>Info</CustomButton>
          <CustomButton>List</CustomButton>
          {/* Render only if user is the owner. */}
          <CustomButton>Settings</CustomButton>
        </div>
    </>
  )
}

export default HangoutNavBar