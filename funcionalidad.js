/* ========================================
   INICIALIZACION Y GESTION DEL DOM
   ======================================== */

const toggleBtn = document.getElementById('toggleBtn');
const sidebar = document.getElementById('sidebar');
const navItems = document.querySelectorAll('.nav-item');

/* ========================================
   FUNCIONES DE SIDEBAR
   ======================================== */

function initSidebar() {
    if (document.body.dataset.sidebarInitialized === 'true') {
        return;
    }

    document.body.dataset.sidebarInitialized = 'true';

    if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar?.classList.toggle('active');
        });
    }

    navItems.forEach((item) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            navItems.forEach((nav) => nav.classList.remove('active'));
            item.classList.add('active');

            if (window.innerWidth <= 768) {
                sidebar?.classList.remove('active');
            }

            handleNavigation(item.textContent.trim());
        });
    });

    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && sidebar && toggleBtn) {
            if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });
}

function handleNavigation(section) {
    console.log('Navegando a:', section);
}

/* ========================================
   FUNCIONES DE ANIMACION Y ESTILOS
   ======================================== */

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
            element.textContent = `${current}%`;
        }

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

function applyDynamicStyles() {
    const theme = localStorage.getItem('crm-theme') || 'light';

    if (theme === 'dark') {
        document.body.style.filter = 'invert(1) hue-rotate(180deg)';
        localStorage.setItem('crm-theme', 'dark');
    }
}

function switchTheme(themeName) {
    if (themeName === 'dark') {
        document.body.style.filter = 'invert(1) hue-rotate(180deg)';
        localStorage.setItem('crm-theme', 'dark');
    } else {
        document.body.style.filter = 'none';
        localStorage.setItem('crm-theme', 'light');
    }
}

function applyCustomStyles(selector, styles) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
        Object.assign(el.style, styles);
    });
}

/* ========================================
   FUNCIONES DE NOTIFICACIONES
   ======================================== */

function updateNotificationBadge(count) {
    const badge = document.querySelector('.notification-badge');
    if (badge) {
        badge.textContent = count;
        badge.style.display = count === 0 ? 'none' : 'flex';
    }
}

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

function highlightTableRow(rowIndex) {
    const rows = document.querySelectorAll('table tbody tr');
    if (rows[rowIndex]) {
        rows[rowIndex].style.backgroundColor = '#f0f8ff';
        setTimeout(() => {
            rows[rowIndex].style.backgroundColor = '';
        }, 2000);
    }
}

function sortTable(columnName, order = 'asc') {
    console.log('Ordenando tabla por:', columnName, 'en orden:', order);
}

/* ========================================
   FUNCIONES DE KPI
   ======================================== */

function updateKPIValues(data) {
    const cards = document.querySelectorAll('.kpi-card');

    cards.forEach((card, index) => {
        const valueElement = card.querySelector('.kpi-value');
        if (valueElement && data[index]) {
            valueElement.dataset.type = 'number';
            animateKPIValue(valueElement, data[index].value);

            const changeElement = card.querySelector('.kpi-change');
            if (changeElement && data[index].change !== undefined) {
                const isNegative = data[index].change < 0;
                changeElement.className = `kpi-change${isNegative ? ' negative' : ''}`;
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

function handleResponsive() {
    const width = window.innerWidth;

    if (width > 768) {
        sidebar?.classList.remove('active');
        if (toggleBtn) {
            toggleBtn.style.display = 'none';
        }
    }
}

function initResponsiveListener() {
    if (document.body.dataset.responsiveInitialized === 'true') {
        return;
    }

    document.body.dataset.responsiveInitialized = 'true';
    window.addEventListener('resize', handleResponsive);
    handleResponsive();
}

/* ========================================
   FUNCIONES DE UTILIDAD
   ======================================== */

function formatCurrency(value, currency = 'COP') {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency,
    }).format(value);
}

function formatNumber(value) {
    return new Intl.NumberFormat('es-CO').format(value);
}

function getStorageValue(key, defaultValue = null) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : defaultValue;
    } catch {
        return defaultValue;
    }
}

function setStorageValue(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error al guardar en localStorage:', error);
    }
}

/* ========================================
   FUNCIONES DE INICIALIZACION
   ======================================== */

function ensureAnimationStyles() {
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
}

function initCRMBase() {
    initSidebar();
    initResponsiveListener();
    applyDynamicStyles();
    ensureAnimationStyles();
}

/* ========================================
   EXPORTAR FUNCIONES
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
   MODULO DE LEADS - INTEGRACION CON STRAPI
   ======================================== */

const STRAPI_DEFAULT_CONFIG = {
    enabled: false,
    baseUrl: 'http://localhost:1337',
    apiPath: '/api',
    leadsEndpoint: 'leads',
    token: '',
};

const leadsState = {
    initialized: false,
    leads: [],
    currentLead: null,
    currentLeadOriginal: null,
};

const LEADS_MOCK_DATA = [
    {
        id: 1,
        nombres: 'Maria Camila',
        apellidos: 'Rodriguez',
        programa: 'Administracion de Empresas',
        cedula: '1053847291',
        celular: '+57 310 456 7890',
        correo: 'maria.camila@email.com',
        ciudad: 'Villavicencio',
        estado: 'interesado',
    },
    {
        id: 2,
        nombres: 'Juan Andres',
        apellidos: 'Martinez',
        programa: 'Ingenieria de Sistemas',
        cedula: '1087654321',
        celular: '+57 311 234 5678',
        correo: 'juan.andres@email.com',
        ciudad: 'Acacias',
        estado: 'nuevo',
    },
    {
        id: 3,
        nombres: 'Laura',
        apellidos: 'Gonzalez Perez',
        programa: 'Contabilidad',
        cedula: '1023456789',
        celular: '+57 312 567 8901',
        correo: 'laura.gonzalez@email.com',
        ciudad: 'Puerto Lopez',
        estado: 'calificado',
    },
];

function getStrapiConfig() {
    const runtimeConfig = window.CRM_CONFIG || {};

    return {
        enabled: runtimeConfig.strapiEnabled ?? STRAPI_DEFAULT_CONFIG.enabled,
        baseUrl: (runtimeConfig.strapiBaseUrl || STRAPI_DEFAULT_CONFIG.baseUrl).replace(/\/$/, ''),
        apiPath: runtimeConfig.strapiApiPath || STRAPI_DEFAULT_CONFIG.apiPath,
        leadsEndpoint: runtimeConfig.strapiLeadsEndpoint || STRAPI_DEFAULT_CONFIG.leadsEndpoint,
        token: runtimeConfig.strapiToken || STRAPI_DEFAULT_CONFIG.token,
    };
}

function buildStrapiUrl(resourcePath = '', query = '') {
    const config = getStrapiConfig();
    const cleanPath = resourcePath ? `/${resourcePath.replace(/^\/+/, '')}` : '';
    const cleanQuery = query ? (query.startsWith('?') ? query : `?${query}`) : '';
    return `${config.baseUrl}${config.apiPath}${cleanPath}${cleanQuery}`;
}

function getStrapiHeaders(includeJson = true) {
    const config = getStrapiConfig();
    const headers = {};

    if (includeJson) {
        headers['Content-Type'] = 'application/json';
    }

    if (config.token) {
        headers.Authorization = `Bearer ${config.token}`;
    }

    return headers;
}

async function requestStrapi(resourcePath = '', options = {}) {
    const config = getStrapiConfig();

    if (!config.enabled) {
        throw new Error('La integracion con Strapi esta desactivada en esta etapa.');
    }

    const response = await fetch(buildStrapiUrl(resourcePath, options.query), {
        method: options.method || 'GET',
        headers: {
            ...getStrapiHeaders(options.includeJson !== false),
            ...(options.headers || {}),
        },
        body: options.body,
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Strapi respondio ${response.status}: ${errorText || response.statusText}`);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

function getLeadSource(item = {}) {
    return item.attributes && typeof item.attributes === 'object'
        ? { id: item.id, documentId: item.documentId, ...item.attributes }
        : item;
}

function readLeadField(source, keys, defaultValue = '') {
    for (const key of keys) {
        if (source[key] !== undefined && source[key] !== null && source[key] !== '') {
            return source[key];
        }
    }

    return defaultValue;
}

function normalizeLead(item = {}) {
    const source = getLeadSource(item);
    const nombres = readLeadField(source, ['nombres', 'nombre', 'firstName', 'nombres_lead']);
    const apellidos = readLeadField(source, ['apellidos', 'apellido', 'lastName', 'apellidos_lead']);

    return {
        id: source.id || item.id || source.documentId || '',
        documentId: source.documentId || item.documentId || '',
        nombres,
        apellidos,
        programa: readLeadField(source, ['programa', 'program', 'programa_academico']),
        cedula: readLeadField(source, ['cedula', 'documento', 'identificacion']),
        celular: readLeadField(source, ['celular', 'telefono', 'phone', 'telefono_movil']),
        correo: readLeadField(source, ['correo', 'email', 'mail']),
        ciudad: readLeadField(source, ['ciudad', 'city']),
        estado: readLeadField(source, ['estado', 'status'], 'nuevo'),
    };
}

function getLeadInitials(lead = {}) {
    return `${lead.nombres?.charAt(0) || ''}${lead.apellidos?.charAt(0) || ''}`.toUpperCase() || '--';
}

function getLeadFullName(lead = {}) {
    return `${lead.nombres || ''} ${lead.apellidos || ''}`.trim() || 'Nuevo Lead';
}

function getStatusClass(estado = '') {
    const normalized = String(estado).toLowerCase();

    if (normalized.includes('interes')) {
        return 'status-interesado';
    }

    if (normalized.includes('calific')) {
        return 'status-calificado';
    }

    return 'status-nuevo';
}

function getStatusIcon(estado = '') {
    const normalized = String(estado).toLowerCase();

    if (normalized.includes('interes')) {
        return 'fa-check-circle';
    }

    if (normalized.includes('calific')) {
        return 'fa-check';
    }

    return 'fa-star';
}

function setLeadPreview(lead) {
    const nameDisplay = document.getElementById('leadNameDisplay');
    const programDisplay = document.getElementById('leadProgramDisplay');
    const avatar = document.getElementById('leadAvatar');

    if (nameDisplay) {
        nameDisplay.textContent = getLeadFullName(lead);
    }

    if (programDisplay) {
        programDisplay.textContent = lead.programa || 'Sin programa';
    }

    if (avatar) {
        avatar.textContent = getLeadInitials(lead);
    }
}

function populateLeadForm(lead) {
    const formValues = {
        nombres: lead.nombres || '',
        apellidos: lead.apellidos || '',
        programa: lead.programa || '',
        cedula: lead.cedula || '',
        celular: lead.celular || '',
        correo: lead.correo || '',
    };

    Object.entries(formValues).forEach(([field, value]) => {
        const input = document.getElementById(field);
        if (input) {
            input.value = value;
        }
    });

    setLeadPreview(lead);
}

function setSelectedLeadRow(leadId) {
    document.querySelectorAll('.lead-list-row').forEach((row) => {
        row.classList.toggle('active', String(row.dataset.leadId) === String(leadId));
    });
}

function createLeadRowMarkup(lead) {
    return `
        <td class="lead-list-avatar">${getLeadInitials(lead)}</td>
        <td>
            <div class="lead-list-name">${getLeadFullName(lead)}</div>
            <div class="lead-list-phone">${lead.celular || 'Sin celular'}</div>
        </td>
        <td class="lead-list-program">${lead.programa || 'Sin programa'}</td>
        <td class="lead-list-city">${lead.ciudad || ''}</td>
        <td class="lead-list-status">
            <span class="status-badge ${getStatusClass(lead.estado)}"><i class="lead-list-icon fas ${getStatusIcon(lead.estado)}"></i></span>
        </td>
    `;
}

function createLeadRowElement(lead) {
    const row = document.createElement('tr');
    row.className = 'lead-list-row';
    row.dataset.leadId = lead.id;
    row.dataset.leadDocumentId = lead.documentId || '';
    row.innerHTML = createLeadRowMarkup(lead);
    row.addEventListener('click', () => openLeadDetail(lead.id));
    return row;
}

function renderLeadsList() {
    const tableBody = document.querySelector('.leads-list-table tbody');

    if (!tableBody) {
        return;
    }

    tableBody.innerHTML = '';

    if (!leadsState.leads.length) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
            <td colspan="5" style="text-align: center; padding: 24px;">
                No hay leads disponibles en Strapi.
            </td>
        `;
        tableBody.appendChild(emptyRow);
        return;
    }

    leadsState.leads.forEach((lead) => {
        tableBody.appendChild(createLeadRowElement(lead));
    });
}

function getLeadPayloadFromForm(prefix = '') {
    const suffix = prefix ? `_${prefix}` : '';

    return {
        nombres: document.getElementById(`nombres${suffix}`)?.value.trim() || '',
        apellidos: document.getElementById(`apellidos${suffix}`)?.value.trim() || '',
        programa: document.getElementById(`programa${suffix}`)?.value.trim() || '',
        cedula: document.getElementById(`cedula${suffix}`)?.value.trim() || '',
        celular: document.getElementById(`celular${suffix}`)?.value.trim() || '',
        correo: document.getElementById(`correo${suffix}`)?.value.trim() || '',
    };
}

async function fetchLeadsFromStrapi() {
    const config = getStrapiConfig();

    if (!config.enabled) {
        leadsState.leads = LEADS_MOCK_DATA.map((lead) => ({ ...lead }));
        renderLeadsList();
        return;
    }

    const response = await requestStrapi(`/${config.leadsEndpoint}`, {
        query: 'pagination[pageSize]=100&sort=createdAt:desc',
    });
    const rows = Array.isArray(response?.data) ? response.data : [];
    leadsState.leads = rows.map(normalizeLead);
    renderLeadsList();
}

async function createLeadInStrapi(payload) {
    const config = getStrapiConfig();

    if (!config.enabled) {
        const nextId = Math.max(0, ...leadsState.leads.map((lead) => Number(lead.id) || 0)) + 1;
        return {
            id: nextId,
            estado: 'nuevo',
            ciudad: '',
            ...payload,
        };
    }

    const response = await requestStrapi(`/${config.leadsEndpoint}`, {
        method: 'POST',
        body: JSON.stringify({ data: payload }),
    });

    return normalizeLead(response?.data || response);
}

async function updateLeadInStrapi(lead, payload) {
    const config = getStrapiConfig();

    if (!config.enabled) {
        return {
            ...lead,
            ...payload,
        };
    }

    const resourceId = lead.documentId || lead.id;
    const response = await requestStrapi(`/${config.leadsEndpoint}/${resourceId}`, {
        method: 'PUT',
        body: JSON.stringify({ data: payload }),
    });

    return normalizeLead(response?.data || response);
}

function syncLeadInState(updatedLead) {
    const index = leadsState.leads.findIndex((lead) => String(lead.id) === String(updatedLead.id));

    if (index >= 0) {
        leadsState.leads[index] = updatedLead;
    } else {
        leadsState.leads.unshift(updatedLead);
    }

    leadsState.currentLead = { ...updatedLead };
    leadsState.currentLeadOriginal = { ...updatedLead };
    renderLeadsList();
    setSelectedLeadRow(updatedLead.id);
}

function openLeadDetail(leadId) {
    const lead = leadsState.leads.find((item) => String(item.id) === String(leadId));
    const leadsListView = document.getElementById('leadsListView');
    const leadDetailView = document.getElementById('leadDetailView');
    const pageTitle = document.getElementById('pageTitle');

    if (!lead || !leadsListView || !leadDetailView) {
        return;
    }

    leadsState.currentLead = { ...lead };
    leadsState.currentLeadOriginal = { ...lead };
    populateLeadForm(lead);
    disableEditMode();
    setSelectedLeadRow(lead.id);

    leadsListView.style.display = 'none';
    leadDetailView.classList.add('active');

    if (pageTitle) {
        pageTitle.textContent = `Hoja de Vida - ${getLeadFullName(lead)}`;
    }
}

function switchToListView() {
    const leadsListView = document.getElementById('leadsListView');
    const leadDetailView = document.getElementById('leadDetailView');
    const pageTitle = document.getElementById('pageTitle');

    if (leadsListView) {
        leadsListView.style.display = 'flex';
    }

    if (leadDetailView) {
        leadDetailView.classList.remove('active');
    }

    if (pageTitle) {
        pageTitle.textContent = 'Leads';
    }
}

function updateLeadDisplay() {
    const lead = {
        nombres: document.getElementById('nombres')?.value || '',
        apellidos: document.getElementById('apellidos')?.value || '',
        programa: document.getElementById('programa')?.value || '',
    };

    setLeadPreview(lead);
}

function disableEditMode() {
    const editBtn = document.getElementById('editBtn');
    const saveBtn = document.querySelector('#leadForm #saveBtn');
    const cancelBtn = document.querySelector('#leadForm #cancelBtn');
    const inputs = document.querySelectorAll('#leadForm .form-input');

    if (editBtn) editBtn.style.display = 'flex';
    if (saveBtn) saveBtn.style.display = 'none';
    if (cancelBtn) cancelBtn.style.display = 'none';

    inputs.forEach((input) => {
        input.disabled = true;
    });
}

function initLeadsFormEditing() {
    const editBtn = document.getElementById('editBtn');
    const saveBtn = document.querySelector('#leadForm #saveBtn');
    const cancelBtn = document.querySelector('#leadForm #cancelBtn');
    const leadForm = document.getElementById('leadForm');
    const inputs = leadForm ? leadForm.querySelectorAll('.form-input') : [];

    if (!editBtn || !saveBtn || !cancelBtn || !leadForm || leadForm.dataset.bound === 'true') {
        return;
    }

    leadForm.dataset.bound = 'true';

    editBtn.addEventListener('click', () => {
        if (!leadsState.currentLead) {
            alert('Selecciona un lead para editar.');
            return;
        }

        leadsState.currentLeadOriginal = { ...leadsState.currentLead };

        inputs.forEach((input) => {
            input.disabled = false;
        });

        editBtn.style.display = 'none';
        saveBtn.style.display = 'flex';
        cancelBtn.style.display = 'flex';
    });

    cancelBtn.addEventListener('click', () => {
        if (leadsState.currentLeadOriginal) {
            populateLeadForm(leadsState.currentLeadOriginal);
        }

        disableEditMode();
    });

    leadForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!leadsState.currentLead) {
            alert('Selecciona un lead antes de guardar cambios.');
            return;
        }

        const payload = getLeadPayloadFromForm();

        try {
            const updatedLead = await updateLeadInStrapi(leadsState.currentLead, payload);
            syncLeadInState(updatedLead);
            populateLeadForm(updatedLead);
            disableEditMode();
            alert('Los cambios fueron guardados correctamente en Strapi.');
        } catch (error) {
            console.error('Error actualizando lead en Strapi:', error);
            alert(`No fue posible guardar en Strapi.\n\n${error.message}`);
        }
    });

    document.getElementById('nombres')?.addEventListener('input', updateLeadDisplay);
    document.getElementById('apellidos')?.addEventListener('input', updateLeadDisplay);
    document.getElementById('programa')?.addEventListener('input', updateLeadDisplay);
}

function initCreateLeadForm() {
    const createLeadBtn = document.getElementById('createLeadBtn');
    const leadCreateModal = document.getElementById('leadCreateModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const leadFormCreate = document.getElementById('leadFormCreate');
    const cancelBtnCreate = document.getElementById('cancelBtnCreate');
    const nombresInput = document.getElementById('nombres_create');
    const apellidosInput = document.getElementById('apellidos_create');
    const programaSelect = document.getElementById('programa_create');

    if (!createLeadBtn || !leadCreateModal || !leadFormCreate || leadFormCreate.dataset.bound === 'true') {
        return;
    }

    leadFormCreate.dataset.bound = 'true';

    const openModal = () => {
        leadFormCreate.reset();
        document.getElementById('newLeadAvatar').textContent = '--';
        document.getElementById('newLeadName').textContent = 'Nuevo Lead';
        document.getElementById('newLeadProgram').textContent = 'Ingrese los datos';
        leadCreateModal.classList.add('active');
        nombresInput?.focus();
    };

    const closeModal = () => {
        leadCreateModal.classList.remove('active');
    };

    const updateNewLeadDisplay = () => {
        const lead = {
            nombres: nombresInput?.value || '',
            apellidos: apellidosInput?.value || '',
            programa: programaSelect?.value || '',
        };

        document.getElementById('newLeadName').textContent = getLeadFullName(lead);
        document.getElementById('newLeadProgram').textContent = lead.programa || 'Ingrese los datos';
        document.getElementById('newLeadAvatar').textContent = getLeadInitials(lead);
    };

    createLeadBtn.addEventListener('click', openModal);
    modalCloseBtn?.addEventListener('click', closeModal);
    modalOverlay?.addEventListener('click', closeModal);
    cancelBtnCreate?.addEventListener('click', closeModal);
    nombresInput?.addEventListener('input', updateNewLeadDisplay);
    apellidosInput?.addEventListener('input', updateNewLeadDisplay);
    programaSelect?.addEventListener('change', updateNewLeadDisplay);

    leadFormCreate.addEventListener('submit', async (e) => {
        e.preventDefault();

        const payload = getLeadPayloadFromForm('create');

        if (!payload.nombres) {
            alert('Por favor ingresa el nombre');
            return;
        }

        if (!payload.apellidos) {
            alert('Por favor ingresa el apellido');
            return;
        }

        if (!payload.programa) {
            alert('Por favor selecciona un programa');
            return;
        }

        try {
            const newLead = await createLeadInStrapi(payload);
            syncLeadInState(newLead);
            closeModal();
            openLeadDetail(newLead.id);
            alert(`Lead "${getLeadFullName(newLead)}" creado exitosamente en Strapi.`);
        } catch (error) {
            console.error('Error creando lead en Strapi:', error);
            alert(`No fue posible crear el lead en Strapi.\n\n${error.message}`);
        }
    });
}

async function initLeadsModule() {
    const leadsListView = document.getElementById('leadsListView');
    const leadDetailView = document.getElementById('leadDetailView');
    const backToListBtn = document.getElementById('backToListBtn');

    if (!leadsListView || !leadDetailView || leadsState.initialized) {
        return;
    }

    leadsState.initialized = true;

    if (backToListBtn) {
        backToListBtn.addEventListener('click', switchToListView);
    }

    initLeadsFormEditing();
    initCreateLeadForm();

    try {
        await fetchLeadsFromStrapi();
    } catch (error) {
        console.error('Error cargando leads desde Strapi:', error);
        alert(`No fue posible preparar los leads.\n\n${error.message}`);
    }
}

/* ========================================
   INICIALIZACION - EXTENSIONES
   ======================================== */

async function initCRM() {
    console.log('Inicializando CRM...');

    initCRMBase();

    if (document.getElementById('leadsListView')) {
        await initLeadsModule();
    }

    if (document.getElementById('messagingModule') && typeof initMessagingModule === 'function') {
        initMessagingModule();
    }

    console.log('CRM inicializado correctamente');
}

window.initCRM = initCRM;
window.CRM.initCRM = initCRM;
window.CRM.initLeadsModule = initLeadsModule;
window.CRM.updateLeadDisplay = updateLeadDisplay;
window.CRM.disableEditMode = disableEditMode;

document.addEventListener('DOMContentLoaded', () => {
    window.initCRM();

    setTimeout(() => {
        // updateNotificationBadge(5);
    }, 2000);
});
