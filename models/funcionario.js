module.exports = function(sequelize, DataTypes) {
  const funcionario = sequelize.define('funcionario', {
    funcao: { type: DataTypes.STRING, allowNull: false }
  });

funcionario.associate = function(models) {
      this.belongsTo(models.usuario, {as: 'usuario', foreigKey: 'usuarioId'});
    };

  return funcionario;
}
