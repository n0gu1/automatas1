// Array para almacenar palabras con sus lenguajes
const palabrasGuardadas = [];

function openNav() {
    document.getElementById("mySidebar").style.left = "0";
}

function closeNav() {
    document.getElementById("mySidebar").style.left = "-250px";
}

function validateInput() {
    const selectElement = document.getElementById('alfabeto');
    const inputElement = document.getElementById('palabra');
    const selectedValue = selectElement.value;
    let allowedChars;

    if (selectedValue === 'Σ1') {
        allowedChars = /^[λ01]*$/;
    } else if (selectedValue === 'Σ2') {
        allowedChars = /^[λab]*$/;
    }

    if (!allowedChars.test(inputElement.value)) {
        inputElement.classList.add('invalid');
    } else {
        inputElement.classList.remove('invalid');
    }

    // Filtrar los caracteres no permitidos
    inputElement.value = inputElement.value.split('').filter(char => allowedChars.test(char)).join('');
}

function insertLambda() {
    const inputElement = document.getElementById('palabra');
    inputElement.value += 'λ';
    validateInput(); // Revalidar la entrada después de insertar λ
}

function addWord() {
    const palabra = document.getElementById('palabra').value.trim();
    if (palabra === "") {
        swal("Error", "No se puede agregar una palabra vacía.", "error");
        return;
    }

    swal({
        title: "Seleccione el lenguaje",
        text: "Elija entre Lenguaje 1 y Lenguaje 2:",
        type: "input",
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "Ingrese 1 o 2"
    }, function(inputValue) {
        if (inputValue === false) return false;
        if (inputValue === "") {
            swal.showInputError("Debe ingresar un valor!");
            return false;
        }

        let lenguajeSeleccionado;
        if (inputValue === "1") {
            lenguajeSeleccionado = "Lenguaje 1";
        } else if (inputValue === "2") {
            lenguajeSeleccionado = "Lenguaje 2";
        } else {
            swal.showInputError("Selección inválida. Inténtelo de nuevo.");
            return false;
        }

        // Guardar la palabra y el lenguaje en el array
        palabrasGuardadas.push({ palabra: palabra, lenguaje: lenguajeSeleccionado });
        swal("Guardado", `Palabra "${palabra}" guardada en el ${lenguajeSeleccionado}.`, "success");
        console.log(palabrasGuardadas); // Puedes revisar el array en la consola del navegador
    });
}

function removeWord() {
    if (palabrasGuardadas.length === 0) {
        swal("Error", "No hay palabras guardadas para eliminar.", "error");
        return;
    }

    let opciones = palabrasGuardadas.map((item, index) => `${index + 1}. ${item.palabra} (${item.lenguaje})`).join("\n");

    swal({
        title: "Eliminar Palabra",
        text: `Seleccione el número de la palabra que desea eliminar:\n\n${opciones}`,
        type: "input",
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "Ingrese el número"
    }, function(inputValue) {
        if (inputValue === false) return false;
        const index = parseInt(inputValue) - 1;

        if (isNaN(index) || index < 0 || index >= palabrasGuardadas.length) {
            swal.showInputError("Selección inválida. Inténtelo de nuevo.");
            return false;
        }

        const palabraEliminada = palabrasGuardadas.splice(index, 1)[0];
        swal("Eliminada", `Palabra "${palabraEliminada.palabra}" eliminada del ${palabraEliminada.lenguaje}.`, "success");
        console.log(palabrasGuardadas); // Puedes revisar el array actualizado en la consola del navegador
    });
}

function showWords() {
    if (palabrasGuardadas.length === 0) {
        swal("Sin Palabras", "No hay palabras guardadas.", "info");
        return;
    }

    let listado = palabrasGuardadas.map(item => `${item.palabra} (${item.lenguaje})`).join("\n");
    swal("Palabras Guardadas", listado, "info");
}

function concatenateAlphabet() {
    const lenguaje1 = palabrasGuardadas.filter(item => item.lenguaje === "Lenguaje 1").map(item => item.palabra);
    const lenguaje2 = palabrasGuardadas.filter(item => item.lenguaje === "Lenguaje 2").map(item => item.palabra);

    if (lenguaje1.length === 0 || lenguaje2.length === 0) {
        swal("Error", "Debe haber palabras en ambos lenguajes para concatenar.", "error");
        return;
    }

    let resultado = [];

    lenguaje1.forEach(palabra1 => {
        lenguaje2.forEach(palabra2 => {
            resultado.push(palabra1 + palabra2);
        });
    });

    document.getElementById('resultado').value = resultado.join(", ");
}

function potencia() {
    if (palabrasGuardadas.length === 0) {
        swal("Error", "No hay palabras guardadas.", "error");
        return;
    }

    swal({
        title: "Seleccione el lenguaje",
        text: "Elija entre Lenguaje 1 y Lenguaje 2:",
        type: "input",
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "Ingrese 1 o 2"
    }, function(lenguajeSeleccionado) {
        if (lenguajeSeleccionado === false) return false;
        if (lenguajeSeleccionado !== "1" && lenguajeSeleccionado !== "2") {
            swal.showInputError("Debe ingresar 1 o 2!");
            return false;
        }

        const palabras = palabrasGuardadas
            .filter(item => item.lenguaje === `Lenguaje ${lenguajeSeleccionado}`)
            .map(item => item.palabra);

        if (palabras.length === 0) {
            swal("Error", `No hay palabras en el Lenguaje ${lenguajeSeleccionado}.`, "error");
            return;
        }

        swal({
            title: "Ingrese el exponente",
            text: "Ingrese un número entero para calcular la potencia:",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: "Ingrese un número"
        }, function(exponente) {
            if (exponente === false) return false;
            exponente = parseInt(exponente);
            if (isNaN(exponente) || exponente < 1) {
                swal.showInputError("Debe ingresar un número válido!");
                return false;
            }

            let resultado = palabras.slice();

            for (let i = 1; i < exponente; i++) {
                resultado = resultado.flatMap(palabra => palabras.map(p => palabra + p));
            }

            document.getElementById('resultado').value = resultado.join(", ");
            swal("Potencia Calculada", `El resultado de elevar el Lenguaje ${lenguajeSeleccionado} a la potencia ${exponente} ha sido calculado.`, "success");
        });
    });
}

function inversa() {
    if (palabrasGuardadas.length === 0) {
        swal("Error", "No hay palabras guardadas.", "error");
        return;
    }

    swal({
        title: "Seleccione el lenguaje",
        text: "Elija entre Lenguaje 1 y Lenguaje 2:",
        type: "input",
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "Ingrese 1 o 2"
    }, function(lenguajeSeleccionado) {
        if (lenguajeSeleccionado === false) return false;
        if (lenguajeSeleccionado !== "1" && lenguajeSeleccionado !== "2") {
            swal.showInputError("Debe ingresar 1 o 2!");
            return false;
        }

        const palabras = palabrasGuardadas
            .filter(item => item.lenguaje === `Lenguaje ${lenguajeSeleccionado}`)
            .map(item => item.palabra);

        if (palabras.length === 0) {
            swal("Error", `No hay palabras en el Lenguaje ${lenguajeSeleccionado}.`, "error");
            return;
        }

        const resultado = palabras.map(palabra => palabra.split('').reverse().join(''));

        document.getElementById('resultado').value = resultado.join(", ");
        swal("Inversa Calculada", `La inversa del Lenguaje ${lenguajeSeleccionado} ha sido calculada.`, "success");
    });
}

function union() {
    const lenguaje1 = palabrasGuardadas.filter(item => item.lenguaje === "Lenguaje 1").map(item => item.palabra);
    const lenguaje2 = palabrasGuardadas.filter(item => item.lenguaje === "Lenguaje 2").map(item => item.palabra);

    if (lenguaje1.length === 0 && lenguaje2.length === 0) {
        swal("Error", "No hay palabras en ninguno de los lenguajes para unir.", "error");
        return;
    }

    const resultado = Array.from(new Set([...lenguaje1, ...lenguaje2]));

    document.getElementById('resultado').value = resultado.join(", ");
    swal("Unión Calculada", `La unión de los Lenguajes 1 y 2 ha sido calculada.`, "success");
}

function interseccion() {
    const lenguaje1 = palabrasGuardadas.filter(item => item.lenguaje === "Lenguaje 1").map(item => item.palabra);
    const lenguaje2 = palabrasGuardadas.filter(item => item.lenguaje === "Lenguaje 2").map(item => item.palabra);

    if (lenguaje1.length === 0 || lenguaje2.length === 0) {
        swal("Error", "Debe haber palabras en ambos lenguajes para calcular la intersección.", "error");
        return;
    }

    const resultado = lenguaje1.filter(palabra => lenguaje2.includes(palabra));

    if (resultado.length === 0) {
        swal("Sin Intersección", "No hay palabras comunes entre los dos lenguajes.", "info");
        document.getElementById('resultado').value = "";
    } else {
        document.getElementById('resultado').value = resultado.join(", ");
        swal("Intersección Calculada", `La intersección de los Lenguajes 1 y 2 ha sido calculada.`, "success");
    }
}

function diferencia() {
    const lenguaje1 = palabrasGuardadas.filter(item => item.lenguaje === "Lenguaje 1").map(item => item.palabra);
    const lenguaje2 = palabrasGuardadas.filter(item => item.lenguaje === "Lenguaje 2").map(item => item.palabra);

    if (lenguaje1.length === 0) {
        swal("Error", "No hay palabras en el Lenguaje 1 para calcular la diferencia.", "error");
        return;
    }

    const resultado = lenguaje1.filter(palabra => !lenguaje2.includes(palabra));

    if (resultado.length === 0) {
        swal("Sin Diferencia", "No hay palabras exclusivas en el Lenguaje 1.", "info");
        document.getElementById('resultado').value = "";
    } else {
        document.getElementById('resultado').value = resultado.join(", ");
        swal("Diferencia Calculada", `La diferencia entre el Lenguaje 1 y el Lenguaje 2 ha sido calculada.`, "success");
    }
}