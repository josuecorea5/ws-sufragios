import { Module } from '@nestjs/common';
import { GatewaySufragios } from './gateway';
import { WsClientAllowedGuard } from './guards/ws-client-allowed.guard';

@Module({
  providers: [GatewaySufragios, WsClientAllowedGuard],
})
export class GatewayModule {}
