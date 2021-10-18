import React, {useState,useEffect} from "react";
import firebase from '../Config/firebase';
import Producto from '../Components/Producto';



function Detalle(props) {

    const id=props.match.params.id
    const [loading,setLoading] = useState(true);
    const [producto,setProducto] = useState({});

       
    useEffect(
        ()=>{
            fetch("https://api.mercadolibre.com/items/"+id)
            .then(response=>response.json())
            .then(info=>{
                console.log("info",info)
                setLoading(false)
                setProducto(info)
                console.log("producto",producto)
            })
        },
            
        []
       
    )

    if(loading){
        return(

            <div>
                Loading...
            </div>
        )

    }else{
        return(
            
            <div class="detalle">
               <Producto info={producto} detalle={false} modificar={true} eliminar={true} comprar={true} carrito={false}/>
            </div>
                    
            
        )


    }

}

export default Detalle;