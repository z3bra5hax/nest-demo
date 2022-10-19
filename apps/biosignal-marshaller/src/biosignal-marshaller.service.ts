import { BioSignalConversionService, RawSignal } from '@nestdemo/biosignal-conversion';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BiosignalMarshallerService {

  constructor(private readonly bioSignalConversionService: BioSignalConversionService) {}

  async processRawSignal(incomingSignal: RawSignal): Promise<void> {
    const convertedSignalData = this.bioSignalConversionService.convertSignal(incomingSignal);
  }

}
