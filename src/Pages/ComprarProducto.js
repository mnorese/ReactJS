import React,{useState,useEffect,useContext} from "react";
import Producto from "../Components/Producto";
import Alerts from '../Components/Alerts';
import {Button,Spinner} from "react-bootstrap";
import EcommerceContext from "../Context/EcommerceContext";
import Carrito from "../Pages/Carrito";



function ComprarProducto(props) {
    
    const context = useContext(EcommerceContext)
    
    const id=props.match.params.id;
    const [loading,setLoading] = useState(true);
    const [producto,setProducto] = useState({});
    const [alert,setAlert] = useState({variant:"",text:""})
    
        
    function handleComprar () {
        setLoading(true)
        try{
            console.log("producto",producto)
            context.comprar(producto)
            setLoading(false)
            setAlert({variant:"success",text:"Producto agregado al carrito"})
        
        }catch(e){
            console.log("error",e)
            setLoading(false)
            setAlert({variant:"warning",text:"Error!"})
        }
        
    }

       
    useEffect(
        ()=>{
            fetch("https://api.mercadolibre.com/items/"+id)
            .then(response=>response.json())
            .then(info=>{
                console.log("info",info)
                setLoading(false)
                setProducto(info)
                handleComprar()
                
            })
        },
        []
       
    )

        
    if(loading){
        return(
            <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
            </Spinner>
        )

    }else{
        return(
            <div>
            <Producto info={producto} detalle={false} modificar={false} eliminar={false} comprar={false} carrito={false}/>
            <Alerts variant={alert.variant} text={alert.text}/>
            </div>
            
        )
    }

}

export default ComprarProducto;


