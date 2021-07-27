const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const DashboardList = require("../models/DashboardList");

const { dbConnect, dbDisconnect } = require("../memoryDB");

beforeAll(async () => {
  await dbConnect();
});

afterAll(async () => {
  await dbDisconnect();
});

describe("getDashboardList", () => {
  afterEach(async () => {
    await DashboardList.deleteMany({});
  });

  describe("when no X-USER-ID is given in the headers", () => {
    it("should return 401", async () => {
      const res = request
        .get("/api/dashboardlist")
        .set("Accept", "application/json");

      await res.expect(401);
    });
  });

  describe("when X-USER-ID is given in the headers", () => {
    it("should return 200", async () => {
      const res = request
        .get("/api/dashboardlist")
        .set("Accept", "application/json")
        .set("x-user_id", "someUserId");

      await res.expect(200);
    });
  });
});