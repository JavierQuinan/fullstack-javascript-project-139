# Hexlet Chat — Deploy

- **App:** https://<tu-subdominio>.up.railway.app
- **Arranque local**
  ```bash
  npm ci
  npm --prefix frontend ci
  npm run build
  npm run start:dev
  # http://localhost:5001


---

## Checks rápidos (lo que miran las pruebas)
- **CRA corre** y `npm run build` genera `/frontend/build`.
- **Servidor** corre con `npm start` y sirve esa carpeta (assets y rutas).
- **Proxy** en `frontend/package.json` → `http://localhost:5001`.
- **Pantallas base**: Login y dashboard con canales `#general` y `#random`.

## Problemas típicos y fixes
- **CORS o 404 a /api**: falta el `proxy` o el server corre en otro puerto.
- **Railway 502**: revisa que `Start Command` sea `npm start` y que `build` exista.
- **Node version mismatch**: define `"engines": { "node": ">=18" }`.

si quieres, en el siguiente paso te dejo ya el **workflow exacto** de CI/CD y un `README` pro con badges. vamos con todo. 💥
