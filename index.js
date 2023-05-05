// Seleccionar elementos del DOM
let btnEncrypt = document.querySelector(".btn-encrypt");
let btnDecrypt = document.querySelector(".btn-decrypt");
let icon = document.querySelector(".encrypter-img");
let container = document.querySelector(".encrypted-msg");
let result = document.querySelector(".output-text");
const textEncrypt = document.querySelector(".textarea-encrypt");

// Cifrar el texto cuando se hace clic en el botón de encriptar
btnEncrypt.onclick = function () {
    const text = getText();
    if (text.length > 0) {
        hideElements();
        result.textContent = encryptText(text);
    } else {
        icon.classList.remove("hide");
        container.classList.remove("hide");
        result.textContent = "";
    }
};

// Descifrar el texto cuando se hace clic en el botón de desencriptar
btnDecrypt.onclick = function () {
    const text = getText();
    if (text.length > 0) {
        hideElements();
        result.textContent = decryptText(text);
    } else {
        icon.classList.remove("hide");
        container.classList.remove("hide");
        result.textContent = "";
    }
};

/**
Obtener el texto de entrada, eliminar caracteres especiales y acentos.
Mostrar alerta cuando la entrada contiene letras invalidas o cuando está vacía.
@return {string} - El texto de entrada.
**/
function getText() {
    const text = document.querySelector(".textarea-encrypt");
    let value = text.value.trim();

    if (value.length === 0) {
        PNotify.notice({
            title: "Ooops!",
            text: "Por favor ingrese un texto.",
            delay: 1000,
            addClass: 'my-pnotify-style'
        });
        return "";
    }

    if (!/^[a-z\s]+$/.test(value)) {
        PNotify.error({
            title: "Ooops!",
            text: "Ingrese solamente letras minúsculas y sin acentos.",
            delay: 2000,
            addClass: 'my-pnotify-style'
        });
        value = "";
        text.value = value;
        value = text.value.trim();
    }

    return value;
}


// Convertir el texto ingresado a minúsculas
textEncrypt.addEventListener("input", function () {
    const value = this.value;
    this.value = value.toLowerCase();
});

// Ocultar algunos elementos del DOM
function hideElements() {
    icon.classList.add("hide");
    container.classList.add("hide");
}

/**
Encriptar el texto de entrada
@param {string} msg - El texto de entrada a encriptar.
@return {string} - El texto encriptado.
**/
function encryptText(msg) {
    const finalText = msg
        .replace(/e/gi, "enter")
        .replace(/i/gi, "imes")
        .replace(/a/gi, "ai")
        .replace(/o/gi, "ober")
        .replace(/u/gi, "ufat");

    if (finalText.length > 0) {
        textEncrypt.value = "";
        return finalText;
    }
}

/**
Desencriptar el texto de entrada
@param {string} msg - El texto de entrada a desencriptar.
@return {string} - El texto desencriptado.
**/
function decryptText(msg) {
    const finalText = msg
        .replace(/enter/gi, "e")
        .replace(/imes/gi, "i")
        .replace(/ai/gi, "a")
        .replace(/ober/gi, "o")
        .replace(/ufat/gi, "u");

    if (finalText.length > 0) {
        textEncrypt.value = "";
        return finalText;
    }
}

// Obtener el contenido del texto de salida
const btnCopy = document.querySelector(".btn-copy");
btnCopy.onclick = function () {
    const content = result.textContent.trim();
    if (content.length > 0) {
        navigator.clipboard.writeText(content).then(() => {
            PNotify.success({
                title: "Copiado!",
                text: "El texto ha sido copiado al portapapeles",
                delay: 1000,
                addClass: 'my-pnotify-style'
            });
        }).catch(() => {
            PNotify.error({
                title: "Oops!",
                text: "No se pudo copiar el texto",
                delay: 1000,
                addClass: 'my-pnotify-style',
            });
        });
    } else {
        PNotify.notice({
            title: "Ooops!",
            text: "No hay texto para copiar",
            delay: 1000,
            addClass: 'my-pnotify-style'
        });
    }
};
