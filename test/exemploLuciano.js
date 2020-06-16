var Usuario = sequelize.define('Usuario', {
        // Não é necessário definir id. Este já é adicionado por padrão.
        matricula: { type: DataTypes.STRING, allowNull: false , unique: true},
        senha: { type: DataTypes.STRING, allowNull: false },
        tipo: { type: DataTypes.ENUM('estudante', 'admin', 'funcionario'), allowNull: false }

    });
    Usuario.associate = function(models) {};

    // // Para especificar um relacionamento entre duas entidades, use associate.
    // // Na entidade Turma, veja a outra parte da definição do relacionamento.
    // Aluno.associate = function(models) {
    //     Aluno.belongsTo(models.Turma, {
    //         // onDelete especifica a ação a ser tomada após a entidade ser removida:
    //         // Em uma relação 1:N, se o lado 1, for removido:
    //         // -CASCADE: as N entidades também serão removidas
    //         // -NO ACTION: nada é feito
    //         // -SET DEFAULT: as N entidades terão a chave estrangeira definida como o valor padrão (default)
    //         // -SET NULL: as N entidades terão a chave estrangeira definida como null
    //         //
    //         // Em relacionamentos 1:N, a opção padrão é SET NULL.
    //         onDelete: "SET NULL",
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // }

    return Usuario;
  };
module.exports = function(sequelize, DataTypes) {

    var Estudante = sequelize.define('Estudante', {
        // Não é necessário definir id. Este já é adicionado por padrão.
        nome: { type: DataTypes.STRING, allowNull: false },
        curso: { type: DataTypes.STRING, allowNull: false },
        serie: { type: DataTypes.STRING, allowNull: false },
        foto: { type: DataTypes.BLOB, allowNull: true }

    });

    Estudante.associate = function(models) {
        // Define que uma Turma possui muitos Estudantes
        Estudante.hasMany(models.Falta);
        Estudante.hasMany(models.Contemplacao);
        Estudante.hasMany(models.Refeicao);
        Estudante.belongsTo(models.Usuario, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
        // Turma.hasMany(models.Disciplina);
        // Turma.belongsToMany(models.Professor, {
        //     through: models.Aula
        // });
    };

    return Estudante;
};
