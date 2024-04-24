import * as puppeteer from 'puppeteer';
import login from './login';

const mockPage: puppeteer.Page = {
  goto: jest.fn(),
  type: jest.fn(),
  click: jest.fn(),
  evaluate: jest.fn(),
} as any;

describe('login', () => {
  it('should return null if invalid user', async () => {
    mockPage.evaluate = jest.fn().mockResolvedValueOnce('Invalid User');

    const result = await login(mockPage, 'fake', 'fake@123');

    expect(result).toBeNull;
  });

  it('should return userId if login successful', async () => {
    mockPage.evaluate = jest
      .fn()
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce('2');

    const result = await login(mockPage, 'test', 'test123');

    expect(result).toBe('2');
  });

  it('should return null after login successful', async () => {
    mockPage.evaluate = jest.fn().mockResolvedValueOnce(null);

    const result = await login(mockPage, 'test', 'test123');

    expect(result).toBeNull;
  });
});
