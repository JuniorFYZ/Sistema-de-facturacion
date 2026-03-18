// Catalog management logic
// NOTE: verificarClave, showToast come from utils.js

// Full analysis database (same as script.js)
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

let catalogo = {};
let editandoNombre = null;

function initCatalogo() {
    cargarCatalogo();
    renderCatalogo();

    document.getElementById('buscarCatalogo').addEventListener('input', (e) => {
        renderCatalogo(e.target.value);
    });

    document.getElementById('guardarAnalisisBtn').addEventListener('click', guardarAnalisis);
    document.getElementById('cancelarEditBtn').addEventListener('click', cancelarEdicion);
}

function cargarCatalogo() {
    const saved = localStorage.getItem('catalogo');
    if (saved) {
        try {
            catalogo = JSON.parse(saved);
        } catch (e) {
            catalogo = { ...defaultAnalysisDatabase };
            localStorage.setItem('catalogo', JSON.stringify(catalogo));
        }
    } else {
        catalogo = { ...defaultAnalysisDatabase };
        localStorage.setItem('catalogo', JSON.stringify(catalogo));
    }
}

function guardarCatalogoLocal() {
    localStorage.setItem('catalogo', JSON.stringify(catalogo));
}

function renderCatalogo(filtro) {
    const tbody = document.getElementById('catalogoTableBody');
    const statsEl = document.getElementById('totalAnalisis');
    tbody.innerHTML = '';

    const nombres = Object.keys(catalogo).sort((a, b) =>
        a.localeCompare(b, 'es', { sensitivity: 'base' })
    );

    const filtrados = filtro
        ? nombres.filter(n => n.toLowerCase().includes(filtro.toLowerCase()))
        : nombres;

    statsEl.textContent = `${filtrados.length} de ${nombres.length} análisis`;

    filtrados.forEach((nombre, index) => {
        const precio = catalogo[nombre];
        const tr = document.createElement('tr');

        // Safe insertion using textContent to prevent XSS
        const tdNo = document.createElement('td');
        tdNo.textContent = index + 1;

        const tdNombre = document.createElement('td');
        tdNombre.textContent = nombre;

        const tdPrecio = document.createElement('td');
        tdPrecio.textContent = `RD$ ${precio.toLocaleString('es-DO')}`;

        const tdAcciones = document.createElement('td');
        tdAcciones.className = 'action-buttons';

        const btnEditar = document.createElement('button');
        btnEditar.className = 'btn-action btn-editar';
        btnEditar.textContent = 'Editar';
        btnEditar.onclick = () => editarAnalisis(nombre);

        const btnEliminar = document.createElement('button');
        btnEliminar.className = 'btn-action btn-eliminar';
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.onclick = () => eliminarAnalisis(nombre);

        tdAcciones.appendChild(btnEditar);
        tdAcciones.appendChild(btnEliminar);

        tr.appendChild(tdNo);
        tr.appendChild(tdNombre);
        tr.appendChild(tdPrecio);
        tr.appendChild(tdAcciones);
        tbody.appendChild(tr);
    });
}

async function guardarAnalisis() {
    const nombreInput = document.getElementById('nombreAnalisis');
    const precioInput = document.getElementById('precioAnalisis');

    const nombre = nombreInput.value.trim();
    const precio = parseFloat(precioInput.value);

    if (!nombre) {
        showToast('Ingrese el nombre del análisis', 'warning');
        return;
    }
    if (isNaN(precio) || precio <= 0) {
        showToast('Ingrese un precio válido', 'warning');
        return;
    }

    if (editandoNombre) {
        if (!await verificarClave('Ingrese la clave para modificar el catálogo:')) {
            showToast('Clave incorrecta', 'error');
            return;
        }
        if (editandoNombre !== nombre) {
            delete catalogo[editandoNombre];
        }
        catalogo[nombre] = precio;
        editandoNombre = null;
        document.getElementById('formTitle').textContent = 'Agregar Nuevo Análisis';
        document.getElementById('cancelarEditBtn').style.display = 'none';
    } else {
        if (catalogo[nombre] !== undefined) {
            if (!confirm(`"${nombre}" ya existe con precio RD$ ${catalogo[nombre]}. ¿Desea actualizar el precio?`)) {
                return;
            }
        }
        catalogo[nombre] = precio;
    }

    guardarCatalogoLocal();
    nombreInput.value = '';
    precioInput.value = '';
    renderCatalogo(document.getElementById('buscarCatalogo').value);
    showToast('Análisis guardado correctamente');
}

function editarAnalisis(nombre) {
    editandoNombre = nombre;
    document.getElementById('nombreAnalisis').value = nombre;
    document.getElementById('precioAnalisis').value = catalogo[nombre];
    document.getElementById('formTitle').textContent = 'Editando: ' + nombre;
    document.getElementById('cancelarEditBtn').style.display = 'inline-block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cancelarEdicion() {
    editandoNombre = null;
    document.getElementById('nombreAnalisis').value = '';
    document.getElementById('precioAnalisis').value = '';
    document.getElementById('formTitle').textContent = 'Agregar Nuevo Análisis';
    document.getElementById('cancelarEditBtn').style.display = 'none';
}

async function eliminarAnalisis(nombre) {
    if (!await verificarClave('Ingrese la clave para eliminar del catálogo:')) {
        showToast('Clave incorrecta', 'error');
        return;
    }
    if (confirm(`¿Está seguro de eliminar "${nombre}" del catálogo?`)) {
        delete catalogo[nombre];
        guardarCatalogoLocal();
        renderCatalogo(document.getElementById('buscarCatalogo').value);
        showToast(`"${nombre}" eliminado del catálogo`);
    }
}

document.addEventListener('DOMContentLoaded', initCatalogo);
