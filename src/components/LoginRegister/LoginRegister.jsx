import Login from './Login/Login'
import Register from './Register/Register'
import CustomButton from '../Customs/CustomButton'

const LoginRegister = () => {
  return (
    <>
      <div id="static-background" style={{width: "80%", margin: "auto", position: "relative"}}>
        <div id="display-area" style={{background: "#c1cdd6", width: "100%", borderStyle: "solid", borderWidth: "0.5vw", borderImage: "linear-gradient(0deg, #355975,rgb(100, 149, 189)) 1", display: "flex", flexDirection: "column", alignItems: "center"}}>
        <img src="./src/assets/becurrent.png" style={{width: "50vh", height: "14vh", marginTop: "2em"}}/>
        <div style={{display: "grid", gridTemplateColumns: "auto auto 50% auto auto", placeContent: "center", height: "50vh"}}>
          <div id="spacer"></div>
          <div style={{display: "flex", flexDirection: "column"}}>
            <Login></Login>
          </div>
          <div id="spacer"></div>
          <div style={{display: "flex", flexDirection: "column"}}>
            <Register></Register>
          </div>
          <div id="spacer"></div>
          </div>
          <CustomButton style={{margin: "10vh 1vw 4vh 1vw"}}>Forgot Password?</CustomButton>
        </div>
      </div>
    </>
  )
}


export default LoginRegister