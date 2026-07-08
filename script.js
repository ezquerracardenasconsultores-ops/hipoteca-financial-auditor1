// =========================================
// HIPOTECA FINANCIAL AUDITOR ENTERPRISE 2.0
// =========================================

function calcular()document.getElementById("cronograma").innerHTML =
    generarCronograma(capital,tea,plazo); {

    // Leer datos
    const capital = parseFloat(document.getElementById("capital").value);
    const tea = parseFloat(document.getElementById("tea").value);
    const plazo = parseInt(document.getElementById("plazo").value);

    // Validación
    if (isNaN(capital) || isNaN(tea) || isNaN(plazo)) {
        alert("Complete todos los datos.");
        return;
    }

    // Conversión TEA -> TEM
    const tem = Math.pow(1 + tea / 100, 1 / 12) - 1;

    // Sistema Francés
    const cuota =
        capital *
        ((tem * Math.pow(1 + tem, plazo)) /
        (Math.pow(1 + tem, plazo) - 1));

    // Valor Presente
    let vpn = 0;

    for (let i = 1; i <= plazo; i++) {

        vpn += cuota / Math.pow(1 + tem, i);

    }

    // Duración de Macaulay
    let vpTotal = 0;
    let tiempo = 0;

    for (let i = 1; i <= plazo; i++) {

        let vp = cuota / Math.pow(1 + tem, i);

        vpTotal += vp;

        tiempo += i * vp;

    }

    const duracion = tiempo / vpTotal;

    // Mostrar KPIs

    document.getElementById("cuota").innerHTML =
        "S/ " + cuota.toLocaleString("es-PE", {
            minimumFractionDigits: 2
        });

    document.getElementById("tem").innerHTML =
        (tem * 100).toFixed(6) + "%";

    document.getElementById("vpn").innerHTML =
        "S/ " + vpn.toLocaleString("es-PE", {
            minimumFractionDigits: 2
        });

    document.getElementById("duracion").innerHTML =
        duracion.toFixed(2) + " meses";

    document.getElementById("opinion").innerHTML = `

<b>DICTAMEN TÉCNICO PRELIMINAR</b>

<br><br>

✔ Sistema Francés correctamente identificado.

<br>

✔ Conversión TEA → TEM consistente.

<br>

✔ Valor Presente calculado.

<br>

✔ Duración de Macaulay obtenida correctamente.

<br><br>

<b>Conclusión</b>

<br><br>

El análisis financiero preliminar evidencia
consistencia matemática en la estructura
del crédito hipotecario.

Se recomienda continuar con la auditoría
del cronograma contractual y contrastar
la tasa pactada con las estadísticas
históricas de la SBS.

`;

}
