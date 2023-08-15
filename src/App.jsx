import "./App.css";
import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import InicioSesion from "./components/InicioSesion";
import Visual from "./components/Visual";
import axios from "axios";
import { useAppState } from "./components/AppStateContext";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Registro from "./components/Registro";
import { useState } from "react";

function App() {
  const {
    globalState,
    setGlobalState,
    contactos,
    setContactos,
    tareas,
    setTareas,
  } = useAppState();

  const iniciar = async (parametro) => {
    try {
      const response = await axios.post(
        "http://localhost:8081/usuario/iniciar",
        parametro
      );
      if (Object.keys(response.data).length !== 0) {
        console.log("Este es EL USUARIO", response.data);

        setGlobalState(response.data);
      }
    } catch (error) {
      console.log("ha ocurrido un error al momento de iniciar sesion");
    }
  };

  const llenado = async () => {
    try {
      const listado = await axios.get(
        "http://localhost:8081/usuario/relacion/" + globalState.id
      );
      console.log("Estos son los contactos", listado.data);
      setContactos(listado.data);
    } catch (error) {
      console.log(
        "ha ocurrido un error al momento de llenar la lista de contactos"
      );
    }
  };

  const verTareas = async () => {
    try {
      const lista = await axios.get(
        "http://localhost:8081/usuario/pendientes/" + globalState.id
      );
      console.log("Este es la lista", lista.data);
      setTareas(lista.data);
    } catch (error) {
      console.log(
        "ha ocurrido un error al momento de llenar la lista de tareas"
      );
    }
  };

  const filtrarContactos = (valor) => {
    if (valor.trim() === "") {
      llenado();
    } else {
      let filter = contactos.filter(
        (element) =>
          element["nombres"]?.toLowerCase().includes(valor) ||
          element["apellidos"]?.toLowerCase().includes(valor)
      );
      setContactos(filter);
    }
  };

  const salir = async (data) => {
    setGlobalState({});
    console.log("Sales de sesion");
  };

  if (Object.keys(globalState).length === 0) {
    return (
      <Box justifyContent="center">
        <InicioSesion iniciar={iniciar} salir={salir}></InicioSesion>
      </Box>
    );
  } else {
    return (
      <Box sx={{ justifyContent: "center", minHeight: "100vh" }}>
        <AppBar>
          <Button onClick={salir} variant="contained">
            Cerrar Sesion
          </Button>
        </AppBar>
        <Visual
          verTareas={verTareas}
          tasks={tareas}
          setTasks={setTareas}
          filtrarContactos={filtrarContactos}
          globalState={globalState}
          llenado={llenado}
          contactos={contactos}
          salir={salir}
        ></Visual>
      </Box>
    );
  }
}

export default App;
