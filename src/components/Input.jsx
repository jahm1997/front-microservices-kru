import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextareaAutosize,
} from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const Input = ({
  label,
  placeholder,
  buscar,
  noBuscar,
  childrenTwo,
  filtrarContactos,
}) => {
  const [valor, setValor] = useState("");

  const handleChange = (e) => {
    const inputValor = e.target.value;
    setValor(inputValor);
    filtrarContactos(inputValor);
  };

  return (
    <Box
      sx={{
        //  bgcolor: "dimgrey"
        marginLeft: "2%",
      }}
    >
      <FormControl sx={{ m: 1, width: "90%" }}>
        <InputLabel htmlFor="outlined-adornment-amount">Filtrar</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          label={label}
          placeholder={placeholder}
          value={valor}
          onChange={handleChange}
        />
      </FormControl>
    </Box>
  );
};

export default Input;
