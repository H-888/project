class Single {
    constructor() {
        this.ifLogin();
        this.list();
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
    // 渲染
    list() {
        let url = location.href;
        let arr = url.split('=');
        Ajax.ajaxPost('./php/single.php', { fn: 'select', id: arr[1] }).then(res => {
            if (!res) return;
            res = JSON.parse(res);
            let str = '';
            let flexslider = document.querySelector('.flexslider');
            let item_price = document.querySelector('.item_price');
            item_price.innerHTML = '$' + res[0].price;
            let addBtn = document.querySelector('.item_add');
            addBtn.setAttribute('gId',JSON.stringify(res));
            res.forEach(ele => {
                str = `<ul class="slides">
                               <li data-thumb="${ele.img}">
                                   <div class="thumb-image"> <img src="${ele.img}" data-imagezoom="true" class="img-responsive" alt=""/> </div>
                               </li>
                               <li data-thumb="images/s-2.jpg">
                                    <div class="thumb-image"> <img src="images/s-2.jpg" data-imagezoom="true" class="img-responsive" alt=""/> </div>
                               </li>
                               <li data-thumb="${ele.img}">
                                  <div class="thumb-image"> <img src="${ele.img}" data-imagezoom="true" class="img-responsive" alt=""/> </div>
                               </li> 
                       </ul>`;
            });
            flexslider.innerHTML = str;
            $('.flexslider').flexslider({
                animation: "slide",
                controlNav: "thumbnails"
            });
        })
    }
    static addCarts(){
        let addBtn = document.querySelector('.item_add');
       let gId = JSON.parse(addBtn.getAttribute('gId'));
        let user = localStorage.getItem('user');
        if(user){
            user = JSON.parse(user);
            Ajax.ajaxPost('./php/single.php', { fn: 'insert', email: user.email, gId:gId[0].productName, img: gId[0].img,price:gId[0].price}).then(res => {
                if(res == '加入购物车成功'){
                    alert('加入购物车成功');
                }else{
                    alert('加入购物车成功')
                }
            })
        }
      
    }
}
new Single;