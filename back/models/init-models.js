var DataTypes = require("sequelize").DataTypes;
var _matchs = require("./matchs");
var _scores = require("./scores");
var _teams = require("./teams");
var _tournaments = require("./tournaments");

function initModels(sequelize) {
  var matchs = _matchs(sequelize, DataTypes);
  var scores = _scores(sequelize, DataTypes);
  var teams = _teams(sequelize, DataTypes);
  var tournaments = _tournaments(sequelize, DataTypes);

  matchs.belongsTo(scores, { as: "id_scores_score", foreignKey: "id_scores"});
  scores.hasMany(matchs, { as: "matches", foreignKey: "id_scores"});
  matchs.belongsTo(teams, { as: "id_home_team_team", foreignKey: "id_home_team"});
  teams.hasMany(matchs, { as: "matches", foreignKey: "id_home_team"});
  matchs.belongsTo(teams, { as: "id_away_team_team", foreignKey: "id_away_team"});
  teams.hasMany(matchs, { as: "id_away_team_matches", foreignKey: "id_away_team"});
  matchs.belongsTo(tournaments, { as: "id_tournois_tournament", foreignKey: "id_tournois"});
  tournaments.hasMany(matchs, { as: "matches", foreignKey: "id_tournois"});

  return {
    matchs,
    scores,
    teams,
    tournaments,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
