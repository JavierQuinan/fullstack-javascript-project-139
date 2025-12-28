# Hexlet Chat Application

[![Actions Status](https://github.com/JavierQuinan/fullstack-javascript-project-139/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/JavierQuinan/fullstack-javascript-project-139/actions)

Una aplicación de chat en tiempo real construida con tecnologías web modernas.

## Stack Tecnológico

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Formik](https://img.shields.io/badge/Formik-1E40AF?style=for-the-badge&logo=formik&logoColor=white)
![i18next](https://img.shields.io/badge/i18next-26A69A?style=for-the-badge&logo=i18next&logoColor=white)

## Características

- Comunicación en tiempo real con Socket.IO
- Gestión de estado con Redux Toolkit
- Autenticación de usuarios
- Canales de chat múltiples
- Interfaz de usuario moderna y responsive
- Validación de formularios con Formik y Yup
- Filtro de contenido inapropiado
- Soporte multiidioma (i18next)

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm o yarn

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/JavierQuinan/fullstack-javascript-project-139.git
cd fullstack-javascript-project-139
```

2. Instalar dependencias raíz:

```bash
npm install
```

3. Instalar dependencias del frontend:

```bash
cd frontend
npm install
cd ..
```

## Modo Desarrollo

Para ejecutar la aplicación en modo desarrollo con recarga en caliente:

1. Iniciar el servidor frontend (puerto 3000):

```bash
cd frontend
npm start
```

2. En otra terminal, iniciar el servidor backend (puerto 5001):

```bash
npx start-server --port 5001
```

La aplicación estará disponible en `http://localhost:3000`

## Modo Producción

Para ejecutar la aplicación en modo producción:

1. Compilar el frontend:

```bash
cd frontend
npm run build
cd ..
```

2. Iniciar el servidor con archivos estáticos:

```bash
npx start-server --port 5001 --static ./frontend/dist
```

La aplicación estará disponible en `http://localhost:5001`

## Despliegue

La aplicación está desplegada en Railway:

[https://chatapp-production-b85f.up.railway.app/](https://chatapp-production-b85f.up.railway.app/)

## Estructura del Proyecto

```
fullstack-javascript-project-139/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── slices/
│   │   ├── locales/
│   │   └── chatApi/
│   └── package.json
├── package.json
├── Dockerfile
└── README.md
```

## Tecnologías Principales

- **React 18.2.0** - Biblioteca de interfaz de usuario
- **Redux Toolkit 1.9.7** - Gestión de estado
- **React Router 6.30.0** - Enrutamiento
- **Bootstrap 5.1.3** - Framework CSS
- **Socket.IO 4.5.1** - Comunicación en tiempo real
- **Formik 2.4.6** - Manejo de formularios
- **Yup 0.32.11** - Validación de esquemas
- **i18next 24.2.0** - Internacionalización
- **Hexlet Chat Server 2.0.4** - Servidor backend

## Scripts Disponibles

- `npm start` - Inicia la aplicación en modo desarrollo
- `npm run build` - Compila la aplicación para producción
- `npm test` - Ejecuta los tests
- `npm run lint` - Ejecuta el linter

## Licencia

Este proyecto es parte del programa educativo de Hexlet.

## Autor Francisco Quinteros

Desarrollado como proyecto de aprendizaje en Hexlet.
