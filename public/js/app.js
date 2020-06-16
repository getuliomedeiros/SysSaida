angular
  .module('syssaida', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home.html'
      })
      .when('/admin', {
        templateUrl: 'admin.html',
        controller: 'adminCtrl'
      })
      .when('/usuario', {
        templateUrl: 'usuario.html',
        controller:'usuarioCtrl'
      });

  })
  .controller('usuarioCtrl',function ($http, $scope) {
  $scope.usuario={
    'nome':'Marcelo Alves',
    'curso':'Informatica',
    'matricula':'201613530033',
    'Cidade':'Picuí',
    'foto':'admin.jpg',
    'horarios':{
      'aula':['POO','POO','POO','PCO','PCO','PCO'],
       'horas':['7:00','7:50','8:40','9:50','10:40','11:30']
    }};
  })
  .controller('adminCtrl', function($http, $scope){
    $scope.usuario = {}
    $scope.turma = {}
    $scope.turmaData = {
      turmas: [],
      selecionada: {}
    }
    $scope.exibicao = ['Aluno', 'Professor', 'Funcionário'];
    $scope.estado ={'aluno': false,'professor': false,'funcionario': false}

    $scope.exibir = function(id){
      if (id == 0) {
        $scope.estado.aluno = !$scope.estado.aluno; $scope.estado.professor = false; $scope.estado.funcionario = false; $scope.usuario.tipo = 'Aluno';
      }else if (id == 1) {
        $scope.estado.professor = !$scope.estado.professor; $scope.estado.aluno = false; $scope.estado.funcionario = false; $scope.usuario.tipo = 'Professor';
      }else if (id == 2) {
        $scope.estado.funcionario = !$scope.estado.funcionario; $scope.estado.aluno = false; $scope.estado.professor = false; $scope.usuario.tipo = 'Funcionario';
      }
    }

    $scope.criarTurma = function() {
      $http
      .post('http://localhost:3000/turmas/', $scope.turma)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(erro) {
        console.log(erro);
      });
      $scope.turma = {}
    }
    $scope.exibirTurmas = function() {
      $http
      .get('http://localhost:3000/turmas/')
      .then(function(response) {
        $scope.turmas = response.data.result;
      })
      .catch(function(erro) {
        console.log(erro);
      });
    }

    $scope.cadastrar = function() {
      $scope.usuario.turmaId = $scope.turmaData.selecionada.id;
      $scope.usuario.curso = $scope.turmaData.selecionada.curso;
      $scope.usuario.ano = $scope.turmaData.selecionada.ano;
      $http
      .post('http://localhost:3000/usuarios', $scope.usuario)
      .then(function(response){
        console.log(response);
      })
      .catch(function(erro) {
        console.log(erro);
      });
      $scope.usuario = {}
    }
    $scope.turmasProfessor = [];
    $scope.selecionado = [];
    $scope.turmaSelecionada = function(turma) {
      var index = $scope.selecionado.indexOf(turma);
      if (index > -1) {
        $scope.selecionado.splice(idx, 1);
      }
      else {
        $scope.selecionado.push(turma);
      }
    };
    $scope.getTurmas = function() {
      $http
      .get('http://localhost:3000/turmas')
      .then(function(response){
        $scope.turmaData.turmas = response.data.result;
        for (var i = 0; i < $scope.turmaData.turmas.length; i++) {
          $scope.turmasProfessor.push($scope.turmaData.turmas[i].ano+'° de '+$scope.turmaData.turmas[i].curso)
        }
      })
      .catch(function(erro) {
        console.log(erro);
      });
    }

  });
