import express from 'express';
import { cargarPaises, paisesEspanol } from '../controllers/paisesController.mjs';

const router = express.Router();

//Ruta para cargar todos los países desde la API
router.get('/cargar-paises', cargarPaises);

//Ruta para filtrar los resultados en paises que hablen español
router.get('/paises-espaniol', paisesEspanol);
export default router;