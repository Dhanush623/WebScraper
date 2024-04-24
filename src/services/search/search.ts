import * as puppeteer from 'puppeteer';
import SearchInterface from '../../interface/search_interface';
import {SEARCH_LIST_URL} from '../../utils/constants';

async function searchItems(query: string): Promise<SearchInterface[] | null> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(SEARCH_LIST_URL);
  await page.type('#searchInput', query);
  await page.click('button');

  const results: SearchInterface[] = [];
  const searchListItems = await page.$$('#searchResults li');
  if (searchListItems === null) {
    return null;
  }
  let counter = 0;
  for (const itemElement of searchListItems) {
    if (counter >= 10) {
      break;
    }
    const item = await page.evaluate(element => {
      const name =
        element.querySelector('#name')?.textContent?.split(': ')[1] || '';
      const price =
        element.querySelector('#price')?.textContent?.split(': ')[1] || '';
      return {
        name,
        price,
      };
    }, itemElement);
    results.push(item);
    counter++;
  }
  await browser.close();
  return results;
}

function getValue(element: HTMLLIElement, key: string): string {
  return element.querySelector(key)?.textContent?.split(': ')[1] || ''
}

export default searchItems;
