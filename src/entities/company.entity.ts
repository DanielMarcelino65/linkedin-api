import { company } from '@prisma/client';

export class CompanyEntity implements company {
  company_id: bigint;
  name: string;
  country: string;
  state: string;
  city: string;
}
