const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const Userboard = require("../models/Userboard");

const { dbConnect, dbDisconnect } = require("./__utils__/memoryDB");

beforeAll(async () => {
  await dbConnect();
});

afterAll(async () => {
  await dbDisconnect();
});

describe("getUserboard", () => {
  afterEach(async () => {
    await Userboard.deleteMany({});
  });

  describe("when no X-USER-ID is given in the headers", () => {
    it("should return 401", async () => {
      const res = request
        .get("/api/userboards")
        .set("Accept", "application/json");

      await res.expect(401);
    });
  });

  describe("when X-USER-ID is given in the headers", () => {
    it("should return 200", async () => {
      const res = request
        .get("/api/userboards")
        .set("Accept", "application/json")
        .set("x-user_id", "someUserId");

      await res.expect(200);
    });
  });
});
