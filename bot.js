var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});


logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});


bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {    
    // Our bot needs to know if it will execute a user command
    // It will listen for messages that will start with `^`    
    if (message.substring(0, 1) == '^') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // ^CDhelp
            case 'CDhelp':
                bot.sendMessage({
                    to: channelID,
                    message: '__**COUNTDOWN BOT LIST OF COMMANDS:**__ \n  *^CDhelp* - Displays a list of commands \n  *^CDcreate* - Create a new countdown \n  *^CDview* - See a list of current countdowns \n  *^CDdelete* - Remove a countdown \nYou can also add "_help" to any command to know more about it.'
                });
            break;
           
            // ^CDcreate help
            case 'CDcreate_help':
                bot.sendMessage({
                    to: channelID,
                    message: 'Messages have to be formatted as such (I know, it sucks): \n *^CDcreate YYYY-MM-DD HH:MM Event* \n Keep in mind that the time is 24 hour time, and that countdowns will post every day a week before the event. \nRemember, you can only have one countdown active at a time^'
                });
            break;

            //^CDcreate
            //should be formatted as such: ^CDcreate YYYY-MM-DD HH:MM
            case 'CDcreate':
                //clear message command off of message
                var message = message.slice(10)
                
                //Check formatting, and if the formatting is wrong, send error message
                var countdownDate = message.slice(0, 16)
                //countdownDate = countdownDate.replace(" ", "T");

                var countdownMessage = message.slice(17);

                //if formatting is correct, creates a JSON object, 
                var store = require('json-fs-store')();
                var countdown = {
                    id: userID,
                    name: user,
                    userID: userID,
                    message: countdownMessage,
                    countdownDate: countdownDate,
                    countdownAnnounced: false,
                    event: evt
                    };

                    store.add(countdown, function(err) {
                    // called when the file has been written
                    // to the /path/to/storage/location/12345.json
                    if (err) throw err; // err if the save failed
                });

                
                //Confirmation Messages
                bot.sendMessage({
                    to: channelID,
                    message: 'Countdown Created Successfully:'
                });
                bot.sendMessage({
                    to: channelID,
                    message: countdownDate
                });
                bot.sendMessage({
                    to: channelID,
                    message: countdownMessage
                });
            break;
        
            case 'CDRun':
                store.load(userID, function(err, object){
                    if(err) throw err; // err if JSON parsing failed
                    var countdownDate = new Date();
                    // read the date from the countdown

                });
                
                //instantiate new variables
                var currentDate = new Date();
                do{

                }while (countdownDate > currentDate);
            break;
        }
   }
});