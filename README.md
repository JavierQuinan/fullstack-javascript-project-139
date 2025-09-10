### Hexlet tests and linter status:

[![Actions Status](https://github.com/iPoolito/frontend-project-139/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/iPoolito/frontend-project-139/actions)


### Hexlet tests and linter status

# ChatAPP — Guía de Uso

Chat en tiempo real con **React** (frontend) y el servidor de **Hexlet** (backend).
Este README te deja la app andando **en local** y lista para **deploy** 🤝.

---

## 🔧 Requisitos

- **Node.js 18.x LTS** (recomendado 18.20.x)
- **npm ≥ 9** (vale el que viene con Node 18; si tienes npm 10 también sirve)


---

## 📦 Instalación

**Dependencias del root:**
```bash
npm install
```

**Dependencias del frontend:**
```bash
cd frontend
npm install
cd ..
```

---

## 💻 Modo desarrollo (hot reload en :3000)

**Levanta el dev server de React (CRA):**
```bash
cd frontend
npm start
# abre http://localhost:3000
```

**(Opcional) Backend real de Hexlet en paralelo:**
```bash
npx start-server --port 5001
# corre en http://localhost:5001
```

> Con el **proxy** configurado en CRA, las llamadas a `/api/v1/...` se redirigen a `http://localhost:5001`.

---

## 🏭 Modo producción local (todo en un puerto :5001)

**Compila el frontend:**
```bash
cd frontend
npm run build
cd ..
```

**Sirve el build con el servidor de Hexlet:**
```bash
npx start-server --port 5001 --static ./frontend/build
# abre http://localhost:5001
```

La app React (compilada) **y** la API quedan disponibles en el mismo puerto.

---

## 📁 Estructura mínima del proyecto

```
.
├─ frontend/
│  ├─ public/
│  ├─ src/
│  ├─ build/             # se genera al compilar
│  └─ package.json
├─ package.json           # configuración raíz
└─ README.md
```

---

## 🧪 Checks rápidos (lo que suelen validar las pruebas)

- ✅ El **build** del frontend se genera en `frontend/build`.
- ✅ El **servidor** sirve correctamente esa carpeta de estáticos.
- ✅ El **proxy** del CRA apunta al backend (`http://localhost:5001`).
- ✅ Rutas base visibles: `/login` y dashboard con canales `#general` y `#random`.
- ✅ En el encabezado existe un enlace **“Hexlet Chat”** que lleva a la **Home**.

---

## 🧯 Problemas frecuentes y cómo resolverlos

- **CORS o 404 en `/api`** → revisa que el **proxy** del CRA esté configurado y que el server corra en `:5001`.
- **502 en Railway** → valida que el **Start Command** sea `npm start` (o el que uses) y que el **build** exista.
- **Versión de Node no compatible** → define `"engines": { "node": ">=18" }` en `package.json`.

---

## 🔗 Notas útiles

- Si usas **CI de Hexlet** con `Makefile` o workflows, asegúrate de incluir los archivos que el pipeline espera (por ejemplo, no ignores directorios requeridos en `.dockerignore` / `.gitignore`).
- Para despliegues automatizados en PaaS (Railway, etc.), puedes configurar un script **`postinstall`** que construya el frontend tras instalar dependencias.

---
