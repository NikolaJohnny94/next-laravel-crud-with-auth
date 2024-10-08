<?php

namespace App\Repositories;

use Illuminate\Http\Request;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Models\Task;


class TaskRepository
{

    protected $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }
    public function getTasks()
    {
        $user = $this->request->user();
        $tasks = Task::where('user_id', $user->id)->get();
        return $tasks;
    }

    public function findTaskById(int $id)
    {
        $user = $this->request->user();
        $task = Task::where('id', $id)->where('user_id', $user->id)->first();

        if (!$task) {
            if (Task::where('id', $id)->exists()) {
                throw new AuthorizationException("Not authorized!");
            } else {
                throw new ModelNotFoundException("Task not found!");
            }
        }

        return $task;
    }

    public function createTask(array $data)
    {
        return Task::create($data);
    }

    public function updateTask($id, array $data)
    {
        $user = $this->request->user();
        $task = Task::where('id', $id)->where('user_id', $user->id)->first();


        if (!$task) {
            if (Task::where('id', $id)->exists()) {
                throw new AuthorizationException("Not authorized!");
            } else {
                throw new ModelNotFoundException("Task not found!");
            }
        }

        $task->update($data);
        return $task;
    }

    public function deleteTask(int $id)
    {

        $user = $this->request->user();
        $task = Task::where('id', $id)->where('user_id', $user->id)->first();

        if (!$task) {
            if (Task::where('id', $id)->exists()) {
                throw new AuthorizationException("Not authorized!");
            } else {
                throw new ModelNotFoundException("Task not found!");
            }
        }

        $task->delete();
        return $task;
    }

    public function searchTaskByTitle(string $title)
    {
        $user = $this->request->user();
        $tasks = Task::where('user_id', $user->id)
            ->whereRaw('LOWER(title) LIKE ?', ['%' . strtolower($title) . '%'])
            ->get();

        return $tasks;
    }
}
