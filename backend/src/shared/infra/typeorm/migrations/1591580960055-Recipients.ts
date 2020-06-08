import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class Recipients1591580960055 implements MigrationInterface {
  private columns = [
    new TableColumn({
      name: 'name',
      type: 'varchar',
      width: 255,
      default: "'-'",
    }),
  ];

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('recipients', this.columns)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('recipients', this.columns)
  }
}
