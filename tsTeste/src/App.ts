import { handleSubmit as handleSubmitForm } from './utils/envioFormulario';
import { InputDadosCadastro, Errors, inputDadosCadastro } from './utils/types';
import { validacao } from './utils/validacao';


let form: InputDadosCadastro = inputDadosCadastro;
let errors: Errors = {};
let isSubmitting = false;

function handleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    form[target.name as keyof InputDadosCadastro] = target.value;
}

function createFormInput(name: keyof InputDadosCadastro, placeholder: string, type: string = 'text'): string {
    return `
        <div class="input-group">
            <label for="${name}">${capitalizeFirstLetter(name)}</label>
            <input type="${type}" name="${name}" placeholder="${placeholder}" value="${form[name]}" />
            <div id="error-${name}" class="error-message"></div>
        </div>
    `;
}

// Renderizar o formulário
function renderizacaoFormulario(): void {
    const container = document.getElementById('root');
    if (!container) return;

    container.innerHTML = `
        <div class="container">
            <h1 class="title">Formulário de Cadastro</h1>
            <form id="registration-form">
                ${createFormInput('nome', 'Nome')}
                ${createFormInput('email', 'Digite seu e-mail', 'email')}
                ${createFormInput('senha', '********', 'password')}
                ${createFormInput('confirmacaoSenha', '********', 'password')}
                <button type="submit" ${isSubmitting ? 'disabled' : ''}>Cadastrar</button>
            </form>
        </div>
    `;

    const formElement = document.getElementById('registration-form');
    if (formElement) {
        formElement.addEventListener('input', handleChange);
        formElement.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(event: SubmitEvent): void {
    event.preventDefault();
    setIsSubmitting
    const validationErrors = validacao(form);

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
        handleSubmitForm(event, form, setErrors, setIsSubmitting, renderizacaoFormulario);
    }
}

function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function setErrors(newErrors: Errors): void {
    errors = newErrors;
    displayErrors(errors);
}

function setIsSubmitting(submitting: boolean): void {
    isSubmitting = submitting;
    renderizacaoFormulario();
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

export function initializeApp(): void {
    renderizacaoFormulario();
}
