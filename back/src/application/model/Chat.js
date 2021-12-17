
class Chat {
    chat = [];

    constructor() {}

    addMessage(message) {
        this.chat.push(message);
    }

    getMessages() {
        return this.chat;
    }
}

module.exports.Chat = Chat;