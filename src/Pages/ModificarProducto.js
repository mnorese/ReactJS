import React,{useState,useEffect} from "react";
import firebase from "../Config/firebase";
import Producto from "../Components/Producto";
import Alerts from '../Components/Alerts';
import FormGroup from '../Components/Forms/FormGroup';
import Buttons from '../Components/Buttons';
import {Spinner} from "react-bootstrap"


function ModificarProducto(props) {

    const id=props.match.params.id
    
    const [form,setForm] = useState({producto:"",descripcion:"",precio:"",id:null,imagen:""})
    const [loading,setLoading] = useState(true);
    const [producto,setProducto] = useState({});
    const [alert,setAlert] = useState({variant:"",text:""})

    const handleSubmit = async (event)=>{
        event.preventDefault()
        setLoading(true)
        try{
            const document = await firebase.db.doc("products/"+id)
            .set(form)
            setProducto(form)
            console.log("Document",document)
            setLoading(false)
            setAlert({variant:"success",text:"Producto editado correctamente"})
        
        }catch(e){
            console.log("error",e)
            setLoading(false)
            setAlert({variant:"warning",text:"Error!"})
        }
        
    }

       
    useEffect(
        ()=>{
            async function request (){
                try{
                    const document = await firebase.db.doc("products/"+id)
                    .get()
                    setLoading(false)
                    setProducto(document.data())
                    setForm(document.data())
                    console.log("document",document.data(),id)    
                }catch(e){
                    console.log("error",e)
                }
            }
            request();
        },
            
        []
       
    )

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
            <Producto info={producto} detalle={false} modificar={false} eliminar={false} comprar={false}/>
                      
            <form onSubmit={handleSubmit}>
            <FormGroup label="Nombre" type="text" name="producto" placeholder="Nombre del producto" value={form.producto} change={handleChange}></FormGroup>
            <FormGroup label="Descripcion" type="text" name="descripcion" placeholder="Ingrese informacion acerca del producto" value={form.descripcion} change={handleChange}></FormGroup>
            <FormGroup label="Precio" type="number" name="precio" placeholder="Ingrese el precio en pesos argentinos" value={form.precio} change={handleChange}></FormGroup>
            <FormGroup label="Imagen" type="text" name="imagen" placeholder="Imagen" value={form.imagen} change={handleChange}></FormGroup>
             <Buttons type="submit">Guardar</Buttons>
             <Alerts variant={alert.variant} text={alert.text}/>
             </form>
             </div>
        )
    }

}

export default ModificarProducto;


