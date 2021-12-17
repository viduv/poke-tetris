class ReceiveMessageIn {
    chatService;
    receiveMessageOut;

    constructor(chatService, receiveMessageOut) {
        this.chatService = chatService;
        this.receiveMessageOut = receiveMessageOut;
    }

    initConnection(socket) {
        socket.on("receiveMessage", message => {
            this.chatService.getChat().addMessage(message);
            this.receiveMessageOut.initConnection();
        });
    }
}

module.exports.ReceiveMessageIn = ReceiveMessageIn;