// JavaScript source code
registerPlugin({
    name: 'Playlist Manipulator',
    version: '1.0',
    backends: ['ts3', 'discord'],
    engine: '>= 0.9.16',
    description: 'Allows Users to Create and Delete Playlists, and move songs between Playlists',
    author: 'Shawye Ho <shawye@ucla.edu>',
    vars: []
}, function (sinusbot, config) {
    var engine = require('engine');
    var backend = require('backend');
    var event = require('event');

    event.on('chat', function (ev) {
        if (!ev.client.isSelf()) {
            //engine.log(ev.client.name() + ' wrote ' + ev.text);
            ev.client.chat('Hi ' + ev.client.name() + ', you just wrote: ' + ev.text);
        }
    });
});