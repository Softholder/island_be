const Sequelize = require('sequelize')
const { dbName, host, port, user, password } = require('../config/config').database

// 实例化对象，参数：数据库名、用户名、密码
const sequelize = new Sequelize(dbName, user, password, {
    // 数据库类型，需要安装对应的驱动，如mysql2等
    dialect: 'mysql',
    host,
    port,
    // 是否打印sql语句
    logging: true, 
    // 时区
    timezone: '+08:00',
    define: {
        // 是否自动加入createAt、updateAt字段
        timestamps: true,
        // 是否自动加入deleteAt字段
        paranoid: true,
        // 设置字段名称
        createdAt: 'create_time',
        updatedAt: 'update_time',
        deletedAt: 'delete_time',
        // 设置下划线格式命名字段名
        underscored: true,
        // 设置表名与模型名相同
        freezeTableName: true
    }
})

// 调用sync() 根据 model自动在数据库中创建表
sequelize.sync({
    // 是否强制更新表结构
    force: true
})

module.exports = {
    sequelize
}