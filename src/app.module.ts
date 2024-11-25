import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { JobRepository } from './repositories/job.repository';

/**
 * @description Módulo principal da aplicação
 */
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService, JobRepository],
})
export class AppModule {}
