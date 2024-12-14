import mongoose from 'mongoose';

const paisSchema = new mongoose.Schema({
    name: {
        common: { type: String, required: true },
        official: { type: String, required: true },
        nativeName: {
            type: Object,
            required: true,
        },
    },
    independent: { type: Boolean, required: true },
    status: { type: String, required: true },
    unMember: { type: Boolean, required: true },
    currencies: { type: Object, required: true },
    capital: [String],
    region: { type: String, required: true },
    subregion: { type: String, required: true },
    languages: { type: Object, required: true },
    latlng: [Number],
    landlocked: { type: Boolean, required: true },
    borders: [String],
    area: { type: Number, required: true },
    flag: { type: String, required: true },
    maps: {
        googleMaps: { type: String, required: true },
        openStreetMaps: { type: String, required: true }
    },
    population: { type: Number, required: true },
    gini: { type: Object },
    fifa: { type: String },
    timezones: [String],
    continents: [String],
    flags: {
        png: { type: String, required: true },
        svg: { type: String, required: true },
        alt: { type: String }
    },
    startOfWeek: { type: String, required: true },
    capitalInfo: {
        latlng: [Number]
    },
    creador: { type: String, required: true }
}, { collection: 'Grupo-16' });

export default mongoose.model('Pais', paisSchema);