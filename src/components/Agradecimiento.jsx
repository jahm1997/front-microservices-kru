import { Alert, Button, Container } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate  } from 'react-router-dom';

const Agradecimiento = () => {

    const history = useNavigate ();

    useEffect(() => {
        const timer = setTimeout(() => {
          history('/');
        }, 3000);
        return () => clearTimeout(timer);
    },[])
  return (
    <Container sx={{
        textAlign: 'center',
        justifyContent: 'center',
        alignItems:"center",
        width: "100%",
        height: "100%",
        backgroundColor:"#FFFFFF",
        marginTop: "20%"
    }} >
        <Alert>
        ¡Haz Creado una cuenta con nosotros! que maravillosa elección, por favor inicia sesión y usa de inmediato la app.
        </Alert>
    </Container>
  )
}

export default Agradecimiento