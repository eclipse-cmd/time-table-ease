import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchoolSchemaUpdated1693292091457 implements MigrationInterface {
  name = 'SchoolSchemaUpdated1693292091457';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "school_admin" DROP COLUMN "password"`);
    await queryRunner.query(`ALTER TABLE "school_admin" ADD "password" character varying(100) NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "school_admin" DROP COLUMN "password"`);
    await queryRunner.query(`ALTER TABLE "school_admin" ADD "password" text NOT NULL`);
  }
}
