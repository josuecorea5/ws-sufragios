import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Observable } from 'rxjs';

@Injectable()
export class WsClientAllowedGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const allowedOrigin = process.env.ORIGIN_ALLOWED;
    const client = context.switchToWs().getClient();
    const origin = client.handshake.headers.origin;
    if (origin !== allowedOrigin) {
      throw new WsException('Origin not allowed');
    }
    return true;
  }
}
