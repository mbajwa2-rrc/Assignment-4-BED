import { Request, Response } from "express";
import {setCustomClaims, getUserDetails} from "src/api/v1/controllers/adminRoleController";
import {auth} from "../src/config/firebaseConfig";

// Mock Firebase auth
jest.mock("../config/firebaseConfig", () => ({
    auth: {
        setCustomUserClaims: jest.fn(),
        getUser: jest.fn(),
    },
}));

describe("User Role Tests", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: jest.Mock;

    beforeEach(() => {
        mockRequest = {
            body: {},
            params: {},
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        nextFunction = jest.fn();
    });

    it("should correctly set custom claims", async () => {
        //Arrange
        mockRequest.body = {uid: "user123", claims: {manager: true}};
        (auth.setCustomUserClaims as jest.Mock).mockResolvedValueOnce(undefined);

        // Act
        await setCustomClaims(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // Assert
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "Custom claims set for user: user123",
            success: true
        });
        expect(auth.setCustomUserClaims).toHaveBeenCalledWith(
            "user123", 
            {manager: true}
        );
    });

    it("should correctly retrieve custom claims", async () => {
        //Arrange
        mockRequest.params = {uid: "user123"};
        (auth.getUser as jest.Mock).mockResolvedValueOnce({
            uid: "user123",
            claims: {manager: true}
        });

        // Act
        await getUserDetails(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // Assert
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            success: true,
            data: {
                uid: "user123", 
                claims: {manager: true}
            }
        });
    });

    it("should correctly handle errors", async () => {
        //Arrange
        mockRequest.body = {uid: "user123", claims: {manager: true}};
        const error = new Error("An error has occurred");
        (auth.setCustomUserClaims as jest.Mock).mockRejectedValueOnce(error);

        // Act
        await setCustomClaims(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // Assert
        expect(nextFunction).toHaveBeenCalledWith(error);
    });
});