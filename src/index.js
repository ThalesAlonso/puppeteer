'use strict'
const puppeteer = require('puppeteer')
const fs = require('fs')
const request = require('request')

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://painel.upwifi.com.br/login_db.php');
    await page.screenshot({path: 'index.png'});
  
    await browser.close();
  })();