<?php

namespace App\Repositories;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;


class AuthRepository
{
    protected $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }
    public function registerNewUser(array $fields)
    {
        return User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => Hash::make($fields['password']),
        ]);
    }
    public function loginUser(array $fields)
    {
        return User::where('email', $fields['email'])->first();
    }
    public function logoutUser()
    {
        $this->request->user()->tokens()->delete();
    }
}
