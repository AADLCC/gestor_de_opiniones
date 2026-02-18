`use strict`;

import mongoose from 'mongoose';

export const dbConnection = async () => {
    try {
        // Monitoreo
        mongoose.connection.on('error', () => {
            console.log('MongoDB | no se puedo conectar a MongoDB');
            mongoose.disconnect();
        });
        mongoose.connection.on('connecting', () => {
            console.log('MongoDB | Conectando a MongoDB');
        });
        mongoose.connection.on('connected', () => {
            console.log('MongoDB | Conectado a MongoDB');
        });
        mongoose.connection.on('open', () => {
            console.log('MongoDB | Conectado a MongoDB');
        });
        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB | Reconectado a MongoDB');
        });
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB | Desconectado de MongoDB');
        });

        // Conexion
        await mongoose.connect(process.env.URL_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10,
        });

    } catch (error) {
        console.log(`MongoDB | Error de conexion: ${error}`);
        process.exit(1);
    }
}

//Cierre controlado
const gracefulShutdown = async (signal) => {
    console.log(`MongoDB | Received ${signal}. Closing MongoDB connection...`);
    try {
        await mongoose.connection.close();
        console.log('MongoDB | Database connection closed successfully');
        process.exit(0); // Salida exitosa (sin errores)
    } catch (error) {
        console.error('MongoDB | Error closing database connection:', error.message);
        process.exit(1); // Salida con error
    }
}

//Manejadores de señales de proceso (Proccess Signal Handlers)
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGUSR2', () => gracefulShutdown('SIGUSR2'));// For nodemon restarts