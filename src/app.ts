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
    // TODO: Implement create task logic
  });

  app.put("/tasks/:id", (req: Request, res: Response) => {
    // TODO: Implement update task logic
  });

  app.delete("/tasks/:id", (req: Request, res: Response) => {
    const taskId = parseInt(req.params.id);
    // TODO: Implement delete task logic
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
