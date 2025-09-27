# RentalCar

Simple car rental website built with React + TypeScript. You can browse cars, filter them and add to favorites.

**Live demo**: https://rental-car-beta-wine.vercel.app

## What's here

- **Home page** - just a nice image with a "view catalog" button
- **Catalog** - list of cars with filtering by brand, price and mileage
- **Car details** - full info about specific car
- **Favorites** - save cars to localStorage

## Tech stack

- React 19 + TypeScript
- Redux Toolkit for state
- React Router for navigation
- Vite as bundler
- CSS Modules + PostCSS
- Axios for API calls

## How to run

```bash
git clone https://github.com/darkissdark/RentalCar.git
cd RentalCar
npm install
npm run dev
```

Open http://localhost:5173 and you're good to go.

### Scripts

- `npm run dev` - start dev server
- `npm run build` - build for production
- `npm run lint` - lint code

## Project structure

```
src/
├── components/     # UI components
├── pages/         # Pages (Home, Catalog, CarDetails)
├── store/         # Redux store
├── services/      # API calls
├── types/         # TypeScript types
└── utils/         # Utility functions
```

## What's interesting in the code

- **Universal button** - one component for regular buttons and links
- **Smart filters** - stored in Redux and don't reset on navigation
- **Lazy loading** - routes load on demand

## Deployment

Deployed on Vercel: https://rental-car-beta-wine.vercel.app
