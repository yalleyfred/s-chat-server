import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:4200', // Allow all origins (replace with your frontend URL in production)
    methods: ['GET', 'POST'],
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  // Handle connection event
  public handleConnection(@ConnectedSocket() client: Socket): void {
    console.log(`Client connected: ${client.id}`);
  }

  // Handle disconnection event
  public handleDisconnect(@ConnectedSocket() client: Socket): void {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Handle custom 'message' event
  @SubscribeMessage('message')
  public handleMessage(@ConnectedSocket() client: Socket, @MessageBody() message: string): void {
    console.log(`Received message from ${client.id}: ${message}`);

    // Broadcast the message to all connected clients
    this.server.emit('message', { clientId: client.id, message });
  }
}