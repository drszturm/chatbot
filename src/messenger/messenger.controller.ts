import { Injectable } from '@nestjs/common';


export class MessengerController{
constructor(){}
  create(createMessengerDto: any) {
    return 'This action adds a new messenger';
  }

  findAll() {
    return `This action returns all messenger`;
  }

  findOne(id: number) {
    return `This action returns a #${id} messenger`;
  }

  update(id: number, updateMessengerDto: any) {
    return `This action updates a #${id} messenger`;
  }

  remove(id: number) {
    return `This action removes a #${id} messenger`;
  }
}
