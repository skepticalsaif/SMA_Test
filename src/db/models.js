const Sequelize = require('sequelize')

const db = new Sequelize({
  dialect: 'sqlite',
  storage: __dirname + '/test.db',
  // database: 'socialmediadb1',
  // username: 'socialmediauser',
  // password: 'socialmediapass'
})

// table attribute definitions
const COL_ID_DEF = {
  type: Sequelize.DataTypes.INTEGER,
  autoIncrement: true,
  primaryKey: true
}
const COL_USERNAME_DEF = {
  type: Sequelize.DataTypes.STRING(30),
  unique: true,
  allowNull: false
}
const COL_TITLE_DEF = {
  type: Sequelize.DataTypes.STRING(140),
  allowNull: false
}

// sequelize automatically pluralizes the table name i.e (User => Users)
const Users = db.define('user', {
  id: COL_ID_DEF,
  username: COL_USERNAME_DEF
})

const Posts = db.define('post', {
  id: COL_ID_DEF,
  title: COL_TITLE_DEF,
  body: {
    type: Sequelize.DataTypes.TEXT,
    allowNull: false
  }
})

const Comments = db.define('comment', {
  id: COL_ID_DEF,
  title: COL_TITLE_DEF,
  body: {
    type: Sequelize.DataTypes.TEXT('tiny')
  }
})

// defining the relationships
Users.hasMany(Posts)
Posts.belongsTo(Users)  // foreign key

Users.hasMany(Comments)
Comments.belongsTo(Users)  // foreign key

Posts.hasMany(Comments)
Comments.belongsTo(Posts)  // foreign key 

module.exports = { db, Users, Posts, Comments }