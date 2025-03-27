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
            <li id="topBtn1"><NavButton>home.png</NavButton></li>
            <li id="topBtn2"><NavButton>box.png</NavButton></li>
            <li id="bottomBtn1"><NavButton onClick={()=>auth.signOut()}>logout.png</NavButton></li>
            <li id="bottomBtn2"><NavButton>settings.png</NavButton></li>
          </ol>
        </div>
        <div id="display-area">
          <div id="display-area-border">
            <Header></Header>
            <HomeScreen></HomeScreen>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar