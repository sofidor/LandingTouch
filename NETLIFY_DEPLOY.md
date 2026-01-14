# 🚀 Cómo Subir Cambios a Netlify

## Opción 1: Conectar con GitHub (Recomendado - Despliegue Automático)

### Paso 1: Crear repositorio en GitHub
1. Ve a [GitHub](https://github.com) y crea un nuevo repositorio
2. No inicialices con README, .gitignore o licencia (ya los tienes localmente)

### Paso 2: Subir tu código a GitHub
```bash
# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Initial commit"

# Conectar con tu repositorio de GitHub (reemplaza USERNAME y REPO_NAME)
git remote add origin https://github.com/USERNAME/REPO_NAME.git

# Subir a GitHub
git branch -M main
git push -u origin main
```

### Paso 3: Conectar Netlify con GitHub
1. Ve a tu dashboard de Netlify: https://app.netlify.com
2. Click en "Add new site" → "Import an existing project"
3. Selecciona "GitHub" y autoriza Netlify
4. Elige tu repositorio
5. Configuración de build:
   - **Build command**: (dejar vacío para sitios estáticos)
   - **Publish directory**: `/` o `.` (raíz del proyecto)
6. Click en "Deploy site"

### Paso 4: Subir cambios futuros
Cada vez que hagas cambios:
```bash
git add .
git commit -m "Descripción de tus cambios"
git push
```
Netlify detectará automáticamente los cambios y hará un nuevo despliegue.

---

## Opción 2: Netlify CLI (Despliegue Manual)

### Instalación
```bash
npm install -g netlify-cli
```

### Login
```bash
netlify login
```
Esto abrirá tu navegador para autenticarte.

### Desplegar
```bash
# Desde la carpeta de tu proyecto
netlify deploy

# Para producción (reemplaza el sitio actual)
netlify deploy --prod
```

**Ventaja**: Puedes desplegar sin necesidad de GitHub.

---

## Opción 3: Drag & Drop (Solo para pruebas)

1. Ve a https://app.netlify.com/drop
2. Arrastra la carpeta completa de tu proyecto
3. Netlify la desplegará automáticamente

**Nota**: Esta opción no guarda historial, cada vez que quieras actualizar debes volver a arrastrar.

---

## 📝 Comandos Git Útiles

```bash
# Ver estado de cambios
git status

# Ver diferencias
git diff

# Agregar archivos específicos
git add nombre-archivo.css

# Hacer commit
git commit -m "Mensaje descriptivo"

# Ver historial
git log

# Deshacer cambios no guardados
git checkout -- nombre-archivo
```

---

## ⚡ Recomendación

**Usa la Opción 1 (GitHub + Netlify)** porque:
- ✅ Despliegue automático cada vez que haces `git push`
- ✅ Historial de versiones
- ✅ Rollback fácil si algo sale mal
- ✅ Colaboración más fácil
- ✅ Gratis y profesional
