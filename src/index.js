'use strict'

const puppeteer = require('puppeteer')
const fs = require('fs').promises
const request = require('request')
const imageDownloader  = require('image-downloader')
const https  = require('https')



function downloadImg(img, callback) {
        request.head(img, function(err, res, body) {
        request(img)
        .pipe(fs.createWriteStream(img))
        .on("close", callback)
    });
    }


(async () => {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            ignoreHTTPSErrors: true,
            executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'
            
        });



        const page = await browser.newPage()
        page.on('requestfailed', (req, resp) => {
            let failureText = req.failure().errorText;
            if (failureText == 'net::ERR_ABORTED' || failureText == 'net::ERR_CERTIFICATE_TRANSPARENCY_REQUIRED') {
                redirects[req.url()] = {
                    url: req.url(),
                    status: req.response() ? req.response().status() : 200
                }
            }
        });

        page.on('response', response => {
            let responseHeaders = response.headers()
            redirects[response.request().url()] = {
                url: response.request().url(),
                status: response.status()
            }
        });


        let pageURL = 'https://satsp.fazenda.sp.gov.br/COMSAT/Public/ConsultaPublica/ConsultaPublicaCfe.aspx'
        await page.goto(pageURL)
        await page.focus('#conteudo_txtChaveAcesso')
        page.keyboard.type('3519 0321 4818 6100 0109 5900 0064 1034 7295 5248 0672')
        const img = document.querySelector('img[id="conteudo_myImage1"]')
        console.log(img)
        

        await page.evaluate(async() => {
            downloadImg(img), "test.png", function(){
                console.log('Deu Certo')
            }
            
           await request.head(img.get, async function(err, res, body) {
                request(img)
                .pipe(fs.createWriteStream('test.png'))
                .on("close", () => {
                    return 'acabou'
                })
             });
            
        })
          console.log('teste 1 ')
         downloadImg(img)
   /*
        const options = {
            url: 'https://satsp.fazenda.sp.gov.br/COMSAT/Public/ConsultaPublica/ConsultaPublicaCfe.aspx',
            dest: 'C:/Users/User/Documents/Projetos/puppeteer' 
                      
                    
        }
        
        downloadImg.img(options)
            .then(({ img, imageDownloader }) => {
            console.log('Imagem salva ', img)
            })
        
       */
    } catch (e) {
        console.log(e)
        return false

    }

    return true
    //await browser.close();
    //return redirects

    



})();