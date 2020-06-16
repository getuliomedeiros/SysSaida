module.exports = function(sequelize, DataTypes) {
  const usuario = sequelize.define('usuario', {
    nome: { type: DataTypes.STRING, allowNull: false },
    matricula: { type: DataTypes.STRING, allowNull: false , unique: true},
    senha: { type: DataTypes.STRING, allowNull: false },
    tipo: { type: DataTypes.ENUM('Aluno', 'Professor', 'Funcionário'), allowNull: false },
    foto: { type: DataTypes.BLOB, allowNull: true }
  });

usuario.associate = function(models) {
  };

  return usuario;
};
