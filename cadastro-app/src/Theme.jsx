import { createTheme } from '@mui/material/styles';
import { grey, orange } from '@mui/material/colors';

const getDesign = (mode) => createTheme({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Valores da paleta para o modo claro
          primary: orange,
          divider: orange[800],
          text: {
            primary: grey[800],
            secondary: grey[700],
          },
          background: {
            default: '#ffffff', 
            paper: '#ffffff', 
          },
        }
      : {
          // Valores da paleta para o modo escuro
          primary: grey,
          divider: grey[600],
          background: {
            default: grey[900], 
            paper: grey[800],  
          },
          text: {
            primary: '#e0e0e0', 
            secondary: grey[400], 
          },
        }),
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            backgroundColor: mode === 'dark' ? grey[800] : '#ffffff', //fundo input
            color: mode === 'dark' ? '#e0e0e0' : grey[800], // Cor do texto do input
          },
          '& .MuiInputLabel-root': {
            color: mode === 'dark' ? grey[400] : grey[800], 
          },
          '& .MuiInput-underline:before': {
            borderBottomColor: mode === 'dark' ? grey[600] : grey[500], // Cor da borda inferior do input
          },
          '& .MuiInput-underline:hover:before': {
            borderBottomColor: mode === 'dark' ? grey[700] : grey[600], 
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: mode === 'dark' ? '#121212' : '##121212', 
          color: '#ffffff', 
          '&:hover': {
            backgroundColor: mode === 'dark' ? '#333333' : '#e65c00', 
          },
        },
      },
    },
  },
});

export default getDesign;
