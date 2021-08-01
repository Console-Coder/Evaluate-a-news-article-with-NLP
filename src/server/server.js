'use strict';
require('dotenv').config();

// Required variables
const fetch = require('node-fetch');
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const cors = require('cors'); // cors required because the webpack-dev-server needs to fetch the node server.
const app = express();
const objData = {};
const API_KEY = process.env.API_KEY;
const baseUrl = 'https://api.meaningcloud.com/sentiment-2.1?';
const staticPath1 = './dist/views'; // views path that contains the index.html to be served to client
const staticPath2 = './dist'; // the general folder that contains all other needed assets

// Preparing and launching server
app.use(express.static(staticPath1)); // permits access to index.html
app.use(express.static(staticPath2)); // permits access to all other assets
app.use(cors());
app.use(bodyparser.json());

app.post('/analysis_result', async (req, res) => {
    const valTxt = req.body.rqst;
    try {
        const analysisResult = await fetch(baseUrl + 'key=' + API_KEY + '&lang=en' + '&txt=' + valTxt);
        analysisResult.json().then(
            (resObject) => {
                if (resObject.status.code == '0') {
                    objData['result'] = resObject;
                    res.send(objData);
                    res.end();
                    console.log('Analysis data fetched and sent to user!' + objData.result);
                }
                else {
                    objData['result'] = 'Result is: error analyzing the article on external API side, consider\
                    to re-check your article.'; // make this json
                    res.send(JSON.stringify(objData));
                    res.end();
                    console.log('Error in the analysis result, mostly because user incorrect input');
                }
            },
            (err) => console.log('Error while preparing respond for user, user input: "'
            + req.body.rqst + '"' + '\n\n' + err)
        );
    }
    catch (error) {
        console.log('\nError fetching the external API\n' + baseUrl + 'key=' + API_KEY + '&lang=en' + '&txt=' + req.body.rqst);
        objData['result'] = 'We can\'t get respond from our partner\'s API';
        res.send(JSON.stringify(objData));
        res.end();
    }
});

app.listen(3000, () => console.log('Application is up and running!'));