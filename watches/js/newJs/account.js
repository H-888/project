class Account{
    constructor(){
        this.add();
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
                location.href = './index.html';
            }
        })
    }
}
new Account;