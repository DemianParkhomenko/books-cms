import { HttpModule } from '@app/infra/http/http.module';
import { Module } from '@nestjs/common';

@Module({
  controllers: [],
  imports: [HttpModule],
  providers: [],
})
export class BooksCmsModule {}
