import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, WebSocket } from 'ws';

@WebSocketGateway()
export class WebsocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('WebsocketGateway');

  afterInit(server: Server) {
    this.logger.log('WebSocket Gateway Initialized');
  }

  handleDisconnect(client: WebSocket) {
    this.logger.log(`Client disconnected: ${client}`);
  }

  handleConnection(client: WebSocket, ...args: any[]) {
    this.logger.log('Client connected');
  }

  emitTaskCreated(task: any) {
    this.logger.log('Emitting taskCreated event', task);  
    this.server.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ event: 'taskCreated', data: task }));
      }
    });
  }

  emitTaskUpdated(task: any) {
    this.logger.log('Emitting taskUpdated event', task);  
    this.server.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ event: 'taskUpdated', data: task }));
      }
    });
  }

  emitTaskDeleted(taskId: string) {
    this.logger.log('Emitting taskDeleted event', taskId);  
    this.server.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ event: 'taskDeleted', data: taskId }));
      }
    });
  }
}




