## Welcome to Steem Upvote and Commentaries

This bot will help curators to the Steem Blockchain to leave comments automatically in each post what they upvote. Anyone can use it following a few steps.

### Requeriments

1- You need to install nodeJS which will help you to run the bot. Go to https://nodejs.org/es/download/ and download it basing on your OS
2- steem js dependencies required.

### Installation and Setup

You will need to do the installation process just one time, once it to use the bot you just need to turn on it. After install nodeJS package, clone this repository and using your bash move to the folder where you forked the code.

```cd /path/to/the/bot```

Once in the bot folder you need to install the dependencies, do it executing

```npm install```

The dependencies will be installed if no exist. Then open the ```settings.js``` file, here you will can add the username for the account used to curate, and their posting key to broadcast the comments. Your file must seems like:

```
[
    {
        "account":"alejos7ven",
        "key":"yourpostinghere"
    }
]
```

The next step will be add the message used to respond when the bot detect an upvote from the curator account. open ```comment.js``` file and find the line 8, btween the quotes you can add your custom message. This must see like:

```let var message=`<b>test</b>`;```

After it your bot is ready to use you just need Turn on it! each time what you will go to curate open your bash, move to the bot folder and execute ```node comment``` the bot will say you 'Bot enabled'. And then you just need matter to do upvotes! the comments will send automatically.

To stop the bot press CTR + C and the bot will stop.

NOTE: if you use linux or a dedicated VPS you can deploy the bot using PM2 to always get it alive
