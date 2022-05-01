const puppeteer = require('puppeteer');
const url = 'https://codequiz.azurewebsites.net/';
let keyword = '';
if(process.argv && process.argv.length > 2){
    keyword = process.argv[2]
}

async function main() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(url);

    try{
        const [button] = await page.$x("//input");
        if (button) {
            await button.click();
            await page.waitForNavigation({waitUntil: 'domcontentloaded'});

            await page.waitForSelector('td' , {  visible: true , timeout: 0 });

            const result = await page.evaluate(() => {
                const rows = document.querySelectorAll('table tr');
                return Array.from(rows, row => {
                  const columns = row.querySelectorAll('td,th');
                  return Array.from(columns, column => column.innerText);
                });
              });
            
            const columnIndex = result[0].findIndex(x => String(x).toLowerCase() == 'nav')
            for(i=0; i<result.length; i++){
                if(result[i][0] === keyword){
                    console.log(result[i][columnIndex])
                    break;
                }
            }
        }
    
    }
    catch (error) {
        console.log(error);
    } 
    finally {
        await browser.close();
    }

}

main();
