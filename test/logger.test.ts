import { Request, Response } from "express";
import {accessLogger, errorLogger, consoleLogger} from "../src/api/v1/middleware/logger";

describe("logger middleware", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: jest.Mock;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;

    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ json: jsonMock });

        mockRequest = {};
        mockResponse = {
            status: statusMock,
        };
        nextFunction = jest.fn();
    });

    it("should capture requests correctly for accessLogger", () => {
        // Arrange
        const logger = accessLogger;

        // Act
        logger(mockRequest as Request, mockResponse as Response, nextFunction);

        // Assert
        expect(nextFunction).toHaveBeenCalled();
    });

    it("should capture requests correctly for errorLogger", () => {
        // Arrange
        mockResponse.statusCode = 400;
        const logger = errorLogger;

        // Act
        logger(mockRequest as Request, mockResponse as Response, nextFunction);

        // Assert
        expect(nextFunction).toHaveBeenCalled();
    });

    it("should capture requests correctly for consoleLogger", () => {
        // Arrange
        const logger = consoleLogger;

        // Act
        logger(mockRequest as Request, mockResponse as Response, nextFunction);

        // Assert
        expect(nextFunction).toHaveBeenCalled();
    });
});