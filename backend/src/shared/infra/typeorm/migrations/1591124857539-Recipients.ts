import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class Recipients1591124857539 implements MigrationInterface {
  private recipients = new Table({
    name: 'recipients',
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
        name: 'street',
        type: 'varchar',
        width: 255,
      },
      {
        name: 'number',
        type: 'varchar',
        width: 255,
      },
      {
        name: 'complement',
        type: 'varchar',
        width: 255,
      },
      {
        name: 'state',
        type: 'varchar',
        width: 255,
      },
      {
        name: 'city',
        type: 'varchar',
        width: 255,
      },
      {
        name: 'cep',
        type: 'varchar',
        width: 255,
      },
    ],
  });

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.recipients)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.recipients)
  }
}
