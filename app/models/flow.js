const { sequelize } = require('../../core/db');
const { Sequelize, Model } = require('sequelize');

class Flow extends Model{

}

Flow.init({
    // 期号
    index: Sequelize.INTEGER,
    // 实体表中的id
    artId: Sequelize.INTEGER,
    // 类型：movie/sentence/music
    type: Sequelize.INTEGER
}, {
    sequelize,
    tableName: 'flow'
})

module.exports = {
    Flow
}