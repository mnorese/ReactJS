import React,{useState,useEffect} from 'react';
import firebase from '../Config/firebase';
import Producto from '../Components/Producto';
import {Spinner} from "react-bootstrap"


function Productos() {
    const [productos,setProductos] = useState([])
    const [loading,setLoading] = useState(false)

    const getProductos = async ()=>{
        try{
            setLoading(true)
            const querySnapshot = await firebase.db.collection("productos")
            .get()
            setProductos(querySnapshot.docs)
            setLoading(false)
              
                       
        }catch(e){
        console.log("error",e)
        }
    }

    useEffect(
        ()=>{
             getProductos()
        },
        []
    )

    if (loading){
        return(
            <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
        }else{
            return(
                <div>
                    <h1>Productos</h1>
                    {productos.map(prod=><Producto info={ {...prod.data(),id:prod.id}} comprar={true} detalle={true} modificar={false} eliminar={false} />)}
                </div>     
            )
        }
    }
export default Productos;