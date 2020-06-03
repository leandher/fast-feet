import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class Recipients1591143903165 implements MigrationInterface {
  private columns = [
    new TableColumn({
      name: 'district',
      type: 'varchar',
      isNullable: true,
      width: 255,
      default: '',
    }),
    new TableColumn({
      name: 'created_at',
      type: 'timestamptz',
      isNullable: false,
      default: 'now()',
    }),
    new TableColumn({
      name: 'updated_at',
      type: 'timestamptz',
      isNullable: false,
      default: 'now()',
    }),
  ];

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('recipients', this.columns)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('recipients', this.columns)
  }
}
