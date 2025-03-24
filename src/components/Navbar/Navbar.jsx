import NavButton from './NavButtons/NavButton'
import './NavBar.css'
import { auth } from '../../config/firebase'

const Navbar = () => {
  return (
    <>
      <div className="static-background">
        <div id="vertical-nav">
          <ol id="button-list">
            <li><NavButton>home.png</NavButton></li>
            <li><NavButton>box.png</NavButton></li>
            <li id="break"><NavButton>profile.png</NavButton></li>
            <li><NavButton onClick={()=>auth.signOut()}>settings.png</NavButton></li>
          </ol>
        </div>
        <div id="display-area">
        </div>
      </div>
    </>
  )
}

export default Navbar