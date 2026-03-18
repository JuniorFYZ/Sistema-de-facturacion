// Reports page logic
// NOTE: showToast comes from utils.js

let allFacturas = [];
let reporteSortCol = 'numero';
let reporteSortDir = 'desc';
let listaReporteActual = [];

// ===== GASTOS =====
let allGastos = [];
let listaGastosActual = [];

// ===== ABONOS =====
let allAbonos = [];
let listaAbonosActual = [];

function initReportes() {
    cargarFacturas();
    cargarGastos();
    extraerAbonos();
    calcularResumen();
    calcularResumenGastos();
    calcularResumenAbonos();
    mostrarFacturasHoy();
    mostrarGastosHoy();
    mostrarAbonosHoy();

    const today = getLocalDateString();
    document.getElementById('fechaDesde').value = today;
    document.getElementById('fechaHasta').value = today;
    document.getElementById('gastoFecha').value = today;
    document.getElementById('gastoFechaDesde').value = today;
    document.getElementById('gastoFechaHasta').value = today;

    // Income filter listeners
    document.getElementById('filtrarBtn').addEventListener('click', () => {
        filtrarPorFechas();
        filtrarAbonosPorFechas();
        actualizarBalance();
    });
    document.getElementById('limpiarFiltroBtn').addEventListener('click', () => {
        const today = getLocalDateString();
        document.getElementById('fechaDesde').value = today;
        document.getElementById('fechaHasta').value = today;
        document.getElementById('soloPendientes').checked = false;
        mostrarFacturasHoy();
        mostrarGastosHoy();
        mostrarAbonosHoy();
        actualizarBalance();
    });
    document.getElementById('soloPendientes').addEventListener('change', () => {
        filtrarPorFechas();
        filtrarAbonosPorFechas();
        actualizarBalance();
    });
    document.getElementById('imprimirReporteBtn').addEventListener('click', () => window.print());
    document.getElementById('imprimirBNBtn').addEventListener('click', () => {
        document.body.classList.add('bw-print');
        setTimeout(() => {
            window.print();
            document.body.classList.remove('bw-print');
        }, 100);
    });

    // Expense listeners
    document.getElementById('registrarGastoBtn').addEventListener('click', registrarGasto);
    document.getElementById('filtrarGastosBtn').addEventListener('click', () => {
        filtrarGastosPorFechas();
        actualizarBalance();
    });
    document.getElementById('limpiarFiltroGastosBtn').addEventListener('click', () => {
        const today = getLocalDateString();
        document.getElementById('gastoFechaDesde').value = today;
        document.getElementById('gastoFechaHasta').value = today;
        document.getElementById('gastoSearch').value = '';
        mostrarGastosHoy();
        actualizarBalance();
    });

    const gastoSearchInput = document.getElementById('gastoSearch');
    if (gastoSearchInput) {
        gastoSearchInput.addEventListener('input', () => {
            filtrarGastosPorFechas();
            actualizarBalance();
        });
    }

    actualizarBalance();
}

// ===== INVOICE FUNCTIONS (existing) =====

function cargarFacturas() {
    allFacturas = JSON.parse(localStorage.getItem('facturas') || '[]');
}

function calcularResumen() {
    const today = new Date();
    const todayStr = getLocalDateString(today);

    const facturasHoy = allFacturas.filter(f => f.fecha === todayStr);
    const totalHoy = facturasHoy.reduce((sum, f) => sum + (f.total || 0), 0);
    document.getElementById('totalHoy').textContent = `RD$ ${totalHoy.toLocaleString('es-DO')}`;
    document.getElementById('facturasHoy').textContent = `${facturasHoy.length} factura${facturasHoy.length !== 1 ? 's' : ''}`;

    const dayOfWeek = today.getDay();
    const monday = new Date(today.getTime());
    monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    const mondayStr = getLocalDateString(monday);
    const facturasSemana = allFacturas.filter(f => f.fecha >= mondayStr && f.fecha <= todayStr);
    const totalSemana = facturasSemana.reduce((sum, f) => sum + (f.total || 0), 0);
    document.getElementById('totalSemana').textContent = `RD$ ${totalSemana.toLocaleString('es-DO')}`;
    document.getElementById('facturasSemana').textContent = `${facturasSemana.length} factura${facturasSemana.length !== 1 ? 's' : ''}`;

    const firstOfMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-01`;
    const facturasMes = allFacturas.filter(f => f.fecha >= firstOfMonth && f.fecha <= todayStr);
    const totalMes = facturasMes.reduce((sum, f) => sum + (f.total || 0), 0);
    document.getElementById('totalMes').textContent = `RD$ ${totalMes.toLocaleString('es-DO')}`;
    document.getElementById('facturasMes').textContent = `${facturasMes.length} factura${facturasMes.length !== 1 ? 's' : ''}`;

    const facturasConPendiente = allFacturas.filter(f => f.pendiente > 0);
    const totalPendiente = facturasConPendiente.reduce((sum, f) => sum + (f.pendiente || 0), 0);
    document.getElementById('totalPendienteGlobal').textContent = `RD$ ${totalPendiente.toLocaleString('es-DO')}`;
    document.getElementById('facturasPendientes').textContent = `${facturasConPendiente.length} factura${facturasConPendiente.length !== 1 ? 's' : ''} con saldo pendiente`;
}

function mostrarFacturasHoy() {
    const todayStr = getLocalDateString();
    let facturasHoy = allFacturas.filter(f => f.fecha === todayStr);

    const soloPendientes = document.getElementById('soloPendientes').checked;
    if (soloPendientes) {
        facturasHoy = facturasHoy.filter(f => f.pendiente > 0);
    }

    renderReporte(facturasHoy, 'Facturas de Hoy' + (soloPendientes ? ' (Solo Pendientes)' : ''));
}

function filtrarPorFechas() {
    const desde = document.getElementById('fechaDesde').value;
    const hasta = document.getElementById('fechaHasta').value;
    const soloPendientes = document.getElementById('soloPendientes').checked;

    if (!desde || !hasta) {
        showToast('Seleccione ambas fechas', 'warning');
        return;
    }

    let filtradas = allFacturas.filter(f => f.fecha >= desde && f.fecha <= hasta);
    if (soloPendientes) {
        filtradas = filtradas.filter(f => f.pendiente > 0);
    }

    renderReporte(filtradas, `Facturas del ${desde} al ${hasta}` + (soloPendientes ? ' (Solo Pendientes)' : ''));
}

// Sort helper
function getNumFinR(str) {
    if (!str) return -1;
    const m = str.match(/\d+$/);
    return m ? parseInt(m[0], 10) : -1;
}

function sortReporte(col) {
    if (reporteSortCol === col) {
        reporteSortDir = reporteSortDir === 'asc' ? 'desc' : 'asc';
    } else {
        reporteSortCol = col;
        reporteSortDir = 'desc';
    }
    renderReporte(listaReporteActual, null);
}

function updateReporteSortIndicators() {
    const cols = ['numero', 'fecha', 'paciente', 'total', 'pendiente'];
    const labels = { numero: 'FACTURA', fecha: 'FECHA', paciente: 'PACIENTE', total: 'TOTAL', pendiente: 'PENDIENTE' };
    cols.forEach(c => {
        const th = document.getElementById(`rth-${c}`);
        if (!th) return;
        th.textContent = labels[c] + (c === reporteSortCol ? (reporteSortDir === 'asc' ? ' ▲' : ' ▼') : '');
    });
}

function renderReporte(facturas, titulo) {
    listaReporteActual = facturas;

    const tbody = document.getElementById('reporteTableBody');
    const statsEl = document.getElementById('reporteStats');
    const totalEl = document.getElementById('totalPeriodo');
    tbody.innerHTML = '';

    // Sort
    const sorted = [...facturas].sort((a, b) => {
        let va, vb;
        switch (reporteSortCol) {
            case 'numero':   va = getNumFinR(a.numero); vb = getNumFinR(b.numero); break;
            case 'fecha':    va = a.fecha || '';        vb = b.fecha || '';         break;
            case 'paciente': va = (a.paciente || '').toLowerCase(); vb = (b.paciente || '').toLowerCase(); break;
            case 'total':    va = a.total || 0;         vb = b.total || 0;          break;
            case 'pendiente':va = a.pendiente || 0;     vb = b.pendiente || 0;      break;
            default:         va = a.id || 0;            vb = b.id || 0;
        }
        if (va < vb) return reporteSortDir === 'asc' ? -1 : 1;
        if (va > vb) return reporteSortDir === 'asc' ? 1 : -1;
        return 0;
    });

    const total = facturas.reduce((sum, f) => sum + (f.total || 0), 0);
    const totalPendiente = facturas.reduce((sum, f) => sum + (f.pendiente || 0), 0);

    if (titulo) {
        statsEl.textContent = `${titulo} — ${facturas.length} factura${facturas.length !== 1 ? 's' : ''}`;
    }
    totalEl.textContent = `RD$ ${total.toLocaleString('es-DO')}`;

    const totalPendienteEl = document.getElementById('totalPendientePeriodo');
    if (totalPendienteEl) totalPendienteEl.textContent = `RD$ ${totalPendiente.toLocaleString('es-DO')}`;

    const totalEnCaja = total - totalPendiente;
    const totalEnCajaEl = document.getElementById('totalEnCajaPeriodo');
    if (totalEnCajaEl) totalEnCajaEl.textContent = `RD$ ${totalEnCaja.toLocaleString('es-DO')}`;

    if (sorted.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:#999;padding:30px;">No hay facturas en este período</td></tr>';
        updateReporteSortIndicators();
        return;
    }

    sorted.forEach((factura, index) => {
        const tr = document.createElement('tr');
        const pendienteStr = formatPendiente(factura.pendiente);
        const enCaja = (factura.total || 0) - (factura.pendiente || 0);
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${factura.numero}</td>
            <td>${formatFecha(factura.fecha)}</td>
            <td>${factura.paciente || 'Sin nombre'}</td>
            <td>RD$ ${(factura.total || 0).toLocaleString('es-DO')}</td>
            <td style="color:#28a745;font-weight:bold;">RD$ ${enCaja.toLocaleString('es-DO')}</td>
            <td>${pendienteStr}</td>
        `;
        tbody.appendChild(tr);
    });

    updateReporteSortIndicators();
}

// ===== EXPENSE FUNCTIONS =====

function cargarGastos() {
    allGastos = JSON.parse(localStorage.getItem('gastos') || '[]');
}

function calcularResumenGastos() {
    const today = new Date();
    const todayStr = getLocalDateString(today);

    const gastosHoy = allGastos.filter(g => g.fecha === todayStr);
    const totalHoy = gastosHoy.reduce((sum, g) => sum + (g.monto || 0), 0);
    document.getElementById('gastosHoy').textContent = `RD$ ${totalHoy.toLocaleString('es-DO')}`;
    document.getElementById('gastosHoyCount').textContent = `${gastosHoy.length} gasto${gastosHoy.length !== 1 ? 's' : ''}`;

    const dayOfWeek = today.getDay();
    const monday = new Date(today.getTime());
    monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    const mondayStr = getLocalDateString(monday);
    const gastosSemana = allGastos.filter(g => g.fecha >= mondayStr && g.fecha <= todayStr);
    const totalSemana = gastosSemana.reduce((sum, g) => sum + (g.monto || 0), 0);
    document.getElementById('gastosSemana').textContent = `RD$ ${totalSemana.toLocaleString('es-DO')}`;
    document.getElementById('gastosSemanaCount').textContent = `${gastosSemana.length} gasto${gastosSemana.length !== 1 ? 's' : ''}`;

    const firstOfMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-01`;
    const gastosMes = allGastos.filter(g => g.fecha >= firstOfMonth && g.fecha <= todayStr);
    const totalMes = gastosMes.reduce((sum, g) => sum + (g.monto || 0), 0);
    document.getElementById('gastosMes').textContent = `RD$ ${totalMes.toLocaleString('es-DO')}`;
    document.getElementById('gastosMesCount').textContent = `${gastosMes.length} gasto${gastosMes.length !== 1 ? 's' : ''}`;
}

function registrarGasto() {
    const fecha = document.getElementById('gastoFecha').value;
    const descripcion = document.getElementById('gastoDescripcion').value.trim();
    const categoria = document.getElementById('gastoCategoria').value;
    const monto = parseFloat(document.getElementById('gastoMonto').value);

    if (!fecha) {
        showToast('Seleccione una fecha para el gasto', 'warning');
        return;
    }
    if (!descripcion) {
        showToast('Ingrese una descripción del gasto', 'warning');
        return;
    }
    if (isNaN(monto) || monto <= 0) {
        showToast('Ingrese un monto válido', 'warning');
        return;
    }

    const gasto = {
        id: Date.now(),
        fecha: fecha,
        descripcion: descripcion,
        categoria: categoria,
        monto: monto
    };

    allGastos.push(gasto);
    localStorage.setItem('gastos', JSON.stringify(allGastos));

    // Clear form
    document.getElementById('gastoDescripcion').value = '';
    document.getElementById('gastoMonto').value = '';

    calcularResumenGastos();
    mostrarGastosHoy();
    actualizarBalance();
    showToast(`Gasto de RD$ ${monto.toLocaleString('es-DO')} registrado`);
}

function eliminarGasto(id) {
    if (!confirm('¿Está seguro de eliminar este gasto?')) return;

    allGastos = allGastos.filter(g => g.id !== id);
    localStorage.setItem('gastos', JSON.stringify(allGastos));

    calcularResumenGastos();

    // Re-render the current view
    const desde = document.getElementById('gastoFechaDesde').value;
    const hasta = document.getElementById('gastoFechaHasta').value;
    const todayStr = getLocalDateString();

    if (desde === todayStr && hasta === todayStr) {
        mostrarGastosHoy();
    } else {
        filtrarGastosPorFechas();
    }

    actualizarBalance();
    showToast('Gasto eliminado');
}

function mostrarGastosHoy() {
    const searchEl = document.getElementById('gastoSearch');
    const query = searchEl ? searchEl.value.toLowerCase().trim() : '';
    const todayStr = getLocalDateString();
    
    let gastosHoy = allGastos.filter(g => g.fecha === todayStr);
    
    if (query) {
        gastosHoy = gastosHoy.filter(g => 
            (g.descripcion && g.descripcion.toLowerCase().includes(query)) ||
            (g.categoria && g.categoria.toLowerCase().includes(query))
        );
    }
    
    renderGastos(gastosHoy, 'Gastos de Hoy' + (query ? ` (Filtro: "${query}")` : ''));
}

function filtrarGastosPorFechas() {
    const desde = document.getElementById('gastoFechaDesde').value;
    const hasta = document.getElementById('gastoFechaHasta').value;
    const searchEl = document.getElementById('gastoSearch');
    const query = searchEl ? searchEl.value.toLowerCase().trim() : '';

    if (!desde || !hasta) {
        showToast('Seleccione ambas fechas para filtrar gastos', 'warning');
        return;
    }

    let filtrados = allGastos.filter(g => g.fecha >= desde && g.fecha <= hasta);
    
    // Apply description/category text filter
    if (query) {
        filtrados = filtrados.filter(g => 
            (g.descripcion && g.descripcion.toLowerCase().includes(query)) ||
            (g.categoria && g.categoria.toLowerCase().includes(query))
        );
    }
    
    renderGastos(filtrados, `Gastos del ${desde} al ${hasta}` + (query ? ` (Filtro: "${query}")` : ''));
}

function renderGastos(gastos, titulo) {
    listaGastosActual = gastos;

    const tbody = document.getElementById('gastosTableBody');
    const statsEl = document.getElementById('gastosStats');
    const totalEl = document.getElementById('totalGastosPeriodo');
    tbody.innerHTML = '';

    // Sort by date desc
    const sorted = [...gastos].sort((a, b) => {
        if (a.fecha < b.fecha) return 1;
        if (a.fecha > b.fecha) return -1;
        return b.id - a.id;
    });

    const total = gastos.reduce((sum, g) => sum + (g.monto || 0), 0);

    if (titulo) {
        statsEl.textContent = `${titulo} — ${gastos.length} gasto${gastos.length !== 1 ? 's' : ''}`;
    }
    totalEl.textContent = `RD$ ${total.toLocaleString('es-DO')}`;

    if (sorted.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#999;padding:30px;">No hay gastos en este período</td></tr>';
        return;
    }

    sorted.forEach((gasto, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${formatFecha(gasto.fecha)}</td>
            <td>${gasto.descripcion}</td>
            <td>${gasto.categoria}</td>
            <td style="color:#e74c3c;font-weight:bold;">RD$ ${(gasto.monto || 0).toLocaleString('es-DO')}</td>
            <td class="no-print" style="white-space:nowrap;">
                <button onclick="abrirEditModalGasto(${gasto.id})" style="padding:3px 10px;font-size:0.8rem;cursor:pointer;background:#555;color:#fff;border:none;border-radius:4px;margin-right:4px;">✏️ Editar</button>
                <button class="btn-eliminar-gasto" onclick="eliminarGasto(${gasto.id})" style="padding:3px 10px;font-size:0.8rem;cursor:pointer;background:#a93226;color:#fff;border:none;border-radius:4px;">🗑️ Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// ===== ABONOS =====

function extraerAbonos() {
    allAbonos = [];
    allFacturas.forEach(factura => {
        if (factura.abonos && factura.abonos.length > 0) {
            factura.abonos.forEach(abono => {
                allAbonos.push({
                    fecha: abono.fecha,
                    monto: abono.monto || 0,
                    nota: abono.nota || '',
                    facturaNumero: factura.numero || 'N/A',
                    paciente: factura.paciente || 'Sin nombre',
                    facturaId: factura.id
                });
            });
        }
    });
}

function calcularResumenAbonos() {
    const today = new Date();
    const todayStr = getLocalDateString(today);

    const abonosHoy = allAbonos.filter(a => a.fecha === todayStr);
    const totalHoy = abonosHoy.reduce((sum, a) => sum + a.monto, 0);
    document.getElementById('abonosHoyTotal').textContent = `RD$ ${totalHoy.toLocaleString('es-DO')}`;
    document.getElementById('abonosHoyCount').textContent = `${abonosHoy.length} abono${abonosHoy.length !== 1 ? 's' : ''}`;

    const dayOfWeek = today.getDay();
    const monday = new Date(today.getTime());
    monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    const mondayStr = getLocalDateString(monday);
    const abonosSemana = allAbonos.filter(a => a.fecha >= mondayStr && a.fecha <= todayStr);
    const totalSemana = abonosSemana.reduce((sum, a) => sum + a.monto, 0);
    document.getElementById('abonosSemanaTotal').textContent = `RD$ ${totalSemana.toLocaleString('es-DO')}`;
    document.getElementById('abonosSemanaCount').textContent = `${abonosSemana.length} abono${abonosSemana.length !== 1 ? 's' : ''}`;

    const firstOfMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-01`;
    const abonosMes = allAbonos.filter(a => a.fecha >= firstOfMonth && a.fecha <= todayStr);
    const totalMes = abonosMes.reduce((sum, a) => sum + a.monto, 0);
    document.getElementById('abonosMesTotal').textContent = `RD$ ${totalMes.toLocaleString('es-DO')}`;
    document.getElementById('abonosMesCount').textContent = `${abonosMes.length} abono${abonosMes.length !== 1 ? 's' : ''}`;
}

function mostrarAbonosHoy() {
    const todayStr = getLocalDateString();
    const abonosHoy = allAbonos.filter(a => a.fecha === todayStr);
    renderAbonosReporte(abonosHoy, 'Abonos de Hoy');
}

function filtrarAbonosPorFechas() {
    const desde = document.getElementById('fechaDesde').value;
    const hasta = document.getElementById('fechaHasta').value;

    if (!desde || !hasta) return;

    const filtrados = allAbonos.filter(a => a.fecha >= desde && a.fecha <= hasta);
    renderAbonosReporte(filtrados, `Abonos del ${desde} al ${hasta}`);
}

function renderAbonosReporte(abonos, titulo) {
    listaAbonosActual = abonos;

    const tbody = document.getElementById('abonosTableBody');
    const statsEl = document.getElementById('abonosStats');
    const totalEl = document.getElementById('totalAbonosPeriodo');
    tbody.innerHTML = '';

    // Sort by date desc
    const sorted = [...abonos].sort((a, b) => {
        if (a.fecha < b.fecha) return 1;
        if (a.fecha > b.fecha) return -1;
        return 0;
    });

    const total = abonos.reduce((sum, a) => sum + a.monto, 0);

    if (titulo) {
        statsEl.textContent = `${titulo} — ${abonos.length} abono${abonos.length !== 1 ? 's' : ''}`;
    }
    totalEl.textContent = `RD$ ${total.toLocaleString('es-DO')}`;

    if (sorted.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#999;padding:30px;">No hay abonos en este período</td></tr>';
        return;
    }

    sorted.forEach((abono, index) => {
        const allAbonosIdx = allAbonos.indexOf(abono);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${formatFecha(abono.fecha)}</td>
            <td>${abono.facturaNumero}</td>
            <td>${abono.paciente}</td>
            <td style="color:#2980b9;font-weight:bold;">RD$ ${abono.monto.toLocaleString('es-DO')}</td>
            <td>${abono.nota || '—'}</td>
            <td class="no-print" style="white-space:nowrap;">
                <button class="btn-edit-abono-r" style="padding:3px 10px;font-size:0.8rem;cursor:pointer;background:#555;color:#fff;border:none;border-radius:4px;margin-right:4px;">✏️ Editar</button>
                <button class="btn-del-abono-r" style="padding:3px 10px;font-size:0.8rem;cursor:pointer;background:#a93226;color:#fff;border:none;border-radius:4px;">🗑️ Eliminar</button>
            </td>
        `;
        tr.querySelector('.btn-edit-abono-r').addEventListener('click', () => abrirEditModalAbono(allAbonosIdx));
        tr.querySelector('.btn-del-abono-r').addEventListener('click', () => eliminarAbonoReporte(allAbonosIdx));
        tbody.appendChild(tr);
    });
}

// ===== BALANCE =====

function actualizarBalance() {
    const enCajaIngresos = listaReporteActual.reduce((sum, f) => sum + ((f.total || 0) - (f.pendiente || 0)), 0);
    const totalAbonos = listaAbonosActual.reduce((sum, a) => sum + a.monto, 0);
    const totalGastos = listaGastosActual.reduce((sum, g) => sum + (g.monto || 0), 0);
    
    // El balance neto refleja el dinero en efectivo que debería haber en caja física
    const neto = enCajaIngresos + totalAbonos - totalGastos;

    document.getElementById('balanceIngresos').textContent = `RD$ ${enCajaIngresos.toLocaleString('es-DO')}`;
    document.getElementById('balanceAbonos').textContent = `RD$ ${totalAbonos.toLocaleString('es-DO')}`;
    document.getElementById('balanceGastos').textContent = `RD$ ${totalGastos.toLocaleString('es-DO')}`;

    const netoEl = document.getElementById('balanceNeto');
    netoEl.textContent = `RD$ ${neto.toLocaleString('es-DO')}`;
    netoEl.style.color = neto >= 0 ? '#27ae60' : '#e74c3c';
}

// ===== MODAL EDICION =====

function cerrarEditModal() {
    const overlay = document.getElementById('editModalOverlay');
    if (overlay) overlay.style.display = 'none';
}

function abrirEditModal(title, fieldsHtml, onSave) {
    document.getElementById('editModalTitle').textContent = title;
    document.getElementById('editModalFields').innerHTML = fieldsHtml;
    document.getElementById('editModalSaveBtn').onclick = onSave;
    const overlay = document.getElementById('editModalOverlay');
    overlay.style.display = 'flex';
}

// Close modal when clicking the backdrop
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('editModalOverlay').addEventListener('click', (e) => {
        if (e.target.id === 'editModalOverlay') cerrarEditModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') cerrarEditModal();
    });
});

// --- EDITAR ABONO (desde Reportes) ---
function abrirEditModalAbono(abonoIdx) {
    const abono = allAbonos[abonoIdx];
    if (!abono) { showToast('Abono no encontrado', 'error'); return; }

    const fieldsHtml = `
        <div class="input-group" style="margin-bottom:12px;">
            <label for="emFecha">Fecha:</label>
            <input type="date" id="emFecha" value="${abono.fecha}">
        </div>
        <div class="input-group" style="margin-bottom:12px;">
            <label for="emMonto">Monto (RD$):</label>
            <input type="number" id="emMonto" value="${abono.monto}" min="0" step="1">
        </div>
        <div class="input-group">
            <label for="emNota">Nota:</label>
            <input type="text" id="emNota" value="${(abono.nota || '').replace(/"/g, '&quot;')}" placeholder="Opcional">
        </div>`;

    abrirEditModal('✏️ Editar Abono', fieldsHtml, () => {
        const nuevaFecha = document.getElementById('emFecha').value;
        const nuevoMonto = parseFloat(document.getElementById('emMonto').value);
        const nuevaNota  = document.getElementById('emNota').value.trim();

        if (!nuevaFecha || isNaN(nuevoMonto) || nuevoMonto <= 0) {
            showToast('Complete todos los campos correctamente', 'warning');
            return;
        }

        let facturas = JSON.parse(localStorage.getItem('facturas') || '[]');
        const fIdx = facturas.findIndex(f => f.id === abono.facturaId);
        if (fIdx === -1) { showToast('Factura no encontrada', 'error'); return; }

        const aIdx = facturas[fIdx].abonos.findIndex(a => a.fecha === abono.fecha && a.monto === abono.monto);
        if (aIdx === -1) { showToast('Abono no encontrado en la factura', 'error'); return; }

        facturas[fIdx].abonos[aIdx] = { fecha: nuevaFecha, monto: nuevoMonto, nota: nuevaNota };

        const totalPagado = facturas[fIdx].abonos.reduce((s, a) => s + a.monto, 0);
        facturas[fIdx].pagado = totalPagado;
        facturas[fIdx].pendiente = Math.max(0, facturas[fIdx].total - totalPagado);
        facturas[fIdx].fechaModificacion = new Date().toISOString();
        localStorage.setItem('facturas', JSON.stringify(facturas));

        cerrarEditModal();
        cargarFacturas();
        extraerAbonos();
        calcularResumen();
        calcularResumenAbonos();
        filtrarAbonosPorFechas();
        filtrarPorFechas();
        actualizarBalance();
        showToast('Abono actualizado correctamente');
    });
}

// --- ELIMINAR ABONO (desde Reportes) ---
function eliminarAbonoReporte(abonoIdx) {
    const abono = allAbonos[abonoIdx];
    if (!abono) return;
    if (!confirm('¿Eliminar este abono? Esta acción no se puede deshacer.')) return;

    let facturas = JSON.parse(localStorage.getItem('facturas') || '[]');
    const fIdx = facturas.findIndex(f => f.id === abono.facturaId);
    if (fIdx === -1) return;

    const aIdx = facturas[fIdx].abonos.findIndex(a => a.fecha === abono.fecha && a.monto === abono.monto);
    if (aIdx === -1) return;

    facturas[fIdx].abonos.splice(aIdx, 1);
    const totalPagado = facturas[fIdx].abonos.reduce((s, a) => s + a.monto, 0);
    facturas[fIdx].pagado = totalPagado;
    facturas[fIdx].pendiente = Math.max(0, facturas[fIdx].total - totalPagado);
    facturas[fIdx].fechaModificacion = new Date().toISOString();
    localStorage.setItem('facturas', JSON.stringify(facturas));

    cargarFacturas();
    extraerAbonos();
    calcularResumen();
    calcularResumenAbonos();
    filtrarAbonosPorFechas();
    filtrarPorFechas();
    actualizarBalance();
    showToast('Abono eliminado.', 'warning');
}

// --- EDITAR GASTO (desde Reportes) ---
function abrirEditModalGasto(gastoId) {
    const gasto = allGastos.find(g => g.id === gastoId);
    if (!gasto) { showToast('Gasto no encontrado', 'error'); return; }

    const categoriasOpts = ['Materiales','Servicios','Personal','Transporte','Alquiler','Mantenimiento','Otros']
        .map(c => `<option value="${c}" ${gasto.categoria === c ? 'selected' : ''}>${c}</option>`).join('');

    const fieldsHtml = `
        <div class="input-group" style="margin-bottom:12px;">
            <label for="egFecha">Fecha:</label>
            <input type="date" id="egFecha" value="${gasto.fecha}">
        </div>
        <div class="input-group" style="margin-bottom:12px;">
            <label for="egDescripcion">Descripción:</label>
            <input type="text" id="egDescripcion" value="${gasto.descripcion}">
        </div>
        <div class="input-group" style="margin-bottom:12px;">
            <label for="egCategoria">Categoría:</label>
            <select id="egCategoria">${categoriasOpts}</select>
        </div>
        <div class="input-group">
            <label for="egMonto">Monto (RD$):</label>
            <input type="number" id="egMonto" value="${gasto.monto}" min="0" step="1">
        </div>`;

    abrirEditModal('✏️ Editar Gasto', fieldsHtml, () => {
        const nuevaFecha  = document.getElementById('egFecha').value;
        const nuevaDesc   = document.getElementById('egDescripcion').value.trim();
        const nuevaCat    = document.getElementById('egCategoria').value;
        const nuevoMonto  = parseFloat(document.getElementById('egMonto').value);

        if (!nuevaFecha || !nuevaDesc || isNaN(nuevoMonto) || nuevoMonto <= 0) {
            showToast('Complete todos los campos correctamente', 'warning');
            return;
        }

        const idx = allGastos.findIndex(g => g.id === gastoId);
        if (idx === -1) return;
        allGastos[idx] = { ...allGastos[idx], fecha: nuevaFecha, descripcion: nuevaDesc, categoria: nuevaCat, monto: nuevoMonto };
        localStorage.setItem('gastos', JSON.stringify(allGastos));

        cerrarEditModal();
        calcularResumenGastos();
        filtrarGastosPorFechas();
        actualizarBalance();
        showToast('Gasto actualizado correctamente');
    });
}

document.addEventListener('DOMContentLoaded', initReportes);
