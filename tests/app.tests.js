const request = require("supertest");
const app = require("../app");

describe("API Tests", () => {

  it("GET /health should return OK", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
  });

  it("POST /tasks should create task", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ title: "Test Task" });

    expect(res.statusCode).toBe(201);
  });

});