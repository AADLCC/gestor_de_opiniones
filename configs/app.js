`use strict`;

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { dbConnection } from './db.js';
import { corsOptions } from './cors-configuration.js';

// Importación de rutas
import userActions from '../src/user/user.routes.js';
import postActions from '../src/post/post.routes.js';
import commentActions from '../src/comments/comment.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const API_PREFIX = '/opinionManager/v1';

/**
 * Configuración
 */
const setupMiddlewares = (server) => {
    server.use(express.json({ limit: '50mb' }));
    server.use(express.urlencoded({ extended: true }));
    server.use(cors(corsOptions));
    server.use(morgan('combined'));
    server.use(express.static(path.join(__dirname, '../fronted')));
};

/**
 * endpoints
 */
const loadRoutes = (server) => {
    server.use(`${API_PREFIX}/users`, userActions);
    server.use(`${API_PREFIX}/posts`, postActions);
    server.use(`${API_PREFIX}/feedback`, commentActions);

    server.get(`${API_PREFIX}/status`, (req, res) => {
        return res.send({
            message: 'System is running',
            api: 'Opinion Manager API',
            instance: 'Production'
        });
    });
};

/**
 * Inicialización del servidor
 */
export const startServer = async () => {
    const app = express();
    const port = process.env.PORT || 3005;

    try {
        await dbConnection();
        setupMiddlewares(app);
        loadRoutes(app);

        app.listen(port, () => {
            console.log(`-----------------------------------------`);
            console.log(`Server initialized on port: ${port}`);
            console.log(`Ready at: http://localhost:${port}${API_PREFIX}`);
            console.log(`-----------------------------------------`);
        });

    } catch (err) {
        console.error('CRITICAL ERROR: Failed to bootstrap server', err);
        process.exit(1);
    }
};