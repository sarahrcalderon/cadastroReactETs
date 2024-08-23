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
            default: '#ffffff', // Fundo branco no modo claro
            paper: '#ffffff', // Fundo do papel branco no modo claro
          },
        }
      : {
          // Valores da paleta para o modo escuro
          primary: grey,
          divider: grey[600],
          background: {
            default: grey[900], // Fundo escuro no modo escuro
            paper: grey[800],  // Fundo do papel escuro no modo escuro
          },
          text: {
            primary: '#e0e0e0', // Texto primário claro no modo escuro
            secondary: grey[700], // Texto secundário claro no modo escuro
          },
        }),
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            backgroundColor: mode === 'dark' ? grey[200] : '#ffffff', // Cor de fundo do input
            color: mode === 'dark' ? '#121212' : grey[800], // Cor do texto do input
          },
          '& .MuiInputLabel-root': {
            color: mode === 'dark' ? grey[900] : grey[900], // borda input
          },
          '& .MuiInput-underline:before': {
            borderBottomColor: mode === 'dark' ? grey[600] : grey[500], // Cor da borda inferior do input
          },
          '& .MuiInput-underline:hover:before': {
            borderBottomColor: mode === 'dark' ? grey[700] : grey[500], // Cor da borda inferior ao passar o mouse
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: mode === 'dark' ? '#000000' : '#000000', // Cor de fundo do botão
          color: '#ffffff', // Cor do texto do botão
          '&:hover': {
            backgroundColor: mode === 'dark' ? '#333333' : '#333333', // Cor do botão ao passar o mouse
          },
        },
      },
    },
  },
});

export default getDesign;
