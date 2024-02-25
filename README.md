# share-profit-calculator

A conceptual web app for calculating the best way it would have been to profit given a period of time in the past for imaginary stocks.

### Stock data origin

The imaginary stocks data is generated.
The [scripts](https://github.com/StiliyanKushev/share-profit-calculator/tree/main/scripts) folder contains a script that generates the stocks data as json and a script that optimizes that file as a binary buffer.

This not only optimizes the file size and memory footprint at runtime, but is also advantageous when given to worker threads as a [SharedArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer) as it makes sure all worker threads have a single source of truth and no data is copied around.

### Production

A live version of this repo can be found at [https://shareprofitcalculator.site](https://shareprofitcalculator.site/).
The frontend is [automatically](https://github.com/StiliyanKushev/share-profit-calculator/blob/main/.github/workflows/fe.prod.release.yml) built for production and hosted in github pages of this repo.
Similarly the backend is also [automatically](https://github.com/StiliyanKushev/share-profit-calculator/blob/main/.github/workflows/be.deploy.yml) deployed to a server with https served using Let's Encrypt.

### Tech-stack

The frontend implementation can be found [here](https://github.com/StiliyanKushev/share-profit-calculator/tree/main/frontend).
The backend implementation can be found [here](https://github.com/StiliyanKushev/share-profit-calculator/tree/main/backend).

The FE is built with React + Typescript and the BE is using NestJS + Typescript respectively.

### Local Development

To get the repo running locally:

```bash
git clone https://github.com/StiliyanKushev/share-profit-calculator.git;
cd share-profit-calculator;
cd backend;
npm ci;
npm run docker:prepare;
npm run start:dev &;
cd ../frontend;
npm ci;
npm run start &;
```
