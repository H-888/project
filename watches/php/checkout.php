<?php
include('./mysql.php');
$fn = $_POST['fn'];
$fn();
function select(){
    $email = $_POST['email'];
    $sql = "select * from cartlist where email = '$email'";
    $res = sel($sql);
    if($res){
        echo json_encode($res);
    }else{
        echo '查询失败';
    }
}

function delete(){
    $email = $_POST['email'];
    $cartsGoods = $_POST['cartsGoods'];
    $sql = "delete from cartlist where email = '$email' and id = '$cartsGoods'";
    $res = query($sql);
    if($res){
        echo '删除成功';
    }else{
        echo '删除失败';
    }
}
function update(){
    $email = $_POST['email'];
    $num = $_POST['num'];
    $goodsId = $_POST['goodsId'];
    $sql = "update cartlist set num ='$num' where email = '$email' and productName = '$goodsId'";
    $res = query($sql);
    if($res){
        echo '修改成功';
    }else{
        echo '修改失败';
    }
}

?>