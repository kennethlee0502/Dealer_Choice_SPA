const { VIRTUAL } = require("sequelize");
const Sequelize = require("sequelize");
const { UUID, UUIDV4, INTERGER, STRING, ENUM } = Sequelize.DataTypes;
const sequelize = new Sequelize(
  process.env.DATABASE || "postgres://localhost/workshop"
);

const Thing = sequelize.define("thing", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  employeeType: {
    type: ENUM("foods", "kitchen supplies", "daily supplies"),
    defaultValue: "foods",
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

const data = async () => {
  try {
    await sequelize.sync({ force: true });
    await Thing.create({ name: "cup cakes" });
    await Thing.create({ name: "more cup cakes" });
    await Thing.create({ name: "a lot more cup cakes" });
    await Thing.create({ name: "more more more more cup cakes" });
  } catch (e) {
    console.log(e);
  }
};

Thing.all = () => {
  return Thing.findAll();
};

module.exports = {
  Thing,
  data,
};
