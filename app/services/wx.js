// node.js提供的帮助工具
const util = require('util')

class WXManager{

    static async codeToToken(code){
        // 微信登录不需要密码
        // code，动态生成，每次用户调用api登录时都需要携带code
        // appid与appsecret在微信申请，固定
        // url
        const url = util.format(global.config.wx.loginUrl,
            global.config.wx.appId,
            global.config.wx.appSecret,
            code)
        
        const result = await axios.get(url)
        if(result.status !== 200) {
            throw new global.errs.AuthFailed('openid获取失败')
        }
        const errcode = result.data.errcode
        if(errcode !== 0) {
            throw new global.errs.AuthFailed('openid获取失败' + errcode)
        }
    }
}