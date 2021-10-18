import React,{useState} from 'react';
import EcommerceContext from './EcommerceContext';

function Estados ({children}) {
    const [userLogin,setUserLogin] = useState(localStorage.getItem("login"))
    const [count,setCount] = useState(0)
    const [carrito,setCarrito] = useState([{}])
    const [userName,setUserName] = useState(JSON.parse(localStorage.getItem("user")))

    const logIn = (user)=>{
        setUserLogin(true);
        localStorage.setItem("login",true);
        setUserName(user);
        localStorage.setItem("user",JSON.stringify(user));
    }

    const logOut = ()=>{
        setUserLogin(false);
        setUserName()
        localStorage.removeItem("login");
        localStorage.removeItem("user");
        
    }
    
    const comprar = (producto)=>{
        setCarrito(carrito.unshift(producto))
        setCount(count+1);
        console.log("carrito",carrito)

    }

        
    return(
        <EcommerceContext.Provider
            value={{
                userLogin,
                logIn,
                logOut,
                comprar,
                count,
                userName
                                                      
            }}
        >
        {children}
        </EcommerceContext.Provider>
    )

}

export default Estados;