import PaisesRepository from '../repositories/PaisesRepository.mjs';
import axios from 'axios';
import Pais from '../models/paises.mjs';

const API_URL = 'https://restcountries.com/v3.1/all';

export async function obtenerPaises() {
    try {
        const response = await axios.get(API_URL);
        return response.data; 
    } catch (error) {
        console.error("Error al obtener los países:", error);
        throw error;
    }
} 