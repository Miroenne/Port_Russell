# Port Russell

Port management application with:
- a Node.js/Express API + MongoDB (`api/`)
- a React frontend (`port_russell/`)

The project manages:
- users
- catways
- catway reservations

## Technical stack

### Backend (`api`)
- Node.js
- Express
- Mongoose
- JWT (`jsonwebtoken`)
- Bcrypt
- Cookie parser

### Frontend (`port_russell`)
- React
- React Router
- Bootstrap

## Useful tree

```text
Port_Russell/
├── api/
│   ├── app.js
│   ├── db/mongo.js
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── services/
├── port_russell/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── style/
└── README.md
```

## Requirements

- Node.js 18+ recommended
- npm
- MongoDB access (valid connection URI)

## Installation

From the repository root:

```bash
cd api && npm install
cd ../port_russell && npm install
```

## Environment variables (API)

The backend uses files under `api/env/.env*`.

Expected variables:
- `PORT`: API HTTP port (e.g. `3000`)
- `DB_URL`: MongoDB URI
- `SECRET_KEY`: JWT signing key
- `APP_NAME`, `API_URL`, `NODE_ENV`: context variables

Minimal example:

```env
PORT=3000
DB_URL=mongodb+srv://<user>:<password>@<cluster>/<db>
SECRET_KEY=change_me
```

## Run

### API

```bash
cd api
npm run dev
```

Available scripts:
- `npm start`: starts with `api/env/.env`
- `npm run dev`: starts with `api/env/.env.dev`
- `npm run prod`: starts with `api/env/.env.prod`

### Frontend

```bash
cd port_russell
npm start
```

By default:
- Frontend: `http://localhost:3001` (or another free CRA port)
- API: `http://localhost:3000`

## Authentication

Main flow:
1. `POST /users/login` validates credentials.
2. The API returns an HTTP-only cookie named `token`.
3. Protected routes validate this token (`middlewares/private.js`).
4. The frontend also keeps a minimal user object in `sessionStorage`.

Note:
- the private middleware returns a new JWT in the `Authorization` header on each valid request (sliding session).

## Main endpoints

### Users
- `POST /users/login`
- `GET /users/logout`
- `GET /users`
- `GET /users/:email`
- `POST /users`
- `PUT /users/:email`
- `DELETE /users/:email`

### Catways
- `GET /catways`
- `GET /catways/:id`
- `POST /catways`
- `PUT /catways/:id`
- `DELETE /catways/:id`

### Reservations (nested under a catway)
- `GET /catways/:id/reservations`
- `GET /catways/:id/reservations/:idReservation`
- `POST /catways/:id/reservations`
- `PUT /catways/:id/reservations/:idReservation`
- `DELETE /catways/:id/reservations/:idReservation`

## Important business rules

- A reservation cannot overlap another reservation on the same catway.
- Dates are validated (`startDate <= endDate`).
- On the catway side, only the `catwayState` property is editable in the current update implementation.
- On the frontend, add/edit/delete forms rely on a generic modal component (`src/components/Modal.jsx`).

## In-app documentation

The front `Readme` page loads the file:
- `port_russell/public/README.md`

Keep that file aligned with this root README.

## Notes

- Frontend requests use hardcoded URLs pointing to `http://localhost:3000`.
- The repository currently contains `.env` files with sensitive values: before publishing, remove/rotate them and use external secrets.
- Several legacy files (`ReservationsModal.jsx`, `ReservationsCard.jsx`) appear redundant with `Modal.jsx` and `DisplayCard.jsx`.

---

Application de gestion d'un port de plaisance avec:
- une API Node.js/Express + MongoDB (`api/`)
- un front React (`port_russell/`)

Le projet permet de gérer:
- les utilisateurs
- les catways
- les réservations de catways

## Stack technique

### Backend (`api`)
- Node.js
- Express
- Mongoose
- JWT (`jsonwebtoken`)
- Bcrypt
- Cookie parser

### Frontend (`port_russell`)
- React
- React Router
- Bootstrap

## Arborescence utile

```text
Port_Russell/
├── api/
│   ├── app.js
│   ├── db/mongo.js
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── services/
├── port_russell/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── style/
└── README.md
```

## Prérequis

- Node.js 18+ recommandé
- npm
- Accès MongoDB (URI de connexion valide)

## Installation

Depuis la racine du dépôt:

```bash
cd api && npm install
cd ../port_russell && npm install
```

## Variables d'environnement (API)

Le backend utilise des fichiers `api/env/.env*`.

Variables attendues:
- `PORT`: port HTTP de l'API (ex: `3000`)
- `DB_URL`: URI MongoDB
- `SECRET_KEY`: clé de signature JWT
- `APP_NAME`, `API_URL`, `NODE_ENV`: variables de contexte

Exemple minimal:

```env
PORT=3000
DB_URL=mongodb+srv://<user>:<password>@<cluster>/<db>
SECRET_KEY=change_me
```

## Lancement

### API

```bash
cd api
npm run dev
```

Scripts disponibles:
- `npm start`: lance avec `api/env/.env`
- `npm run dev`: lance avec `api/env/.env.dev`
- `npm run prod`: lance avec `api/env/.env.prod`

### Frontend

```bash
cd port_russell
npm start
```

Par défaut:
- Front: `http://localhost:3001` (ou autre port libre CRA)
- API: `http://localhost:3000`

## Authentification

Flux principal:
1. `POST /users/login` vérifie les identifiants.
2. L'API renvoie un cookie HTTP-only `token`.
3. Les routes protégées vérifient ce token (`middlewares/private.js`).
4. Le front conserve aussi un utilisateur minimal dans `sessionStorage`.

Note:
- le middleware privé renvoie un nouveau JWT dans l'en-tête `Authorization` à chaque requête valide (session glissante).

## Endpoints principaux

### Utilisateurs
- `POST /users/login`
- `GET /users/logout`
- `GET /users`
- `GET /users/:email`
- `POST /users`
- `PUT /users/:email`
- `DELETE /users/:email`

### Catways
- `GET /catways`
- `GET /catways/:id`
- `POST /catways`
- `PUT /catways/:id`
- `DELETE /catways/:id`

### Réservations (imbriquées sous un catway)
- `GET /catways/:id/reservations`
- `GET /catways/:id/reservations/:idReservation`
- `POST /catways/:id/reservations`
- `PUT /catways/:id/reservations/:idReservation`
- `DELETE /catways/:id/reservations/:idReservation`

## Logique métier importante

- Une réservation ne peut pas chevaucher une autre réservation sur un même catway.
- Les dates sont validées (`startDate <= endDate`).
- Côté catway, seule la propriété `catwayState` est modifiable via l'update actuel.
- Côté front, les formulaires d'ajout/édition/suppression reposent sur un composant modal générique (`src/components/Modal.jsx`).

## Documentation dans l'application

La page `Readme` du front charge le fichier:
- `port_russell/public/README.md`

Pense à garder ce fichier aligné avec ce README racine.

## Points d'attention

- Les appels front utilisent des URLs en dur sur `http://localhost:3000`.
- Le dépôt contient actuellement des fichiers `.env` avec des valeurs sensibles: avant une publication, il faut les supprimer/rotater et utiliser des secrets externes.
- Plusieurs fichiers historiques (`ReservationsModal.jsx`, `ReservationsCard.jsx`) semblent redondants avec `Modal.jsx` et `DisplayCard.jsx`.
