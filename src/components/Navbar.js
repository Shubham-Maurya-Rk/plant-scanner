import React,{useState} from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../FirebaseConfig';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import ListRoundedIcon from '@mui/icons-material/ListRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import { Link } from 'react-router-dom';

function Navbar({ loggedin, setloggedin }) {
  const [showmenu, setshowmenu] = useState(false)
  function logout(){
    if(!window.confirm("Are you sure you want to logout?"))return;
    setshowmenu(false);
    signOut(auth);
  }
  return (
    <div className='container-fluid bg-success p-2 my-navbar'>
      <div className='d-flex align-items-center text-center justify-content-between'>
        <span className='d-flex align-items-center'>
          <img src={`${process.env.PUBLIC_URL}/images/logo.jpg`} className='img-logo' alt="" />
          <p className='text-white logo-title'>Royal College Plants</p>
        </span>
        {loggedin && <MenuRoundedIcon htmlColor='white' className='cursor-pointer menuicon' onClick={()=>setshowmenu(true)}/>}
      </div>
      <div className="menubar" style={{transform:`translateX(${showmenu?'0':'100%'})`}}>
        <div className='w-100 p-3 float-right d-flex justify-content-end'><CloseRoundedIcon  onClick={()=>setshowmenu(false)} className='cursor-pointer'/></div>
        <Link to={"/add"} className='cursor-pointer px-2 py-3 d-block border-top text-dark text-decoration-none '><AddBoxRoundedIcon className='mx-2' htmlColor='black'/> Add Plants</Link>
        <Link to={"/"} className='cursor-pointer py-3 px-2 d-block border-top text-dark text-decoration-none'><ListRoundedIcon className='mx-2' htmlColor='black'/> Plants List</Link>
        <div onClick={logout} className='cursor-pointer py-3 px-2 border-top border-bottom'><ExitToAppRoundedIcon className='mx-2'/> Logout</div>
      </div>
    </div>
  )
}

export default Navbar
