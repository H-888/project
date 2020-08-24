<?php
include('./mysql.php');
$fn = $_POST['fn'];
$fn();
function insert(){
    $img = $_POST['img'];
    $productName = $_POST['productName'];
    $price = $_POST['price'];
    $email = $_POST['email'];
    $sql = "insert into cartlist(email,productName,img,price,num) values('$email','$productName','$img','$price',1) on duplicate key update num=num + 1;";
    $res = query($sql);
    if($res){
        echo '添加成功';
    }else{
        echo '添加失败';
    }
}

?>