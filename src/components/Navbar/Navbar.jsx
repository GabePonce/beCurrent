import NavButton from './NavButtons/NavButton'
import Header from '../HomeScreen/Header/Header'
import HomeScreen from '../HomeScreen/HomeScreen'
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
          <Header></Header>
          <HomeScreen></HomeScreen>
        </div>
      </div>
    </>
  )
}

export default Navbar