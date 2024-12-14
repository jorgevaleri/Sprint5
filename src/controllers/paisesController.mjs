import { obtenerPaises } from '../services/paisesServices.mjs';
import { renderizarListaPaises } from '../views/responseView.mjs';
import Pais from '../models/paises.mjs'; // Asegúrate de importar el modelo Pais

//FUNCION PARA VER TODOS LOS PAISES DE LA API//
export async function cargarPaises(req, res) {
    try {
        const paises = await obtenerPaises();
        
        // Guardar cada país en la base de datos
        for (const pais of paises) {
            // Verificar que el país tenga la propiedad 'subregion'
            if (!pais.subregion) {
                console.warn("El país no tiene subregión:", pais);
                continue; // O manejar esto de otra forma
            }

            const paisConCreador = {
                ...pais,
                creador: "Jorge Valeri" // Añadiendo la propiedad "creador"
            };

            try {
                await Pais.create(paisConCreador); // Guarda el país en la base de datos
            } catch (dbError) {
                console.error("Error al guardar país:", paisConCreador, dbError);
            }
        }

        res.send(renderizarListaPaises(paises));
    } catch (error) {
        console.error("Error al cargar países:", error);
        res.status(500).send("Error al cargar países");
    }
}

//FILTRO PARA VER LOS PAISES CON IDIOMA ESPAÑOL//
export async function paisesEspanol(req, res) {
    try {
        const paises = await obtenerPaises();

        // Filtrar países que tienen el idioma español
        const paisesConEspanol = paises.filter(pais => 
            pais.languages && pais.languages['spa']
        );

        res.send(renderizarListaPaises(paisesConEspanol));
    } catch (error) {
        console.error("Error al cargar países que hablan español:", error);
        res.status(500).send("Error al cargar países que hablan español");
    }
}