import { useState } from 'react';
import CustomButton from '../../Customs/CustomButton'
import './Login.css'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../config/firebase';

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.target)

    const {email, password} = Object.fromEntries(formData)
    try {

        await signInWithEmailAndPassword(auth, email, password)

        alert("Success")
    } catch (err) {
        console.log(err)
        alert(err)
    } finally{
        setLoading(false)
    }
  }

  return (
    <>
      <h2 id="title">Login</h2>
      <form onSubmit={handleLogin}>
        <input name="email" className="login-input-boxes" id="email" placeholder='email' type="text" autoComplete='off' required/>
        <input name="password" className="login-input-boxes" id="password" placeholder='password' type='password' autoComplete='off' required/>
        <CustomButton id="login-button" style={{margin: "1em"}} disable={loading}>{loading ? "Loading...." : "Sign in"}</CustomButton>
      </form>
    </>
  )
}
  
  export default Login