const axios = require('axios')
// node.js提供的帮助工具
const util = require('util')

const { User } = require('../models/user')
const { generateToken } = require('../../core/util')
const { Auth } = require('../../middlewares/auth')

class WXManager{

    static async codeToToken(code){
        // 微信登录不需要密码
        // code，动态生成，每次用户调用api登录时都需要携带code
        // appid与appsecret在微信申请，固定

        // 拼接url
        const url = util.format(global.config.wx.loginUrl,
            global.config.wx.appId,
            global.config.wx.appSecret,
            code)
        
        // 登录并获取openid
        const result = await axios.get(url)
        if(result.status !== 200) {
            throw new global.errs.AuthFailed('openid获取失败')
        }
        const errcode = result.data.errcode
        const errmsg = result.data.errmsg
        if(errcode) {
            throw new global.errs.AuthFailed('openid获取失败' + errmsg)
        }

        // 查询用户，若不存在则创建
        let user = await User.getUserByOpenid(result.data.openid)
        if(!user){
            user = await User.registerByOpenid(result.data.openid)
        }
        // 返回token
        return generateToken(user.id, Auth.USER)
    }
}

module.exports = {
    WXManager
}