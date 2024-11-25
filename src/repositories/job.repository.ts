import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JobEntity } from 'src/entities/job.entity';
import { CompanyEntity } from 'src/entities/company.entity';
import { BenefitsEntity } from 'src/entities/benefits.entity';
import { SalariesEntity } from 'src/entities/salaries.entity';
import { FilterDto } from 'src/dto/filter.dto';

@Injectable()
export class JobRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getBenefitsType(): Promise<string[]> {
    const benefitsType = await this.prisma.benefits.findMany({
      select: {
        type: true,
      },
      distinct: ['type'],
    });

    return benefitsType.map((benefit) => benefit.type);
  }

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

  async getPayPeriodType(): Promise<string[]> {
    const payPeriodType = await this.prisma.salaries.findMany({
      select: {
        pay_period: true,
      },
      distinct: ['pay_period'],
    });

    return payPeriodType.map((payPeriod) => payPeriod.pay_period);
  }

  async getJobSkillsType(): Promise<string[]> {
    const jobSkillsType = await this.prisma.job_skills.findMany({
      select: {
        skill_name: true,
      },
      distinct: ['skill_name'],
    });

    return jobSkillsType.map((skill) => skill.skill_name);
  }

  async getJobs(): Promise<JobEntity[]> {
    const jobs = await this.prisma.job.findMany({
      take: 200,
      orderBy: { job_id: 'desc' },
      include: { job_skills: true, salaries: true },
    });
    return jobs;
  }

  async getJobById(jobId: bigint): Promise<JobEntity> {
    const job = await this.prisma.job.findUnique({
      where: { job_id: jobId },
    });
    return job;
  }

  async getCompanyById(companyId: bigint): Promise<CompanyEntity> {
    const company = await this.prisma.company.findUnique({
      where: { company_id: companyId },
    });
    return company;
  }

  async getBenefitsByJobId(jobId: bigint): Promise<BenefitsEntity[]> {
    const benefits = await this.prisma.benefits.findMany({
      where: { job_id: jobId },
    });
    return benefits;
  }

  async getSalariesByJobId(jobId: bigint): Promise<SalariesEntity[]> {
    const salaries = await this.prisma.salaries.findMany({
      where: { job_id: jobId },
    });
    return salaries;
  }

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
