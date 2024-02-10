import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db, imageDB } from '../FirebaseConfig';
import { useParams } from 'react-router-dom';
import { getDownloadURL, ref } from 'firebase/storage';
import Detail from './Detail';
import Loader from './Loader';

function PlantInfo() {
    const [info, setinfo] = useState({});
    const { id } = useParams()
    const [showloader, setshowloader] = useState(false);
    useEffect(() => {
        const unsub = async () => {
            try {
                setshowloader(true);
                const docm = await getDoc(doc(db, "plants", id))
                const url = await getDownloadURL(ref(imageDB, `images/${id}`))
                setinfo({ ...docm.data(), "imgUrl": url });
                setshowloader(false);
            } catch (error) {
                console.log(error)
                setshowloader(false);
            }
        }
        return () => unsub();
    }, [id]);

    return (
        <div className='info-container my-5'>
            {showloader && <Loader text={"Loading..."}/>}
            <img src={info.imgUrl} className='w-100' alt="" />
            <Detail title={"Name"} value={info.name} />
            <Detail title={"Variety"} value={info.variety} />
            <Detail title={"Kingdom"} value={info.kingdom} />
            <Detail title={"Cotyledons"} value={info.cotyledons} />
            <Detail title={"Description"} value={info.desp} />
        </div>
    )
}

export default PlantInfo
