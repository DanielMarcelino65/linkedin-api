import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JobEntity } from 'src/entities/job.entity';
import { CompanyEntity } from 'src/entities/company.entity';
import { BenefitsEntity } from 'src/entities/benefits.entity';
import { SalariesEntity } from 'src/entities/salaries.entity';
import { FilterDto } from 'src/dto/filter.dto';

//Decorador que marca essa classe como um provedor de serviços
@Injectable()
export class JobRepository {
  //Injeção de dependência do serviço Prisma
  constructor(private readonly prisma: PrismaService) {}

  /**
   * @description Método que retorna os todos os tipos de benefícios
   * @returns Um array de strings com os tipos de benefícios
   *
   */
  async getBenefitsType(): Promise<string[]> {
    const benefitsType = await this.prisma.benefits.findMany({
      select: {
        type: true,
      },
      distinct: ['type'],
    });

    return benefitsType.map((benefit) => benefit.type);
  }

  /**
   * @description Método que retorna os todos os tipos de localizações
   * @returns Um array de strings com os tipos de localizações
   *
   */
  async getLocationType(): Promise<string[]> {
    const locationType = await this.prisma.job.findMany({
      select: {
        location: true,
      },
      orderBy: { location: 'asc' },
      distinct: ['location'],
    });

    return locationType.map((location) => location.location);
  }

  /**
   * @description Método que retorna os todos os tipos de períodos de pagamento
   * @returns Um array de strings com os tipos de períodos de pagamento
   */
  async getPayPeriodType(): Promise<string[]> {
    const payPeriodType = await this.prisma.salaries.findMany({
      select: {
        pay_period: true,
      },
      distinct: ['pay_period'],
    });

    return payPeriodType.map((payPeriod) => payPeriod.pay_period);
  }

  /**
   * @description Método que retorna os todos os tipos de habilidades em cada trabalho
   * @returns Um array de strings com os tipos de habilidades
   */
  async getJobSkillsType(): Promise<string[]> {
    const jobSkillsType = await this.prisma.job_skills.findMany({
      select: {
        skill_name: true,
      },
      distinct: ['skill_name'],
    });

    return jobSkillsType.map((skill) => skill.skill_name);
  }
  /**
   * @description Método que retorna os primeiros 200 trabalhos da base de dados
   * @returns Um array de objetos do tipo JobEntity
   */
  async getJobs(): Promise<JobEntity[]> {
    const jobs = await this.prisma.job.findMany({
      take: 200,
      orderBy: { job_id: 'desc' },
      include: { job_skills: true, salaries: true },
    });
    return jobs;
  }

  /**
   * @description Método que retorna um trabalho específico com base no id
   * @param jobId Id do trabalho
   * @returns Um objeto do tipo JobEntity
   */
  async getJobById(jobId: bigint): Promise<JobEntity> {
    const job = await this.prisma.job.findUnique({
      where: { job_id: jobId },
    });
    return job;
  }

  /**
   * @description Método que retorna uma empresa específica com base no id
   * @param companyId Id da empresa
   * @returns Um objeto do tipo CompanyEntity
   */
  async getCompanyById(companyId: bigint): Promise<CompanyEntity> {
    const company = await this.prisma.company.findUnique({
      where: { company_id: companyId },
    });
    return company;
  }

  /**
   * @description Método que retorna os benefícios de um trabalho específico com base no id
   * @param jobId Id do trabalho
   * @returns Um array de objetos do tipo BenefitsEntity
   */
  async getBenefitsByJobId(jobId: bigint): Promise<BenefitsEntity[]> {
    const benefits = await this.prisma.benefits.findMany({
      where: { job_id: jobId },
    });
    return benefits;
  }

  /**
   * @description Método que retorna os salários de um trabalho específico com base no id
   * @param jobId Id do trabalho
   * @returns Um array de objetos do tipo SalariesEntity
   */
  async getSalariesByJobId(jobId: bigint): Promise<SalariesEntity[]> {
    const salaries = await this.prisma.salaries.findMany({
      where: { job_id: jobId },
    });
    return salaries;
  }

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
  async getJobsOnFilter({
    location,
    jobSkills,
    payPeriod,
  }: FilterDto): Promise<JobEntity[]> {
    const jobs = await this.prisma.job.findMany({
      where: {
        AND: [
          location ? { location } : undefined,

          jobSkills?.length
            ? {
                job_skills: {
                  some: {
                    skill_name: {
                      in: jobSkills,
                    },
                  },
                },
              }
            : undefined,

          payPeriod
            ? {
                salaries: {
                  some: {
                    pay_period: payPeriod,
                  },
                },
              }
            : undefined,
        ].filter(Boolean),
      },
      include: {
        job_skills: true,
        salaries: true,
      },
    });

    return jobs;
  }
}
