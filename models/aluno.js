module.exports = function(sequelize, DataTypes) {
  const aluno = sequelize.define('aluno', {
    cidade: { type: DataTypes.STRING, allowNull: false },
  });

  aluno.associate = function(models) {
    this.belongsTo(models.turma, {as: 'turma', foreigKey: 'turmaId'});
    this.belongsTo(models.usuario, {as: 'usuario', foreigKey: 'usuarioId'});
  }

  return aluno;
};
