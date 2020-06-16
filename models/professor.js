module.exports = function(sequelize, DataTypes) {
  const professor = sequelize.define('professor', {
  });

  professor.associate = function(models) {
    this.belongsTo(models.usuario, {as: 'usuario', foreigKey: 'usuarioId'});
    this.belongsToMany(models.turma, { as: 'turma', through: 'professor_turma', foreignKey: 'professorId', otherKey: 'turmaId'});
  };

  return professor;
};
