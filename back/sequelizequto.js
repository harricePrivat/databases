const SequelizeAuto = require('sequelize-auto');

const auto = new SequelizeAuto('football', 'dev', 'dev', {
  host: 'localhost',
  dialect: 'mysql',
  directory: './models', // où les modèles seront générés
  additional: {
    timestamps: false
  }
});

auto.run().then(data => {
  console.log(data.tables);      // Tables info
  console.log(data.foreignKeys); // Clés étrangères
  console.log(data.indexes);     // Index
  console.log(data.hasTriggerTables); // Tables avec triggers
  console.log(data.relations);   // Relations entre modèles
  console.log(data.text);        // Texte générés
});


exports.module = auto;