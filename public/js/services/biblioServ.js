angular.module('servicios.biblioteca',[])
	.factory('Libro',Libro);


	function Libro($http){
		var l = {
			libros : []
		};

		l.getLibros = function(){
			return $http.get('/libros')
							.then(function(res){
								console.log(res.data);
								angular.copy(res.data,l.libros);
							},function(res){
								console.log("Error: "+res.statusText);
							});
		};

		l.addLibro = function(nuevo){
			return $http.post('/libros',nuevo)
							.then(function(res){
								l.libros.push(res.data);
							},function(res){
								console.log("Error: "+res.statusText);
							});
		};

		return l;	
	};