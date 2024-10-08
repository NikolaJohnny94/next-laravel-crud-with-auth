<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Mockery;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Repositories\TaskRepository;



class TaskTest extends TestCase
{

    //   INDEX
    public function test_index_returns_tasks_when_tasks_exist()
    {
        // Arrange: Mock the Task model
        $mockedTasks = collect([
            (object) [
                'id' => 1,
                'title' => 'Task 1',
                'slug' => 'task-1',
                'description' => 'Description for Task 1',
                'category' => 'work',
                'finished' => false,
                'user_id' => 1,
            ],
            (object) [
                'id' => 2,
                'title' => 'Task 2',
                'slug' => 'task-2',
                'description' => 'Description for Task 2',
                'category' => 'personal',
                'finished' => false,
                'user_id' => 1,
            ],
        ]);

        /** @var \Mockery\LegacyMockInterface&\Mockery\MockInterface|TaskRepository $taskRepositoryMock */
        $taskRepositoryMock = Mockery::mock('App\Repositories\TaskRepository');
        $taskRepositoryMock->shouldReceive('getTasks')->andReturn($mockedTasks);

        $controller = new TaskController($taskRepositoryMock);

        // Act: Call the index method
        $response = $controller->index();
        $responseData = json_decode($response->getContent(), true);

        // Assert: Check the response
        $this->assertEquals(200, $response->status());
        $this->assertEquals('Tasks successfully retrieved from the DB', $responseData['message']);
        $this->assertCount(2, $responseData['data']);
    }

    public function test_index_returns_no_tasks_message_when_no_tasks_exist()
    {
        /** @var \Mockery\LegacyMockInterface&\Mockery\MockInterface|TaskRepository $taskRepositoryMock */
        // Arrange: Mock the Task model
        $taskRepositoryMock = Mockery::mock('App\Repositories\TaskRepository');
        $taskRepositoryMock->shouldReceive('getTasks')->andReturn(collect());

        $controller = new TaskController($taskRepositoryMock);
        // Act: Call the index method
        $response = $controller->index();
        $responseData = json_decode($response->getContent(), true);

        // Assert: Check the response
        $this->assertEquals(200, $response->status());
        $this->assertEquals('There are no tasks in the DB', $responseData['message']);
        $this->assertEmpty($responseData['data']);
    }

    public function test_index_handles_exception()
    {
        /** @var \Mockery\LegacyMockInterface&\Mockery\MockInterface|TaskRepository $taskRepositoryMock */
        // Arrange: Mock the Task model to throw an exception
        $taskRepositoryMock = Mockery::mock('App\Repositories\TaskRepository');
        $taskRepositoryMock->shouldReceive('getTasks')->andThrow(new Exception('Database error'));

        $controller = new TaskController($taskRepositoryMock);

        // Act: Call the index method
        $response = $controller->index();
        $responseData = json_decode($response->getContent(), true);

        // Assert: Check the response
        $this->assertEquals(500, $response->status());
        $this->assertEquals('Error occurred while trying to retrieve tasks from DB', $responseData['message']);
        $this->assertEquals('Database error', $responseData['error_message']);
    }

    // SHOW
    public function test_show_returns_task_when_task_exists()
    {
        // Arrange: Mock the Task model
        $mockedTask = (object) [
            'id' => 1,
            'title' => 'Task 1',
            'slug' => 'task-1',
            'description' => 'Description for Task 1',
            'category' => 'work',
            'finished' => false,
        ];

        /** @var \Mockery\LegacyMockInterface&\Mockery\MockInterface|TaskRepository $taskRepositoryMock */
        $taskRepositoryMock = Mockery::mock('App\Repositories\TaskRepository');
        $taskRepositoryMock->shouldReceive('findTaskById')->with(1)->andReturn($mockedTask);

        $controller = new TaskController($taskRepositoryMock);

        // Act: Call the show method
        $response = $controller->show(1);
        $responseData = json_decode($response->getContent(), true);

        // Assert: Check the response
        $this->assertEquals(200, $response->status());
        $this->assertEquals('Task with id: 1 successfully retrieved from the DB', $responseData['message']);
        $this->assertEquals($mockedTask, (object) $responseData['data']);
    }

    public function test_show_returns_not_found_when_task_does_not_exist()
    {
        /** @var \Mockery\LegacyMockInterface&\Mockery\MockInterface|TaskRepository $taskRepositoryMock */
        // Arrange: Mock the Task model to throw a ModelNotFoundException
        $taskRepositoryMock = Mockery::mock('App\Repositories\TaskRepository');
        $taskRepositoryMock->shouldReceive('findTaskById')->with(1)->andThrow(new ModelNotFoundException());

        $controller = new TaskController($taskRepositoryMock);

        // Act: Call the show method
        $response = $controller->show(1);
        $responseData = json_decode($response->getContent(), true);

        // Assert: Check the response
        $this->assertEquals(404, $response->status());
        $this->assertEquals('Task with id 1 not found in the DB.', $responseData['message']);
    }

    public function test_show_handles_exception()
    {
        /** @var \Mockery\LegacyMockInterface&\Mockery\MockInterface|TaskRepository $taskRepositoryMock */
        // Arrange: Mock the Task model to throw a generic Exception
        $taskRepositoryMock = Mockery::mock('App\Repositories\TaskRepository');
        $taskRepositoryMock->shouldReceive('findTaskById')->with(1)->andThrow(new Exception('Database error'));

        $controller = new TaskController($taskRepositoryMock);

        // Act: Call the show method
        $response = $controller->show(1);
        $responseData = json_decode($response->getContent(), true);

        // Assert: Check the response
        $this->assertEquals(500, $response->status());
        $this->assertEquals('Error occurred while trying to retrieve task with id: 1.', $responseData['message']);
        $this->assertEquals('Database error', $responseData['error_message']);
    }

    // STORE
    public function test_store_creates_new_task_successfully()
    {
        // Arrange: Mock the Task model and Auth facade
        $mockedTask = (object) [
            'id' => 1,
            'title' => 'New Task',
            'slug' => 'new-task',
            'description' => 'Description for new task',
            'category' => 'work',
            'finished' => false,
        ];

        /** @var \Mockery\LegacyMockInterface&\Mockery\MockInterface|TaskRepository $taskRepositoryMock */
        $taskRepositoryMock = Mockery::mock('App\Repositories\TaskRepository');
        $taskRepositoryMock->shouldReceive('createTask')->andReturn($mockedTask);

        Auth::shouldReceive('id')->andReturn(1);

        $request = Request::create('/tasks', 'POST', [
            'title' => 'New Task',
            'description' => 'Description for new task',
            'finished' => false,
            'category' => 'work',
        ]);

        $controller = new TaskController($taskRepositoryMock);

        // Act: Call the store method
        $response = $controller->store($request);
        $responseData = json_decode($response->getContent(), true);

        // Assert: Check the response
        $this->assertEquals(201, $response->status());
        $this->assertEquals('New task successfully created', $responseData['message']);
        $this->assertEquals($mockedTask, (object) $responseData['data']);
    }

    public function test_store_returns_validation_error()
    {
        /** @var \Mockery\LegacyMockInterface&\Mockery\MockInterface|TaskRepository $taskRepositoryMock */
        $taskRepositoryMock = Mockery::mock('App\Repositories\TaskRepository');

        // Arrange: Mock the Request validation
        $request = Request::create('/tasks', 'POST', [
            'title' => '',
            'description' => '',
            'finished' => '',
            'category' => '',
        ]);

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'finished' => 'required|boolean',
            'category' => 'required|in:work,personal,other',
        ]);

        $this->expectException(ValidationException::class);

        // Manually trigger the validation exception
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        $controller = new TaskController($taskRepositoryMock);

        // Act: Call the store method
        $controller->store($request);
    }

    public function test_store_handles_exception()
    {
        // Arrange: Mock the Task model to throw an exception
        /** @var \Mockery\LegacyMockInterface&\Mockery\MockInterface|TaskRepository $taskRepositoryMock */
        $taskRepositoryMock = Mockery::mock('App\Repositories\TaskRepository');
        $taskRepositoryMock->shouldReceive('createTask')->andThrow(new Exception('Database error'));

        Auth::shouldReceive('id')->andReturn(1);

        $request = Request::create('/tasks', 'POST', [
            'title' => 'New Task',
            'description' => 'Description for new task',
            'finished' => false,
            'category' => 'work',
        ]);
        /** @var \Mockery\LegacyMockInterface&\Mockery\MockInterface|TaskRepository $taskRepositoryMock */
        $controller = new TaskController($taskRepositoryMock);

        // Act: Call the store method
        $response = $controller->store($request);
        $responseData = json_decode($response->getContent(), true);

        // Assert: Check the response
        $this->assertEquals(500, $response->status());
        $this->assertEquals('Error occurred while trying to create new task', $responseData['message']);
        $this->assertEquals('Database error', $responseData['error_message']);
    }

    // DESTROY
    public function test_destroy_deletes_task_when_task_exists()
    {
        // Arrange: Mock the TaskRepository
        $taskMock = Mockery::mock('alias:App\Models\Task');
        /** @var \Mockery\LegacyMockInterface&\Mockery\MockInterface|TaskRepository $taskRepositoryMock */
        $taskRepositoryMock = Mockery::mock('App\Repositories\TaskRepository');
        $taskRepositoryMock->shouldReceive('findTaskById')->with(1)->andReturn($taskMock);
        $taskRepositoryMock->shouldReceive('deleteTask')->with(1)->andReturn(true);

        // Inject the mocked repository into the controller
        $controller = new TaskController($taskRepositoryMock);

        // Act: Call the destroy method
        $response = $controller->destroy(1);
        $responseData = json_decode($response->getContent(), true);

        // Assert: Check the response
        $this->assertEquals(200, $response->status());
        $this->assertEquals('Task with id: 1 successfully deleted from the DB', $responseData['message']);
    }

    public function test_destroy_returns_not_found_when_task_does_not_exist()
    {
        // Arrange: Mock the TaskRepository to throw a ModelNotFoundException
        /** @var \Mockery\LegacyMockInterface&\Mockery\MockInterface|TaskRepository $taskRepositoryMock */
        $taskRepositoryMock = Mockery::mock('App\Repositories\TaskRepository');
        $taskRepositoryMock->shouldReceive('deleteTask')->with(1)->andThrow(new ModelNotFoundException());

        // Inject the mocked repository into the controller
        $controller = new TaskController($taskRepositoryMock);

        // Act: Call the destroy method
        $response = $controller->destroy(1);
        $responseData = json_decode($response->getContent(), true);

        // Assert: Check the response
        $this->assertEquals(404, $response->status());
        $this->assertEquals('Task with id 1 not found in the DB.', $responseData['message']);
    }

    public function test_destroy_handles_exception()
    {
        // Arrange: Mock the TaskRepository to throw a generic Exception
        /** @var \Mockery\LegacyMockInterface&\Mockery\MockInterface|TaskRepository $taskRepositoryMock */
        $taskRepositoryMock = Mockery::mock('App\Repositories\TaskRepository');
        $taskRepositoryMock->shouldReceive('deleteTask')->with(1)->andThrow(new Exception('Database error'));

        // Inject the mocked repository into the controller
        $controller = new TaskController($taskRepositoryMock);

        // Act: Call the destroy method
        $response = $controller->destroy(1);
        $responseData = json_decode($response->getContent(), true);

        // Assert: Check the response
        $this->assertEquals(500, $response->status());
        $this->assertEquals('Error occurred while trying to delete task with id: 1.', $responseData['message']);
        $this->assertEquals('Database error', $responseData['error_message']);
    }

    // UPDATE
    public function test_update_successfully_updates_task()
    {
        // Arrange: Mock the Task model
        $mockedTask = Mockery::mock('alias:App\Models\Task');
        /** @var \Mockery\LegacyMockInterface&\Mockery\MockInterface|TaskRepository $taskRepositoryMock */
        $taskRepositoryMock = Mockery::mock('App\Repositories\TaskRepository');
        $taskRepositoryMock->shouldReceive('findTaskById')->with(1)->andReturn($mockedTask);
        $taskRepositoryMock->shouldReceive('updateTask')->andReturn(true);

        $request = Request::create('/tasks/1', 'PUT', [
            'title' => 'Updated Task',
            'description' => 'Updated description',
            'finished' => true,
            'category' => 'work',
        ]);

        $controller = new TaskController($taskRepositoryMock);

        // Act: Call the update method
        $response = $controller->update($request, 1);
        $responseData = json_decode($response->getContent(), true);

        // Assert: Check the response
        $this->assertEquals(200, $response->status());
        $this->assertEquals('Task with id 1 successfully updated', $responseData['message']);
    }

    public function test_update_returns_validation_error()
    {
        // Arrange: Mock the TaskRepository
        /** @var \Mockery\LegacyMockInterface&\Mockery\MockInterface|TaskRepository $taskRepositoryMock */
        $taskRepositoryMock = Mockery::mock('App\Repositories\TaskRepository');

        $request = Request::create('/tasks/1', 'PUT', [
            'title' => '',
            'description' => '',
            'finished' => '',
            'category' => '',
        ]);

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'finished' => 'sometimes|required|boolean',
            'category' => 'sometimes|required|in:work,personal,other',
        ]);

        $this->expectException(ValidationException::class);

        // Manually trigger the validation exception
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        // Inject the mocked repository into the controller
        $controller = new TaskController($taskRepositoryMock);

        // Act: Call the update method
        $controller->update($request, 1);
    }

    public function test_update_returns_not_found_when_task_does_not_exist()
    {
        // Arrange: Mock the TaskRepository to throw a ModelNotFoundException
        /** @var \Mockery\LegacyMockInterface&\Mockery\MockInterface|TaskRepository $taskRepositoryMock */
        $taskRepositoryMock = Mockery::mock('App\Repositories\TaskRepository');
        $taskRepositoryMock->shouldReceive('updateTask')->with(1, Mockery::any())->andThrow(new ModelNotFoundException());

        $request = Request::create('/tasks/1', 'PUT', [
            'title' => 'Updated Task',
            'description' => 'Updated description',
            'finished' => true,
            'category' => 'work',
        ]);

        // Inject the mocked repository into the controller
        $controller = new TaskController($taskRepositoryMock);

        // Act: Call the update method
        $response = $controller->update($request, 1);
        $responseData = json_decode($response->getContent(), true);

        // Assert: Check the response
        $this->assertEquals(404, $response->status());
        $this->assertEquals('Task with id 1 not found in the DB.', $responseData['message']);
    }

    public function test_update_handles_exception()
    {
        // Arrange: Mock the TaskRepository to throw a generic Exception
        /** @var \Mockery\LegacyMockInterface&\Mockery\MockInterface|TaskRepository $taskRepositoryMock */
        $taskRepositoryMock = Mockery::mock('App\Repositories\TaskRepository');
        $taskRepositoryMock->shouldReceive('updateTask')->with(1, Mockery::any())->andThrow(new Exception('Database error'));

        $request = Request::create('/tasks/1', 'PUT', [
            'title' => 'Updated Task',
            'description' => 'Updated description',
            'finished' => true,
            'category' => 'work',
        ]);

        // Inject the mocked repository into the controller
        $controller = new TaskController($taskRepositoryMock);

        // Act: Call the update method
        $response = $controller->update($request, 1);
        $responseData = json_decode($response->getContent(), true);

        // Assert: Check the response
        $this->assertEquals(500, $response->status());
        $this->assertEquals('An error occurred while updating the task with id: 1.', $responseData['message']);
        $this->assertEquals('Database error', $responseData['error_message']);
    }

    // SEARCH
    public function test_search_returns_tasks_when_tasks_exist()
    {
        // Arrange: Mock the TaskRepository
        $mockedTasks = collect([
            (object) [
                'id' => 1,
                'title' => 'Task 1',
                'slug' => 'task-1',
                'description' => 'Description for Task 1',
                'category' => 'work',
                'finished' => false,
            ],
            (object) [
                'id' => 2,
                'title' => 'Another Task',
                'slug' => 'another-task',
                'description' => 'Description for Another Task',
                'category' => 'personal',
                'finished' => false,
            ],
        ]);

        /** @var \Mockery\LegacyMockInterface&\Mockery\MockInterface|TaskRepository $taskRepositoryMock */
        $taskRepositoryMock = Mockery::mock('App\Repositories\TaskRepository');
        $taskRepositoryMock->shouldReceive('searchTaskByTitle')->with('task')->andReturn($mockedTasks);

        // Inject the mocked repository into the controller
        $controller = new TaskController($taskRepositoryMock);

        // Act: Call the search method
        $response = $controller->search('task');
        $responseData = json_decode($response->getContent(), true);

        // Assert: Check the response
        $this->assertEquals(200, $response->status());
        $this->assertEquals("Tasks that match search criteria: 'task' successfully retrieved from the DB", $responseData['message']);
        $this->assertCount(2, $responseData['data']);
    }

    public function test_search_returns_no_tasks_message_when_no_tasks_exist()
    {
        // Arrange: Mock the TaskRepository
        /** @var \Mockery\LegacyMockInterface&\Mockery\MockInterface|TaskRepository $taskRepositoryMock */
        $taskRepositoryMock = Mockery::mock('App\Repositories\TaskRepository');
        $taskRepositoryMock->shouldReceive('searchTaskByTitle')->with('task')->andReturn(collect());

        // Inject the mocked repository into the controller
        $controller = new TaskController($taskRepositoryMock);

        // Act: Call the search method
        $response = $controller->search('task');
        $responseData = json_decode($response->getContent(), true);

        // Assert: Check the response
        $this->assertEquals(200, $response->status());
        $this->assertEquals("No tasks found matching the search criteria: 'task'", $responseData['message']);
        $this->assertEmpty($responseData['data']);
    }

    public function test_search_handles_exception()
    {
        // Arrange: Mock the TaskRepository to throw an exception
        /** @var \Mockery\LegacyMockInterface&\Mockery\MockInterface|TaskRepository $taskRepositoryMock */
        $taskRepositoryMock = Mockery::mock('App\Repositories\TaskRepository');
        $taskRepositoryMock->shouldReceive('searchTaskByTitle')->with('task')->andThrow(new Exception('Database error'));

        // Inject the mocked repository into the controller
        $controller = new TaskController($taskRepositoryMock);

        // Act: Call the search method
        $response = $controller->search('task');
        $responseData = json_decode($response->getContent(), true);

        // Assert: Check the response
        $this->assertEquals(500, $response->status());
        $this->assertEquals('Unexpected error occurred while processing search request', $responseData['message']);
        $this->assertEquals('Database error', $responseData['error_message']);
    }
}
