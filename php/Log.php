<?php 

/**
* 
*/
class Log {
	public $msg = '';
	public $log_file = 'error.log';

	function __construct($msg) {
		$this->msg = $msg;
	}
	public static function printMsg($msg) {
		# Development
		echo $msg;

		# Production mode
		// file_put_contents($this->log_file, $this->msg . "\n", FILE_APPEND);
	}
}