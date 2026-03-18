/* ========================================
   INICIALIZACIÓN Y GESTIÓN DEL DOM
   ======================================== */

// Variables globales
const toggleBtn = document.getElementById('toggleBtn');
const sidebar = document.getElementById('sidebar');
const navItems = document.querySelectorAll('.nav-item');

/* ========================================
   FUNCIONES DE SIDEBAR
   ======================================== */

/**
 * Inicializa los eventos del sidebar
 */
function initSidebar() {
    // Toggle sidebar en dispositivos móviles
    if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('active');
        });
    }

    // Navegar entre elementos
    navItems.forEach((item) => {
        item.addEventListener('click', (e) => {
            // Remover clase active de todos los items
            navItems.forEach((nav) => nav.classList.remove('active'));

            // Agregar clase active al item clickeado
            item.classList.add('active');

            // Cerrar sidebar en móviles después de seleccionar
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }

            // Si el item tiene un href válido, permitir la navegación hacia allí
            const href = item.getAttribute('href');
            if (href && href !== '#') {
                // Permitir navegación natural al hacer clic
                return true;
            }

            // Si no tiene href válido, prevenir comportamiento por defecto
            e.preventDefault();
            handleNavigation(item.textContent.trim());
        });
    });

    // Cerrar sidebar al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });
}

/**
 * Maneja la navegación entre secciones
 * @param {string} section - Nombre de la sección
 */
function handleNavigation(section) {
    console.log('Navegando a:', section);
    // Aquí puedes agregar lógica para cargar diferentes páginas o secciones
}

/* ========================================
   FUNCIONES DE ANIMACIÓN Y ESTILOS
   ======================================== */

/**
 * Anima el valor de un KPI card
 * @param {HTMLElement} element - Elemento a animar
 * @param {number} finalValue - Valor final
 * @param {number} duration - Duración en ms
 */
function animateKPIValue(element, finalValue, duration = 1000) {
    const startValue = 0;
    const startTime = performance.now();

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        if (element.dataset.type === 'number') {
            const current = Math.floor(startValue + (finalValue - startValue) * progress);
            element.textContent = current.toLocaleString();
        } else if (element.dataset.type === 'percentage') {
            const current = Math.floor(progress * finalValue);
            element.textContent = current + '%';
        }

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

/**
 * Aplica estilos dinámicos basados en temas
 */
function applyDynamicStyles() {
    // Obtener el tema almacenado o usar por defecto
    const theme = localStorage.getItem('crm-theme') || 'light';

    if (theme === 'dark') {
        document.body.style.filter = 'invert(1) hue-rotate(180deg)';
        localStorage.setItem('crm-theme', 'dark');
    }
}

/**
 * Cambia el tema de la plataforma
 * @param {string} themeName - Nombre del tema (light, dark)
 */
function switchTheme(themeName) {
    if (themeName === 'dark') {
        document.body.style.filter = 'invert(1) hue-rotate(180deg)';
        localStorage.setItem('crm-theme', 'dark');
    } else {
        document.body.style.filter = 'none';
        localStorage.setItem('crm-theme', 'light');
    }
}

/**
 * Aplica estilos personalizados a elementos
 * @param {string} selector - Selector CSS
 * @param {object} styles - Objeto con propiedades CSS
 */
function applyCustomStyles(selector, styles) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
        Object.assign(el.style, styles);
    });
}

/* ========================================
   FUNCIONES DE NOTIFICACIONES
   ======================================== */

/**
 * Actualiza el badge de notificaciones
 * @param {number} count - Cantidad de notificaciones
 */
function updateNotificationBadge(count) {
    const badge = document.querySelector('.notification-badge');
    if (badge) {
        badge.textContent = count;
        if (count === 0) {
            badge.style.display = 'none';
        } else {
            badge.style.display = 'flex';
        }
    }
}

/**
 * Anima el icono de notificación
 */
function animateNotificationIcon() {
    const icon = document.querySelector('.notification-icon');
    if (icon) {
        icon.style.animation = 'none';
        setTimeout(() => {
            icon.style.animation = 'pulse 0.5s ease-in-out';
        }, 10);
    }
}

/* ========================================
   FUNCIONES DE TABLA
   ======================================== */

/**
 * Resalta una fila de la tabla
 * @param {number} rowIndex - Índice de la fila
 */
function highlightTableRow(rowIndex) {
    const rows = document.querySelectorAll('table tbody tr');
    if (rows[rowIndex]) {
        rows[rowIndex].style.backgroundColor = '#f0f8ff';
        setTimeout(() => {
            rows[rowIndex].style.backgroundColor = '';
        }, 2000);
    }
}

/**
 * Ordena la tabla por una columna
 * @param {string} columnName - Nombre de la columna
 * @param {string} order - 'asc' o 'desc'
 */
function sortTable(columnName, order = 'asc') {
    console.log('Ordenando tabla por:', columnName, 'en orden:', order);
    // Aquí puedes agregar la lógica de ordenamiento
}

/* ========================================
   FUNCIONES DE KPI
   ======================================== */

/**
 * Actualiza los valores de los KPI
 * @param {object} data - Objeto con los nuevos datos
 */
function updateKPIValues(data) {
    const cards = document.querySelectorAll('.kpi-card');

    cards.forEach((card, index) => {
        const valueElement = card.querySelector('.kpi-value');
        if (valueElement && data[index]) {
            valueElement.dataset.type = 'number';
            animateKPIValue(valueElement, data[index].value);

            // Actualizar cambio porcentual
            const changeElement = card.querySelector('.kpi-change');
            if (changeElement && data[index].change !== undefined) {
                const isNegative = data[index].change < 0;
                changeElement.className = 'kpi-change' + (isNegative ? ' negative' : '');
                changeElement.innerHTML = `
                    <i class="fas fa-arrow-${isNegative ? 'down' : 'up'}"></i>
                    ${Math.abs(data[index].change)}% vs mes anterior
                `;
            }
        }
    });
}

/* ========================================
   FUNCIONES DE RESPONSIVE
   ======================================== */

/**
 * Maneja cambios en el tamaño de la ventana
 */
function handleResponsive() {
    const width = window.innerWidth;

    if (width > 768) {
        sidebar.classList.remove('active');
        if (toggleBtn) toggleBtn.style.display = 'none';
    }
}

/**
 * Inicializa el listener de resize
 */
function initResponsiveListener() {
    window.addEventListener('resize', handleResponsive);
    // Ejecutar una vez al cargar
    handleResponsive();
}

/* ========================================
   FUNCIONES DE UTILIDAD
   ======================================== */

/**
 * Formatea un número como moneda
 * @param {number} value - Valor a formatear
 * @param {string} currency - Código de moneda (ej: 'USD', 'COP')
 * @returns {string} Número formateado
 */
function formatCurrency(value, currency = 'COP') {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: currency,
    }).format(value);
}

/**
 * Formatea un número con separadores de miles
 * @param {number} value - Valor a formatear
 * @returns {string} Número formateado
 */
function formatNumber(value) {
    return new Intl.NumberFormat('es-CO').format(value);
}

/**
 * Obtiene un valor del localStorage
 * @param {string} key - Clave
 * @param {*} defaultValue - Valor por defecto
 * @returns {*} Valor almacenado
 */
function getStorageValue(key, defaultValue = null) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : defaultValue;
    } catch {
        return defaultValue;
    }
}

/**
 * Almacena un valor en localStorage
 * @param {string} key - Clave
 * @param {*} value - Valor a almacenar
 */
function setStorageValue(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error al guardar en localStorage:', error);
    }
}

/* ========================================
   FUNCIONES DE INICIALIZACIÓN
   ======================================== */

/**
 * Inicializa la plataforma CRM
 */
function initCRM() {
    console.log('Inicializando CRM...');

    // Inicializar componentes
    initSidebar();
    initResponsiveListener();
    applyDynamicStyles();

    // Agregar estilos de animación si no existen
    if (!document.getElementById('animation-styles')) {
        const style = document.createElement('style');
        style.id = 'animation-styles';
        style.textContent = `
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
        `;
        document.head.appendChild(style);
    }

    console.log('✓ CRM inicializado correctamente');
}

/**
 * Evento cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', () => {
    initCRM();

    // Ejemplo: Actualizar notificaciones después de 2 segundos
    setTimeout(() => {
        // updateNotificationBadge(5);
    }, 2000);
});

/* ========================================
   EXPORTAR FUNCIONES (para uso global)
   ======================================== */
window.CRM = {
    switchTheme,
    applyCustomStyles,
    updateNotificationBadge,
    animateNotificationIcon,
    highlightTableRow,
    sortTable,
    updateKPIValues,
    formatCurrency,
    formatNumber,
    getStorageValue,
    setStorageValue,
    handleNavigation,
};

/* ========================================
   MÓDULO DE LEADS - GESTIÓN DE LEADS
   Funcionalidad para listado, edición y trazabilidad
   ======================================== */

/**
 * GESTIÓN DEL MÓDULO DE LEADS
 * 
 * Rol: Controlar la navegación entre vistas (listado ↔ detalles)
 * y la edición de información de leads
 * 
 * Funciones principales:
 * - initLeadsModule(): Inicializa eventos y listeners
 * - switchToDetailView(): Muestra vista de detalles de un lead
 * - switchToListView(): Vuelve a la vista del listado
 * - enableEditMode(): Activa modo edición del formulario
 * - disableEditMode(): Desactiva modo edición y revierte cambios
 * - saveLeadChanges(): Guarda cambios del lead
 */

/**
 * Inicializa el módulo de leads
 * Agrega event listeners a elementos de la página
 * Rol: Configurar interacciones entre listado y detalles
 */
function initLeadsModule() {
    // Elementos del DOM
    const leadsListView = document.getElementById('leadsListView');
    const leadDetailView = document.getElementById('leadDetailView');
    const leadListRows = document.querySelectorAll('.lead-list-row');
    const backToListBtn = document.getElementById('backToListBtn');
    const pageTitle = document.getElementById('pageTitle');
    
    // Verificar que existamos en página de leads
    if (!leadsListView || !leadDetailView) {
        return; // No estamos en la página de leads
    }

    // ==========================================
    // EVENTO: Click en un lead del listado
    // Rol: Cargar datos del lead y mostrar vista de detalles
    // ==========================================
    leadListRows.forEach(row => {
        row.addEventListener('click', () => {
            const leadId = row.dataset.leadId;
            const leadName = row.dataset.leadName;
            const leadLastname = row.dataset.leadLastname;
            const leadPhone = row.dataset.leadPhone;
            const leadProgram = row.dataset.leadProgram;
            const leadCedula = row.dataset.leadCedula;
            const leadEmail = row.dataset.leadEmail;

            // Cargar datos en el formulario
            document.getElementById('nombres').value = leadName;
            document.getElementById('apellidos').value = leadLastname;
            document.getElementById('programa').value = leadProgram;
            document.getElementById('celular').value = leadPhone;
            document.getElementById('cedula').value = leadCedula;
            document.getElementById('correo').value = leadEmail;

            // Actualizar avatar y nombre en la vista
            const initials = (leadName.charAt(0) + leadLastname.charAt(0)).toUpperCase();
            document.getElementById('leadAvatar').textContent = initials;
            document.getElementById('leadNameDisplay').textContent = `${leadName} ${leadLastname}`;
            document.getElementById('leadProgramDisplay').textContent = leadProgram;

            // Cambiar de vista (listado → detalles)
            leadsListView.style.display = 'none';
            leadDetailView.classList.add('active');
            
            // Actualizar título de página
            if (pageTitle) {
                pageTitle.textContent = `Hoja de Vida - ${leadName} ${leadLastname}`;
            }

            // Resetear modo edición a lectura
            disableEditMode();
        });
    });

    // ==========================================
    // EVENTO: Botón volver al listado
    // Rol: Volver desde vista de detalles a listado
    // ==========================================
    if (backToListBtn) {
        backToListBtn.addEventListener('click', () => {
            leadsListView.style.display = 'flex';
            leadDetailView.classList.remove('active');
            
            if (pageTitle) {
                pageTitle.textContent = 'Leads';
            }
        });
    }

    // Inicializar funciones de edición
    initLeadsFormEditing();
    
    // Inicializar función de crear nuevo lead
    initCreateLeadForm();
}

/**
 * Inicializa los eventos de edición del formulario de leads
 * Rol: Controlar botones Editar, Guardar, Cancelar
 */
function initLeadsFormEditing() {
    let isEditMode = false;
    const editBtn = document.getElementById('editBtn');
    const saveBtn = document.getElementById('saveBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const leadForm = document.getElementById('leadForm');
    const inputs = document.querySelectorAll('.form-input');

    // Verificar que existan los elementos
    if (!editBtn || !saveBtn || !cancelBtn || !leadForm) {
        return;
    }

    // Guardar valores originales para cancelación
    const originalValues = {};
    inputs.forEach(input => {
        originalValues[input.id] = input.value;
    });

    // ==========================================
    // EVENTO: Botón Editar
    // Rol: Activar modo edición (habilitar inputs)
    // ==========================================
    editBtn.addEventListener('click', () => {
        isEditMode = true;
        
        // Activar todos los inputs
        inputs.forEach(input => input.disabled = false);
        
        // Mostrar/ocultar botones
        editBtn.style.display = 'none';
        saveBtn.style.display = 'flex';
        cancelBtn.style.display = 'flex';
    });

    // ==========================================
    // EVENTO: Botón Cancelar
    // Rol: Desactivar modo edición y revertir cambios
    // ==========================================
    cancelBtn.addEventListener('click', () => {
        isEditMode = false;
        
        // Restaurar valores originales
        inputs.forEach(input => {
            input.disabled = true;
            input.value = originalValues[input.id];
        });
        
        // Mostrar/ocultar botones
        editBtn.style.display = 'flex';
        saveBtn.style.display = 'none';
        cancelBtn.style.display = 'none';

        // Actualizar visualización (avatar y nombre)
        updateLeadDisplay();
    });

    // ==========================================
    // EVENTO: Envío del formulario (Guardar)
    // Rol: Guardar cambios en los datos del lead
    // ==========================================
    leadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Preparar datos para enviar
        const formData = {
            leadId: document.querySelector('.lead-list-row.active')?.dataset.leadId || 1,
            nombres: document.getElementById('nombres').value,
            apellidos: document.getElementById('apellidos').value,
            programa: document.getElementById('programa').value,
            cedula: document.getElementById('cedula').value,
            celular: document.getElementById('celular').value,
            correo: document.getElementById('correo').value,
        };

        console.log('✓ Datos del lead guardados:', formData);

        // Actualizar valores originales
        Object.keys(formData).forEach(key => {
            if (originalValues.hasOwnProperty(key)) {
                originalValues[key] = formData[key];
            }
        });

        // Desactivar modo edición
        isEditMode = false;
        inputs.forEach(input => input.disabled = true);
        editBtn.style.display = 'flex';
        saveBtn.style.display = 'none';
        cancelBtn.style.display = 'none';

        // Mostrar notificación de éxito
        alert('✓ Los cambios han sido guardados correctamente');
    });

    // ==========================================
    // EVENTO: Cambios en inputs (nombres, apellidos, programa)
    // Rol: Actualizar avatar y nombre en tiempo real
    // ==========================================
    document.getElementById('nombres').addEventListener('input', updateLeadDisplay);
    document.getElementById('apellidos').addEventListener('input', updateLeadDisplay);
    document.getElementById('programa').addEventListener('input', updateLeadDisplay);
}

/**
 * Actualiza la visualización del lead (avatar, nombre, programa)
 * Rol: Reflejar cambios en tiempo real durante la edición
 * 
 * Actualiza:
 * - Avatar: Iniciales del nombre y apellido
 * - Nombre: Nombre completo actualizado
 * - Programa: Programa académico actualizado
 */
function updateLeadDisplay() {
    const nombres = document.getElementById('nombres')?.value || '';
    const apellidos = document.getElementById('apellidos')?.value || '';
    const programa = document.getElementById('programa')?.value || '';

    // Actualizar nombre y programa
    const nameDisplay = document.getElementById('leadNameDisplay');
    const programDisplay = document.getElementById('leadProgramDisplay');
    const avatar = document.getElementById('leadAvatar');

    if (nameDisplay) nameDisplay.textContent = `${nombres} ${apellidos}`;
    if (programDisplay) programDisplay.textContent = programa;

    // Actualizar iniciales del avatar
    if (avatar) {
        const initials = (nombres.charAt(0) + apellidos.charAt(0)).toUpperCase();
        avatar.textContent = initials;
    }
}

/**
 * Desactiva el modo edición del formulario
 * Rol: Auxiliar para deshabilitar edición (usado al cargar un lead)
 */
function disableEditMode() {
    const editBtn = document.getElementById('editBtn');
    const saveBtn = document.getElementById('saveBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const inputs = document.querySelectorAll('.form-input');

    if (editBtn) editBtn.style.display = 'flex';
    if (saveBtn) saveBtn.style.display = 'none';
    if (cancelBtn) cancelBtn.style.display = 'none';
    
    inputs.forEach(input => input.disabled = true);
}

/**
 * Inicializa la función de crear nuevo lead
 * Rol: Manejar formulario para crear leads desde cero en un modal
 */
function initCreateLeadForm() {
    // Elementos del DOM
    const createLeadBtn = document.getElementById('createLeadBtn');
    const leadCreateModal = document.getElementById('leadCreateModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const leadFormCreate = document.getElementById('leadFormCreate');
    const saveBtnCreate = document.getElementById('saveBtnCreate');
    const cancelBtnCreate = document.getElementById('cancelBtnCreate');

    // Campos del formulario de creación
    const nombresInput = document.getElementById('nombres_create');
    const apellidosInput = document.getElementById('apellidos_create');
    const programaSelect = document.getElementById('programa_create');
    const cedulaInput = document.getElementById('cedula_create');
    const celularInput = document.getElementById('celular_create');
    const correoInput = document.getElementById('correo_create');

    // Verificar que existan los elementos
    if (!createLeadBtn || !leadCreateModal) {
        return;
    }

    // Función para abrir el modal
    const openModal = () => {
        // Limpiar formulario
        if (leadFormCreate) leadFormCreate.reset();
        document.getElementById('newLeadAvatar').textContent = '--';
        document.getElementById('newLeadName').textContent = 'Nuevo Lead';
        document.getElementById('newLeadProgram').textContent = 'Ingrese los datos';

        // Mostrar modal
        leadCreateModal.classList.add('active');

        // Enfocar en el primer campo
        if (nombresInput) nombresInput.focus();
    };

    // Función para cerrar el modal
    const closeModal = () => {
        leadCreateModal.classList.remove('active');
    };

    // ==========================================
    // EVENTO: Botón Crear Lead
    // Rol: Abrir modal de creación
    // ==========================================
    createLeadBtn.addEventListener('click', openModal);

    // ==========================================
    // EVENTO: Botón Cerrar Modal (X)
    // Rol: Cerrar el modal
    // ==========================================
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    // ==========================================
    // EVENTO: Hacer clic en el overlay
    // Rol: Cerrar el modal al hacer clic fuera
    // ==========================================
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // ==========================================
    // EVENTO: Botón Cancelar en formulario
    // Rol: Cerrar el modal sin guardar
    // ==========================================
    if (cancelBtnCreate) {
        cancelBtnCreate.addEventListener('click', closeModal);
    }

    // ==========================================
    // EVENTO: Actualizar vista previa mientras se escribe
    // Rol: Mostrar en tiempo real los datos que se están ingresando
    // ==========================================
    const updateNewLeadDisplay = () => {
        const nombres = nombresInput?.value || '';
        const apellidos = apellidosInput?.value || '';
        const programa = programaSelect?.value || 'Selecciona un programa';

        document.getElementById('newLeadName').textContent = nombres && apellidos 
            ? `${nombres} ${apellidos}`
            : 'Nuevo Lead';
        document.getElementById('newLeadProgram').textContent = programa;

        // Actualizar avatar con iniciales
        const avatar = document.getElementById('newLeadAvatar');
        if (nombres || apellidos) {
            const initials = ((nombres.charAt(0) || '') + (apellidos.charAt(0) || '')).toUpperCase();
            avatar.textContent = initials;
        } else {
            avatar.textContent = '--';
        }
    };

    // Agregar listeners para actualización en tiempo real
    if (nombresInput) nombresInput.addEventListener('input', updateNewLeadDisplay);
    if (apellidosInput) apellidosInput.addEventListener('input', updateNewLeadDisplay);
    if (programaSelect) programaSelect.addEventListener('change', updateNewLeadDisplay);

    // ==========================================
    // EVENTO: Enviar formulario (Crear Lead)
    // Rol: Guardar nuevo lead en la lista
    // ==========================================
    if (leadFormCreate) {
        leadFormCreate.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validar que los campos requeridos estén llenos
            if (!nombresInput.value.trim()) {
                alert('Por favor ingresa el nombre');
                return;
            }
            if (!apellidosInput.value.trim()) {
                alert('Por favor ingresa el apellido');
                return;
            }
            if (!programaSelect.value) {
                alert('Por favor selecciona un programa');
                return;
            }

            // Crear nuevo lead con los datos ingresados
            const newLeadName = nombresInput.value.trim();
            const newLeadLastname = apellidosInput.value.trim();
            const newLeadProgram = programaSelect.value;
            const newLeadCedula = cedulaInput.value.trim();
            const newLeadCelular = celularInput.value.trim();
            const newLeadCorreo = correoInput.value.trim();

            // Generar ID único (en una aplicación real vendría del servidor)
            const newLeadId = Math.max(...Array.from(document.querySelectorAll('.lead-list-row'))
                .map(row => parseInt(row.dataset.leadId) || 0), 0) + 1;

            // Crear nueva fila en la tabla
            const tableBody = document.querySelector('.leads-list-table tbody');
            const initials = (newLeadName.charAt(0) + newLeadLastname.charAt(0)).toUpperCase();

            const newRow = document.createElement('tr');
            newRow.className = 'lead-list-row';
            newRow.dataset.leadId = newLeadId;
            newRow.dataset.leadName = newLeadName;
            newRow.dataset.leadLastname = newLeadLastname;
            newRow.dataset.leadProgram = newLeadProgram;
            newRow.dataset.leadCedula = newLeadCedula;
            newRow.dataset.leadPhone = newLeadCelular;
            newRow.dataset.leadEmail = newLeadCorreo;

            newRow.innerHTML = `
                <td class="lead-list-avatar">${initials}</td>
                <td>
                    <div class="lead-list-name">${newLeadName} ${newLeadLastname}</div>
                    <div class="lead-list-phone">${newLeadCelular}</div>
                </td>
                <td class="lead-list-program">${newLeadProgram}</td>
                <td class="lead-list-city"></td>
                <td class="lead-list-status">
                    <span class="status-badge status-nuevo"><i class="lead-list-icon fas fa-star\"></i></span>
                </td>
            `;

            // Agregar nueva fila a la tabla
            tableBody.appendChild(newRow);

            // Agregar evento click al nuevo lead
            newRow.addEventListener('click', () => {
                // Código para cargar el nuevo lead
                const leadsListView = document.getElementById('leadsListView');
                const leadDetailView = document.getElementById('leadDetailView');
                
                document.getElementById('nombres').value = newLeadName;
                document.getElementById('apellidos').value = newLeadLastname;
                document.getElementById('programa').value = newLeadProgram;
                document.getElementById('celular').value = newLeadCelular;
                document.getElementById('cedula').value = newLeadCedula;
                document.getElementById('correo').value = newLeadCorreo;

                const initls = (newLeadName.charAt(0) + newLeadLastname.charAt(0)).toUpperCase();
                document.getElementById('leadAvatar').textContent = initls;
                document.getElementById('leadNameDisplay').textContent = `${newLeadName} ${newLeadLastname}`;
                document.getElementById('leadProgramDisplay').textContent = newLeadProgram;

                leadsListView.style.display = 'none';
                leadDetailView.classList.add('active');

                const pageTitle = document.getElementById('pageTitle');
                if (pageTitle) {
                    pageTitle.textContent = `Hoja de Vida - ${newLeadName} ${newLeadLastname}`;
                }

                disableEditMode();
            });

            // Mostrar mensaje de éxito
            alert(`Lead "${newLeadName} ${newLeadLastname}" creado exitosamente`);

            // Cerrar modal
            closeModal();
        });
    }
}

/* ========================================
   INICIALIZACIÓN - EXTENSIONES
   Agregar módulos adicionales
   ======================================== */

/**
 * Extensión de initCRM para incluir módulo de leads
 */
const originalInitCRM = window.CRM?.initCRM || initCRM;

// Reemplazar initCRM para incluir leads
const newInitCRM = function() {
    // Llamar a inicio original
    console.log('Inicializando CRM...');

    // Inicializar componentes globales
    initSidebar();
    initResponsiveListener();
    applyDynamicStyles();

    // Inicializar módulo de leads (si estamos en página de leads)
    if (document.getElementById('leadsListView')) {
        initLeadsModule();
    }

    // Agregar estilos de animación si no existen
    if (!document.getElementById('animation-styles')) {
        const style = document.createElement('style');
        style.id = 'animation-styles';
        style.textContent = `
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
        `;
        document.head.appendChild(style);
    }

    console.log('✓ CRM inicializado correctamente');
};

// Actualizar initCRM global
window.initCRM = newInitCRM;

/**
 * Evento cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', () => {
    window.initCRM();

    // Ejemplo: Actualizar notificaciones después de 2 segundos
    setTimeout(() => {
        // updateNotificationBadge(5);
    }, 2000);
});

/**
 * Agregar funciones de leads a objeto CRM global
 */
window.CRM.initLeadsModule = initLeadsModule;
window.CRM.updateLeadDisplay = updateLeadDisplay;
window.CRM.disableEditMode = disableEditMode;
window.CRM.initCreateLeadForm = initCreateLeadForm;
