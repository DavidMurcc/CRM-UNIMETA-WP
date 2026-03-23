# CRM UNIMETA

Plataforma web de gestion comercial y seguimiento de aspirantes para la Corporacion Universitaria del Meta.

Ultima actualizacion documentada: `23/03/2026`

## Portada

```text
 CRM UNIMETA
 Gestion de leads, seguimiento comercial y trazabilidad institucional

 Universidad: Corporacion Universitaria del Meta
 Ciudad base: Villavicencio, Meta, Colombia
 Canal principal proyectado: WhatsApp Business API
 Arquitectura objetivo: Fuentes -> n8n -> Strapi -> CRM Web
```

## Tabla de contenido

- [Vision general](#vision-general)
- [Actualizacion 23/03/2026](#actualizacion-23032026)
- [Problema que resuelve](#problema-que-resuelve)
- [Objetivos del producto](#objetivos-del-producto)
- [Arquitectura funcional](#arquitectura-funcional)
- [Que es n8n y que es Strapi](#que-es-n8n-y-que-es-strapi)
- [Stack tecnico](#stack-tecnico)
- [Estado actual](#estado-actual)
- [Instalacion y uso](#instalacion-y-uso)
- [Despliegue](#despliegue)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Paginas del CRM](#paginas-del-crm)
- [Modelo de datos](#modelo-de-datos)
- [Design system](#design-system)
- [Convenciones de desarrollo](#convenciones-de-desarrollo)
- [Integraciones futuras](#integraciones-futuras)
- [Roadmap](#roadmap)
- [Buenas practicas](#buenas-practicas)
- [FAQ rapido](#faq-rapido)

## Actualizacion 23/03/2026

En fecha `23/03/2026` se realizo una actualizacion importante del frontend para dejarlo funcional como prototipo de CRM y, al mismo tiempo, preparado para alimentarse despues desde Strapi sin rehacer la interfaz.

### Lo mas importante que se hizo

- se reemplazo la logica dispersa por una capa comun de datos en `funcionalidad.js`
- se definio un contrato base de datos para el lead con campos visibles y campos preparados para futura integracion
- se activo un modo demo con persistencia local para que el sistema pueda mostrarse y probarse sin backend disponible
- se dejo configurada la estructura para consumir Strapi mediante `window.CRM_CONFIG`, endpoints y mapeo de campos editables
- se reconstruyo `dashboard.html` para mostrar KPIs, embudo y alertas operativas con datos dinamicos
- se amplio `leads.html` para manejar una hoja de vida 360 del aspirante con datos comerciales, seguimiento y trazabilidad
- se reorganizo `mensajeria.html` para conectar conversaciones con el lead asociado y registrar actividad operativa
- se construyo `seguimiento.html` como pipeline tipo Kanban para mover leads por estado
- se construyo `tableros.html` para analiticas comerciales y operativas
- se construyo `configuracion.html` como vista documental y funcional para catalogos y contrato de datos
- se corrigio la navegacion principal para que todas las pantallas del CRM queden conectadas entre si

### Resultado funcional del frontend

El sistema ya no queda solamente como maqueta visual. A partir de esta fecha el frontend puede:

- listar, crear y editar leads en modo local
- mostrar trazabilidad por lead
- mostrar conversaciones asociadas a un lead
- mover leads entre etapas comerciales
- calcular indicadores y analiticas desde una misma base de datos local
- documentar los campos y colecciones que luego deben existir en Strapi

### Que se dejo preparado para Strapi

La actualizacion no activa aun el backend real, pero si deja resuelto el lado del frontend para integracion posterior:

- configuracion centralizada de `baseUrl`, `apiPath` y `endpoints`
- normalizacion de datos para aceptar estructuras locales o respuestas de Strapi
- separacion entre capa visual y capa de datos
- lista de `leadWritableFields` para controlar que campos se envian al backend
- fallback local cuando Strapi no esta disponible

### Lo que sigue despues de esta fecha

- conectar el collection type real de `Lead` en Strapi con todos los campos comerciales adicionales
- crear colecciones complementarias para conversaciones, actividades, asesores, programas y plantillas
- enlazar eventos reales desde n8n o desde los canales de captacion
- reemplazar gradualmente los datos demo por datos reales

## Vision general

CRM UNIMETA es una aplicacion web pensada para apoyar al equipo comercial y de admisiones en el seguimiento de aspirantes. La meta es centralizar la informacion de los leads, evitar que se pierdan conversaciones importantes y preparar una base solida para automatizacion e integraciones futuras.

El proyecto esta construido con una filosofia simple:

- frontend liviano
- archivos directos en navegador
- sin frameworks pesados
- logica clara y mantenible
- crecimiento progresivo hacia una arquitectura conectada con automatizacion y backend

## Problema que resuelve

UNIMETA recibe interesados desde distintos canales como formularios, WhatsApp, campanas y contacto directo. Cuando esos leads no quedan centralizados ni clasificados a tiempo, el equipo pierde trazabilidad, seguimiento y oportunidades reales de conversion.

Este CRM busca resolver:

- dispersion de la informacion
- falta de seguimiento uniforme
- dificultad para saber en que estado va cada aspirante
- dependencia de procesos manuales
- perdida de contexto entre asesor, canal y conversacion

## Objetivos del producto

- centralizar los leads en una sola interfaz
- permitir seguimiento comercial ordenado
- preparar integraciones con WhatsApp, formularios y automatizaciones
- facilitar visualizacion de KPIs y actividad operativa
- construir una base escalable para admisiones y trazabilidad institucional

## Arquitectura funcional

### Flujo de alto nivel

```text
Fuentes de datos
(WhatsApp / Meta Ads / Formularios / Correo / Llamadas)
        |
        v
      n8n
 Automatiza, transforma y enruta datos
        |
        v
    Strapi
 Guarda y expone la informacion por API
        |
        v
   CRM Web UNIMETA
 Consulta, muestra y actualiza la operacion
        |
        v
   Asesores
 Gestionan el seguimiento del aspirante
```

### Rol de cada componente

| Componente | Rol |
|---|---|
| Fuentes | Generan eventos, mensajes y formularios |
| n8n | Automatiza flujos, orquesta integraciones y mueve datos |
| Strapi | Funciona como backend, CMS y API |
| CRM Web | Es la interfaz de trabajo del asesor |

## Que es n8n y que es Strapi

### Strapi

Strapi es el backend planeado del proyecto. Sirve para guardar datos y ofrecer una API para que el CRM pueda consultar y actualizar informacion.

En este proyecto, Strapi deberia manejar:

- leads
- asesores
- programas academicos
- estados del proceso
- notas de seguimiento
- conversaciones o eventos relevantes

### n8n

n8n es la capa de automatizacion. Sirve para conectar sistemas y ejecutar flujos automaticamente.

Ejemplos de uso en este CRM:

- crear un lead cuando llega un formulario
- actualizar un lead cuando entra un mensaje de WhatsApp
- enviar respuestas automaticas
- disparar tareas internas
- sincronizar informacion desde Meta Ads o Google Sheets

### Forma simple de entenderlo

- Strapi guarda los datos
- n8n mueve y automatiza esos datos
- este CRM muestra esos datos y permite operarlos

## Stack tecnico

- HTML5
- CSS3
- Vanilla JavaScript
- `fetch()` nativo
- CSS custom properties
- ES6+

No se usa:

- React
- Vue
- Angular
- jQuery
- Bootstrap
- Tailwind
- bundlers

## Estado actual

El proyecto esta en una fase de frontend funcional, navegable y preparado para backend.

### Lo que ya existe

- layout base con sidebar y topbar
- design system compartido en `estilos.css`
- logica comun y capa de datos compartida en `funcionalidad.js`
- modo demo con persistencia local
- dashboard funcional con KPIs, embudo y alertas
- modulo de mensajeria conectado al lead y a la actividad comercial
- modulo de leads con flujo local de listar, abrir, editar y crear
- vista de seguimiento con pipeline comercial
- vista de analiticas con tableros operativos
- vista de configuracion enfocada en contrato de datos y preparacion para Strapi
- preparacion para Strapi con conexion aun desactivada por la etapa actual

### Lo que aun esta pendiente

- conexion real a Strapi
- integraciones con n8n
- autenticacion y control de usuarios
- endpoints reales para conversaciones, actividades, programas y asesores
- trazabilidad real de conversaciones y eventos externos
- sincronizacion con fuentes institucionales

### Estado del modulo de leads

Hoy el modulo de leads trabaja con datos demo y persistencia local. Ya esta organizado para que despues se pueda activar Strapi sin rehacer toda la interfaz.

## Instalacion y uso

### Requisitos

No necesitas instalar dependencias ni levantar un servidor especial para la version actual del proyecto.

Solo necesitas:

- navegador moderno
- acceso a los archivos del proyecto

### Ejecucion local

1. Abre la carpeta `CRM-UNIMETA-WP`.
2. Ingresa a cualquiera de las paginas HTML.
3. Abre el archivo directamente en el navegador.

Paginas recomendadas para empezar:

- `dashboard.html`
- `leads.html`
- `mensajeria.html`

### Flujo recomendado de prueba

1. Abre `leads.html`.
2. Revisa el listado mock.
3. Abre un lead.
4. Prueba la edicion.
5. Crea un nuevo lead desde el modal.

## Despliegue

Como es una aplicacion estatica, puede desplegarse de varias formas simples:

- hosting estatico
- servidor institucional
- carpeta publica en un servidor web
- GitHub Pages si se desea una demo estatica

### Recomendacion de despliegue por etapas

| Etapa | Despliegue recomendado |
|---|---|
| Prototipo | Archivos estaticos abiertos en navegador |
| Demo interna | Hosting estatico o servidor institucional |
| Integracion real | Frontend estatico + Strapi desplegado + n8n operativo |
| Produccion | Dominio institucional, backend seguro y automatizaciones auditadas |

### Cuando se conecte a backend

En la etapa conectada, el despliegue ideal seria:

```text
Frontend estatico
        +
Strapi desplegado
        +
n8n desplegado
        +
Canales externos conectados
```

## Estructura del proyecto

```text
CRM-UNIMETA-WP/
|-- README.md
|-- configuracion.html
|-- dashboard.html
|-- estilos.css
|-- funcionalidad.js
|-- leads.html
|-- mensajeria.html
|-- seguimiento.html
`-- tableros.html
```

## Paginas del CRM

### `dashboard.html`

Proposito:

- mostrar KPIs
- resumir actividad
- servir como vista general del equipo

Estado:

- estructura funcional conectada a la capa comun de datos
- KPIs, embudo y alertas con datos demo

Vista esperada:

```text
Topbar
KPIs
Resumen operativo
Actividad reciente
```

### `leads.html`

Proposito:

- administrar leads
- abrir hoja de vida
- editar informacion
- crear registros nuevos

Estado:

- modulo mas avanzado del proyecto
- preparado para conexion futura a Strapi
- actualmente usa datos demo y almacenamiento local

Vista esperada:

```text
Listado de leads
 -> click en lead
Detalle 360 del lead
 -> editar / guardar / cancelar
 -> ver trazabilidad
Modal para crear lead
```

### `mensajeria.html`

Proposito:

- centralizar conversaciones
- visualizar actividad de mensajeria
- apoyar seguimiento por canal

Estado:

- estructura funcional conectada a conversaciones demo
- aun sin datos reales de canal externo

Vista esperada:

```text
KPIs de mensajeria
Lista de conversaciones
Panel de chat o detalle
```

### `seguimiento.html`

Proposito:

- representar el pipeline comercial por estados
- mover leads entre etapas

Estado:

- construido como pipeline comercial visual

Vista sugerida:

```text
Kanban por estados
Nuevo -> Contactado -> Calificado -> Matriculado / Perdido
```

### `tableros.html`

Proposito:

- mostrar analitica y reportes
- apoyar gestion del equipo y toma de decisiones

Estado:

- construido como tablero de analiticas operativas

Vista sugerida:

```text
Graficos
Conversiones
Rendimiento por asesor
Tendencias por canal
```

### `configuracion.html`

Proposito:

- administrar catalogos y configuraciones
- preparar integraciones y parametros del sistema

Estado:

- construido como vista de configuracion y contrato de datos

Vista sugerida:

```text
Programas
Asesores
Estados
Integraciones
```

## Modelo de datos

### Lead

Modelo de referencia:

```js
{
  id: "string",
  nombre: "string",
  apellido: "string",
  email: "string",
  telefono: "string",
  ciudad: "string",
  municipio: "string",
  programa_interes: "string",
  estado: "nuevo|contactado|calificado|matriculado|perdido|inactivo",
  fuente: "whatsapp|formulario|meta_ads|google_sheets|correo|llamada",
  asesor_asignado: "string",
  fecha_creacion: "ISO string",
  fecha_ultimo_contacto: "ISO string",
  fecha_proxima_accion: "ISO string",
  tipo_proxima_accion: "llamada|whatsapp|correo|visita|seguimiento",
  prioridad: "alta|media|baja",
  notas: "string",
  conversaciones: [],
  actividades: []
}
```

### Campos funcionales importantes

| Campo | Uso |
|---|---|
| `estado` | controla seguimiento comercial |
| `fuente` | ayuda a medir origen del lead |
| `asesor_asignado` | permite trazabilidad operativa |
| `fecha_ultimo_contacto` | apoya prioridades de seguimiento |
| `fecha_proxima_accion` | permite detectar seguimientos vencidos |
| `tipo_proxima_accion` | define la siguiente tarea comercial |
| `prioridad` | ayuda a priorizar cierres y atencion |
| `conversaciones` | conecta el CRM con mensajeria |
| `actividades` | soporta la trazabilidad del proceso |

## Design system

El proyecto usa un sistema visual compartido desde `estilos.css`.

### Identidad visual

- azul institucional UNIMETA como base
- naranja institucional como acento
- sidebar fija
- topbar superior
- componentes consistentes

### Variables clave

- `--brand-900` a `--brand-50`
- `--accent-400`
- `--gray-*`
- `--surface`
- `--page-bg`

### Estados previstos para leads

- `nuevo`
- `contactado`
- `calificado`
- `matriculado`
- `perdido`
- `inactivo`

## Convenciones de desarrollo

### Reglas base

- usar solo HTML, CSS y JavaScript puro
- cargar `estilos.css` y `funcionalidad.js` en cada pagina
- no hardcodear colores si ya existe variable CSS
- preferir `textContent` para datos dinamicos
- validar formularios en cliente
- usar `try/catch` en todos los fetch
- escribir comentarios en espanol
- centralizar mocks en `funcionalidad.js`

### Reglas de seguridad

- evitar `innerHTML` con datos de usuario
- sanitizar informacion externa
- no mezclar logica de negocio con markup improvisado
- controlar errores de red y errores funcionales con mensajes claros

## Integraciones futuras

### Strapi

La idea es activarlo como backend oficial.

Pasos esperados:

1. definir el collection type de `Lead`
2. ampliar el modelo con campos comerciales adicionales
3. crear colecciones relacionadas para conversaciones, actividades y catalogos
4. mapear campos del CRM
5. configurar endpoints
6. activar wrapper de API
7. reemplazar datos demo por datos reales

### n8n

La idea es usarlo como orquestador de flujos.

Casos esperados:

- alta automatica de leads
- actualizacion por mensajes entrantes
- alertas internas
- sincronizacion con formularios y campanas
- respuestas automaticas

## Roadmap

| Fase | Objetivo | Estado |
|---|---|---|
| Fase 1 | Definir identidad visual y layout base | Completado |
| Fase 2 | Construir dashboard y mensajeria inicial | Completado |
| Fase 3 | Consolidar CRUD de leads con datos demo | Completado |
| Fase 4 | Completar seguimiento, tableros y configuracion | Completado |
| Fase 5 | Conectar Strapi | Pendiente |
| Fase 6 | Integrar n8n y canales externos | Pendiente |
| Fase 7 | Trazabilidad real de WhatsApp y automatizaciones | Pendiente |

### Prioridades recomendadas

- alinear `funcionalidad.js` con las convenciones base del proyecto
- completar vistas faltantes
- estabilizar el modelo de datos
- definir estructura de Strapi
- activar integraciones gradualmente

## Buenas practicas

- mantener componentes simples y legibles
- reutilizar clases y helpers existentes
- documentar cambios funcionales relevantes
- no introducir dependencias innecesarias
- construir pensando en el flujo real del asesor
- separar claramente mocks, logica y futura capa API

## FAQ rapido

### Este proyecto ya usa backend real

No. A fecha `23/03/2026` el frontend funciona en modo demo con persistencia local, pero ya esta preparado para conectarse a Strapi.

### Se necesita Node o npm

No para la version actual. Los archivos pueden abrirse directamente en el navegador.

### Por que no usar frameworks

Porque el proyecto fue definido para ser liviano, facil de mantener y compatible con una estructura simple de archivos HTML, CSS y JS.

### Cuando entran Strapi y n8n

En la siguiente etapa de integracion. A fecha `23/03/2026` ya se consolido el frontend y el siguiente paso es conectar el backend real.

## Cierre

Este README esta pensado como documento de entrada para negocio, diseno y desarrollo. Debe actualizarse cada vez que cambie el modelo de datos, la arquitectura, el estado de integracion o el alcance funcional de una pagina.

Si el proyecto crece, la recomendacion es complementar este archivo con:

- un documento de arquitectura tecnica
- un documento de modelo de datos
- una guia de integraciones
- una bitacora de cambios por version
