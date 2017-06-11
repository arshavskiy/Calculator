<?php 

/**
* 
*/
class Operation {
	public $num1;
	public $num2;
	public $math_operation;
	public $result;
	public $added;

	function __construct ($num1, $num2, $math_operation, $result, $added = null) {
		$this->num1 = $num1;
		$this->num2 = $num2;
		$this->math_operation = $math_operation;
		$this->result = $result;
		$this->added = $added;
	}

	public function save () {
		$connection = new mysqli('localhost', 'root', '', 'calc');
		if ($connection->errno) {
			Log::printMsg($connection->error);
		}

		$stmt = $connection->prepare("INSERT INTO operation_log (num1, num2, math_operation, result, added) VALUES (?, ?, ?, ?, NOW())");
		if (!$stmt) {
			Log::printMsg($stmt->error);
			die();
		}
		$stmt->bind_param('ddsd', $this->num1, $this->num2, $this->math_operation, $this->result);

		$stmt->execute();
		$connection->close();
	}
}