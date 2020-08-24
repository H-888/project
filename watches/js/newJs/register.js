import Ajax from './ajax.js';
class Register {
    constructor() {
        this.add();
    }
    // 给注册按钮绑定事件
    add() {
        let signBtn = document.querySelector('#signBtn');
        signBtn.addEventListener('click', Register.sign)
    }
    static sign() {
        let firstName = document.querySelector('#firstName');
        let lastName = document.querySelector('#lastName');
        let email = document.querySelector('#Email');
        let Mobile = document.querySelector('#Mobile');
        let Password = document.querySelector('#Password');
        let Retype = document.querySelector('#Retype');
        let Male = document.querySelector('#Male');
        let Female = document.querySelector('#Female');
        let sex = '';
        // console.log(firstName,lastName,email,Mobile,Password,Retype,Male,Female );
        if(Password.value != Retype.value){
            console.log("两次密码输入不一致");
            return;
        }
        if(Male.checked){
            sex = '男';
        }else if(Female.checked){
            sex = '女';
        }else{
            console.log('请选择性别');
            return;
        }
        Ajax.ajaxPost('./php/register.php',{fn:'insert',email:email.value,password:Password.value,firstName:firstName.value,lastName:lastName.value,
            mobile:Mobile.value,sex:sex}).then(res=>{
            console.log(res);
            if(res === '添加成功'){
                alert('注册成功');
                location.href = './account.html';
            }
        })
    }
}
new Register;