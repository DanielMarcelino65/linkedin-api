import { benefits } from '@prisma/client';

/**
 * @description Entidade que representa a tabela de benefícios
 */
export class BenefitsEntity implements benefits {
  job_id: bigint;
  type: string;
  inferred: boolean;
}
