const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const Userboard = require("../models/Userboard");

const {
  dbConnect,
  dbDisconnect,
  dbClearCollectinos,
} = require("./__utils__/memoryDB");

const example = {
  user_id: "1231231",
  dashboards: [
    {
      title: "this is a dashboard",
      todos: [
        {
          title: "do something",
          description: "really important",
        },
        {
          title: "do something #2",
          description: "really important",
        },
      ],
    },
    {
      title: "this is a dashboard #2",
      todos: [
        {
          title: "do something",
          description: "really important",
        },
        {
          title: "do something #2",
          description: "really important",
        },
      ],
    },
  ],
};

beforeAll(async () => {
  await dbConnect();
});

afterAll(async () => {
  await dbDisconnect();
});

describe("smoke test", () => {
  it("should pass, so we know that jest is working", () => {
    expect(1).not.toBe(2);
  });

  it("should return 404, so we know that supertest works", async () => {
    const res = request.get("/api/dashboard").set("Accept", "application/json");

    await res.expect(404);
  });

  it("should not thorw, so we know that in memory db works", async () => {
    await new Userboard(example).save();
    const found = await Userboard.findOne({ user_id: "1231231" });

    expect(found).toBeTruthy();
  });

  it("should not find Userboard after dbClearCollectinos", async () => {
    await new Userboard(example).save();
    await dbClearCollectinos([Userboard]);
    const found = await Userboard.findOne({ user_id: "1231231" });

    expect(found).toBeFalsy();
  });
});
