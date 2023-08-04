// test file for the projects controller
const mssql = require("mssql");
const { createProject } = require("./projectsController");

describe("Testing the projects controller", () => {
  describe("Testing the request Body for creating a project", () => {
    it("should return an error  if all fields are not provided", async () => {
      const req = {
        body: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await createProject(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "All fields are required",
      });
    });
  });

  describe("Creating a project Successfully", () => {
    it("should return a success message if the project is created successfully", async () => {
      const req = {
        body: {
          project_name: "test project",
          description: "test description",
          project_location: "test location",
          startdate: "2021-01-01",
          enddate: "2021-01-01",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(mssql, "connect").mockResolvedValueOnce({
        request: jest.fn().mockReturnThis(),
        input: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce({
          rowsAffected: [1],
        }),
      });

      await createProject(req, res);
      //   expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "project created successfully",
      });
    });

    it("should return an error if the procedure does not exist", async () => {
      // in this case a project name is not provided
      const req = {
        body: {
          project_name: "test project",
          description: "test description",
          project_location: "test location",
          startdate: "2021-01-01",
          enddate: "2021-01-01",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(mssql , 'connect').mockResolvedValueOnce({
      request:jest.fn().mockReturnThis(),
      input:jest.fn().mockReturnThis(),
      execute:jest.fn().mockRejectedValueOnce({
       message:'Procedure does not exist'
      }),
    });

    await createProject(req, res);
  
    expect(res.json).toHaveBeenCalledWith({
      error:Object({message:'Procedure does not exist'})
    });



  });
});
});
