<?php

namespace App\Utils;

class Response extends BasicResponse
{
    public $data;

    public function __construct($success, $message, $data)
    {
        parent::__construct($success, $message);
        $this->data = $data;
    }
}
