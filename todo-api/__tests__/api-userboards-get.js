const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const Userboard = require("../models/Userboard");

const { dbConnect, dbDisconnect } = require("./__utils__/memoryDB");

let mongoServer;

beforeAll(async () => {
  mongoServer = await dbConnect();
});

afterAll(async () => {
  await dbDisconnect(mongoServer);
});

describe("get api/userboards", () => {
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

    it("should return the userboard", async () => {
      // given
      const expected_user_id = "someUserId";

      const expected_userboard = {
        _id: expect.any(String),
        user_id: expect.any(String),
        dashboards: expect.anything(),
      };

      // when
      const res = await request
        .get("/api/userboards")
        .set("Accept", "application/json")
        .set("x-user_id", expected_user_id);

      // then
      expect(res.body).toMatchObject(expected_userboard);
    });

    it("should only create one userboard on the first two requests", async () => {
      // given
      const getUserboard = async () => {
        await request
          .get("/api/userboards")
          .set("Accept", "application/json")
          .set("x-user_id", "someUserId");
      };

      // when
      await getUserboard();
      await getUserboard();

      const numberOfUserboards = await Userboard.countDocuments();

      // then
      expect(numberOfUserboards).toBe(1);
    });
  });
});
