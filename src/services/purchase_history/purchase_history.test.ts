import * as puppeteer from 'puppeteer';
import getPurchaseHistory from './purchase_history';

jest.mock('puppeteer');

describe('getPurchaseHistory', () => {
  it('should return an array of purchase items', async () => {
    const mockPage = {
      $$: jest.fn().mockResolvedValue([
        {
          textContent:
            'Name: Item1 - Price: $10.00 - Quantity: 1 - Link: link1',
        },
        {
          textContent:
            'Name: Item2 - Price: $20.00 - Quantity: 2 - Link: link2',
        },
      ]),
      evaluate: jest.fn(),
      goto: jest.fn().mockResolvedValue(null),
    };

    const mockBrowser = {
      newPage: jest.fn().mockResolvedValue(mockPage),
      close: jest.fn(),
    };

    (puppeteer.launch as jest.Mock).mockResolvedValue(mockBrowser);

    const userId = 'user123';
    const result = await getPurchaseHistory(userId);

    expect(result?.length).toEqual(2);
  });

  it('should return an empty list', async () => {
    const mockPage = {
      $$: jest.fn().mockResolvedValue([]),
      evaluate: jest.fn(),
      goto: jest.fn().mockResolvedValue(null),
    };

    const mockBrowser = {
      newPage: jest.fn().mockResolvedValue(mockPage),
      close: jest.fn(),
    };

    (puppeteer.launch as jest.Mock).mockResolvedValue(mockBrowser);

    const userId = 'user123';
    const result = await getPurchaseHistory(userId);

    expect(result?.length).toEqual(0);
  });

  it('should return null', async () => {
    const mockPage = {
      $$: jest.fn().mockResolvedValue(null),
      evaluate: jest.fn(),
      goto: jest.fn().mockResolvedValue(null),
    };

    const mockBrowser = {
      newPage: jest.fn().mockResolvedValue(mockPage),
      close: jest.fn(),
    };

    (puppeteer.launch as jest.Mock).mockResolvedValue(mockBrowser);

    const userId = 'user123';
    const result = await getPurchaseHistory(userId);

    expect(result).toBeNull;
  });
});
