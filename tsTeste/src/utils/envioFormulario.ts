import { InputDadosCadastro, Errors, inputDadosCadastro } from './types';
import { validacao } from './validacao';

export function handleChange(event: Event, form: InputDadosCadastro): void {
    const target = event.target as HTMLInputElement;
    form[target.name as keyof InputDadosCadastro] = target.value;
}

export async function handleSubmit(event: Event, form: InputDadosCadastro, setErrors: (errors: Errors) => void, setIsSubmitting: (isSubmitting: boolean) => void, renderForm: () => void): Promise<void> {
    event.preventDefault();
    const validationErrors = validacao(form);
    if (Object.keys(validationErrors).length > 0) {
        displayErrors(validationErrors);
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
            form = inputDadosCadastro;
            renderForm();
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    } finally {
        setIsSubmitting(false);
    }
}

function displayErrors(errors: Errors): void {
    Object.keys(errors).forEach(key => {
        const errorElement = document.getElementById(`error-${key}`);
        if (errorElement) {
            const errorMessage = errors[key];
            errorElement.textContent = errorMessage || '';
        }
        const inputElement = document.querySelector(`input[name=${key}]`);
        if (inputElement) {
            inputElement.classList.toggle('error', !!errors[key]);
        }
    });
}
