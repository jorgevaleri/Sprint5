import express from 'express';
import { cargarPaises, paisesEspanol } from '../controllers/paisesController.mjs';
import PaisesRepository from '../repositories/PaisesRepository.mjs';

const router = express.Router();

//Ruta para cargar todos los países desde la API
router.get('/cargar-paises', cargarPaises);

//Ruta para filtrar los resultados en paises que hablen español
router.get('/paises-espaniol', paisesEspanol);
export default router;

// Ruta para agregar un nuevo país
router.post('/agregar-pais', async (req, res) => {
    const { official, capital, area, population, gini, borders, timezones } = req.body;

    const nuevoPais = {
        name: { official },
        capital: [capital],
        area,
        population,
        gini: { "0": gini }, // Ajusta esto según el formato que necesites
        borders: borders ? borders.split(',') : [],
        timezones: timezones ? timezones.split(',') : [],
        creador: "Jorge Valeri" // Cambia según sea necesario
    };

    await Pais.create(nuevoPais);
    res.redirect('/');
});

// Ruta para cargar el formulario de edición
router.get('/editar-pais/:id', async (req, res) => {
    const pais = await PaisesRepository.obtenerPorId(req.params.id);
    res.render('editarPais', { pais });
});

// Ruta para editar un país
router.post('/editar-pais/:id', async (req, res) => {
    const { official, capital, area, population, gini, borders, timezones } = req.body;

    const paisActualizado = {
        name: { official },
        capital: [capital],
        area,
        population,
        gini: { "0": gini },
        borders: borders ? borders.split(',') : [],
        timezones: timezones ? timezones.split(',') : [],
    };

    await PaisesRepository.actualizar(req.params.id, paisActualizado);
    res.redirect('/');
});

// // Ruta para eliminar un país
// router.post('/eliminar-pais/:id', async (req, res) => {
//     await PaisesRepository.eliminar(req.params.id);
//     res.redirect('/');
// });

// Ruta para eliminar un país
router.delete('/eliminar-pais/:id', async (req, res) => {
    await PaisesRepository.eliminar(req.params.id);
    res.status(204).send(); // Responde con un estado 204 No Content
});