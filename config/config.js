module.exports = {
  // prod
  environment: 'dev',
  database: {
    dbName: 'island',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
  },
  security: {
    // 私钥
    secretKey: 'abcdefg',
    // 令牌失效时间, 1 month
    expiresIn: 60 * 60 * 24 * 30,
  },
  wx: {
    appId: 'wx8892ff2bca2068b2',
    appSecret: 'cc68681b438e590bf347e5b0e5d1f164',
    loginUrl:
        'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code',
  },
};