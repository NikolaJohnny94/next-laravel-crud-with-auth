<?php

namespace App\Utils;

use App\Utils\Response;

class AuthResponse extends Response
{
    public $token;

    public function __construct($success, $message, $data, $token)
    {
        parent::__construct($success, $message, $data);
        $this->token = $token;
    }
}
