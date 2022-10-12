import { Module } from '@nestjs/common';
import { BiosignalConversionService } from './biosignal-conversion.service';

@Module({
  providers: [BiosignalConversionService],
  exports: [BiosignalConversionService],
})
export class BiosignalConversionModule {}
