const bcrypt = require('bcryptjs')

const { sequelize } = require('../../core/db')

const { Sequelize, Model } = require('sequelize')

// 定义用户表的类User继承自Model
class User extends Model{
    // async要紧跟着函数名
    static async verifyEmailPassword(email, plainPassword){
        const user = await User.findOne({
            where:{
                email
            }
        })
        if(!user){
            throw new global.errs.AuthFailed('账号不存在');
        }
        // 比较明文密码和密文密码
        const correct = bcrypt.compareSync(plainPassword, user.password)
        if(!correct){
            throw new global.errs.AuthFailed('密码不正确')
        }
        return user
    }
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
    password: {
        type: Sequelize.STRING,
        // model属性操作，观察者模式
        set(val){
            // 生成盐值
            const salt = bcrypt.genSaltSync(10)
            // 密码加密
            const psw = bcrypt.hashSync(val, salt)
            // 第一个参数为字段名，第二个参数为值
            this.setDataValue('password',psw)
        }
    },
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