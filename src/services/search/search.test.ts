import * as puppeteer from 'puppeteer';
import searchItems from './search';
import {SEARCH_LIST_URL} from '../../utils/constants';

jest.mock('puppeteer');

describe('searchItems', () => {
  it('should return an array of search items', async () => {
    const mockPage = {
      type: jest.fn().mockResolvedValue(null),
      click: jest.fn().mockResolvedValue(null),
      $$: jest
        .fn()
        .mockResolvedValue([
          {textContent: 'Name: Item1 - Price: $10.00'},
          {textContent: 'Name: Item2 - Price: $20.00'},
        ]),
      evaluate: jest.fn(),
      goto: jest.fn().mockResolvedValue(null),
    };

    const mockBrowser = {
      newPage: jest.fn().mockResolvedValue(mockPage),
      close: jest.fn(),
    };

    (puppeteer.launch as jest.Mock).mockResolvedValue(mockBrowser);

    const query = 'search query';
    const result = await searchItems(query);

    expect(result?.length).toEqual(2);

    expect(mockPage.goto).toHaveBeenCalledWith(SEARCH_LIST_URL);

    expect(mockPage.type).toHaveBeenCalledWith('#searchInput', query);

    expect(mockPage.click).toHaveBeenCalledWith('button');
  });

  it('should return an empty list', async () => {
    const mockPage = {
      type: jest.fn().mockResolvedValue(null),
      click: jest.fn().mockResolvedValue(null),
      $$: jest.fn().mockResolvedValue([]),
      evaluate: jest.fn(),
      goto: jest.fn().mockResolvedValue(null),
    };

    const mockBrowser = {
      newPage: jest.fn().mockResolvedValue(mockPage),
      close: jest.fn(),
    };

    (puppeteer.launch as jest.Mock).mockResolvedValue(mockBrowser);

    const query = 'search query';
    const result = await searchItems(query);

    expect(result?.length).toEqual(0);

    expect(mockPage.goto).toHaveBeenCalledWith(SEARCH_LIST_URL);

    expect(mockPage.type).toHaveBeenCalledWith('#searchInput', query);

    expect(mockPage.click).toHaveBeenCalledWith('button');
  });

  it('should return null', async () => {
    const mockPage = {
      type: jest.fn().mockResolvedValue(null),
      click: jest.fn().mockResolvedValue(null),
      $$: jest.fn().mockResolvedValue(null),
      evaluate: jest.fn(),
      goto: jest.fn().mockResolvedValue(null),
    };

    const mockBrowser = {
      newPage: jest.fn().mockResolvedValue(mockPage),
      close: jest.fn(),
    };

    (puppeteer.launch as jest.Mock).mockResolvedValue(mockBrowser);

    const query = 'search query';
    const result = await searchItems(query);

    expect(result).toBeNull;

    expect(mockPage.goto).toHaveBeenCalledWith(SEARCH_LIST_URL);

    expect(mockPage.type).toHaveBeenCalledWith('#searchInput', query);

    expect(mockPage.click).toHaveBeenCalledWith('button');
  });
});
