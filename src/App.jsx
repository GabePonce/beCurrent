import { useEffect } from 'react'
import LoginRegister from './components/LoginRegister/LoginRegister'
import { useUserStore } from './stores/userStore.js'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firebase.js'
import Navbar from './components/Navbar/Navbar.jsx'

function App() {
  
  const {currentUser, isLoading, fetchUserInfo} = useUserStore()

  useEffect(() => {
    const unSub = onAuthStateChanged(auth,(user)=>{
      console.log("AHHHHHHHHHH")
      fetchUserInfo(user?.uid)
    })

    return () => {
      unSub()
    }
  }, [fetchUserInfo])


  if (isLoading) return <div className="loading">Loading...</div>


  return (
    <>
    {
      currentUser ? (
        <>
          <Navbar></Navbar>
        </>
      ) :(<LoginRegister></LoginRegister>)
    }
    </>
  )
}

export default App
