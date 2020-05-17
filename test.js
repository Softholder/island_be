// 函数调用链中异步的异常处理一应要使用async / await和try / catch
function func1(){
    func2()
}

async function func2(){
    try {
        await func3()
    } catch (error) {
        console.log('error')
    }
}

function func3() {
    return new Promise((resolve, reject) => {
        setTimeout(function(){
            const r = Math.random()
            if(r<0.5){
                reject('error async')
            }
        })
    })
}

func1()
