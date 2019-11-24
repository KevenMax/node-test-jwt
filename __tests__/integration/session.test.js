const request = require("supertest");
const app = require("../../src/app");
const trucante = require("../utils/truncate");
const factory = require("../factories");

describe("Authentication", () => {
  beforeEach(async () => {
    await trucante();
  });
  // Descreve um conjunto de funcionalidades
  it("1) should authenticate with valid credentials", async () => {
    const user = await factory.create("User", { password: "1233123" });
    const response = await request(app)
      .post("/sessions")
      .send({
        email: user.email,
        password: "1233123"
      });

    expect(response.status).toBe(200);
  }); // Descreve uma funcionalidaidade

  it("2) should not authenticate with valid credentials", async () => {
    const user = await factory.create("User", { password: "1233123" });
    const response = await request(app)
      .post("/sessions")
      .send({
        email: user.email,
        password: "121212"
      });

    expect(response.status).toBe(401);
  });

  it("3) should return jwt token when authenticated", async () => {
    const user = await factory.create("User", { password: "1233123" });

    const response = await request(app)
      .post("/sessions")
      .send({
        email: user.email,
        password: "1233123"
      });

    expect(response.body).toHaveProperty("token");
  });

  it("4) should be able to access private routes when authenticated", async () => {
    const user = await factory.create("User", { password: "1233123" });

    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it("5) should not be able to access private routes without jwt token", async () => {
    const response = await request(app).get("/dashboard");

    expect(response.status).toBe(401);
  });

  it("6) should not be able to access private routes with invalid jwt token", async () => {
    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", `Bearer 123123`);

    expect(response.status).toBe(401);
  });
});
