import request from 'supertest';
import app from '../src/app';
import { response } from 'express';

describe('Social API', () => {

    describe('POST /api/unconnectedPeople', () => {
        it('shuold return count of unconnected people', async () => {
            const response = await request(app)
                .post('/api/unconnectedPeople')
                .send({ networks: ['facebook'] })


            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('unconnectedCount')
            expect(typeof response.body.unconnectedCount).toBe('number');

        })
    })

    describe('POST /api/getSocialInfluence', () => {
        it('should return first degree and second degree connections', async () => {
            const response = await request(app)
            .post('/api/getSocialInfluence')
            .send({ person: 'John', networks: ['facebook'] })
            
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('firstDegreeCount');
            expect(response.body).toHaveProperty('secondDegreeCount');
            expect(typeof response.body.firstDegreeCount).toBe('number');
            expect(typeof response.body.secondDegreeCount).toBe('number');
        })
    })
})