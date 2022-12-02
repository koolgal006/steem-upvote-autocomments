const steem = require("steem");
const fs = require('fs');

// let db          = new Db();
let settings    = [];  

let message = ``;

async function main() {
    data();
    broadcaster();
}
function data() {
    try {
        fs.readFile('settings.json', 'utf-8', (err, data) => {
            if(err) {
              console.log('error: ', err);
            } else {
              settings = JSON.parse(data);
              console.log("Bot enabled.");
            }
        });
    } catch (error) {
        console.log("Error: " + error);
        data();
    }
}
function broadcaster() {
    steem.api.setOptions({ url: 'https://api.steemit.com' });
    steem.api.streamTransactions('head', (err, result) => {
        try {
            let txType = result.operations[0][0]
            let txData = result.operations[0][1]
            if (settings[0].account != '' && settings[0].key != '') {
                if(txType == 'vote') check(txData)
            }
        } catch (error) {
            console.log(error);
            broadcaster();
        }
    });
}

function check(txData){
    let voter   = txData.voter;
    if (voter == settings[0].account && parseFloat(txData.weight) > 0) {
        let permlink = txData.permlink;
        let author   = txData.author;
        console.log('Sending commentary to... ', author, permlink);
        sendAlert(author, permlink);
    }
}

function sendAlert (parent_author, parent_permlink) {
    let meta     = JSON.parse('{"app":"steemcommentaries/1.0"}');
    let permlink = Math.random().toString(36).substring(2)+"-auto-comment-"+Math.random().toString(36).substring(2);
    steem.broadcast.comment(
        settings[0].key, // posting wif
        parent_author, // author, leave blank for new post
        parent_permlink, // first tag
        settings[0].account, // username
        permlink, // permlink
        '', // Title
        message, // Body of post
        // json metadata (additional tags, app name, etc)
        meta,
        function (err, result) { 
            if (err) console.log('Failure! ' + err);
            else {
                console.log('Commentary has been created successfully!');
            }
        }
    );  
}
main();
