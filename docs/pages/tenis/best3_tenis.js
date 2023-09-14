function calcular() {
    // Obtener las cuotas y la cantidad de dinero a apostar
    const cuota1 = parseFloat(document.getElementById('cuota1').value);
    const cuota2 = parseFloat(document.getElementById('cuota2').value);
    const cuota3 = parseFloat(document.getElementById('cuota3').value);
    const cuota4 = parseFloat(document.getElementById('cuota4').value);
    const dineroApostar = parseFloat(document.getElementById('dineroApostar').value);

    const resultadoBanner = document.getElementById('resultado');
    const alertDiv = document.createElement('div');
    resultadoBanner.innerHTML = "";

    // Validar si se introdujo un valor no válido
    if (isNaN(cuota1) || isNaN(cuota2) || isNaN(cuota3) || isNaN(cuota4) || isNaN(dineroApostar)) {
        alert("Por favor, ingresa valores numéricos en todos los campos.");
        return;
    }

    // Calcular la inversa de las cuotas para obtener las probabilidades implícitas
    const probabilidad1 = 1 / cuota1;
    const probabilidad2 = 1 / cuota2;
    const probabilidad3 = 1 / cuota3;
    const probabilidad4 = 1 / cuota4;

    // Calcular la suma de las probabilidades implícitas
    const sumaProbabilidades = probabilidad1 + probabilidad2 + probabilidad3 + probabilidad4;

    // Calcular la cantidad a apostar en cada cuota para igualar las probabilidades
    const cantidadApostar1 = (dineroApostar * probabilidad1) / sumaProbabilidades;
    const cantidadApostar2 = (dineroApostar * probabilidad2) / sumaProbabilidades;
    const cantidadApostar3 = (dineroApostar * probabilidad3) / sumaProbabilidades;
    const cantidadApostar4 = (dineroApostar * probabilidad4) / sumaProbabilidades;

    // Mostrar el resultado en un banner
    
    
    
    resultadoBanner.appendChild(alertDiv);
    if (sumaProbabilidades >= 1) {
        alertDiv.classList.add('alert', 'alert-danger');
        alertDiv.setAttribute('role', 'alert');
        alertDiv.innerHTML = `No hay oportunidad de ganancias. La suma de las probabilidades es mayor o igual a 1.`;
    } else {
        const ganancias = (1 - sumaProbabilidades) * dineroApostar;
        alertDiv.classList.add('alert', 'alert-secondary');
        alertDiv.setAttribute('role', 'alert');
        alertDiv.innerHTML = `Debes apostar  €${cantidadApostar1.toFixed(2)} en la cuota 1,  €${cantidadApostar2.toFixed(2)} en la cuota 2,  €${cantidadApostar3.toFixed(2)} en la cuota 3, y  €${cantidadApostar4.toFixed(2)} en la cuota 4 para tener una oportunidad de ganar. Las ganancias van a ser de €${ganancias.toFixed(2)}`;
    }



}