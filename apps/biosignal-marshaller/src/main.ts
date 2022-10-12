import { NestFactory } from '@nestjs/core';
import { BiosignalMarshallerModule } from './biosignal-marshaller.module';

async function bootstrap() {
  const app = await NestFactory.create(BiosignalMarshallerModule);
  await app.listen(3000);
}
bootstrap();
