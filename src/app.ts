import express, { Express, Request, Response } from "express";

interface Task {
  id: number;
  description: string;
  completed: boolean;
}

export function createApp(): Express {
  const app = express();

  app.use(express.json());

  let tasks: Task[] = [
    { id: 1, description: "Complete the project report", completed: false },
    { id: 2, description: "Clean the house", completed: true },
  ];

  app.get("/tasks", (req: Request, res: Response) => {
    res.json(tasks);
  });

  app.get("/tasks/:id", (req: Request, res: Response) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  });

  app.post("/tasks", (req: Request, res: Response) => {
    const newTask: Task = {
      id: tasks.length + 1,
      description: req.body.description,
      completed: req.body.completed || false,
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
  });

  app.put("/tasks/:id", (req: Request, res: Response) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex((t) => t.id === taskId);

    if (taskIndex !== -1) {
      const updatedTask: Task = {
        id: taskId,
        description: req.body.description,
        completed: req.body.completed,
      };
      tasks[taskIndex] = updatedTask;
      res.json(updatedTask);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  });

  app.delete("/tasks/:id", (req: Request, res: Response) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex((t) => t.id === taskId);

    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      res.json({ message: "Task deleted" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  });

  return app;
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const app = createApp();
  const port = 3000;
  app.listen(port, () => {
    console.log(`API server running on http://localhost:${port}`);
  });
}
