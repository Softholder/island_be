function isThisType(val){
    for(let key in this){
        if(this[key] === val){
            return true
        }
    }
}

const LoginType = {
    // 小程序登录
    USER_MINI_PROGRAM: 100,
    // 邮箱登录
    USER_EMAIL: 101,
    // 手机号登录
    USER_MOBILE: 102,
    // 管理员邮箱登录
    ADMIN_EMAIL: 200,
    isThisType
}

module.exports = {
    LoginType
}