export interface InputDadosCadastro {
    nome: string;
    email: string;
    senha: string;
    confirmacaoSenha: string;
}

export interface Errors {
    [key: string]: string | undefined;
    nome?: string;
    email?: string;
    senha?: string;
    confirmacaoSenha?: string;
}

export const inputDadosCadastro: InputDadosCadastro = {
    nome: '',
    email: '',
    senha: '',
    confirmacaoSenha: '',
};

export const emailsIndisponiveis: string[] = ["teste@exemplo.com", "joao@exemplo.com", "maria@acme.net"];
