const { Client } = require('discord.js');
const config = require('../config.json');

const client = new Client();

client.login(config.token);

client.on('ready', () => {
    config.commands.forEach(command => {
        const channel = client.channels.get(command.channelID);
        if(!channel || !command.active) return;
        setInterval(() => {
            try {
                if(command.inventory.mb.count > 0 && command.inventory.mb.active) {
                    channel.send(command.inventory.mb.content).catch(() => {});
                    command.inventory.mb.count--
                } else if(command.inventory.bb.count > 0 && command.inventory.bb.active) {
                    channel.send(command.inventory.bb.content).catch(() => {});
                    command.inventory.bb.count--
                } else {
                    channel.send(command.content).catch(() => {});
                };
            } catch {};
        }, command.interval);
    }); 
});