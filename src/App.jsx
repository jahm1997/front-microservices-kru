
import './App.css'
import { Box, Container } from '@mui/material';
import InicioSesion from './components/InicioSesion';
import Visual from './components/Visual';
import axios from 'axios';
import { useAppState } from './components/AppStateContext';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Registro from './components/Registro';

function App() {
  
  const { globalState, setGlobalState, contactos, setContactos } = useAppState();



  const iniciar = async (parametro) => {
    try {
      const response = await axios.post("http://localhost:8081/usuario/iniciar",parametro)
      if(Object.keys(response.data).length !== 0){
        console.log("Este es EL USUARIO",response.data)
        
        setGlobalState(response.data)
      }
    } catch (error) {
      console.log("ha ocurrido un error al momento de iniciar sesion")
    }
  };

  const llenado = async () => {
    try {
      const listado = await axios.get("http://localhost:8081/usuario/relacion/"+ globalState.id)
      setContactos(listado.data)
    } catch (error) {
      console.log("ha ocurrido un error al momento de iniciar sesion")
    }
  };

  const filtrarContactos = (valor) => {
    if (valor.trim() === "") {
        llenado()
    } else {
        let filter = contactos.filter(
            (element) =>
              element["nombres"]?.toLowerCase().includes(valor) ||
              element["apellidos"]?.toLowerCase().includes(valor)
          );;
        setContactos(filter)
    }
};

  

  const salir = async (data) => {
    setGlobalState({});
    console.log("Sales de sesion")
  }
  

  if(Object.keys(globalState).length === 0){
    return(
      <Box justifyContent="center" >
        <InicioSesion iniciar={iniciar} salir={salir} ></InicioSesion>
      </Box>
    )
    }else{
      return (
        
      <Container sx={{justifyContent:"center"}}  >
        <Visual filtrarContactos={filtrarContactos} globalState={globalState} llenado={llenado} contactos={contactos} salir={salir} ></Visual>
      </Container>
    )
  }
  
}


export default App
