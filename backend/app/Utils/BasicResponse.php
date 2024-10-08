<?php

namespace App\Utils;

class BasicResponse
{
    public $success;
    public $message;


    public function __construct($success, $message)
    {
        $this->success = $success;
        $this->message = $message;
    }
}
