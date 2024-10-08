import { benefits } from '@prisma/client';

export class BenefitsEntity implements benefits {
  job_id: bigint;
  type: string;
  inferred: boolean;
}
