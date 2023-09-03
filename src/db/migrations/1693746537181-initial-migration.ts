import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1693746537181 implements MigrationInterface {
  name = 'InitialMigration1693746537181';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "school_admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullname" character varying(120) NOT NULL, "email" character varying(120) NOT NULL, "password" character varying(100) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "schoolId" uuid, CONSTRAINT "UQ_60b61005a7d7d4ffde62755e42f" UNIQUE ("email"), CONSTRAINT "PK_042aeaff9ad44d2ba67f2213ae9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "school" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(120) NOT NULL, "domainName" character varying(120) NOT NULL, "password" text NOT NULL, "theme" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_151a6368a0667eeed04f59d20df" UNIQUE ("domainName"), CONSTRAINT "PK_57836c3fe2f2c7734b20911755e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "venue" ("id" SERIAL NOT NULL, "name" character varying(120) NOT NULL, "capacity" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "facultyId" integer, CONSTRAINT "PK_c53deb6d1bcb088f9d459e7dbc0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "faculty" ("id" SERIAL NOT NULL, "name" character varying(120) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "schoolId" uuid, CONSTRAINT "PK_635ca3484f9c747b6635a494ad9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "department" ("id" SERIAL NOT NULL, "name" character varying(120) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "facultyId" integer, CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "course" ("id" SERIAL NOT NULL, "title" character varying(120) NOT NULL, "code" character varying(120) NOT NULL, "noOfStudents" integer NOT NULL, "lastTimeAllocated" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "belongsToId" integer, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "course_departments_offering_department" ("courseId" integer NOT NULL, "departmentId" integer NOT NULL, CONSTRAINT "PK_e7586207e3264aba451d05345ad" PRIMARY KEY ("courseId", "departmentId"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_582e6f2a9c85cdaa5e52ab9167" ON "course_departments_offering_department" ("courseId") `);
    await queryRunner.query(`CREATE INDEX "IDX_8729c75a2cc6757082a7201d8f" ON "course_departments_offering_department" ("departmentId") `);
    await queryRunner.query(
      `ALTER TABLE "school_admin" ADD CONSTRAINT "FK_51141ccf3c7fd7ca1df3caed1fc" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "venue" ADD CONSTRAINT "FK_113c5434d1abfaebf075550ea31" FOREIGN KEY ("facultyId") REFERENCES "faculty"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "faculty" ADD CONSTRAINT "FK_1acc9a030442a4c318ce18d2400" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "department" ADD CONSTRAINT "FK_1548ea92c71a222352108c4126d" FOREIGN KEY ("facultyId") REFERENCES "faculty"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "course" ADD CONSTRAINT "FK_b0c6fcb837fe6de758406ebd8be" FOREIGN KEY ("belongsToId") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_departments_offering_department" ADD CONSTRAINT "FK_582e6f2a9c85cdaa5e52ab91675" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_departments_offering_department" ADD CONSTRAINT "FK_8729c75a2cc6757082a7201d8fa" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "course_departments_offering_department" DROP CONSTRAINT "FK_8729c75a2cc6757082a7201d8fa"`);
    await queryRunner.query(`ALTER TABLE "course_departments_offering_department" DROP CONSTRAINT "FK_582e6f2a9c85cdaa5e52ab91675"`);
    await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_b0c6fcb837fe6de758406ebd8be"`);
    await queryRunner.query(`ALTER TABLE "department" DROP CONSTRAINT "FK_1548ea92c71a222352108c4126d"`);
    await queryRunner.query(`ALTER TABLE "faculty" DROP CONSTRAINT "FK_1acc9a030442a4c318ce18d2400"`);
    await queryRunner.query(`ALTER TABLE "venue" DROP CONSTRAINT "FK_113c5434d1abfaebf075550ea31"`);
    await queryRunner.query(`ALTER TABLE "school_admin" DROP CONSTRAINT "FK_51141ccf3c7fd7ca1df3caed1fc"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_8729c75a2cc6757082a7201d8f"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_582e6f2a9c85cdaa5e52ab9167"`);
    await queryRunner.query(`DROP TABLE "course_departments_offering_department"`);
    await queryRunner.query(`DROP TABLE "course"`);
    await queryRunner.query(`DROP TABLE "department"`);
    await queryRunner.query(`DROP TABLE "faculty"`);
    await queryRunner.query(`DROP TABLE "venue"`);
    await queryRunner.query(`DROP TABLE "school"`);
    await queryRunner.query(`DROP TABLE "school_admin"`);
  }
}
