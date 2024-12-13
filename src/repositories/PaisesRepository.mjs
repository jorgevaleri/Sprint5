import paises from '../models/paises.mjs';
import IRepository from './IRepository.mjs';

class PaisesRepository extends IRepository{
    
    async obtenerTodos(){
        return await paises.find({});
    }
}

export default new PaisesRepository();