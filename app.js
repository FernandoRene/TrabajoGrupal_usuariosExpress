/*
Integrantes: 

		David Hugo Rivas Gutierrez 

		Mauricio David Gordillo Herbas 

		Fernando Rene Llusco Blanco 
*/
// Importar Express
const express = require('express');
const app = express();

// Middleware para que Express pueda manejar JSON en las solicitudes y respuestas
// Hacer que Express sepa que vamos a recibir y enviar JSON
app.use(express.json());

// Datos de prueba: un arreglo con usuarios iniciales
let usuarios = [
    { id: 1, nombre: 'Juan', edad: 28 },
    { id: 2, nombre: 'Ana', edad: 22 },
    { id: 3, nombre: 'Luis', edad: 35 }
];
// Endpoint Inicial

// Ruta principal de la API rest mensaje de bienvenida
app.get('/', (req, res) => {
    res.send('Bienvenido a la API REST con Express.js');
});

// Endpoint: Obtener todos los usuarios

app.get('/api/usuarios', (req, res) => {
    res.status(200).json(usuarios);// devuelve el estado 200 y el arreglo de usuarios
});

// Endpoint: Obtener un usuario por ID

app.get('/api/usuarios/:id', (req, res) => {// recibe el parámetro ID de la URL
    const usuarioId = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === usuarioId);
    if (!usuario) return res.status(404).send('Usuario no encontrado');// si no se encuentra el usuario, devuelve el estado 404 y un mensaje
    res.status(200).json(usuario);// si se encuentra el usuario, devuelve el estado 200 y el objeto usuario
});

// Endpoint: Crear un nuevo usuario

app.post('/api/usuarios', (req, res) => {// recibe los datos del nuevo usuario
    const { nombre, edad } = req.body;
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre,
        edad
    };
    usuarios.push(nuevoUsuario);// agrega el nuevo usuario al arreglo de usuarios
    res.status(201).json(nuevoUsuario);//  devuelve el estado 201 y el objeto usuario creado
});

// Endpoint: Actualizar un usuario

app.put('/api/usuarios/:id', (req, res) => {//  recibe el parámetro ID de la URL
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (!usuario) return res.status(404).send('Usuario no encontrado');// si no se encuentra el usuario, devuelve el estado 404 y un mensaje

    const { nombre, edad } = req.body;// obtiene los datos del usuario a actualizar
    usuario.nombre = nombre || usuario.nombre;
    usuario.edad = edad || usuario.edad;

    res.status(200).json(usuario);// devuelve el estado 200 y el objeto usuario actualizado
});

// Endpoint: Eliminar un usuario

app.delete('/api/usuarios/:id', (req, res) => {//   recibe el parámetro ID de la URL
    const usuarioIndex = usuarios.findIndex(u => u.id === parseInt(req.params.id));// busca el índice del usuario a eliminar
    if (usuarioIndex === -1) return res.status(404).send('Usuario no encontrado');// si no se encuentra el usuario, devuelve el estado 404 y un mensaje

    const usuarioEliminado = usuarios.splice(usuarioIndex, 1);// elimina el usuario del arreglo de usuarios
    res.status(200).json('usuarioEliminado');// devuelve el estado 200 y el objeto usuario eliminado
});

// Configurar el puerto y levantar el servidor
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {// se levanta el servidor en el puerto 3002
    console.log(`Servidor escuchando en puerto ${PORT}`);// se imprime un mensaje en la consola que indica que el servidor está escuchando
});