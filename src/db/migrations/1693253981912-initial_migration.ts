import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1693253981912 implements MigrationInterface {
  name = 'InitialMigration1693253981912';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "school_admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullname" character varying(120) NOT NULL, "email" character varying(120) NOT NULL, "password" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "schoolId" uuid, CONSTRAINT "UQ_60b61005a7d7d4ffde62755e42f" UNIQUE ("email"), CONSTRAINT "PK_042aeaff9ad44d2ba67f2213ae9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "school" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(120) NOT NULL, "domainName" character varying(120) NOT NULL, "password" text NOT NULL, "theme" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_151a6368a0667eeed04f59d20df" UNIQUE ("domainName"), CONSTRAINT "PK_57836c3fe2f2c7734b20911755e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "faculty" ("id" SERIAL NOT NULL, "name" character varying(120) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "schoolId" uuid, CONSTRAINT "PK_635ca3484f9c747b6635a494ad9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "department" ("id" SERIAL NOT NULL, "name" character varying(120) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "facultyId" integer, CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "course" ("id" SERIAL NOT NULL, "name" character varying(120) NOT NULL, "lastTimeAllocated" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "course_departments_department" ("courseId" integer NOT NULL, "departmentId" integer NOT NULL, CONSTRAINT "PK_69f20e00a9659a1c723aea758c3" PRIMARY KEY ("courseId", "departmentId"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_f4464e0308f86ac2add79fffdf" ON "course_departments_department" ("courseId") `);
    await queryRunner.query(`CREATE INDEX "IDX_c6ad859691a3f10ad7f8fe9742" ON "course_departments_department" ("departmentId") `);
    await queryRunner.query(
      `ALTER TABLE "school_admin" ADD CONSTRAINT "FK_51141ccf3c7fd7ca1df3caed1fc" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "faculty" ADD CONSTRAINT "FK_1acc9a030442a4c318ce18d2400" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "department" ADD CONSTRAINT "FK_1548ea92c71a222352108c4126d" FOREIGN KEY ("facultyId") REFERENCES "faculty"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_departments_department" ADD CONSTRAINT "FK_f4464e0308f86ac2add79fffdf1" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_departments_department" ADD CONSTRAINT "FK_c6ad859691a3f10ad7f8fe97420" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "course_departments_department" DROP CONSTRAINT "FK_c6ad859691a3f10ad7f8fe97420"`);
    await queryRunner.query(`ALTER TABLE "course_departments_department" DROP CONSTRAINT "FK_f4464e0308f86ac2add79fffdf1"`);
    await queryRunner.query(`ALTER TABLE "department" DROP CONSTRAINT "FK_1548ea92c71a222352108c4126d"`);
    await queryRunner.query(`ALTER TABLE "faculty" DROP CONSTRAINT "FK_1acc9a030442a4c318ce18d2400"`);
    await queryRunner.query(`ALTER TABLE "school_admin" DROP CONSTRAINT "FK_51141ccf3c7fd7ca1df3caed1fc"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_c6ad859691a3f10ad7f8fe9742"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_f4464e0308f86ac2add79fffdf"`);
    await queryRunner.query(`DROP TABLE "course_departments_department"`);
    await queryRunner.query(`DROP TABLE "course"`);
    await queryRunner.query(`DROP TABLE "department"`);
    await queryRunner.query(`DROP TABLE "faculty"`);
    await queryRunner.query(`DROP TABLE "school"`);
    await queryRunner.query(`DROP TABLE "school_admin"`);
  }
}
