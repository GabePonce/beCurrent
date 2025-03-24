import React from 'react'
import CustomButton from './CustomButton'

const Login = () => {
    return (
      <>
        <h2 style={{color: "white", marginTop: "3em", fontSize: "2em"}}>Login</h2>
        <input className="login-input-boxes" id="email" placeholder='email' type="text" autoComplete='off' style={{borderRadius: "10px", borderColor: "transparent", fontSize: "1.5em", padding: "0.3em"}}/>
        <input className="login-input-boxes" id="password" placeholder='password' type='password' autoComplete='off' style={{borderRadius: "10px", borderColor: "transparent", fontSize: "1.5em", marginTop: "1em", padding: "0.3em"}}/>
        <CustomButton style={{margin: "1em"}}>Login</CustomButton>
      </>
    )
  }
  
  export default Login