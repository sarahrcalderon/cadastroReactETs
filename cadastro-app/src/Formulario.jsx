// src/Formulario.jsx

import React, { useState } from 'react';
import { Button, Input, FormControl, FormLabel, FormHelperText, Typography } from '@mui/joy';
import { Person as PersonIcon, Email as EmailIcon, Lock as LockIcon } from '@mui/icons-material';
import Paper from '@mui/material/Paper';

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
            if (!/[a-z]/.test(form.senha)) errosDeValidacao.senha = '- Conter pelo menos 1 letra minúscula e maiúscula';
            if (!/[A-Z]/.test(form.senha)) errosDeValidacao.senha = '';
            if (!/[0-9]/.test(form.senha)) errosDeValidacao.senha = '- Conter pelo menos 1 número';
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
            const response = await fetch('URL_DO_BACKEND', {
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
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <Input
                name={name}
                type={type}
                value={form[name]}
                onChange={handleChange}
                onFocus={() => setShowInfo(name === 'senha')}
                onBlur={() => setShowInfo(false)}
                error={Boolean(error)}
                startDecorator={icon}
                placeholder={placeholder}
                sx={{ 
                    fontSize: '0.8rem', 
                    color: 'gray', 
                    '&::placeholder': { color: 'text.secondary' } 
                }}
            />
            <FormHelperText>{error}</FormHelperText>
            {name === 'senha' && showInfo && (
                <>
                    <FormHelperText sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                        - Senha deve ter no mínimo 8 caracteres.
                    </FormHelperText>
                    <FormHelperText sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                        - Conter pelo menos 1 letra minúscula e maiúscula.
                    </FormHelperText>
                    <FormHelperText sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                        - Conter pelo menos 1 número.
                    </FormHelperText>
                </>
            )}
        </FormControl>
    );

    return (
        <Paper elevation={3}
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                maxWidth: '400px',
                margin: '0 auto',
                marginTop: '10%',
                padding: '2rem'
            }}
        >
            <Typography level="h4" component="h1" sx={{ textAlign: 'center' }}>
                Formulário de Cadastro
            </Typography>

            {inputCadastro('Nome', 'nome', 'text', <PersonIcon sx={{ fontSize: 19, color: '#315391' }} />, 'Nome', errors.nome)}
            {inputCadastro('E-mail', 'email', 'email', <EmailIcon sx={{ fontSize: 18, color: '#315391' }} />, 'Digite seu e-mail', errors.email)}
            {inputCadastro('Senha', 'senha', 'password', <LockIcon sx={{ fontSize: 18, color: '#315391' }} />, '********', errors.senha)}
            {inputCadastro('Confirmação de Senha', 'confirmacaoSenha', 'password', <LockIcon sx={{ fontSize: 18, color: '#315391' }} />, '********', errors.confirmacaoSenha)}

            <Button type="submit" disabled={isSubmitting} variant="solid">
                Cadastrar
            </Button>
        </Paper>
    );
};

export default Formulario;
