// Default database of analyses and prices (fallback if no catalog in localStorage)
const defaultAnalysisDatabase = {
    "Acido Folico (Vitamina B9 / Folato)": 850,
    "Acido Valproico (Depakene / Valproato)": 900,
    "Acido Vanil Mandelico (VMA / VNA)": 1500,
    "Albumina En Orina Casual (Microalbumina en muestra aislada)": 450,
    "Albumina En Orina de 24 horas (Albuminuria 24h)": 550,
    "Albumina En Suero (Albumina Serica)": 450,
    "Alfa Feto Proteina (AFP)": 900,
    "Alfa-1 Antitripsina (A1AT)": 1500,
    "Ameba en Heces (Entamoeba histolytica / Amiba)": 500,
    "Ameba en Suero (Anticuerpos anti-Ameba)": 950,
    "Amilasa en Suero (Amilasa Serica)": 450,
    "Amonio en Sangre (Amoniaco Serico / NH3)": 900,
    "ANA (Anticuerpos Antinucleares / ANAs)": 900,
    "Androstenediona (Androgeno / A4)": 1200,
    "Anti Cyclic Citrullinated Peptide (Anti-CCP / Péptido Citrulinado)": 3000,
    "Anti DNA (Anticuerpos anti-ADN de doble cadena / anti-dsDNA)": 900,
    "Anti HBC IGG (CORE IGG / Anticuerpo Core Hepatitis B IgG)": 950,
    "Anti HBC IGM (CORE IGM / Anticuerpo Core Hepatitis B IgM)": 950,
    "Anti HBS (Anticuerpo Superficie Hepatitis B / HBsAb)": 950,
    "Anti La (SSB / Anticuerpos Anti-La)": 1400,
    "Anti TG (Anti Tiroglobulina / Anticuerpos Antitiroglobulina)": 900,
    "Anti TPO (Antimicrosomales / Peroxidasa Tiroidea)": 900,
    "Anti Trombina III (Antitrombina III / ATIII)": 1650,
    "Anticuerpo Anticardiolipinas IGA (ACA IgA)": 900,
    "Anticuerpo Anticardiolipinas IGG (ACA IgG)": 900,
    "Anticuerpo Anticardiolipinas IGM (ACA IgM)": 900,
    "Anticuerpo Antitiroideo (Panel Antitiroideo)": 1600,
    "Anticuerpo SS-A (RO / Anticuerpos Anti-Ro)": 1300,
    "Anticuerpos SS-B (LA / Anticuerpos Anti-La)": 1300,
    "Antigeno Australiano-Hepatitis B (HBS-AG / AgHBs)": 250,
    "Antigeno COVID-19 (Prueba Rapida Ag SARS-CoV-2)": 1000,
    "Antigeno de Giardia en Heces (Giardia lamblia Ag)": 1000,
    "Antigeno de Helicobacter Pylori en Heces (H. Pylori Ag Fecal)": 1100,
    "Antigeno P24 (Ag p24 VIH)": 1500,
    "Apolipoproteina A (Apo A)": 950,
    "Apolipoproteina A Y B (Apo A y Apo B)": 1500,
    "Apolipoproteina B (Apo B)": 950,
    "ASO (Antiestreptolisina O / ASTO)": 250,
    "Bilirrubina Total, Directa e Indirecta (Perfil de Bilirrubinas / Bilirrubina Fraccionada)": 450,
    "Bun (Nitrogeno Ureico en Sangre)": 250,
    "Bun en Orina (Nitrogeno Ureico en Orina)": 450,
    "Bun en Orina 24 Horas (Nitrogeno Ureico Orina 24h)": 700,
    "C.E.A / CEA (Antigeno Carcinoembrionario)": 900,
    "C3 (Complemento C3)": 650,
    "C4 (Complemento C4)": 650,
    "CA-125 (Marcador Tumoral Ovario)": 900,
    "CA-15-3 (Marcador Tumoral Mama)": 900,
    "CA-19-9 (Marcador Tumoral Pancreas/Gastrointestinal)": 900,
    "CA-27-29 (Marcador Tumoral Seno)": 3100,
    "CA-72-4 (Marcador Tumoral Gastrico)": 3300,
    "Calcio en Orina Casual (Calciuria muestra aislada)": 600,
    "Calcio en Orina de 24 Horas (Calciuria 24h)": 600,
    "Calcio en Suero (Calcio Serico / Ca)": 450,
    "Calprotectina Fecal Cuantificada": 1600,
    "Carbamazepina (Tegretol / Niveles sericos)": 950,
    "Cardiolipina IGA (Anticuerpos Anticardiolipina IgA)": 950,
    "Cardiolipina IGG (Anticuerpos Anticardiolipina IgG)": 900,
    "Cardiolipina IGM (Anticuerpos Anticardiolipina IgM)": 900,
    "Celulas Falciformes (Falcemia / Drepanocitos / Sicklemia)": 350,
    "Celulas L.E (Celulas de Lupus Eritematoso)": 650,
    "Citomegalovirus IGG (CMV IgG)": 1000,
    "Citomegalovirus IGM (CMV IgM)": 1000,
    "CK-MB (Creatina Quinasa Fraccion MB)": 650,
    "CK-MB TOTAL (CPK Total / Creatinfosfoquinasa)": 650,
    "Clamidia IGA (Chlamydia Trachomatis IgA)": 950,
    "Clamidia IGG (Chlamydia Trachomatis IgG)": 950,
    "Clamidia IGM (Chlamydia Trachomatis IgM)": 950,
    "Cloro en Orina (Cloruria)": 550,
    "Cloro en Suero (Cloremia / Cl)": 450,
    "Colesterol Total (Colesterolemia)": 250,
    "Colinesterasa Serica (Pseudocolinesterasa)": 900,
    "Coprocultivo (Cultivo de Heces)": 850,
    "Coprologico (Examen de Heces / Coproanalisis / Parasitologico)": 200,
    "Cortisol Basal en Suero A.M. (Cortisol Matutino)": 850,
    "Cortisol en Orina (Cortisol Libre en Orina 24h)": 850,
    "Cortisol Post Prandial (Cortisol Vespertino / P.M.)": 1100,
    "Creatinina (Creatinina Serica)": 250,
    "Creatinina en Orina 24 Horas (Creatinuria 24h)": 650,
    "Creatinina en Orina Casual (Creatinuria aislada)": 650,
    "Crioaglutininas (Aglutininas Frias)": 1000,
    "Crioglobulinas": 1000,
    "Cultivos (Abscesos, Nasal, Faringeo, Secreciones / Antibiograma)": 850,
    "Curva Tolerancia a la Insulina de 3h": 2500,
    "Curva Tolerancia Glucosa (PTOG / Test de O'Sullivan)": 800,
    "Depuracion de Creatinina en Orina de 24 horas (Aclaramiento de Creatinina)": 850,
    "DHEA-SO4 (Dehidroepiandrosterona Sulfato / DHEAS)": 850,
    "Digestion en Heces (Azucares reductores / Sangre Oculta / Ph)": 550,
    "Digoxina (Lanoxin / Niveles sericos)": 1300,
    "Dimero D (D-Dimer)": 1200,
    "doping (Antidoping / Prueba de Drogas de Abuso en Orina / Panel Toxicologico)": 800,
    "Electroforesis de Hemoglobina (Tipificacion de Hb / Hemoglobina S, A, C)": 950,
    "Electroforesis de Lipoproteinas (Lipidograma)": 900,
    "Electroforesis de Proteina (Proteinograma Serico)": 1200,
    "Electroforesis de Proteina en Orina de 24 horas (Proteinograma Urinario)": 1500,
    "Electrolitos (Sodio Na, Potasio K, Cloro Cl / Ionograma)": 1350,
    "Embarazo en Sangre (BHCG Cualitativa Sangre)": 250,
    "Eosinofilos en Sangre (Conteo de Eosinofilos / Moco Nasal)": 400,
    "Epamin (Difenilhidantoina / Fenitoina)": 850,
    "Epstein Barr EBNA-IGG (VEB Anti-EBNA IgG)": 950,
    "Epstein Barr EBNA-IGM (VEB Anti-EBNA IgM)": 950,
    "Epstein Barr EBV-NA-IGG": 950,
    "Epstein Barr VCA IGG (Anticuerpos Capside Viral IgG)": 950,
    "Epstein Barr VCA IGM (Anticuerpos Capside Viral IgM)": 950,
    "Eritrosedimentacion VSG (Velocidad de Sedimentacion Globular / ESR)": 250,
    "Estradiol (E2)": 800,
    "Estriol (E3)": 900,
    "Estrogenos Totales": 950,
    "Falcemia (Prueba de Sicklemia / Células Falciformes)": 350,
    "Ferritina (Ferritina Serica)": 900,
    "Fibrinogeno (Factor I)": 800,
    "Fosfatasa Alcalina (ALP / FAL)": 450,
    "Fosfolipidos": 850,
    "Fosforo en Orina 24 horas (Fosfaturia 24h)": 500,
    "Fosforo en Orina Casual (Fosfaturia aislada)": 500,
    "Fosforo en Suero (Fosfatemia / P)": 450,
    "Fructosamina (Proteina Glicada)": 800,
    "FSH (Hormona Foliculo Estimulante)": 800,
    "FTA-ABS (Prueba Confirmatoria Sifilis / Treponema)": 700,
    "Gesta-Test (Prueba de Embarazo Orina / HCG Cualitativa)": 250,
    "GGT (Gamma Glutamil Transferasa / GGTP)": 450,
    "Glicemia / Glucosa (Glucemia Basal / Azucar en Sangre)": 200,
    "Glicemia X2 (Glucosa Pre y Post Prandial / Ayuno y 2 horas)": 400,
    "Glutaraldehido (Test de Glutaraldehido)": 850,
    "Gonadotropina Corionica Cuantitativa (BHCG Cuantitativa / Fraccion Beta)": 750,
    "H-Pylori en Sangre (Anticuerpos Helicobacter Pylori IgG/IgM)": 350,
    "HBE-AC (Anticuerpo E Hepatitis B / Anti-HBe)": 850,
    "HBE-AG (Antigeno E Hepatitis B / AgHBe)": 850,
    "Hemoglobina Glucosilada (HbA1c / Hemoglobina Glicosilada)": 650,
    "Hemograma (Biometria Hematica / CBC / Conteo Sanguineo Completo)": 300,
    "Hepatitis A IGG (Anti-VHA IgG)": 850,
    "Hepatitis A IGM (Anti-VHA IgM)": 850,
    "Hepatitis C (HCV / Anticuerpos Anti-VHC)": 250,
    "Herpes IGG I (VHS-1 IgG)": 850,
    "Herpes IGG II (VHS-2 IgG)": 850,
    "Herpes IGM I (VHS-1 IgM)": 850,
    "Herpes IGM II (VHS-2 IgM)": 850,
    "Hierro (Hierro Serico / Sideremia)": 650,
    "Hierro y Captacion % Saturacion (TIBC / Indice de Saturacion de Transferrina)": 750,
    "HIV (Prueba Rapida VIH 1 y 2)": 350,
    "Homocisteina": 1600,
    "Hormona Antimulleriana (AMH / Reserva Ovarica)": 3200,
    "Hormona Crecimiento Basal (Somatotropina / GH / HGH)": 800,
    "HPV (Virus Papiloma Humano / Tipificacion VPH)": 5200,
    "HTLV I": 1100,
    "HTLV I/II (Virus Linfotropico T Humano)": 1100,
    "HTLV II": 1100,
    "IGA (Inmunoglobulina A)": 650,
    "IGE (Inmunoglobulina E / Perfil Alergico)": 750,
    "IGG (Inmunoglobulina G)": 750,
    "IGM (Inmunoglobulina M)": 650,
    "Insulina Basal (Insulinemia en Ayunas)": 900,
    "Insulina Postprandial (Insulinemia 2 horas despues de comer)": 1500,
    "K.O.H (Examen Directo por Hongos / Hidroxido de Potasio)": 750,
    "LDH (Deshidrogenasa Lactica)": 650,
    "LH (Hormona Luteinizante)": 850,
    "Lipasa (Lipasa Serica)": 450,
    "Liquidos Totales (Citoquimico de Liquidos: Cefalorraquideo, Pleural, Ascitico)": 500,
    "Litio (Litemia / Niveles Sericos)": 800,
    "Magnesio (Magnesemia / Mg)": 450,
    "Microalbumina en Orina 24 horas (Microalbuminuria 24h)": 850,
    "Microalbumina en Orina Casual (Microalbuminuria en muestra aislada)": 850,
    "Orina/Uroanalisis (Examen General de Orina / EGO / Citoquimico Orina)": 200,
    "Parathormona (PTH / Hormona Paratiroidea intacta)": 1100,
    "PCR (Proteina C Reactiva / Cualitativa)": 250,
    "PCR Cuantificado (Proteina C Reactiva Cuantitativa)": 650,
    "PCR Ultrasensible (Proteina C Reactiva de Alta Sensibilidad / hs-CRP)": 1000,
    "Peptido C": 1200,
    "Perfil Lipidico (Colesterol Total, HDL, LDL, VLDL y Trigliceridos)": 800,
    "Plaquetas (Conteo de Plaquetas / Trombocitos)": 500,
    "Plomo (Plumbemia / Niveles de Plomo en Sangre)": 1900,
    "Potasio (Kalemia / K)": 450,
    "PRO BNP (Peptido Natriuretico Cerebral / NT-proBNP)": 2700,
    "Procalcitonina (PCT)": 2750,
    "Progesterona (P4)": 850,
    "Prolactina (PRL)": 850,
    "Proteina en Suero (Proteinas Totales Sericas)": 450,
    "Proteina Totales en orina de 24 horas (Proteinuria 24h)": 750,
    "PSA Libre (Antigeno Prostatico Especifico Libre)": 650,
    "PSA TOTAL (Antigeno Prostatico Especifico Total)": 650,
    "Reticulocitos (Conteo de Reticulocitos)": 500,
    "Sangre Oculta en Heces (Test de Guayaco / Thevenon / FIT)": 250,
    "SGOT (Transaminasa Oxalacetica / AST / Aspartato Aminotransferasa)": 350,
    "SGPT (Transaminasa Piruvica / ALT / Alanina Aminotransferasa)": 350,
    "Sodio (Natremia / Na)": 450,
    "Sustancia Reductora en Heces (Azucares Reductores)": 350,
    "T3 (Triyodotironina Total)": 650,
    "T3 Libre (Triyodotironina Libre / FT3)": 650,
    "T4 (Tiroxina Total)": 650,
    "T4 Libre (Tiroxina Libre / FT4)": 650,
    "Test Coombs Indirecto (Prueba de Antiglobulina Indirecta)": 700,
    "Test de Influenza A B (Prueba Rapida Gripe A y B)": 800,
    "Testosterona (Testosterona Total)": 800,
    "Testosterona Libre": 2000,
    "Tiempo de Cuagulacion": 250,
    "Tiempo de Sangria (Tiempo de Hemorragia / Metodo de Duke o Ivy)": 250,
    "Tipificacion Sanguinea (Grupo Sanguineo y Factor Rh)": 200,
    "Tiroglobulina (Tg)": 950,
    "Toxo IGG/IGM (Toxoplasmosis IgG e IgM)": 500,
    "TP (Tiempo de Protrombina / PT)": 450,
    "TPT (Tiempo de Tromboplastina Parcial / PTT / aPTT)": 450,
    "Transferrina": 800,
    "Trigliceridos": 250,
    "Troponina I (Marcador de Infarto / TnI)": 1200,
    "TSH (Hormona Estimulante de la Tiroides / Tirotropina)": 650,
    "TT (Tiempo de Trombina)": 900,
    "Urea en Sangre (Uremia)": 250,
    "Urocultivo (Cultivo de Orina con Antibiograma)": 800,
    "Varicela IGG (Anticuerpos Varicela Zoster IgG)": 1000,
    "Varicela IGM (Anticuerpos Varicela Zoster IgM)": 1000,
    "Variante D U (Prueba de factor Rh debil / Variante Du)": 500,
    "VDRL (Prueba Sifilis / RPR / Serologia Luetica)": 250,
    "VIH (Virus Inmunodeficiencia Humana / HIV 1 y 2 / Western Blot)": 350,
    "Vitamina B12 (Cianocobalamina)": 800,
    "Vitamina D, Hydroxy Total (Vitamina D 25-OH / Colecalciferol)": 1500,
    "Zinc en Suero (Zincemia)": 1100
};

// Get analysis database from localStorage or fallback to default
function getAnalysisDatabase() {
    const saved = localStorage.getItem('catalogo');
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            return { ...defaultAnalysisDatabase };
        }
    }
    return { ...defaultAnalysisDatabase };
}

// Initialize catalog in localStorage if not present
function initCatalogIfNeeded() {
    if (!localStorage.getItem('catalogo')) {
        localStorage.setItem('catalogo', JSON.stringify(defaultAnalysisDatabase));
    }
}

// Load corporate configuration
function cargarConfiguracion() {
    const config = JSON.parse(localStorage.getItem('configuracion') || '{}');
    const printHeader = document.getElementById('printCorporateHeader');
    const printFooter = document.getElementById('printCorporateFooter');
    if (printHeader) {
        let html = '';
        if (config.rnc) html += `<p>RNC: ${config.rnc}</p>`;
        if (config.direccion) html += `<p>${config.direccion}</p>`;
        if (config.telefono) html += `<p>Tel: ${config.telefono}</p>`;
        printHeader.innerHTML = html;
    }
    if (printFooter && config.piePagina) {
        printFooter.innerHTML = `<p>${config.piePagina}</p>`;
    }
}

// NOTE: verificarClave, showToast, hashText come from utils.js

// State management

let invoiceItems = [];
let editingId = null;
let editingAbonos = [];

// DOM Elements
const clearBtn = document.getElementById('clearBtn');
const printBtn = document.getElementById('printBtn');
const saveBtn = document.getElementById('saveBtn');
const tableBody = document.getElementById('invoiceTableBody');
const subtotalAmount = document.getElementById('subtotalAmount');
const totalFinalInput = document.getElementById('totalFinalInput');
const invoiceDate = document.getElementById('invoiceDate');
const invoiceNumber = document.getElementById('invoiceNumber');
const patientName = document.getElementById('patientName');
const patientCedula = document.getElementById('patientCedula');
const patientTelefono = document.getElementById('patientTelefono');
const patientEdad = document.getElementById('patientEdad');
const analysisPanelSearch = document.getElementById('analysisPanelSearch');
const analysisPanelList = document.getElementById('analysisPanelList');
const montoPagadoInput = document.getElementById('montoPagadoInput');
const montoPendiente = document.getElementById('montoPendiente');
const abonosSection = document.getElementById('abonosSection');

// Initialize
function init() {
    initCatalogIfNeeded();

    const today = getLocalDateString();
    invoiceDate.value = today;
    const abonoFechaEl = document.getElementById('abonoFecha');
    if (abonoFechaEl) abonoFechaEl.value = today;

    invoiceNumber.value = generateInvoiceNumber();
    renderAnalysisPanel();
    cargarConfiguracion();
    poblarPacientesDatalist();

    analysisPanelSearch.addEventListener('input', filterAnalysisPanel);
    clearBtn.addEventListener('click', clearAll);
    printBtn.addEventListener('click', printInvoice);
    saveBtn.addEventListener('click', () => {
        if (!validateRequiredFields()) return;
        if (invoiceItems.length === 0) {
            showToast('No hay análisis en la factura para guardar', 'warning');
            return;
        }
        guardarFactura();
        poblarPacientesDatalist(); // refresh autocomplete after each save
        showToast('Factura guardada exitosamente en el registro');
        if (abonosSection) {
            const total = getEffectiveTotal();
            const pagado = parseFloat(montoPagadoInput.value) || 0;
            abonosSection.style.display = (editingId && total > pagado) ? 'block' : 'none';
            if (abonosSection.style.display === 'block') renderAbonos(editingAbonos);
        }
    });

    cargarFacturaParaEditar();
}

// Populate the patient datalist from localStorage
function poblarPacientesDatalist() {
    const dl = document.getElementById('pacientesDatalist');
    if (!dl) return;
    const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
    dl.innerHTML = pacientes.map(p => `<option value="${p.replace(/"/g, '&quot;')}">`).join('');
}

// Generate sequential global invoice number (FAC-XXXX)
function generateInvoiceNumber() {
    const facturas = JSON.parse(localStorage.getItem('facturas') || '[]');
    let maxNum = 0;
    facturas.forEach(f => {
        if (f.numero) {
            const match = f.numero.match(/\d+$/);
            if (match) {
                const n = parseInt(match[0], 10);
                if (n > maxNum) maxNum = n;
            }
        }
    });
    const nextNum = maxNum + 1;
    return `FAC-${nextNum.toString().padStart(4, '0')}`;
}

// Render the analysis checkbox panel
function renderAnalysisPanel() {
    const analysisDatabase = getAnalysisDatabase();
    analysisPanelList.innerHTML = '';

    const sortedNames = Object.keys(analysisDatabase).sort((a, b) =>
        a.localeCompare(b, 'es', { sensitivity: 'base' })
    );

    sortedNames.forEach(name => {
        const price = analysisDatabase[name];
        const row = document.createElement('label');
        row.className = 'panel-item';
        row.dataset.name = name.toLowerCase();

        const isChecked = invoiceItems.some(item => item.name.toLowerCase() === name.toLowerCase());

        row.innerHTML = `
            <input type="checkbox" value="${name}" ${isChecked ? 'checked' : ''}>
            <span class="panel-item-name">${name}</span>
            <span class="panel-item-price">RD$ ${price.toLocaleString('es-DO')}</span>
        `;

        const checkbox = row.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', (e) => {
            toggleAnalysis(name, price, e.target.checked);
        });

        analysisPanelList.appendChild(row);
    });
}

// Filter analysis panel by search
function filterAnalysisPanel() {
    const searchTerm = analysisPanelSearch.value.toLowerCase();
    const items = analysisPanelList.querySelectorAll('.panel-item');

    items.forEach(item => {
        const name = item.dataset.name;
        if (name.includes(searchTerm)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

// Toggle analysis in/out of the invoice
function toggleAnalysis(name, price, checked) {
    if (checked) {
        // Add if not already present
        if (!invoiceItems.some(item => item.name.toLowerCase() === name.toLowerCase())) {
            invoiceItems.push({ name: name, price: price });
        }
    } else {
        // Remove
        invoiceItems = invoiceItems.filter(item => item.name.toLowerCase() !== name.toLowerCase());
    }
    updateTable();
}

// Sync checkboxes in the panel with current invoiceItems
function syncCheckboxes() {
    const checkboxes = analysisPanelList.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
        const isInInvoice = invoiceItems.some(item => item.name.toLowerCase() === cb.value.toLowerCase());
        cb.checked = isInInvoice;
    });
}

// Update table
function updateTable() {
    tableBody.innerHTML = '';

    invoiceItems.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>RD$ ${item.price.toLocaleString('es-DO')}</td>
            <td><button class="btn-remove" onclick="removeItem(${index})">Eliminar</button></td>
        `;
        tableBody.appendChild(row);
    });

    updateTotal();
}

// Remove item
function removeItem(index) {
    invoiceItems.splice(index, 1);
    updateTable();
    syncCheckboxes();
}

// Update total
function updateTotal() {
    const subtotal = invoiceItems.reduce((sum, item) => sum + item.price, 0);
    subtotalAmount.textContent = `RD$ ${subtotal.toLocaleString('es-DO')}`;

    // Set the total final input to subtotal if user hasn't manually changed it
    if (!totalFinalInput.dataset.manuallyEdited) {
        totalFinalInput.value = subtotal > 0 ? subtotal : '';
    }
    calcularPendiente();
}

function calcularPendiente() {
    const total = getEffectiveTotal();
    const pagado = parseFloat(montoPagadoInput.value) || 0;
    const pendiente = Math.max(0, total - pagado);
    montoPendiente.textContent = `RD$ ${pendiente.toLocaleString('es-DO')}`;

    // Hide the pending row on print when balance is zero
    const pendingRow = document.getElementById('pendingRow');
    if (pendingRow) {
        if (pendiente > 0) {
            pendingRow.classList.remove('hide-on-print');
        } else {
            pendingRow.classList.add('hide-on-print');
        }
    }
}

// Listen for manual edits on total final
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('totalFinalInput').addEventListener('input', function () {
        this.dataset.manuallyEdited = 'true';
        calcularPendiente();
    });
    document.getElementById('montoPagadoInput').addEventListener('input', calcularPendiente);
});

// Get the effective total (manual or calculated)
function getEffectiveTotal() {
    const manualVal = parseFloat(totalFinalInput.value);
    if (!isNaN(manualVal) && manualVal >= 0) {
        return manualVal;
    }
    return invoiceItems.reduce((sum, item) => sum + item.price, 0);
}

// Clear all
function clearAll() {
    if (invoiceItems.length === 0) return;

    if (confirm('¿Está seguro de que desea limpiar toda la factura?')) {
        invoiceItems = [];
        editingId = null;
        editingAbonos = [];
        totalFinalInput.dataset.manuallyEdited = '';
        montoPagadoInput.value = '';
        if (patientCedula) patientCedula.value = '';
        if (patientTelefono) patientTelefono.value = '';
        if (patientEdad) patientEdad.value = '';
        if (abonosSection) abonosSection.style.display = 'none';
        const notesEl = document.getElementById('invoiceNotes');
        if (notesEl) notesEl.value = '';
        updateTable();
        syncCheckboxes();
        analysisPanelSearch.value = '';
        filterAnalysisPanel();
        patientName.value = '';
        invoiceNumber.value = generateInvoiceNumber();
    }
}

// Validate required patient fields (Nombre and Edad)
function validateRequiredFields() {
    const requiredFields = [
        { el: patientName, label: 'Nombre del paciente' },
        { el: patientEdad,  label: 'Edad del paciente'   }
    ];
    let valid = true;
    requiredFields.forEach(({ el, label }) => {
        if (!el) return;
        if (!el.value.trim()) {
            el.classList.add('field-error');
            valid = false;
        } else {
            el.classList.remove('field-error');
        }
    });
    if (!valid) {
        showToast('Los campos Nombre y Edad son obligatorios', 'error');
    }
    return valid;
}

// Clear field-error style when user starts typing
['patientName', 'patientEdad'].forEach(id => {
    document.addEventListener('DOMContentLoaded', () => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', () => el.classList.remove('field-error'));
    });
});

// Print invoice — builds professional layout into #printFactura then prints
function printInvoice() {
    if (!validateRequiredFields()) return;
    if (invoiceItems.length === 0) {
        showToast('No hay análisis en la factura', 'warning');
        return;
    }
    guardarFactura();

    const config   = JSON.parse(localStorage.getItem('configuracion') || '{}');
    const nombre   = (patientName ? patientName.value : '') || 'Sin nombre';
    const cedula   = (document.getElementById('patientCedula')  ? document.getElementById('patientCedula').value  : '') || '';
    const telefono = (document.getElementById('patientTelefono') ? document.getElementById('patientTelefono').value : '') || '';
    const edad     = (document.getElementById('patientEdad')     ? document.getElementById('patientEdad').value     : '') || '';
    const fecha    = invoiceDate ? formatFecha(invoiceDate.value) : '';
    const numFac   = invoiceNumber ? invoiceNumber.value : '';
    const totalFin = getEffectiveTotal();
    const pagado   = parseFloat(montoPagadoInput ? montoPagadoInput.value : 0) || 0;
    const pendiente = Math.max(0, totalFin - pagado);
    const notas    = (document.getElementById('invoiceNotes') ? document.getElementById('invoiceNotes').value : '').trim();

    // --- Header right: corporate contact ---
    let headerRight = '';
    if (config.rnc)       headerRight += `<div><strong>RNC:</strong> ${config.rnc}</div>`;
    if (config.telefono)  headerRight += `<div><strong>Tel:</strong> ${config.telefono}</div>`;
    if (config.direccion) headerRight += `<div>${config.direccion}</div>`;
    if (config.piePagina) headerRight += `<div style="margin-top:2px;font-style:italic;">${config.piePagina}</div>`;

    // --- Patient left column ---
    let patientRows = `<span class="pf-label">Factura a</span>
        <span class="pf-patient-name">${nombre}</span>`;
    if (cedula)   patientRows += `<br><span style="color:#555;">Cedula: ${cedula}</span>`;
    if (telefono) patientRows += `<br><span style="color:#555;">Tel: ${telefono}</span>`;

    // --- Invoice meta right column ---
    const metaRows = `
        <tr><td>Factura:</td><td>${numFac}</td></tr>
        <tr><td>Fecha:</td><td>${fecha}</td></tr>
        ${pagado >= totalFin && totalFin > 0 ? '<tr><td>Estado:</td><td style="color:green;font-weight:bold;">PAGADO</td></tr>' : ''}`;

    // --- Items ---
    const itemsRows = invoiceItems.map((item, i) => `
        <tr>
            <td class="num">${i + 1}</td>
            <td>${item.name}</td>
            <td class="right">RD$ ${item.price.toLocaleString('es-DO')}</td>
        </tr>`).join('');

    // --- Totals ---
    let totalsHtml = `
        <div class="pf-totals-row"><span>Subtotal</span><span>RD$ ${invoiceItems.reduce((s,i)=>s+i.price,0).toLocaleString('es-DO')}</span></div>
        <div class="pf-totals-row total-final"><span>TOTAL (RD$)</span><span>RD$ ${totalFin.toLocaleString('es-DO')}</span></div>
        <div class="pf-totals-row"><span>Monto Pagado</span><span>RD$ ${pagado.toLocaleString('es-DO')}</span></div>`;
    if (pendiente > 0) {
        totalsHtml += `<div class="pf-totals-row pendiente"><span>Saldo Pendiente</span><span>RD$ ${pendiente.toLocaleString('es-DO')}</span></div>`;
    }

    // --- Notes ---
    const notasHtml = notas ? `
        <div class="pf-notes">
            <strong>Observaciones</strong>
            ${notas}
        </div>` : '';

    // --- Assemble ---
    const html = `
    <div class="pf-page">
        <div class="pf-header">
            <div class="pf-header-left">
                <h1>Laboratorio Clinico Lic. Maris Polanco</h1>
                <p>Laboratorio Clinico</p>
            </div>
            <div class="pf-header-right">${headerRight || '&nbsp;'}</div>
        </div>

        <div class="pf-meta">
            <div class="pf-meta-patient">${patientRows}</div>
            <div class="pf-meta-invoice">
                <table>${metaRows}</table>
            </div>
        </div>

        <table class="pf-table">
            <thead>
                <tr>
                    <th style="width:24px;">No.</th>
                    <th>Analisis</th>
                    <th class="right">Precio (RD$)</th>
                </tr>
            </thead>
            <tbody>${itemsRows}</tbody>
        </table>

        <div class="pf-totals">
            <div class="pf-totals-inner">${totalsHtml}</div>
        </div>

        ${notasHtml}

        <div class="pf-footer">
            Gracias por su preferencia${config.piePagina ? ' — ' + config.piePagina : ''}
        </div>
    </div>`;

    const reciboAbonoDiv = document.getElementById('reciboAbonoPrint');
    if (reciboAbonoDiv) reciboAbonoDiv.innerHTML = ''; // Clear abono so it doesn't print

    const printDiv = document.getElementById('printFactura');
    printDiv.innerHTML = html;
    
    document.body.classList.add('printing-factura');
    setTimeout(() => {
        window.print();
        document.body.classList.remove('printing-factura');
    }, 100);
}

// Save invoice to LocalStorage
function guardarFactura() {
    const subtotal = invoiceItems.reduce((sum, item) => sum + item.price, 0);
    const totalFinal = getEffectiveTotal();
    const pagado = parseFloat(montoPagadoInput.value) || 0;
    const pendiente = Math.max(0, totalFinal - pagado);
    const notesEl = document.getElementById('invoiceNotes');
    const notas = notesEl ? notesEl.value.trim() : '';

    const factura = {
        id: editingId || Date.now(),
        numero: invoiceNumber.value,
        fecha: invoiceDate.value,
        paciente: patientName.value || 'Sin nombre',
        cedula: patientCedula ? patientCedula.value.trim() : '',
        telefono: patientTelefono ? patientTelefono.value.trim() : '',
        edad: patientEdad ? patientEdad.value.trim() : '',
        notas: notas,
        items: [...invoiceItems],
        total: totalFinal,
        subtotal: subtotal,
        pagado: pagado,
        pendiente: pendiente,
        abonos: editingAbonos,
        fechaCreacion: editingId ? undefined : new Date().toISOString(),
        fechaModificacion: new Date().toISOString()
    };

    let facturas = JSON.parse(localStorage.getItem('facturas') || '[]');

    if (editingId) {
        const idx = facturas.findIndex(f => f.id === editingId);
        if (idx !== -1) {
            factura.fechaCreacion = facturas[idx].fechaCreacion;
            facturas[idx] = factura;
        } else {
            factura.fechaCreacion = new Date().toISOString();
            facturas.push(factura);
        }
    } else {
        factura.fechaCreacion = new Date().toISOString();
        facturas.push(factura);
    }

    localStorage.setItem('facturas', JSON.stringify(facturas));

    // Save unique patient name
    const nombrePaciente = (patientName.value || '').trim();
    if (nombrePaciente && nombrePaciente !== 'Sin nombre') {
        const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
        if (!pacientes.includes(nombrePaciente)) {
            pacientes.push(nombrePaciente);
            pacientes.sort((a, b) => a.localeCompare(b));
            localStorage.setItem('pacientes', JSON.stringify(pacientes));
        }
    }

    editingId = factura.id;
    return factura.id;
}

// Load invoice for editing from URL params
function cargarFacturaParaEditar() {
    const params = new URLSearchParams(window.location.search);
    const editId = params.get('editar');
    if (!editId) return;

    const facturas = JSON.parse(localStorage.getItem('facturas') || '[]');
    const factura = facturas.find(f => f.id === parseInt(editId));

    if (!factura) {
        showToast('Factura no encontrada', 'error');
        return;
    }

    editingId = factura.id;
    invoiceNumber.value = factura.numero;
    invoiceDate.value = factura.fecha;
    patientName.value = factura.paciente || '';
    if (patientCedula) patientCedula.value = factura.cedula || '';
    if (patientTelefono) patientTelefono.value = factura.telefono || '';
    if (patientEdad) patientEdad.value = factura.edad || '';
    const notesEl = document.getElementById('invoiceNotes');
    if (notesEl) notesEl.value = factura.notas || '';
    invoiceItems = [...factura.items];
    editingAbonos = factura.abonos ? [...factura.abonos] : [];

    montoPagadoInput.value = factura.pagado > 0 ? factura.pagado : '';

    updateTable();
    syncCheckboxes();

    if (factura.total !== factura.subtotal && factura.subtotal !== undefined) {
        totalFinalInput.value = factura.total;
        totalFinalInput.dataset.manuallyEdited = 'true';
    }

    if (abonosSection && factura.pendiente > 0) {
        abonosSection.style.display = 'block';
        renderAbonos(editingAbonos);
    }

    if (params.get('imprimir') === '1') {
        setTimeout(() => printInvoice(), 800);
    }
}

// Register partial payment (abono)
function registrarAbono() {
    if (!editingId) {
        showToast('Guarda la factura primero antes de registrar un abono.', 'warning');
        return;
    }
    const abonoFechaEl = document.getElementById('abonoFecha');
    const abonoMontoEl = document.getElementById('abonoMonto');
    const abonoNotaEl  = document.getElementById('abonoNota');
    const fecha = abonoFechaEl ? abonoFechaEl.value : new Date().toISOString().split('T')[0];
    const monto = parseFloat(abonoMontoEl ? abonoMontoEl.value : 0);

    if (isNaN(monto) || monto <= 0) {
        showToast('Ingrese un monto válido para el abono.', 'warning');
        return;
    }
    const nota = abonoNotaEl ? abonoNotaEl.value.trim() : '';

    let facturas = JSON.parse(localStorage.getItem('facturas') || '[]');
    const idx = facturas.findIndex(f => f.id === editingId);
    if (idx === -1) return;

    if (!facturas[idx].abonos) facturas[idx].abonos = [];

    // Migrate initial payment to localStorage if it's the first time applying an abono
    if (editingAbonos.length > 0 && facturas[idx].abonos.length === 0) {
        facturas[idx].abonos = [...editingAbonos];
    }

    if (editingAbonoIndex !== null) {
        // --- EDIT MODE: update existing abono ---
        facturas[idx].abonos[editingAbonoIndex] = { fecha, monto, nota };
        showToast(`Abono #${editingAbonoIndex + 1} actualizado.`);
        cancelEditAbono();
    } else {
        // --- NEW MODE: add a new abono ---
        facturas[idx].abonos.push({ fecha, monto, nota });
        showToast(`Abono de RD$ ${monto.toLocaleString('es-DO')} registrado.`);
        if (abonoMontoEl) abonoMontoEl.value = '';
        if (abonoNotaEl) abonoNotaEl.value = '';
    }

    editingAbonos = [...facturas[idx].abonos];
    const totalPagado = editingAbonos.reduce((s, a) => s + a.monto, 0);
    facturas[idx].pagado = totalPagado;
    facturas[idx].pendiente = Math.max(0, facturas[idx].total - totalPagado);
    facturas[idx].fechaModificacion = new Date().toISOString();
    localStorage.setItem('facturas', JSON.stringify(facturas));

    montoPagadoInput.value = totalPagado;
    calcularPendiente();
    renderAbonos(editingAbonos);

    // Update the last-abono receipt button with the latest abono
    const lastAbono = editingAbonos[editingAbonos.length - 1];
    const btnRecibo = document.getElementById('btnImprimirRecibo');
    if (btnRecibo && lastAbono) {
        btnRecibo.style.display = 'inline-block';
        btnRecibo.dataset.ultimoAbono = JSON.stringify(lastAbono);
    }
}


let editingAbonoIndex = null; // null = nuevo abono, número = editar abono existente

function renderAbonos(abonos) {
    const container = document.getElementById('abonosHistorial');
    if (!container) return;
    if (!abonos || abonos.length === 0) {
        container.innerHTML = '<p style="color:#999;font-size:0.9rem;">Sin abonos registrados aún.</p>';
        return;
    }
    let html = `<table style="width:100%;font-size:0.9rem;border-collapse:collapse;margin-top:8px;">
        <thead><tr style="background:#e9ecef;">
            <th style="padding:6px 10px;text-align:left;">Fecha</th>
            <th style="padding:6px 10px;text-align:right;">Monto</th>
            <th style="padding:6px 10px;text-align:left;">Nota</th>
            <th style="padding:6px 10px;text-align:center;">Acciones</th>
        </tr></thead><tbody>`;
    abonos.forEach((a, i) => {
        html += `<tr style="border-bottom:1px solid #dee2e6;">
            <td style="padding:6px 10px;">${a.fecha}</td>
            <td style="padding:6px 10px;text-align:right;">RD$ ${a.monto.toLocaleString('es-DO')}</td>
            <td style="padding:6px 10px;">${a.nota || '—'}</td>
            <td style="padding:6px 10px;text-align:center;white-space:nowrap;">
                <button onclick="editarAbono(${i})" style="padding:3px 10px;font-size:0.8rem;cursor:pointer;background:#555;color:#fff;border:none;border-radius:4px;margin-right:4px;">✏️ Editar</button>
                <button onclick="eliminarAbono(${i})" style="padding:3px 10px;font-size:0.8rem;cursor:pointer;background:#a93226;color:#fff;border:none;border-radius:4px;">🗑️ Eliminar</button>
            </td>
        </tr>`;
    });
    html += '</tbody></table>';
    container.innerHTML = html;
}

function editarAbono(index) {
    const a = editingAbonos[index];
    if (!a) return;
    editingAbonoIndex = index;

    const abonoFechaEl = document.getElementById('abonoFecha');
    const abonoMontoEl = document.getElementById('abonoMonto');
    const abonoNotaEl  = document.getElementById('abonoNota');
    if (abonoFechaEl) abonoFechaEl.value = a.fecha;
    if (abonoMontoEl) abonoMontoEl.value = a.monto;
    if (abonoNotaEl)  abonoNotaEl.value  = a.nota || '';

    const registerBtn = document.querySelector('[onclick="registrarAbono()"]');
    if (registerBtn) {
        registerBtn.textContent = '💾 Guardar Cambios';
        registerBtn.style.background = '#856404';
        registerBtn.style.color = '#fff';
    }

    if (!document.getElementById('cancelEditAbono')) {
        const cancelBtn = document.createElement('button');
        cancelBtn.id = 'cancelEditAbono';
        cancelBtn.className = 'btn-secondary';
        cancelBtn.textContent = 'Cancelar';
        cancelBtn.onclick = cancelEditAbono;
        registerBtn && registerBtn.parentNode && registerBtn.parentNode.insertBefore(cancelBtn, registerBtn.nextSibling);
    }

    showToast(`Editando abono #${index + 1} — modifica y guarda.`, 'warning');
}

function cancelEditAbono() {
    editingAbonoIndex = null;
    const abonoFechaEl = document.getElementById('abonoFecha');
    const abonoMontoEl = document.getElementById('abonoMonto');
    const abonoNotaEl  = document.getElementById('abonoNota');
    if (abonoFechaEl) abonoFechaEl.value = '';
    if (abonoMontoEl) abonoMontoEl.value = '';
    if (abonoNotaEl)  abonoNotaEl.value  = '';

    const registerBtn = document.querySelector('[onclick="registrarAbono()"]');
    if (registerBtn) {
        registerBtn.textContent = 'Registrar Abono';
        registerBtn.style.background = '';
        registerBtn.style.color = '';
    }
    const cancelBtn = document.getElementById('cancelEditAbono');
    if (cancelBtn) cancelBtn.remove();
}

function eliminarAbono(index) {
    if (!confirm(`¿Eliminar el abono #${index + 1}? Esta acción no se puede deshacer.`)) return;

    let facturas = JSON.parse(localStorage.getItem('facturas') || '[]');
    const idx = facturas.findIndex(f => f.id === editingId);
    if (idx === -1) return;

    facturas[idx].abonos.splice(index, 1);
    editingAbonos = [...facturas[idx].abonos];

    const totalPagado = editingAbonos.reduce((s, a) => s + a.monto, 0);
    facturas[idx].pagado = totalPagado;
    facturas[idx].pendiente = Math.max(0, facturas[idx].total - totalPagado);
    facturas[idx].fechaModificacion = new Date().toISOString();
    localStorage.setItem('facturas', JSON.stringify(facturas));

    montoPagadoInput.value = totalPagado || '';
    calcularPendiente();
    renderAbonos(editingAbonos);
    showToast('Abono eliminado.', 'warning');

    if (editingAbonoIndex === index) cancelEditAbono();
}


// Print a receipt for the last registered abono
function imprimirReciboAbono() {
    const btn = document.getElementById('btnImprimirRecibo');
    if (!btn || !btn.dataset.ultimoAbono) {
        showToast('No hay abono reciente para imprimir', 'warning');
        return;
    }
    const abono = JSON.parse(btn.dataset.ultimoAbono);
    const config = JSON.parse(localStorage.getItem('configuracion') || '{}');
    const paciente = patientName ? patientName.value || 'Sin nombre' : 'Sin nombre';
    const facturaNum = invoiceNumber ? invoiceNumber.value || '' : '';
    const totalFin = getEffectiveTotal();
    const totalPagado = editingAbonos.reduce((s, a) => s + a.monto, 0);
    const pendiente = Math.max(0, totalFin - totalPagado);

    const printFacturaDiv = document.getElementById('printFactura');
    if (printFacturaDiv) printFacturaDiv.innerHTML = ''; // Clear main so it doesn't print

    const recibo = document.getElementById('reciboAbonoPrint');
    if (!recibo) return;
    
    recibo.innerHTML = `
        <div class="recibo-print-container">
            <h2 style="text-align:center; margin:0 0 4px 0;">LABORATORIO CLINICO LIC. MARIS POLANCO</h2>
            ${config.direccion ? `<p style="text-align:center;font-size:0.85em;margin:2px 0;">${config.direccion}</p>` : ''}
            ${config.telefono ? `<p style="text-align:center;font-size:0.85em;margin:2px 0;">${config.telefono}</p>` : ''}
            <hr style="margin:10px 0;">
            <h3 style="text-align:center;margin:4px 0;">RECIBO DE ABONO</h3>
            <hr style="margin:10px 0;">
            <table style="width:100%;border-collapse:collapse;font-size:0.95em;">
                <tr><td style="padding:3px 0;"><strong>Paciente:</strong></td><td>${paciente}</td></tr>
                <tr><td style="padding:3px 0;"><strong>Factura:</strong></td><td>${facturaNum}</td></tr>
                <tr><td style="padding:3px 0;"><strong>Fecha Abono:</strong></td><td>${abono.fecha}</td></tr>
                <tr><td style="padding:3px 0;"><strong>Monto Abonado:</strong></td><td><strong>RD$ ${abono.monto.toLocaleString('es-DO')}</strong></td></tr>
                <tr><td style="padding:3px 0;"><strong>Total Factura:</strong></td><td>RD$ ${totalFin.toLocaleString('es-DO')}</td></tr>
                <tr><td style="padding:3px 0;"><strong>Saldo Pendiente:</strong></td><td style="color:${pendiente>0?'#c0392b':'#27ae60'};font-weight:bold;">RD$ ${pendiente.toLocaleString('es-DO')}</td></tr>
                ${abono.nota ? `<tr><td style="padding:3px 0;"><strong>Nota:</strong></td><td>${abono.nota}</td></tr>` : ''}
            </table>
            <hr style="margin:14px 0;">
            <p style="text-align:center;font-size:0.8em;color:#555;">Este documento es un comprobante de pago parcial.</p>
        </div>`;

    document.body.classList.add('printing-factura');
    setTimeout(() => {
        window.print();
        document.body.classList.remove('printing-factura');
    }, 100);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);
