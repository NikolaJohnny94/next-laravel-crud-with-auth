<?php

namespace App\Utils;

class ErrorResponse extends BasicResponse
{
    public $error_message;

    public function __construct($success, $message, $error_message)
    {
        parent::__construct($success, $message);
        $this->error_message = $error_message;
    }
}
