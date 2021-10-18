import React,{useState} from 'react';
import firebase from "firebase";


function FileUpload() {

    
    const [upload,setUpload] = useState(0);
    const [picture,setPicture] = useState(null);
    
    
    const handleUpload = async (event)=>{
        event.preventDefault()
        try{

            const file = event.target.files[0];
            const imagen = await firebase.storage().ref().child("fotosProductos/"+file.name);
            const cargar = imagen.put(file);
            const url = await imagen.getDownloadURL();
            
          
            
            cargar.on("stated_changed", function progress(snapshot) {
                console.warn((snapshot.bytesTransferred/snapshot.totalBytes)*100);
                setUpload((snapshot.bytesTransferred/snapshot.totalBytes)*100);
            },

            function error(error) {
                console.error(error);
            },
            
            function complete() {
                console.info("finished uploading");
                setPicture(cargar.snapshot.downloadURL);
                setUpload(100);
                console.log("URL",url)
            }
            );    
                                     
        }

        catch(e){
            console.log("Error",e)
                       
        }

    }

    

    return(
        <div>
            <progress value={upload} max="100"></progress>
            <br></br>
            <input type="file" onChange={handleUpload}></input>
            <img width="320" src={picture} alt=""></img>
        </div>

    )
}

export default FileUpload;