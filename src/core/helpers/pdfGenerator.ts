import * as puppeteer from 'puppeteer';

export const pdfGenerator = async (html: string, headless = true, options?: puppeteer.WaitForOptions): Promise<Buffer> => {
  const browser = await puppeteer.launch({ headless });
  const page = await browser.newPage();
  await page.setContent(html, options);

  const buffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: {
      left: '0px',
      top: '0px',
      right: '0px',
      bottom: '0px',
    },
  });

  await browser.close();

  return buffer;
};
