const { sequelize } = require('../../core/db')

const { Sequelize, Model } = require('sequelize')

// 定义用户表的类User继承自Model
class User extends Model{

}

// 设置用户表的字段
User.init({
    id: {
        // 类型
        type: Sequelize.INTEGER,
        // 主键，不能重复、不能为空，应为数字，不应该使用字符串
        primaryKey: true,
        // 自增
        autoIncrement: true
    },
    nickname: Sequelize.STRING,
    email: {
        type: Sequelize.STRING(128),
        // 是否唯一
        unique: true
    },
    password: Sequelize.STRING,
    openid: {
        type: Sequelize.STRING(64),
        // 是否唯一
        unique: true
    },
}, { 
    sequelize,
    // 设置表名
    tableName: 'user'
 })

 module.exports = { User }