import { Request, Response } from "express";
import { AuthenticationError, AuthorizationError } from "../src/api/v1/errors/errors";
import { approveLoanApplication } from "../src/api/v1/controllers/managerController";

// Mock Firebase middleware
jest.mock("../src/api/v1/middleware/authenticate");
jest.mock("../src/api/v1/middleware/authorize");

describe("Secured Endpoint Test", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: jest.Mock;

    beforeEach(() => {
        mockRequest = {
            params: {id: "1"},
            headers: {}
        };
        mockResponse = {
            locals: {},
        };
        nextFunction = jest.fn();
    });

    it("should successfully access endpoints with proper authentication and authorization", async () => {
        //Arrange
        mockResponse.locals = {uid: "user123", role: "manager"};

        //Act
        await approveLoanApplication(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        //Assert
        expect(nextFunction).toHaveBeenCalledWith();
    });

    it("should respond with proper error for missing authentication", async () => {
        //Act
        await approveLoanApplication(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        //Assert
        expect(nextFunction).toHaveBeenCalledWith(expect.any(AuthenticationError));
    });

    it("should respond with proper error for insufficient role permissions", async () => {
        //Arrange
        mockResponse.locals = {uid: "user321", role: "user"};

        //Act
        await approveLoanApplication(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        //Assert
        expect(nextFunction).toHaveBeenCalledWith(expect.any(AuthorizationError));
    });
});