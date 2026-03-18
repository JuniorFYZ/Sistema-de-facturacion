// utils.js — Shared utilities for the Billing System

// ===== SHA-256 Hashing =====
async function hashText(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Verify access password (SHA-256 aware, backward-compatible with legacy plain-text)
async function verificarClave(mensaje) {
    const claveGuardada = localStorage.getItem('claveAcceso');
    if (!claveGuardada) return true; // No password set → allow
    const input = prompt(mensaje || 'Ingrese la clave de acceso:');
    if (input === null) return false; // User cancelled

    // Detect if stored value is SHA-256 hash (64 lowercase hex chars)
    if (/^[a-f0-9]{64}$/.test(claveGuardada)) {
        const inputHash = await hashText(input);
        return inputHash === claveGuardada;
    } else {
        // Legacy plain-text — auto-upgrade to hash on correct login
        if (input === claveGuardada) {
            const newHash = await hashText(input);
            localStorage.setItem('claveAcceso', newHash);
            return true;
        }
        return false;
    }
}

// ===== Toast Notifications =====
function showToast(message, type = 'success') {
    const existing = document.getElementById('sysToast');
    if (existing) existing.remove();

    if (!document.getElementById('toastStyles')) {
        const style = document.createElement('style');
        style.id = 'toastStyles';
        style.textContent = `
            @keyframes toastIn  { from { transform: translateX(110%); opacity:0; } to { transform: translateX(0); opacity:1; } }
            @keyframes toastOut { from { transform: translateX(0); opacity:1; } to { transform: translateX(110%); opacity:0; } }
            .sortable { cursor: pointer; user-select: none; }
            .sortable:hover { background: rgba(255,255,255,0.15); }
        `;
        document.head.appendChild(style);
    }

    const colors = { success: '#27ae60', error: '#e74c3c', warning: '#f39c12', info: '#2980b9' };
    const icons  = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };

    const toast = document.createElement('div');
    toast.id = 'sysToast';
    toast.style.cssText = `
        position:fixed; bottom:28px; right:28px; z-index:99999;
        background:${colors[type] || colors.info}; color:#fff;
        padding:13px 18px; border-radius:10px;
        font-size:0.92rem; font-weight:500;
        box-shadow:0 4px 16px rgba(0,0,0,0.22);
        display:flex; align-items:center; gap:10px; max-width:360px;
        animation: toastIn 0.3s ease;
    `;
    toast.innerHTML = `<span>${icons[type] || icons.info}</span><span>${message}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toastOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 320);
    }, 3200);
}

// ===== Date Formatting =====
// Converts "2026-03-02" to "02 Mar 2026"
const MESES_ES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
function formatFecha(fechaStr) {
    if (!fechaStr || fechaStr === 'Sin fecha') return fechaStr || 'Sin fecha';
    const parts = fechaStr.split('-');
    if (parts.length !== 3) return fechaStr;
    const [y, m, d] = parts;
    const mesIdx = parseInt(m, 10) - 1;
    if (mesIdx < 0 || mesIdx > 11) return fechaStr;
    return `${d} ${MESES_ES[mesIdx]} ${y}`;
}

// ===== Pending display: returns "—" when zero ====
function formatPendiente(val) {
    const n = parseFloat(val) || 0;
    if (n <= 0) return `<span style="color:#bbb;">—</span>`;
    return `<span style="color:#d9534f;font-weight:bold;">RD$ ${n.toLocaleString('es-DO')}</span>`;
}

// ===== Local Date String (YYYY-MM-DD) avoiding UTC timezone shift =====
function getLocalDateString(d = new Date()) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

