class Account{
    constructor(){
        this.add();
        this.ifLogin();
       
    }
    // 判断是否是登录状态
    ifLogin() {
        let user = localStorage.getItem('user');
        if (user) {
            let topHeaderMain = document.querySelector('.top-header-main');
            let carts = topHeaderMain.children;
            carts[2].style.display = 'none';
        } else {
            let quitBtn = document.querySelector('#quitBtn');
            let simpleCart_total = document.querySelector('.simpleCart_total');
            simpleCart_total.style.display = 'none';
            quitBtn.style.display = 'none';
           
        }
    }
    // 退出
    static quit() {
        localStorage.removeItem('user');
        location.reload();
    }
    // 给登录按钮绑定事件
    add(){
    let loginBtn = document.querySelector('#loginBtn');
    loginBtn.addEventListener('click',Account.login)
    }
   static login(){
        let email = document.querySelector('#email');
        let password = document.querySelector('#password');
        
        Ajax.ajaxPost('./php/account.php',{fn:'select',email:email.value}).then(res=>{
            if(res ==  '账号不存在'){
                email.value = '';
                password.value = '';
                alert(res);
                return;
            }
            res = JSON.parse(res);
            if(password.value == res[0].password){
                alert('登录成功')
                let user = localStorage.getItem('user');
                user = res[0];
                localStorage.setItem('user',JSON.stringify(user));
                window.history.go(-1);
            }
        })
    }
}
new Account;