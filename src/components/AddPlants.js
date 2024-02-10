import React, { useRef ,useState} from 'react';
import { db ,imageDB} from '../FirebaseConfig';
import { ref, uploadBytes} from 'firebase/storage'
import { v4 } from 'uuid';
import {  doc, setDoc } from 'firebase/firestore';
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FloatingButton from './FloatingButton';
import ListIcon from '@mui/icons-material/List';

function AddPlants() {
    const uploadImgUrl=`${process.env.PUBLIC_URL}/images/upload.jpg`;
    const imageRef = useRef(null);
    const [img, setimg] = useState("")
    const [name, setname] = useState("")
    const [variety, setvariety] = useState("")
    const [kingdom, setkingdom] = useState("")
    const [cotyledons, setcotyledons] = useState(0)
    const [desp, setdesp] = useState("")
    const [imgUrl, setimgUrl] = useState(uploadImgUrl);
    const [showloader, setshowloader] = useState(false)
    async function add(){
        if(img===""){
            toast.error("Image is required!");
            return;
        }else if(name===""){
            toast.error("Name is required!");
            return;
        }
        const id=v4().replaceAll("-","");
        try {
            setshowloader(true);
            let storageRef=ref(imageDB,`images/${id}`)
            await uploadBytes(storageRef,img);
            const docRef=doc(db,"plants",id);
            await setDoc(docRef,{
                name,
                variety,
                kingdom,
                cotyledons,
                desp,
                on:new Date()
            });
            setdesp("")
            setvariety("")
            setcotyledons(0)
            setkingdom("")
            setimg("")
            setimgUrl(uploadImgUrl)
            setshowloader(false);
            toast.success(`Added ${name} successfully!`)
            setname("");
            // storageRef=ref(imageDB,`images/${id}`)
            // getDownloadURL(storageRef).then(url=>setimg(url));
        } catch (error) {
            toast.error(error)
        }
        
    }
    function selectImage(e){ 
        const file=e.target.files[0];
        if(file && !file.type.includes("image/")){
            toast.error("Please select a image file!")
            return;
        }
        setimg(file);
        setimgUrl((window.URL || window.webkitURL).createObjectURL(file));
    }
    return (
        <div className='container my-5'>
            <FloatingButton icon={<ListIcon/>} text={"Show plants"} to={"/"}/>
            {showloader && <Loader text={"Adding..."}/>}
            <div className='row'>
                <div className='col-lg-6'>
                    <img src={imgUrl} onClick={e=>imageRef.current.click()} alt="Choose img" className='add-img border border-2' />
                    <input type="file" ref={imageRef} onChange={selectImage} className='d-none'/>
                </div>
                <div className='col-lg-6'>
                    <div className="form-group mt-3">
                        <label for="exampleInputEmail1">Name</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={name} placeholder="Enter name" onChange={e=>setname(e.target.value)} />
                    </div>
                    <div className="form-group mt-3">
                        <label for="exampleInputEmail1">Variety</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter variety" value={variety} onChange={e=>setvariety(e.target.value)} />
                    </div>
                    <div className="form-group mt-3">
                        <label for="exampleInputEmail1">Kingdom</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={kingdom} placeholder="Enter Kingdom" onChange={e=>setkingdom(e.target.value)} />
                    </div>
                    <div className="form-group mt-3">
                        <label for="exampleInputEmail1">No. of cotyledon</label>
                        <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Cotyledons" value={cotyledons}  onChange={e=>setcotyledons(e.target.value)} />
                    </div>
                    <div className="form-group mt-3">
                        <label for="exampleFormControlTextarea1">Description</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="7" value={desp} onChange={e=>setdesp(e.target.value)}></textarea>
                    </div>
                    <button type="submit" onClick={add} className="btn btn-success mt-3 w-100">Submit</button>
                    <ToastContainer theme='colored'/>
                </div>
            </div>
        </div>
        )
}

export default AddPlants
