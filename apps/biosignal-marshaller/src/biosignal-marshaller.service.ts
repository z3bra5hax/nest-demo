import { Injectable } from '@nestjs/common';

@Injectable()
export class BiosignalMarshallerService {
  getHello(): string {
    return 'Hello World!';
  }
}
