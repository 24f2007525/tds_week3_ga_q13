const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const seeds = [61, 62, 63, 64, 65, 66, 67, 68, 69, 70];
  let totalSum = 0;

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed={seed}`;
    try {
      await page.goto(url, { waitUntil: 'networkidle' });

      // Target the table specifically to avoid page headers/footers
      const tableText = await page.locator('table').innerText();
      
      // Match all numbers (including decimals)
      const numbers = tableText.match(/\d+(\.\d+)?/g);
      
      if (numbers) {
        const pageSum = numbers
          .map(n => parseFloat(n))
          .reduce((sum, current) => sum + current, 0);
          
        totalSum += pageSum;
        console.log(`Seed ${seed}: Found ${numbers.length} numbers, Page Sum = ${pageSum}`);
      }
    } catch (err) {
      console.error(`Failed to process Seed ${seed}: ${err.message}`);
    }
  }

  // Formatting strictly for the automated log parser
  console.log("----------------------------------------");
  console.log(`TOTAL_SUM=${totalSum}`);
  console.log("----------------------------------------");

  await browser.close();
})();
