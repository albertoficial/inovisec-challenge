# Inovisec Challenge - Mapa Interactivo

## 📋 Descripción

Esta aplicación es una maqueta de un sistema de mapas interactivos desarrollada como parte del desafío técnico de Inovisec. La aplicación permite a los usuarios autenticarse y visualizar un mapa interactivo con funcionalidades de marcadores y gestión de casos.

**🎨 Diseño basado en:** [Figma Mockup - Inovisec](https://www.figma.com/design/yntjFLquIClYafIM9bTvJy/Inovisec-Mockup?node-id=0-1&m=dev&t=odK4fZD4xnXSILCC-1)

## 🚀 Instrucciones de Instalación y Ejecución

### Prerrequisitos

- Node.js (versión 18 o superior)
- pnpm (recomendado) o npm

### Pasos para ejecutar localmente

1. **Clonar el repositorio**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd inovisec-challenge
   ```

2. **Instalar dependencias**
   ```bash
   pnpm install
   # o si usas npm
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   pnpm dev
   # o si usas npm
   npm run dev
   ```

4. **Abrir en el navegador**
   - La aplicación estará disponible en `http://localhost:5173`
   - Se redirigirá automáticamente a la página de login
   - Las credenciales correctas son: inovisec@example.com y pass: inovisec

### Otros comandos disponibles

```bash
# Construir para producción
pnpm build

# Previsualizar build de producción
pnpm preview

# Ejecutar linter
pnpm lint
```

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19.1.0** - Biblioteca principal para la interfaz de usuario
- **Vite 6.3.5** - Herramienta de construcción y desarrollo
- **React Router DOM 7.6.2** - Enrutamiento de la aplicación
- **Leaflet 1.9.4** - Biblioteca de mapas interactivos
- **React Leaflet 5.0.0** - Integración de Leaflet con React

### Herramientas de Desarrollo
- **ESLint 9.25.0** - Linting y análisis de código
- **pnpm** - Gestor de paquetes (más rápido que npm)

### Características Técnicas
- **Lazy Loading** - Carga diferida de componentes para mejor rendimiento
- **Suspense** - Manejo de estados de carga
- **Private Routes** - Protección de rutas autenticadas
- **Responsive Design** - Diseño adaptable a diferentes dispositivos

## 🎨 Decisiones de Diseño

### Arquitectura de la Aplicación

1. **Estructura de Componentes**
   - Separación clara entre páginas (`pages/`) y componentes reutilizables (`components/`)
   - Uso de lazy loading para optimizar el rendimiento inicial
   - Componentes modulares y reutilizables

2. **Sistema de Autenticación**
   - Implementación de rutas privadas con `PrivateRoute`
   - Redirección automática a login para usuarios no autenticados
   - Simulación de autenticación para demostración

3. **Integración de Mapas**
   - Uso de Leaflet para mapas interactivos
   - React Leaflet para integración nativa con React
   - Marcadores dinámicos y gestión de eventos

4. **Experiencia de Usuario**
   - Carga progresiva con componentes de loading
   - Navegación intuitiva entre páginas
   - Interfaz limpia y moderna

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── CasePanelSection.jsx
│   ├── Loader.jsx
│   ├── PrivateRoute.jsx
│   └── ValidationMessage.jsx
├── pages/              # Páginas principales
│   ├── Login.jsx
│   └── Map.jsx
├── constants/          # Constantes de la aplicación
├── App.jsx           # Componente principal
├── App.css           # Estilos globales
└── main.jsx          # Punto de entrada
```
