const resultadoBanner = document.getElementById('resultado');
const formularios = getFormularios()

let errorMsgProbGreater1 = "No hay oportunidad de ganancias. La suma de las probabilidades es mayor o igual a 1. <br>";

function mostrarFormulario() {
    defaultActionFormularios()
    showFormularios(formularios)
}

function getFormularios() {
    let formTotal = "formularioCantidadTotal";
    let formEspecifica = "formularioCuotaEspecifica";

    return {
        "1": {show: formTotal, hide: formEspecifica},
        "2": {show: formEspecifica, hide: formTotal},
        default: {hide: [formEspecifica, formTotal]}
    };
}

function defaultActionFormularios() {
    formularios.default.hide.forEach(formId => {
        const formulario = document.getElementById(formId);
        formulario.style.display = "none";
    });
}

function showFormularios(formularios) {
    let tipoApuesta = document.getElementById("tipoApuesta").value;
    if (tipoApuesta in formularios) {
        const showForm = formularios[tipoApuesta].show;
        const hideForm = formularios[tipoApuesta].hide;

        const formularioMostrar = document.getElementById(showForm);
        formularioMostrar.style.display = "block";

        hideForm.forEach(formId => {
            const formularioOcultar = document.getElementById(formId);
            formularioOcultar.style.display = "none";
        });
    }
}

function calcular_apuesta_cantidad_total() {
    // Obtener las cuotas y la cantidad de dinero a apostar
    const cuotas = document.getElementById('cuotasCantidadTotal').value.trim();
    const dineroApostar = parseFloat(document.getElementById('dineroApostarTotal').value);

    if (!cuotas || isNaN(dineroApostar)) {
        showError('Por favor, ingresa valores válidos en todos los campos.')
        return;
    }

    const cuotasArray = cuotas.split(' ').map(parseFloat);
    const probabilidades = cuotasArray.map(cuota => 1 / cuota);
    const sumaProbabilidades = probabilidades.reduce((total, probabilidad) => total + probabilidad, 0);
    const cantidadesApostar = probabilidades.map(probabilidad => (dineroApostar * probabilidad) / sumaProbabilidades);

    let arrayCuotaCantidad = getArrayCuotaCantidadApostar(cuotasArray, cantidadesApostar)

    errorMsgProbGreater1 += `La probabilidad es: ${sumaProbabilidades}`;
    isBetViable(sumaProbabilidades) ? showResult(arrayCuotaCantidad, dineroApostar) : showError(errorMsgProbGreater1);
}

function isBetViable(sumaProbabilidades) {
    return sumaProbabilidades > 1
}

function calcular_apuesta_cuota_especifica() {
    // Obtener las cuotas y la cantidad de dinero a apostar
    const cuotas = document.getElementById('cuotasCantidadEspecifica').value;
    const cuotaEspecifica = parseFloat(document.getElementById('cuotaEspecifica').value);
    const dineroApostarCuotaEspecifica = parseFloat(document.getElementById('dineroApostarCuotaEspecifica').value);

    const cuotasArray = cuotas.split(' ').map(parseFloat);
    const probabilidades = cuotasArray.map(cuota => 1 / cuota);
    const sumaProbabilidades = probabilidades.reduce((total, probabilidad) => total + probabilidad, 0);

    if (!cuotas || isNaN(dineroApostarCuotaEspecifica) || isNaN(cuotaEspecifica)) {
        showError('Por favor, ingresa valores válidos en todos los campos.');
        return;
    }

    if (cuotasArray.includes(cuotaEspecifica)) {
        const dineroTotalApostar = (dineroApostarCuotaEspecifica * sumaProbabilidades * cuotaEspecifica);
        const cantidadesApostar = probabilidades.map(probabilidad => (dineroTotalApostar * probabilidad) / sumaProbabilidades);

        const errorMsg = (errorMsgProbGreater1 + `La probabilidad es: ${sumaProbabilidades}`);


        let arrayCuotaCantidad = getArrayCuotaCantidadApostar(cuotasArray, cantidadesApostar)

        isBetViable(sumaProbabilidades) ? showError(errorMsg) : showResult(arrayCuotaCantidad, dineroTotalApostar);
    } else {
        showError("La cuota especifica no esta indicada");
    }
}

function showResult(arrayCuotasCantidadApostar, dineroTotalApostar) {
    const ganancias = getGanancias(arrayCuotasCantidadApostar, dineroTotalApostar)
    createAlert(arrayCuotasCantidadApostar, dineroTotalApostar, ganancias)
}

function getGanancias(arrayCuotasCantidadApostar, dineroTotalApostar) {
    const totalAmount = arrayCuotasCantidadApostar.reduce((total, item) => total + (item.cuota * item.cantidadApostar), 0);
    const averageAmountPerBet = totalAmount / arrayCuotasCantidadApostar.length;
    return averageAmountPerBet - dineroTotalApostar;
}

function createAlert(arrayCuotasCantidadApostar, dineroTotalApostar, ganancias) {
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', 'alert-secondary');
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `Debes apostar las siguientes cantidades en cada cuota:<br>`;

    arrayCuotasCantidadApostar.forEach((item, index) => {
        alertDiv.innerHTML += `Cuota ${index + 1} (${item.cuota}): €${item.cantidadApostar.toFixed(2)}<br>`;
    });
    alertDiv.innerHTML += `<div>Total a apostar: €${dineroTotalApostar.toFixed(2)}</div>`
    alertDiv.innerHTML += `<div>Las ganancias van a ser de: €${ganancias.toFixed(2)}</div>`
    showDiv(alertDiv);
}

function getArrayCuotaCantidadApostar(cuotas, cantidadApostar) {
    if (cantidadApostar.length === cuotas.length) {
        return cuotas.map((clave, index) => ({
            cuota: clave,
            cantidadApostar: cantidadApostar[index]
        }));
    } else {
        return [];
    }
}

function showError(mensaje = "Error") {
    const alertDiv = document.createElement('div');
    alertDiv.classList.remove();
    alertDiv.classList.add('alert', 'alert-danger');
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = mensaje;
    showDiv(alertDiv);
}

function showDiv(alertDiv) {
    while (resultadoBanner.firstChild) {
        resultadoBanner.removeChild(resultadoBanner.firstChild);
    }
    resultadoBanner.appendChild(alertDiv);
}

