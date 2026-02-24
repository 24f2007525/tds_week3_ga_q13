const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const seeds = [61, 62, 63, 64, 65, 66, 67, 68, 69, 70];
  let totalSum = 0;

  for (const seed of seeds) {
    const url = `https://sanand0.github.io{seed}.html`;
    await page.goto(url);
    
    // Extract all numbers from table cells
    const values = await page.$$eval('td', cells => 
      cells.map(cell => {
        const num = parseFloat(cell.innerText.replace(/,/g, ''));
        return isNaN(num) ? 0 : num;
      })
    );
    
    const pageSum = values.reduce((a, b) => a + b, 0);
    totalSum += pageSum;
    console.log(`Seed ${seed}: Page Sum = ${pageSum}`);
  }

  console.log(`FINAL_TOTAL_SUM: ${totalSum}`);
  await browser.close();
})();
