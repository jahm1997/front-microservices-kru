import { Box, FormControl, InputAdornment, InputLabel, OutlinedInput, TextareaAutosize } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';

const Input = ({ childrenOne, placeholder, buscar, noBuscar, childrenTwo,filtrarContactos }) => {
  const [valor, setValor] = useState("");
    console.log(valor)

    


  const handleChange = (e) => {
    const inputValor = e.target.value;
    setValor(inputValor);
    filtrarContactos(inputValor);
  };


  return (
    <Box sx={{  bgcolor:"dimgrey"}} >
        <FormControl sx={{ m: 1, width:"90%"}}>
          <InputLabel htmlFor="outlined-adornment-amount">Filtrar</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}
            label="Filtrar"
            placeholder="Filtrar..."
            value={valor}
            onChange={handleChange}
          />
        </FormControl>
    </Box>
  );
};

export default Input;
