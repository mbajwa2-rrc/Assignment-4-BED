import { Request, Response, NextFunction } from "express";
import {loans} from "../src/api/v1/types/loan"
import * as userController from "../src/api/v1/controllers/userController";
import * as officerController from "../src/api/v1/controllers/officerController";
import * as managerController from "../src/api/v1/controllers/managerController";
import {auth} from "../src/config/firebaseConfig";

describe('Loan Application Controllers', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
    mockReq = {
      params: {},
      body: {},
      query: {}
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
    mockNext = jest.fn();
  });

  describe('User Controller', () => {
    it('should successfully create a loan application', async () => {
      // Arrange
      (auth.verifyIdToken as jest.Mock).mockResolvedValueOnce({
        uid: "user123",
        role: "user"
      });
      mockReq.headers = {authorization: "Bearer valid-token"};
      mockReq.body = {name: "Test Name", amount: 100};

      // Act
      await userController.createLoan(mockReq as Request, mockRes as Response, mockNext);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Loan application created successfully.",
        data: expect.objectContaining({
          id: expect.any(Number),
          name: "Test Name",
          amount: 100,
          status: "unreviewed"
        })
      });
    });
  });

  describe('Officer Controller', () => {
    it('should successfully retrieve all loan applications', async () => {
      // Arrange
      (auth.verifyIdToken as jest.Mock).mockResolvedValueOnce({
        uid: "user456",
        role: "officer"
      });
      mockReq.headers = {authorization: "Bearer valid-token"};

      // Act
      await officerController.getLoanApplications(mockReq as Request, mockRes as Response, mockNext);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Retrieved all applications successfully.",
        data: loans
      });
    });
    it('should successfully review a loan application', async () => {
      // Arrange
      (auth.verifyIdToken as jest.Mock).mockResolvedValueOnce({
        uid: "user456",
        role: "officer"
      });
      mockReq.headers = {authorization: "Bearer valid-token"};
      mockReq.params = {id: "1"};

      // Act
      await officerController.reviewLoanApplication(mockReq as Request, mockRes as Response, mockNext);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Application reviewed successfully.",
        data: {
          id: 1,
          name: "Example Name",
          amount: 100,
          status: "reviewed"
        }
      });
    });
  });

  describe('Manager Controller', () => {
    it('should successfully retrieve all loan applications', async () => {
      // Arrange
      (auth.verifyIdToken as jest.Mock).mockResolvedValueOnce({
        uid: "user789",
        role: "manager"
      });
      mockReq.headers = {authorization: "Bearer valid-token"};

      // Act
      await managerController.getLoanApplications(mockReq as Request, mockRes as Response, mockNext);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Retrieved all applications successfully.",
        data: loans
      });
    });
    it('should successfully approve a loan application', async () => {
      // Arrange
      (auth.verifyIdToken as jest.Mock).mockResolvedValueOnce({
        uid: "user789",
        role: "manager"
      });
      mockReq.params = {id: "1"};

      // Act
      await managerController.approveLoanApplication(mockReq as Request, mockRes as Response, mockNext);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Application approved successfully.",
        data: {
          id: 1,
          name: "Example Name",
          amount: 100,
          status: "approved"
        }
      });
    });
  });
});