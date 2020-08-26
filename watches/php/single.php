<?php
include('./mysql.php');
$fn = $_POST['fn'];
$fn();
function select(){
    $id = $_POST['id'];
    $sql = "select * from productlist where id = '$id'";
    $res = sel($sql);
    if($res){
        echo json_encode($res);
    }else{
        echo '没有查到商品';
    }
}

function insert(){
    $email = $_POST['email'];
    $gId = $_POST['gId'];
    $price = $_POST['price'];
    $img = $_POST['img'];
    $sql = "insert into cartlist(email,productName,img,price,num) values('$email','$gId','$img','$price',1) on duplicate key update num=num + 1;";
    $res = query($sql);
    if($res){
        echo '加入购物车成功';
    }else{
        echo '加入购物车失败';  
    }
}


?>