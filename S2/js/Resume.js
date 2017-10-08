//// Some code taken from '.bookmarks'
registerPlugin({
    name: 'Resume',
    version: '1.0',
    backends: ['ts3', 'discord'],
    engine: '>= 0.9.16',
    description: 'Enter !pause to pause the song, enter !resume to seek to unpause the song.',
    author: 'Shawye <shawye@ucla.edu>',
    vars: []
}, function (sinusbot, config) {

    //    var store = require('store'),
    //        media = require('media'),
    //        backend = require('backend'),
    //        audio = require('audio');

    //    var event = require('event');
    //    event.on('chat', function (ev) {
    //        ev.client.chat('Hi, ' + ev.client.name() + ', you just wrote: ' + ev.text);
    //    });

    //    event.on('chat', function (ev) {
    //        engine.log(ev.text);
    //        if (ev.text == '.bookmark') {
    //            engine.log("bookmark");
    //            var track = media.getCurrentTrack();
    //            if (!track) return;
    //            var pos = audio.getTrackPosition();
    //            store.set(track.ID(), pos);
    //            backend.getCurrentChannel().chat('Position saved for track ' + track.uuid + ' at ' + pos + 'ms.');
    //            media.stop();
    //        }

    //        if (ev.text == '!resume') {
    //            engine.log("resume");
    //            var track = media.getCurrentTrack();
    //            if (!track) return;
    //            var pos = store.get(track.ID());
    //            if (!pos) {
    //                backend.getCurrentChannel().chat('No position found, sorry.');
    //                return;
    //            }
    //            track.play();
    //            audio.seek(pos);
    //            backend.getCurrentChannel().chat('Resumed at ' + pos + 'ms.');
    //        }
    //    });
    //});

    //registerPlugin({
    //    name: 'Bookmarks!',
    //    version: '1.0',
    //    description: 'Enter .bookmark to save the current position, enter .resume to seek to the bookmarked position.',
    //    author: 'Michael Friese <michael@sinusbot.com>',
    //    vars: {}
    //}, function (sinusbot, config) {
    sinusbot.on('chat', function (ev) {
        if (ev.msg == '!pause') {
            var track = sinusbot.getCurrentTrack();
            if (!track) return;
            var pos = sinusbot.getPos();
            sinusbot.setVar(track.uuid, pos);
            sinusbot.chatChannel('Position saved for track ' + track.uuid + ' at ' + pos + 'ms.');
            sinusbot.setMute(true);
        }

        //if (ev.msg == '!resume') {
        //    sinusbot.getCurrentChannel().chat('test 2');
        //    var track = sinusbot.getCurrentTrack();
        //    sinusbot.getCurrentChannel().chat('test');
        //    if (!track) return;
        //    var pos = store.get(track.ID());
        //    if (!pos) {
        //        backend.getCurrentChannel().chat('No position found, sorry.');
        //        return;
        //    }
        //    track.play();
        //    audio.seek(pos);
        //    backend.getCurrentChannel().chat('Resumed at ' + pos + 'ms.');

        if (ev.msg == '!resume') {
            var track = sinusbot.getCurrentTrack();
            if (!track) return;
            var pos = sinusbot.getVar(track.uuid);
            if (!pos) {
                 sinusbot.chatChannel('No position found, sorry.');
                 return;
            }

            sinusbot.setMute(false);
            sinsubot.seek(pos);
            sinusbot.chatChannel('Resumed at ' + pos + 'ms.');  
        }
    });
});
