import { obtenerPaises } from '../services/paisesServices.mjs';
import { renderizarPais, renderizarListaPaises} from '../views/responseView.mjs';

export async function cargarPaises(req, res) {
    const paises = await obtenerPaises();
    // res.render('paginas/dashboard', {superheroes, title: 'dashboard'}) 
    res.send(renderizarListaPaises(paises));
}

export async function paisesEspanol(req, res) {
    const paises = await obtenerPaises();

    // Filtrar países que tienen el idioma español
    const paisesConEspanol = paises.filter(pais => 
        pais.languages && pais.languages['spa']
    );

    res.send(renderizarListaPaises(paisesConEspanol));
}