import { describe, it, expect } from 'vitest';

describe('Environment Variables', () => {
    it('should have the correct NODE_ENV', () => {
        expect(process.env.NODE_ENV).toBe('test'); // Adjust based on the environment
    });

    it('should have the correct DATABASE_URL', () => {
        expect(process.env.DATABASE_URL).toBe('mongodb://localhost:27017/testdb'); // Adjust based on the environment
    });
});
