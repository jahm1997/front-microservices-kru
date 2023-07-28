import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'

import axios from 'axios';

const Agregar = ({ handleAbierto, llenado, abierto, globalState}) => {

    const [user,setUser]=useState({
        nombres:"",
        telefono:"",
        apellidos:"",
        tipoContacto:"",
        usuarioId:globalState.id
    })

    const actualizar = async () => {
        try {
        const res = await axios.post("http://localhost:8080/contact",user)
          if (res.status === 200 || res.status === 201) {
            alert("Cliente agregado con exito")
            llenado()
            setUser({
                nombres:"",
                telefono:"",
                apellidos:"",
                tipoContacto:"",
                usuarioId:globalState.id
            })
            handleAbierto()
            } 
        } catch (error) {
            console.log("Error en la petición:", error);
            handleAbierto()
        }
      }


    return (
        <Dialog onClose={handleAbierto} open={abierto} >
            <DialogTitle>Editar cliente</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Información del cliente
                </DialogContentText>
                <Box >
                    <TextField
                        label="Nombres"
                        type='text'
                        variant='standard'
                        fullWidth={true}
                        value={user.nombres}
                        onChange={(event) => setUser({...user, nombres: event.target.value})}
                        required
                        style={{ color: 'white' }}
                        sx={{ 
                            margin:"2%",
                            width:"90%"
                            }}
                    
                    ></TextField>
                    <TextField
                        sx={{ 
                            margin:"2%",
                            width:"90%",
                            }}
                        label="Apellidos"
                        type='text'
                        variant='standard'
                        fullWidth={true}
                        value={user.apellidos}
                        onChange={(event) => setUser({...user, apellidos: event.target.value})}
                        required

                    ></TextField>
                    <TextField
                        sx={{ 
                            margin:"2%",
                            width:"90%",
                            }}
                        label="Telefono"
                        type='tel'
                        variant='standard'
                        fullWidth={true}
                        value={user.telefono}
                        onChange={(event) => setUser({...user, telefono: event.target.value})}
                        required

                    ></TextField>
                    <TextField
                        sx={{ 
                            margin:"2%",
                            width:"90%",
                            }}
                        label="Tipo de Contacto"
                        type='text'
                        variant='standard'
                        fullWidth={true}
                        value={user.tipoContacto}
                        onChange={(event) => setUser({...user, tipoContacto: event.target.value})}
                        required

                    ></TextField>

                    <Button onClick={actualizar} variant="contained" sx={{ marginTop: 2,[`@media (max-width:445px)`]: { fontSize:"small"
                        }}} color="primary" size="large" >   Añadir Cliente ! </Button>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleAbierto}>Cancelar</Button>
            </DialogActions>
        </Dialog>
      );
}

export default Agregar
