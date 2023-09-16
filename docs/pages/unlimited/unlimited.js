function calcular_apuesta() {
    // Obtener las cuotas y la cantidad de dinero a apostar
    const cuotas = document.getElementById('cuotas').value;
    const dineroApostar = parseFloat(document.getElementById('dineroApostar').value);

    if (!cuotas || isNaN(dineroApostar)) {
        alert('Por favor, ingresa valores válidos en todos los campos.');
        return;
    }
    const resultadoBanner = document.getElementById('resultado_unlimited');
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