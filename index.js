let btnEncrypt = document.querySelector(".btn-encrypt");
let btnDecrypt = document.querySelector(".btn-decrypt");
let munieco = document.querySelector(".encrypter-img");
let container = document.querySelector(".encrypted-msg");
let result = document.querySelector(".output-text");
const textEncrypt = document.querySelector(".textarea-encrypt");


btnEncrypt.onclick = function () {
    hideElements();
    const text = getText();
    if (text.length > 0) {
        result.textContent = encryptText(text);
    } else {
        showAlert();
        munieco.classList.remove("hide");
        container.classList.remove("hide");
        result.textContent = "";
    }
};

btnDecrypt.onclick = function () {
    hideElements();
    const text = getText();
    if (text.length > 0) {
        result.textContent = decryptText(text);
    } else {
        showAlert();
        munieco.classList.remove("hide");
        container.classList.remove("hide");
        result.textContent = "";
    }
};

function getText() {
    const text = document.querySelector(".textarea-encrypt");
    let value = text.value.trim();

    // Reemplazar caracteres especiales y acentos
    value = value.replace(/[^\w\s]/gi, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if (!/^[a-z\s]+$/.test(value)) {
        swal("Ooops!", "Ingrese solo letras minúsculas y sin acentos", "info");
        value = "";
        text.value = value;
        value = text.value.trim();
    }

    return value;
}

textEncrypt.addEventListener("input", function () {
    const value = this.value;
    this.value = value.toLowerCase();
});

function hideElements() {
    munieco.classList.add("hide");
    container.classList.add("hide");
}

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
    } else {
        showAlert();
    }
}

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
    } else {
        showAlert();
    }
}

function showAlert() {
    swal("Ooops!", "Debes ingresar un texto \n Ingrese solo letras minúsculas y sin acentos", "info");
}

const btnCopy = document.querySelector(".btn-copy");
btnCopy.onclick = function () {
    const content = result.textContent.trim();
    if (content.length > 0) {
        navigator.clipboard.writeText(content).then(() => {
            swal("Copiado!", "El texto ha sido copiado al portapapeles", "success");
        }).catch(() => {
            swal("Oops!", "No se pudo copiar el texto", "error");
        });
    } else {
        swal("Ooops!", "No hay texto para copiar", "info");
    }
};
