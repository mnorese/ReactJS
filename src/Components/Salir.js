import React,{useState,useContext} from 'react'
import EcommerceContext from '../Context/EcommerceContext';
import Alerts from './Alerts';
import firebase from '../Config/firebase';
import {Button} from 'react-bootstrap';

function Salir() {

    const context = useContext(EcommerceContext)
    
    const [loading,setLoading] = useState(false)
    const [alert,setAlert] = useState({variant:"",text:""})

    
    const handleSalir = async (event) =>{
        setLoading(true);
        try{
        const responseUser = await firebase.autenticacion.signOut()
        context.logOut()
        setAlert({variant:"success",text:"Sesion finalizada. Nos vemos pronto!"})
        setLoading(false)
        }catch(e){
        setAlert({variant:"danger",text:"Usuario o contraseña incorrecta"})
        setLoading(false)

        }

    }
        
    return(
        <div>
            <p>Desea cerrar la sesion?</p>
            <Button variant="warning" onClick={handleSalir}>Si</Button>
            <Alerts variant={alert.variant} text={alert.text}/>
        </div>
    )
}

export default Salir;