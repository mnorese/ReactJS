import React,{useState} from 'react';
import firebase from 'firebase';
import FormGroup from '../Components/Forms/FormGroup';
import Buttons from '../Components/Buttons';
import Alerts from '../Components/Alerts';
import {Spinner} from 'react-bootstrap';

function Registrarse() {
    const [form,setForm] = useState ({nombre:'',apellido:'',email:'',contraseña:''})
    const [loading,setLoading] = useState(false)
    const [alert,setAlert] = useState({variant:"",text:""})

    const handleSubmit = async (event)=>{
        event.preventDefault()
        console.log("Form",form)
        setLoading(true) 
        try{
            const responseUser = await firebase.autenticacion.createUserWithEmailAndPassword(form.email,form.contraseña)
            const registro = await firebase.db.collection("users")
                .add({
                    nombre:form.nombre,
                    apellido:form.apellido,
                    contraseña:form.contraseña,
                    userId:responseUser.user.uid
                    
            })
            console.log("Registro",registro)
            setLoading(false)
            setAlert({variant:"success",text:"Registro enviado"})
        }catch(e){
            console.log("Error",e)
            if(e.code==="auth/email-already-in-use"){
                setAlert({variant:"warning",text:"La direccion de email se encuentra registrada"})
            }
            if(e.code==="auth/weak-password"){
                setAlert({variant:"warning",text:"La contraseña debe tener al menos 6 caracteres"})
            }
            setLoading(false)
            
        }
        
        
    }

    const handleChange = (event)=>{
        const name = event.target.name
        const value = event.target.value
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
                <div>
                <h3>Completa tus datos</h3>
                <form onSubmit={handleSubmit}>
                    <FormGroup label="Nombre" type="text" name="nombre" placeholder="Nombre" value={form.nombre} change={handleChange}></FormGroup>
                    <FormGroup label="Apellido" type="text" name="apellido" placeholder="Apellido" value={form.apellido} change={handleChange}></FormGroup>
                    <FormGroup label="Email" type="email" name="email" placeholder="Email" value={form.email} change={handleChange}></FormGroup>
                    <FormGroup label="Contraseña" type="password" name="contraseña" placeholder="Contraseña" value={form.contraseña} change={handleChange}></FormGroup>   
                    <Buttons type="submit">Enviar</Buttons>
                    <Alerts variant={alert.variant} text={alert.text}/>
                </form>
                </div>
        
    )

}
}

export default Registrarse;