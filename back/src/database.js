require("dotenv").config();
require('pg');
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
// const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_BASE } = process.env;
const { DB_DEPLOY } = process.env;
const TypePackageModel = require("./models/TypePackage");
const PackageModel = require("./models/Package");
const AirlineModel = require("./models/Airline");
const CityModels = require("./models/City");
const CountryModels = require("./models/Country");
const ContinentModels = require("./models/Continent");
const HotelModels = require("./models/Hotel");
const ActivityModels = require("./models/Activity");
const UserModels = require("./models/User");
const CommentModels = require("./models/comment");
const AdminModels = require("./models/Admin");
const CityOriginModels = require("./models/CityOrigin");
const ShoppingCarModels = require("./models/ShoppingCar");
const ItemsShoppingCarModels = require("./models/ItemsShoppingCar");

// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_BASE}`,
//   { logging: false, native: false }
// );

const sequelize = new Sequelize(
  DB_DEPLOY,
  { logging: false,
    native: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Solo para desarrollo local. En producción, configúralo correctamente.
      },
    },
  }
);

TypePackageModel(sequelize);
PackageModel(sequelize);
AirlineModel(sequelize);
CityModels(sequelize);
CountryModels(sequelize);
ContinentModels(sequelize);
HotelModels(sequelize);
ActivityModels(sequelize);
UserModels(sequelize);
CommentModels(sequelize);
AdminModels(sequelize)
CityOriginModels(sequelize);
ShoppingCarModels(sequelize);
ItemsShoppingCarModels(sequelize);

const {
  TypePackage,
  Package,
  Airline,
  City,
  Country,
  Continent,
  Hotel,
  Activity,
  User,
  Comment,
  Admin,
  CityOrigin,
  ShoppingCar,
  ItemsShoppingCar,
} = sequelize.models;

// establecemos las relaciones
Package.belongsTo(Continent, { foreignKey: "idContinent", targetKey: "id" });
Package.belongsTo(City, { foreignKey: "idCity", targetKey: "id" });
Package.belongsTo(Country, { foreignKey: "idCountry", targetKey: "id" });
Package.belongsTo(CityOrigin, { foreignKey: "originCity", targetKey: "id" });
Package.belongsTo(Hotel, { foreignKey: "idHotel", targetKey: "id" });

CityOrigin.belongsTo(Country, { foreignKey: "idCountry", targetKey: "id" });
Package.belongsTo(TypePackage, { foreignKey: "idTypePackage", targetKey: "id",});

Package.belongsTo(Airline, { foreignKey: "idAirline", sourceKey: "id" });

Country.hasMany(City, { foreignKey: "idCountry", sourceKey: "id" });
City.belongsTo(Country, { foreignKey: "idCountry", targetKey: "id" });

Continent.hasMany(Country, { foreignKey: "idContinent", sourceKey: "id" });
Country.belongsTo(Continent, { foreignKey: "idContinent", targetKey: "id" });

City.hasMany(Hotel, { foreignKey: "idCity", sourceKey: "id" });
Hotel.belongsTo(City, { foreignKey: "idCity", targetKey: "id" });

Package.hasMany(Activity, { foreignKey: "idPackage", sourceKey: "id" });
Activity.belongsTo(Package, { foreignKey: "idPackage", targetKey: "id" });

User.hasMany(Comment, { foreignKey: "idUser", sourceKey: "id" });
Comment.belongsTo(User, { foreignKey: "idPackage", targetKey: "id" });

User.hasMany(ShoppingCar, { foreignKey: "idUser", sourceKey: "id"});
ShoppingCar.belongsTo(User,{ foreignKey: 'idUser', targetKey: "id"});

ShoppingCar.hasMany(ItemsShoppingCar, { foreignKey: "idShoppingCar", sourceKey: "id"});
ItemsShoppingCar.belongsTo(ShoppingCar, { foreignKey: "idShoppingCar", targetKey: "id"});

module.exports = {
  TypePackage,
  Airline,
  Package,
  City,
  Country,
  Continent,
  Hotel,
  Activity,
  User,
  Comment,
  Admin,
  CityOrigin,
  ShoppingCar,
  ItemsShoppingCar,
  conn: sequelize,
};
