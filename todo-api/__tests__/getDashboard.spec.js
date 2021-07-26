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

describe("getDashboard", () => {
  afterEach(async () => {
    await DashboardList.deleteMany({});
  });

  it("should return 404", async () => {
    const res = request.get("/api/dashboard").set("Accept", "application/json");

    await res.expect(404);
  });
});
