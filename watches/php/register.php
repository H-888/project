<?php
include('./mysql.php');
$fn = $_POST['fn'];
$fn();

function insert(){
    $email = $_POST['email'];
    $password = $_POST['password'];
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $mobile = $_POST['mobile'];
    $sex = $_POST['sex'];
    $sql1 = "select * from watchesuser where email = '$email'";
    $res1 = sel($sql1);
    if($res1){
        die('账号已经注册');
    }
    $sql2 = "insert into watchesuser(email,password,firstName,lastName,mobile,sex) values ('$email','$password','$firstName','$lastName',$mobile,'$sex')";
    $res2 = query($sql2);
    if($res2 == 1){
        echo '添加成功';
    }else{
        echo '添加失败';
    }
}

?>