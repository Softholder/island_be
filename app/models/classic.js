// music/sentence/movie三者合称classic，classic与book合称art
// music/sentence/movie的共同字段/属性
// 共同字段：image、title、pubdate、content、fav_nums、type
// music特有字段：url
const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

const classicFields = {
    image: Sequelize.STRING,
    content: Sequelize.STRING,
    pubdate: Sequelize.DATEONLY,
    fav_nums: Sequelize.INTEGER,
    title: Sequelize.STRING,
    type: Sequelize.TINYINT
}

// movie表
class Movie extends Model{

}

Movie.init(classicFields, {
    sequelize,
    tableName: 'movie'
})

// sentence表
class Sentence extends Model {

}

Sentence.init(classicFields, {
    sequelize,
    tableName: 'sentence',
})

// music表
class Music extends Model {

}

const musicFields = Object.assign({
    url: Sequelize.STRING
}, classicFields)

Music.init(musicFields, {
    sequelize,
    tableName: 'music',
})

module.exports = {
    Movie,
    Sentence,
    Music
}