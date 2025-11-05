import request from "supertest";
import app from "../src/app";
import { auth } from "../src/config/firebaseConfig";

jest.mock("../src/config/firebaseConfig");

describe("Authentication and Authorization Integration Tests", () => {
    it("should return 401 with proper error format when no token provided", async () => {
        // Act
        const response = await request(app)
            .post("/api/v1/loans")
            .send({ name: "Test Name", amount: "100" });

        // Assert
        expect(response.status).toBe(401);
        expect(response.body).toMatchObject({
            success: false,
            error: {
                message: "Unauthorized: No token provided",
                code: "TOKEN_NOT_FOUND",
            },
            timestamp: expect.any(String),
        });
    });

    it("should return 403 with proper error format when user lacks role", async () => {
        // Arrange
        // User role, but route requires admin/manager
        (auth.verifyIdToken as jest.Mock).mockResolvedValueOnce({
            uid: "user123",
            role: "user"
        });

        // Act
        const response = await request(app)
            .put("/api/v1/manager/loans/1")
            .set("Authorization", "Bearer valid-token");

        // Assert
        expect(response.status).toBe(403);
        expect(response.body).toMatchObject({
            success: false,
            error: {
                message: "Forbidden: Insufficient role",
                code: "INSUFFICIENT_ROLE",
            },
            timestamp: expect.any(String),
        });
    });

    it("should succeed when user has proper role and token", async () => {
        // Arrange
        (auth.verifyIdToken as jest.Mock).mockResolvedValueOnce({
            uid: "user789",
            role: "manager",
        });

        // Act
        const response = await request(app)
            .put("/api/v1/manager/loans/1")
            .set("Authorization", "Bearer valid-admin-token");

        // Assert
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    });
});