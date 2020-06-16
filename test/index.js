const Sequelize = require('sequelize');
const sequelize = new Sequelize('mydb', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});
const Aluno = require('./models/aluno');


sequelize.sync()
  .then(() => Aluno.create({
    nome: 'Álvaro Getúlio Lima Medeiros',
    matricula: '201513530194',
    curso: 'Informática',
    turma: '2017.1',
    cidade: 'Picuí'
  })
)
  .then(() => Aluno.findAll().then(function(aluno) {
    console.log(aluno.dataValues)
})
);
