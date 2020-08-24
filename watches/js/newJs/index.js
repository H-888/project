import Ajax from './ajax.js';
class Index{
    constructor(){
        this.ifLogin();
        this.add();
        // Index.addGoods(); //拿到页面上的数据生成json对象
    }
    // 绑定事件
    add(){
        let quitBtn = document.querySelector('#quitBtn');
        quitBtn.addEventListener('click',Index.quit);
        let item_add = document.querySelectorAll('.item_add');
        for(let i = 0; i<item_add.length; i++){
            item_add[i].addEventListener('click',function(){
                Index.addCart(this);
            });
        }
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
        json = JSON.stringify(json);
        // console.log(json);
    }
   static addCart(ele){
        let img = ele.parentNode.parentNode.previousElementSibling.firstElementChild;
        let productName = ele.parentNode.parentNode.firstElementChild;
        let price = ele.nextElementSibling;
        let user = localStorage.getItem('user');
        if(user){
            user = JSON.parse(user);
            Ajax.ajaxPost('./php/index.php',{fn:'insert',email:user.email,img:img.src,productName:productName.innerHTML,price:price.innerHTML}).then(res=>{
                if(res == '添加成功'){
                    alert('添加成功');
                }
            })
        }else{
            let carts = localStorage.getItem('carts');
            if(carts){
                carts = JSON.parse(carts);
                for(let attr in carts){
                    if(carts[attr] == productName.innerHTML){
                        
                    }else{
                    
                    }
                }
                
            }else{
                let carts = {productName:productName.innerHTML,price:price.innerHTML,img:img.src,num:1};
                localStorage.setItem('carts',JSON.stringify(carts));
            }


           
        }
       
    }

}
new Index;