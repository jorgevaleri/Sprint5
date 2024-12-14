//IMPORTAR LOS MÓDULOS NECESARIOS
import express from 'express'; 
import {connectDB} from './config/dbConfig.mjs'; 
import paisRoutes from './routes/paisesRoutes.mjs';
import expressEjsLayouts from 'express-ejs-layouts'; 
import path from 'path';
import { fileURLToPath } from 'url';
import PaisesRepository from '../src/repositories/PaisesRepository.mjs';

const app = express(); 

//OBTENER EL DIRECTORIO DEL ARCHIVO ACTUAL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//USAR __dirname PARA ESTABLECER LA VISTA
app.set('views', path.join(__dirname, 'views'));

//INICIAR EL SERVIDOR
const PORT = process.env.PORT || 3000;

/**LO NUEVO**/
// Configuración de EJS
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views/paginas/dashboardPaises'));
// app.set('views', path.resolve('../view/paginas'));//Define el directorio raíz de las vistas estatico
app.use(expressEjsLayouts);
app.set('layout', 'layout'); // Nombre del layout base
app.use(express.static(path.resolve('./public')));//busca todo lo estatico en public, como los css
app.use(express.urlencoded({ extended: true }));  // Para formularios con método POST
/**HASTA AQUI**/

app.use(express.json());//para darle formato json 
connectDB();

app.use('/api', paisRoutes);

/**LO NUEVO**/
// Ruta para la vista del Dashboard
app.get('/', async (req, res) => {
    const paises = await PaisesRepository.obtenerTodos();
    res.render('dashboardPaises', { paises });
});
/**HASTA AQUI**/

app.use((req, res) => { 
    res.status(404).send({mensaje: "Ruta no encontrada"}); 
});

app.listen(PORT, () => { 
    // console.log(Servidor escuchando en el puerto ${PORT}); 
    console.log(`Servidor levantado en el puerto: ${PORT}, desde el servidor`); 
});