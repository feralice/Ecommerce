import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertStatus1748396909943 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            INSERT INTO public.payment_status(id, name)	VALUES (1, 'Done');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            DELETE FROM public.payment_status WHERE id = 1;
        `);
  }
}
