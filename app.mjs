import mongoose from "mongoose";
const url = 'mongodb+srv://Grupo-14:grupo14@cursadanodejs.Is9ii.mongodb.net/Node-js'
mongoose.connect(url)
    .then(() => console.log('Conectado a la base de datos de MongoDB'))
    .catch(err => console.error('Error al conectar a la base de datos de MongoDB', err));
// Crear el Esquema de la colección Superhéroes y Modelos.
const Schema = mongoose.Schema;
const superheroeSchema = new Schema({
    nombreSuperhéroe: { type: String, required: true },
    nombreReal: { type: String, required: true },
    nombreSociedad: { type: String, required: true },
    edad: { type: Number, min: 0 },
    planetaOrigen: { type: String, default: 'Desconocido' },
    debilidad: {type: String},
    poder: [String],
    aliados: [String],
    enemigos: [String],
    createAt: { type: Date, default: Date.now },
    creador: {type: String}},
    {collection: 'Grupo-14'
});
const Superheroe = mongoose.model('superhéroe', superheroeSchema);
// Insertar un Nuevo Superhéroe.
async function insertSuperheroe() {
    const superheroeNuevo = new Superheroe({
        nombreSuperhéroe: 'HellBoy',
        nombreReal: 'Anung Un Rama',
        edad: 60,
        planetaOrigen: 'Infierno',
        debilidad: 'Hierro',
        poder: ['Fuerza Sobrehumana', 'Resistencia Sobrehumana', 'Regeneración', 'Longevidad'],
        aliados: ['Abe Sapien', 'Liz Sherman', 'Johann Kraus'],
        enemigos: ['Rasputín', 'Karl Ruprecht Kroenen', 'Herman von Klempt'],
        creador: 'Mike Mignola'},
        {collection: 'Grupo-14'
});
    await superheroeNuevo.save();
    console.log('Superhéroe Creado', superheroeNuevo);
}
// Actualizar un Superhéroe Existente.
async function updateSuperheroe(nombreSuperhéroe) {
    const result = await Superheroe.updateOne(
        {nombreSuperhéroe: nombreSuperhéroe},
        {$set: {edad: 100} }
    );
    console.log('Resultado de Actualización:', result);
}
// Eliminar un Superhéroe Existente.
async function deleteSuperheroe(nombreSuperhéroe) {
    const result = await Superheroe.deleteOne({ nombreSuperhéroe: nombreSuperhéroe});
    console.log('HellBoy Eliminado:', result);
}
// Buscar un Superhéroe por Nombre.
async function searchSuperhero(nombreSuperhéroe, planetaOrigen) {
    const result = await Superheroe.find({nombreSuperhéroe, planetaOrigen});
    console.log('Resultado de Búsqueda:', result);
}
// Listar todos los Superhéroes.
async function listSuperheroes() {
    const result = await Superheroe.find();
    console.log('Listado de Superhéroes:', result);
}