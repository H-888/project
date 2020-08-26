class Index {
    constructor() {
        this.str = ''; 
        this.height = 1500;
        this.list(this);
        this.ifLogin();
        this.add();
        // Index.addGoods(); //拿到页面上的数据生成json对象
    }
    // 绑定事件
    add() {
        
        window.addEventListener('scroll',()=>{
            let scrollTop = document.documentElement.scrollTop;
            console.log(this.height);
            if(scrollTop > this.height){
               Index.scroll(this);
               this.height += 500;
            }
        })

        
        let quitBtn = document.querySelector('#quitBtn');
        quitBtn.addEventListener('click', Index.quit);
        let item_add = document.querySelectorAll('.item_add');
        for (let i = 0; i < item_add.length; i++) {
            item_add[i].addEventListener('click', function () {
                Index.addCart(this);
            });
        }
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
    // 渲染页面
    list(that){
        Ajax.ajaxPost('./php/index.php',{fn:'select'}).then(res=>{
            if(!res) return;
            let obj = document.querySelector('.product-one');
            res = JSON.parse(res);
            res.forEach(ele => {
                that.str += `<div class="col-md-3 product-left">
                    <li style="display:none">${ele.id}</li>
                    <div class="product-main simpleCart_shelfItem">
                        <a href="single.html" class="mask"><img class="img-responsive zoom-img" src="${ele.img}" alt="" /></a>
                        <div class="product-bottom">
                            <h3>${ele.productName}</h3>
                            <p>Explore Now</p>
                            <h4><a class="item_add" href="javascript:"><i></i></a> <span class=" item_price">$${ele.price}</span></h4>
                        </div>
                        <div class="srch">
                            <span>-50%</span>
                        </div>
                    </div>
                </div>`
            });
            obj.innerHTML = that.str;
        })
    }
    // 页面拿到数据 
    static addGoods() {
        let img = document.querySelectorAll('.product-main img');
        let goods = document.querySelectorAll('.product-bottom h3');
        let price = document.querySelectorAll('.product-bottom span');
        let json = {}
        for (var i = 0; i < img.length; i++) {
            json[goods[i].innerHTML] = [img[i].src, price[i].innerHTML];
        }
        json = JSON.stringify(json);
    }
    // 加入购物车
    static addCart(ele) {
        let img = ele.parentNode.parentNode.previousElementSibling.firstElementChild;
        let productName = ele.parentNode.parentNode.firstElementChild;
        let price = ele.nextElementSibling;
        let user = localStorage.getItem('user');
        let priceNum = price.innerHTML.slice(2);
        let num = 1;
        if (user) {
            user = JSON.parse(user);
            Ajax.ajaxPost('./php/index.php', { fn: 'insert', email: user.email, img: img.src, productName: productName.innerHTML, price: priceNum }).then(res => {
                if (res == '添加成功') {
                    alert('添加成功');
                }
            })
        } else {
            let carts = localStorage.getItem('carts');
            if (carts) {
                carts = JSON.parse(carts);
                for (let attr in carts) {
                    if (attr == productName.innerHTML) {
                        num = carts[attr].num - 0 + num;
                    }
                }
                carts[productName.innerHTML] = { img: img.src, price: priceNum, num: num }
                localStorage.setItem('carts', JSON.stringify(carts));
            } else {
                let carts = {};
                carts[productName.innerHTML] = { img: img.src, price: priceNum, num: num };
                localStorage.setItem('carts', JSON.stringify(carts));
            }
        }

    }
    static scroll(ele){
       ele.list(ele);
    }

}
new Index;