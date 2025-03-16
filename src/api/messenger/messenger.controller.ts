import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MessengerService } from './messenger.service';
import { CreateMessengerDto } from './dto/create-messenger.dto';
import { UpdateMessengerDto } from './dto/update-messenger.dto';

<<<<<<< HEAD:src/messenger/messenger.controller.ts

@Controller('messenger')
export class MessengerController {
  constructor(private readonly messengerService: MessengerService){}
=======
@Controller('messenger')
export class MessengerController {
  constructor(
    private readonly messengerService: MessengerService
  ) {}
>>>>>>> 56652ab2af2228b8e61a7b261270ac1fa698346a:src/api/messenger/messenger.controller.ts

  @Post('/webhook')
  receiveMessage(@Body() message: ReceivedMessageDto) {
    return this.messengerService.handleMessage(message);
  }

  @Post('')
  create(@Body() createMessengerDto: CreateMessengerDto) {
    return this.messengerService.create(createMessengerDto);
  }

  @Get()
  findAll() {
    return this.messengerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messengerService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMessengerDto: UpdateMessengerDto,
  ) {
    return this.messengerService.update(+id, updateMessengerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messengerService.remove(+id);
  }
}
