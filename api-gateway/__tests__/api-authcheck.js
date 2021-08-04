const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);

describe("api/authcheck", () => {
  describe("when no auth token is present", () => {
    it("should return 401", async () => {
      // given
      const token = "";

      // when
      const response = request
        .get(`/api/authcheck`)
        .set("Accept", "application/json")
        .set("authorization", `Bearer ${token}`);

      // then
      await response.expect(401);
    });
  });

  describe("when auth token is present", () => {
    it("should return 200", async () => {
      // given
      const token = "Bearer";

      // when
      const response = request
        .get(`/api/authcheck`)
        .set("Accept", "application/json")
        .set("authorization", `Bearer ${token}`);

      // then
      await response.expect(200);
    });
  });
});
