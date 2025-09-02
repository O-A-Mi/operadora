import "./toast.css";

const toastMessage = (message, type, options = {}) => {
  const defaultOptions = {
    closeButton: true,
    newestOnTop: false,
    progressBar: true,
    onclick: null,
    showDuration: 300,
    hideDuration: 1000,
    timeOut: 5000,
    extendedTimeOut: 2500,
    position: "top-right",
    loading: false,
  };

  // ↑ Configurações Padrão
  // ⊢−−−−−−−−−−−−−−−−−−−−−−−−
  // ↓ Configurações Customizadas

  const toastOptions = { ...defaultOptions, ...options };
  const toastIcons = {
    success: "far fa-check-circle",
    error: "far fa-times-circle",
    warning: "far fa-exclamation-triangle",
    info: "far fa-info-circle",
    loading: "fas fa-spinner-third fa-spin",
    default: "far fa-comment-dots",
  };

  if (toastOptions.loading && toastOptions.loading.complete) {
    document.querySelector(`#${toastOptions.loading.id}`).remove();
  }

  const posiblePositions = [
    "top-left",
    "top-center",
    "top-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ];
  defaultOptions.position = posiblePositions.includes(toastOptions.position)
    ? toastOptions.position
    : "top-right";

  const containerExists = document.querySelector(
    `#toastContainer.${toastOptions.position}`
  );

  if (!containerExists) {
    const newToastContainer = document.createElement("div");
    newToastContainer.id = "toastContainer";
    newToastContainer.classList.add(toastOptions.position);

    document.getElementById("root").appendChild(newToastContainer);
  }

  const toastContainer = document.querySelector(
    `#toastContainer.${toastOptions.position}`
  );

  const toast = document.createElement("div");
  toast.classList.add("toast", `toast-${type || "default"}`);
  toast.id = toastOptions.loading ? toastOptions.loading.id : "";
  toast.innerHTML = `
        <i class="${toastIcons[type || "default"]} toast-icon"></i>
        <div class="toast-message">${message}</div>
    `;

  // Adiciona o botão de fechar
  if (toastOptions.closeButton) {
    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fa-solid", "fa-xmark", "toast-close-icon");
    closeIcon.addEventListener("click", closeToast);
    toast.appendChild(closeIcon);
  }

  // Adiciona a barra de progresso
  if (toastOptions.progressBar) {
    const progressBar = document.createElement("div");
    progressBar.classList.add("toast-progress-bar");
    toast.appendChild(progressBar);
  }

  toastOptions.newestOnTop
    ? toastContainer.prepend(toast)
    : toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = `
        opacity ${toastOptions.showDuration}ms,
        color 0.2s ease-in-out,
        background-color 0.2s ease-in-out,
        border 0.2s ease-in-out`;
    toast.style.opacity = 1;
  });

  function closeToast() {
    toast.style.transition = `opacity ${toastOptions.hideDuration}ms`;
    toast.style.opacity = 0;

    setTimeout(() => {
      toast.remove();
    }, toastOptions.hideDuration);
  }

  // Executa a função vinculada ao clique no toast
  if (toastOptions.onclick && typeof toastOptions.onclick === "function") {
    toast.classList.add("clickable");
    let clicked = false;
    toast.addEventListener("click", (_) => {
      if (clicked) return;
      clicked = true;
      toastOptions.onclick();
      closeToast();
    });
  }

  const progressBar = toast.querySelector(".toast-progress-bar");
  let timeOutId;
  let isPaused = false;

  if (toastOptions.timeOut != Infinity) {
    // Inicia o timeout com o tempo inicial
    const startTimeout = (time) => {
      timeOutId = setTimeout(closeToast, time);
      if (toastOptions.progressBar && progressBar) {
        progressBar.style.transition = `width ${time}ms linear`;
        progressBar.offsetWidth;
        progressBar.style.width = "100%";
      }
    };

    // Pausar o timeout ao passar o mouse sobre o toast
    const pauseTimeout = () => {
      if (!isPaused) {
        clearTimeout(timeOutId);
        isPaused = true;
        if (toastOptions.progressBar && progressBar) {
          progressBar.style.transition = "none";
          progressBar.style.width = 0;
        }
      }
    };

    // Reiniciar o timeout com o extendedTimeOut ao remover o mouse
    const resumeTimeout = () => {
      if (isPaused) {
        startTimeout(toastOptions.extendedTimeOut);
        isPaused = false;
        if (toastOptions.progressBar && progressBar) {
          progressBar.style.transition = `width ${toastOptions.extendedTimeOut}ms linear`;
          progressBar.offsetWidth;
          progressBar.style.width = "100%";
        }
      }
    };

    // Adiciona eventos de mouseover e mouseout para o toast
    toast.addEventListener("mouseover", pauseTimeout);
    toast.addEventListener("mouseout", resumeTimeout);

    startTimeout(toastOptions.timeOut);
  }
};

export default toastMessage;
