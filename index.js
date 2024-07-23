let länder_code = {
    "EUR" : "DE",
    "CHF" : "CH",
    "GBP" : "GB",
    "USD" : "US",
    "CAD" : "CA",
    "AUD" : "AU",
    "TRY" : "TR",
    "JPY" : "JP",
    "INR" : "IN",
    "AED" : "AE"
}

const dropListe = document.querySelectorAll(".drop-liste select"),
vonWährung = document.querySelector(".von-währung select");
zuWährung = document.querySelector(".zu-währung select");
getButton = document.querySelector("form button");


for (let i = 0; i < dropListe.length; i++) {
    for(währungsCode in länder_code){
        let optionTag = `<option value="${währungsCode}"> ${währungsCode} </option>`;

        // options tag in den select tag bekommen
        dropListe[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropListe[i].addEventListener("change", function(e){
        ladeFlagge(e.target);
    });
}

function ladeFlagge(element){
    for(code in länder_code){
        if(code == element.value){  // Falls währungscode von länderliste auch in option enthalten ist.
            let imgTag = element.parentElement.querySelector("img");  // img tag von bestimmten land auswählen

            // Ländercode in ausgewählten währungscode von img einfügen
            imgTag.src = `https://flagsapi.com/${länder_code[code]}/flat/64.png`;
        }
    }
}


getButton.addEventListener("click", function(e){
    e.preventDefault();
    getWechselrate();
});

function getWechselrate(){
    const menge = document.querySelector(".betrag input");
    let mengaValue = menge.value;

    let url = `https://v6.exchangerate-api.com/v6/ec9fca2c0e109a852c6ef063/latest/${vonWährung.value}`;

    fetch(url).then(response => response.json()).then(result => {
        let wechselRate = result.conversion_rates[zuWährung.value];
        let totalWechselRate = (mengaValue * wechselRate).toFixed(2);

        const ergebnisText = document.querySelector(".ergebnis");
        ergebnisText.innerText = `${mengaValue} ${vonWährung.value} = ${totalWechselRate} ${zuWährung.value}`;
    })
}
