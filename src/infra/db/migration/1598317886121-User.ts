import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class User1598317886121 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name:'users',
            columns:[
                {
                    name:'id',
                    type:'uuid',
                    isPrimary:true,
                    generationStrategy:'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name:'name',
                    type:'varchar(30)',
                    isNullable:false
                },
                {
                    name:'email',
                    type:'varchar(50)',
                    isNullable:false,
                    isUnique:true
                },
                {
                    name:'password',
                    type:'varchar',
                    isNullable:false
                },
                {
                    name:'created_At',
                    type:'timestamp',
                    default:'now()'
                },
                {
                    name:'updated_At',
                    type:'timestamp',
                    default:'now()'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('users')
    }
}
