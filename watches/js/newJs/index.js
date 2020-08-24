class Index{
    constructor(){
        this.ifLogin();
        this.add();
        // Index.addGoods(); 拿到页面上的数据生成json对象
    }
    // 绑定事件
    add(){
        let quitBtn = document.querySelector('#quitBtn');
        quitBtn.addEventListener('click',Index.quit);
    }
    ifLogin(){
        let user = localStorage.getItem('user');
        if(user){
            let topHeaderMain = document.querySelector('.top-header-main');
            let carts = topHeaderMain.children;
            carts[2].style.display = 'none';
        }else{
            let topHeaderMain = document.querySelector('.top-header-main');
            let carts = topHeaderMain.children;
            carts[1].style.display = 'none';
        }
    }
    // 退出
   static quit(){
            localStorage.removeItem('user');
            location.reload();
    }  
    // 页面拿到数据 
    static addGoods(){
        let img  =document.querySelectorAll('.product-main img');
        let goods =document.querySelectorAll('.product-bottom h3');
        let price = document.querySelectorAll('.product-bottom span'); 
        // console.log(img,goods,price);
        let json= {}
        for(var i = 0; i<img.length; i++){
            json[goods[i].innerHTML] = [img[i].src,price[i].innerHTML];
        }
        console.log(json);
    }

}
new Index;