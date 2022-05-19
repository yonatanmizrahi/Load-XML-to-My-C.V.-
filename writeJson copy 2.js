'use strict';

const fs = require('fs');
let file = fs.readFileSync('xmltojson.json');
let data = JSON.parse(file);

const writeFile = (fileName, dataToSave) => {

    let data = JSON.stringify(dataToSave, null, 2);

    fs.writeFile(`${fileName}.json`, data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });

    console.log('This is after the write call');
}

const validateEmail = (emailToCheck) => {
    // console.log('emailToCheck:', emailToCheck)
    if (emailToCheck === undefined) {
        return false
    } else {
        return emailToCheck.includes('@israntique.org.il')
    }
}

const saveYear = (year) => {
    if (!ArticlesYears.includes(year)) {
        ArticlesYears.push(year)
    }
}

const sites = []
const articles = []

const getArticles = (collection, sheetName) => {
    // console.log('COLLECTION:', collection)

    if (collection['Sites']) {


        if (collection['Sites']['HadashotSite']) {
            for (let l = 0; l < collection['Sites']['HadashotSite'].length; l++) {
                const subSite = collection['Sites']['HadashotSite'][l];
                console.log('subSite:', subSite)
                getArticles(subSite, collection['SheetNameEng'])

            }
        }

        if (collection['Sites']['HadashotSheet']) {
            for (let l = 0; l < collection['Sites']['HadashotSheet'].length; l++) {
                const subSite = collection['Sites']['HadashotSheet'][l];
                console.log('subSite:', subSite)
                getArticles(subSite, collection['SheetNameEng'])

            }
        }
    }

    if (collection['Articles']) {
        saveArticles(collection, sheetName)
    }
}

const saveArticles = (collection, SheetNameEng) => {
    console.log('collection:', collection)
    console.log('SheetNameEng:', SheetNameEng)

    if (Array.isArray(collection['Articles']['HadashotArticle'])) {

        for (let k = 0; k < collection['Articles']['HadashotArticle'].length; k++) {
            const articleFromArr = collection['Articles']['HadashotArticle'][k];
            // console.log('articleFromArr:', articleFromArr)
            // articles.push(articleFromArr)
            articles.push({
                ...articleFromArr,
                HeadLineEng: typeof articleFromArr.HeadLineEng === 'object' ? articleFromArr.HeadLineEng['#text'] : articleFromArr.HeadLineEng,
                SheetNameEng: SheetNameEng
            })
        }

    } else if (collection['Articles']['HadashotArticle']) {
        // console.log('lone collection: ', collection['Articles']['HadashotArticle']);
        articles.push({
            ...collection['Articles']['HadashotArticle'],
            HeadLineEng: typeof collection['Articles']['HadashotArticle'].HeadLineEng === 'object' ? collection['Articles']['HadashotArticle'].HeadLineEng['#text'] : collection['Articles']['HadashotArticle'].HeadLineEng,
            SheetNameEng: SheetNameEng
        })
    }
}


for (let i = 0; i < data['Hadashot']['Sheets']['HadashotSheet'].length; i++) {
    const collection = data['Hadashot']['Sheets']['HadashotSheet'][i];

    if (collection['HadashotSheet']) {
        for (let l = 0; l < collection['HadashotSheet'].length; l++) {
            const newSite = collection['HadashotSheet'][l];
            getArticles(newSite, collection['SheetNameEng'])
        }
    }

    for (let j = 0; j < collection['Sites']['HadashotSite'].length; j++) {
        const site = collection['Sites']['HadashotSite'][j];
        // console.log('site:', site)

        if (Array.isArray(site['Articles']['HadashotArticle'])) {

            for (let k = 0; k < site['Articles']['HadashotArticle'].length; k++) {
                const articleFromArr = site['Articles']['HadashotArticle'][k];
                // console.log('articleFromArr:', articleFromArr)
                // articles.push(articleFromArr)
                articles.push({
                    ...articleFromArr,
                    HeadLineEng: typeof articleFromArr.HeadLineEng === 'object' ? articleFromArr.HeadLineEng['#text'] : articleFromArr.HeadLineEng,
                    SheetNameEng: collection['SheetNameEng']
                })
            }

        } else if (site['HadashotSite']) {
            for (let l = 0; l < site['HadashotSite'].length; l++) {
                const newSite = site['HadashotSite'][l];
                // console.log('SITE:', newSite)
                getArticles(newSite, collection['SheetNameEng'])


            }

        } else if (site['HadashotSheet']) {
            for (let l = 0; l < site['HadashotSheet'].length; l++) {
                const newSite = site['HadashotSheet'][l];
                // console.log('SITE:', newSite)
                getArticles(newSite, collection['SheetNameEng'])

            }

        } else if (site['Articles']['HadashotArticle']) {
            // console.log('lone site: ', site['Articles']['HadashotArticle']);
            // articles.push(site['Articles']['HadashotArticle'])
            articles.push({
                ...site['Articles']['HadashotArticle'],
                HeadLineEng: typeof site['Articles']['HadashotArticle'].HeadLineEng === 'object' ? site['Articles']['HadashotArticle'].HeadLineEng['#text'] : site['Articles']['HadashotArticle'].HeadLineEng,
                SheetNameEng: collection['SheetNameEng']
            })
        }

    }
}

writeFile('AllArticles', articles)
console.log('AllArticles:', articles.length)