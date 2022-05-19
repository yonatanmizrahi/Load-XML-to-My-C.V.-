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

var articlesCount = 0
const NoWritterArticles = []
const WithWritterArticles = []
const allArticles = []

const OnlyIsrantiqueEmail = []
const ArticlesYears = []


const dataArr = data.Hadashot.Sheets.HadashotSheet

const mappedArticles = []

// dataArr.length
for (let i = 0; i < dataArr.length; i++) {
    const element = dataArr[i];
    // console.log('Current element:', i, element)

    for (let j = 0; j < element.Sites.HadashotSite.length; j++) {
        const current = element.Sites.HadashotSite[j];
        // console.log('current:', current)

        // console.log('current.Articles:', current.Articles)
        const article = current.Articles['HadashotArticle']
        console.log('article:', article)

        saveYear(new Date(article['PublishDate']).getFullYear())


        // allArticles.push(article)
        // console.log('article:', article)

        const writters = article['Writters']
        // console.log('writters:', writters)

        // var writter

        // console.log('Typeof Writters: ', typeof writters);

        if (typeof writters === 'object') {
            // console.log('object:', writters)
            // console.log('Writter: ', writters['ArticleWritter']);
            // WithWritterArticles.push(article)

            // console.log('Current writters', writters);
            if (writters['ArticleWritter']) {
                // writter = writters['ArticleWritter']
                // console.log('writter is object: ', writters['ArticleWritter']);
                if (Array.isArray(writters.ArticleWritter)) {
                    // console.log('array', writters.ArticleWritter);

                    const AtleastOneIsrantique = writters.ArticleWritter.some(User => {
                        // console.log('User.WritterEmail:', User.WritterEmail)
                        const IsIsrantiqueUser = validateEmail(User.WritterEmail)
                        return IsIsrantiqueUser
                    })

                    // console.log('AtleastOneIsrantique:', AtleastOneIsrantique)

                    saveYear(new Date(article['PublishDate']).getFullYear())
                    if (AtleastOneIsrantique) {

                        articlesCount++
                        OnlyIsrantiqueEmail.push({
                            ...article,
                            HeadLineEng: typeof article.HeadLineEng === 'object' ? article.HeadLineEng['#text'] : article.HeadLineEng,
                            SheetNameEng: element.SheetNameEng
                        })
                    }

                    // for (let n = 0; n < writters.ArticleWritter.length; n++) {
                    //     const currWritter = writters.ArticleWritter[n];
                    // console.log('currWritter:', currWritter)

                    //     if (validateEmail(currWritter.WritterEmail) === false) {
                    // console.log('currWritter:', currWritter)
                    //         NoIsrantiqueEmail.push(article)
                    //         break;
                    //     }
                    // }

                } else if (typeof writters.ArticleWritter === 'object') {
                    // console.log('writters.ArticleWritter:', writters.ArticleWritter)


                    saveYear(new Date(article['PublishDate']).getFullYear())
                    if (validateEmail(writters.ArticleWritter.WritterEmail)) {
                        // console.log('writters.ArticleWritter.WritterEmail:', writters.ArticleWritter.WritterEmail)

                        articlesCount++

                        OnlyIsrantiqueEmail.push({
                            ...article,
                            HeadLineEng: typeof article.HeadLineEng === 'object' ? article.HeadLineEng['#text'] : article.HeadLineEng,
                            SheetNameEng: element.SheetNameEng
                        })
                    }
                    // console.log('object', writters.ArticleWritter);
                } else {
                    // console.log('empty writter', writters.ArticleWritter);

                }

            } else {

                // console.log('Is empty? ', article);
            }

        } else if (typeof writters === 'undefined') {
            // console.log('undefined: ', article);

            for (let y = 0; y < article.length; y++) {
                const subArticle = article[y];
                // console.log('subArticle:', subArticle)

                if (subArticle.Writters) {
                    if (subArticle.Writters.ArticleWritter) {
                        if (Array.isArray(subArticle.Writters.ArticleWritter)) {

                            // // console.log('array', subArticle.Writters.ArticleWritter);
                            // if (validateEmail(subArticle.Writters.ArticleWritter.WritterEmail) === false) {
                            //     console.log('writters.ArticleWritter.WritterEmail:', subArticle.Writters.ArticleWritter.WritterEmail)
                            //     NoIsrantiqueEmail.push(subArticle)
                            // }

                            // for (let g = 0; g < subArticle.Writters.ArticleWritter.length; g++) {
                            //     const currWritter = subArticle.Writters.ArticleWritter[g];
                            //     // console.log('currWritter:', currWritter)

                            //     if (validateEmail(currWritter.WritterEmail) === false) {
                            //         // console.log('currWritter:', currWritter)
                            //         // NoIsrantiqueEmail.push(article)
                            //         NoIsrantiqueEmail.push(subArticle)
                            //         break;

                            //     }
                            // }

                            const AtleastOneIsrantique = subArticle.Writters.ArticleWritter.some(User => {
                                // console.log('User.WritterEmail:', User.WritterEmail)
                                const IsIsrantiqueUser = validateEmail(User.WritterEmail)
                                return IsIsrantiqueUser
                            })

                            // console.log('AtleastOneIsrantique:', AtleastOneIsrantique)


                            saveYear(new Date(subArticle['PublishDate']).getFullYear())
                            if (AtleastOneIsrantique) {
                                articlesCount++
                                OnlyIsrantiqueEmail.push({
                                    ...subArticle,
                                    HeadLineEng: typeof subArticle.HeadLineEng === 'object' ? subArticle.HeadLineEng['#text'] : subArticle.HeadLineEng,
                                    SheetNameEng: element.SheetNameEng
                                })
                            }

                        } else if (typeof subArticle.Writters.ArticleWritter === 'object') {
                            // console.log('object', subArticle.Writters.ArticleWritter);

                            saveYear(new Date(subArticle['PublishDate']).getFullYear())

                            if (validateEmail(subArticle.Writters.ArticleWritter.WritterEmail)) {
                                articlesCount++

                                OnlyIsrantiqueEmail.push({
                                    ...subArticle,
                                    HeadLineEng: typeof subArticle.HeadLineEng === 'object' ? subArticle.HeadLineEng['#text'] : subArticle.HeadLineEng,
                                    SheetNameEng: element.SheetNameEng
                                })
                            }

                        } else {
                            // console.log('empty writter', subArticle.Writters.ArticleWritter);
                        }

                    } else {
                        // console.log('Is subArticle empty? ', subArticle);

                    }
                }

            }


        }

    }
}

// console.log('OnlyIsrantiqueEmail: ', OnlyIsrantiqueEmail);
// console.log('OnlyIsrantiqueEmail: ', OnlyIsrantiqueEmail.length);
console.log('ArticlesYears: ', ArticlesYears);
// console.log('articlesCount: ', articlesCount);
// writeFile('OnlyIsrantiqueEmail', OnlyIsrantiqueEmail)

// console.log('mappedArticles:', mappedArticles)
// console.log('mappedArticles length:', mappedArticles.length)
// console.log('NoWritterArticles:', NoWritterArticles)
// console.log('WithWritterArticles:', WithWritterArticles)
// writeFile('NoWritterArticles', NoWritterArticles)
// writeFile('allArticles', allArticles)
// console.log('allArticles:', allArticles)