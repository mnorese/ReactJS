import './App.css';
import React from 'react';
import {BrowserRouter,Route} from "react-router-dom";
import Inicio from './Pages/Inicio';
import Registrarse from './Pages/Registrarse';
import Ingresar from './Pages/Ingresar';
import AltaProducto from './Pages/AltaProducto';
import Menu from './Components/Menu';
import Detalle from './Pages/Detalle';
import Productos from './Pages/Productos';
import ModificarProducto from './Pages/ModificarProducto';
import EliminarProducto from './Pages/EliminarProducto';
import {Container} from "react-bootstrap";
import Estados from './Context/Estados';
import Salir from './Components/Salir';
import Carrito from './Pages/Carrito';
import ComprarProducto from './Pages/ComprarProducto';


function App() {

    return (
    <Estados>
    <BrowserRouter>
      <Menu/>
      <Container>
      <Route path="/" exact component={Inicio}/>
      <Route path="/registrarse" exact component={Registrarse}/>
      <Route path="/ingresar" exact component={Ingresar}/>
      <Route path="/altaProducto" exact component={AltaProducto}/>
      <Route path="/producto/:id" exact component={Detalle}/>
      <Route path="/modificar/:id" exact component={ModificarProducto}/>
      <Route path="/eliminar/:id" exact component={EliminarProducto}/>
      <Route path="/comprar/:id" exact component={ComprarProducto}/>
      <Route path="/productos" exact component={Productos}/>
      <Route path="/salir" exact component={Salir}/>
      <Route path="/carrito/:id" exact component={Carrito}/>
      </Container>    
    </BrowserRouter>
    </Estados>
  );
}

export default App;

