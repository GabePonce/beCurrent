import CustomButton from '../../Customs/CustomButton'

const Register = () => {
    return (
      <>
        <h2 style={{color: "white", marginTop: "3em", fontSize: "2em"}}>Register an Acount</h2>
            <input className="register-input-boxes" id="reg-email" placeholder='email' type="email" autoComplete='off' style={{borderRadius: "10px", borderColor: "transparent", fontSize: "1.5em", padding: "0.3em"}}/>
            <input className="register-input-boxes" id="reg-username" placeholder='username' type="text" autoComplete='off' style={{borderRadius: "10px", borderColor: "transparent", fontSize: "1.5em", marginTop: "1em", padding: "0.3em"}}/>
            <input className="register-input-boxes" id="reg-password" placeholder='password' type='password' autoComplete='off' style={{borderRadius: "10px", borderColor: "transparent", fontSize: "1.5em", marginTop: "1em", padding: "0.3em"}}/>
        
        <CustomButton style={{margin: "1em"}}>Sign Up</CustomButton>
      </>
    )
  }
  
  export default Register