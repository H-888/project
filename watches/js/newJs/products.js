class Products {
    constructor() {
        this.ifLogin();
        Products.list();
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
    static list(ele) {
        let page = 1;
        if (ele) {
            page = ele.innerHTML;
        }
        Ajax.ajaxPost('./php/products.php', { fn: 'select', page: page, length: 1 }).then(res => {
            if (!res) return;
            let { data, count } = JSON.parse(res);
            let obj = document.querySelector('.product-one');
            let str = '';
            console.log(data);
            data.forEach(ele => {
                str += `<div class="col-md-4 product-left">
                    <li style="display:none">${ele.id}</li>
                    <div class="product-main simpleCart_shelfItem">
                        <a onclick="Products.load(this)" href="javascript:" class="mask"><img class="img-responsive zoom-img" src="${ele.img}" alt="" /></a>
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
            obj.innerHTML = str;
            let nav = '';
            let pagination = document.querySelector('.pagination');
            for (let i = 1; i <= count; i++) {
                nav += `<li><a href="javascript:" onclick="Products.list(this)">${i}</a></li>`
            }
            pagination.innerHTML = nav;
        })
    }
    // 跳转详情页
    static load(ele) {
        let id = ele.parentNode.parentNode.firstElementChild.innerHTML;
        location.href = `http://localhost/project2/watches/single.html?id=${id}`;
    }
}
new Products;