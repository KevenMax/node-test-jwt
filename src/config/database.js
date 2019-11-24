require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

module.exports = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT || "postgres", // Definindo qual banco de dados
  storage: "./__tests__/database.sqlite",
  operatorsAliases: false, // Desabilitando warning do sequelize
  logging: false, // Não exibir alguns logs
  define: {
    timestamps: true, // Definindo na criação os campos createdAt e updatedAt
    underscored: true, // Definindo nomenclatura das tabelas com underline
    underscoredAll: true // Definindo nomenclatura das colunas das tabelas com underline
  }
};
