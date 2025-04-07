import supertest from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { createApp } from "./app";

interface Task {
  id: number;
  description: string;
  completed: boolean;
}

describe("Task API", () => {
  let request: supertest.SuperTest<supertest.Test>;

  beforeEach(() => {
    const app = createApp();
    request = supertest(app) as any;
  });

  describe("GET /tasks", () => {
    it("should return all tasks", async () => {
      const response = await request.get("/tasks");

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toMatchObject({
        id: 1,
        description: "Complete the project report",
        completed: false,
      });
    });
  });

  describe("GET /tasks/:id", () => {
    it("should return a specific task", async () => {
      const response = await request.get("/tasks/1");

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        id: 1,
        description: "Complete the project report",
        completed: false,
      });
    });

    it("should return 404 for non-existent task", async () => {
      const response = await request.get("/tasks/999");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Task not found" });
    });
  });

  describe("POST /tasks", () => {
    it("should create a new task", async () => {
      const newTask: Partial<Task> = {
        description: "Test task",
        completed: false,
      };

      const response = await request.post("/tasks").send(newTask);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        id: 3,
        description: "Test task",
        completed: false,
      });
    });
  });

  describe("PUT /tasks/:id", () => {
    it("should update an existing task", async () => {
      const updatedTask: Partial<Task> = {
        description: "Updated task",
        completed: true,
      };

      const response = await request.put("/tasks/1").send(updatedTask);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        id: 1,
        description: "Updated task",
        completed: true,
      });
    });

    it("should return 404 for non-existent task", async () => {
      const response = await request
        .put("/tasks/999")
        .send({ description: "Test", completed: true });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Task not found" });
    });
  });

  describe("DELETE /tasks/:id", () => {
    it("should delete an existing task", async () => {
      const response = await request.delete("/tasks/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Task deleted" });
    });

    it("should return 404 for non-existent task", async () => {
      const response = await request.delete("/tasks/999");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Task not found" });
    });
  });
});
