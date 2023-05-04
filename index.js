let botonEncriptar = document.querySelector(".btn-encrypt");
let botonDesencriptar = document.querySelector(".btn-decrypt");
let munieco = document.querySelector(".encrypter-img");
let contenedor = document.querySelector(".encrypted-msg");
let resultado = document.querySelector(".output-text");
const cajatexto = document.querySelector(".textarea-encrypt");


botonEncriptar.onclick = function () {
    ocultarAdelante();
    const cajatexto = recuperarTexto();
    if (cajatexto.length > 0) {
        resultado.textContent = encriptarTexto(cajatexto);
    } else {
        mostrarAlerta();
        munieco.classList.remove("ocultar");
        contenedor.classList.remove("ocultar");
        resultado.textContent = "";
    }
};

botonDesencriptar.onclick = function () {
    ocultarAdelante();
    const cajatexto = recuperarTexto();
    if (cajatexto.length > 0) {
        resultado.textContent = desencriptarTexto(cajatexto);
    } else {
        mostrarAlerta();
        munieco.classList.remove("ocultar");
        contenedor.classList.remove("ocultar");
        resultado.textContent = "";
    }
};

function recuperarTexto() {
    const cajatexto = document.querySelector(".textarea-encrypt");
    let value = cajatexto.value.trim();

    // while (/[^a-z]/.test(value) || /[áéíóúÁÉÍÓÚÜü]/.test(value)) {
    //     swal("Ooops!", "Ingrese solo letras minúsculas y sin acentos", "info");
    //     value = "";
    //     cajatexto.value = value;
    //     value = cajatexto.value.trim();
    // }

    return value;
}

cajatexto.addEventListener("input", function () {
    const value = this.value;
    this.value = value.toLowerCase();
});

function ocultarAdelante() {
    munieco.classList.add("ocultar");
    contenedor.classList.add("ocultar");
}

function encriptarTexto(mensaje) {
    const textoFinal = mensaje
        .replace(/e/gi, "enter")
        .replace(/i/gi, "imes")
        .replace(/a/gi, "ai")
        .replace(/o/gi, "ober")
        .replace(/u/gi, "ufat");

    if (textoFinal.length > 0) {
        cajatexto.value = "";
        return textoFinal;
    } else {
        mostrarAlerta();
    }
}

function desencriptarTexto(mensaje) {
    const textoFinal = mensaje
        .replace(/enter/gi, "e")
        .replace(/imes/gi, "i")
        .replace(/ai/gi, "a")
        .replace(/ober/gi, "o")
        .replace(/ufat/gi, "u");

    if (textoFinal.length > 0) {
        cajatexto.value = "";
        return textoFinal;
    } else {
        mostrarAlerta();
    }
}

function mostrarAlerta() {
    swal("Ooops!", "Debes ingresar un texto \n Ingrese solo letras minúsculas y sin acentos", "info");
}

const btnCopiar = document.querySelector(".btn-copy");
btnCopiar.onclick = function () {
    const contenido = resultado.textContent.trim();
    if (contenido.length > 0) {
        navigator.clipboard.writeText(contenido).then(() => {
            swal("Copiado!", "El texto ha sido copiado al portapapeles", "success");
        }).catch(() => {
            swal("Oops!", "No se pudo copiar el texto", "error");
        });
    } else {
        swal("Ooops!", "No hay texto para copiar", "info");
    }
};
