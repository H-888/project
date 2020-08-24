<?php
    function connect(){
        $link = mysqli_connect('127.0.0.1','root','root','big_tiger');
        if(!$link)die('连接失败');
        return $link;
    }
    // 查询
    function sel($sql){
        $link = connect();
        $res = mysqli_query($link,$sql);
        //遍历结果
        $arr =[];
        while($str = mysqli_fetch_assoc($res)){
            $arr[] = $str;
        }
        return $arr;
    }

    // 非查询
    function query($sql){
        $link = connect();
        $res = mysqli_query($link,$sql);
        if($res){
            return 1;
        }else{
            return 2;
        }
    }

?>