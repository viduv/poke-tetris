class ReceiveMessageOut {

    io;
    chatService;

    constructor(io, chatService) {
        this.io = io;
        this.chatService = chatService;
    }

    initConnection() {
        this.io.emit("chat", this.chatService.getChat().getMessages());
    }

}

module.exports.ReceiveMessageOut = ReceiveMessageOut;