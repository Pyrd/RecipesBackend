/* eslint-disable @typescript-eslint/no-var-requires */
const puppeteer = require('puppeteer');
const fs = require('fs');

const base_url = 'https://www.marmiton.org';

async function fetchAllLinks() {
  console.log('[BOT] Handling fetchAllLinks');

  const links = ['/recettes/index/ingredient'];
  const htmllist = await page.$eval('ul.letters-list', (anchors) => {
    console.log('> ', anchors);
    return anchors.innerHTML.split('\n');
  });

  for (let el of htmllist) {
    const matched = el.match(/\/recettes\/[a-zA-Z\/]*/);
    if (matched) {
      links.push(matched[0]);
    }
  }

  return links;
}

async function handlesCookie() {
  console.log('[BOT] Handling cookies');
  await page.click('#didomi-notice-agree-button');
}

async function fetchIngredientsFromStep() {
  // console.log('[BOT] Handling fetchIngredientsFromStep');
  const ingredients = [];

  const current_step_ingredients = await page.evaluate(() => {
    let data = [];
    let elements = document.getElementsByClassName('index-item-card');
    for (var element of elements)
      data.push(element.innerHTML.replace('\n\n', '\n').split('\n'));

    return data;
  });
  const parsed = current_step_ingredients.map((e) => e.join(''));
  for (let el of parsed) {
    const title = el.match(/title="([a-zA-Z éè&-êâ]*)"/);
    const link = el.match(/\/recettes\/[a-zA-Z\/]*/);
    const image = el.match(/https:\/\/[a-zA-Z0-9_.\/]*/);

    const ingredient = {
      title: '',
      link: '',
      image: '',
    };
    if (title) {
      ingredient.title = title[1].replace('amp;', '');
    }
    if (link) {
      ingredient.link = link[0];
    }
    if (image) {
      ingredient.image = image[0];
    }

    ingredients.push(ingredient);
  }
  return ingredients;
}

async function fetchIngredientFromLetter(link) {
  console.log(`[BOT] Handling fetchIngredientFromLetter with link: ${link}`);
  await page.goto(`${base_url}${link}`);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'example.png' });

  const ingredients = [];
  // Handle next page
  let current_step = 1;
  const split_link = link.split('/');
  const letter =
    split_link.length == 4 ? 'A' : split_link[split_link.length - 1];
  let continue_process = true;
  while (continue_process) {
    const current_step_ingredients = await fetchIngredientsFromStep();

    if (!current_step_ingredients || current_step_ingredients.length == 0) {
      console.log(`End of letter, stop => ${current_step_ingredients}`);
      continue_process = false;
    } else {
      console.log(
        `[${letter}  >>> Step ${current_step} - Processed currently : ${current_step_ingredients.length} | Total = ${ingredients.length}`,
      );
      ingredients.push(...current_step_ingredients);
      current_step += 1;
      await page.goto(`${base_url}${link}/${current_step}`);
      console.log(`${base_url}${link}/${current_step}`);
    }
  }

  console.log(ingredients);
  return ingredients;
}

async function scrapIngredients() {
  await page.goto(`${base_url}/recettes/index/ingredient/a`);
  await handlesCookie();
  const ingredients = [];
  let count = 0;
  const links = await fetchAllLinks();
  for (let link of links) {
    const split_link = link.split('/');
    const letter =
      split_link.length == 4 ? 'A' : split_link[split_link.length - 1];

    const current_letter_ingredients = await fetchIngredientFromLetter(link);
    ingredients.push({
      letter: letter,
      ingredients: current_letter_ingredients,
    });
    count += current_letter_ingredients.length;
    console.log(`[${letter}] Total = ${count}`);
  }
  return ingredients;
}

let browser, page;

async function saveInFile(data) {
  fs.writeFileSync('results.json', data);
  console.log('File written successfully\n');
}

async function main() {
  try {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    // await page.tracing.start({
    //     path: 'trace.json',
    //     categories: ['devtools.timeline']
    // })
    const results = await scrapIngredients();
    await saveInFile(JSON.stringify(results, null, 2));

    // await page.tracing.stop()
    await browser.close();
  } catch (err) {
    console.error(err);
    await browser.close();
  }
}

main();
