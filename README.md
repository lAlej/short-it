# short.it 🔗

Acortador de URLs simple y rápido: pegas un link largo y obtienes uno corto para compartir, sin registro.

**👉 [Ver demo en vivo](https://short-it-steel.vercel.app/)**

## Características ✨

- Acorta cualquier link `http` o `https` (si omites el protocolo, se agrega `https://`).
- Validación en el campo, con mensajes de error claros que desaparecen al escribir.
- Enter para enviar, botón **Paste** para pegar desde el portapapeles y **Clear** para limpiar.
- Tarjeta de resultado con **Copy link** y **Open** al instante.
- Historial de links en tu dispositivo (`localStorage`): copiar, abrir, borrar uno o limpiar todo.
- Pantalla de redirección con estado de "link inexistente".
- Diseño oscuro responsive, con foco visible, contraste AA, targets táctiles de 44 px y respeto de `prefers-reduced-motion`.

## Stack 🛠️

| Capa | Tecnología |
| --- | --- |
| Framework | [Next.js 14](https://nextjs.org/) (App Router) + React 18 |
| UI | [Material UI](https://mui.com/) con tokens propios en CSS variables |
| Backend | Route Handlers de Next.js (`/api/createUrl`, `/api/getUrl`) |
| Base de datos | PostgreSQL + [Prisma](https://www.prisma.io/) |
| Lenguaje | TypeScript |

## Estructura 📂

```
src/
├── app/
│   ├── api/            # createUrl y getUrl (Prisma)
│   ├── [url]/page.tsx  # redirección del código corto
│   ├── util/           # api, validación, formato y localStorage
│   ├── globals.css     # tokens de diseño (colores, radios)
│   └── page.tsx        # home
└── components/         # Header, Shortener, ResultCard, SavedUrls, Toast…
```

## Instalación 📀

Requisitos: Node.js 18+ y una base de datos PostgreSQL.

1. Clona el repositorio:
   ```bash
   git clone <url-del-repo>
   cd short-it
   ```
2. Instala las dependencias (preferiblemente con yarn):
   ```bash
   yarn install
   ```
3. Crea un archivo `.env` con la estructura de `.env.example`:

   | Variable | Descripción |
   | --- | --- |
   | `DATABASE_URL` | Cadena de conexión de PostgreSQL |
   | `NEXT_PUBLIC_HOST_URL` | URL base de la app, p. ej. `http://localhost:3000` |
   | `NEXT_PUBLIC_API_KEY` | Clave pública usada por la app |

4. Aplica las migraciones:
   ```bash
   npx prisma migrate deploy
   ```
5. Inicia el proyecto:
   ```bash
   yarn dev
   ```
   Abre [http://localhost:3000](http://localhost:3000).

## Scripts 📜

| Comando | Qué hace |
| --- | --- |
| `yarn dev` | Servidor de desarrollo |
| `yarn build` | Build de producción |
| `yarn start` | Sirve el build |
| `yarn lint` | Linter |
| `yarn studio` | Prisma Studio para ver la base de datos |

## Autor 🧔🏻

**Luis Peña** · [LinkedIn](https://www.linkedin.com/in/lapee/)

## Contratación 📧

Si quieres contratarme, escríbeme a l.a.esteves999@gmail.com
