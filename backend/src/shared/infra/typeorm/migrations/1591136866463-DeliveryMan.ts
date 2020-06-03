import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class DeliveryMan1591136866463 implements MigrationInterface {
  private deliveryMan = new Table({
    name: 'delivery_man',
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
        name: 'name',
        type: 'varchar',
        isNullable: false,
        width: 255,
      },
      {
        name: 'email',
        type: 'varchar',
        width: 255,
        isNullable: false,
        isUnique: true,
      },
      {
        name: 'avatar_id ',
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
  });

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.deliveryMan)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.deliveryMan)
  }
}
