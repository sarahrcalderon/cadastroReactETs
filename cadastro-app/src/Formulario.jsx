import React, { useState } from 'react';
import { Button, TextField, FormControl, FormLabel, FormHelperText, Typography, Paper, InputAdornment } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useTheme } from '@mui/material/styles';

const emailsIndisponiveis = ["teste@exemplo.com", "joao@exemplo.com", "maria@acme.net"];

const inputDadosCadastro = {
    nome: '',
    email: '',
    senha: '',
    confirmacaoSenha: '',
};

const Formulario = () => {
    const [form, setForm] = useState(inputDadosCadastro);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    const theme = useTheme();
    const mode = theme.palette.mode;

    const validate = () => {
        const errosDeValidacao = {};

        if (!form.nome) errosDeValidacao.nome = 'Nome é obrigatório';
        if (!form.email) {
            errosDeValidacao.email = 'E-mail é obrigatório';
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            errosDeValidacao.email = 'E-mail inválido';
        } else if (emailsIndisponiveis.includes(form.email)) {
            errosDeValidacao.email = 'E-mail indisponível';
        }

        if (!form.senha) {
            errosDeValidacao.senha = 'Senha é obrigatória';
        } else {
            if (form.senha.length < 8) errosDeValidacao.senha = 'Senha deve ter no mínimo 8 caracteres';
            if (!/[a-z]/.test(form.senha)) errosDeValidacao.senha += '- Conter pelo menos 1 letra minúscula e maiúscula';
            if (!/[A-Z]/.test(form.senha)) errosDeValidacao.senha += '- Conter pelo menos 1 letra maiúscula';
            if (!/[0-9]/.test(form.senha)) errosDeValidacao.senha += '- Conter pelo menos 1 número';
        }

        if (form.confirmacaoSenha !== form.senha) {
            errosDeValidacao.confirmacaoSenha = 'Confirmação de senha deve ser igual à senha';
        }

        return errosDeValidacao;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:8083/index.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'ECA1AB4CE8583613A2C759B445E98'
                },
                body: JSON.stringify(form)
            });

            if (response.status === 400) {
                const data = await response.json();
                setErrors({ [data.nomeCampo]: data.tipoErro === 'USUARIO_EXISTENTE' ? 'E-mail já cadastrado' : 'Campo inválido' });
            } else {
                alert('Cadastro realizado com sucesso!');
                setForm(inputDadosCadastro);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputCadastro = (label, name, type = "text", icon, placeholder, error) => (
        <FormControl style={{ marginBottom: '1rem' }}>
            <FormLabel>{label}</FormLabel>
            <TextField
                name={name}
                type={type}
                value={form[name]}
                onChange={handleChange}
                onFocus={() => setShowInfo(name === 'senha')}
                onBlur={() => setShowInfo(false)}
                error={Boolean(error)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment
                            position="start"
                            sx={{ color: mode === 'dark' ? '#0A0909' : '#ff6600', mr: 1 }} // Cor dos ícones
                        >
                            {icon}
                        </InputAdornment>
                    ),
                }}
                placeholder={placeholder}
                variant="outlined"
                fullWidth
                helperText={error}
            />
            {name === 'senha' && showInfo && (
                <>
                    <FormHelperText style={{ fontSize: '0.75rem' }}>
                        - Senha deve ter no mínimo 8 caracteres.
                    </FormHelperText>
                    <FormHelperText style={{ fontSize: '0.75rem' }}>
                        - Conter pelo menos 1 letra minúscula e maiúscula.
                    </FormHelperText>
                    <FormHelperText style={{ fontSize: '0.75rem' }}>
                        - Conter pelo menos 1 número.
                    </FormHelperText>
                </>
            )}
        </FormControl>
    );

    return (
        <Paper
            elevation={3}
            component="form"
            onSubmit={handleSubmit}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                maxWidth: '400px',
                margin: '0 auto',
                marginTop: '10%',
                padding: '2rem',
                backgroundColor: mode === 'dark' ? '#121212' : '#fff', // Cor do fundo
            }}
        >
            <Typography variant="h4" component="h1" style={{ textAlign: 'center' }}>
                Formulário de Cadastro
            </Typography>

            {inputCadastro('Nome', 'nome', 'text', <PersonIcon />, 'Nome', errors.nome)}
            {inputCadastro('E-mail', 'email', 'email', <EmailIcon />, 'Digite seu e-mail', errors.email)}
            {inputCadastro('Senha', 'senha', 'password', <LockIcon />, '********', errors.senha)}
            {inputCadastro('Confirmação de Senha', 'confirmacaoSenha', 'password', <LockIcon />, '********', errors.confirmacaoSenha)}

            <Button
                type="submit"
                disabled={isSubmitting}
                variant="contained"
                sx={{
                    backgroundColor: mode === 'dark' ? '#0A0909' : 'primary.main',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: mode === 'dark' ? '#0A0909' : 'primary.dark',
                    },
                }}
            >
                Cadastrar
            </Button>
        </Paper>
    );
};

export default Formulario;
