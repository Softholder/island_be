const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')
const { Art } = require('./art')

class Favor extends Model {

    // 业务表：记录用户是否对音乐、书籍等点过赞
    // 用户点赞
    static async like(art_id, type, uid){
        // 1、往favor表添加一条记录，2、art表中fav_nums加1
        // 使用数据库的事务性保证上述两个操作要么同时成功，要么同时不成功
        const favor = await Favor.findOne({
            where:{
                art_id,
                type,
                uid
            }
        })
        if(favor){
            throw new global.errs.LikeError()
        }
        // 事务执行结果一定要返回
        return sequelize.transaction(async t => {
            // 从无到有的创建使用的是Favor类的静态方法
            await Favor.create({
                art_id,
                type,
                uid
            }, { transaction: t }) // 新增时的事务在第二个花括号中传递
            const art = await Art.getData(art_id, type)
            await art.increment('fav_nums', { by: 1, transaction: t })
        })
    }

    // 用户取消点赞
    static async dislike(art_id, type, uid){
        const favor = await Favor.findOne({
            where:{
                art_id,
                type,
                uid
            }
        })
        if(!favor){
            throw new global.errs.DislikeError()
        }
        // Favor表，favor记录
        // 事务执行结果一定要返回
        return sequelize.transaction(async t => {
            // 从有到无的销毁使用的是定位到的favor实例
            await favor.destroy({
                // false表示软删除，true表示物理删除
                force: false,
                // 删除时的事务在第一个花括号中传递
                transaction: t
            })
            const art = await Art.getData(art_id, type)
            await art.decrement('fav_nums', { by: 1, transaction: t })
        })
    }

     // 用户是否对期刊点过赞
    static async userLikeIt(art_id, type, uid) {
        const favor = await Favor.findOne({
            where: {
                uid,
                art_id,
                type
            }
        })
        return favor ? true : false
    }

}


Favor.init({
    uid: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER
}, {
    sequelize,
    tableName: 'favor'
})

module.exports = {
    Favor
}