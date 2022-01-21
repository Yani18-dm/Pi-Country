const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
      id:{
        type: DataTypes.UUID,     
        defaultValue: DataTypes.UUIDV4,    
        allowNull: false,
        primaryKey: true
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      continente: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capital:  {
        type: DataTypes.STRING,
        allowNull: false,
      }, 
      bandera:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      poblacion:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      area:{
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      createdInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      }
  });
};
