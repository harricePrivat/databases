const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('matchs', {
    id_match: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_tournois: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tournaments',
        key: 'id_tournois'
      }
    },
    id_home_team: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'teams',
        key: 'id_team'
      }
    },
    id_away_team: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'teams',
        key: 'id_team'
      }
    },
    id_scores: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'scores',
        key: 'id_score'
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'matchs',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_match" },
        ]
      },
      {
        name: "id_tournois",
        using: "BTREE",
        fields: [
          { name: "id_tournois" },
        ]
      },
      {
        name: "id_home_team",
        using: "BTREE",
        fields: [
          { name: "id_home_team" },
        ]
      },
      {
        name: "id_away_team",
        using: "BTREE",
        fields: [
          { name: "id_away_team" },
        ]
      },
      {
        name: "id_scores",
        using: "BTREE",
        fields: [
          { name: "id_scores" },
        ]
      },
    ]
  });
};
