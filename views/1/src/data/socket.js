export const socket = {
    socket: null,
    init(url)  {
        this.socket = new WebSocket(url)

        this.handlePingPong()
    },
    handlePingPong() {
        this.socket.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);

            if (data.ping) {
                this.socket.send(JSON.stringify({ pong: data.ping }));
            }
        });
    },
    addEventListener(event, callback){
        this.socket.addEventListener(event, callback)
    },
    close()  {
        this.socket.close()
    },
    send(data){
        this.socket.send(data)
    }
}
