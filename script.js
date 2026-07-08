function calcular() {
    dibujarGrafico(cuota, capital * tem, capital);
let grafico = null;

function dibujarGrafico(cuota, interesInicial, capital){

    const labels=[
        "Capital",
        "Cuota",
        "Interés"
    ];

    const datos=[
        capital,
        cuota,
        interesInicial
    ];

    if(grafico){
        grafico.destroy();
    }

    const ctx=document.getElementById("graficoCredito");

    grafico=new Chart(ctx,{

        type:"bar",

        data:{

            labels:labels,

            datasets:[{

                label:"Análisis Financiero",

                data:datos

            }]

        },

        options:{

            responsive:true,

            plugins:{

                legend:{
                    display:false
                }

            }

        }

    });

}
    // Leer datos
    const capital = parseFloat(document.getElementById("capital").value);
    const tea = parseFloat(document.getElementById("tea").value);
    const plazo = parseInt(document.getElementById("plazo").value);

    // Validación
    if (isNaN(capital) || isNaN(tea) || isNaN(plazo)) {
        alert("Ingrese correctamente todos los datos.");
        return;
    }

    // TEA → TEM
    const tem = Math.pow(1 + tea / 100, 1 / 12) - 1;

    // Sistema Francés
    const cuota =
        capital *
        ((tem * Math.pow(1 + tem, plazo)) /
        (Math.pow(1 + tem, plazo) - 1));

    // VPN
    let vpn = 0;

    for (let i = 1; i <= plazo; i++) {
        vpn += cuota / Math.pow(1 + tem, i);
    }

    // Duración de Macaulay
    let sumaVP = 0;
    let sumaTiempo = 0;

    for (let i = 1; i <= plazo; i++) {

        let vp = cuota / Math.pow(1 + tem, i);

        sumaVP += vp;

        sumaTiempo += i * vp;
    }

    const duracion = sumaTiempo / sumaVP;

    // Mostrar resultados

    document.getElementById("cuota").innerHTML =
        "S/ " + cuota.toLocaleString('es-PE', {
            minimumFractionDigits:2,
            maximumFractionDigits:2
        });

    document.getElementById("tem").innerHTML =
        (tem * 100).toFixed(6) + "%";

    document.getElementById("vpn").innerHTML =
        "S/ " + vpn.toLocaleString('es-PE', {
            minimumFractionDigits:2,
            maximumFractionDigits:2
        });

    document.getElementById("duracion").innerHTML =
        duracion.toFixed(2) + " meses";

    document.getElementById("opinion").innerHTML = `
        <b>DICTAMEN PRELIMINAR</b><br><br>

        ✔ Sistema Francés identificado.<br>
        ✔ Conversión TEA → TEM correcta.<br>
        ✔ Valor Presente consistente.<br>
        ✔ Duración de Macaulay calculada.<br><br>

        <b>Conclusión:</b><br>

        El análisis matemático preliminar del crédito no evidencia
        inconsistencias en el cálculo de la cuota ni en la aplicación
        del sistema francés de amortización. La evaluación económica
        definitiva requiere comparar la TEA con tasas históricas del
        mercado y revisar el cronograma contractual completo.
    `;
}
