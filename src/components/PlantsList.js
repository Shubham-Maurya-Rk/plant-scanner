import React, { useEffect, useState } from 'react'
import ListTile from './ListTile'
import FloatingButton from './FloatingButton'
import AddIcon from '@mui/icons-material/Add';
import { db } from '../FirebaseConfig';
import { collection,  onSnapshot, orderBy, query } from 'firebase/firestore';
import Loader from './Loader';
import SearchIcon from '@mui/icons-material/Search';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PlantsList() {
  const [data, setdata] = useState([]);
  const [showloader, setshowloader] = useState(true)
  const [search, setsearch] = useState("")
  useEffect(() => {
    const unsub=()=>{
      setshowloader(true);
      const q=query(collection(db,"plants"),orderBy("name"))
      onSnapshot(q,(plants)=>{
        setdata([]);
        plants.docs.forEach(plant=>{
          setdata(prev=>[...prev,{...plant.data(),"id":plant.id}])
        })
        setshowloader(false);
      })
    }
    return () => unsub();
  }, []);

  const notify=(text)=>{
    console.log("Deleting")
    toast.success(text)
  }

  function maplist() {
    return data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
  }
  return (
    <div className='container mb-5'>
      <ToastContainer theme='colored' />
      <FloatingButton icon={<AddIcon />} text={"Add plant"} to={"/add"} />
      <div className="d-flex p-2 my-1 justify-content-between border searchbar">
        <input onChange={e => setsearch(e.target.value)} value={search} type="search" placeholder="Search" aria-label="Search" />
        <button type="submit"><SearchIcon htmlColor='green'/></button>
      </div>
      {showloader && <Loader text={"Loading..."} />}
      {
        data && (maplist().length)?maplist().map(plant => {
          return <ListTile key={plant.id} title={plant.name} notify={notify} subtitle={plant.desp} id={plant.id} />
        }): (search!=="" || !showloader) && <p className='text-center h4 my-3'>Not Found Anything!</p>
      }
    </div>
  )
}

export default PlantsList
