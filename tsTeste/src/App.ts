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

function createFormInput(id: string, placeholder: string, type = 'text', iconClass: string, isPassword = false) {
    const iconHTML = iconClass ? `<i class="fas ${iconClass}"></i>` : '';
    const togglePasswordHTML = isPassword 
    ? `<i class="fas fa-eye toggle-password" id="toggle-${id}" onclick="togglePasswordVisibility('${id}')"></i>` 
    : '';

    return `
        <div class="input-group">
            <label for="${id}">${placeholder}</label>
            <div class="input-wrapper">
                ${iconHTML}
                <input type="${type}" id="${id}" name="${id}" placeholder="${placeholder}">
                ${togglePasswordHTML}
            </div>
            <div class="error-message" id="${id}-error"></div>
        </div>`;
}

// Renderizar o formulário
function renderizacaoFormulario(): void {
    const container = document.getElementById('root');
    if (!container) return;

    container.innerHTML = `
    <div class="container">
        <h1 class="title">Formulário de Cadastro</h1>
        <form id="registration-form">
            ${createFormInput('nome', 'Nome', 'text', 'fa-user')}
            ${createFormInput('email', 'Digite seu e-mail', 'email', 'fa-envelope')}
            ${createFormInput('senha', '********', 'password', 'fa-light fa-lock', true)}
            ${createFormInput('confirmacaoSenha', '********', 'password', 'fa-light fa-lock', true)}
            <button type="submit" ${isSubmitting ? 'disabled' : ''}>Cadastrar</button>
        </form>
    </div>`;
    
    function togglePasswordVisibility(id: string) {
        const input = document.getElementById(id);
        if (input) {
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
        }
    }
    

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
