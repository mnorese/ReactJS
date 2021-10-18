import React from 'react';
import {Link} from "react-router-dom";
import Card from 'react-bootstrap/Card';
import {Button} from 'react-bootstrap';
import EcommerceContext from "../Context/EcommerceContext";
import Carrito from '../Pages/Carrito';
import '../Estilos/Producto.css';
import ComprarProducto from '../Pages/ComprarProducto';

function Producto(props) {

    const {info} = props
    const {title,price,id,thumbnail} = info

    const detalle = (props.detalle===true?true:false);
    const modificar = (props.modificar===true?true:false);
    const eliminar = (props.eliminar===true?true:false);
    const comprar = (props.comprar===true?true:false);
    const carrito = (props.carrito===true?true:false);

    function compra() {
        console.log("comprado!")
    }

    return(
        <EcommerceContext.Consumer>
        {  context =>

            <Card class="card">
            <Card.Img class="img" src={thumbnail}/>
            <Card.Body>
            <Card.Title class="title">{title}</Card.Title>
            <Card.Text class="price">$ {price}</Card.Text>
            
            {
                detalle && 
                <Button variant="warning"><Link to={"/producto/"+id}>Detalle</Link></Button>
            }
            
            {
                modificar && context.userLogin &&
                <Button variant="warning"><Link to={"/modificar/"+id}>Editar</Link></Button>
            }

            {
                eliminar && context.userLogin &&
                <Button variant="warning"><Link to={"/eliminar/"+id}>Eliminar</Link></Button>
            }

            {
                comprar &&
                <Button variant="warning"><Link to={"/comprar/"+id}>Comprar</Link></Button>
                             
            }

            {
                carrito &&
                <Button variant="warning"><Link to={"/carrito/"+id}>Ver Carrito</Link></Button>
            }

            </Card.Body>
            </Card>
        
        }
        </EcommerceContext.Consumer>

    )

}

export default Producto;
