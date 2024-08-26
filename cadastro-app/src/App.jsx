import React from 'react';
import { Switch, FormControlLabel } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Grid from '@mui/joy/Grid';
import getDesign from './Theme';
import Formulario from './Formulario';
import Brightness7Icon from '@mui/icons-material/Brightness7'; 
import Brightness4Icon from '@mui/icons-material/Brightness4'; 
import './App.css';

const App = () => {
  const [mode, setMode] = React.useState('light');

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
          padding: '2rem',
          height: '100vh',

        }}
      >
       <FormControlLabel
          control={
            <Switch
              checked={mode === 'dark'}
              onChange={handleModeChange}
              color="primary"
              icon={<Brightness7Icon className="icon-sun" />} 
              checkedIcon={<Brightness4Icon />} 

              sx={{
                '& .MuiSwitch-thumb': {
                  backgroundColor: mode === 'light' ? '#f0f0f0' : '#333333', 
                },
                '& .MuiSwitch-track': {
                  backgroundColor: mode === 'light' ? '#e0e0e0' : '#333333', // Cor de fundo do switch
                },
              }}
            />
          }
          label={mode === 'light' ? '' : ''}
          sx={{
            color: mode === 'dark' ? '#F2F2F2' : 'inherit', // Cor do texto do label
          }}
        />
        <Formulario />
      </Grid>
    </ThemeProvider>
  );
};

export default App;
