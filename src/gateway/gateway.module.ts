import { Module } from '@nestjs/common';
import { GatewaySufragios } from './gateway';

@Module({
  providers: [GatewaySufragios],
})
export class GatewayModule {}
