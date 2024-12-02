const request = require('supertest');
const express = require('express');
const app = require('./app');  // Import your Express app here

describe('POST /api/seats/allocate-seats', () => {
    it('should allocate seats successfully', async () => {
        // Test data to be sent in the request body
        const requestData = {
            classrooms: [
                {
                    threeSeaters: 5,
                    fiveSeaters: 4
                }
            ]
        };

        // Sending POST request to the API
        const response = await request(app)
            .post('/api/seats/allocate-seats')
            .send(requestData)  // Send request data as JSON
            .set('Content-Type', 'application/json');  // Set the content type to JSON

        // Asserting the response
        expect(response.statusCode).toBe(200);  // Assert that status code is 200
        expect(response.body.message).toBe('Seat allocation successful');  // Assert the success message
        expect(response.body.allocations).toBeDefined();  // Ensure allocations data is in the response
        expect(response.body.allocations.length).toBeGreaterThan(0);  // Ensure allocations array is not empty
    });
});
