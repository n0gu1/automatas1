 // Función para abrir el panel lateral
 function openNav() {
    document.getElementById("mySidebar").style.left = "0";
}

// Función para cerrar el panel lateral
function closeNav() {
    document.getElementById("mySidebar").style.left = "-250px";
}

// Función para validar la cadena ingresada
function validateCadena() {
    const cadena = document.getElementById('cadena').value;
    const validas = [
        'z', 'bz', 'cz', 'bcz', 'ccz', 'abcz', 'acz', 'acaz', 'bcaz', 'acbz', 
        'accz', 'abacz', 'abcz', 'acbcz', 'accaz'
    ];

    if (validas.includes(cadena)) {
        swal("Cadena válida", `La cadena "${cadena}" es válida.`, "success");
    } else {
        swal("Cadena inválida", `La cadena "${cadena}" no es válida.`, "error");
    }
}