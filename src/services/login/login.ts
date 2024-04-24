import * as puppeteer from 'puppeteer';
import {LOGIN_URL} from '../../utils/constants';

async function login(
  page: puppeteer.Page,
  username: string,
  password: string
): Promise<string | null> {
  await page.goto(LOGIN_URL);

  await page.type('#username', username);
  await page.type('#password', password);

  await Promise.all([page.click('input[type="submit"]')]);

  const invalidUser = await page.evaluate(() => {
    return document.getElementById('invalidUser')?.textContent || null;
  });
  if (invalidUser !== null) {
    return null;
  }
  const userId = await page.evaluate(() => {
    return document.getElementById('nameDisplay')?.textContent || null;
  });
  return userId;
}

export default login;
