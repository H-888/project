class Checkout {
    constructor() {
        this.ifLogin();
        this.list();
        this.add();

    }
    ifLogin() {
        let user = localStorage.getItem('user');
        if (user) {
            let topHeaderMain = document.querySelector('.top-header-main');
            let carts = topHeaderMain.children;
            carts[2].style.display = 'none';
        } else {
            let topHeaderMain = document.querySelector('.top-header-main');
            let carts = topHeaderMain.children;
            carts[1].style.display = 'none';
        }
    }
    // 绑定事件
    add() {
        let quitBtn = document.querySelector('#quitBtn');
        quitBtn.addEventListener('click', Checkout.quit);
    }
    // 退出
    static quit() {
        localStorage.removeItem('user');
        location.reload();
    }
    // 初始化数据渲染
    list() {
        let user = localStorage.getItem('user');
        let inCheck = document.querySelector('.in-check');
        let str = "";
        if (user) {
            user = JSON.parse(user);
            Ajax.ajaxPost('./php/checkout.php', { fn: 'select', email: user.email }).then(res => {
                res = JSON.parse(res);
                res.forEach(ele => {
                    str += `<ul class="cart-header">
                    <div class="close1" onclick="Checkout.delete(this)"></div>
                        <li style="display:none;">${ele.id}</li>
                        <li class="ring-in"><a href="single.html" ><img src="${ele.img}" class="img-responsive" alt=""></a>
						</li>
						<li><span class="name">${ele.productName}</span></li>
						<li><span class="cost">${ele.price}.00</span></li>
                        <li>
                            <span>数量</span>
                            <h3 onclick="Checkout.update(this)" style="cursor:pointer">+</h3>
                            <p>${ele.num}</p>
                            <h3 onclick="Checkout.update(this)" style="cursor:pointer">-</h3>
                        </li>
					<div class="clearfix"></div>
                            </ul>`
                })
                inCheck.innerHTML = str;
            })
        } else {

            let carts = JSON.parse(localStorage.getItem('carts'));
            for (let i in carts) {
                str += `<ul class="cart-header">
                    <div class="close1" > </div>
                        <li class="ring-in"><a href="single.html" ><img src="${carts[i].img}" class="img-responsive" alt=""></a>
						</li>
						<li><span class="name">${i}</span></li>
						<li><span class="cost">${carts[i].price}.00</span></li>
                        <li><span>数量</span>
                        <h3 onclick="Checkout.update(this)" style="cursor:pointer">+</h3>
                        <p id= "num">${carts[i].num}</p>
                        <h3 onclick="Checkout.update(this)" style="cursor:pointer">-</h3>
                        </li>
					    <div class="clearfix"> </div>
                            </ul>`
            }
            inCheck.innerHTML = str;
        }
        Checkout.count();
    }
    // 删除
    static delete(ele) {
        ele.parentNode.remove();
        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let cartsGoods = ele.parentNode.children[1].innerHTML;
            Ajax.ajaxPost('./php/checkout.php', { fn: 'delete', email: user.email, cartsGoods: cartsGoods }).then(res => {
                console.log(res);
            })

        } else {
            let carts = JSON.parse(localStorage.getItem('carts'));
            let cartsGoods = ele.parentNode.children[2].firstElementChild;
            delete carts[cartsGoods];
            localStorage.setItem('carts', JSON.stringify(carts));
        }
        Checkout.count();
    }
    // 修改
    static update(ele) {
        let user = localStorage.getItem('user');
        let num;
        // 修改页面数字
        let goodsId = ele.parentNode.parentNode.children[2].firstElementChild.innerHTML;
        if (ele.innerHTML == '+') {
            ele.nextElementSibling.innerHTML = ele.nextElementSibling.innerHTML - 0 + 1;
            num = ele.nextElementSibling.innerHTML;
        } else {
            if (ele.previousElementSibling.innerHTML == '1') return;
            ele.previousElementSibling.innerHTML = ele.previousElementSibling.innerHTML - 1;
            num = ele.previousElementSibling.innerHTML;
        };
        // 修改数据库或localStorage
        if (user) {
            user = JSON.parse(user);
            Ajax.ajaxPost('./php/checkout.php', { fn: 'update', email: user.email, num: num, goodsId: goodsId }).then(res => {
                console.log(res);
            })
        } else {
            let carts = JSON.parse(localStorage.getItem('carts'));
            carts[goodsId].num = num;
            localStorage.setItem('carts', JSON.stringify(carts));
        }
        Checkout.count();
    }
    // 小计 总数
   static count(){
    //    let cartHeader = document.querySelectorAll('.cart-header');
       let numObj = document.querySelectorAll('#num');
       let costObj = document.querySelectorAll('.cost');
       let sum = 0;
       let total = 1;
       for(let i = 0;i<numObj.length; i++){
        sum = numObj[i].innerHTML - 0 + sum;
        total = total + parseFloat(costObj[i].innerHTML * (numObj[i].innerHTML * 100)/100);
        }
        // console.log(sum,total);
        document.querySelector('#sum').innerHTML ='数量:'+ sum +'&nbsp';
        document.querySelector('#total').innerHTML= '小计:'+total;
   }
}
new Checkout;