import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import axios from 'axios';

@WebSocketGateway()
export class GatewaySufragios {
  @WebSocketServer() server: Server;

  @SubscribeMessage('newSufragio')
  onNewSufragio(@MessageBody() data: any) {
    console.log(data);
    this.server.emit('newSufragio', { data });
  }

  @SubscribeMessage('getSufragios')
  async onGetSufragios() {
    const { data } = await axios.get('http://localhost:3000/api/v1/sufragios');
    this.server.emit('getSufragios', { data });
  }
}
