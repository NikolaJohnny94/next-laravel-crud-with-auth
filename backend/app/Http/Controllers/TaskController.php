<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Access\AuthorizationException;
use App\Repositories\TaskRepository;
use App\Utils\Response;
use App\Utils\BasicResponse;
use App\Utils\ErrorResponse;


class TaskController extends Controller
{

    protected $taskRepository;
    public function __construct(TaskRepository $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }
    /**
     * @OA\Get(
     *     path="/api/tasks",
     *     tags={"Tasks"},
     *     summary="Get list of tasks",
     *     security={{"sanctum":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Tasks successfully retrieved from the DB",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Tasks successfully retrieved from the DB"),
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(property="id", type="integer", example=1),
     *                     @OA\Property(property="title", type="string", example="Updated New Task"),
     *                     @OA\Property(property="description", type="string", example="Updated task description"),
     *                     @OA\Property(property="category", type="string", enum={"work", "personal", "other"}, example="personal"),
     *                     @OA\Property(property="finished", type="boolean", example=true),
     *                     @OA\Property(property="user_id", type="integer", example=1),
     *                     @OA\Property(property="slug", type="string", example="updated-new-task"),
     *                     @OA\Property(property="created_at", type="string", format="date-time", example="2023-09-29 18:10:30"),
     *                     @OA\Property(property="updated_at", type="string", format="date-time", example="2024-05-29 14:28:43")
     *                 )
     *             )
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
     *         description="Error occurred while trying to retrieve tasks from DB",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Error occurred while trying to retrieve tasks from DB"),
     *             @OA\Property(property="error_message", type="string", example="Unexpected error details.")
     *         )
     *     )
     * )
     */


    public function index()
    {
        try {
            $tasks = $this->taskRepository->getTasks();

            $message = $tasks->isEmpty() ? 'There are no tasks in the DB' : 'Tasks successfully retrieved from the DB';

            return response()->json(new Response(true, $message, $tasks), 200);
        } catch (Exception $e) {
            return response()->json(new ErrorResponse(false, 'Error occurred while trying to retrieve tasks from DB', $e->getMessage()), 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */

    /**
     * @OA\Post(
     *     path="/api/tasks",
     *     tags={"Tasks"},
     *     summary="Create a new task",
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="title", type="string", example="New Task"),
     *             @OA\Property(property="description", type="string", example="New task description"),
     *             @OA\Property(property="category", type="string", enum={"work", "personal", "other"}, example="personal"),
     *             @OA\Property(property="finished", type="boolean", example=false)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="New task successfully created",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="New task successfully created"),
     *             @OA\Property(
     *                 property="data",
     *                 type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="title", type="string", example="New task"),
     *                 @OA\Property(property="description", type="string", example="New task description"),
     *                 @OA\Property(property="category", type="string", enum={"work", "personal", "other"}, example="personal"),
     *                 @OA\Property(property="finished", type="boolean", example=false),
     *                 @OA\Property(property="user_id", type="integer", example=1),
     *                 @OA\Property(property="slug", type="string", example="new-task"),
     *                 @OA\Property(property="created_at", type="string", format="date-time", example="2023-09-29 18:10:30"),
     *                 @OA\Property(property="updated_at", type="string", format="date-time", example="2024-05-29 14:28:43")
     *             )
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
     *         description="Validation failed while trying to create new task",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Validation failed while user tried to create new task"),
     *             @OA\Property(property="error_message", type="string", example="Validation error details")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Error occurred while trying to create new task",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Error occurred while trying to create new task"),
     *             @OA\Property(property="error_message", type="string", example="Unexpected error details.")
     *         )
     *     )
     * )
     */


    public function store(Request $request)
    {
        try {

            $validatedData =  $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'finished' => 'required|boolean',
                'category' => 'required|in:work,personal,other',
            ]);

            $newTask = $this->taskRepository->createTask(array_merge($validatedData, ['user_id' => Auth::id()]));

            return response()->json(new Response(true, 'New task successfully created', $newTask), 201);
        } catch (ValidationException $e) {
            return response()->json(new ErrorResponse(false, 'Validation failed while user tried to create new task', $e->errors()), 422);
        } catch (Exception $e) {
            return response()->json(new ErrorResponse(false, 'Error occurred while trying to create new task', $e->getMessage()), 500);
        }
    }

    /**
     * Display the specified resource.
     */
    /**
     * @OA\Get(
     *     path="/api/tasks/{id}",
     *     tags={"Tasks"},
     *     summary="Get a specific task by ID",
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Task with specified ID successfully retrieved",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Task with id: 1 successfully retrieved from the DB"),
     *             @OA\Property(
     *                 property="data",
     *                 type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="title", type="string", example="Task title"),
     *                 @OA\Property(property="description", type="string", example="Task description"),
     *                 @OA\Property(property="category", type="string", enum={"work", "personal", "other"}, example="other"),
     *                 @OA\Property(property="finished", type="boolean", example=true),
     *                 @OA\Property(property="user_id", type="integer", example=1),
     *                 @OA\Property(property="slug", type="string", example="task-title"),
     *                 @OA\Property(property="created_at", type="string", format="date-time", example="2023-09-29 18:10:30"),
     *                 @OA\Property(property="updated_at", type="string", format="date-time", example="2024-05-29 14:28:43")
     *             )
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
     *         response=403,
     *         description="Forbidden",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="You do not have permission to access this route. Please ensure you are logged in with the correct account."),
     *             @OA\Property(property="error_message", type="string", example="Not authorized!")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Task with specified ID not found",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Task with id 1 not found in the DB."),
     *             @OA\Property(property="error_message", type="string", example="Task not found!")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Error occurred while trying to retrieve task with specified ID",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Error occurred while trying to retrieve task with id: 1"),
     *             @OA\Property(property="error_message", type="string", example="Unexpected error details.")
     *         )
     *     )
     * )
     */


    public function show(string $id)
    {
        try {
            $task = $this->taskRepository->findTaskById($id);
            return response()->json(new Response(true, "Task with id: $id successfully retrieved from the DB", $task), 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(new ErrorResponse(false, "Task with id $id not found in the DB.", $e->getMessage()), 404);
        } catch (AuthorizationException $e) {
            return response()->json(new ErrorResponse(false, "You do not have permission to access this route. Please ensure you are logged in with the correct account.", $e->getMessage()), 403);
        } catch (Exception $e) {
            return response()->json(new ErrorResponse(false, "Error occurred while trying to retrieve task with id: $id.", $e->getMessage()), 500);
        }
    }

    /**
     * @OA\Put(
     *     path="/api/tasks/{id}",
     *     tags={"Tasks"},
     *     summary="Update a specific task by ID",
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="title", type="string", example="Updated new task"),
     *             @OA\Property(property="description", type="string", example="Updated new task description"),
     *             @OA\Property(property="category", type="string", enum={"work", "personal", "other"}, example="personal"),
     *             @OA\Property(property="finished", type="boolean", example=true)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Task with specified ID successfully updated",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Task with id 1 successfully updated"),
     *             @OA\Property(
     *                 property="data",
     *                 type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="title", type="string", example="Updated new task"),
     *                 @OA\Property(property="description", type="string", example="Updated new task description"),
     *                 @OA\Property(property="category", type="string", enum={"work", "personal", "other"}, example="personal"),
     *                 @OA\Property(property="finished", type="boolean", example=true),
     *                 @OA\Property(property="user_id", type="integer", example=1),
     *                 @OA\Property(property="slug", type="string", example="updated-new-task"),
     *                 @OA\Property(property="created_at", type="string", format="date-time", example="2023-09-29 18:10:30"),
     *                 @OA\Property(property="updated_at", type="string", format="date-time", example="2024-05-29 14:28:43")
     *             )
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
     *         response=403,
     *         description="Forbidden",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="You do not have permission to access this route. Please ensure you are logged in with the correct account."),
     *             @OA\Property(property="error_message", type="string", example="Not authorized!")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation failed while trying to update task with specified ID",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Validation failed while trying to update task with id: 1."),
     *             @OA\Property(property="error_message", type="string", example="Validation error details")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Task with specified ID not found",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Task with id 1 not found in the DB."),
     *             @OA\Property(property="error_message", type="string", example="Task not found!")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Error occurred while trying to update task with specified ID",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="An error occurred while updating the task with id: 1."),
     *             @OA\Property(property="error_message", type="string", example="Unexpected error details.")
     *         )
     *     )
     * )
     */

    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'title' => 'sometimes|required|string|max:255',
                'description' => 'sometimes|required|string',
                'finished' => 'sometimes|required|boolean',
                'category' => 'sometimes|required|in:work,personal,other',
            ]);

            $task = $this->taskRepository->updateTask($id, $validatedData);

            return response()->json(new Response(true, "Task with id $id successfully updated", $task), 200);
        } catch (ValidationException $e) {
            return response()->json(new ErrorResponse(false, "Validation failed while trying to update task with id: $id.", $e->errors()), 422);
        } catch (ModelNotFoundException $e) {
            return response()->json(new ErrorResponse(false, "Task with id $id not found in the DB.", $e->getMessage()), 404);
        } catch (AuthorizationException $e) {
            return response()->json(new ErrorResponse(false, "You do not have permission to access this route. Please ensure you are logged in with the correct account.", $e->getMessage()), 403);
        } catch (Exception $e) {
            return response()->json(new ErrorResponse(false, "An error occurred while updating the task with id: $id.", $e->getMessage()), 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    /**
     * @OA\Delete(
     *     path="/api/tasks/{id}",
     *     tags={"Tasks"},
     *     summary="Delete a specific task by ID",
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Task with specified ID successfully deleted",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Task with id: 1 successfully deleted from the DB")
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
     *         response=403,
     *         description="Forbidden",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="You do not have permission to access this route. Please ensure you are logged in with the correct account."),
     *             @OA\Property(property="error_message", type="string", example="Not authorized!")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Task with specified ID not found",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Task with id 1 not found in the DB."),
     *             @OA\Property(property="error_message", type="string", example="Task not found!")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Error occurred while trying to delete task with specified ID",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Error occurred while trying to delete task with id: 1."),
     *             @OA\Property(property="error_message", type="string", example="Unexpected error details.")
     *         )
     *     )
     * )
     */

    public function destroy(string $id)
    {
        try {
            $this->taskRepository->deleteTask($id);

            return response()->json(new BasicResponse(true, "Task with id: $id successfully deleted from the DB"), 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(new ErrorResponse(false, "Task with id $id not found in the DB.", $e->getMessage()), 404);
        } catch (AuthorizationException $e) {
            return response()->json(new ErrorResponse(false, "You do not have permission to access this route. Please ensure you are logged in with the correct account.", $e->getMessage()), 403);
        } catch (Exception $e) {
            return response()->json(new ErrorResponse(false, "Error occurred while trying to delete task with id: $id.", $e->getMessage()), 500);
        }
    }
    /**
     * @OA\Get(
     *     path="/api/tasks/search/{title}",
     *     tags={"Tasks"},
     *     summary="Search tasks by tile",
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="title",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Tasks that match search criteria successfully retrieved",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Tasks that match search criteria: 'title' successfully retrieved from the DB"),
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(property="id", type="integer", example=1),
     *                     @OA\Property(property="title", type="string", example="Task title"),
     *                     @OA\Property(property="description", type="string", example="Task description"),
     *                     @OA\Property(property="category", type="string", enum={"work", "personal", "other"}, example="other"),
     *                     @OA\Property(property="finished", type="boolean", example=true),
     *                     @OA\Property(property="user_id", type="integer", example=1),
     *                     @OA\Property(property="slug", type="string", example="task-title"),
     *                     @OA\Property(property="created_at", type="string", format="date-time", example="2023-09-29 18:10:30"),
     *                     @OA\Property(property="updated_at", type="string", format="date-time", example="2024-05-29 14:28:43")
     *                 )
     *             )
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
     *         description="Unexpected error occurred while processing search request",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Unexpected error occurred while processing search request"),
     *             @OA\Property(property="error_message", type="string", example="Unexpected error details.")
     *         )
     *     )
     * )
     */

    public function search($title)
    {
        try {
            $tasks = $this->taskRepository->searchTaskByTitle($title);
            $message = $tasks->isEmpty() ? "No tasks found matching the search criteria: '$title'" : "Tasks that match search criteria: '$title' successfully retrieved from the DB";

            return response()->json(new Response(true, $message, $tasks), 200);
        } catch (Exception $e) {
            return response()->json(new ErrorResponse(false, 'Unexpected error occurred while processing search request', $e->getMessage()), 500);
        }
    }
}
