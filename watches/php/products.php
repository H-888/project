<?php
include('./mysql.php');
$fn = $_POST['fn'];
$fn();
function select(){
    $page = $_POST['page'];
    $length = $_POST['length'];
    $start = ($page -1 ) * $length;
    $sql1 = "select  count(id) cou from productlist";
    $cou = sel($sql1)[0]['cou'];
    $pCount = round($cou/$length);
    $sql = "select * from productlist order by id asc limit $start,$length";
    $res = sel($sql);
    if($res){
        echo json_encode([
            'data' => $res,
            'count' => $pCount
        ]);
    }else{
        echo '没有查到商品';
    }
}
?>