const puppeteer = require('puppeteer');
const News = require('../db/models/news').News;


async function articles(){
    try{
        let allNews = [];
        const browser = await puppeteer.launch({headless:true, defaultViewport:null});
        const page = await browser.newPage();
        // Override default user agent 
        page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
        await page.goto('https://africanconservation.org/news/', {waitUntil: 'load'});
        await page.waitForSelector('.et_pb_salvattore_content');
        const articles  = await page.$$('.et_pb_salvattore_content article');

      
        for (const article of articles){
            const div = await article.$('.et_pb_image_container')
            const atag = await div.$('a')
            const postLink = await div.$eval('a', a => a.getAttribute('href'));
            const postImg = await atag.$eval('img', tag => tag.getAttribute('data-lazy-src'))
            const postTitle = await article.$eval('h2 a', a => a.innerText)
            const postDiv = await article.$('.post-content-inner');
            const postContent = await postDiv.$eval('p', p => p.innerText);
            const  news  = {
                postTitle,
                postImg,
                postLink,
                postContent
            }
            await console.log(news)
            await allNews.push(news);
        }
        await allNews.forEach(collection => {
            const each = new News(collection);
            each.save().then( doc => {
                console.log('saving news from acf')
            }).catch(e => {
                console.log(`error trying to save news from acf ${e}`);
            })

        })

    }catch(e){
        console.log(e)
    }

}

articles()
