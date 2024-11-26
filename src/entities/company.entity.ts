import { company } from '@prisma/client';

/**
 * @description Entidade que representa a tabela de empresas
 */
export class CompanyEntity implements company {
  company_id: bigint;
  name: string;
  country: string;
  state: string;
  city: string;
}
