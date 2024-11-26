import { job } from '@prisma/client';

/**
 * @description Entidade que representa a tabela de trabalhos
 */
export class JobEntity implements job {
  job_id: bigint;
  title: string;
  application_type: string;
  formatted_experience_level: string;
  formatted_work_type: string;
  location: string;
  remote_allowed: boolean;
}
