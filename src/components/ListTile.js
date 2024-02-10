import React, { useEffect, useState } from 'react';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import { db, imageDB } from '../FirebaseConfig';
import { deleteObject, getDownloadURL, ref } from 'firebase/storage';



function ListTile({ id, title, subtitle,notify }) {
    const [image, setimage] = useState(`${process.env.PUBLIC_URL}/images/loader.gif`);
    useEffect(() => {
        const unsub = () => {
            getDownloadURL(ref(imageDB, `images/${id}`)).then(url => setimage(url)).catch(err => console.log(err))
        }
        return () => unsub()
    }, [id])

    function deletePlant() {
        if(!window.confirm(`Are you sure u want to delete ${title}?`))return
        notify(`Deleted ${title} successfully`);
        deleteDoc(doc(db, "plants", id)).then(e => {
            deleteObject(ref(imageDB, `images/${id}`));
        })
    }
    return (
        <div className='tile border p-2 rounded'>
            <span className='d-flex align-items-center'>
                <Link  to={`/${id}`}><img src={image} alt="" className='' /></Link>
                <div>
                    <p>{title}</p>
                    <small>{subtitle.substring(0, 30)}...</small>
                </div>
            </span>
            <span className='d-flex'>
                <Link to={`/qr/${title}/${id}`}><QrCode2Icon className='icon mx-2' htmlColor='black' /></Link>
                <DeleteIcon className='icon mx-1' htmlColor='red' onClick={deletePlant} />
            </span>
        </div>
    )
}

export default ListTile
