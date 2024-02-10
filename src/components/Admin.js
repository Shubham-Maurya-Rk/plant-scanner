import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Login from './Login'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../FirebaseConfig'
import Loader from './Loader'


function Admin({loggedin,setloggedin}) {
  const [showloader, setshowloader] = useState(true)
  useEffect(() => {
    const unsub=()=>{
      setshowloader(true)
      onAuthStateChanged(auth,(user)=>{
        if(user)setloggedin(true);
        else setloggedin(false)
        setshowloader(false);
      })
    }
    return ()=>unsub();
  }, [setloggedin]);
  
  if(showloader)return <Loader text={"Loading..."}/>
  else if(loggedin)return (
    <Outlet/>
  )
  else return <Login setloggedin={setloggedin}/>
}

export default Admin
