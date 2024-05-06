let number = 0;

function processNumber() {
    // "Připraví" číslo na použití v generátoru
    number = document.getElementById("numberInput").value;
    number = parseFloat(number);
}

// Tohle ani nemusím vysvětlovat
function reload_page() {
    location.reload();
}

document.addEventListener("DOMContentLoaded", function () {
    // Listy žáků musí mít stejný počet položek
    const students1 = ["Bouzková Klára", "Březíková Diana", "Dulanská Petra", "Hanáková Barbora", "Hausnerová Zuzana", "Hrazdirová Anna", "Hronková Hana", "Ledvinová Barbora", "Markovičová Laura", "Příkopová Veronika", "Slezáková Alžběta", "Štěpaníková Laura", "Theiberová Eliška", "Tomišková Ester", "Zemanová Natalie"];
    const students2 = ["Dostal Radim", "Gajdušek Adam", "Galanda Milan", "Jaroš David", "Kadláček Jan", "Martinec Filip", "Mihola Lukáš", "Palčík Tibor", "Podstrelený František", "Skařupa David", "Škrabal Marek", "Zborek Michael", "Žydel Daniel", "Nikdo", "Nikdo"];
    const tdElements = document.querySelectorAll("td");
    const fillTableButton = document.getElementById("fillTableButton");
    const downloadTableButton = document.getElementById("downloadTableButton");
    let spusteno = false;

    // Generátor náhodných čísel
    // Nahradit něčím co aspoň vypadá náhodně
    // Nechce se mi to řešit, ale je to zatím ten největší problém
    function rand(input,poradi) {
        cache = input + poradi;
        for (let i = 0;i < 2000;i++) {
            cache = (7 + cache * (3 + cache)) % 1001;
        }
        return cache;
    }
    

    // Funkce pro náhodné promíchání pole
    function shuffleArray(array,poradi) {
        for (let i = array.length - 1; i > 0; i--) {
            // Nevím jestli je řádek 38 správně
            const j = rand(number + i + poradi) % array.length;
            [array[i], array[j]] = [array[j], array[i]];
        }
        
    }

    // Funkce pro naplnění tabulky
    function fillTable() {
        // Pokud už byl zasedací pořádek jednou vygenerován, tak se musí stránka obnovit
        if (spusteno) location.reload();
        spusteno = true;

        // Zamíchá obě pole
        shuffleArray(students1, 1);
        shuffleArray(students2, 2);
    
        // Zkontrolujte, zda je pole students1 stejně dlouhé jako students2 a jestli je jejich součet roven počtu prvků v tdElements a pak je doplní do tabulky
        if (students1.length === students2.length) {
            let soucet = students1.length + students2.length;    
            if (soucet === tdElements.length) {
                for (let i = 0; i < soucet; i++) {
                    if (i % 2 === 0) {
                        tdElements[i].textContent = students1[i / 2];
                    } else {
                        tdElements[i].textContent = students2[(i - 1) / 2];
                    }
                }
            } else {
                alert("Chyba: Počet studentů se neshoduje s počtem prvků v tabulce.");
            }
        } else {
            alert("Jeden list je větší než druhý");
        }
        
    }

    // Funkce pro stáhnutí obsahu tabulky do souboru
    function downloadTable() {
        const tableContent = Array.from(tdElements).map(td => td.textContent).join("\t");
        const blob = new Blob([tableContent], { type: "text/plain" });
        const link = document.createElement("a");

        link.href = URL.createObjectURL(blob);
        link.download = "tabulka.txt";
        link.click();
    }

    // Přiřazení funkcí k tlačítkům
    fillTableButton.addEventListener("click", fillTable);
    downloadTableButton.addEventListener("click", downloadTable);
});
