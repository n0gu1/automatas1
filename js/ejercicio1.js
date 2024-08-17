        // Función para abrir el panel lateral
        function openNav() {
            document.getElementById("mySidebar").style.left = "0";
        }

        // Función para cerrar el panel lateral
        function closeNav() {
            document.getElementById("mySidebar").style.left = "-250px";
        }

        // Función para validar los caracteres permitidos
        function validateInput(event, inputField) {
            const allowedChars = ['λ', '0', '1'];
            const key = event.key;

            if (!allowedChars.includes(key) && key !== 'Backspace' && key !== 'Delete') {
                event.preventDefault();
                inputField.classList.add('input-error');
            } else {
                inputField.classList.remove('input-error');
            }
        }

        // Función para validar solo números enteros
        function validateIntegerInput(event) {
            const key = event.key;
            if (!/^[0-9]$/.test(key) && key !== 'Backspace' && key !== 'Delete') {
                event.preventDefault();
            }
        }

        // Función para actualizar el resultado de la concatenación
        function updateResultado() {
            const cadenaIngresada = document.getElementById('cadenaIngresada').value;
            const segundaCadena = document.getElementById('segundaCadena').value;

            let resultado = cadenaIngresada + segundaCadena;

            // Concatenación especial para lenguajes formales: si la primera cadena es λ, el resultado es la segunda cadena.
            if (cadenaIngresada === 'λ') {
                resultado = segundaCadena;
            } else if (segundaCadena === 'λ') {
                resultado = cadenaIngresada;
            }

            document.getElementById('resultado').value = resultado;
        }

        // Función para calcular la potencia de la cadena
        function calculatePotencia() {
            const cadena = document.getElementById('cadena').value;
            const exponente = parseInt(document.getElementById('entero').value, 10);

            let potencia = '';

            if (exponente === 0) {
                potencia = 'ε'; // épsilon para la potencia 0
            } else {
                for (let i = 0; i < exponente; i++) {
                    potencia += cadena;
                }
            }

            document.getElementById('potencia').value = potencia;
        }

        // Función para calcular la inversa de la cadena
        function calculateInversa() {
            const cadena = document.getElementById('cadena').value;
            let inversa = '';

            if (cadena === 'λ') {
                inversa = 'λ'; // La inversa de λ es λ
            } else {
                inversa = cadena.split('').reverse().join(''); // Inversa normal
            }

            document.getElementById('inversa').value = inversa;
        }

        // Función para insertar el carácter λ en el input especificado
        function insertLambda(inputId) {
            const input = document.getElementById(inputId);
            input.value += 'λ'; // Inserta el carácter λ
            input.dispatchEvent(new Event('input')); // Dispara el evento 'input' para actualizar todo
        }

        // Validación para el campo 'cadena'
        document.getElementById('cadena').addEventListener('keydown', function(event) {
            validateInput(event, this);
        });

        document.getElementById('cadena').addEventListener('input', function() {
            const longitud = this.value.length;
            document.getElementById('longitud').value = longitud;

            // Copia el valor de 'cadena' a 'cadenaIngresada' en tiempo real
            document.getElementById('cadenaIngresada').value = this.value;

            // Actualiza el resultado de la concatenación
            updateResultado();

            // Calcula la potencia si hay un exponente válido
            if (document.getElementById('entero').value !== '') {
                calculatePotencia();
            }

            // Calcula la inversa de la cadena en tiempo real
            calculateInversa();
        });

        // Validación para el campo 'segundaCadena'
        document.getElementById('segundaCadena').addEventListener('keydown', function(event) {
            validateInput(event, this);
        });

        document.getElementById('segundaCadena').addEventListener('input', function() {
            // Actualiza el resultado de la concatenación en tiempo real
            updateResultado();
        });

        // Validación para el campo 'entero' y cálculo de la potencia
        document.getElementById('entero').addEventListener('keydown', validateIntegerInput);

        document.getElementById('entero').addEventListener('input', function() {
            calculatePotencia();
        });