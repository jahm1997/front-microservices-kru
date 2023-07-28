import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import LoginIcon from '@mui/icons-material/Login';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import { useNavigate } from 'react-router-dom';

const InicioSesion = ({iniciar}) => {

    const router = useNavigate()

    const [parametro, setParametro] = useState({
        email:"",
        password:""
    })
    const [error, setError] = useState({
        error:false,
        menssage: ""
    })

    const validateEmail = (email) =>{
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Z]{2,}$/i;
        return regex.test(parametro.email)
    }


    const hableSubmit = (e) => {
        e.preventDefault();
        if(validateEmail(parametro.email) ){
            setError({
                error:false,
                menssage: ""
            })
        }else{
            return setError({
                error:true,
                menssage: "Email Incorrecto"
            })
        }
        iniciar(parametro)
    }

    const registro = () =>{
        router('/registro');
    }

    return (
        <Grid container alignContent="center" justifyContent="center" sx={{ marginTop: "3%"}}>

            <Grid 
                item
                sx={{
                    height:"auto",
                    alignItems:"center",
                    textAlign:"center",
                    justify:"center"
                    }} >
                <Typography variant='h5' sx={{ marginTop: "5%",marginBottom:"3%" }} >Bienvenido a la app de gestion de contactos!</Typography>
                <Typography variant='h4' sx={{ marginTop: "2%",marginBottom: "5%" }}> Iniciar Sesion</Typography>
                <Typography variant='h5' > Que alegria tenerte de vuelta por acá </Typography>
                <Box width="100%" 
                    component="form" 
                    onSubmit={hableSubmit}
                    >
                    <TextField
                        label="Email"
                        type='email'
                        variant='outlined'
                        fullWidth={true}
                        helperText={error.menssage}
                        error={error.error}
                        value={parametro.email}
                        onChange={(event) => setParametro({...parametro, email: event.target.value})}
                        required
                        sx={{  
                            margin:"2%",
                            maxWidth:350,
                            marginTop:"10%",
                            }}
                    ></TextField>
                    <TextField
                        sx={{ 
                            margin:"2%",
                            maxWidth:350,
                            }}
                        label="Password"
                        type='password'
                        variant='outlined'
                        fullWidth={true}
                        value={parametro.password}
                        onChange={(event) => setParametro({...parametro, password: event.target.value})}
                        required

                    ></TextField>
                    <br />
                    <Button type='submit' variant='contained' sx={{ margin:"2%"}} > Iniciar Sesion&nbsp;&nbsp; <LoginIcon/> </Button>
                </Box>
                <Typography color={'CaptionText'} sx={{padding: 2}} >
                    ¿ Aun no tienes una cuenta ?
                </Typography>
                <Typography color={'CaptionText'} >
                    Conecta con nosotros!
                </Typography>
                <br />
                <Button sx={{padding: 2}} variant='contained' onClick={registro} >Registrarse <CoPresentIcon sx={{marginLeft: 2}} /> </Button>
            </Grid> 
        </Grid>
  )
}

export default InicioSesion