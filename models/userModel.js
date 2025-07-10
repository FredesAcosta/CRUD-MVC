// Importa la conexión a la base de datos desde el archivo db.js
const db = require('../db');
// Exporta un objeto que contiene funciones para interactuar con la tabla 'users'
module.exports = {
    // Obtener todos los registros de la tabla 'users'
    // callback es una función que recibe el resultado de la consulta
    getAll: (callback) => {
        db.query('SELECT * FROM users', callback);
    },
    // Crear un nuevo usuario en la base de datos
    // 'data' es un objeto con los campos del nuevo usuario
    create: (data, callback) => {
        // El signo de interrogación (?) será reemplazado por los valores de 'data'
        db.query('INSERT INTO users SET ?', data, callback);
    },
    // Buscar un usuario por su ID
    // Se utiliza para editar o ver detalles específicos
    getById: (id, callback) => {
        db.query('SELECT * FROM users WHERE id = ?', [id], callback);
    },
    // Actualizar un usuario según su ID
    // 'data' contiene los campos nuevos que se van a guardar
    update: (id, data, callback) => {
        db.query('UPDATE users SET ? WHERE id = ?', [data, id], callback);
    },

    // Eliminar un usuario por su ID
    delete: (id, callback) => {
        db.query('DELETE FROM users WHERE id = ?', [id], callback);
    }
};