import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, WebSocket } from 'ws';
import { MailService } from 'src/mail/mail.service';

@WebSocketGateway()
export class WebsocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('WebsocketGateway');

  constructor(private mailService: MailService) {}

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
    this.mailService.sendMail('user@example.com', 'Task Created', `A new task has been created: ${task.title}`);
  }

  emitTaskUpdated(task: any) {
    this.logger.log('Emitting taskUpdated event', task);
    this.server.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ event: 'taskUpdated', data: task }));
      }
    });
    this.mailService.sendMail('user@example.com', 'Task Updated', `Task has been updated: ${task.title}`);
  }

  emitTaskDeleted(taskId: string) {
    this.logger.log('Emitting taskDeleted event', taskId);
    this.server.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ event: 'taskDeleted', data: taskId }));
      }
    });
    this.mailService.sendMail('user@example.com', 'Task Deleted', `A task has been deleted with ID: ${taskId}`);
  }
}





