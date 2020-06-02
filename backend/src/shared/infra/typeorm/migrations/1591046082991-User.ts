import { MigrationInterface, QueryRunner } from 'typeorm'
import bcrypt from 'bcryptjs'
import User from '../../../../modules/users/infra/typeorm/entities/User'

export class User1591046082991 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    const admin = {
      name: 'Distribuidora FastFeet',
      email: 'admin@fastfeet.com',
      password: bcrypt.hashSync('123456', 8)
    }
    await queryRunner.manager.insert(User, admin)
  }

  public async down (): Promise<void> {
    // do nothing
  }
}
