import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [WebsocketGateway, AppService],
})
export class AppModule {}
