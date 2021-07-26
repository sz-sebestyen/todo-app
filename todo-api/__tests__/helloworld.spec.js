const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);

describe("helloworld", () => {
  it("should return helloworld", async () => {
    const res = request.get("/api").set("Accept", "text/html");

    await res.expect(200, '{"message":"Hello world"}');
  });
});
