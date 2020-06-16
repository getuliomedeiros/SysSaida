const sequelize = require('sequelize');
const models = require('../models');
const Usuario = models.usuario;
const Aluno = models.aluno;
const Professor = models.professor;
const Funcionario = models.funcionario;
var express = require('express');
var app = express();

/* global __dirname */

app.get('', function(req,res) {
    Usuario.findAll()
      .then(function (objs){
        res.json({
          success: true,
          message: 'Ok',
          result: objs
        });
      });
});

//get by id
app.get('/:id', function (req, res){
  Usuario.findOne({
      where: {
        Id: req.params.id
      }
    })
    .then(function (obj){
      if(obj){
        res.json({
          success: true,
          message: 'Ok',
          result: obj
        });
      }
      else{
        res.json({
          success: false,
          message: 'error',
          result: 'id(' + req.params.id + ') gender does not exist'
        });
      }
    });
});

//add
app.post('', function (req, res){
  console.log(req.body);
  Usuario.create({
    nome: req.body.nome,
    matricula: req.body.matricula,
    senha: req.body.senha,
    tipo: req.body.tipo
  }).then(function(usuario) {
    if (req.body.tipo == "Aluno") {
      Aluno.create({
        cidade: req.body.cidade,
        turmaId: req.body.turmaId,
        usuarioId: usuario.id
      }).then(function (obj){
        res.json({
          success: true,
          message: 'added successfully',
          result: obj
        });
      },function (erro){
        res.json({
          success: false,
          message: 'failed to add',
          result: erro
        });
      });
    } else if (req.body.tipo == "Professor") {
      Professor.create({
        usuarioId: usuario.id
      })
    } else if (req.body.tipo == "Funcionario") {
      Funcionario.create({
        funcao: req.body.funcao,
        usuarioId: usuario.id
      }).then(function (obj){
        res.json({
          success: true,
          message: 'added successfully',
          result: obj
        });
      },function (erro){
        res.json({
          success: false,
          message: 'failed to add',
          result: erro
        });
      });
    }
  });
});

//update
app.put('', function (req, res){
  Usuario.findById(parseInt(req.body.id))
    .then(function (obj){
      if(obj){
        obj.nome = req.body.nome || obj.nome;
        obj.matricula = req.body.matricula || obj.matricula;
        obj.senha = req.body.senha || obj.senha;
        obj.tipo = req.body.tipo || obj.tipo;
        obj
          .save()
          .then(function (obj){
            res.json({
              success: true,
              message: 'update successfully',
              result: obj
            });
          });
      }
      else{
        res.json({
          success: false,
          message: 'error',
          result: 'id(' + req.body.id + ') gender does not exist'
        });
      }
    });
});

//delete
app.delete('/:id', function (req, res){
  Usuario.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function (){
      res.json({
        success: true,
        message: 'deleted gender',
        result: undefined
      });
    });
});

module.exports = app;
