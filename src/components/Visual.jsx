import { Button, Container, Grid,  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import Card from './card';
import Agregar from './Agregar';
import Input from './input';

const Visual = ({salir,contactos,filtrarContactos,globalState,llenado}) => {

  const [abierto, setAbierto] = React.useState(false);

  const handleAbierto = () => {
    setAbierto(!abierto);
  };
  
  useEffect(() => {
    llenado()
},[])
  

  return (

    <Grid container minHeight="500" alignContent="center" justifyContent="center" sx={{ marginTop:"5%"}}>
      <Grid 
        item
        sx={{
            height:"auto",
            alignItems:"center",
            textAlign:"center",
            justify:"center"
            }} >
          <TableContainer  sx={{maxWidth:550, minWidth:"auto"}}  >
            <Table aria-label="collapsible table">
              <TableHead  >
                <TableRow  display="flex" >
                  {/*<TableCell  >Información de Clientes</TableCell>
                  <TableCell sx={{maxWidth:100}} >Protein&nbsp;(g)</TableCell> */}
                  <Container sx={{bgcolor:"green"}} display="flex" >
                    <TableCell ><Typography variant='h5' >Información de Clientes</Typography></TableCell>

                    <TableCell  ><Button onClick={handleAbierto} variant="contained" ><PersonAddIcon/></Button></TableCell>
                      <Agregar llenado={llenado} handleAbierto={handleAbierto} abierto={abierto} globalState={globalState} ></Agregar>
                    <TableCell  ><Button onClick={salir} variant="contained" >Cerrar Sesion</Button></TableCell>
                  </Container>
                </TableRow>
              </TableHead>
              <TableBody sx={{bgcolor:"darkgray"}} >
                <Input filtrarContactos={filtrarContactos} ></Input>
                {contactos.length ? contactos.map((contacto) => (
                  <Card key={contacto.id} contacto={contacto} llenado={llenado} />
                )):<h1> Lo Sentimos, No se encontraron Clientes </h1>}
              </TableBody>
            </Table>
          </TableContainer>
        <Container sx={{alignItems:"center", marginTop:"2%"}} >
            
        </Container>
      </Grid>
    </Grid>
  )
}

export default Visual