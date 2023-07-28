import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'

import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import axios from 'axios';

const Modal = ({ handleClose, bandera, contacto, llenado}) => {
    const [isLiked, setIsLiked] = useState(contacto.terminado);
    const [user,setUser]=useState({
        comentarios:"",
    })
    const handleLikeButtonClick = () => {
        console.log(user)
        setIsLiked(!isLiked);
        setUser({
            ...user,
            ["terminado"]:!contacto.terminado
        })
    };

    const actualizar = async () => {
        try {
            const res = await axios.patch( `http://localhost:8080/contact/${contacto?.id}` , user);
            if (res.status === 200 || res.status === 201) {
                setUser({
                    comentarios:"",
                })
                alert("actualizado el comentario con éxito")
                llenado()
                handleClose()
                } 
        } catch (error) {
            console.log("Error en la petición:", error);
            handleClose()
        }
      }

    return (
        <Dialog onClose={handleClose} open={bandera} >
            <DialogTitle>Agendar actividad</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Ultimo Comentario
                    <br />
                    {contacto.comentarios}
                </DialogContentText>
                <Container>
                    <TextField
                        sx={{marginTop:2, width:"95%"}}
                        id="standard-textarea"
                        label="Añadir comentario"
                        placeholder="Placeholder"
                        multiline
                        value={user.comentarios}
                        onChange={(event) => setUser({...user, comentarios: event.target.value})}
                        variant="standard"
                        />
                </Container>
            </DialogContent>
            <Fab
                // disabled={isLiked}
                aria-label={isLiked ? 'Completada' : 'Pendiente'}
                variant={isLiked ? 'extended' : 'extended'}
                onClick={handleLikeButtonClick}
                size="small"
                sx={{margin:5}}>
                {isLiked ? <ThumbUpAltIcon /> : <ThumbDownOffAltIcon />}
                {isLiked ? ' Completada ' : '  Pendiente '}
            </Fab>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={actualizar}>Guardar</Button>
            </DialogActions>
        </Dialog>
      );
}

export default Modal
