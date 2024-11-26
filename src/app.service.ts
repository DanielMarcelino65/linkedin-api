import { Injectable } from '@nestjs/common';
import { JobRepository } from './repositories/job.repository';
import { FilterDto } from './dto/filter.dto';

@Injectable()
export class AppService {
  constructor(private readonly jobRepository: JobRepository) {}

  /**
   * @description Método que retorna os trabalhos com base em um filtro
   * @param location Localização do trabalho
   * @param jobSkills Habilidades do trabalho
   * @param payPeriod Período de pagamento do trabalho
   * @returns Um array de objetos do tipo JobEntity
   * @example getJobsOnFilter({location: 'Los Angeles', jobSkills: ['Management', 'Information Technology'], payPeriod: 'Hourly'})
   * @example getJobsOnFilter({location: 'Detroit', jobSkills: ['Marketing', 'Sales']})
   * @example getJobsOnFilter({location: 'New York', payPeriod: 'Hourly'})
   * @example getJobsOnFilter({jobSkills: ['Finance', 'Business Development'], payPeriod: 'Hourly'})
   * @example getJobsOnFilter({location: 'Orlando'})
   * @example getJobsOnFilter({jobSkills: ['Sales', 'Engineering']})
   * @example getJobsOnFilter({payPeriod: 'Hourly'})
   */
  getJobsOnFilter(FilterDto: FilterDto) {
    return this.jobRepository.getJobsOnFilter(FilterDto);
  }

  /**
   * @descriptionc Método que retorna os todos os tipos de localizações
   * @returns Um array de strings com os tipos de localizações
   *
   */
  getLocationType() {
    return this.jobRepository.getLocationType();
  }

  /**
   * @description Método que retorna os todos os tipos de habilidades em cada trabalho
   * @returns Um array de strings com os tipos de habilidades
   */
  getJobSkillsType() {
    return this.jobRepository.getJobSkillsType();
  }

  /**
   * @description Método que retorna os primeiros 200 trabalhos da base de dados
   * @returns Um array de objetos do tipo JobEntity
   */
  getJobs() {
    return this.jobRepository.getJobs();
  }

  /**
   * @description Método que retorna um trabalho específico com base no id
   * @param jobId Id do trabalho
   * @returns Um objeto do tipo JobEntity
   */
  getJobById(jobId: bigint) {
    return this.jobRepository.getJobById(jobId);
  }

  getHello(): string {
    return 'Hello World!';
  }

  /**
   * @description Método que retorna os todos os tipos de períodos de pagamento
   * @returns Um array de strings com os tipos de períodos de pagamento
   */
  getPayPeriodType() {
    return this.jobRepository.getPayPeriodType();
  }
}
