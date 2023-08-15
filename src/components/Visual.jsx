import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  Collapse,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import Card from "./card";
import Agregar from "./Agregar";
import Input from "./input";
import axios from "axios";

const Visual = ({
  contactos,
  filtrarContactos,
  globalState,
  llenado,
  setTasks,
  tasks,
  verTareas,
}) => {
  const [abierto, setAbierto] = React.useState(false);
  const [newTask, setNewTask] = React.useState("");
  const [editIndex, setEditIndex] = React.useState(null);
  const [editTask, setEditTask] = React.useState("");

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAbierto = () => {
    setAbierto(!abierto);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const actualizar = async (user) => {
    try {
      const res = await axios.patch(
        "http://localhost:8082/tareas/" + user.id,
        user
      );
      if (res.status === 200 || res.status === 201) {
        verTareas();
      }
    } catch (error) {
      console.log("Error en la petición:", error);
      // handleAbierto()
    }
  };

  const incrustar = async (user) => {
    try {
      const res = await axios.post("http://localhost:8082/tareas", user);
      if (res.status === 200 || res.status === 201) {
        alert("Tarea agregada con exito");
        verTareas();
        setNewTask("");
        // handleAbierto()
      }
    } catch (error) {
      console.log("Error en la petición:", error);
      // handleAbierto()
    }
  };

  const handleAddTask = () => {
    if (editIndex !== null && editTask.trim() !== "") {
      actualizar({ ...tasks[editIndex], title: editTask });
      alert("Tarea Actualizada con exito");
      setEditTask("");
      setEditIndex(null);
    } else if (newTask.trim() !== "") {
      incrustar({
        title: newTask,
        completed: false,
        usuarioId: globalState.id,
      });
    }
  };

  const handleForTaks = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddTask();
    }
  };

  const handleToggleTask = (index) => {
    actualizar({ ...tasks[index], completed: !tasks[index].completed });
  };

  const handleEditTask = (index) => {
    console.log(index);
    const selectedTask = tasks[index];
    setEditIndex(index);
    setEditTask(selectedTask.title);
  };

  useEffect(() => {
    llenado();
    verTareas();
  }, []);

  return (
    <>
      <Grid
        container
        minHeight="500"
        alignContent="center"
        justifyContent="center"
        sx={{ marginTop: "10%" }}
      >
        <Grid
          item
          sm={6}
          xs={12}
          md={6}
          lg={6}
          xl={6}
          sx={{
            height: "auto",
            alignItems: "center",
            textAlign: "center",
            justify: "center",
          }}
        >
          <Typography
            variant="h4"
            marginTop="2%"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            Lista de Tareas
          </Typography>
          <br />
          <TextField
            fullWidth
            variant="outlined"
            value={newTask}
            onChange={handleInputChange}
            sx={{ width: "80%" }}
            label="Escriba su tarea aquí"
            onKeyDown={handleForTaks}
            InputProps={{ style: { fontFamily: "Arial, sans-serif" } }}
          />

          <br />
          <br />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ width: "80%" }}
            onClick={handleAddTask}
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            Agregar Tarea
          </Button>
          <br />
          <List>
            {tasks.map((task, index) => (
              <Box
                key={index}
                sx={{
                  width: "85%",
                  marginLeft: "6%",
                  padding: 0,
                }}
              >
                <ListItem
                  key={index}
                  button
                  onClick={() =>
                    editIndex !== null
                      ? handleEditTask(index)
                      : handleToggleTask(index)
                  }
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                    width: "90%",
                    margin: 0,
                  }}
                >
                  <Checkbox
                    checked={task.completed}
                    color="primary"
                    inputProps={{ "aria-label": "checkbox" }}
                  />

                  {editIndex === index ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={editTask}
                      onChange={(event) => setEditTask(event.target.value)}
                      InputProps={{
                        style: { fontFamily: "Arial, sans-serif" },
                      }}
                    />
                  ) : (
                    <ListItemText
                      primary={task.title}
                      style={{
                        fontFamily: "Arial, sans-serif",
                        // marginRight: "100px",
                      }}
                    />
                  )}
                  <ListItemSecondaryAction>
                    {editIndex === index ? (
                      <IconButton edge="start" onClick={handleAddTask}>
                        <SaveAsIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        edge="start"
                        onClick={() => handleEditTask(index)}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                    <IconButton
                      edge="end"
                      onClick={() => handleDeleteTask(index)}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Box>
            ))}
          </List>
        </Grid>

        <Grid
          item
          sm={6}
          xs={12}
          md={6}
          lg={6}
          xl={6}
          sx={{
            height: "auto",
            alignItems: "center",
            textAlign: "center",
            justify: "center",
          }}
        >
          <Table aria-label="collapsible table">
            <TableHead>
              <Container display="flex">
                <Typography variant="h4">Información de Clientes</Typography>
                <Agregar
                  llenado={llenado}
                  handleAbierto={handleAbierto}
                  abierto={abierto}
                  globalState={globalState}
                ></Agregar>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ width: "80%", margin: 2 }}
                  onClick={handleAbierto}
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  Añadir Clientes&nbsp;&nbsp; <PersonAddIcon />
                </Button>
              </Container>
            </TableHead>

            <TableBody>
              <Input
                filtrarContactos={filtrarContactos}
                label={"Filtrar"}
                placeholder={"Buscar clientes..."}
              ></Input>

              {contactos.length ? (
                contactos.map((contacto) => (
                  <Card
                    key={contacto.id}
                    contacto={contacto}
                    llenado={llenado}
                  />
                ))
              ) : (
                <h1>
                  {" "}
                  Lo Sentimos, No hay clientes por mostrar. Por favor, crea
                  nuevos contactos.{" "}
                </h1>
              )}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </>
  );
};

export default Visual;
