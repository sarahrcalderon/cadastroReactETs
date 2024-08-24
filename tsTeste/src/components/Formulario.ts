export default function Formulario(container: HTMLElement) {
    container.innerHTML = `
      <form>
        <input type="text" placeholder="Nome" />
        <button type="submit">Cadastrar</button>
      </form>
    `;
  }
  