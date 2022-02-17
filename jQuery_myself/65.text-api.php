<?php

$obj['username']=$_POST['username'];
$obj['email']=$_POST['email'];

echo json_encode($obj);