import React,{useState,useEffect} from 'react';
import Producto from '../Components/Producto';
import {Spinner} from "react-bootstrap";
import {Container} from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Carousel from 'react-bootstrap/Carousel';
import '../Estilos/Inicio.css'




function Inicio() {
    const [productos,setProductos] = useState([])
    const [loading,setLoading] = useState(true)

    
    

    useEffect (
        ()=>{
            fetch("https://api.mercadolibre.com/sites/MLA/search?q=notebook#json")
            .then(response=>response.json())
            .then(info=>{
                setLoading(false)
                setProductos(info.results)
                console.log(info.results)
            })
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
                <>
                <div class="carousel">
                <Carousel fade >
                    <Carousel.Item>
                        <img class="images" src="../Images/lenovoyhp.jpg" alt=""/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img class="images" src="../Images/collage2.jpg" alt=""/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img class="images" src="../Images/hp_notebooks.jpg" alt=""/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img class="images" src="../Images/collage3.jpg" alt=""/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img class="images" src="../Images/noteFuego.jpg" alt=""/>
                    </Carousel.Item>
                </Carousel>
                </div>

                 <Container class="galeria">
                    <Row xs={4}>{productos.map(prod=><Producto info={prod} comprar={true} detalle={true} modificar={false} eliminar={false} carrito={false}/>)}
                    </Row>
                </Container> 
                </>
            
               
                           
            )
        }
    }
    

    


export default Inicio;