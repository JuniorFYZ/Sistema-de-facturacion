// Configuration page logic
// NOTE: verificarClave, showToast, hashText come from utils.js

function initConfiguracion() {
    cargarConfigActual();
    actualizarEstadoClave();

    document.getElementById('guardarConfigBtn').addEventListener('click', guardarConfiguracion);
    document.getElementById('guardarClaveBtn').addEventListener('click', guardarClave);
    document.getElementById('quitarClaveBtn').addEventListener('click', quitarClave);
    document.getElementById('exportarBtn').addEventListener('click', exportarDatos);
    document.getElementById('importarInput').addEventListener('change', importarDatos);
}

function cargarConfigActual() {
    const config = JSON.parse(localStorage.getItem('configuracion') || '{}');
    document.getElementById('configRNC').value = config.rnc || '';
    document.getElementById('configTelefono').value = config.telefono || '';
    document.getElementById('configDireccion').value = config.direccion || '';
    document.getElementById('configPiePagina').value = config.piePagina || '';
}

function guardarConfiguracion() {
    const config = {
        rnc: document.getElementById('configRNC').value.trim(),
        telefono: document.getElementById('configTelefono').value.trim(),
        direccion: document.getElementById('configDireccion').value.trim(),
        piePagina: document.getElementById('configPiePagina').value.trim()
    };
    localStorage.setItem('configuracion', JSON.stringify(config));
    showToast('Configuración guardada exitosamente');
}

function actualizarEstadoClave() {
    const clave = localStorage.getItem('claveAcceso');
    const statusEl = document.getElementById('claveStatus');
    if (clave) {
        statusEl.textContent = '🔒 Clave de acceso activa';
        statusEl.style.color = '#27ae60';
    } else {
        statusEl.textContent = '🔓 Sin clave de acceso (cualquiera puede eliminar/modificar)';
        statusEl.style.color = '#e67e22';
    }
}

async function guardarClave() {
    const clave = document.getElementById('configClave').value;
    const confirmar = document.getElementById('configClaveConfirm').value;

    if (!clave) {
        showToast('Ingrese una clave', 'warning');
        return;
    }
    if (clave !== confirmar) {
        showToast('Las claves no coinciden', 'error');
        return;
    }

    const hash = await hashText(clave);
    localStorage.setItem('claveAcceso', hash);
    document.getElementById('configClave').value = '';
    document.getElementById('configClaveConfirm').value = '';
    actualizarEstadoClave();
    showToast('Clave guardada exitosamente (cifrada con SHA-256)');
}

async function quitarClave() {
    const claveActual = localStorage.getItem('claveAcceso');
    if (claveActual) {
        const input = prompt('Ingrese la clave actual para desactivarla:');
        if (input === null) return;

        let ok = false;
        if (/^[a-f0-9]{64}$/.test(claveActual)) {
            ok = await hashText(input) === claveActual;
        } else {
            ok = input === claveActual;
        }

        if (!ok) {
            showToast('Clave incorrecta', 'error');
            return;
        }
    }
    localStorage.removeItem('claveAcceso');
    actualizarEstadoClave();
    showToast('Clave de acceso eliminada');
}

function exportarDatos() {
    const data = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        facturas: JSON.parse(localStorage.getItem('facturas') || '[]'),
        catalogo: JSON.parse(localStorage.getItem('catalogo') || '{}'),
        configuracion: JSON.parse(localStorage.getItem('configuracion') || '{}'),
        entregas: JSON.parse(localStorage.getItem('entregas') || '{}'),
        pacientes: JSON.parse(localStorage.getItem('pacientes') || '[]')
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const today = new Date().toISOString().split('T')[0];
    a.href = url;
    a.download = `backup_laboratorio_${today}.json`;
    a.click();
    URL.revokeObjectURL(url);

    document.getElementById('backupStatus').textContent = `✅ Datos exportados: ${today}`;
    document.getElementById('backupStatus').style.color = '#27ae60';
    showToast('Datos exportados correctamente');
}

function importarDatos(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
        try {
            const data = JSON.parse(event.target.result);

            if (!data.facturas && !data.catalogo && !data.configuracion) {
                showToast('Archivo no válido: no contiene datos reconocidos', 'error');
                return;
            }

            const msg = `Se van a importar:\n` +
                `• ${(data.facturas || []).length} facturas\n` +
                `• ${Object.keys(data.catalogo || {}).length} análisis en catálogo\n` +
                `• Configuración corporativa\n\n` +
                `⚠️ Esto REEMPLAZARÁ todos los datos actuales. ¿Continuar?`;

            if (!confirm(msg)) return;

            if (data.facturas) localStorage.setItem('facturas', JSON.stringify(data.facturas));
            if (data.catalogo) localStorage.setItem('catalogo', JSON.stringify(data.catalogo));
            if (data.configuracion) localStorage.setItem('configuracion', JSON.stringify(data.configuracion));
            if (data.entregas) localStorage.setItem('entregas', JSON.stringify(data.entregas));
            if (data.pacientes) localStorage.setItem('pacientes', JSON.stringify(data.pacientes));

            cargarConfigActual();
            document.getElementById('backupStatus').textContent = '✅ Datos importados exitosamente';
            document.getElementById('backupStatus').style.color = '#27ae60';
            showToast('Datos importados exitosamente');
        } catch (err) {
            showToast('Error al leer el archivo: ' + err.message, 'error');
        }
    };
    reader.readAsText(file);
    e.target.value = '';
}

document.addEventListener('DOMContentLoaded', initConfiguracion);
