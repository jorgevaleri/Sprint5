export function renderizarPais(pais){
    //Filtrar las propiedades no deseadas
    const { translations, tld, cca2, ccn3, cca3, cioc, idd, altSpellings, car, coatOfArms, postalCode, demonyms, ...resto } = pais;

    //Agregar la nueva propiedad "creador"
    const paisConCreador = {
        ...resto,
        creadro: "Jorge Valeri"
    };

    return{
        Nombre: pais.name.common,
        "Capital": pais.capital ? pais.capital[0] : "No disponible",
        "Población": pais.population,
        "Región": pais.region,
        "Idiomas": pais.languages ? Object.values(pais.languages).join(", ") : "No disponible",
        "Bandera": {
            PNG: pais.flags.png,
            SVG: pais.flags.svg,
            Descripción: pais.flags.alt
        },        
        "Cargado Por": paisConCreador.creador
    };
}

export function renderizarListaPaises(paisesController) {
    return paisesController.map(pais => renderizarPais(pais));
}