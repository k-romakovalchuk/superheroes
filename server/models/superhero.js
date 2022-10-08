const {sequelize} = require('../utils/db.js');
const {DataTypes} = require('sequelize');

const Superhero = sequelize.define('Superhero', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  realName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'real_name',
  },
  originDescription: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'origin_description',
  },
  superpowers: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  catchPhrase: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'catch_phrase',
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at',
  },
}, {
  tableName: 'Superhero',
  updatedAt: false,
})

module.exports = {Superhero}