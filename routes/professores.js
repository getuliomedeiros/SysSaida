const sequelize = require('sequelize');
const models = require('../models');
const Professor = models.professor;
const Turma = models.turma;
var express = require('express');
var app = express();

/* global __dirname */

app.get('', function(req,res) {
    Professor.findAll()
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
  Professor.findOne({
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

  Professor.create(req.body)
    .then(function(professor){
      Professor.belongsToMany(Turma, {
        through: {
          model: Turma,
          unique: false,
          scope: {
            taggable: 'post'
          }
        },
        foreignKey: 'professorId',
        constraints: false
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
    })
});


//update
app.put('', function (req, res){
  Professor.findById(parseInt(req.body.id))
    .then(function (obj){
      if(obj){
        obj.nome = req.body.nome || obj.nome;
        obj.matricula = req.body.matricula || obj.matricula;
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
  Professor.destroy({
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
