export default class WebsocketService {
  private ws: WebSocket
  constructor(url: string) {
    this.ws = new WebSocket(url);
  }

  connect() {

  }
  send(message: string) {
      this.ws.send(message);
  }

  onMessage(handler: (event: any) => void) {
      this.ws.onmessage = handler;
  }

  close() {
    this.ws.close();
  }
}
