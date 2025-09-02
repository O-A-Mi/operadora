// Removi: import '../../styles/index.css'
import "./dialog.css";

const dialogQueue = new Array();
let dialogInstance = false;

const dialogMessage = (message, type, options = {}, callback) => {
  const defaultOptions = {
    confirmButton: true,
    onClose: false,
    position: "center",
    background: true,
    buttonsText: {
      confirm: "Confirmar",
      cancel: "Cancelar",
      close: "Fechar",
    },
  };

  // ↑ Configurações Padrão
  // ⊢−−−−−−−−−−−−−−−−−−−−−−−−−
  // ↓ Configurações Customizadas

  const dialogOptions = { ...defaultOptions, ...options };
  const dialogIcons = {
    success: "far fa-check-circle",
    error: "far fa-times-circle",
    warning: "far fa-exclamation-triangle",
    info: "far fa-info-circle",
    default: "far fa-comment-dots",
  };

  const containerExists = document.querySelector(`#dialogContainer`);

  if (!containerExists) {
    const dialogContainer = document.createElement("div");
    dialogContainer.id = "dialogContainer";

    document.getElementById("root").appendChild(dialogContainer);
  }

  const dialog = document.createElement("div");
  dialog.classList.add("dialog", `dialog-${type ?? "default"}`);
  dialog.innerHTML = `
        <div class="dialog-icon">
            <i class="${dialogIcons[type] ?? dialogIcons["default"]}"></i>
        </div>
        <div class="dialog-message">${message}</div>
    `;

  const dialogButtonContainer = document.createElement("div");
  dialogButtonContainer.classList.add("dialog-button-container");

  const dialogButtons = dialogOptions.confirmButton
    ? `
        <button id="dialog-confirm-button" class="dialog-button">
            <i class="far fa-check"></i>
            <span>${dialogOptions.buttonsText.confirm}</span>
        </button>
        <button id="dialog-cancel-button" class="dialog-button">
            <i class="far fa-times"></i>
            <span>${dialogOptions.buttonsText.cancel}</span>
        </button>
    `
    : `
        <button id="dialog-close-button" class="dialog-button">
            <i class="far fa-times"></i>
            <span>${dialogOptions.buttonsText.close}</span>
        </button>
    `;

  dialogButtonContainer.innerHTML = dialogButtons;
  dialog.appendChild(dialogButtonContainer);

  const dialogData = {
    dialogOptions,
    dialog,
    callback,
  };

  dialogQueue.push(dialogData);

  if (!dialogInstance) {
    showNextDialog();
  }
};

function showNextDialog() {
  if (dialogQueue.length > 0) {
    const { dialogOptions, dialog, callback } = dialogQueue.shift();
    const dialogContainer = document.getElementById("dialogContainer");

    dialogContainer.appendChild(dialog);
    dialogContainer.classList.remove("background", "top", "center", "bottom");

    if (dialogOptions.background) dialogContainer.classList.add("background");
    dialogOptions.position
      ? dialogContainer.classList.add(dialogOptions.position)
      : dialogContainer.classList.add("center");
    dialogContainer.style.display = "flex";

    const dialogConfirmButton = document.getElementById(
      "dialog-confirm-button"
    );
    const dialogCancelButton = document.getElementById("dialog-cancel-button");
    const dialogCloseButton = document.getElementById("dialog-close-button");

    const closeDialog = (result) => {
      dialogContainer.style.display = "none";
      dialog.remove();
      if (callback && typeof callback === "function") callback(result);
      dialogInstance = null;
      showNextDialog();
    };

    if (dialogConfirmButton) {
      dialogConfirmButton.addEventListener("click", () => closeDialog(true));
    }

    if (dialogCancelButton) {
      dialogCancelButton.addEventListener("click", () => closeDialog(false));
    }

    if (dialogCloseButton) {
      dialogCloseButton.addEventListener("click", () => closeDialog(null));
    }

    dialogInstance = dialog;
  }
}

export default dialogMessage;
