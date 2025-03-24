import { useState } from 'react';
import CustomButton from '../../Customs/CustomButton'
import './Register.css'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { auth, db } from '../../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = () => {

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) =>{
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.target)

    const { username, email, password, address} = Object.fromEntries(formData)

    if (!username || !email || !password){
      alert("Fill in all the Spots")
    }

    // VALIDATE UNIQUE USERNAME
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        alert("Select another username");
        setLoading(false)
        return
    }

    try {

      const  res = await createUserWithEmailAndPassword(auth, email, password)

      await setDoc(doc(db, "userHangouts", res.user.uid), {
        hangouts: [],
      })

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        address,
        id: res.user.uid
      })

      alert("Success")
      setLoading(false)
      document.getElementById("register").reset()
    }catch(err){
      console.log(err)
      alert(err)
    }
  }

  return (
    <>
      <h2>Register an Acount</h2>
      <form id="register" onSubmit={handleRegister}>
          <input name="email" className="register-input-boxes" id="reg-email" placeholder='email' type="email" autoComplete='off' required/>
          <input name="username" className="register-input-boxes non-top" id="reg-username" placeholder='username' type="text" autoComplete='off' required/>
          <input name="password" className="register-input-boxes non-top" id="reg-password" placeholder='password' type='password' autoComplete='off' required/>
          <input name="address" className="register-input-boxes non-top" id="reg-address" placeholder='address' type='address' autoComplete='off' required/>
          <CustomButton style={{margin: "1em"}} disable={loading}>{loading ? "Loading...." : "Sign up"}</CustomButton>
      </form>
    </>
  )
}

export default Register