/**
 * @description DTO para filtrar os salários
 */
export class FilterDto {
  location?: string;
  jobSkills?: string[];
  payPeriod?: string;
}
