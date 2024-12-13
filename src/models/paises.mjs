import mongoose from 'mongoose';

const paisSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    capital: { type: String, required: true },
    poblacion: { type: Number, required: true },
    region: { type: String, required: true },
    lenguajes: [String],
    bandera: String, // URL de la bandera
    cargadoPor: { type: String, required: true }
}, {collection: 'Grupo-16'});

export default mongoose.model('Pais', paisSchema);