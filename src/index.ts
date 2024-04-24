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
  const option = readlineSync.questionInt('Enter your option: ');
  switch (option) {
    case 1:
      await handleLatestPurchase(userId);
      break;
    case 2:
      await handleSearchProduct();
      break;
    case 3:
      console.log('\nSigning off  👋👋👋👋👋');
      await browser.close();
      return;
    default:
      console.log('\nInvalid options entered 🫣🫣🫣');
  }
  options(page, userId, browser);
}

async function handleLatestPurchase(userId: string) {
  const purchaseHistory = await getPurchaseHistory(userId);
  console.log('Latest purchased items:\n----------');
  if (purchaseHistory === null || purchaseHistory.length === 0) {
    console.log('No recent purchase');
  } else {
    purchaseHistory.forEach(e =>
      console.log(
        `Name: ${e.name}\nPrice: ${e.price}\nProduct Link: ${e.link}\n----------`
      )
    );
  }
}

async function handleSearchProduct() {
  const searchText = readlineSync.question('\nEnter search text: ');
  console.log('searchText', searchText);
  if (searchText.trim().length === 0) {
    console.log('Enter valid input...');
    return;
  }

  const searchList = await searchItems(searchText);
  if (searchList === null || searchList.length === 0) {
    console.log('No product found...');
  } else {
    console.log('\nSearch product: \n----------');
    searchList.forEach(e =>
      console.log(`Name: ${e.name}\nPrice: ${e.price}\n----------`)
    );
  }
}

async function main() {
  const username = readlineSync.question('Enter username: ');
  const password = readlineSync.question('Enter password: ', {
    hideEchoBack: true,
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  if (username.trim().length === 0 || password.trim().length === 0) {
    console.log('Invalid Username or Password...');
    await browser.close();
    return;
  }

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
