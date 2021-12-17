const { Chat } = require("../model/Chat");

class ChatService {
    
    chat;

    constructor() {
        this.chat = new Chat();
    }

    getChat() {
        return this.chat;
    }
}

module.exports.ChatService = ChatService;