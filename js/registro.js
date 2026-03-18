// Registry page logic
// NOTE: verificarClave, showToast come from utils.js

// ---- Delivery state helpers ----
function getEntregas() {
    return JSON.parse(localStorage.getItem('entregas') || '{}');
}

function setEntrega(id, value) {
    // value: true = entregado, false = no entregado, null = sin marcar
    const entregas = getEntregas();
    entregas[id] = value;
    localStorage.setItem('entregas', JSON.stringify(entregas));
}

let allFacturas = [];
let listaFiltrada = [];
let paginaActual = 1;
const POR_PAGINA = 50;
let sortCol = 'numero';
let sortDir = 'desc';

// Initialize
function initRegistro() {
    cargarFacturas();

    document.getElementById('buscarFactura').addEventListener('input', (e) => {
        paginaActual = 1;
        aplicarFiltros();
    });
    document.getElementById('soloRegistroPendientes').addEventListener('change', () => {
        paginaActual = 1;
        aplicarFiltros();
    });
}

// Load all invoices from LocalStorage
function cargarFacturas() {
    allFacturas = JSON.parse(localStorage.getItem('facturas') || '[]');
    paginaActual = 1;
    aplicarFiltros();
}

// Apply search + pending filter
function aplicarFiltros() {
    const q = document.getElementById('buscarFactura').value.toLowerCase().trim();
    const soloPendientes = document.getElementById('soloRegistroPendientes').checked;
    let lista = allFacturas;
    if (q) {
        lista = lista.filter(f =>
            (f.numero && f.numero.toLowerCase().includes(q)) ||
            (f.fecha && f.fecha.includes(q)) ||
            (f.paciente && f.paciente.toLowerCase().includes(q)) ||
            (f.cedula && f.cedula.toLowerCase().includes(q))
        );
    }
    if (soloPendientes) {
        lista = lista.filter(f => (f.pendiente || 0) > 0);
    }
    renderFacturas(lista);
}

// Sort helper
function getNumFin(str) {
    if (!str) return -1;
    const m = str.match(/\d+$/);
    return m ? parseInt(m[0], 10) : -1;
}

// Render invoices in the table with sorting + pagination
function renderFacturas(facturas) {
    listaFiltrada = facturas;

    // --- Sort ---
    const sorted = [...facturas].sort((a, b) => {
        let va, vb;
        switch (sortCol) {
            case 'numero':   va = getNumFin(a.numero); vb = getNumFin(b.numero); break;
            case 'fecha':    va = a.fecha || '';        vb = b.fecha || '';       break;
            case 'paciente': va = (a.paciente || '').toLowerCase(); vb = (b.paciente || '').toLowerCase(); break;
            case 'total':    va = a.total || 0;         vb = b.total || 0;        break;
            case 'pendiente':va = a.pendiente || 0;     vb = b.pendiente || 0;    break;
            default:         va = a.id || 0;            vb = b.id || 0;
        }
        if (va < vb) return sortDir === 'asc' ? -1 : 1;
        if (va > vb) return sortDir === 'asc' ? 1 : -1;
        return 0;
    });

    // --- Pagination ---
    const totalPages = Math.max(1, Math.ceil(sorted.length / POR_PAGINA));
    if (paginaActual > totalPages) paginaActual = totalPages;
    const start = (paginaActual - 1) * POR_PAGINA;
    const paged = sorted.slice(start, start + POR_PAGINA);

    const paginaCtrl = document.getElementById('paginacionControls');
    const paginaInfo = document.getElementById('paginaInfo');
    if (sorted.length > POR_PAGINA) {
        paginaCtrl.style.display = 'flex';
        paginaInfo.textContent = `Página ${paginaActual} de ${totalPages}`;
        document.getElementById('btnAnterior').disabled = paginaActual === 1;
        document.getElementById('btnSiguiente').disabled = paginaActual === totalPages;
    } else {
        paginaCtrl.style.display = 'none';
    }

    // --- Render ---
    const tbody = document.getElementById('registroTableBody');
    const emptyState = document.getElementById('emptyState');
    const tableContainer = document.querySelector('.table-container');
    const statsEl = document.getElementById('totalFacturas');

    tbody.innerHTML = '';

    if (facturas.length === 0) {
        tableContainer.style.display = 'none';
        emptyState.style.display = 'block';
        statsEl.textContent = '0 facturas';
        paginaCtrl.style.display = 'none';
        updateSortIndicators();
        return;
    }

    tableContainer.style.display = 'block';
    emptyState.style.display = 'none';
    statsEl.textContent = `${facturas.length} factura${facturas.length !== 1 ? 's' : ''}`;

    const entregas = getEntregas();

    paged.forEach((factura, index) => {
        const tr = document.createElement('tr');
        const fechaDisplay = formatFecha(factura.fecha);
        const pendienteStr = formatPendiente(factura.pendiente);

        const entregaVal = entregas[factura.id]; // true | false | undefined
        const chkEntregado    = entregaVal === true  ? 'checked' : '';
        const chkNoEntregado  = entregaVal === false ? 'checked' : '';

        tr.innerHTML = `
            <td>${start + index + 1}</td>
            <td>${factura.numero}</td>
            <td>${fechaDisplay}</td>
            <td>${factura.paciente || 'Sin nombre'}</td>
            <td>RD$ ${factura.total.toLocaleString('es-DO')}</td>
            <td>${pendienteStr}</td>
            <td class="delivery-checkbox">
                <input type="checkbox" data-id="${factura.id}" data-tipo="entregado"
                    ${chkEntregado}
                    title="Entregado">
            </td>
            <td class="delivery-checkbox">
                <input type="checkbox" data-id="${factura.id}" data-tipo="no-entregado"
                    ${chkNoEntregado}
                    title="No Entregado">
            </td>
            <td class="action-buttons">
                <button class="btn-action btn-ver" onclick="verFactura(${factura.id})" title="Ver detalle"> Ver</button>
                <button class="btn-action btn-editar" onclick="editarFactura(${factura.id})" title="Editar factura">Editar</button>
                <button class="btn-action btn-eliminar" onclick="eliminarFactura(${factura.id})" title="Eliminar factura">Eliminar</button>
            </td>
        `;

        // Wire delivery checkboxes (mutually exclusive)
        const cbEntregado   = tr.querySelector('[data-tipo="entregado"]');
        const cbNoEntregado = tr.querySelector('[data-tipo="no-entregado"]');

        cbEntregado.addEventListener('change', () => {
            if (cbEntregado.checked) {
                cbNoEntregado.checked = false;
                setEntrega(factura.id, true);
            } else {
                setEntrega(factura.id, null);
            }
        });

        cbNoEntregado.addEventListener('change', () => {
            if (cbNoEntregado.checked) {
                cbEntregado.checked = false;
                setEntrega(factura.id, false);
            } else {
                setEntrega(factura.id, null);
            }
        });

        tbody.appendChild(tr);
    });

    // --- Footer totals (across all visible, not just paged) ---
    const totalSum = facturas.reduce((s, f) => s + (f.total || 0), 0);
    const pendienteSum = facturas.reduce((s, f) => s + (f.pendiente || 0), 0);
    const tfoot = document.getElementById('registroTfoot');
    if (tfoot && facturas.length > 0) {
        tfoot.style.display = '';
        document.getElementById('registroTotalSum').textContent = `RD$ ${totalSum.toLocaleString('es-DO')}`;
        const pEl = document.getElementById('registroPendienteSum');
        if (pendienteSum > 0) {
            pEl.innerHTML = `<span style="color:#d9534f;">RD$ ${pendienteSum.toLocaleString('es-DO')}</span>`;
        } else {
            pEl.innerHTML = `<span style="color:#bbb;">—</span>`;
        }
    } else if (tfoot) {
        tfoot.style.display = 'none';
    }

    updateSortIndicators();
}

// Column sorting
function sortBy(col) {
    if (sortCol === col) {
        sortDir = sortDir === 'asc' ? 'desc' : 'asc';
    } else {
        sortCol = col;
        sortDir = 'desc';
    }
    paginaActual = 1;
    renderFacturas(listaFiltrada);
}

function updateSortIndicators() {
    const cols = ['numero', 'fecha', 'paciente', 'total', 'pendiente'];
    const labels = { numero: 'FACTURA', fecha: 'FECHA', paciente: 'PACIENTE', total: 'TOTAL', pendiente: 'PENDIENTE' };
    cols.forEach(c => {
        const th = document.getElementById(`th-${c}`);
        if (!th) return;
        th.textContent = labels[c] + (c === sortCol ? (sortDir === 'asc' ? ' ▲' : ' ▼') : '');
    });
}

// Pagination navigation
function cambiarPagina(delta) {
    paginaActual += delta;
    renderFacturas(listaFiltrada);
}

// Search/filter
function buscarFacturas(query) {
    if (!query.trim()) {
        renderFacturas(allFacturas);
        return;
    }
    const q = query.toLowerCase();
    const filtered = allFacturas.filter(f =>
        (f.numero && f.numero.toLowerCase().includes(q)) ||
        (f.fecha && f.fecha.includes(q)) ||
        (f.paciente && f.paciente.toLowerCase().includes(q)) ||
        (f.cedula && f.cedula.toLowerCase().includes(q))
    );
    renderFacturas(filtered);
}

// View invoice details in modal
function verFactura(id) {
    const factura = allFacturas.find(f => f.id === id);
    if (!factura) return;

    document.getElementById('modalTitle').textContent = `Factura ${factura.numero}`;
    document.getElementById('modalPaciente').textContent = factura.paciente || 'Sin nombre';
    document.getElementById('modalCedula').textContent   = factura.cedula   || '—';
    document.getElementById('modalTelefono').textContent = factura.telefono || '—';
    document.getElementById('modalEdad').textContent     = factura.edad     || '—';
    document.getElementById('modalFecha').textContent    = factura.fecha    || 'Sin fecha';
    document.getElementById('modalNumero').textContent   = factura.numero;
    document.getElementById('modalTotal').textContent    = `RD$ ${(factura.total || 0).toLocaleString('es-DO')}`;
    document.getElementById('modalPagado').textContent   = `RD$ ${(factura.pagado || 0).toLocaleString('es-DO')}`;

    const modalPendienteEl = document.getElementById('modalPendiente');
    if (modalPendienteEl) {
        modalPendienteEl.textContent = `RD$ ${(factura.pendiente || 0).toLocaleString('es-DO')}`;
        modalPendienteEl.style.color = factura.pendiente > 0 ? '#d9534f' : 'inherit';
        modalPendienteEl.style.fontWeight = factura.pendiente > 0 ? 'bold' : 'normal';
    }

    // Abonos history + notas
    const modalAbonos = document.getElementById('modalAbonos');
    if (modalAbonos) {
        let extraHtml = '';
        if (factura.notas) {
            extraHtml += `<p style="margin:8px 0 4px;font-weight:bold;color:#495057;">Observaciones:</p><p style="font-size:0.9em;color:#555;margin:0 0 10px;background:#f8f9fa;padding:6px 10px;border-radius:4px;">${factura.notas}</p>`;
        }
        if (factura.abonos && factura.abonos.length > 0) {
            let html = `<p style="font-weight:bold; margin-bottom:5px; color:#495057;">Historial de Abonos:</p><table style="width:100%;font-size:0.88rem;border-collapse:collapse;"><thead><tr style="background:#f1f3f5;"><th style="padding:5px 8px;text-align:left;">Fecha</th><th style="padding:5px 8px;text-align:right;">Monto</th><th style="padding:5px 8px;text-align:left;">Nota</th></tr></thead><tbody>`;
            factura.abonos.forEach(a => {
                html += `<tr style="border-bottom:1px solid #eee;"><td style="padding:5px 8px;">${a.fecha}</td><td style="padding:5px 8px;text-align:right;">RD$ ${a.monto.toLocaleString('es-DO')}</td><td style="padding:5px 8px;">${a.nota || '—'}</td></tr>`;
            });
            html += '</tbody></table>';
            extraHtml += html;
        }
        modalAbonos.innerHTML = extraHtml;
    }

    // Items table
    const tbody = document.getElementById('modalTableBody');
    tbody.innerHTML = '';
    factura.items.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${index + 1}</td><td>${item.name}</td><td>RD$ ${item.price.toLocaleString('es-DO')}</td>`;
        tbody.appendChild(tr);
    });

    // Buttons
    document.getElementById('modalEditBtn').onclick = () => editarFactura(id);
    document.getElementById('modalRePrintBtn').onclick = () => {
        window.location.href = `../index.html?editar=${id}&imprimir=1`;
    };

    document.getElementById('modalOverlay').style.display = 'flex';
}

// Close modal
function cerrarModal() {
    document.getElementById('modalOverlay').style.display = 'none';
}

// Edit invoice
function editarFactura(id) {
    window.location.href = `../index.html?editar=${id}`;
}

// Delete invoice
async function eliminarFactura(id) {
    if (!await verificarClave('Ingrese la clave para eliminar la factura:')) {
        showToast('Clave incorrecta', 'error');
        return;
    }
    const factura = allFacturas.find(f => f.id === id);
    const nombre = factura ? factura.numero : '';

    if (confirm(`¿Está segura de eliminar la factura ${nombre}?\n\nEsta acción no se puede deshacer.`)) {
        let facturas = JSON.parse(localStorage.getItem('facturas') || '[]');
        facturas = facturas.filter(f => f.id !== id);
        localStorage.setItem('facturas', JSON.stringify(facturas));
        showToast(`Factura ${nombre} eliminada`);
        cargarFacturas();
    }
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
    if (e.target.id === 'modalOverlay') cerrarModal();
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrarModal();
});

document.addEventListener('DOMContentLoaded', initRegistro);
