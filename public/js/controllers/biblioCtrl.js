
angular.module('controladores.biblioteca',['servicios.biblioteca'])
	.controller('LibroCtrl',LibroCtrl);

function LibroCtrl($scope,$http,Libro){

	$scope.libro = {};
	/*$scope.libros = [{titulo:'Relatos de un viejo indecente', autor:'Bukowski',anio:2010},
					{titulo:'Música acuática', autor:'TC Boyle',anio:2005}	
					];*/
	$scope.libros = Libro.libros;
	/*$scope.addLibro = function(){
		if($scope.libro)
			$scope.libros.push($scope.libro);
		$scope.libro = {};
	};*/

	$scope.getLibros = function(){
		Libro.getLibros();
		$scope.libros = Libro.libros;
	};

	$scope.addLibro = function(){
		console.log($scope.libro);
		Libro.addLibro($scope.libro);
		//$scope.libro = {};
	};

	$scope.showInfo = function(l){
		console.log(JSON.stringify(l));
	};

}