class Nav {
    constructor() {
        this.layuiNav();
        this.menu();
        this.layuiCarousel();

    }
    layuiNav() {
        // 设定layui-this来指向当前页面分类。
        //注意：导航 依赖 element 模块，否则无法进行功能性操作
        layui.use('element', function () {
            var element = layui.element;
        });
    }
    //轮播
    layuiCarousel(){
        layui.use('carousel', function(){
            var carousel = layui.carousel;
            //建造实例
            carousel.render({
              elem: '#test1'
              ,width: '40%' //设置容器宽度
              ,arrow: 'always' //始终显示箭头
              //,anim: 'updown' //切换动画方式
            });
          });
    }
        
    menu() {
        let navCe = document.querySelector('.nav-ce');
        navCe.addEventListener('mouseover', (e) => {
            var e = e || window.event;
            var target = target || e.srcElement;
            if (target.className == 'oneNav-li') {
                Ajax.ajaxGet('./json/nav.json').then(res => {
                    res = JSON.parse(res);
                    var twoNav = document.querySelector('.twoNav');
                    for (var attr in res) {
                        if (attr == target.innerHTML) {
                            for (var i in res[attr]) {
                                let li = document.createElement('li');
                                let div1 = document.createElement('div');
                                let div2 = document.createElement('div');
                                div1.innerHTML = `<a href="">${i}</a>`;
                                for (var j = 0; j < res[attr][i].length; j++) {
                                    div2.innerHTML += ` <span><a href="">${res[attr][i][j]}</a></span>`;
                                }
                                li.appendChild(div1);
                                li.appendChild(div2);
                                twoNav.appendChild(li);
                            document.querySelector('.carousel').style.display = 'none';
                            }
                        }
                    }
                    
                    twoNav.style.display = 'block';

                })
            }
        })
        navCe.addEventListener('mouseout', (e) => {
            var e = e || window.event;
            var target = target || e.srcElement;
            if (target.className == 'oneNav-li') {
                var twoNav = document.querySelector('.twoNav');
                var lis = twoNav.querySelectorAll('li');
                for (var i = 0; i < lis.length; i++) {
                    lis[i].remove();
                }
                twoNav.style.display = 'none';
            }
            document.querySelector('.carousel').style.display = 'block';
        })
    }

}
new Nav;

