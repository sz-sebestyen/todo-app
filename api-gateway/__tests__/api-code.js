require("dotenv").config({ path: ".env.test" });
const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);

const jwt = require("jsonwebtoken");

const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");

const mock = new MockAdapter(axios);

describe("api/login", () => {
  describe("when jwt wth sub is in the response", () => {
    it("should return 200", async () => {
      // given
      const sub = "userId";
      const id_token = jwt.sign({ sub }, process.env.JWT_SECRET);

      mock.onPost().reply(200, {
        id_token,
      });

      // when
      const response = request
        .get(`/api/code?code=asd`)
        .set("Accept", "application/json");

      // then
      await response
        .expect((res) => {
          const decoded = jwt.decode(res.body.token);
          res.body = { sub: decoded.sub };
        })
        .expect(200, { sub });
    });
  });
});
