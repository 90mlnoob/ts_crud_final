npm init -y
npm install express cors typeorm reflect-metadata sqlite3
npm install typescript ts-node @types/node @types/express @types/cors --save-dev

create tsconfig.json by running npx tsc --init

npx tsc

npx ts-node src/index.ts

npm install --only=prod
node dist/index.js
