import request from 'supertest';
import app from '../src/app';
import * as socialController from '../src/controllers/socialController';

jest.mock('../src/controllers/socialController');

const mockedController = socialController as jest.Mocked<typeof socialController>;

describe('Social Network Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('POST /api/getUnconnectedPeople should call getUnconnectedPeople controller', async () => {
    mockedController.getUnconnectedPeople.mockImplementation((req, res) => {      
      res.json({ unconnectedCount: 2 });
      return Promise.resolve();
    });

    const response = await request(app)
      .post('/api/unconnectedPeople')
      .send({ networks: ['facebook'] });

    expect(response.status).toBe(200);
    expect(response.body.unconnectedCount).toBe(2);
    expect(mockedController.getUnconnectedPeople).toHaveBeenCalled();
  });

  it('POST /api/getSocialInfluence should call getSocialInfluence controller', async () => {
    mockedController.getSocialInfluence.mockImplementation((_req, res) => {
      res.json({ firstDegreeCount: 1, secondDegreeCount: 1 });
      return Promise.resolve();
    });

    const response = await request(app)
      .post('/api/getSocialInfluence')
      .send({ person: 'John', networks: ['facebook'] });

    expect(response.status).toBe(200);
    expect(response.body.firstDegreeCount).toBe(1);
    expect(response.body.secondDegreeCount).toBe(1);
    expect(mockedController.getSocialInfluence).toHaveBeenCalled();
  });
});
