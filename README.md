# Proyecto Mochimo

## Configuración de la Base de Datos

### Requisitos Previos
- PostgreSQL instalado y corriendo en el puerto 5432
- Usuario: `postgres`
- Contraseña: `123`
- Base de datos: `mochimo_db2`

### Configuración Inicial

1. **Instalar dependencias del backend:**
   ```bash
   cd backend
   npm install
   ```

2. **Instalar dependencias del frontend:**
   ```bash
   cd frontend
   npm install
   ```

3. **Configurar la base de datos:**
   ```bash
   cd backend
   npm run prisma:generate
   npm run prisma:migrate
   ```

### Iniciar el Proyecto

#### Opción 1: Script automático (Windows)
```bash
start-dev.bat
```

#### Opción 2: Manual

**Backend (Terminal 1):**
```bash
cd backend
npm run start:dev
```

**Frontend (Terminal 2):**
```bash
cd frontend
npm run dev
```

### URLs del Proyecto
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000
- **Prisma Studio:** `npm run prisma:studio` (desde la carpeta backend)

### Variables de Entorno

**Backend (.env):**
```
JWT_SECRET=UNA_CADENA_SECRETA_LARGA_PARA_JWT
DATABASE_URL="postgresql://postgres:123@localhost:5432/mochimo_db2?schema=public"
```

**Frontend (.env):**
```
VITE_API_BASE_URL=http://localhost:3000
```

### Comandos Útiles

**Backend:**
- `npm run start:dev` - Iniciar en modo desarrollo
- `npm run prisma:studio` - Abrir Prisma Studio
- `npm run prisma:generate` - Generar cliente Prisma
- `npm run prisma:migrate` - Aplicar migraciones

**Frontend:**
- `npm run dev` - Iniciar en modo desarrollo
- `npm run build` - Construir para producción
- `npm run preview` - Vista previa de la build

## Estructura del Proyecto

```
mochimoTHELAST/
├── backend/          # API NestJS
│   ├── src/
│   ├── prisma/
│   └── uploads/
├── frontend/         # React + Vite
│   └── src/
└── start-dev.bat    # Script de inicio
```