import MoodIcon from '@mui/icons-material/Mood';
import InfoIcon from '@mui/icons-material/Info';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';


const Registro = (inicio) => {

    const history = useNavigate();
  
    const [user, setUser] = useState({
        nombres:"",
        apellidos:"",
        telefono:"",
        email:"",
        password:""
    })
    const [error, setError] = useState({
        error:false,
        menssage: ""
    })

    const validateEmail = (email) =>{
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Z]{2,}$/i;
        return regex.test(user.email)
    }

    const registro = async (data) => {
        try {
          const res = await axios.post(`http://localhost:8081/usuario` , data);
          if (res.status === 200 || res.status === 201) {
            console.log(res)
            history('/agradecimiento');
          } else {
          }
        } catch (error) {
            console.log("Error en la petición:", error);
            alert("Hubo un error en el registro")
        }
      }


    const hableSubmit = (e) => {
        e.preventDefault();
        if(validateEmail(user.email) ){
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
        registro(user)
    }

    const atras = () => {
        history('/');
    }

    return (

        <Container sx={{alignItems:"center", marginTop:"3%"}}>
        <Grid container spacing={2} textAlign="center" sx={{ height:"100%"}}  >
       
            <Grid 
                item
                xs={12}
                sm={12}
                sx={{
                    // backgroundColor: "red",
                    width:{
                        xs: '100%',
                        sm: 'auto' 
                    },
                    alignItems:"center",
                    textAlign:"center",
                    justify:"center"
                    }} >
                <h1>¡ Registrate !</h1>
                <Typography>
                    Estás tomando la mejor opcion al registrarte en nuestra plataforma!
                    
                </Typography>
                <Typography>
                    Rellena nuestra información y haz parte de nuestro equipo

                </Typography>
                <Box >
                    <TextField
                        label="Nombre"
                        type='text'
                        variant='outlined'
                        fullWidth={true}
                        helperText={error.menssage}
                        error={error.error}
                        value={user.nombres}
                        onChange={(event) => setUser({...user, nombres: event.target.value})}
                        required
                        sx={{ 
                            margin:"2%",
                            width:"70%",
                            }}
                        
                    ></TextField>
                    <TextField
                        sx={{ 
                            margin:"2%",
                            width:"70%",
                            }}
                        label="Apellidos"
                        type='text'
                        variant='outlined'
                        fullWidth={true}
                        // helperText={error.menssage}
                        // error={error.error}
                        value={user.apellidos}
                        onChange={(event) => setUser({...user, apellidos: event.target.value})}
                        required

                    ></TextField>
                    <TextField
                        sx={{ 
                            margin:"2%",
                            width:"70%",
                            }}
                        label="Telefono"
                        type='tel'
                        variant='outlined'
                        fullWidth={true}
                        value={user.telefono}
                        onChange={(event) => setUser({...user, telefono: event.target.value})}
                        required
                    ></TextField>
                    <TextField
                        sx={{ 
                            margin:"2%",
                            width:"70%",
                            }}
                        label="Email"
                        type='email'
                        variant='outlined'
                        fullWidth={true}
                        // helperText={error.menssage}
                        // error={error.error}
                        value={user.email}
                        onChange={(event) => setUser({...user, email: event.target.value})}
                        required
                    ></TextField>
                    <TextField
                        sx={{ 
                            margin:"2%",
                            width:"70%",
                            }}
                        label="Password"
                        type='password'
                        variant='outlined'
                        fullWidth={true}
                        // helperText={error.menssage}
                        // error={error.error}
                        value={user.password}
                        onChange={(event) => setUser({...user, password: event.target.value})}
                        required

                    ></TextField>
                </Box>
                    <Button onClick={hableSubmit} variant="contained" sx={{ marginTop: 2}} color="primary" size="large" > <MoodIcon/>  Registrame ! </Button>
                    <Button onClick={atras} variant="contained" sx={{ marginTop: 2, marginLeft: "3%"}} color="primary" size="large" > <ChevronLeftIcon /> <ChevronLeftIcon sx={{margin:-2}} /> <ChevronLeftIcon/> Atras </Button>
                
            </Grid>
        </Grid>
    </Container>
  )
}

export default Registro


