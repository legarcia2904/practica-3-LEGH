var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer();
var models = require('../models/Libro');
var modelsAutor = require('../models/Autor');
var librosCtrl = require('../controllers/LibrosController');
var autoresCtrl = require('../controllers/AutoresController');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Práctica 3: Vistas con AngularJS' });
});

router.route('/libros')
  .get(librosCtrl.getLibros)
  .post(upload.array(), librosCtrl.addLibro);

router.route('/libros/:id')
  .get(librosCtrl.getById)
  .put(upload.array(), librosCtrl.updateLibro)
  .delete(librosCtrl.deleteLibro);

router.route('/autores')
  .get(autoresCtrl.getAutores) //Retorna todos los autores
  .post(upload.array(), autoresCtrl.addAutor); //Adicionar un nuevo autor a la BD

router.route('/autores/:id')
  .get(autoresCtrl.getById)//Buscar los libros dado un autor
  .put(upload.array(), autoresCtrl.updateAutor) //Modificar el nombre de un autor
  .delete(autoresCtrl.deleteAutor); //Borrar los libros de un autor

router.route('/autores/:id/libros')
    .get(autoresCtrl.getLibrosPorAutor); //Retorna todos los libros de un autor dado el autor_id

module.exports = router;
