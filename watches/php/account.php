<?php
include('./mysql.php');

$fn = $_POST['fn'];
$fn();
function select(){
 $email = $_POST['email'];
 $sql = "select * from watchesuser where email = '$email'";
 $res = sel($sql);
if($res){
    echo json_encode($res);
}else{
    echo '账号不存在';
}
 
}

?>