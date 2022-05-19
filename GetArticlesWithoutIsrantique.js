'use strict';

const fs = require('fs');

let file = fs.readFileSync('AllArticles.json');
let data = JSON.parse(file);

const WithIsrantiqueUsers = true

const writeFile = (fileName, dataToSave) => {

    let data = JSON.stringify(dataToSave, null, 2);

    fs.writeFile(`${fileName}.json`, data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });

    console.log('This is after the write call');
}

const validateEmail = (emailToCheck) => {
    console.log('emailToCheck:', emailToCheck)
    if (emailToCheck === undefined) {
        return false
    } else {
        return emailToCheck.includes('@israntique.org.il')
    }
}

const FilteredArticles = []


for (let j = 0; j < data.length; j++) {
    const currentArticle = data[j];

    if (Array.isArray(currentArticle.Writters.ArticleWritter)) {
        // console.log('currentArticle.Writters: ARRAY', currentArticle.Writters.ArticleWritter)
        const IsSomeIsrantique = currentArticle.Writters.ArticleWritter.some(Wrriter => validateEmail(Wrriter.WritterEmail))
        // console.log('IsSomeIsrantique:', IsSomeIsrantique)
        if (IsSomeIsrantique === WithIsrantiqueUsers) {
            FilteredArticles.push(currentArticle)
        }

    } else if (typeof currentArticle.Writters.ArticleWritter === 'object') {
        // console.log('currentArticle.Writters: OBJECT', currentArticle.Writters.ArticleWritter)
        if (validateEmail(currentArticle.Writters.ArticleWritter.WritterEmail) === WithIsrantiqueUsers) {
            FilteredArticles.push(currentArticle)
        }
    } else {
        // console.log('currentArticle.Writters: ELSE ', currentArticle.Writters.ArticleWritter)
    }

}


console.log('Filtered', FilteredArticles);
console.log('Filtered', FilteredArticles.length);
writeFile('Filtered', FilteredArticles)