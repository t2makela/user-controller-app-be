const express = require('express');
const router = express.Router();
const { Sequelize, Model, DataTypes } = require('sequelize');
const { solveSqlErrors } = require("../helpers/sqlErrorSolver")

// Create Sequelize instance
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
  });

// Define User model
class User extends Model {}
User.init({
    id: { 
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
           len: {
            args:[3, 30],
            msg: "Length must be between 3 and 30"
            }
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull:false,
        unique: true,
        validate: {
            len: {
            args:[3, 30],
            msg: "Length must be between 3 and 30"
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
            isEmail: true,
            notEmpty: true,
            notNull: true 
        }
    },
    phone: { 
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
            len: [5, 10],
        }
        
    },
    website: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true
        }
    }
}, { sequelize, modelName: 'user' });

// Sync models with database
sequelize.sync();

// Routes for user model

// Get all users
router.get('/', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

// Add user
router.post('/', async (req, res) => {
    try {
       const user = await User.create(req.body);
       res.json(user);
    } catch (err) {
        const errors = solveSqlErrors(err);
        res.json(errors);
    }
  });

// Modify user
router.put('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        try {
            await user.update(req.body);
            res.json(user);
        } catch (err) {
            const errors = solveSqlErrors(err);
            res.json(errors);
        }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });

// Delete user  
  router.delete('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });

  module.exports =  router;