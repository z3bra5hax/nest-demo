import { BiosignalConversionModule } from '@nestdemo/biosignal-conversion';
import { Module } from '@nestjs/common';
import { BiosignalMarshallerController } from './biosignal-marshaller.controller';
import { BiosignalMarshallerService } from './biosignal-marshaller.service';

@Module({
  imports: [BiosignalConversionModule],
  controllers: [BiosignalMarshallerController],
  providers: [BiosignalMarshallerService],
})
export class BiosignalMarshallerModule {}
