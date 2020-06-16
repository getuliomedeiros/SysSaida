module.exports = function(sequelize, DataTypes) {
  const turma = sequelize.define('turma', {
    ano: { type: DataTypes.ENUM('1', '2', '3', '4'), allowNull: false },
    curso: { type: DataTypes.STRING, allowNull: false }
  });

  turma.associate = function(models) {
    this.hasMany(models.aluno, {as: 'aluno', foreigKey: 'alunoId'});
    this.belongsToMany(models.professor, { as: 'professor', through: 'professor_turma', foreignKey: 'turmaId', otherKey: 'professorId'});
  };

  return turma;
};
