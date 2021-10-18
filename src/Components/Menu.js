import React from 'react';
import {Link} from "react-router-dom";
import {Container,Navbar,Nav,NavDropdown} from "react-bootstrap";
import EcommerceContext from "../Context/EcommerceContext";
import {Button} from 'react-bootstrap';
import '../Estilos//Menu.css';


function Menu() {
      
      return(
        <>
          <div class="banner">
            <img class="image" src="./Images/fuego.jpg" alt=""/>
            <img class="image" src="./Images/fuego.jpg" alt=""/>
            OFERTAS IMPERDIBLES
            <img class="image" src="./Images/fuego.jpg" alt=""/>
            <img class="image" src="./Images/fuego.jpg" alt=""/>
            ENVIOS GRATIS  
            <img class="image" src="./Images/fuego.jpg" alt=""/>
            <img class="image" src="./Images/fuego.jpg" alt=""/>  
            
          </div>
          <div class="barra">
        <EcommerceContext.Consumer>
          { context => 
          
        <Navbar  bg="light" expand="lg">
        <Container class="container">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Inicio</Nav.Link>
              
              <Nav.Link as={Link} to="/registrarse">Registrarse</Nav.Link>
              <Nav.Link as={Link} to="/ingresar">Ingresar</Nav.Link>
              <NavDropdown title="Categorias" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/marcas">Marcas</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/memoria">Memoria</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/pantalla">Pantalla</NavDropdown.Item>
              </NavDropdown>
                    
            {
                context.userLogin && context.userName &&
                <>
                <Nav.Link as={Link} to="/altaProducto">Alta Producto</Nav.Link>
                <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
                <Nav.Link as={Link} to="/salir">Cerrar Sesion</Nav.Link>
                
                <div class="saludo">    Hola {context.userName.nombre}!</div>
                </>
                
          }
          </Nav>
          </Navbar.Collapse>
          <img src="../Images/carrito.png" width="30px" />           
          <Button variant="light"><Link to={"/carrito"}>{context.count}</Link></Button>
                  
        </Container>
        </Navbar>
        
        
      }
      
      </EcommerceContext.Consumer>
      </div>
      </>
    
    )
    
}

export default Menu;