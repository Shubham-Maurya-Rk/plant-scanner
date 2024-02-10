import React, { } from 'react'
import { useParams } from 'react-router-dom';
import QRCode from "qrcode.react";
import DownloadIcon from '@mui/icons-material/Download';

function QR() {
  const qrCodeRef = React.createRef();
  const { id, title } = useParams();
  const downloadQR = () => {
    const canvas = document.getElementById("qr");
    console.log(canvas);
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${title}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  return (
    <div className='my-5 d-flex flex-column justify-content-center align-items-center'>
      <h2 className='my-1 qr-title'>{title}</h2>
      <QRCode id="qr" size={300} includeMargin={true} value={`http://192.168.1.106:3000/#/${id}`} ref={qrCodeRef} />
      <button className='btn btn-success' onClick={downloadQR}><DownloadIcon/> Download</button>
    </div>
  )
}

export default QR
