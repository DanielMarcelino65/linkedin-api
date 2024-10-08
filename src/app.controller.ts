import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { FilterDto } from './dto/filter.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('locationtypes')
  getLocationType() {
    return this.appService.getLocationType();
  }

  @Post('filter')
  getJobsOnFilter(@Body() filter: FilterDto) {
    return this.appService.getJobsOnFilter(filter);
  }

  @Get('skilltypes')
  getJobSkillsType() {
    return this.appService.getJobSkillsType();
  }
  @Get('jobs')
  getJobs() {
    return this.appService.getJobs();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
