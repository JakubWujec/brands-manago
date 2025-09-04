import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import request from "supertest";
import { beforeEach, describe, it, vi } from "vitest";
import User from "../src/schema/users.schema";

import app from "../src/app.js";

describe("POST /signin", () => {
    let user;
    const URL = "/api/v1/auth/signin"

    beforeEach(() => {
        user = {
            _id: '12345',
            username: 'testuser',
            email: 'test@example.com',
            password: bcrypt.hashSync('password123', 8), // Hash the password
        };

        // Mock the User model's findOne method
        vi.spyOn(User, 'findOne').mockImplementation(async (query) => {
            if (query.username === user.username) {
                return user;
            }
            return null;
        });

        // Mock bcrypt.compareSync
        vi.spyOn(bcrypt, 'compareSync').mockImplementation((password, hashedPassword) => {
            return password === 'password123' && hashedPassword === user.password;
        });

        // Mock jwt.sign
        vi.spyOn(jwt, 'sign').mockImplementation(() => 'mocked_token');
    });

    it("responds with a json object containing user details and token for valid credentials", () =>
        request(app)
            .post(URL)
            .send({ username: "testuser", password: "password123" })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, {
                id: user._id,
                username: user.username,
                email: user.email,
                accessToken: "mocked_token",
            })
    );

    it("responds with 404 if user is not found", () =>
        request(app)
            .post(URL)
            .send({ username: "nonexistentuser", password: "password123" })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(404, {
                message: "User Not found.",
            })
    );

    it("responds with 401 for invalid password", () =>
        request(app)
            .post(URL)
            .send({ username: "testuser", password: "wrongpassword" })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(401, {
                accessToken: null,
                message: "Invalid Password!",
            })
    );

    it("responds with 500 for server error", () => {
        vi.spyOn(User, 'findOne').mockImplementationOnce(() => {
            throw new Error('Database error');
        });

        return request(app)
            .post(URL)
            .send({ username: "testuser", password: "password123" })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(500, {
                message: 'Database error',
            });
    });
});
