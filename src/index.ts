import * as puppeteer from 'puppeteer';
import * as readlineSync from 'readline-sync';
import login from './services/login/login';
import getPurchaseHistory from './services/purchase_history/purchase_history';
import searchItems from './services/search/search';

export async function options(
  page: puppeteer.Page,
  userId: string,
  browser: puppeteer.Browser
) {
  console.log('\n------------------------------------------');
  console.log(
    'Select \n1 for Latest Purchase\n2 for Search Product\n3 for Exit\n'
  );
  const option = readlineSync.question('Enter your option: ');
  if (parseInt(option) === 1) {
    const purchaseHistory = await getPurchaseHistory(userId);
    console.log('Latest purchased items:');
    console.log('----------');
    if (purchaseHistory === null || purchaseHistory.length === 0) {
      console.log('No recent purchase');
    } else {
      purchaseHistory.forEach(e =>
        console.log(
          'Name: ',
          e.name,
          '\nPrice: ',
          e.price,
          '\nProduct Link: ',
          e.link,
          '\n----------'
        )
      );
    }
    options(page, userId, browser);
  } else if (parseInt(option) === 2) {
    const searchText = readlineSync.question('Enter search text: ');
    const searchList = await searchItems(searchText);
    if (searchList === null || searchList.length === 0) {
      console.log('No product found...');
    } else {
      console.log('\nSearch product:');
      console.log('----------');
      searchList.forEach(e =>
        console.log('Name: ', e.name, '\nPrice: ', e.price, '\n----------')
      );
    }
    options(page, userId, browser);
  } else if (parseInt(option) === 3) {
    console.log('\nSigning off  👋👋👋👋👋');
    await browser.close();
  } else {
    console.log('\nInvalid options entered 🫣🫣🫣');
    options(page, userId, browser);
  }
}

async function main() {
  const username = readlineSync.question('Enter username: ');
  const password = readlineSync.question(
    'Enter password: ',
    { hideEchoBack: true }
  );

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    const userId: string | null = await login(page, username, password);
    if (userId !== null) {
      options(page, userId, browser);
    } else {
      console.log('Invalid Username or Password...');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await browser.close();
  }
}

main();
