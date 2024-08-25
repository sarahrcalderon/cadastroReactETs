const $html = document.querySelector<HTMLHtmlElement>('html');
const $checkbox = document.querySelector<HTMLInputElement>('#switch');

$checkbox?.addEventListener('change', function () {
  $html?.classList.toggle('dark-mode');
});
