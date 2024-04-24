import * as puppeteer from 'puppeteer';
import {SEARCH_LIST_URL} from '../../utils/constants';
import SearchInterface from '../../interface/search_interface';

async function searchItems(query: string): Promise<SearchInterface[] | null> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(SEARCH_LIST_URL);
  await page.type('#searchInput', query);
  await page.click('button');

  const results: SearchInterface[] = [];

  const purchasedListItems = await page.$$('#searchResults li');

  if (purchasedListItems === null) {
    return null;
  }
  let counter = 0;
  for (const itemElement of purchasedListItems) {
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

export default searchItems;
