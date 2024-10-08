-- CreateTable
CREATE TABLE "benefits" (
    "job_id" BIGINT NOT NULL,
    "inferred" BOOLEAN NOT NULL,
    "type" VARCHAR(50) NOT NULL,

    CONSTRAINT "benefits_pkey" PRIMARY KEY ("job_id")
);

-- CreateTable
CREATE TABLE "company" (
    "company_id" BIGINT NOT NULL,
    "name" VARCHAR(255),
    "country" VARCHAR(2),
    "state" VARCHAR(255),
    "city" VARCHAR(255),

    CONSTRAINT "company_pkey" PRIMARY KEY ("company_id")
);

-- CreateTable
CREATE TABLE "company_descriptions" (
    "company_id" BIGINT NOT NULL,
    "description" VARCHAR(2500) NOT NULL,

    CONSTRAINT "company_descriptions_pkey" PRIMARY KEY ("company_id")
);

-- CreateTable
CREATE TABLE "company_industry" (
    "company_id" BIGINT NOT NULL,
    "industry_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "company_industry_pkey" PRIMARY KEY ("company_id","industry_name")
);

-- CreateTable
CREATE TABLE "job" (
    "job_id" BIGINT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "formatted_work_type" VARCHAR(15) NOT NULL,
    "remote_allowed" BOOLEAN NOT NULL,
    "application_type" VARCHAR(20) NOT NULL,
    "formatted_experience_level" VARCHAR(20) NOT NULL,

    CONSTRAINT "job_pkey" PRIMARY KEY ("job_id")
);

-- CreateTable
CREATE TABLE "job_company" (
    "job_id" BIGINT NOT NULL,
    "company_id" BIGINT NOT NULL,

    CONSTRAINT "job_company_pkey" PRIMARY KEY ("job_id","company_id")
);

-- CreateTable
CREATE TABLE "job_industry" (
    "job_id" BIGINT NOT NULL,
    "industry_name" VARCHAR(75) NOT NULL,

    CONSTRAINT "job_industry_pkey" PRIMARY KEY ("job_id","industry_name")
);

-- CreateTable
CREATE TABLE "job_skills" (
    "job_id" BIGINT NOT NULL,
    "skill_name" VARCHAR(30) NOT NULL,

    CONSTRAINT "job_skills_pkey" PRIMARY KEY ("job_id","skill_name")
);

-- CreateTable
CREATE TABLE "salaries" (
    "salary_id" BIGINT NOT NULL,
    "job_id" BIGINT NOT NULL,
    "max_salary" DOUBLE PRECISION,
    "med_salary" DOUBLE PRECISION,
    "min_salary" DOUBLE PRECISION,
    "pay_period" VARCHAR(10) NOT NULL,
    "currency" VARCHAR(3) NOT NULL,
    "monthly_max_salary" DOUBLE PRECISION,
    "monthly_med_salary" DOUBLE PRECISION,
    "monthly_min_salary" DOUBLE PRECISION,

    CONSTRAINT "salaries_pkey" PRIMARY KEY ("salary_id")
);

-- AddForeignKey
ALTER TABLE "benefits" ADD CONSTRAINT "benefits_fk0" FOREIGN KEY ("job_id") REFERENCES "job"("job_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "company_descriptions" ADD CONSTRAINT "company_descriptions_fk0" FOREIGN KEY ("company_id") REFERENCES "company"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "company_industry" ADD CONSTRAINT "company_industry_fk0" FOREIGN KEY ("company_id") REFERENCES "company"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "job_company" ADD CONSTRAINT "job_company_fk0" FOREIGN KEY ("job_id") REFERENCES "job"("job_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "job_company" ADD CONSTRAINT "job_company_fk1" FOREIGN KEY ("company_id") REFERENCES "company"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "job_industry" ADD CONSTRAINT "job_industry_fk0" FOREIGN KEY ("job_id") REFERENCES "job"("job_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "job_skills" ADD CONSTRAINT "job_skills_fk0" FOREIGN KEY ("job_id") REFERENCES "job"("job_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "salaries" ADD CONSTRAINT "salaries_fk1" FOREIGN KEY ("job_id") REFERENCES "job"("job_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
