import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class Order1591205131810 implements MigrationInterface {
  private table = new Table({
    name: 'order',
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
        name: 'recipient_id',
        type: 'integer',
      },
      {
        name: 'deliveryman_id',
        type: 'integer',
      },
      {
        name: 'signature_id',
        type: 'varchar',
        width: 255,
        isNullable: true,
      },
      {
        name: 'product',
        type: 'varchar',
        width: 255,
      },
      {
        name: 'canceled_at',
        type: 'timestamptz',
        width: 255,
        isNullable: true,
      },
      {
        name: 'start_date',
        type: 'timestamptz',
        width: 255,
        isNullable: true,
      },
      {
        name: 'end_date',
        type: 'timestamptz',
        width: 255,
        isNullable: true,
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
        columnNames: ['recipient_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'recipients',
        onDelete: 'CASCADE',
      },
      {
        columnNames: ['deliveryman_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'delivery_man',
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
