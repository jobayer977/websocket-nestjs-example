import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
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
export class WebsocketGateway
	implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
	private message = [];

	@WebSocketServer() server: Server;

	afterInit(server: Server) {
		console.log('WebSocket server initialized');
	}

	handleConnection(client: any, ...args: any[]) {
		console.log(`Client connected: ${client.id}`);
	}

	handleDisconnect(client: any) {
		console.log(`Client disconnected: ${client.id}`);
	}

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
