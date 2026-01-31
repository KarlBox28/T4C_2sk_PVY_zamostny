const formEl = document.querySelector('.main-form');
const searchFormEl = document.querySelector('.search-form');
const invoiceCode = document.getElementById('invoice-code');
const ShipSameAsBillCheckbox = document.getElementById('same');
const gdprCheckbox = document.getElementById('gdpr');
const billingAddressSection = document.getElementById('bill-addr');
const db = [];

const savedDb = localStorage.getItem('faktury');
if (savedDb) {
    db.push(...JSON.parse(savedDb));
}

console.log(db);

// Generate and set invoice code on page load
genInvoiceCode();




formEl.addEventListener('submit', (event) => {
    event.preventDefault();

    if(!gdprCheckbox.checked) {
        alert('Musíte souhlasit se zpracováním osobních údajů.');
        return;
    }

    let data = getData();

    try {
        const index = db.findIndex(f => f.id === data.id);

        if (index !== -1) {
            // Faktura existuje -> AKTUALIZUJEME
            db[index] = data;
            alert('Faktura byla aktualizována!');
        } else {
            // Faktura neexistuje -> PUSHUJEME
            db.push(data);
            alert('Faktura byla úspěšně uložena!');
        }

        // po každém uložení
        localStorage.setItem('faktury', JSON.stringify(db));

        // 3. Úklid
        formEl.reset();
        setSameAddresses()
        genInvoiceCode();

    } catch (error) {
        alert('Něco se nepovedlo!');
    }
    console.log(db);
});

ShipSameAsBillCheckbox.addEventListener('change', setSameAddresses);

billingAddressSection.addEventListener('input', () => {
    // Změníme-li se fakturační adresa a je-li zaškrtnuto "Stejná jako fakturační", musíme aktualizovat
    if (ShipSameAsBillCheckbox.checked) {
        setSameAddresses();
    }
});

searchFormEl.addEventListener('submit', (event) => {
    event.preventDefault();

    const searchInput = document.getElementById('search-invoice-code');
    const code = searchInput.value.trim();

    if (code === '') {
        alert('Zadejte kód faktury k vyhledání.');
        return;
    }

    loadInvoice(code);
    searchFormEl.reset();
});

function getData() {
    let formData = new FormData(formEl);
    let data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    data["id"] = invoiceCode.innerText;

    if (ShipSameAsBillCheckbox.checked) {
        data['dAddress'] = data['fAddress'];
        data['dCity'] = data['fCity'];
        data['dPsc'] = data['fPsc'];
    }

    console.log(data);
    return data;
}

function genInvoiceCode() {
    // FAK-YY-MM-NNNNN
    let date = new Date();

    let year = date.getFullYear().toString().slice(-2);
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let randomPart;
    let code;

    do {
        randomPart = String(Math.floor(Math.random() * 100000)).padStart(5, '0');
        code = `FAK-${year}-${month}-${randomPart}`;

    } while (db.some(invoice => invoice.id === code));

    invoiceCode.innerText = code;
}

function setSameAddresses() {
    const billStreet = document.getElementById('f-address');
    const billCity = document.getElementById('f-city');
    const billZip = document.getElementById('f-psc');

    const shipStreet = document.getElementById('d-address');
    const shipCity = document.getElementById('d-city');
    const shipZip = document.getElementById('d-psc');

    //console.log(billStreet, billCity, billZip, shipStreet, shipCity, shipZip);


    if (ShipSameAsBillCheckbox.checked) {
        // Kopírování dat
        shipStreet.value = billStreet.value;
        shipCity.value = billCity.value;
        shipZip.value = billZip.value;

        // Zakázání polí
        shipStreet.disabled = true;
        shipCity.disabled = true;
        shipZip.disabled = true;
    } else {
        // Promazání polí
        shipStreet.value = "";
        shipCity.value = "";
        shipZip.value = "";

        // Povolení polí
        shipStreet.disabled = false;
        shipCity.disabled = false;
        shipZip.disabled = false;
    }

}

function loadInvoice(code) {
    const invoice = db.find(f => f.id === code);
    if (!invoice) {
        alert('Faktura s tímto kódem neexistuje!');
        return;
    }

    // Naplnit formulář daty z faktury
    for (let key in invoice) {
        const inputEl = formEl.querySelector(`[name="${key}"]`);
        //console.log(inputEl);
        if (inputEl) {
            inputEl.value = invoice[key];
            //console.log(inputEl.value, invoice[key]);
        }
    }

    // Nastavit checkbox GDPR na true (předpokládáme, že uživatel souhlasil)
    gdprCheckbox.checked = true;

    // Nastavit checkbox "Stejná jako fakturační" podle potřeby
    if (invoice['d-address'] === invoice['f-address'] &&
        invoice['d-city'] === invoice['f-city'] &&
        invoice['d-psc'] === invoice['f-psc']) {
        ShipSameAsBillCheckbox.checked = true;
    } else {
        ShipSameAsBillCheckbox.checked = false;
    }
    setSameAddresses();

    // Nastavit kód faktury
    invoiceCode.innerText = invoice.id;

    if(invoice['delivery'] === 'DdpNaAdresu') {
        document.getElementById('dpd').checked = true;
    } else if (invoice['delivery'] === 'CeskaPosta') {
        document.getElementById('cp').checked = true;
    } else if (invoice['delivery'] === 'ZasilkovnaNaAdresu') {
        document.getElementById('zasilkovna').checked = true;
    } else {
        console.log(invoice['delivery'], 'unknown delivery method');
    }
}