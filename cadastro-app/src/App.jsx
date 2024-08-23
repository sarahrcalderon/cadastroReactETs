// src/App.jsx

import React from 'react';
import { Switch, FormControlLabel } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Grid from '@mui/joy/Grid';
import getDesign from './Theme';
import Formulario from './Formulario';

const App = () => {
  const [mode, setMode] = React.useState('light');

  // Alterna entre modo claro e escuro
  const handleModeChange = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };
  const theme = getDesign(mode);
  return (
    <ThemeProvider theme={theme}>
      <Grid container
        sx={{
          bgcolor: 'background.default', // Aplica a cor de fundo do tema
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3rem',
        }}
      >
        <FormControlLabel
          control={
            <Switch
              checked={mode === 'dark'}
              onChange={handleModeChange}
              color="primary"
            />
          }
          label={mode === 'light' ? 'Modo Escuro' : 'Modo Claro'}
        />
        <Formulario />
      </Grid>
    </ThemeProvider>
  );
};

export default App;
