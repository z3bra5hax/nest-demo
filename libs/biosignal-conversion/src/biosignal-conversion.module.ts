import { Module } from '@nestjs/common';
import { BioSignalConversionService } from './biosignal-conversion.service';

@Module({
  providers: [BioSignalConversionService],
  exports: [BioSignalConversionService],
})
export class BiosignalConversionModule {}
