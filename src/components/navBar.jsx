import NavButton from './NavButton'
import CustomButton from './CustomButton'

const NavBar = () => {
  return (
    <>
      <div id="static-background" style={{width: "65%", height: "100%", display: "flex", margin: "auto", position: "relative"}}>
        <div id="vertical-nav" style={{borderStyle: "solid", borderWidth: "0.5vw", borderImage: "linear-gradient(45deg, #355975,rgb(100, 149, 189)) 1", backgroundImage: "linear-gradient(#9dbdcd, #81a7ba)"}}>
          <ol style={{paddingRight: "0.5em", marginLeft: "-1.92em", listStyleType: "none"}}>
            <li><NavButton>home.png</NavButton></li>
            <li><NavButton>box.png</NavButton></li>
            <li id="break" style={{marginTop: "20vw"}}><NavButton>profile.png</NavButton></li>
            <li><NavButton>settings.png</NavButton></li>
          </ol>
        </div>
        <div id="display-area" style={{background: "#c1cdd6", width: "100%", borderStyle: "solid", borderWidth: "0.5vw", borderImage: "linear-gradient(0deg, #355975,rgb(100, 149, 189)) 1", borderLeft: "0"}}>
          <CustomButton>Test</CustomButton>
        </div>
      </div>
    </>
  )
}

export default NavBar