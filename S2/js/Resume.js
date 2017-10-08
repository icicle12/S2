// Some code taken from '.bookmarks'
registerPlugin({
    name: 'Resume',
    version: '1.0',
    backends: ['ts3', 'discord'],
    engine: '>= 0.9.16',
    description: 'Enter !pause to pause the song, enter !resume to seek to unpause the song.',
    author: 'Shawye <shawye@ucla.ed>',
    vars: []
}, function (sinusbot, config) {

    var store = require('store'),
        media = require('media'),
        backend = require('backend'),
        audio = require('audio');

    var event = require('event');
    event.on('chat', function (ev) {
        ev.client.chat('Hi, ' + ev.client.name() + ', you just wrote: ' + ev.text);
    });

    event.on('chat', function (ev) {
        engine.log(ev.text);
        if (ev.text == '!pause') {
            engine.log("bookmark");
            var track = media.getCurrentTrack();
            if (!track) return;
            var pos = audio.getTrackPosition();
            store.set(track.ID(), pos);
            backend.getCurrentChannel().chat('Position saved for track ' + track.uuid + ' at ' + pos + 'ms.');
            media.stop();
        }
        
        if (ev.text == '!resume') {
            engine.log("resume");
            var track = media.getCurrentTrack();
            if (!track) return;
            var pos = store.get(track.ID());
            if (!pos) {
                backend.getCurrentChannel().chat('No position found, sorry.');
                return;
            }
            track.play();
            audio.seek(pos);
            backend.getCurrentChannel().chat('Resumed at ' + pos + 'ms.');
        }
    });
});
