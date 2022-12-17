import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ManagerService } from './queue-manager/manager.service';
import { SocketService } from './socket.service';

type BodyDto = {
  recruitId: string;
  userId?: string;
};
@Controller()
export class SocketController {
  constructor(
    private managerService: ManagerService,
    private socketService: SocketService,
  ) {}

  @Get('unread')
  async getUnreadMessage(@Query() bodyDto: BodyDto) {
    const { recruitId, userId } = bodyDto;
    const queue = this.managerService.getQueue(`${recruitId}:${userId}`);
    const { waiting } = await queue.getJobCounts();
    return { statusCode: 201, data: { waiting } };
  }

  // POST localhost:8080/queue {recruitId, userId}
  @Post('queue')
  async generate(@Body() bodyDto: BodyDto) {
    const { recruitId, userId } = bodyDto;
    await this.managerService.generateQueue(`${recruitId}:${userId}`);
    return { statusCode: 201 };
  }

  // POST localhost:8080/queue/delete/one {recruitId, userId}
  @Post('queue/delete/one')
  async deleteOne(@Body() bodyDto: BodyDto) {
    const { recruitId, userId } = bodyDto;
    await this.managerService.deleteOneQueue(`${recruitId}:${userId}`);
    return { statusCode: 201 };
  }

  // POST localhost:8080/queue/delete/many {recruitId}
  @Post('queue/delete/many')
  async deleteMany(@Body() bodyDto: BodyDto) {
    const { recruitId } = bodyDto;
    await this.managerService.deleteManyQueue(recruitId);
    return { statusCode: 201 };
  }
}
