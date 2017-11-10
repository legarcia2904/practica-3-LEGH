var mongoose = require('mongoose');

var Libros = mongoose.model('Libro');

/**
 * Listar datos todos los libros
 */
exports.getLibros = function(req, res, next){
  Libros.find(function (err, libros) {
      if(err){
          res.status(403).jsonp({error:'403', info:err.message});
      }else{
          console.log('GET /libros');
          res.status(200).jsonp(libros);
      }
  });
};

/**
 * Adicionar un nuevo libro
 */
exports.addLibro = function(req, res, next){
    console.log('POST /libros');
    var libro = new Libros({
        titulo :req.body.titulo,
        anio : req.body.anio,
        autor : req.body.autor,
        genero : req.body.genero
    });
    libro.save(function (err, libro) {
        if(err) return res.status(403).jsonp({error:'403', info:err.message});
        Libros.findById(libro._id, function (err, libro) {
            if(err) return res.status(403).jsonp({error:'403', info:err.message});
            res.status(200).jsonp(libro);
        })
    });
};

/**
 * Obtener un libro dado su id
 */
exports.getById = function(req, res, next){
    Libros.findById(req.params.id, function (err, libro) {
        if(err){
            return res.status(403).jsonp({error:'403', info:err.message});
        }
        if(libro){
            console.log('GET /libros:id');
            return res.status(200).jsonp(libro);
        }else{
            return res.status(403).jsonp({error:'403', descrip:"No existe ningun libro con ese ID"});
        }
    });
};

/**
 * Actualizar un libro.
 */
exports.updateLibro = function(req, res, next){
    console.log('PUT /libros/:id');
    console.log(req.params.id);
    console.log(req.body);

    Libros.findById(req.params.id,function (err, libro) {
        if(err){
            res.status(403).jsonp({error:'403', info:err.message});
        }else{
            req.body.titulo?libro.titulo = req.body.titulo:null;
            req.body.autor?libro.autor = req.body.autor:null;
            req.body.anio?libro.anio = req.body.anio:null;
            req.body.genero?libro.genero = req.body.genero:null;
            libro.save(function (err, libro) {
                if(err) return res.status(403).jsonp({error:'403', info:err.message});
                Libros.find(function (err, libro) {
                    if(err) return res.status(403).jsonp({error:'403', info:err.message});
                    res.status(200).jsonp(libro);
                })
            });
        }
    });
};

/**
 * Borrar un libro de la BD.
 */
exports.deleteLibro = function(req, res, next){
    console.log('DELETE /libros/:id');
    console.log(req.params.id);
    Libros.findByIdAndRemove(req.params.id, function (err, libro) {
        if(err){
            return res.status(403).jsonp({error:'403', info:'No existe ese libro'});
        }else{
            Libros.find(function (err, libro) {
                if(err) return res.status(403).jsonp({error:'403', info:'Error eliminando libro'});
               return res.status(200).jsonp(libro);
            });
        }
    });
};
