// Testing with sample SinusBot code, taken from the !roll script
registerPlugin({
    name: 'Roll',
    version: '1.0',
    description: 'If someone sends !roll [max], a random number will be send!',
    author: 'David K. <klostermann.david.99@gmail.com>',
    vars: {}
}, function (sinusbot, config) {
    sinusbot.on('chat', function (ev) {
        var chatMessage = ev.msg;
        var args = chatMessage.split(" ");

        if (ev.mode < 3 && args.length >= 1 && args[0].toLowerCase() == "!roll") { //If it's a valid !roll command
            var max = 100;
            var message = "";

            if (args.length == 2) {
                if (!isNaN(args[1])) {
                    max = parseInt(args[1]);
                }
            }

            if (args.length <= 2) {
                message = "[COLOR=#aa00ff]" + ev.clientNick + "[/COLOR][COLOR=#005500] rolled: [/COLOR][COLOR=#ff5500]" + generateRandomInteger(max).toString() + "[/COLOR]";
            } else {
                message = "[COLOR=#55ffff]Usage: [/COLOR][COLOR=#ffaa00]!roll <max>[/COLOR]";
            }

            if (ev.mode == 2) {
                chatChannel(message);
            } else {
                chatPrivate(ev.clientId, message);
            }
        }
    });
    // strange
    function generateRandomInteger(max) {
        return Math.round(Math.random() * max);
    }
});