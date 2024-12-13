// Importar los módulos necesarios
const axios = require('axios');
const fs = require('fs');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

(async () => {
    try {
        // Conectar a la base de datos MongoDB
        await mongoose.connect('mongodb+srv://Grupo-16:grupo16@cursadanodejs.ls9ii.mongodb.net/Node-js', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Conexión a MongoDB exitosa');

        // Definir el esquema de los países
        const countrySchema = new mongoose.Schema({
            name: {
                common: String,
                official: {
                    type: String,
                    required: true,
                    minlength: 3,
                    maxlength: 90
                },
                nativeName: Object
            },
            independent: Boolean,
            status: String,
            unMember: Boolean,
            currencies: Object,
            capital: {
                type: [String],
                validate: {
                    validator: function (value) {
                        return value.every(cap => cap.length >= 3 && cap.length <= 90);
                    },
                    message: 'Cada capital debe tener entre 3 y 90 caracteres.'
                }
            },
            region: String,
            subregion: String,
            languages: Object,
            latlng: [Number],
            landlocked: Boolean,
            borders: {
                type: [String],
                validate: {
                    validator: function (value) {
                        return value.every(border => /^[A-Z]{3}$/.test(border));
                    },
                    message: 'Cada frontera debe ser un código de 3 letras mayúsculas.'
                }
            },
            area: {
                type: Number,
                min: [0, 'El área debe ser un número positivo.']
            },
            flag: String,
            maps: Object,
            population: {
                type: Number,
                min: [1, 'La población debe ser un número entero positivo.']
            },
            gini: {
                type: Object,
                validate: {
                    validator: function (value) {
                        if (!value) return true;
                        const giniValue = value[2019];
                        return giniValue >= 0 && giniValue <= 100;
                    },
                    message: 'El índice Gini debe estar entre 0 y 100.'
                }
            },
            fifa: String,
            timezones: [String],
            continents: [String],
            flags: Object,
            startOfWeek: String,
            capitalInfo: Object,
            creador: String
        });

        // Crear el modelo de país
        const Country = mongoose.model('Country', countrySchema);

        // Consumir la API externa
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countries = response.data;

        // Filtrar países hispanohablantes
        const spanishSpeakingCountries = countries.filter(country => {
            const languages = country.languages;
            return languages && Object.values(languages).includes('Spanish');
        });

        // Procesar los datos según los requisitos
        const processedCountries = spanishSpeakingCountries.map(country => {
            // Crear un nuevo objeto eliminando propiedades no deseadas
            const {
                translations,
                tld,
                cca2,
                ccn3,
                cca3,
                cioc,
                idd,
                altSpellings,
                car,
                coatOfArms,
                postalCode,
                demonyms,
                ...rest
            } = country;

            // Agregar la propiedad "creador"
            return {
                ...rest,
                creador: "TuNombre" // Reemplaza "TuNombre" con tu nombre real
            };
        });

        // Guardar los datos procesados en MongoDB
        await Country.insertMany(processedCountries);
        console.log('Datos almacenados en MongoDB correctamente');

        // Guardar los datos procesados en un archivo para referencia
        fs.writeFileSync('processed_countries.json', JSON.stringify(processedCountries, null, 2));

        console.log('Datos procesados y guardados en processed_countries.json');

        // Configurar Express y EJS
        const app = express();
        app.set('view engine', 'ejs');
        app.set('views', path.join(__dirname, 'views'));
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(express.static(path.join(__dirname, 'public')));

        // Rutas
        app.get('/', async (req, res) => {
            const countries = await Country.find();
            res.render('dashboard', { countries });
        });

        app.get('/add', (req, res) => {
            res.render('add');
        });

        app.post('/add', async (req, res) => {
            try {
                const { common, official, capital, borders, area, population, gini, timezones } = req.body;
                const newCountry = new Country({
                    name: { common, official },
                    capital: [capital],
                    borders: borders ? borders.split(',') : [],
                    area: Number(area),
                    population: Number(population),
                    gini: gini ? { 2019: Number(gini) } : {},
                    timezones: timezones ? timezones.split(',') : [],
                    creador: "TuNombre"
                });
                await newCountry.save();
                res.redirect('/');
            } catch (error) {
                res.status(400).send(`Error al agregar país: ${error.message}`);
            }
        });

        app.get('/edit/:id', async (req, res) => {
            const country = await Country.findById(req.params.id);
            res.render('edit', { country });
        });

        app.post('/edit/:id', async (req, res) => {
            try {
                const { common, official, capital, borders, area, population, gini, timezones } = req.body;
                await Country.findByIdAndUpdate(req.params.id, {
                    name: { common, official },
                    capital: [capital],
                    borders: borders ? borders.split(',') : [],
                    area: Number(area),
                    population: Number(population),
                    gini: gini ? { 2019: Number(gini) } : {},
                    timezones: timezones ? timezones.split(',') : []
                });
                res.redirect('/');
            } catch (error) {
                res.status(400).send(`Error al editar país: ${error.message}`);
            }
        });

        app.post('/delete/:id', async (req, res) => {
            await Country.findByIdAndDelete(req.params.id);
            res.redirect('/');
        });

        // Iniciar servidor
        app.listen(3000, () => {
            console.log('Servidor iniciado en http://localhost:3000');
        });

        // Cerrar la conexión a MongoDB al finalizar el script
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('Conexión a MongoDB cerrada');
            process.exit(0);
        });
    } catch (error) {
        console.error('Error al procesar los datos:', error.message);
    }
})();