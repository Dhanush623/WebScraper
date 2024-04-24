import * as puppeteer from 'puppeteer';
import PurchaseInterface from '../../interface/purchase_interface';
import { PURCHASED_LIST_URL } from '../../utils/constants';

async function getPurchaseHistory(
  userId: string
): Promise<PurchaseInterface[] | null> {
  const purchasedItems: PurchaseInterface[] = [];
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.goto(PURCHASED_LIST_URL + '?id=' + userId);

  const purchasedListItems = await page.$$('#purchasedList li');
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
      const quantity =
        element.querySelector('#quantity')?.textContent?.split(': ')[1] || '';
      const link =
        element.querySelector('#link')?.textContent?.split(': ')[1] || '';
      return {
        name,
        price,
        quantity,
        link,
      };
    }, itemElement);
    purchasedItems.push(item);
    counter++;
  }
  await browser.close();
  return purchasedItems;
}

export default getPurchaseHistory;
