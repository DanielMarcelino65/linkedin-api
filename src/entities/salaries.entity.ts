import { salaries } from '@prisma/client';

/**
 * @description Entidade que representa a tabela de salários
 */
export class SalariesEntity implements salaries {
  salary_id: bigint;
  job_id: bigint;
  max_salary: number;
  med_salary: number;
  min_salary: number;
  pay_period: string;
  currency: string;
  monthly_max_salary: number;
  monthly_med_salary: number;
  monthly_min_salary: number;
}
