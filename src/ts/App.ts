export function App() {
  function handleChangeInput(this: HTMLInputElement) {
    const inputAction = Input[this.id];
    const box = document.getElementById('box');
    const value = this.value || 0;

    if (typeof inputAction === 'function') {
      inputAction(box, value);
      codePreview(box);
    }
  }

  function handleCodeClick(this: HTMLTextAreaElement) {
    this.select();
    this.setSelectionRange(0, 99999);

    document.execCommand('copy');

    const tooltip = document.querySelector('.tooltip');
    tooltip.classList.add('tooltipactive');

    setTimeout(() => {
      tooltip.classList.remove('tooltipactive');
    }, 3000);
  }

  function codePreview(box: HTMLElement) {
    const borderRadius = {
      top_left: box.style.borderTopLeftRadius || 0,
      top_right: box.style.borderTopRightRadius || 0,
      bottom_left: box.style.borderBottomLeftRadius || 0,
      bottom_right: box.style.borderBottomRightRadius || 0
    }

    const codePreviewText = `
-webkit-border-radius: ${borderRadius.top_left} ${borderRadius.top_right} ${borderRadius.bottom_left} ${borderRadius.bottom_right};
-moz-border-radius: ${borderRadius.top_left} ${borderRadius.top_right} ${borderRadius.bottom_left} ${borderRadius.bottom_right};
border-radius: ${borderRadius.top_left} ${borderRadius.top_right} ${borderRadius.bottom_left} ${borderRadius.bottom_right};`

    const code = document.getElementById('code');

    code.innerHTML = codePreviewText.trim();
  }

  const Input = {
    top_left(box: HTMLDivElement, value: string) {
      console.log("Top Left Changed");
      box.style.borderTopLeftRadius = `${value}px`;
    },

    top_right(box: HTMLDivElement, value: string) {
      console.log("Top Right Changed");
      box.style.borderTopRightRadius = `${value}px`;
    },

    bottom_left(box: HTMLDivElement, value: string) {
      console.log("Bottom Left Changed");
      box.style.borderBottomLeftRadius = `${value}px`;
    },

    bottom_right(box: HTMLDivElement, value: string) {
      console.log("Bottom Right Changed");
      box.style.borderBottomRightRadius = `${value}px`;
    }
  }

  const inputs = document.querySelectorAll(".inputs-container input");

  inputs.forEach(input => {
    input.addEventListener('change', handleChangeInput);
  });

  const code = document.getElementById('code');
  code.addEventListener('click', handleCodeClick);
}
