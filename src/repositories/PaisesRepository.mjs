import paises from '../models/paises.mjs';
import IRepository from './IRepository.mjs';

class PaisesRepository extends IRepository{
    
    async obtenerTodos(){
        return await paises.find({});
    }

    static async obtenerPorId(id) {
        return await Pais.findById(id); // Ajusta esto según tu ORM
    }

    static async actualizar(id, paisData) {
        return await Pais.findByIdAndUpdate(id, paisData, { new: true }); // Ajusta esto según tu ORM
    }

    async eliminar(id){
        return await paises.findByIdAndDelete(id);
    }
}

export default new PaisesRepository();