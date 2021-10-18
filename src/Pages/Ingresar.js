import React,{useState,useContext} from 'react';
import firebase from '../Config/firebase';
import FormGroup from '../Components/Forms/FormGroup';
import Alerts from '../Components/Alerts';
import {Button,Spinner} from 'react-bootstrap';
import EcommerceContext from '../Context/EcommerceContext';

function Ingresar() {

    const context = useContext(EcommerceContext)

    const [form,setForm] = useState ({email:'',contraseña:''})
    const [alert,setAlert] = useState({variant:"",text:""})
    const [loading,setLoading] = useState(false)

    const handleIngresar = async (event)=>{
    event.preventDefault()
    console.log("handleSubmit",form)
    setLoading(true)

    try{
        const responseUser = await firebase.autenticacion.signInWithEmailAndPassword(form.email,form.contraseña)
        console.log(responseUser)
        setAlert({variant:"success",text:"Hola! "})
        setLoading(false)

        const userName = await firebase.db.collection("users")
        .where("userId","==",responseUser.user.uid)
        .get()
        console.log("usuario Id",userName.docs[0].data()) 
        context.logIn(userName.docs[0].data())
    }catch(e){
        console.log("Error",e)
        setAlert({variant:"danger",text:"Usuario o contraseña incorrecta"})
        setLoading(false)

        }
    }

    const handleChange = (event)=>{
        const name = event.target.name
        const value = event.target.value
        console.log("handleChange",name,value)
        setForm({...form,[name]:value})
    }

    if (loading){
        return(
            <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
            </Spinner>
        )

        } else {
            return(
        <form onSubmit={handleIngresar}>
            <div>
                <FormGroup label="Usuario" type="email" name="email" placeholder="Ingrese su Email" value={form.email} change={handleChange}></FormGroup>
                <FormGroup label="Contraseña" type="password" name="contraseña" placeholder="Ingrese su Contraseña" value={form.contraseña} change={handleChange}></FormGroup>    
            </div>    
            <Button type="submit" variant="warning">Ingresar</Button>
            <Alerts variant={alert.variant} text={alert.text}/>
            
        </form>
        
    )
}
}

export default Ingresar;