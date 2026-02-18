import dotenv from 'dotenv';
import { startServer } from './configs/app.js';

dotenv.config();

process.on('uncaughtException', (error) => {
    console.log(error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.log(reason, promise);
    process.exit(1);
});


//Inicio del servidor
console.log('Iniciando servidor KinalSport Admin...');
startServer();