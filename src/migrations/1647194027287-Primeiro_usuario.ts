import {MigrationInterface, QueryRunner} from "typeorm";

export class PrimeiroUsuario1647194027287 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("INSERT INTO modulo_aulas.usuario (nome, email,senha) VALUES ('Usuaário administrador', " +
          "'usuario@admin.com.br', 'b946ccc987465afcda7e45b1715219711a13518d1f1663b8c53b848cb0143441')")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DELETE FROM modulo_aulas.usuario")
    }

}
