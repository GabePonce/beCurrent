import React from 'react'
import CustomButton from './CustomButton'

const LoginRegister = () => {
  return (
    <>
      <div id="static-background" style={{width: "45%", margin: "auto", position: "relative"}}>
        <div id="display-area" style={{background: "#c1cdd6", width: "100%", borderStyle: "solid", borderWidth: "0.5vw", borderImage: "linear-gradient(0deg, #355975,rgb(100, 149, 189)) 1", display: "flex", flexDirection: "column", alignItems: "center"}}>
          <img src="./src/assets/becurrent.png" style={{width: "50vh", height: "14vh", marginTop: "2em"}}/>
          <h2 style={{color: "white", marginTop: "3em", fontSize: "2em"}}>Login</h2>
          <input className="input-boxes" id="username" placeholder='username' type="text" autoComplete='off' style={{borderRadius: "10px", borderColor: "transparent", fontSize: "1.5em", padding: "0.3em"}}/>
          <input className="input-boxes" id="password" placeholder='password' type='password' autoComplete='off' style={{borderRadius: "10px", borderColor: "transparent", fontSize: "1.5em", marginTop: "1em", padding: "0.3em"}}/>
          <CustomButton style={{margin: "1em"}}>Login</CustomButton>
          <div style={{marginTop: "4em", display: "flex", flexDirection: "column", alignItems: "center"}}>
          <CustomButton style={{margin: "0.75em"}}>Forgot Password?</CustomButton>
          <CustomButton style={{marginBottom: "1em"}}>Don't Have an Account?</CustomButton>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginRegister