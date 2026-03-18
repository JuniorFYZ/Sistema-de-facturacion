# AG_context.md — Contexto del Proyecto (Antigravity)

Este archivo es generado y mantenido exclusivamente por el asistente de IA (Antigravity). Lo usaré siempre como referencia central de memoria para este proyecto, unificando toda la información que antes estaba separada en `ai_contextgemini.md`.

---

## Descripción General del Proyecto

**Sistema de Facturación — Laboratorio Clínico Lic. Maris Polanco**
Aplicación web (HTML + CSS + JS Vanilla) sin backend. Todo el estado se persiste en `localStorage` del navegador.

**Entidades en localStorage:**
- `facturas` — Facturas guardadas
- `catalogo` — Lista de análisis con precios
- `configuracion` — Datos corporativos (RNC, dirección, teléfono, pie de página)
- `pacientes` — Lista de nombres de pacientes (para autocompletar)
- `entregas` — Estado de entrega de resultados (entregado / no entregado)

---

## Estructura de Archivos

| Archivo | Función |
|---|---|
| `index.html` + `js/script.js` | Crear nueva factura, agregar análisis, datos del paciente, registro de abonos |
| `pages/registro.html` + `js/registro.js` | Historial de facturas, búsqueda, filtros, modal de detalles, entrega |
| `pages/catalogo.html` | CRUD del catálogo de análisis y precios |
| `pages/reportes.html` | Reportes por rango de fecha, filtros de pendientes, registro de Gastos, y Retiros de Banco |
| `pages/configuracion.html` | Ajustes corporativos del laboratorio |
| `js/utils.js` | Funciones compartidas: `showToast`, `verificarClave`, `hashText`, etc. |
| `css/styles.css` | Estilos globales |

---

## Campos del Paciente en una Factura

| Campo HTML ID | Propiedad guardada | Descripción |
|---|---|---|
| `patientName` | `paciente` | Nombre del paciente |
| `patientCedula` | `cedula` | Cédula de identidad |
| `patientTelefono` | `telefono` | Teléfono |
| `patientEdad` | `edad` | Edad del paciente |
| `invoiceDate` | `fecha` | Fecha de la factura |
| `invoiceNumber` | `numero` | Número secuencial (`FAC-XXXX`) |
| `invoiceNotes` | `notas` | Observaciones adicionales |

---

## Historial de Cambios y Solicitudes

### 2026-03-12
- **[UNIFICACIÓN]** Se combinaron los documentos `AG_context.md` y `ai_contextgemini.md` en un solo archivo central.
- **[PRIVACIDAD DE IMPRESIÓN]** Se eliminó la visualización de la "Edad" en la vista de impresión. A partir de ahora los recibos impresos solo muestran Nombre, Cédula y Teléfono.
- **[CORRECCIÓN ABONOS]** Se corrigió la lógica y el cálculo de abonos. Ahora, cuando un paciente realiza un pago inicial que no estaba marcado como abono, este se migra automáticamente como un primer "Pago Inicial" al abrir el componente de abonos. Esto asegura que al abonar más saldo, se reste correctamente el monto de la cantidad pendiente original (ej. "si debo 1000 y pago 500, quedan 500 pendiente").

### 2026-03-11
- **[CAMBIO] Campo "Médico Solicitante" → "Edad":**
  El campo que pedía el nombre del médico fue reemplazado por la edad del paciente.
- **[COMPORTAMIENTO]** La factura no puede guardarse ni imprimirse si el Nombre o la Edad están vacíos (indicados en rojo de manera visual).
- Historial de abonos / pagos parciales por factura.
- Botón de reimprimir recibo de abono.
- Notificaciones Toast globales (reemplazando `alert()`).
- Filtro de facturas en "Reportes" por rango de fecha y descripción.
- Corrección de impresión en blanco (se arreglaron estilos de `@media print`).
- Imagen/fondo oscurecido en la pantalla principal (`background-color` en `style.css`).

### Contexto previo (Fases 1 y 2)
- Sistema inicialmente implementado con mejoras de seguridad y XSS resuelto.
- Numeración secuencial global (`FAC-XXXX`).
- Paginación (50/página) y ordenamiento por columnas en tabla de registro.
