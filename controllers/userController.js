// Importa el módulo 'path' para trabajar con rutas de archivos en el sistema
const path = require('path');

// Importa el modelo que maneja las operaciones con la base de datos para los usuarios
const userModel = require('../models/userModel');

// Exporta un objeto con funciones que sirven como controladores para cada ruta
module.exports = {

    // Controlador que lista todos los usuarios registrados
    list: (req, res) => {
    userModel.getAll((err, results) => {
        if (err) throw err;

        let html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Usuarios Registrados</title>
            <style>
                body {
                    background: linear-gradient(130deg,#ffffff 20%, #005082 80%);
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    background: linear-gradient(160deg,#005082 10%, #ffffff 80%);
                    max-width: 700px;
                    margin: 60px auto;
                    padding: 40px 30px 30px 30px;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    text-align: center;
                }
                h1 {
                    color: #ffffff;
                    margin-bottom: 30px;
                }
                a {
                    display: inline-block;
                    padding: 8px 18px;
                    background: #007bff;
                    color: #fff;
                    border-radius: 4px;
                    text-decoration: none;
                    font-size: 15px;
                    margin: 0 2px;
                    transition: background 0.2s;
                }
                a:hover {
                    background: #0056b3;
                }
                ul {
                    list-style: none;
                    padding: 0;
                }
                li {
                    background: #fff;
                    margin-bottom: 10px;
                    padding: 12px 10px;
                    border-radius: 4px;
                    box-shadow: 0 1px 4px rgba(0,0,0,0.05);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .actions {
                    min-width: 180px;
                }
            </style>
        </head>
        <body>
        <div class="container">
            <h1>Usuarios Registrados</h1>
            <a href="/users/create">Crear nuevo</a>
            <ul>
        `;

        results.forEach(user => {
            html += `
                <li>
                    <span>${user.nombre} - ${user.email} - ${user.telefono} - ${user.rol}</span>
                    <span class="actions">
                        <a href="/users/edit/${user.id}">Editar</a>
                        <a href="/users/delete/${user.id}">Eliminar</a>
                    </span>
                </li>
            `;
        });

        html += `
            </ul>
        </div>
        </body>
        </html>
        `;
        res.send(html);
    });
},

    // Muestra el formulario para crear un nuevo usuario
    formCreate: (req, res) => {
        // Envía el archivo HTML con el formulario
        res.sendFile(path.join(__dirname, '../views/formCreate.html'));
    },

    // Controlador que guarda el nuevo usuario en la base de datos
    create: (req, res) => {
        // Extrae los datos enviados desde el formulario
        const { nombre, email, telefono, rol } = req.body;

        // Llama al modelo para guardar los datos
        userModel.create({ nombre, email, telefono, rol }, (err) => {
            if (err) throw err;
            res.redirect('/users'); // Redirige a la lista de usuarios
        });
    },

    // Controlador que busca un usuario por su ID y redirige al formulario de edición
    formEdit: (req, res) => {
        const id = req.params.id; // Se obtiene el ID desde la URL

        userModel.getById(id, (err, results) => {
            if (err) throw err;

            if (results.length > 0) {
                const user = results[0];

                // Redirige al formulario de edición con los datos del usuario como parámetros en la URL
                res.redirect(`/users/edit_form?id=${user.id}&nombre=${user.nombre}&email=${user.email}&telefono=${user.telefono}&rol=${user.rol}`);
            } else {
                res.send('Usuario no encontrado');
            }
        });
    },

    // Muestra el formulario de edición como archivo HTML
    formEditRender: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/formEdit.html'));
    },

    // Controlador que actualiza los datos del usuario en la base de datos
    update: (req, res) => {
        const id = req.params.id; // ID del usuario a editar
        const { nombre, email, telefono, rol } = req.body; // Nuevos datos del formulario

        userModel.update(id, { nombre, email, telefono, rol }, (err) => {
            if (err) throw err;
            res.redirect('/users'); // Redirige a la lista de usuarios
        });
    },
    // Controlador que elimina un usuario por su ID
    delete: (req, res) => {
        const id = req.params.id; // ID del usuario a eliminar

        userModel.delete(id, (err) => {
            if (err) throw err;
            res.redirect('/users'); // Redirige a la lista después de eliminar
        });
    }
};