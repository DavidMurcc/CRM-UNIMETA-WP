const CRM_STORAGE_KEYS = {
    leads: 'crm-unimeta-leads-v2',
    conversations: 'crm-unimeta-conversations-v2',
    settings: 'crm-unimeta-settings-v2',
};

const CRM_STATUS_META = {
    nuevo: { label: 'Nuevo', className: 'status-nuevo', icon: 'fa-star' },
    interesado: { label: 'Interesado', className: 'status-interesado', icon: 'fa-bullseye' },
    calificado: { label: 'Calificado', className: 'status-calificado', icon: 'fa-check' },
    matriculado: { label: 'Matriculado', className: 'status-matriculado', icon: 'fa-user-graduate' },
    perdido: { label: 'Perdido', className: 'status-perdido', icon: 'fa-xmark' },
    inactivo: { label: 'Inactivo', className: 'status-inactivo', icon: 'fa-pause' },
};

const CRM_SOURCE_META = {
    whatsapp: 'WhatsApp',
    formulario: 'Formulario',
    referidos: 'Referidos',
    evento: 'Evento',
    llamada: 'Llamada',
    correo: 'Correo',
    meta_ads: 'Meta Ads',
};

const CRM_PRIORITY_META = {
    alta: { label: 'Alta', className: 'priority-high' },
    media: { label: 'Media', className: 'priority-medium' },
    baja: { label: 'Baja', className: 'priority-low' },
};

const CRM_ACTION_TYPE_META = {
    llamada: 'Llamada',
    whatsapp: 'WhatsApp',
    correo: 'Correo',
    visita: 'Visita',
    seguimiento: 'Seguimiento',
};

const LEAD_FIELD_DEFINITIONS = [
    { key: 'nombres', label: 'Nombres', type: 'string', required: true },
    { key: 'apellidos', label: 'Apellidos', type: 'string', required: true },
    { key: 'programa', label: 'Programa', type: 'string', required: true },
    { key: 'cedula', label: 'Cedula', type: 'string', required: false },
    { key: 'celular', label: 'Celular', type: 'string', required: false },
    { key: 'correo', label: 'Correo', type: 'email', required: false },
    { key: 'ciudad', label: 'Ciudad', type: 'string', required: false },
    { key: 'estado', label: 'Estado', type: 'enumeration', required: true },
    { key: 'fuente', label: 'Fuente', type: 'enumeration', required: false },
    { key: 'asesor', label: 'Asesor', type: 'relation/string', required: false },
    { key: 'prioridad', label: 'Prioridad', type: 'enumeration', required: false },
    { key: 'fecha_ultimo_contacto', label: 'Fecha ultimo contacto', type: 'datetime', required: false },
    { key: 'fecha_proxima_accion', label: 'Fecha proxima accion', type: 'datetime', required: false },
    { key: 'tipo_proxima_accion', label: 'Tipo proxima accion', type: 'enumeration', required: false },
    { key: 'notas', label: 'Notas', type: 'text', required: false },
];

const DEFAULT_SETTINGS = {
    programas: [
        'Administracion de Empresas',
        'Ingenieria de Sistemas',
        'Contabilidad',
        'Derecho',
        'Psicologia',
        'Ingenieria Ambiental',
    ],
    asesores: [
        'Andrea Cardenas',
        'Sofia Perez',
        'Carlos Ruiz',
        'Maria Rodriguez',
    ],
    fuentes: ['whatsapp', 'formulario', 'referidos', 'evento', 'llamada', 'correo', 'meta_ads'],
    estados: ['nuevo', 'interesado', 'calificado', 'matriculado', 'perdido', 'inactivo'],
    prioridades: ['alta', 'media', 'baja'],
    tiposAccion: ['llamada', 'whatsapp', 'correo', 'visita', 'seguimiento'],
    plantillas: [
        {
            nombre: 'Bienvenida institucional',
            canal: 'WhatsApp',
            cuerpo: 'Hola, gracias por tu interes en UNIMETA. Te comparto la informacion inicial del programa.',
        },
        {
            nombre: 'Recordatorio de llamada',
            canal: 'WhatsApp',
            cuerpo: 'Te recordamos la llamada de seguimiento programada para hoy.',
        },
        {
            nombre: 'Envio de brochure',
            canal: 'Correo',
            cuerpo: 'Adjuntamos brochure, pensum y opciones de apoyo financiero.',
        },
    ],
};

function createSeedActivity(tipo, titulo, descripcion, fecha, meta = []) {
    return {
        id: `${tipo}-${Math.random().toString(16).slice(2, 10)}`,
        tipo,
        titulo,
        descripcion,
        fecha,
        meta,
    };
}

function createSeedMessage(tipo, texto, fecha) {
    return {
        id: `${tipo}-${Math.random().toString(16).slice(2, 10)}`,
        tipo,
        texto,
        fecha,
    };
}

const DEMO_LEADS = [
    {
        id: 'lead-001',
        nombres: 'Maria Camila',
        apellidos: 'Rodriguez',
        programa: 'Administracion de Empresas',
        cedula: '1053847291',
        celular: '+57 310 456 7890',
        correo: 'maria.camila@email.com',
        ciudad: 'Villavicencio',
        estado: 'interesado',
        fuente: 'whatsapp',
        asesor: 'Andrea Cardenas',
        prioridad: 'alta',
        fecha_creacion: '2026-03-15T09:10:00-05:00',
        fecha_ultimo_contacto: '2026-03-23T10:16:00-05:00',
        fecha_proxima_accion: '2026-03-24T09:00:00-05:00',
        tipo_proxima_accion: 'llamada',
        notas: 'Interesada en becas regionales y en iniciar en el semestre B.',
        actividades: [
            createSeedActivity('message', 'Consulta por becas', 'Solicito informacion sobre becas institucionales.', '2026-03-23T10:14:00-05:00', ['WhatsApp', 'Alta intencion']),
            createSeedActivity('call', 'Llamada de seguimiento', 'Se explicaron los requisitos y quedo agendada una llamada de cierre.', '2026-03-23T09:40:00-05:00', ['Andrea Cardenas']),
            createSeedActivity('email', 'Envio de brochure', 'Se envio brochure financiero y plan de estudios.', '2026-03-22T17:05:00-05:00', ['Automatico']),
        ],
    },
    {
        id: 'lead-002',
        nombres: 'Juan Andres',
        apellidos: 'Martinez',
        programa: 'Ingenieria de Sistemas',
        cedula: '1087654321',
        celular: '+57 311 234 5678',
        correo: 'juan.andres@email.com',
        ciudad: 'Acacias',
        estado: 'nuevo',
        fuente: 'formulario',
        asesor: 'Sofia Perez',
        prioridad: 'media',
        fecha_creacion: '2026-03-22T08:30:00-05:00',
        fecha_ultimo_contacto: '2026-03-22T08:30:00-05:00',
        fecha_proxima_accion: '2026-03-23T14:30:00-05:00',
        tipo_proxima_accion: 'whatsapp',
        notas: 'Solicito horario nocturno y pensum.',
        actividades: [
            createSeedActivity('note', 'Lead creado desde formulario', 'Ingreso automatico desde landing de admisiones.', '2026-03-22T08:30:00-05:00', ['Formulario web']),
        ],
    },
    {
        id: 'lead-003',
        nombres: 'Laura',
        apellidos: 'Gonzalez Perez',
        programa: 'Contabilidad',
        cedula: '1023456789',
        celular: '+57 312 567 8901',
        correo: 'laura.gonzalez@email.com',
        ciudad: 'Puerto Lopez',
        estado: 'calificado',
        fuente: 'whatsapp',
        asesor: 'Carlos Ruiz',
        prioridad: 'alta',
        fecha_creacion: '2026-03-18T11:20:00-05:00',
        fecha_ultimo_contacto: '2026-03-23T08:45:00-05:00',
        fecha_proxima_accion: '2026-03-24T15:00:00-05:00',
        tipo_proxima_accion: 'correo',
        notas: 'Completo formulario y envio documentos basicos.',
        actividades: [
            createSeedActivity('message', 'Confirmacion de formulario', 'Aviso que ya completo el formulario institucional.', '2026-03-23T08:45:00-05:00', ['WhatsApp']),
            createSeedActivity('note', 'Lead calificado', 'Cumple perfil y pasa a etapa de cierre.', '2026-03-22T12:10:00-05:00', ['Carlos Ruiz']),
        ],
    },
    {
        id: 'lead-004',
        nombres: 'Carlos',
        apellidos: 'Fernandez Ruiz',
        programa: 'Derecho',
        cedula: '1112233445',
        celular: '+57 313 678 9012',
        correo: 'carlos.fernandez@email.com',
        ciudad: 'Bogota',
        estado: 'interesado',
        fuente: 'evento',
        asesor: 'Andrea Cardenas',
        prioridad: 'media',
        fecha_creacion: '2026-03-17T15:00:00-05:00',
        fecha_ultimo_contacto: '2026-03-22T16:10:00-05:00',
        fecha_proxima_accion: '2026-03-25T10:00:00-05:00',
        tipo_proxima_accion: 'visita',
        notas: 'Confirmo asistencia a charla virtual del viernes.',
        actividades: [
            createSeedActivity('message', 'Confirmacion de evento', 'Acepto invitacion a charla virtual.', '2026-03-22T16:10:00-05:00', ['Evento']),
            createSeedActivity('call', 'Primer contacto', 'Se resolvieron dudas generales de costos.', '2026-03-20T10:00:00-05:00', ['Andrea Cardenas']),
        ],
    },
    {
        id: 'lead-005',
        nombres: 'Sandra',
        apellidos: 'Lopez Moreno',
        programa: 'Psicologia',
        cedula: '1009988776',
        celular: '+57 314 789 0123',
        correo: 'sandra.lopez@email.com',
        ciudad: 'Villavicencio',
        estado: 'matriculado',
        fuente: 'referidos',
        asesor: 'Maria Rodriguez',
        prioridad: 'alta',
        fecha_creacion: '2026-03-05T09:10:00-05:00',
        fecha_ultimo_contacto: '2026-03-21T09:00:00-05:00',
        fecha_proxima_accion: '',
        tipo_proxima_accion: '',
        notas: 'Proceso cerrado con exito y documentacion completa.',
        actividades: [
            createSeedActivity('note', 'Matricula confirmada', 'Pago y documentos validados por admisiones.', '2026-03-21T09:00:00-05:00', ['Maria Rodriguez']),
        ],
    },
    {
        id: 'lead-006',
        nombres: 'Paula',
        apellidos: 'Garcia Diaz',
        programa: 'Ingenieria Ambiental',
        cedula: '1097766554',
        celular: '+57 315 555 8877',
        correo: 'paula.garcia@email.com',
        ciudad: 'Granada',
        estado: 'perdido',
        fuente: 'meta_ads',
        asesor: 'Sofia Perez',
        prioridad: 'baja',
        fecha_creacion: '2026-03-08T14:00:00-05:00',
        fecha_ultimo_contacto: '2026-03-18T11:30:00-05:00',
        fecha_proxima_accion: '',
        tipo_proxima_accion: '',
        notas: 'No continuo por presupuesto y decision familiar.',
        actividades: [
            createSeedActivity('note', 'Cierre perdido', 'Se registro motivo de perdida: presupuesto.', '2026-03-18T11:30:00-05:00', ['Sofia Perez']),
        ],
    },
];

const DEMO_CONVERSATIONS = [
    {
        id: 'conv-001',
        lead_id: 'lead-001',
        canal: 'WhatsApp',
        etiqueta: 'Beca',
        ultima_respuesta_minutos: 2,
        sin_respuesta: false,
        ultima_actualizacion: '2026-03-23T10:16:00-05:00',
        mensajes: [
            createSeedMessage('incoming', 'Hola, estoy interesada en conocer las becas disponibles para Administracion de Empresas.', '2026-03-23T10:14:00-05:00'),
            createSeedMessage('outgoing', 'Claro, Maria Camila. Tenemos becas por rendimiento academico y convenios regionales.', '2026-03-23T10:15:00-05:00'),
            createSeedMessage('incoming', 'Quisiera saber si aun puedo aplicar a beca para el proximo semestre.', '2026-03-23T10:16:00-05:00'),
        ],
    },
    {
        id: 'conv-002',
        lead_id: 'lead-002',
        canal: 'WhatsApp',
        etiqueta: 'Pensum',
        ultima_respuesta_minutos: 48,
        sin_respuesta: true,
        ultima_actualizacion: '2026-03-23T08:22:00-05:00',
        mensajes: [
            createSeedMessage('incoming', 'Me compartes informacion del plan de estudios y horario nocturno?', '2026-03-23T08:22:00-05:00'),
        ],
    },
    {
        id: 'conv-003',
        lead_id: 'lead-003',
        canal: 'WhatsApp',
        etiqueta: 'Formulario',
        ultima_respuesta_minutos: 12,
        sin_respuesta: false,
        ultima_actualizacion: '2026-03-23T08:45:00-05:00',
        mensajes: [
            createSeedMessage('incoming', 'Ya complete el formulario. Quedo atenta al siguiente paso.', '2026-03-23T08:45:00-05:00'),
            createSeedMessage('outgoing', 'Perfecto, Laura. Enviaremos el siguiente paso a tu correo en el transcurso del dia.', '2026-03-23T08:52:00-05:00'),
        ],
    },
    {
        id: 'conv-004',
        lead_id: 'lead-004',
        canal: 'WhatsApp',
        etiqueta: 'Evento',
        ultima_respuesta_minutos: 25,
        sin_respuesta: false,
        ultima_actualizacion: '2026-03-22T16:10:00-05:00',
        mensajes: [
            createSeedMessage('incoming', 'Perfecto, puedo asistir a la charla virtual del viernes.', '2026-03-22T16:10:00-05:00'),
            createSeedMessage('outgoing', 'Excelente, te enviaremos el enlace una hora antes del evento.', '2026-03-22T16:18:00-05:00'),
        ],
    },
];

const CRM_STATE = {
    dataMode: 'demo',
    settings: clone(DEFAULT_SETTINGS),
    leads: [],
    conversations: [],
    currentLeadId: null,
    currentLeadSnapshot: null,
    currentConversationId: null,
    currentPipelineLeadId: null,
};

function clone(value) {
    return JSON.parse(JSON.stringify(value));
}

function getRuntimeConfig() {
    const runtimeConfig = window.CRM_CONFIG || {};
    const defaultLeadFields = LEAD_FIELD_DEFINITIONS
        .filter((field) => ['nombres', 'apellidos', 'programa', 'cedula', 'celular', 'correo', 'ciudad', 'estado'].includes(field.key))
        .map((field) => field.key);

    return {
        strapiEnabled: runtimeConfig.strapiEnabled ?? false,
        strapiBaseUrl: (runtimeConfig.strapiBaseUrl || 'http://localhost:1337').replace(/\/$/, ''),
        strapiApiPath: runtimeConfig.strapiApiPath || '/api',
        endpoints: {
            leads: runtimeConfig.endpoints?.leads || runtimeConfig.strapiLeadsEndpoint || 'leads',
            conversations: runtimeConfig.endpoints?.conversations || '',
            settings: runtimeConfig.endpoints?.settings || '',
        },
        leadWritableFields: runtimeConfig.leadWritableFields || defaultLeadFields,
        allowLocalFallback: runtimeConfig.allowLocalFallback ?? true,
    };
}

function ensureLocalSeedData() {
    if (!localStorage.getItem(CRM_STORAGE_KEYS.settings)) {
        writeStorage(CRM_STORAGE_KEYS.settings, clone(DEFAULT_SETTINGS));
    }

    if (!localStorage.getItem(CRM_STORAGE_KEYS.leads)) {
        writeStorage(CRM_STORAGE_KEYS.leads, clone(DEMO_LEADS));
    }

    if (!localStorage.getItem(CRM_STORAGE_KEYS.conversations)) {
        writeStorage(CRM_STORAGE_KEYS.conversations, clone(DEMO_CONVERSATIONS));
    }
}

function readStorage(key, fallbackValue) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallbackValue;
    } catch (error) {
        console.error('No fue posible leer localStorage:', error);
        return fallbackValue;
    }
}

function writeStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('No fue posible guardar localStorage:', error);
    }
}

function readField(source, keys, defaultValue = '') {
    for (const key of keys) {
        if (source[key] !== undefined && source[key] !== null && source[key] !== '') {
            return source[key];
        }
    }

    return defaultValue;
}

function normalizeText(value) {
    return String(value || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

function createId(prefix) {
    return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function getLeadKey(lead) {
    return String(lead.documentId || lead.id || `${lead.nombres}-${lead.apellidos}-${lead.cedula || ''}`);
}

function normalizeActivity(item = {}) {
    const meta = Array.isArray(item.meta) ? item.meta : [];

    return {
        id: item.id || createId('activity'),
        tipo: readField(item, ['tipo', 'type'], 'note'),
        titulo: readField(item, ['titulo', 'title'], 'Actividad'),
        descripcion: readField(item, ['descripcion', 'description'], ''),
        fecha: readField(item, ['fecha', 'createdAt', 'updatedAt'], new Date().toISOString()),
        meta,
    };
}

function normalizeLead(item = {}) {
    const source = item.attributes && typeof item.attributes === 'object'
        ? { id: item.id, documentId: item.documentId || item.attributes.documentId, ...item.attributes }
        : item;

    const actividadesRaw = readField(source, ['actividades', 'timeline', 'activity'], []);
    const actividades = Array.isArray(actividadesRaw)
        ? actividadesRaw.map(normalizeActivity).sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
        : [];

    return {
        id: String(readField(source, ['id', 'documentId'], createId('lead'))),
        documentId: readField(source, ['documentId'], ''),
        nombres: readField(source, ['nombres', 'nombre', 'firstName']),
        apellidos: readField(source, ['apellidos', 'apellido', 'lastName']),
        programa: readField(source, ['programa', 'program', 'programa_academico']),
        cedula: readField(source, ['cedula', 'documento', 'identificacion']),
        celular: readField(source, ['celular', 'telefono', 'phone']),
        correo: readField(source, ['correo', 'email', 'mail']),
        ciudad: readField(source, ['ciudad', 'city']),
        estado: readField(source, ['estado', 'status'], 'nuevo'),
        fuente: readField(source, ['fuente', 'source'], 'formulario'),
        asesor: readField(source, ['asesor', 'asesor_asignado', 'owner'], ''),
        prioridad: readField(source, ['prioridad', 'priority'], 'media'),
        fecha_creacion: readField(source, ['fecha_creacion', 'createdAt'], ''),
        fecha_ultimo_contacto: readField(source, ['fecha_ultimo_contacto', 'updatedAt', 'lastContactAt'], ''),
        fecha_proxima_accion: readField(source, ['fecha_proxima_accion', 'nextActionAt'], ''),
        tipo_proxima_accion: readField(source, ['tipo_proxima_accion', 'nextActionType'], ''),
        notas: readField(source, ['notas', 'notes'], ''),
        actividades,
    };
}

function normalizeConversation(item = {}) {
    const source = item.attributes && typeof item.attributes === 'object'
        ? { id: item.id, documentId: item.documentId || item.attributes.documentId, ...item.attributes }
        : item;

    const mensajes = Array.isArray(source.mensajes)
        ? source.mensajes.map((message) => ({
            id: message.id || createId('message'),
            tipo: readField(message, ['tipo', 'type'], 'incoming'),
            texto: readField(message, ['texto', 'text'], ''),
            fecha: readField(message, ['fecha', 'createdAt'], new Date().toISOString()),
        }))
        : [];

    return {
        id: String(readField(source, ['id', 'documentId'], createId('conversation'))),
        documentId: readField(source, ['documentId'], ''),
        lead_id: String(readField(source, ['lead_id', 'leadId'], '')),
        canal: readField(source, ['canal', 'channel'], 'WhatsApp'),
        etiqueta: readField(source, ['etiqueta', 'tag'], 'General'),
        ultima_respuesta_minutos: Number(readField(source, ['ultima_respuesta_minutos', 'responseMinutes'], 0)),
        sin_respuesta: Boolean(readField(source, ['sin_respuesta', 'pendingResponse'], false)),
        ultima_actualizacion: readField(source, ['ultima_actualizacion', 'updatedAt'], ''),
        mensajes,
    };
}

function normalizeSettings(item = {}) {
    return {
        programas: Array.isArray(item.programas) && item.programas.length ? item.programas : clone(DEFAULT_SETTINGS.programas),
        asesores: Array.isArray(item.asesores) && item.asesores.length ? item.asesores : clone(DEFAULT_SETTINGS.asesores),
        fuentes: Array.isArray(item.fuentes) && item.fuentes.length ? item.fuentes : clone(DEFAULT_SETTINGS.fuentes),
        estados: Array.isArray(item.estados) && item.estados.length ? item.estados : clone(DEFAULT_SETTINGS.estados),
        prioridades: Array.isArray(item.prioridades) && item.prioridades.length ? item.prioridades : clone(DEFAULT_SETTINGS.prioridades),
        tiposAccion: Array.isArray(item.tiposAccion) && item.tiposAccion.length ? item.tiposAccion : clone(DEFAULT_SETTINGS.tiposAccion),
        plantillas: Array.isArray(item.plantillas) && item.plantillas.length ? item.plantillas : clone(DEFAULT_SETTINGS.plantillas),
    };
}

function formatDate(dateValue, options = { dateStyle: 'medium' }) {
    if (!dateValue) {
        return 'Sin registro';
    }

    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) {
        return 'Sin registro';
    }

    return new Intl.DateTimeFormat('es-CO', options).format(date);
}

function formatDateForInput(dateValue) {
    if (!dateValue) {
        return '';
    }

    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) {
        return '';
    }

    return new Intl.DateTimeFormat('en-CA').format(date);
}

function formatRelativeTime(dateValue) {
    if (!dateValue) {
        return 'Sin registro';
    }

    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) {
        return 'Sin registro';
    }

    const diffMinutes = Math.round((Date.now() - date.getTime()) / 60000);

    if (diffMinutes < 1) {
        return 'Hace instantes';
    }

    if (diffMinutes < 60) {
        return `Hace ${diffMinutes} min`;
    }

    const diffHours = Math.round(diffMinutes / 60);
    if (diffHours < 24) {
        return `Hace ${diffHours} h`;
    }

    const diffDays = Math.round(diffHours / 24);
    return `Hace ${diffDays} dia${diffDays === 1 ? '' : 's'}`;
}

function formatResponseMinutes(minutes) {
    if (minutes <= 0) {
        return 'Sin medicion';
    }

    if (minutes < 60) {
        return `${minutes} min`;
    }

    const hours = (minutes / 60).toFixed(1);
    return `${hours} h`;
}

function getLeadFullName(lead = {}) {
    return `${lead.nombres || ''} ${lead.apellidos || ''}`.trim() || 'Nuevo lead';
}

function getLeadInitials(lead = {}) {
    return `${lead.nombres?.charAt(0) || ''}${lead.apellidos?.charAt(0) || ''}`.toUpperCase() || '--';
}

function getStatusMeta(status) {
    return CRM_STATUS_META[status] || CRM_STATUS_META.nuevo;
}

function getPriorityMeta(priority) {
    return CRM_PRIORITY_META[priority] || CRM_PRIORITY_META.media;
}

function getActionTypeLabel(type) {
    return CRM_ACTION_TYPE_META[type] || 'Sin definir';
}

function getSourceLabel(source) {
    return CRM_SOURCE_META[source] || 'Sin fuente';
}

function getActivityIcon(type) {
    const iconMap = {
        email: 'fa-envelope',
        call: 'fa-phone',
        note: 'fa-note-sticky',
        message: 'fa-comments',
        status: 'fa-arrows-rotate',
    };

    return iconMap[type] || 'fa-circle-info';
}

function isClosedStatus(status) {
    return ['matriculado', 'perdido', 'inactivo'].includes(status);
}

function isLeadOverdue(lead) {
    if (!lead.fecha_proxima_accion || isClosedStatus(lead.estado)) {
        return false;
    }

    return new Date(lead.fecha_proxima_accion).getTime() < Date.now();
}

function averageResponseMinutes(conversations) {
    if (!conversations.length) {
        return 0;
    }

    const total = conversations.reduce((sum, conversation) => sum + Number(conversation.ultima_respuesta_minutos || 0), 0);
    return Math.round(total / conversations.length);
}

function countBy(items, keyGetter) {
    return items.reduce((accumulator, item) => {
        const key = keyGetter(item);
        accumulator[key] = (accumulator[key] || 0) + 1;
        return accumulator;
    }, {});
}

function sortByNewest(items, key) {
    return [...items].sort((a, b) => new Date(b[key] || 0) - new Date(a[key] || 0));
}

function getLeadById(leadId) {
    return CRM_STATE.leads.find((lead) => String(lead.id) === String(leadId));
}

function getConversationById(conversationId) {
    return CRM_STATE.conversations.find((conversation) => String(conversation.id) === String(conversationId));
}

function buildStrapiUrl(resourcePath = '', query = '') {
    const config = getRuntimeConfig();
    const cleanPath = resourcePath ? `/${resourcePath.replace(/^\/+/, '')}` : '';
    const cleanQuery = query ? (query.startsWith('?') ? query : `?${query}`) : '';
    return `${config.strapiBaseUrl}${config.strapiApiPath}${cleanPath}${cleanQuery}`;
}

function getStrapiHeaders(includeJson = true) {
    const headers = {};
    if (includeJson) {
        headers['Content-Type'] = 'application/json';
    }

    if (window.CRM_CONFIG?.strapiToken) {
        headers.Authorization = `Bearer ${window.CRM_CONFIG.strapiToken}`;
    }

    return headers;
}

async function requestStrapi(resourcePath = '', options = {}) {
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

function mergeRemoteLeadsWithLocal(remoteLeads, localLeads) {
    const localMap = new Map(localLeads.map((lead) => [getLeadKey(lead), lead]));
    const merged = remoteLeads.map((remoteLead) => {
        const localLead = localMap.get(getLeadKey(remoteLead));
        if (!localLead) {
            return remoteLead;
        }

        return normalizeLead({
            ...localLead,
            ...remoteLead,
            id: remoteLead.id,
            documentId: remoteLead.documentId || localLead.documentId || '',
            actividades: remoteLead.actividades.length ? remoteLead.actividades : localLead.actividades,
            notas: remoteLead.notas || localLead.notas,
        });
    });

    const remoteKeys = new Set(remoteLeads.map((lead) => getLeadKey(lead)));
    const localOnly = localLeads.filter((lead) => !remoteKeys.has(getLeadKey(lead)));

    return [...merged, ...localOnly];
}

async function loadLeadsCollection() {
    const config = getRuntimeConfig();
    const localLeads = readStorage(CRM_STORAGE_KEYS.leads, []).map(normalizeLead);

    if (!config.strapiEnabled || !config.endpoints.leads) {
        CRM_STATE.dataMode = 'demo';
        return localLeads;
    }

    try {
        const response = await requestStrapi(`/${config.endpoints.leads}`, {
            query: 'pagination[pageSize]=200&sort=updatedAt:desc',
        });
        const rows = Array.isArray(response?.data) ? response.data : [];
        const remoteLeads = rows.map(normalizeLead);
        const merged = mergeRemoteLeadsWithLocal(remoteLeads, localLeads);
        CRM_STATE.dataMode = 'strapi';
        writeStorage(CRM_STORAGE_KEYS.leads, merged);
        return merged;
    } catch (error) {
        console.warn('No fue posible cargar leads desde Strapi. Se usaran datos demo.', error);
        CRM_STATE.dataMode = config.allowLocalFallback ? 'demo' : 'strapi';
        return localLeads;
    }
}

async function loadConversationCollection() {
    return readStorage(CRM_STORAGE_KEYS.conversations, []).map(normalizeConversation);
}

function loadSettingsCollection() {
    return normalizeSettings(readStorage(CRM_STORAGE_KEYS.settings, clone(DEFAULT_SETTINGS)));
}

function replaceLeadInState(lead) {
    const normalizedLead = normalizeLead(lead);
    const index = CRM_STATE.leads.findIndex((item) => String(item.id) === String(normalizedLead.id));

    if (index >= 0) {
        CRM_STATE.leads[index] = normalizedLead;
    } else {
        CRM_STATE.leads.unshift(normalizedLead);
    }

    writeStorage(CRM_STORAGE_KEYS.leads, CRM_STATE.leads);
    return normalizedLead;
}

function replaceConversationInState(conversation) {
    const normalizedConversation = normalizeConversation(conversation);
    const index = CRM_STATE.conversations.findIndex((item) => String(item.id) === String(normalizedConversation.id));

    if (index >= 0) {
        CRM_STATE.conversations[index] = normalizedConversation;
    } else {
        CRM_STATE.conversations.unshift(normalizedConversation);
    }

    writeStorage(CRM_STORAGE_KEYS.conversations, CRM_STATE.conversations);
    return normalizedConversation;
}

function buildLeadPayloadForStrapi(lead) {
    const config = getRuntimeConfig();
    const payload = {};

    config.leadWritableFields.forEach((field) => {
        payload[field] = lead[field] ?? '';
    });

    return payload;
}

async function saveLead(lead, mode = 'update') {
    const config = getRuntimeConfig();
    const normalizedLead = normalizeLead(lead);

    if (!config.strapiEnabled || !config.endpoints.leads) {
        return replaceLeadInState(normalizedLead);
    }

    const payload = buildLeadPayloadForStrapi(normalizedLead);

    try {
        let response;
        if (mode === 'create' || !normalizedLead.documentId) {
            response = await requestStrapi(`/${config.endpoints.leads}`, {
                method: 'POST',
                body: JSON.stringify({ data: payload }),
            });
        } else {
            response = await requestStrapi(`/${config.endpoints.leads}/${normalizedLead.documentId || normalizedLead.id}`, {
                method: 'PUT',
                body: JSON.stringify({ data: payload }),
            });
        }

        const responseLead = normalizeLead(response?.data || response || {});
        const mergedLead = normalizeLead({
            ...normalizedLead,
            ...responseLead,
            actividades: normalizedLead.actividades,
            notas: normalizedLead.notas,
        });

        return replaceLeadInState(mergedLead);
    } catch (error) {
        console.warn('No fue posible guardar en Strapi. El cambio queda solo en demo.', error);
        return replaceLeadInState(normalizedLead);
    }
}

function appendLeadActivity(leadId, activity) {
    const lead = getLeadById(leadId);
    if (!lead) {
        return;
    }

    const updatedLead = normalizeLead({
        ...lead,
        actividades: [normalizeActivity(activity), ...lead.actividades],
        fecha_ultimo_contacto: activity.fecha || lead.fecha_ultimo_contacto,
    });

    replaceLeadInState(updatedLead);
}

function clearElement(element) {
    if (element) {
        element.replaceChildren();
    }
}

function setTextContent(selector, value) {
    const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (element) {
        element.textContent = value;
    }
}

function createIconNode(iconClass) {
    const icon = document.createElement('i');
    icon.className = `fas ${iconClass}`;
    return icon;
}

function createStatusBadge(status) {
    const meta = getStatusMeta(status);
    const badge = document.createElement('span');
    badge.className = `status-badge ${meta.className}`;
    badge.append(createIconNode(meta.icon));
    const text = document.createElement('span');
    text.textContent = meta.label;
    badge.append(text);
    return badge;
}

function createPriorityBadge(priority) {
    const meta = getPriorityMeta(priority);
    const badge = document.createElement('span');
    badge.className = `priority-badge ${meta.className}`;
    badge.textContent = meta.label;
    return badge;
}

function createEmptyState(message) {
    const wrapper = document.createElement('div');
    wrapper.className = 'empty-state';
    wrapper.textContent = message;
    return wrapper;
}

function populateSelect(select, values, placeholder, selectedValue = '') {
    if (!select) {
        return;
    }

    clearElement(select);

    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.textContent = placeholder;
    select.appendChild(placeholderOption);

    values.forEach((value) => {
        const option = document.createElement('option');
        option.value = value;

        if (select.id.includes('fuente')) {
            option.textContent = getSourceLabel(value);
        } else if (select.id.includes('estado')) {
            option.textContent = getStatusMeta(value).label;
        } else if (select.id.includes('prioridad')) {
            option.textContent = getPriorityMeta(value).label;
        } else if (select.id.includes('tipo_proxima_accion')) {
            option.textContent = getActionTypeLabel(value);
        } else {
            option.textContent = value;
        }

        option.selected = value === selectedValue;
        select.appendChild(option);
    });
}

function updateDataModeChip() {
    const chip = document.getElementById('dataModeChip');
    if (!chip) {
        return;
    }

    chip.textContent = CRM_STATE.dataMode === 'strapi' ? 'Modo Strapi' : 'Modo demo';
    chip.classList.toggle('mode-chip-strapi', CRM_STATE.dataMode === 'strapi');
}

function showToast(message, tone = 'info') {
    let container = document.getElementById('crmToastContainer');

    if (!container) {
        container = document.createElement('div');
        container.id = 'crmToastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${tone}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('toast-hide');
        setTimeout(() => toast.remove(), 250);
    }, 2600);
}

function updateNotificationBadge() {
    const badge = document.querySelector('.notification-badge');
    if (!badge) {
        return;
    }

    const overdueLeads = CRM_STATE.leads.filter(isLeadOverdue).length;
    const pendingConversations = CRM_STATE.conversations.filter((conversation) => conversation.sin_respuesta).length;
    const count = overdueLeads + pendingConversations;

    badge.textContent = String(count);
    badge.style.display = count > 0 ? 'flex' : 'none';
}

function initSidebar() {
    const toggleBtn = document.getElementById('toggleBtn');
    const sidebar = document.getElementById('sidebar');
    const navItems = document.querySelectorAll('.nav-item');

    if (document.body.dataset.sidebarInitialized === 'true') {
        return;
    }

    document.body.dataset.sidebarInitialized = 'true';

    toggleBtn?.addEventListener('click', (event) => {
        event.stopPropagation();
        sidebar?.classList.toggle('active');
    });

    navItems.forEach((item) => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar?.classList.remove('active');
            }
        });
    });

    document.addEventListener('click', (event) => {
        if (window.innerWidth <= 768 && sidebar && toggleBtn) {
            if (!sidebar.contains(event.target) && !toggleBtn.contains(event.target)) {
                sidebar.classList.remove('active');
            }
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            sidebar?.classList.remove('active');
        }
    });
}

function hydrateLeadFormSelects(prefix = '') {
    const suffix = prefix ? `_${prefix}` : '';
    populateSelect(document.getElementById(`programa${suffix}`), CRM_STATE.settings.programas, 'Selecciona un programa');
    populateSelect(document.getElementById(`estado${suffix}`), CRM_STATE.settings.estados, 'Selecciona un estado', 'nuevo');
    populateSelect(document.getElementById(`fuente${suffix}`), CRM_STATE.settings.fuentes, 'Selecciona una fuente');
    populateSelect(document.getElementById(`asesor${suffix}`), CRM_STATE.settings.asesores, 'Selecciona un asesor');
    populateSelect(document.getElementById(`prioridad${suffix}`), CRM_STATE.settings.prioridades, 'Selecciona una prioridad', 'media');
    populateSelect(document.getElementById(`tipo_proxima_accion${suffix}`), CRM_STATE.settings.tiposAccion, 'Selecciona una accion');
}

function getLeadFormPayload(prefix = '') {
    const suffix = prefix ? `_${prefix}` : '';
    return normalizeLead({
        id: prefix === 'create' ? createId('lead') : CRM_STATE.currentLeadId,
        documentId: prefix === 'create' ? '' : getLeadById(CRM_STATE.currentLeadId)?.documentId || '',
        nombres: document.getElementById(`nombres${suffix}`)?.value.trim() || '',
        apellidos: document.getElementById(`apellidos${suffix}`)?.value.trim() || '',
        programa: document.getElementById(`programa${suffix}`)?.value || '',
        estado: document.getElementById(`estado${suffix}`)?.value || 'nuevo',
        cedula: document.getElementById(`cedula${suffix}`)?.value.trim() || '',
        celular: document.getElementById(`celular${suffix}`)?.value.trim() || '',
        correo: document.getElementById(`correo${suffix}`)?.value.trim() || '',
        ciudad: document.getElementById(`ciudad${suffix}`)?.value.trim() || '',
        fuente: document.getElementById(`fuente${suffix}`)?.value || '',
        asesor: document.getElementById(`asesor${suffix}`)?.value || '',
        prioridad: document.getElementById(`prioridad${suffix}`)?.value || 'media',
        fecha_ultimo_contacto: document.getElementById(`fecha_ultimo_contacto${suffix}`)?.value || '',
        fecha_proxima_accion: document.getElementById(`fecha_proxima_accion${suffix}`)?.value || '',
        tipo_proxima_accion: document.getElementById(`tipo_proxima_accion${suffix}`)?.value || '',
        notas: document.getElementById(`notas${suffix}`)?.value.trim() || '',
        actividades: prefix === 'create' ? [createSeedActivity('note', 'Lead creado', 'Registro creado desde el frontend listo para Strapi.', new Date().toISOString(), ['Frontend CRM'])] : getLeadById(CRM_STATE.currentLeadId)?.actividades || [],
    });
}

function validateLeadPayload(lead) {
    if (!lead.nombres || !lead.apellidos || !lead.programa) {
        return 'Completa nombres, apellidos y programa.';
    }

    return '';
}

function setLeadPreview(prefix, lead) {
    const suffix = prefix ? `_${prefix}` : '';
    setTextContent(`#leadNameDisplay${suffix}`, getLeadFullName(lead));
    setTextContent(`#leadProgramDisplay${suffix}`, lead.programa || 'Sin programa');
    setTextContent(`#leadAvatar${suffix}`, getLeadInitials(lead));
}

function populateLeadForm(lead) {
    const fields = {
        nombres: lead.nombres,
        apellidos: lead.apellidos,
        programa: lead.programa,
        estado: lead.estado,
        cedula: lead.cedula,
        celular: lead.celular,
        correo: lead.correo,
        ciudad: lead.ciudad,
        fuente: lead.fuente,
        asesor: lead.asesor,
        prioridad: lead.prioridad,
        fecha_ultimo_contacto: formatDateForInput(lead.fecha_ultimo_contacto),
        fecha_proxima_accion: formatDateForInput(lead.fecha_proxima_accion),
        tipo_proxima_accion: lead.tipo_proxima_accion,
        notas: lead.notas,
    };

    Object.entries(fields).forEach(([field, value]) => {
        const input = document.getElementById(field);
        if (input) {
            input.value = value || '';
        }
    });

    setLeadPreview('', lead);
    renderLeadDetailSummary(lead);
    renderLeadTimeline(lead);
}

function setSelectedLeadRow(leadId) {
    document.querySelectorAll('.lead-list-row').forEach((row) => {
        row.classList.toggle('active', String(row.dataset.leadId) === String(leadId));
    });
}

function renderLeadDetailSummary(lead) {
    setTextContent('#leadDetailSource', getSourceLabel(lead.fuente));
    setTextContent('#leadDetailOwner', lead.asesor || 'Sin asignar');
    setTextContent('#leadDetailPriority', getPriorityMeta(lead.prioridad).label);
    setTextContent('#leadDetailNextAction', lead.fecha_proxima_accion ? `${getActionTypeLabel(lead.tipo_proxima_accion)} - ${formatDate(lead.fecha_proxima_accion)}` : 'Sin proxima accion');

    const chipContainer = document.getElementById('leadMetaChips');
    if (chipContainer) {
        clearElement(chipContainer);
        chipContainer.appendChild(createStatusBadge(lead.estado));
        chipContainer.appendChild(createPriorityBadge(lead.prioridad));

        const sourceChip = document.createElement('span');
        sourceChip.className = 'meta-chip';
        sourceChip.textContent = getSourceLabel(lead.fuente);
        chipContainer.appendChild(sourceChip);
    }
}

function renderLeadTimeline(lead) {
    const timelineList = document.getElementById('leadTimelineList');
    if (!timelineList) {
        return;
    }

    clearElement(timelineList);

    if (!lead.actividades.length) {
        timelineList.appendChild(createEmptyState('Este lead aun no tiene trazabilidad registrada.'));
        return;
    }

    lead.actividades.forEach((activity) => {
        const item = document.createElement('div');
        item.className = `timeline-item ${activity.tipo}`;

        const content = document.createElement('div');
        content.className = 'timeline-content';

        const time = document.createElement('div');
        time.className = 'timeline-time';
        time.append(createIconNode(getActivityIcon(activity.tipo)));
        const timeText = document.createElement('span');
        timeText.textContent = formatDate(activity.fecha, { dateStyle: 'medium', timeStyle: 'short' });
        time.append(timeText);

        const title = document.createElement('div');
        title.className = 'timeline-title';
        title.textContent = activity.titulo;

        const description = document.createElement('div');
        description.className = 'timeline-description';
        description.textContent = activity.descripcion;

        const meta = document.createElement('div');
        meta.className = 'timeline-meta';
        activity.meta.forEach((entry) => {
            const span = document.createElement('span');
            span.textContent = entry;
            meta.appendChild(span);
        });

        content.append(time, title, description, meta);
        item.appendChild(content);
        timelineList.appendChild(item);
    });
}

function disableLeadEditMode() {
    const editBtn = document.getElementById('editBtn');
    const saveBtn = document.getElementById('saveBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    document.querySelectorAll('#leadForm .form-input').forEach((input) => {
        input.disabled = true;
    });

    if (editBtn) {
        editBtn.style.display = 'flex';
    }

    if (saveBtn) {
        saveBtn.style.display = 'none';
    }

    if (cancelBtn) {
        cancelBtn.style.display = 'none';
    }
}

function enableLeadEditMode() {
    const editBtn = document.getElementById('editBtn');
    const saveBtn = document.getElementById('saveBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    document.querySelectorAll('#leadForm .form-input').forEach((input) => {
        input.disabled = false;
    });

    if (editBtn) {
        editBtn.style.display = 'none';
    }

    if (saveBtn) {
        saveBtn.style.display = 'flex';
    }

    if (cancelBtn) {
        cancelBtn.style.display = 'flex';
    }
}

function openLeadDetail(leadId) {
    const lead = getLeadById(leadId);
    const listView = document.getElementById('leadsListView');
    const detailView = document.getElementById('leadDetailView');
    const pageTitle = document.getElementById('pageTitle');

    if (!lead || !listView || !detailView) {
        return;
    }

    CRM_STATE.currentLeadId = lead.id;
    CRM_STATE.currentLeadSnapshot = clone(lead);
    populateLeadForm(lead);
    disableLeadEditMode();
    setSelectedLeadRow(lead.id);

    listView.style.display = 'none';
    detailView.classList.add('active');

    if (pageTitle) {
        pageTitle.textContent = `Hoja de vida - ${getLeadFullName(lead)}`;
    }
}

function switchToLeadListView() {
    const listView = document.getElementById('leadsListView');
    const detailView = document.getElementById('leadDetailView');
    const pageTitle = document.getElementById('pageTitle');

    if (listView) {
        listView.style.display = 'flex';
    }

    if (detailView) {
        detailView.classList.remove('active');
    }

    if (pageTitle) {
        pageTitle.textContent = 'Leads';
    }
}

function getFilteredLeads() {
    const searchValue = normalizeText(document.getElementById('leadSearchInput')?.value || '');
    const stateValue = document.getElementById('leadStateFilter')?.value || '';

    return CRM_STATE.leads.filter((lead) => {
        const searchable = normalizeText([
            getLeadFullName(lead),
            lead.programa,
            lead.ciudad,
            lead.asesor,
            lead.cedula,
            getSourceLabel(lead.fuente),
        ].join(' '));

        const matchesSearch = !searchValue || searchable.includes(searchValue);
        const matchesState = !stateValue || lead.estado === stateValue;
        return matchesSearch && matchesState;
    });
}

function renderLeadsList() {
    const tableBody = document.getElementById('leadsTableBody');
    if (!tableBody) {
        return;
    }

    clearElement(tableBody);

    const leads = sortByNewest(getFilteredLeads(), 'fecha_ultimo_contacto');

    if (!leads.length) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 6;
        cell.className = 'text-center';
        cell.textContent = 'No hay leads para los filtros aplicados.';
        row.appendChild(cell);
        tableBody.appendChild(row);
        return;
    }

    leads.forEach((lead) => {
        const row = document.createElement('tr');
        row.className = 'lead-list-row';
        row.dataset.leadId = lead.id;
        row.addEventListener('click', () => openLeadDetail(lead.id));

        const avatarCell = document.createElement('td');
        avatarCell.className = 'lead-list-avatar';
        avatarCell.textContent = getLeadInitials(lead);

        const leadCell = document.createElement('td');
        const name = document.createElement('div');
        name.className = 'lead-list-name';
        name.textContent = getLeadFullName(lead);
        const phone = document.createElement('div');
        phone.className = 'lead-list-phone';
        phone.textContent = lead.celular || 'Sin celular';
        leadCell.append(name, phone);

        const programCell = document.createElement('td');
        programCell.className = 'lead-list-program';
        programCell.textContent = lead.programa || 'Sin programa';

        const sourceCell = document.createElement('td');
        sourceCell.className = 'lead-list-city';
        sourceCell.textContent = getSourceLabel(lead.fuente);

        const ownerCell = document.createElement('td');
        ownerCell.className = 'lead-list-city';
        ownerCell.textContent = lead.asesor || 'Sin asignar';

        const statusCell = document.createElement('td');
        statusCell.className = 'lead-list-status';
        statusCell.appendChild(createStatusBadge(lead.estado));

        row.append(avatarCell, leadCell, programCell, sourceCell, ownerCell, statusCell);
        tableBody.appendChild(row);
    });
}

function openCreateLeadModal() {
    const modal = document.getElementById('leadCreateModal');
    const form = document.getElementById('leadFormCreate');

    if (!modal || !form) {
        return;
    }

    form.reset();
    hydrateLeadFormSelects('create');
    setLeadPreview('create', {});
    modal.classList.add('active');
    document.getElementById('nombres_create')?.focus();
}

function closeCreateLeadModal() {
    document.getElementById('leadCreateModal')?.classList.remove('active');
}

function renderDashboard() {
    if (document.body.dataset.page !== 'dashboard') {
        return;
    }

    const totalLeads = CRM_STATE.leads.length;
    const activeLeads = CRM_STATE.leads.filter((lead) => !isClosedStatus(lead.estado)).length;
    const qualifiedLeads = CRM_STATE.leads.filter((lead) => lead.estado === 'calificado').length;
    const conversionRate = totalLeads ? Math.round((CRM_STATE.leads.filter((lead) => lead.estado === 'matriculado').length / totalLeads) * 100) : 0;

    setTextContent('#dashboardTotalLeads', String(totalLeads));
    setTextContent('#dashboardActiveLeads', String(activeLeads));
    setTextContent('#dashboardQualifiedLeads', String(qualifiedLeads));
    setTextContent('#dashboardConversionRate', `${conversionRate}%`);

    const funnel = document.getElementById('dashboardFunnel');
    if (funnel) {
        clearElement(funnel);
        CRM_STATE.settings.estados.forEach((status) => {
            const count = CRM_STATE.leads.filter((lead) => lead.estado === status).length;
            const item = document.createElement('div');
            item.className = 'funnel-line';

            const label = document.createElement('span');
            label.className = 'funnel-line-label';
            label.textContent = getStatusMeta(status).label;

            const barWrapper = document.createElement('div');
            barWrapper.className = 'funnel-line-bar-wrapper';

            const bar = document.createElement('div');
            bar.className = 'funnel-line-bar';
            bar.style.width = `${totalLeads ? Math.max(14, Math.round((count / totalLeads) * 100)) : 14}%`;
            barWrapper.appendChild(bar);

            const value = document.createElement('span');
            value.className = 'funnel-line-value';
            value.textContent = String(count);

            item.append(label, barWrapper, value);
            funnel.appendChild(item);
        });
    }

    const alertList = document.getElementById('dashboardAlerts');
    if (alertList) {
        clearElement(alertList);
        const overdueLeads = CRM_STATE.leads.filter(isLeadOverdue);
        const pendingConversations = CRM_STATE.conversations.filter((conversation) => conversation.sin_respuesta);
        const alerts = [];

        overdueLeads.forEach((lead) => {
            alerts.push({
                title: `${getLeadFullName(lead)} tiene seguimiento vencido`,
                description: `Proxima accion: ${getActionTypeLabel(lead.tipo_proxima_accion)} - ${formatDate(lead.fecha_proxima_accion)}`,
                tone: 'warning',
            });
        });

        pendingConversations.forEach((conversation) => {
            const lead = getLeadById(conversation.lead_id);
            alerts.push({
                title: `${getLeadFullName(lead)} esta sin respuesta`,
                description: `Ultimo mensaje: ${formatRelativeTime(conversation.ultima_actualizacion)}`,
                tone: 'danger',
            });
        });

        if (!alerts.length) {
            alertList.appendChild(createEmptyState('No hay alertas operativas en este momento.'));
        } else {
            alerts.slice(0, 6).forEach((alert) => {
                const item = document.createElement('article');
                item.className = `alert-item alert-${alert.tone}`;
                const title = document.createElement('strong');
                title.textContent = alert.title;
                const description = document.createElement('p');
                description.textContent = alert.description;
                item.append(title, description);
                alertList.appendChild(item);
            });
        }
    }

    const recentTableBody = document.getElementById('dashboardRecentTableBody');
    if (recentTableBody) {
        clearElement(recentTableBody);
        const recentLeads = sortByNewest(CRM_STATE.leads, 'fecha_ultimo_contacto').slice(0, 6);

        recentLeads.forEach((lead) => {
            const row = document.createElement('tr');
            row.className = 'interactive-row';
            row.addEventListener('click', () => {
                window.location.href = `leads.html?lead=${encodeURIComponent(lead.id)}`;
            });

            const leadCell = document.createElement('td');
            const info = document.createElement('div');
            info.className = 'contact-cell';
            const avatar = document.createElement('div');
            avatar.className = 'contact-avatar';
            avatar.textContent = getLeadInitials(lead);
            const contactInfo = document.createElement('div');
            contactInfo.className = 'contact-info';
            const name = document.createElement('h4');
            name.textContent = getLeadFullName(lead);
            const phone = document.createElement('p');
            phone.textContent = lead.celular || 'Sin celular';
            contactInfo.append(name, phone);
            info.append(avatar, contactInfo);
            leadCell.appendChild(info);

            const programCell = document.createElement('td');
            programCell.textContent = lead.programa;

            const ownerCell = document.createElement('td');
            ownerCell.textContent = lead.asesor || 'Sin asignar';

            const statusCell = document.createElement('td');
            statusCell.appendChild(createStatusBadge(lead.estado));

            const nextActionCell = document.createElement('td');
            nextActionCell.textContent = lead.fecha_proxima_accion ? `${getActionTypeLabel(lead.tipo_proxima_accion)} - ${formatDate(lead.fecha_proxima_accion)}` : 'Sin accion';

            row.append(leadCell, programCell, ownerCell, statusCell, nextActionCell);
            recentTableBody.appendChild(row);
        });
    }
}

function getConversationCategory(conversation, lead) {
    if (conversation.sin_respuesta) {
        return 'sin-respuesta';
    }

    if ((lead?.estado || '') === 'nuevo') {
        return 'nuevos';
    }

    return 'seguimiento';
}

function getFilteredConversations() {
    const searchValue = normalizeText(document.getElementById('messagingSearchInput')?.value || '');
    const activeTab = document.querySelector('.messaging-tab.active')?.dataset.filter || 'todos';

    return sortByNewest(CRM_STATE.conversations, 'ultima_actualizacion').filter((conversation) => {
        const lead = getLeadById(conversation.lead_id);
        const searchable = normalizeText([
            getLeadFullName(lead),
            lead?.programa,
            lead?.ciudad,
            conversation.etiqueta,
        ].join(' '));

        const matchesSearch = !searchValue || searchable.includes(searchValue);
        const category = getConversationCategory(conversation, lead);
        const matchesTab = activeTab === 'todos' || activeTab === category;

        return matchesSearch && matchesTab;
    });
}

function renderConversationList() {
    const list = document.getElementById('conversationList');
    if (!list) {
        return;
    }

    clearElement(list);

    const conversations = getFilteredConversations();

    if (!conversations.length) {
        list.appendChild(createEmptyState('No hay conversaciones para los filtros activos.'));
        return;
    }

    conversations.forEach((conversation) => {
        const lead = getLeadById(conversation.lead_id);
        const item = document.createElement('article');
        item.className = 'conversation-item';
        item.classList.toggle('active', String(conversation.id) === String(CRM_STATE.currentConversationId));
        item.addEventListener('click', () => {
            CRM_STATE.currentConversationId = conversation.id;
            renderMessagingModule();
        });

        const avatar = document.createElement('div');
        avatar.className = 'conversation-avatar';
        avatar.textContent = getLeadInitials(lead || {});

        const body = document.createElement('div');
        body.className = 'conversation-body';

        const topline = document.createElement('div');
        topline.className = 'conversation-topline';
        const name = document.createElement('h3');
        name.textContent = getLeadFullName(lead || {});
        const time = document.createElement('span');
        time.textContent = formatRelativeTime(conversation.ultima_actualizacion);
        topline.append(name, time);

        const preview = document.createElement('p');
        preview.textContent = conversation.mensajes.at(-1)?.texto || 'Sin mensajes';

        const meta = document.createElement('div');
        meta.className = 'conversation-meta';
        meta.appendChild(createStatusBadge(lead?.estado || 'nuevo'));
        const channel = document.createElement('span');
        channel.textContent = conversation.canal;
        const response = document.createElement('span');
        response.textContent = `Resp. ${formatResponseMinutes(conversation.ultima_respuesta_minutos)}`;
        meta.append(channel, response);

        body.append(topline, preview, meta);
        item.append(avatar, body);
        list.appendChild(item);
    });
}

function renderConversationSummary(conversation) {
    const lead = getLeadById(conversation.lead_id);

    setTextContent('#chatContactAvatar', getLeadInitials(lead || {}));
    setTextContent('#chatContactName', getLeadFullName(lead || {}));
    setTextContent('#chatContactProgram', lead?.programa || 'Sin programa');
    setTextContent('#chatChannel', conversation.canal);
    setTextContent('#summaryStatus', getStatusMeta(lead?.estado || 'nuevo').label);
    setTextContent('#summaryChannel', conversation.canal);
    setTextContent('#summaryCity', lead?.ciudad || 'Sin ciudad');
    setTextContent('#summaryOwner', lead?.asesor || 'Sin asignar');
    setTextContent('#summaryResponse', formatResponseMinutes(conversation.ultima_respuesta_minutos));
    setTextContent('#summaryTag', conversation.etiqueta);
    setTextContent('#summaryNextAction', lead?.fecha_proxima_accion ? `${getActionTypeLabel(lead.tipo_proxima_accion)} - ${formatDate(lead.fecha_proxima_accion)}` : 'Sin proxima accion');

    const activityList = document.getElementById('conversationActivityList');
    if (activityList) {
        clearElement(activityList);
        const activities = lead?.actividades?.slice(0, 3) || [];

        if (!activities.length) {
            activityList.appendChild(createEmptyState('Sin actividad reciente asociada.'));
        } else {
            activities.forEach((activity) => {
                const item = document.createElement('div');
                item.className = 'activity-item';
                const icon = document.createElement('i');
                icon.className = `fas ${getActivityIcon(activity.tipo)}`;
                const wrapper = document.createElement('div');
                const title = document.createElement('strong');
                title.textContent = activity.titulo;
                const description = document.createElement('p');
                description.textContent = `${activity.descripcion} · ${formatRelativeTime(activity.fecha)}`;
                wrapper.append(title, description);
                item.append(icon, wrapper);
                activityList.appendChild(item);
            });
        }
    }
}

function renderConversationMessages(conversation) {
    const messagesContainer = document.getElementById('chatMessages');
    if (!messagesContainer) {
        return;
    }

    clearElement(messagesContainer);

    conversation.mensajes.forEach((message) => {
        const row = document.createElement('div');
        row.className = `message-row ${message.tipo === 'outgoing' ? 'outgoing' : 'incoming'}`;

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.textContent = message.texto;

        const timestamp = document.createElement('span');
        timestamp.textContent = formatDate(message.fecha, { hour: '2-digit', minute: '2-digit' });
        bubble.appendChild(timestamp);
        row.appendChild(bubble);
        messagesContainer.appendChild(row);
    });
}

function renderMessagingKpis() {
    const activeConversations = CRM_STATE.conversations.length;
    const pending = CRM_STATE.conversations.filter((conversation) => conversation.sin_respuesta).length;
    const response = averageResponseMinutes(CRM_STATE.conversations);
    const conversion = CRM_STATE.leads.length
        ? Math.round((CRM_STATE.leads.filter((lead) => ['calificado', 'matriculado'].includes(lead.estado)).length / CRM_STATE.leads.length) * 100)
        : 0;

    setTextContent('#messagingActiveCount', String(activeConversations));
    setTextContent('#messagingPendingCount', String(pending));
    setTextContent('#messagingResponseCount', formatResponseMinutes(response));
    setTextContent('#messagingConversionCount', `${conversion}%`);
}

function renderMessagingModule() {
    if (document.body.dataset.page !== 'messaging') {
        return;
    }

    renderMessagingKpis();
    renderConversationList();

    let conversation = getConversationById(CRM_STATE.currentConversationId);
    if (!conversation) {
        conversation = getFilteredConversations()[0];
        CRM_STATE.currentConversationId = conversation?.id || null;
    }

    if (!conversation) {
        clearElement(document.getElementById('chatMessages'));
        setTextContent('#chatContactAvatar', '--');
        setTextContent('#chatContactName', 'Sin conversacion');
        setTextContent('#chatContactProgram', 'Selecciona una conversacion');
        return;
    }

    renderConversationMessages(conversation);
    renderConversationSummary(conversation);
}

async function sendMessageFromComposer() {
    const input = document.getElementById('chatComposerInput');
    const conversation = getConversationById(CRM_STATE.currentConversationId);

    if (!input || !conversation || !input.value.trim()) {
        return;
    }

    const timestamp = new Date().toISOString();
    const updatedConversation = normalizeConversation({
        ...conversation,
        sin_respuesta: false,
        ultima_respuesta_minutos: 0,
        ultima_actualizacion: timestamp,
        mensajes: [
            ...conversation.mensajes,
            {
                id: createId('message'),
                tipo: 'outgoing',
                texto: input.value.trim(),
                fecha: timestamp,
            },
        ],
    });

    replaceConversationInState(updatedConversation);
    appendLeadActivity(conversation.lead_id, {
        tipo: 'message',
        titulo: 'Respuesta enviada desde mensajeria',
        descripcion: input.value.trim(),
        fecha: timestamp,
        meta: ['Frontend CRM', 'WhatsApp'],
    });

    input.value = '';
    renderMessagingModule();
    updateNotificationBadge();
    showToast('Mensaje registrado en el historial local listo para Strapi.', 'success');
}

function renderPipelineKpis() {
    setTextContent('#pipelineKpiActive', String(CRM_STATE.leads.filter((lead) => !isClosedStatus(lead.estado)).length));
    setTextContent('#pipelineKpiOverdue', String(CRM_STATE.leads.filter(isLeadOverdue).length));
    setTextContent('#pipelineKpiReady', String(CRM_STATE.leads.filter((lead) => lead.estado === 'calificado').length));
    setTextContent('#pipelineKpiLost', String(CRM_STATE.leads.filter((lead) => lead.estado === 'perdido').length));
}

function getFilteredPipelineLeads() {
    const searchValue = normalizeText(document.getElementById('pipelineSearchInput')?.value || '');
    const advisorValue = document.getElementById('pipelineAdvisorFilter')?.value || '';

    return CRM_STATE.leads.filter((lead) => {
        const searchable = normalizeText([getLeadFullName(lead), lead.programa, lead.ciudad, lead.asesor].join(' '));
        const matchesSearch = !searchValue || searchable.includes(searchValue);
        const matchesAdvisor = !advisorValue || lead.asesor === advisorValue;
        return matchesSearch && matchesAdvisor;
    });
}

function renderPipelineSummary() {
    const summary = document.getElementById('pipelineSummary');
    if (!summary) {
        return;
    }

    clearElement(summary);

    const lead = getLeadById(CRM_STATE.currentPipelineLeadId);
    if (!lead) {
        summary.appendChild(createEmptyState('Selecciona un lead del tablero para ver su resumen.'));
        return;
    }

    const name = document.createElement('h4');
    name.textContent = getLeadFullName(lead);
    const program = document.createElement('p');
    program.textContent = lead.programa;
    const metaList = document.createElement('ul');
    metaList.className = 'summary-list static-summary-list';

    [
        ['Estado', getStatusMeta(lead.estado).label],
        ['Fuente', getSourceLabel(lead.fuente)],
        ['Asesor', lead.asesor || 'Sin asignar'],
        ['Prioridad', getPriorityMeta(lead.prioridad).label],
        ['Proxima accion', lead.fecha_proxima_accion ? `${getActionTypeLabel(lead.tipo_proxima_accion)} - ${formatDate(lead.fecha_proxima_accion)}` : 'Sin accion'],
    ].forEach(([label, value]) => {
        const item = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = label;
        const strong = document.createElement('strong');
        strong.textContent = value;
        item.append(span, strong);
        metaList.appendChild(item);
    });

    const notes = document.createElement('p');
    notes.className = 'pipeline-notes';
    notes.textContent = lead.notas || 'Sin notas registradas.';

    summary.append(name, program, metaList, notes);
}

function buildPipelineCard(lead) {
    const card = document.createElement('article');
    card.className = 'pipeline-card';
    card.draggable = true;
    card.dataset.leadId = lead.id;
    card.addEventListener('dragstart', (event) => {
        event.dataTransfer?.setData('text/plain', String(lead.id));
    });
    card.addEventListener('click', () => {
        CRM_STATE.currentPipelineLeadId = lead.id;
        renderPipelineSummary();
    });

    const header = document.createElement('div');
    header.className = 'pipeline-card-header';
    const title = document.createElement('h3');
    title.textContent = getLeadFullName(lead);
    header.append(title, createPriorityBadge(lead.prioridad));

    const details = document.createElement('div');
    details.className = 'pipeline-card-meta';
    [
        lead.programa,
        lead.asesor || 'Sin asesor',
        getSourceLabel(lead.fuente),
        lead.fecha_proxima_accion ? `Accion: ${formatDate(lead.fecha_proxima_accion)}` : 'Sin accion',
    ].forEach((text) => {
        const line = document.createElement('span');
        line.textContent = text;
        details.appendChild(line);
    });

    if (isLeadOverdue(lead)) {
        const overdue = document.createElement('div');
        overdue.className = 'pipeline-alert-chip';
        overdue.textContent = 'Seguimiento vencido';
        card.append(header, details, overdue);
    } else {
        card.append(header, details);
    }

    return card;
}

function renderPipelineBoard() {
    if (document.body.dataset.page !== 'pipeline') {
        return;
    }

    renderPipelineKpis();

    const board = document.getElementById('pipelineBoard');
    if (!board) {
        return;
    }

    clearElement(board);
    const filteredLeads = getFilteredPipelineLeads();

    CRM_STATE.settings.estados.forEach((status) => {
        const column = document.createElement('section');
        column.className = 'pipeline-column';
        column.dataset.status = status;
        column.addEventListener('dragover', (event) => event.preventDefault());
        column.addEventListener('drop', async (event) => {
            event.preventDefault();
            const leadId = event.dataTransfer?.getData('text/plain');
            if (!leadId) {
                return;
            }

            const lead = getLeadById(leadId);
            if (!lead || lead.estado === status) {
                return;
            }

            const updatedLead = await saveLead({
                ...lead,
                estado: status,
                actividades: [
                    normalizeActivity({
                        tipo: 'status',
                        titulo: 'Cambio de etapa',
                        descripcion: `El lead se movio a ${getStatusMeta(status).label}.`,
                        fecha: new Date().toISOString(),
                        meta: ['Pipeline CRM'],
                    }),
                    ...lead.actividades,
                ],
            });

            CRM_STATE.currentPipelineLeadId = updatedLead.id;
            renderPipelineBoard();
            renderDashboard();
            renderAnalyticsPage();
            updateNotificationBadge();
            showToast(`Lead movido a ${getStatusMeta(status).label}.`, 'success');
        });

        const header = document.createElement('div');
        header.className = 'pipeline-column-header';
        const title = document.createElement('h3');
        title.textContent = getStatusMeta(status).label;
        const count = document.createElement('span');
        count.className = 'pipeline-column-count';
        const leadsInColumn = filteredLeads.filter((lead) => lead.estado === status);
        count.textContent = String(leadsInColumn.length);
        header.append(title, count);

        const body = document.createElement('div');
        body.className = 'pipeline-column-body';

        if (!leadsInColumn.length) {
            body.appendChild(createEmptyState('Sin leads en esta etapa.'));
        } else {
            leadsInColumn.forEach((lead) => body.appendChild(buildPipelineCard(lead)));
        }

        column.append(header, body);
        board.appendChild(column);
    });

    renderPipelineSummary();
}

function renderBarList(containerId, items, labelFormatter = (label) => label) {
    const container = document.getElementById(containerId);
    if (!container) {
        return;
    }

    clearElement(container);

    const entries = Object.entries(items).sort((a, b) => b[1] - a[1]);
    const maxValue = entries[0]?.[1] || 1;

    if (!entries.length) {
        container.appendChild(createEmptyState('No hay datos para mostrar.'));
        return;
    }

    entries.forEach(([label, value]) => {
        const row = document.createElement('div');
        row.className = 'bar-row';

        const name = document.createElement('span');
        name.className = 'bar-row-label';
        name.textContent = labelFormatter(label);

        const barWrapper = document.createElement('div');
        barWrapper.className = 'bar-row-track';

        const bar = document.createElement('div');
        bar.className = 'bar-row-fill';
        bar.style.width = `${Math.max(12, Math.round((value / maxValue) * 100))}%`;
        barWrapper.appendChild(bar);

        const metric = document.createElement('strong');
        metric.className = 'bar-row-value';
        metric.textContent = String(value);

        row.append(name, barWrapper, metric);
        container.appendChild(row);
    });
}

function renderAnalyticsPage() {
    if (document.body.dataset.page !== 'analytics') {
        return;
    }

    const totalLeads = CRM_STATE.leads.length;
    const conversionRate = totalLeads ? Math.round((CRM_STATE.leads.filter((lead) => lead.estado === 'matriculado').length / totalLeads) * 100) : 0;

    setTextContent('#analyticsTotalLeads', String(totalLeads));
    setTextContent('#analyticsConversionRate', `${conversionRate}%`);
    setTextContent('#analyticsPendingTasks', String(CRM_STATE.leads.filter(isLeadOverdue).length));
    setTextContent('#analyticsPendingChats', String(CRM_STATE.conversations.filter((conversation) => conversation.sin_respuesta).length));

    const funnel = countBy(CRM_STATE.leads, (lead) => lead.estado);
    renderBarList('analyticsFunnel', funnel, (label) => getStatusMeta(label).label);
    renderBarList('analyticsPrograms', countBy(CRM_STATE.leads, (lead) => lead.programa));
    renderBarList('analyticsSources', countBy(CRM_STATE.leads, (lead) => lead.fuente), (label) => getSourceLabel(label));
    renderBarList('analyticsAdvisors', countBy(CRM_STATE.leads, (lead) => lead.asesor || 'Sin asignar'));

    const serviceBody = document.getElementById('analyticsServiceBody');
    if (serviceBody) {
        clearElement(serviceBody);
        const rows = [
            ['Leads sin asesor', CRM_STATE.leads.filter((lead) => !lead.asesor).length, '0'],
            ['Seguimientos vencidos', CRM_STATE.leads.filter(isLeadOverdue).length, '<= 5'],
            ['Conversaciones sin respuesta', CRM_STATE.conversations.filter((conversation) => conversation.sin_respuesta).length, '<= 3'],
            ['Tiempo promedio respuesta', formatResponseMinutes(averageResponseMinutes(CRM_STATE.conversations)), '< 15 min'],
        ];

        rows.forEach(([metric, value, target]) => {
            const row = document.createElement('tr');
            [metric, value, target].forEach((cellValue) => {
                const cell = document.createElement('td');
                cell.textContent = String(cellValue);
                row.appendChild(cell);
            });
            serviceBody.appendChild(row);
        });
    }
}

function renderTagCloud(containerId, values) {
    const container = document.getElementById(containerId);
    if (!container) {
        return;
    }

    clearElement(container);
    values.forEach((value) => {
        const item = document.createElement('span');
        item.className = 'meta-chip';
        item.textContent = value;
        container.appendChild(item);
    });
}

function renderSettingsPage() {
    if (document.body.dataset.page !== 'settings') {
        return;
    }

    const config = getRuntimeConfig();

    const integrationList = document.getElementById('settingsIntegrationStatus');
    if (integrationList) {
        clearElement(integrationList);
        [
            ['Modo actual', CRM_STATE.dataMode === 'strapi' ? 'Strapi activo' : 'Demo local con contrato de datos'],
            ['Base URL', config.strapiBaseUrl],
            ['Endpoint leads', config.endpoints.leads || 'Sin configurar'],
            ['Fallback local', config.allowLocalFallback ? 'Activo' : 'Desactivado'],
        ].forEach(([label, value]) => {
            const item = document.createElement('li');
            const span = document.createElement('span');
            span.textContent = label;
            const strong = document.createElement('strong');
            strong.textContent = value;
            item.append(span, strong);
            integrationList.appendChild(item);
        });
    }

    const fieldList = document.getElementById('settingsLeadFields');
    if (fieldList) {
        clearElement(fieldList);
        LEAD_FIELD_DEFINITIONS.forEach((field) => {
            const item = document.createElement('div');
            item.className = 'field-chip';

            const title = document.createElement('strong');
            title.textContent = field.key;
            const description = document.createElement('span');
            description.textContent = `${field.type} · ${field.required ? 'requerido' : 'opcional'}`;
            item.append(title, description);
            fieldList.appendChild(item);
        });
    }

    renderTagCloud('settingsProgramsList', CRM_STATE.settings.programas);
    renderTagCloud('settingsAdvisorsList', CRM_STATE.settings.asesores);
    renderTagCloud('settingsSourcesList', CRM_STATE.settings.fuentes.map((source) => getSourceLabel(source)));

    const templatesList = document.getElementById('settingsTemplatesList');
    if (templatesList) {
        clearElement(templatesList);
        CRM_STATE.settings.plantillas.forEach((template) => {
            const card = document.createElement('article');
            card.className = 'template-card';
            const title = document.createElement('strong');
            title.textContent = `${template.nombre} · ${template.canal}`;
            const body = document.createElement('p');
            body.textContent = template.cuerpo;
            card.append(title, body);
            templatesList.appendChild(card);
        });
    }

    const collectionsBody = document.getElementById('settingsCollectionsBody');
    if (collectionsBody) {
        clearElement(collectionsBody);
        [
            ['leads', 'CRUD principal, pipeline, dashboard, analytics'],
            ['conversations', 'Bandeja unificada y chat por canal'],
            ['activities', 'Trazabilidad completa por lead'],
            ['advisors', 'Asignacion, carga operativa y ownership'],
            ['programs', 'Catalogo academico parametrizable'],
            ['templates', 'Mensajes y respuestas estandar'],
        ].forEach(([name, purpose]) => {
            const row = document.createElement('tr');
            const nameCell = document.createElement('td');
            nameCell.textContent = name;
            const purposeCell = document.createElement('td');
            purposeCell.textContent = purpose;
            row.append(nameCell, purposeCell);
            collectionsBody.appendChild(row);
        });
    }
}

function bindLeadsModule() {
    const form = document.getElementById('leadForm');
    const createForm = document.getElementById('leadFormCreate');

    if (document.body.dataset.leadsBound === 'true') {
        return;
    }

    document.body.dataset.leadsBound = 'true';

    document.getElementById('createLeadBtn')?.addEventListener('click', openCreateLeadModal);
    document.getElementById('modalCloseBtn')?.addEventListener('click', closeCreateLeadModal);
    document.getElementById('modalOverlay')?.addEventListener('click', closeCreateLeadModal);
    document.getElementById('cancelBtnCreate')?.addEventListener('click', closeCreateLeadModal);
    document.getElementById('backToListBtn')?.addEventListener('click', switchToLeadListView);
    document.getElementById('leadSearchInput')?.addEventListener('input', renderLeadsList);
    document.getElementById('leadStateFilter')?.addEventListener('change', renderLeadsList);
    document.getElementById('editBtn')?.addEventListener('click', () => enableLeadEditMode());
    document.getElementById('cancelBtn')?.addEventListener('click', () => {
        if (CRM_STATE.currentLeadSnapshot) {
            populateLeadForm(CRM_STATE.currentLeadSnapshot);
        }
        disableLeadEditMode();
    });

    ['nombres', 'apellidos', 'programa'].forEach((field) => {
        document.getElementById(field)?.addEventListener('input', () => {
            const payload = getLeadFormPayload();
            setLeadPreview('', payload);
        });
    });

    ['nombres_create', 'apellidos_create', 'programa_create'].forEach((field) => {
        document.getElementById(field)?.addEventListener('input', () => {
            const payload = getLeadFormPayload('create');
            setLeadPreview('create', payload);
        });
        document.getElementById(field)?.addEventListener('change', () => {
            const payload = getLeadFormPayload('create');
            setLeadPreview('create', payload);
        });
    });

    form?.addEventListener('submit', async (event) => {
        event.preventDefault();

        const currentLead = getLeadById(CRM_STATE.currentLeadId);
        if (!currentLead) {
            return;
        }

        const payload = getLeadFormPayload();
        const validationMessage = validateLeadPayload(payload);
        if (validationMessage) {
            showToast(validationMessage, 'warning');
            return;
        }

        const savedLead = await saveLead({
            ...currentLead,
            ...payload,
            actividades: [
                normalizeActivity({
                    tipo: 'note',
                    titulo: 'Lead actualizado',
                    descripcion: 'Se guardaron cambios desde la hoja de vida.',
                    fecha: new Date().toISOString(),
                    meta: ['Frontend CRM'],
                }),
                ...currentLead.actividades,
            ],
        });

        CRM_STATE.currentLeadId = savedLead.id;
        CRM_STATE.currentLeadSnapshot = clone(savedLead);
        renderLeadsList();
        populateLeadForm(savedLead);
        disableLeadEditMode();
        renderDashboard();
        renderPipelineBoard();
        renderAnalyticsPage();
        updateNotificationBadge();
        showToast('Lead actualizado y listo para sincronizacion con Strapi.', 'success');
    });

    createForm?.addEventListener('submit', async (event) => {
        event.preventDefault();

        const payload = getLeadFormPayload('create');
        const validationMessage = validateLeadPayload(payload);
        if (validationMessage) {
            showToast(validationMessage, 'warning');
            return;
        }

        const savedLead = await saveLead({
            ...payload,
            fecha_creacion: new Date().toISOString(),
            fecha_ultimo_contacto: payload.fecha_ultimo_contacto || new Date().toISOString(),
        }, 'create');

        closeCreateLeadModal();
        renderLeadsList();
        openLeadDetail(savedLead.id);
        renderDashboard();
        renderPipelineBoard();
        renderAnalyticsPage();
        updateNotificationBadge();
        showToast('Lead creado con estructura compatible para Strapi.', 'success');
    });
}

function initLeadsPage() {
    if (document.body.dataset.page !== 'leads') {
        return;
    }

    hydrateLeadFormSelects('');
    hydrateLeadFormSelects('create');
    populateSelect(document.getElementById('leadStateFilter'), CRM_STATE.settings.estados, 'Todos los estados');
    bindLeadsModule();
    renderLeadsList();

    const params = new URLSearchParams(window.location.search);
    const leadId = params.get('lead');
    if (leadId && getLeadById(leadId)) {
        openLeadDetail(leadId);
    }
}

function bindMessagingModule() {
    if (document.body.dataset.messagingBound === 'true') {
        return;
    }

    document.body.dataset.messagingBound = 'true';

    document.getElementById('messagingSearchInput')?.addEventListener('input', renderMessagingModule);
    document.getElementById('chatSendBtn')?.addEventListener('click', sendMessageFromComposer);
    document.getElementById('chatComposerInput')?.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessageFromComposer();
        }
    });

    document.querySelectorAll('.messaging-tab').forEach((tab) => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.messaging-tab').forEach((node) => node.classList.remove('active'));
            tab.classList.add('active');
            renderMessagingModule();
        });
    });
}

function initMessagingPage() {
    if (document.body.dataset.page !== 'messaging') {
        return;
    }

    bindMessagingModule();
    renderMessagingModule();
}

function bindPipelineModule() {
    if (document.body.dataset.pipelineBound === 'true') {
        return;
    }

    document.body.dataset.pipelineBound = 'true';
    populateSelect(document.getElementById('pipelineAdvisorFilter'), CRM_STATE.settings.asesores, 'Todos los asesores');
    document.getElementById('pipelineSearchInput')?.addEventListener('input', renderPipelineBoard);
    document.getElementById('pipelineAdvisorFilter')?.addEventListener('change', renderPipelineBoard);
}

function initPipelinePage() {
    if (document.body.dataset.page !== 'pipeline') {
        return;
    }

    bindPipelineModule();
    renderPipelineBoard();
}

function bindSettingsPage() {
    if (document.body.dataset.settingsBound === 'true') {
        return;
    }

    document.body.dataset.settingsBound = 'true';
    document.getElementById('resetDemoDataBtn')?.addEventListener('click', async () => {
        const confirmed = window.confirm('Se restauraran los datos demo locales. Esta accion no afecta Strapi.');
        if (!confirmed) {
            return;
        }

        resetDemoData();
        await initCRM();
        showToast('Datos demo restaurados correctamente.', 'success');
    });
}

function initSettingsPage() {
    if (document.body.dataset.page !== 'settings') {
        return;
    }

    bindSettingsPage();
    renderSettingsPage();
}

function resetDemoData() {
    localStorage.removeItem(CRM_STORAGE_KEYS.leads);
    localStorage.removeItem(CRM_STORAGE_KEYS.conversations);
    localStorage.removeItem(CRM_STORAGE_KEYS.settings);
    ensureLocalSeedData();
}

async function loadCRMData() {
    ensureLocalSeedData();
    CRM_STATE.settings = loadSettingsCollection();
    CRM_STATE.leads = await loadLeadsCollection();
    CRM_STATE.conversations = await loadConversationCollection();
}

async function initCRM() {
    initSidebar();
    await loadCRMData();
    updateDataModeChip();
    updateNotificationBadge();
    renderDashboard();
    initLeadsPage();
    initMessagingPage();
    initPipelinePage();
    renderAnalyticsPage();
    initSettingsPage();
}

window.CRM = {
    initCRM,
    resetDemoData,
    getRuntimeConfig,
    readStorage,
    writeStorage,
    showToast,
};

document.addEventListener('DOMContentLoaded', () => {
    initCRM();
});
