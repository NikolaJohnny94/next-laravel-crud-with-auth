<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Repositories\AuthRepository;
use App\Utils\AuthResponse;
use App\Utils\BasicResponse;
use App\Utils\ErrorResponse;


class AuthController extends Controller
{
    protected $authRepository;

    public function __construct(AuthRepository $authRepository)
    {
        $this->authRepository = $authRepository;
    }
    /**
     * @OA\Post(
     *     path="/api/registration",
     *     tags={"Auth"},
     *     summary="Register a new user",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string", description="Name of the user", example="New user name"),
     *             @OA\Property(property="email", type="string", description="Email address of the user", example="new_user@example.com"),
     *             @OA\Property(property="password", type="string", description="Password of the user", example="Test123.", writeOnly=true),
     *             @OA\Property(property="password_confirmation", type="string", description="Password confirmation", example="Test123.", writeOnly=true)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="New user successfully registered",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="User successfully registered!"),
     *             @OA\Property(
     *                 property="data",
     *                 type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="name", type="string", example="New user name"),
     *                 @OA\Property(property="email", type="string", example="new_user@example.com"),
     *                 @OA\Property(property="created_at", type="string", format="date-time", example="2023-09-29 18:10:30"),
     *                 @OA\Property(property="updated_at", type="string", format="date-time", example="2024-05-29 14:28:43")
     *             ),
     *             @OA\Property(property="token", type="string", example="token")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthenticated",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Unauthenticated.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation failed while user tried to register",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Validation failed while user tried to register"),
     *             @OA\Property(property="error_message", type="string", example="Validation error details")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="An error occurred during registration",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="An error occurred during registration."),
     *             @OA\Property(property="error_message", type="string", example="Unexpected error details.")
     *         )
     *     )
     * )
     */
    public function registration(Request $request)
    {
        try {
            $fields = $request->validate([
                'name' => 'required|string',
                'email' => 'required|string|email|unique:users,email',
                'password' => 'required|string|confirmed'
            ]);

            $new_user = $this->authRepository->registerNewUser($fields);

            $token = $new_user->createToken('token')->plainTextToken;

            return response()->json(new AuthResponse(true, 'User successfully registered!', $new_user, $token), 201);
        } catch (ValidationException $e) {
            return response()->json(new ErrorResponse(false, 'Validation failed while user tried to register', $e->errors()), 422);
        } catch (Exception $e) {
            return response()->json(new ErrorResponse(false, 'An error occurred during registration.', $e->getMessage()), 500);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/login",
     *     tags={"Auth"},
     *     summary="Login a user",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="email", type="string", description="Email address of the user", example="test@example.com"),
     *             @OA\Property(property="password", type="string", description="Password of the user", example="Test123.", writeOnly=true)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="User successfully logged in",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="User successfully logged in"),
     *             @OA\Property(
     *                 property="data",
     *                 type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="name", type="string", example="User name"),
     *                 @OA\Property(property="email", type="string", example="test@example.com"),
     *                 @OA\Property(property="created_at", type="string", format="date-time", example="2023-09-29 18:10:30"),
     *                 @OA\Property(property="updated_at", type="string", format="date-time", example="2024-05-29 14:28:43")
     *             ),
     *             @OA\Property(property="token", type="string", example="token")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Invalid credentials",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Invalid credentials")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation failed while user tried to login",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Validation failed while user tried to login"),
     *             @OA\Property(property="error_message", type="string", example="Validation error details")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="An error occurred during login",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="An error occurred during login."),
     *             @OA\Property(property="error_message", type="string", example="Unexpected error details.")
     *         )
     *     )
     * )
     */
    public function login(Request $request)
    {
        try {
            $fields = $request->validate([
                'email' => 'required|string',
                'password' => 'required|string'
            ]);

            $user = $this->authRepository->loginUser($fields);

            if (!$user || !Hash::check($fields['password'], $user->password)) return response(['success' => false, 'message' => 'Invalid credentials'], 401);

            $token = $user->createToken('token')->plainTextToken;

            return response()->json(new AuthResponse(true, 'User successfully logged in', $user, $token), 200);
        } catch (ValidationException $e) {
            return response()->json(new ErrorResponse(false, 'Validation failed while user tried to login', $e->errors()), 422);
        } catch (Exception $e) {
            return response()->json(new ErrorResponse(false, 'An error occurred during login.', $e->getMessage()), 500);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/logout",
     *     tags={"Auth"},
     *     summary="Logout a user",
     *     security={{"sanctum":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="User successfully logged out",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="User successfully logged out")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthenticated",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Unauthenticated.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="An error occurred while user tried to logout",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="An error occurred while user tried to logout"),
     *             @OA\Property(property="error_message", type="string", example="Unexpected error details.")
     *         )
     *     )
     * )
     */
    public function logout()
    {
        try {
            $this->authRepository->logoutUser();
            return response()->json(new BasicResponse(true, 'User successfully logged out'), 200);
        } catch (Exception $e) {
            return response()->json(new ErrorResponse(false, 'An error occurred while user tried to logout', $e->getMessage()), 500);
        }
    }
}
