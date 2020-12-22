const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'vehicle',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    device_code: {
      type: Sequelize.STRING
    },
   
    car_make: {
      type: Sequelize.STRING
    },

    car_model: {
      type: Sequelize.STRING
    },

    car_year: {
      type: Sequelize.STRING
    },

    key_model: {
      type: Sequelize.STRING
    },

    license_plate: {
      type: Sequelize.STRING
    },

    car_color: {
      type: Sequelize.STRING
    },

    tags: {
      type: Sequelize.STRING
    },

    doors: {
      type: Sequelize.STRING
    },

    open_trunk_buttons: {
      type: Sequelize.STRING
    },

    ignition: {
      type: Sequelize.STRING
    },
	
    created: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  },
  {
    timestamps: false
  }
)