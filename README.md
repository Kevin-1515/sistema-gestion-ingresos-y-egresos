Sistema de Gestión de Ingresos y Egresos

Aplicación web para administrar ingresos y egresos de usuarios, con autenticación, gestión de usuarios y reportes.

Tecnologías

Frontend: Next.js 15 (App Router), React 18, Tailwind CSS, Shadcn UI

Backend: API Routes de Next.js, Prisma con PostgreSQL (Supabase)

Autenticación: Better Auth con OAuth (GitHub)

Base de datos: PostgreSQL (Supabase)

Control de versiones: Git

Instalación

Clonar el repositorio:

git clone https://github.com/Kevin-1515/sistema-gestion-ingresos-y-egresos.git


Instalar dependencias:

npm install


Configurar variables de entorno: el archivo de variables de entorno se quitó del git ignore por lo que está disponible en el repo




Ejecutar migraciones de Prisma:

npx prisma migrate dev


Ejecutar la aplicación:

npm run dev


La app estará disponible en http://localhost:3000.

Estructura del proyecto
/app
  /dashboard
    page.tsx
    layout.tsx
  page.tsx
/lib
  auth/
    index.ts
    client.ts
  prisma.ts
/components
  ui/
    table.tsx
    button.tsx

Uso

/ → Página principal

/dashboard → Panel de gestión

/dashboard/users → Tabla de usuarios

Autenticación mediante GitHub (Better Auth)



Las tablas y componentes UI están basados en Shadcn, usando Tailwind CSS para el estilo.


Los endpoints han sido probados por medio de cliente http, a la espera de unas últimas vistas en el frontend y pruebas unitarias

