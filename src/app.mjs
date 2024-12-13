import express from 'express'; 
import {connectDB} from './config/dbConfig.mjs'; 
import paisRoutes from './routes/paisesRoutes.mjs';
import expressEjsLayouts from 'express-ejs-layouts'; 
import path from 'path';

const app = express(); const PORT = process.env.PORT || 3000;

app.use(express.json());//para darle formato json 
connectDB();

app.use('/api', paisRoutes);

app.use((req, res) => { res.status(404).send({mensaje: "Ruta no encontrada"}); });

app.listen(PORT, () => { 
    // console.log(Servidor escuchando en el puerto ${PORT}); 
    console.log(`Servidor levantado en el puerto: ${PORT}, desde el servidor`); 
});