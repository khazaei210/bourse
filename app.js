const main = async function (user, pass, borse){


const puppeteer = require('puppeteer')
const path = require('path')
const src = path.join(__dirname, 'image.png')
const { createWorker } = require('tesseract.js');



const worker = createWorker();

const getCaptcha = async () => {
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const { data: { text } } = await worker.recognize(src);
  await worker.terminate();
  return text 
  
};

(async function (user, pass, borse){
    console.log(user, pass ,borse)
    try{
        
        const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
        const page = await browser.newPage();
        
         page.waitForNavigation();
        
        await page.goto('https://online.agah.com/Auth/login#/aap/login');
       
        await  page.screenshot({
            path: './image.png',
            clip: {x: 510, y: 195, width: 80, height: 36}
        });
        let text = await getCaptcha();
    
        console.log('here')
        await page.type('.login-part #username', user);
    
    
        await page.type('.login-part #password', pass);
    
    
        await page.evaluate((el)=>{
            document.querySelector('#captcha').value = parseInt(el)
        }, text)
        console.log(borse)
       await page.click('#submit-btn')
        await page.waitForNavigation()
        
        await page.waitForSelector('.splitter_panel > .marketWatch > .instrument-search-box > .search-part > .Font')
        await page.click('.splitter_panel > .marketWatch > .instrument-search-box > .search-part > .Font')
        await page.waitForSelector('input[type="search"]')
        await page.focus('input[type="search"]')
        await page.keyboard.type(borse).then(async()=>{
            await page.evaluate(()=>{
                document.querySelector('tbody>tr:nth-child(1)').click()
            })
        })
        await page.click('.btn-buy')
        await page.waitForSelector('.row > .column > .quantity-part:nth-child(1) > .type > .ng-pristine')
        await page.type('.row > .column > .quantity-part:nth-child(1) > .type > .ng-pristine', '15500')
        await page.waitForSelector('.row > .column > .quantity-part:nth-child(2) > .type > .ng-pristine')
        await page.type('.row > .column > .quantity-part:nth-child(2) > .type > .ng-pristine', '500')
        await page.waitForSelector('.row > .column > .switch-container > .btn-part > .btn:nth-child(3)')
        await page.click('.row > .column > .switch-container > .btn-part > .btn:nth-child(3)').then(async ()=>{
             page.waitForSelector('.modal-content > .ready > div > .modalFooter > .btnAccept').then(async()=>{
                await page.evaluate(()=>{
                    document.querySelector('.modal-content > .ready > div > .modalFooter > .btnAccept').click()
                }).then(()=> browser.close())

            })
        })
        
        // await page.waitForSelector('.modal-content > .ready > div > .modalFooter > .btnAccept')
        // page.click('.modal-content > .ready > div > .modalFooter > .btnAccept')

       console.log('finish')
     

    }catch(e){

    console.log(e) 
    }
    
})(user, pass, borse);
}
module.exports = main