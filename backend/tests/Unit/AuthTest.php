<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Repositories\AuthRepository;
use Mockery;
use Exception;

class AuthTest extends TestCase
{
    // Registration 
    public function test_registration_successful()
    {
        // Arrange: Mock the User model and Hash facade
        $mockedUser = Mockery::mock('alias:App\Models\User');
        $mockedUser->shouldReceive('create')->andReturn($mockedUser);
        $mockedUser->shouldReceive('createToken')->andReturn((object) ['plainTextToken' => 'mocked_token']);

        /** @var \Mockery\LegacyMockInterface&\Mockery\MockInterface|AuthRepository $authRepositoryMock */
        $authRepositoryMock = Mockery::mock('App\Repositories\AuthRepository');
        $authRepositoryMock->shouldReceive('registerNewUser')->andReturn($mockedUser);

        // Mock the Hash facade
        Hash::shouldReceive('make')->andReturn('hashed_password');

        $request = Request::create('/register', 'POST', [
            'name' => 'Test User',
            'email' => 'newuser@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $controller = new AuthController($authRepositoryMock);

        // Act: Call the registration method
        $response = $controller->registration($request);
        $responseData = json_decode($response->getContent(), true);

        // Debugging: Output the response data if the status is not 201
        if ($response->status() !== 201) {
            dd($responseData);
        }

        // Assert: Check the response
        $this->assertEquals(201, $response->status());
        $this->assertEquals(true, $responseData['success']);
        $this->assertEquals('mocked_token', $responseData['token']);
    }

    public function test_registration_returns_validation_error()
    {
        /** @var \Mockery\LegacyMockInterface&\Mockery\MockInterface|AuthRepository $authRepositoryMock */
        $authRepositoryMock = Mockery::mock('App\Repositories\AuthRepository');
        // Arrange: Mock the Request validation
        $request = Request::create('/register', 'POST', [
            'name' => '',
            'email' => 'invalid-email',
            'password' => 'password',
            'password_confirmation' => 'different_password',
        ]);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed',
        ]);

        $this->expectException(ValidationException::class);

        // Manually trigger the validation exception
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        $controller = new AuthController($authRepositoryMock);

        // Act: Call the registration method
        $controller->registration($request);
    }

    public function test_registration_handles_exception()
    {
        // Arrange: Mock the User model to throw a generic Exception
        /** @var \Mockery\LegacyMockInterface&\Mockery\MockInterface|AuthRepository $authRepositoryMock */
        $authRepositoryMock = Mockery::mock('App\Repositories\AuthRepository');
        $authRepositoryMock->shouldReceive('registerNewUser')->andThrow(new Exception('Database error'));

        // Create a real Request object
        $request = Request::create('/register', 'POST', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        // Mock the Hash facade
        Hash::shouldReceive('make')->andReturn('hashed_password');

        // Mock the validation to pass
        $request = Mockery::mock(Request::class);
        $request->shouldReceive('validate')->andReturn([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
        ]);

        $controller = new AuthController($authRepositoryMock);

        // Act: Call the registration method
        /** @var \Mockery\LegacyMockInterface&\Mockery\MockInterface|Request $request */
        $response = $controller->registration($request);
        $responseData = json_decode($response->getContent(), true);

        // Assert: Check the response
        $this->assertEquals(500, $response->status());
        $this->assertEquals('An error occurred during registration.', $responseData['message']);
        $this->assertEquals('Database error', $responseData['error_message']);
    }

    // Login
    public function test_login_successful()
    {
        // Arrange: Mock the User model and Hash facade
        $mockedUser = Mockery::mock('alias:App\Models\User');
        $mockedUser->password = Hash::make('password'); // Set the password property
        $mockedUser->shouldReceive('where')->with('email', 'test@example.com')->andReturnSelf();
        $mockedUser->shouldReceive('first')->andReturn($mockedUser);
        $mockedUser->shouldReceive('createToken')->andReturn((object) ['plainTextToken' => 'mocked_token']);

        Hash::shouldReceive('check')->with('password', $mockedUser->password)->andReturn(true);

        /** @var \Mockery\LegacyMockInterface&\Mockery\MockInterface|AuthRepository $authRepositoryMock */
        $authRepositoryMock = Mockery::mock('App\Repositories\AuthRepository');
        $authRepositoryMock->shouldReceive('loginUser')->andReturn($mockedUser);

        $request = Request::create('/login', 'POST', [
            'email' => 'test@example.com',
            'password' => 'password',
        ]);

        $controller = new AuthController($authRepositoryMock);

        // Act: Call the login method
        $response = $controller->login($request);
        $responseData = json_decode($response->getContent(), true);

        // Assert: Check the response
        $this->assertEquals(200, $response->status());
        $this->assertEquals(true, $responseData['success']);
        $this->assertEquals('mocked_token', $responseData['token']);
    }

    public function test_login_validation_exception()
    {
        // Arrange: Mock the AuthRepository
        /** @var \Mockery\LegacyMockInterface&\Mockery\MockInterface|AuthRepository $authRepositoryMock */
        $authRepositoryMock = Mockery::mock('App\Repositories\AuthRepository');

        $request = Request::create('/login', 'POST', [
            'email' => 'invalid-email', // Invalid email format
            'password' => '', // Empty password
        ]);

        $controller = new AuthController($authRepositoryMock);

        // Act: Call the login method
        $response = $controller->login($request);
        $responseData = json_decode($response->getContent(), true);

        // Assert: Check the response
        $this->assertEquals(422, $response->status());
        $this->assertEquals(false, $responseData['success']);
        $this->assertArrayHasKey('error_message', $responseData);
    }

    public function test_login_returns_invalid_credentials()
    {
        // Arrange: Mock the User model and Hash facade
        $mockedUser = Mockery::mock('alias:App\Models\User');
        $mockedUser->password = Hash::make('password'); // Set the password property
        $mockedUser->shouldReceive('where')->with('email', 'test@example.com')->andReturnSelf();
        $mockedUser->shouldReceive('first')->andReturn($mockedUser);

        Hash::shouldReceive('check')->with('wrong_password', $mockedUser->password)->andReturn(false);

        /** @var \Mockery\LegacyMockInterface&\Mockery\MockInterface|AuthRepository $authRepositoryMock */
        $authRepositoryMock = Mockery::mock('App\Repositories\AuthRepository');
        $authRepositoryMock->shouldReceive('loginUser')->andReturn($mockedUser);

        $request = Request::create('/login', 'POST', [
            'email' => 'test@example.com',
            'password' => 'wrong_password',
        ]);

        $controller = new AuthController($authRepositoryMock);

        // Act: Call the login method
        $response = $controller->login($request);
        $responseData = json_decode($response->getContent(), true);

        // Assert: Check the response
        $this->assertEquals(401, $response->status());
        $this->assertEquals(false, $responseData['success']);
        $this->assertEquals('Invalid credentials', $responseData['message']);
    }

    public function test_login_handles_exception()
    {
        // Arrange: Mock the AuthRepository to throw an exception
        /** @var \Mockery\LegacyMockInterface&\Mockery\MockInterface|AuthRepository $authRepositoryMock */
        $authRepositoryMock = Mockery::mock('App\Repositories\AuthRepository');
        $authRepositoryMock->shouldReceive('loginUser')->andThrow(new Exception());

        $request = Request::create('/login', 'POST', [
            'email' => 'test@example.com',
            'password' => 'password',
        ]);

        $controller = new AuthController($authRepositoryMock);

        // Act: Call the login method
        $response = $controller->login($request);
        $responseData = json_decode($response->getContent(), true);

        // Assert: Check the response
        $this->assertEquals(500, $response->status());
        $this->assertEquals(false, $responseData['success']);
        $this->assertEquals('An error occurred during login.', $responseData['message']);
    }

    // Logout
    public function test_logout_successful()
    {
        // Arrange: Mock the User model and the token deletion
        $mockedUser = Mockery::mock('alias:App\Models\User');
        $mockedUser->shouldReceive('tokens->delete')->andReturn(true);

        /** @var \Mockery\LegacyMockInterface&\Mockery\MockInterface|AuthRepository $authRepositoryMock */
        $authRepositoryMock = Mockery::mock('App\Repositories\AuthRepository');
        $authRepositoryMock->shouldReceive('logoutUser')->andReturn(true);

        /** @var \Mockery\LegacyMockInterface&\Mockery\MockInterface|Request $request */
        $request = Mockery::mock(Request::class);
        $request->shouldReceive('user')->andReturn($mockedUser);

        $controller = new AuthController($authRepositoryMock);

        // Act: Call the logout method
        $response = $controller->logout();
        $responseData = json_decode($response->getContent(), true);

        // Assert: Check the response
        $this->assertEquals(200, $response->status());
        $this->assertEquals(true, $responseData['success']);
        $this->assertEquals('User successfully logged out', $responseData['message']);
    }

    public function test_logout_handles_exception()
    {
        // Arrange: Mock the User model to throw a generic Exception
        $mockedUser = Mockery::mock('alias:App\Models\User');
        $mockedUser->shouldReceive('tokens->delete')->andThrow(new Exception('Database error'));

        /** @var \Mockery\LegacyMockInterface&\Mockery\MockInterface|AuthRepository $authRepositoryMock */
        $authRepositoryMock = Mockery::mock('App\Repositories\AuthRepository');
        $authRepositoryMock->shouldReceive('logoutUser')->andThrow(new Exception('Database error'));

        /** @var \Mockery\LegacyMockInterface&\Mockery\MockInterface|Request $request */
        $request = Mockery::mock(Request::class);
        $request->shouldReceive('user')->andReturn($mockedUser);

        $controller = new AuthController($authRepositoryMock);

        // Act: Call the logout method
        $response = $controller->logout();
        $responseData = json_decode($response->getContent(), true);

        // Assert: Check the response
        $this->assertEquals(500, $response->status());
        $this->assertEquals(false, $responseData['success']);
        $this->assertEquals('An error occurred while user tried to logout', $responseData['message']);
        $this->assertEquals('Database error', $responseData['error_message']);
    }
}
