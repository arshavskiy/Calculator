<?php 

include 'Log.php';
include 'Operation.php';

$num1 = filter_var($_POST['num1'], FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
$num2 = filter_var($_POST['num2'], FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
$math_operation = $_POST['math_operation'];
$result = filter_var($_POST['result'], FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);

$operation = new Operation($num1, $num2, $math_operation, $result);
$operation->save();
Log::printMsg($num1 . ' '.  $math_operation . ' '. $num2 .' transmision OK');


