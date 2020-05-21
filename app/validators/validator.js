const { LinValidator, Rule } = require('../../core/lin-validator')

class PositiveIntegerValidator extends LinValidator{
    constructor(){
        super()
        // 类的属性名需要保持与校验对象的属性名一致
        this.id = [
            // 第一个参数为检验规则，第二个为校验不通过的提示信息，第三个为可选参数，最小值/最大值等
            // 可定义多个校验规则，之间是且关系
            new Rule('isInt', '需要是正整数', {min:1})
        ]
    }
}

module.exports = {
    PositiveIntegerValidator
}