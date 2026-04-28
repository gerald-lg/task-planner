# Task Planner `v0.1.0`

Una aplicación web para organizar tareas a lo largo de la semana. Permite crear plantillas de tareas, planificarlas en días específicos, cambiar su estado y reordenarlas mediante drag & drop.

## Características

- **Plantillas de tareas** — crea tareas reutilizables en la columna "To Do" con título, duración y color.
- **Planificación semanal** — arrastra tareas a cualquiera de los 7 días (lunes a domingo), cada uno con su propio color.
- **Estados de tarea** — ciclo de tres estados: `todo` → `in-progress` → `done`.
- **Reordenamiento** — reordena tareas dentro de un día con los botones subir/bajar.
- **Notas por tarea** — añade una nota opcional a cada tarea planificada.
- **Edición inline** — edita el título de una plantilla directamente desde la tarjeta.
- **Fondo dinámico** — el fondo de la app cambia según el momento del día (mañana, tarde, noche).

## Stack

| Tecnología | Uso |
|---|---|
| React 19 | UI |
| TypeScript | Tipado estático |
| Zustand | Estado global |
| @dnd-kit/react | Drag & drop |
| Tailwind CSS 3 | Estilos |
| Vite | Bundler |

## Estructura del proyecto

```
src/planner/
├── components/     # Componentes UI (columnas, tarjetas, modales, toasts)
├── config/         # Configuración de columnas de días
├── helpers/        # Utilidades (colores, estados, generación de IDs)
├── hooks/          # Hooks de dominio (usePlannedTask, useTemplateTask, ...)
├── models/         # Tipos e interfaces (PlannedTask, TaskTemplate, Day, ...)
└── store/          # Store Zustand con slices de tareas
```

## Comandos

```bash
# Instalar dependencias
bun install

# Servidor de desarrollo
bun run dev

# Build de producción
bun run build

# Lint
bun run lint
```
