function mostrarFormulario() {
    var tipoApostador = document.getElementById("tipoApostador").value;
    var formularioCantidadTotal = document.getElementById("formularioCantidadTotal");
    var formularioCuotaEspecifica = document.getElementById("formularioCuotaEspecifica");

    if (tipoApostador === "1") {
        formularioCantidadTotal.style.display = "block";
        formularioCuotaEspecifica.style.display = "none";
    } else if (tipoApostador === "2") {
        formularioCantidadTotal.style.display = "none";
        formularioCuotaEspecifica.style.display = "block";
    } else {
        formularioCuotaEspecifica.style.display = "none";
        formularioCantidadTotal.style.display = "none";
    }
}
function calcular_apuesta_cantidad_total() {
    // Obtener las cuotas y la cantidad de dinero a apostar
    const cuotas = document.getElementById('cuotasCantidadTotal').value;
    const dineroApostar = parseFloat(document.getElementById('dineroApostarTotal').value);

    if (!cuotas || isNaN(dineroApostar)) {
        alert('Por favor, ingresa valores válidos en todos los campos.');
        return;
    }
    const resultadoBanner = document.getElementById('resultado');
    const alertDiv = document.createElement('div');
    resultadoBanner.innerHTML = "";
    resultadoBanner.appendChild(alertDiv);

    // Dividir las cuotas ingresadas por '-' y convertirlas en un array
    const cuotasArray = cuotas.split(' ').map(parseFloat);
    console.log(cuotasArray)

    // Calcular la inversa de cada cuota para obtener las probabilidades implícitas
    const probabilidades = cuotasArray.map(cuota => 1 / cuota);
    console.log(probabilidades)

    // Calcular la suma de las probabilidades implícitas
    const sumaProbabilidades = probabilidades.reduce((total, probabilidad) => total + probabilidad, 0);
    console.log(sumaProbabilidades)

    // Calcular la cantidad a apostar en cada cuota para igualar las probabilidades
    const cantidadesApostar = probabilidades.map(probabilidad => (dineroApostar * probabilidad) / sumaProbabilidades);


    if (sumaProbabilidades >= 1) {
        alertDiv.classList.add('alert', 'alert-danger');
        alertDiv.setAttribute('role', 'alert');
        alertDiv.innerHTML = `No hay oportunidad de ganancias. La suma de las probabilidades es mayor o igual a 1. <br>`;
        alertDiv.innerHTML += `La probabilidad es: ${sumaProbabilidades}`;
    } else {
        const ganancias = (1 - sumaProbabilidades) * dineroApostar;
        alertDiv.classList.add('alert', 'alert-secondary');
        alertDiv.setAttribute('role', 'alert');
        alertDiv.innerHTML = `Debes apostar las siguientes cantidades en cada cuota:<br>`;
        for (let i = 0; i < cuotasArray.length; i++) {
            alertDiv.innerHTML += `Cuota ${i + 1} (${cuotasArray[i]}): €${cantidadesApostar[i].toFixed(2)}<br>`;
        }
        alertDiv.innerHTML += `<div>Las ganancias van a ser de €${ganancias.toFixed(2)}</div>`
    }
}

function calcular_apuesta_cuota_especifica() {
    // Obtener las cuotas y la cantidad de dinero a apostar
    const cuotas = document.getElementById('cuotasCantidadEspecifica').value;
    const cuotaEspecifica = parseFloat(document.getElementById('cuotaEspecifica').value);
    const dineroApostarCuotaEspecifica = parseFloat(document.getElementById('dineroApostarCuotaEspecifica').value);
    if (!cuotas || isNaN(dineroApostarCuotaEspecifica) || isNaN(cuotaEspecifica)) {
        alert('Por favor, ingresa valores válidos en todos los campos.');
        return;
    }
    const resultadoBanner = document.getElementById('resultado');
    const alertDiv = document.createElement('div');
    resultadoBanner.innerHTML = "";
    resultadoBanner.appendChild(alertDiv);

    // Dividir las cuotas ingresadas por '-' y convertirlas en un array
    const cuotasArray = cuotas.split(' ').map(parseFloat);
    console.log(cuotasArray)

    // Calcular la inversa de cada cuota para obtener las probabilidades implícitas
    const probabilidades = cuotasArray.map(cuota => 1 / cuota);
    console.log(probabilidades)

    // Calcular la suma de las probabilidades implícitas
    const sumaProbabilidades = probabilidades.reduce((total, probabilidad) => total + probabilidad, 0);
    console.log(sumaProbabilidades)

    if (cuotasArray.includes(cuotaEspecifica)) {
        const dineroTotalApostar = (dineroApostarCuotaEspecifica * sumaProbabilidades * cuotaEspecifica);
        // Calcular la cantidad a apostar en cada cuota para igualar las probabilidades
        const cantidadesApostar = probabilidades.map(probabilidad => (dineroTotalApostar * probabilidad) / sumaProbabilidades);

        console.log(`cuota especifica es: ${cuotaEspecifica}`)
        if (sumaProbabilidades >= 1) {
            alertDiv.classList.add('alert', 'alert-danger');
            alertDiv.setAttribute('role', 'alert');
            alertDiv.innerHTML = `No hay oportunidad de ganancias. La suma de las probabilidades es mayor o igual a 1. <br>`;
            alertDiv.innerHTML += `La probabilidad es: ${sumaProbabilidades}`;
        } else {
            const ganancias = (1 - sumaProbabilidades) * dineroTotalApostar;
            alertDiv.classList.add('alert', 'alert-secondary');
            alertDiv.setAttribute('role', 'alert');
            alertDiv.innerHTML = `Debes apostar las siguientes cantidades en cada cuota:<br>`;
            for (let i = 0; i < cuotasArray.length; i++) {
                alertDiv.innerHTML += `Cuota ${i + 1} (${cuotasArray[i]}): €${cantidadesApostar[i].toFixed(2)}<br>`;
            }
            alertDiv.innerHTML += `<div>Las ganancias van a ser de €${ganancias.toFixed(2)}</div>`
            alertDiv.innerHTML += `<div>Total a apostar€${dineroTotalApostar.toFixed(2)}</div>`
        }
    } else {
        alertDiv.classList.add('alert', 'alert-danger');
        alertDiv.setAttribute('role', 'alert');
        alertDiv.innerHTML = `La cuota especifica no esta indicada`;
    }
}

