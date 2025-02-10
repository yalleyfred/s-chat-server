import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketIoAdapter } from './socket-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Use the custom Socket.IO adapter
  app.useWebSocketAdapter(new SocketIoAdapter(app));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
