const { LinValidator, Rule } = require('../../core/lin-validator-v2')

const { User } = require('../models/user')
const { LoginType } = require('../lib/enum')

class PositiveIntegerValidator extends LinValidator{
    constructor(){
        super()
        // 类的属性名需要保持与校验对象的属性名一致
        // 带isInt校验规则的validator才可以自动转型(string 转 int)
        this.id = [
            // 第一个参数为检验规则，第二个为校验不通过的提示信息，第三个为可选参数，最小值/最大值等
            // 可定义多个校验规则，之间是且关系
            new Rule('isInt', '需要是正整数', {min:1})
        ]
    }
}

class RegisterValidator extends LinValidator{
    constructor(){
        super()
        this.email = [
            // 邮箱规范
            new Rule('isEmail', '不符合Email规范')
        ]
        this.password1 = [
            // 密码长度规范
            new Rule('isLength', '密码至少6个字符，最多32个字符', {
                min: 6,
                max: 32
            }),
            // 密码复杂度规范
            new Rule('matches', '密码不符合复杂度规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]')
        ]
        this.password2 = this.password1
        this.nickname = [
            new Rule('isLength', '昵称不符合长度规范', {
                min: 4,
                max: 32
            })
        ]
    }

    validatePassword(vals){
        const psw1 = vals.body.password1
        const psw2 = vals.body.password2
        if(psw1 !== psw2){
            throw new Error('两个密码必须相同')
        }
    }

    async validateEmail(vals){
        const email = vals.body.email
        const user = await User.findOne({
            where: {
                // 属性为数据库字段名，值为要查询的值
                email: email
            }
        })
        if(user){
            throw new Error('email已存在')
        }
    }
}

// token验证器
class TokenValidator extends LinValidator{
    constructor(){
        super()
        // 账号的验证规则
        this.account = [
            new Rule('isLength', '不符合账号规则', {
                min: 4, 
                max: 32
            })
        ]
        // 密码的验证规则，可传/可不传，传则需要符合规则
        this.secret = [
            new Rule('isOptional'),
            new Rule('isLength', '至少6个字符', {
                min: 6,
                max: 128
            })
        ]
    }

    // 登录类型校验
    validateLoginType(vals){
        if(!vals.body.type){
            throw new Error('type是必须参数')
        }
        if(!LoginType.isThisType(vals.body.type)){
            throw new Error('type参数不合法')
        }
    }
}

// 非空验证器
class NotEmptyValidator extends LinValidator{
    constructor(){
        super()
        this.token = [
            new Rule('isLength', '不允许为空', { min: 1 })
        ]
    }
}

function checkType(vals) {
    let type = vals.body.type || vals.path.type
    if (!type) {
        throw new Error('type是必须参数')
    }
    type = parseInt(type)
    // LinValidator中parsed保存的是转型过后的相关变量
    // this.parsed.path.type = type
    if (!LoginType.isThisType(type)) {
        throw new Error('type参数不合法')
    }
}

// 点赞验证器，验证art_id与type
class LikeValidator extends PositiveIntegerValidator {
    constructor(){
        super()
        this.validateType = checkType
    }
}

class ClassicValidator extends LikeValidator {

}

module.exports = {
    PositiveIntegerValidator,
    RegisterValidator,
    TokenValidator,
    NotEmptyValidator,
    LikeValidator,
    ClassicValidator
}