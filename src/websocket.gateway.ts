import {
	ConnectedSocket,
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway({
	cors: {
		origin: '*',
	},
})
export class WebsocketGateway {
	@WebSocketServer() server: Server;

	@SubscribeMessage('sendMessage')
	handleEvent(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
		this.server.emit('receiveMessage', {
			id: client.id,
			message: data?.message,
			name: data?.name,
			time: data?.time,
		});
		return data;
	}
}
