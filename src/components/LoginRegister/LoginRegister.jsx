import Login from './Login/Login'
import Register from './Register/Register'
import CustomButton from '../Customs/CustomButton'
import './LoginRegister.css'

const LoginRegister = () => {
  return (
    <>
      <div className="static-background">
        <div className="display-area">
        <img src="./src/assets/becurrent.png"/>
        <div className="container">
          <div id="spacer"></div>
          <div className="formContainers">
            <Login></Login>
          </div>
          <div id="spacer">
            <div className="line"></div>
          </div>
          <div className="formContainers">
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