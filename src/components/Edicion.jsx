import {Box, Button,  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'

import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import axios from 'axios';

const Edicion = ({ handleApertura, apertura, contacto, llenado}) => {

    const [user,setUser]=useState({
        nombres:contacto?.nombres,
        telefono:contacto?.telefono,
        apellidos:contacto?.apellidos,
        tipoContacto:contacto?.tipoContacto
    })
    const actualizar = async () => {
        try {
            const res = await axios.patch( `http://localhost:8080/contact/${contacto?.id}` , user);
            if (res.status === 200 || res.status === 201) {
                alert("actualizado con exito")
                llenado()
                handleApertura()
                } 
        } catch (error) {
            console.log("Error en la petición:", error);
            handleApertura()
        }
      }


    return (
        <Dialog onClose={handleApertura} open={apertura} >
            <DialogTitle>Editar cliente</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Información del cliente
                    {/* {contacto.comentario} */}
                </DialogContentText>
                <Box >
                    <Box>
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
                            }}} color="primary" size="large" >   Actualizar Datos ! </Button>
                        
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleApertura}>Cancelar</Button>
            </DialogActions>
        </Dialog>
      );
}

export default Edicion
