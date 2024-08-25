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

// Função para criar inputs do formulário
function createFormInput(
    id: string, 
    labelText: string, 
    placeholderText: string, 
    type: string = 'text', 
    iconClass: string = '', 
    isPassword: boolean = false
): string {
    const iconHTML = iconClass ? `<i class="fas ${iconClass}"></i>` : '';
    const togglePasswordHTML = isPassword 
        ? `<i class="fas fa-eye toggle-password" id="toggle-${id}"></i>` 
        : '';

    return `
        <div class="input-group">
            <label for="${id}">${labelText}</label>
            <div class="input-wrapper">
                ${iconHTML}
                <input type="${type}" id="${id}" name="${id}" placeholder="${placeholderText}">
                ${togglePasswordHTML}
            </div>
            <div class="error-message" id="${id}-error"></div>
        </div>`;
}

// Função para renderizar o formulário
function renderizacaoFormulario(): void {
    const container = document.getElementById('root');
    if (!container) return;

    container.innerHTML = `
    <div class="container">
        <h1 class="title">Formulário de Cadastro</h1>
        <form id="registration-form">
            ${createFormInput('nome', 'Nome', 'Nome', 'text', 'fa-user')}
            ${createFormInput('email', 'Digite seu e-mail', 'Digite seu e-mail', 'email', 'fa-envelope')}
            ${createFormInput('senha', 'Senha', '******', 'password', 'fa-lock', true)}
            ${createFormInput('confirmacaoSenha', 'Confirmação de Senha', '******', 'password', 'fa-lock', true)}
            <button type="submit" ${isSubmitting ? 'disabled' : ''}>Cadastrar</button>
        </form>
    </div>`;

    // Adiciona event listeners ao ícone de toggle de senha
    const toggleIcons = document.querySelectorAll('.toggle-password');
    toggleIcons.forEach(icon => {
        const id = (icon as HTMLElement).id.replace('toggle-', '');
        icon.addEventListener('click', () => togglePasswordVisibility(id));
    });

    const formElement = document.getElementById('registration-form');
    if (formElement) {
        formElement.addEventListener('input', handleChange);
        formElement.addEventListener('submit', handleFormSubmit);
    }
}

// Função para alternar a visibilidade da senha
function togglePasswordVisibility(inputId: string): void {
    const inputElement = document.getElementById(inputId) as HTMLInputElement;
    const toggleIcon = document.getElementById(`toggle-${inputId}`) as HTMLElement;
    
    if (inputElement.type === 'password') {
        inputElement.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        inputElement.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

// Função para lidar com o envio do formulário
function handleFormSubmit(event: SubmitEvent): void {
    event.preventDefault();
    setIsSubmitting(true);
    const validationErrors = validacao(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
        handleSubmitForm(event, form, setErrors, setIsSubmitting, renderizacaoFormulario);
    }
}

// Função para capitalizar a primeira letra de uma string
function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Função para definir erros
function setErrors(newErrors: Errors): void {
    errors = newErrors;
    displayErrors(errors);
}

// Função para definir o estado de envio
function setIsSubmitting(submitting: boolean): void {
    isSubmitting = submitting;
    renderizacaoFormulario();
}

// Função para exibir erros
function displayErrors(errors: Errors): void {
    Object.keys(errors).forEach(key => {
        const errorElement = document.getElementById(`${key}-error`);
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


(window as any).togglePasswordVisibility = togglePasswordVisibility;



export function initializeApp(): void {
    renderizacaoFormulario();
}
