// ==============================================
// CRONOGRAMA DE AMORTIZACIÓN
// Hipoteca Financial Auditor Enterprise
// ==============================================

function generarCronograma(capital, tea, plazo){

    const tem = Math.pow(1 + tea/100, 1/12) - 1;

    const cuota =
        capital *
        ((tem * Math.pow(1+tem, plazo)) /
        (Math.pow(1+tem, plazo)-1));

    let saldo = capital;

    let html = `
    <table class="tabla">
        <thead>
            <tr>
                <th>Cuota</th>
                <th>Interés</th>
                <th>Amortización</th>
                <th>Saldo</th>
            </tr>
        </thead>
        <tbody>
    `;

    for(let i=1;i<=plazo;i++){

        let interes = saldo * tem;

        let amortizacion = cuota - interes;

        saldo -= amortizacion;

        if(saldo<0){
            saldo=0;
        }

        html += `
        <tr>
            <td>${i}</td>
            <td>S/ ${interes.toLocaleString("es-PE",{minimumFractionDigits:2})}</td>
            <td>S/ ${amortizacion.toLocaleString("es-PE",{minimumFractionDigits:2})}</td>
            <td>S/ ${saldo.toLocaleString("es-PE",{minimumFractionDigits:2})}</td>
        </tr>`;
    }

    html += `
        </tbody>
    </table>
    `;

    return html;

}
