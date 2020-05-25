module.exports = {
    // prod
    environment: 'dev',
    database: {
        dbName: 'island',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '1234'
    },
    security: {
        // 私钥
        secretKey: "abcdefg",
        // 令牌失效时间, 1 month
        expiresIn: 60*60*24*30
    }
}