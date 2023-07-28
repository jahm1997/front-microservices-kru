import { Avatar, Box, Button, Chip, Collapse, Container, Fab, Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React, { useState } from 'react'
import KeyboardControlKeyIcon from '@mui/icons-material/KeyboardControlKey';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SettingsIcon from '@mui/icons-material/Settings';
import Modal from './Modal';
import Edicion from './Edicion';

const Card = ({contacto, llenado}) => {


  const [open, setOpen] = React.useState(false);
  const [bandera, setBandera] = React.useState(false);
  const [apertura, setApertura] = React.useState(false);

  const handleClose = () => {
    setBandera(false);
  };

  const handleApertura = () => {
    setApertura(!apertura);
  };




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
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardControlKeyIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          </TableCell>
            <TableCell component="th" scope="row">
              {contacto.nombres}
            </TableCell>
            <TableCell align="right">{contacto.telefono}</TableCell>
            <TableCell align="right">
              <Button justify="center" size='small' variant="outlined" onClick={() => setBandera(!bandera)}>
                Comentarios
              </Button>
              <Modal
                llenado={llenado}
                contacto={contacto}
                bandera={bandera}
                handleClose={handleClose}
              />
                {/* <Chip color="success" size="small" avatar={<Avatar>C</Avatar>} /> */}
            </TableCell>
            {/* <TableCell align="right">{contactos.protein}</TableCell> */}
            
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse  in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  <Typography variant="h5">
                    Información detallada
                    <Button onClick={handleApertura} sx={{marginLeft:3}} variant='extended' ><SettingsIcon/>&nbsp;  Editar</Button>
                  </Typography>
                  <Edicion llenado={llenado} contacto={contacto} apertura={apertura} handleApertura={handleApertura} ></Edicion>
                  <Typography  >Nombre completo: {`${contacto.nombres} ${contacto.apellidos}  `}</Typography>
                  <Typography  >Telefono: {contacto.telefono}</Typography>
                  <Typography  >Tipo de Contacto:  {contacto.tipoContacto}</Typography>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
      </Grid>
    </Grid>
    
  )
}

export default Card