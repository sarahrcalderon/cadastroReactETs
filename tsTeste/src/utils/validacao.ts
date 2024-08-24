import { InputDadosCadastro, Errors, emailsIndisponiveis } from './types';



export function validacao(form: InputDadosCadastro): Errors {
    const errosDeValidacao: Errors = {};

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
        const senhaErros = [
            form.senha.length < 8 && 'Senha deve ter no mínimo 8 caracteres',
            !/[a-z]/.test(form.senha) && 'Conter pelo menos 1 letra minúscula e maiúscula',
            !/[A-Z]/.test(form.senha) && 'Conter pelo menos 1 letra maiúscula',
            !/[0-9]/.test(form.senha) && 'Conter pelo menos 1 número'
        ].filter(Boolean).join(' - ');

        if (senhaErros) errosDeValidacao.senha = senhaErros;
    }

    if (form.confirmacaoSenha !== form.senha) {
        errosDeValidacao.confirmacaoSenha = 'Confirmação de senha deve ser igual à senha';
    }

    return errosDeValidacao;
}
