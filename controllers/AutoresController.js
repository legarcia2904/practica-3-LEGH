var mongoose = require('mongoose');

var Autores = mongoose.model('Autor');
var Libros = mongoose.model('Libro');

/**
 * Listar datos todos los autores
 */
exports.getAutores = function(req, res, next){
    console.log('GET /autores');
    Autores.find(function (err, autores) {
        if(err){
            return res.status(403).jsonp({error:'403', info:err.message});
        }else{
            res.status(200).jsonp(autores);
        }
    });
};
/**
 * Guardar en BD un nuevo autor
 */
exports.addAutor = function(req, res, next){
    console.log('POST /autores');
    var autor = new Autores({
        nombre :req.body.nombre,
        apellidos : req.body.apellidos,
        nacionalidad : req.body.nacionalidad,
    });
    autor.save(function (err, autors) {
        if(err) return res.status(403).jsonp({error:'403', info:err.message});
        res.status(200).jsonp(autors);
    });
};

/** Buscar el autor dado su ID*/
exports.getById = function(req, res, next){
    console.log('GET /autores:id');
    Autores.findById(req.params.id, function (err, autor) {
        if(err){
            return res.status(403).jsonp({error:'403', info:err.message});
        }
        if(autor){
            Libros.find({'autor':req.params.id}, function (err, libro) {
                if(err){
                    return res.status(403).jsonp({error:'403', info:err.message});
                }else{
                    autor.libros=libro;
                    return res.status(200).jsonp(autor);
                }
            });
        }else{
            return res.status(403).jsonp({error:'403', descrip:"El autor no existe en la BD"});
        }
    });
};

/**
 * Modificar el nombre del autor dado ID.
 * Devuelve el registro actualizado.
 */
exports.updateAutor = function (req, res, next) {
    console.log('PUT /autores/:id');
    console.log(req.params.id);
    console.log(req.body);
    Libros.find({'autor':req.params.id}, function (err, libro) {
       if(libro.length>0){
           Autores.findById(req.params.id,function (err, autor) {
               if(err){
                   res.status(403).jsonp({error:'403', info:err.message});
               }else{
                   req.body.nombre?autor.nombre = req.body.nombre:null;
                   req.body.apellidos?autor.apellidos = req.body.apellidos:null;
                   req.body.nacionalidad?autor.nacionalidad = req.body.nacionalidad:null;

                   autor.save(function (err, autor) {
                       if(err) return res.status(403).jsonp({error:'403', info:err.message});
                       Libros.find({'autor':req.params.id}, function (err, libro) {
                           if(err){
                               return res.status(403).jsonp({error:'403', info:err.message});
                           }else{
                               autor.libros=libro;
                               return res.status(200).jsonp(autor);
                           }
                       });
                   });
               }
           });
       }else{
           return res.status(403).jsonp({error:'403', descrip:"No exite ese autor."});
       }
    });
};

/**
 * Borra de la BD todos los libros del autor dada el autor_id.
 * Devuelve todos los registros eliminados.
 */
exports.deleteAutor = function(req, res, next){
    console.log('DELETE /autores/:id');
    console.log(req.params.id);
    var libro_conjunto =[];
    Libros.find({'autor':req.params.id}, function (err, libro) {
        libro_conjunto =libro;
    });
    Autores.findById(req.params.id, function (err, autor) {
       if(err || !autor){
           return res.status(403).jsonp({error:'404', info:"No existe."});
       }else{
           Libros.find({'autor':req.params.id}).remove().exec(function (err, libro) {
               Autores.findByIdAndRemove(req.params.id, function (err, autor) {
                   if(err){
                       return res.status(403).jsonp({error:'403', info:err.message});
                   }else{
                       autor.libros = libro_conjunto;
                       res.status(200).jsonp(autor);
                   }
               });
           });
       }
    });
};

/**
 * Buscar los libros escritos relacionados con un autor dado el autor_id
 */
exports.getLibrosPorAutor = function (req, res, next) {
    console.log('GET /autores/:id/libros');
    Autores.findById(req.params.id, function (err, autor) {
        if(err || !autor){
            return res.status(403).jsonp({error:'403', info:err.message});
        }else{
            Libros.find({'autor':req.params.id}, function (err, libro) {
                if(err){
                    return res.status(403).jsonp({error:'403', info:err.message});
                }else{
                    autor.libros=libro;
                    if(libro.length==0){
                        return res.status(403).jsonp({error:'403', info:"No hay libros de ese autor."});
                    }else{
                        return res.status(200).jsonp(libro);
                    }
                }
            });
        }
    });
};

