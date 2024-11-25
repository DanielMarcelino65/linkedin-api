import { Injectable } from '@nestjs/common';
import { JobRepository } from './repositories/job.repository';
import { FilterDto } from './dto/filter.dto';

@Injectable()
export class AppService {
  constructor(private readonly jobRepository: JobRepository) {}

  getJobsOnFilter(FilterDto: FilterDto) {
    return this.jobRepository.getJobsOnFilter(FilterDto);
  }

  getLocationType() {
    return this.jobRepository.getLocationType();
  }

  getJobSkillsType() {
    return this.jobRepository.getJobSkillsType();
  }

  getJobs() {
    return this.jobRepository.getJobs();
  }

  getJobById(jobId: bigint) {
    return this.jobRepository.getJobById(jobId);
  }

  getHello(): string {
    return 'Hello World!';
  }

  getPayPeriodType() {
    return this.jobRepository.getPayPeriodType();
  }
}
