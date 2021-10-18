import React,{useState} from "react";
import firebase from "../Config/firebase";
import Producto from "../Components/Producto";
import Alerts from '../Components/Alerts';
import FormGroup from '../Components/Forms/FormGroup';
import {Button,Spinner} from "react-bootstrap";
import FileUpload from '../Components/FileUpload';

function AltaProducto(props) {
    const [loading,setLoading] = useState(false)
    const [form,setForm] = useState({producto:"",descripcion:"",precio:"",id:null,imagen:""})
    const [reload,setReload] = useState(false);
    const [alert,setAlert] = useState({variant:"",text:""})
    
    const handleSubmit = async (event)=>{
        event.preventDefault()
        setLoading(true)
        try{
            const document = await firebase.db.collection("products")
            .add(form);
            console.log("Document",document);
            setAlert({variant:"success",text:"Producto ingresado"});
            setReload(true);
            setLoading(false);
            setForm({producto:"",descripcion:"",precio:"",id:null,imagen:""})

        }catch(e){
            console.log("error",e)
            setAlert({variant:"warning",text:"Error!"})
            setLoading(false)
        }
        
    }
    
    const handleChange = (event)=>{
        const name = event.target.name
        const value = event.target.value
        console.log("handleChange",name,value)
        setForm({...form,[name]:value})
    }

       
    if(loading){
        return(
            <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }else{
        return(
     
            <div>
                              
               <h1>Alta De Producto</h1>
               <form onSubmit={handleSubmit}>
               <FormGroup label="Nombre" type="text" name="producto" placeholder="Nombre del producto" value={form.producto} change={handleChange}></FormGroup>
               <FormGroup label="Descripcion" type="text" name="descripcion" placeholder="Ingrese informacion acerca del producto" value={form.descripcion} change={handleChange}></FormGroup>
               <FormGroup label="Precio" type="number" name="precio" placeholder="Ingrese el precio en pesos argentinos" value={form.precio} change={handleChange}></FormGroup>
               <FileUpload/>
               <Button variant="warning" type="submit">Guardar</Button>
               <Alerts variant={alert.variant} text={alert.text}/>
                </form>
            </div>
            
            
            
        )
    }
}
export default AltaProducto;

