import React from 'react';
import {Alert} from 'react-bootstrap';

const styles={
    alert:{
        margintTop:"10px"
    }
}

function Alerts (props) {
    const {variant,text} = props
        return (
            <Alert variant={variant} style={styles.alert}>{text}</Alert>        
        )
}

export default Alerts;