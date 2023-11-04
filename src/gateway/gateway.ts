import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import axios from 'axios';
import { UseFilters, UseGuards } from '@nestjs/common';
import { WsClientAllowedGuard } from './guards/ws-client-allowed.guard';
import { WsExceptionFilter } from './filters/ws-exception.filter';

@WebSocketGateway({ cors: true })
export class GatewaySufragios {
  @WebSocketServer() server: Server;

  @UseFilters(new WsExceptionFilter())
  @UseGuards(WsClientAllowedGuard)
  @SubscribeMessage('newSufragio')
  onNewSufragio(@MessageBody() data: any) {
    console.log(data);
    this.server.emit('newSufragio', { data });
  }

  @SubscribeMessage('getSufragios')
  async onGetSufragios() {
    const { data } = await axios.get(
      `http://${process.env.IP}/api/v1/sufragios`,
    );
    this.server.emit('getSufragios', { data });
  }
}
