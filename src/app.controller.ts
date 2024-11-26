import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { FilterDto } from './dto/filter.dto';

//Decorador que marca essa classe como um controlador
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * @description Rota do tipo GET que retorna os tipos de benefícios
   * @returns Um array de strings com os tipos de benefícios
   */
  @Get('payperiodtypes')
  getPayPeriodType() {
    return this.appService.getPayPeriodType();
  }

  /**
   * @description Rota do tipo GET que retorna os tipos de localizações
   * @returns Um array de strings com os tipos de localizações
   */
  @Get('locationtypes')
  getLocationType() {
    return this.appService.getLocationType();
  }

  /**
   * @description Rota do tipo POST que retorna os empregos filtrados
   * @param filter Objeto do tipo FilterDto que contém os filtros
   * @returns Um array de objetos do tipo JobEntity
   * @example { "location": "Remote", "skills": ["Python", "Java"], "pay_period": "Hourly" }
   */
  @Post('filter')
  getJobsOnFilter(@Body() filter: FilterDto) {
    return this.appService.getJobsOnFilter(filter);
  }

  /**
   * @description Rota do tipo GET que retorna os tipos de habilidades
   * @returns Um array de strings com os tipos de habilidades
   */
  @Get('skilltypes')
  getJobSkillsType() {
    return this.appService.getJobSkillsType();
  }

  /**
   * @description Rota do tipo GET que retorna os primeiros 200 empregos
   * @returns Um array de objetos do tipo JobEntity
   */
  @Get('jobs')
  getJobs() {
    return this.appService.getJobs();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
