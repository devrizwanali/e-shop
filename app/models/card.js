module.exports = (sequelize, Sequelize) => {
  const Card = sequelize.define("cards", {
    quantity: {
      type: Sequelize.INTEGER
    },
    productId: {
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER
    }
  });

  return Card;
};