import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class DeliveryProblem1591228717274 implements MigrationInterface {
  private table = new Table({
    name: 'delivery_problems',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        isUnique: true,
        generationStrategy: 'increment',
      },
      {
        name: 'order_id',
        type: 'integer',
      },
      {
        name: 'description',
        type: 'varchar',
        width: 255,
      },
      {
        name: 'created_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
    ],
    foreignKeys: [
      {
        columnNames: ['order_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'order',
        onDelete: 'CASCADE',
      },
    ],
  });

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table)
  }
}
