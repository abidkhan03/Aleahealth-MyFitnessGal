import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSchema1712047714626 implements MigrationInterface {
    name = 'CreateSchema1712047714626'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`goal_management\` (\`goalId\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NOT NULL, \`target\` int NOT NULL, \`startDate\` timestamp NOT NULL, \`endDate\` timestamp NOT NULL, \`status\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`goalId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`check_in\` (\`checkinId\` int NOT NULL AUTO_INCREMENT, \`date\` timestamp NOT NULL, \`note\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`checkinId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`activityTracking\` (\`activityId\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NOT NULL, \`stepsCounted\` int NOT NULL, \`distance\` varchar(255) NOT NULL, \`duration\` varchar(255) NOT NULL, \`date\` timestamp NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`activityId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`intakeTracking\` (\`intakeId\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NOT NULL, \`quantity\` int NOT NULL, \`calories\` varchar(255) NOT NULL, \`date\` timestamp NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`intakeId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`weightTracking\` (\`weightId\` int NOT NULL AUTO_INCREMENT, \`weight\` varchar(255) NOT NULL, \`dateLogged\` timestamp NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`weightId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`meals\` (\`mealId\` int NOT NULL AUTO_INCREMENT, \`mealType\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`calories\` varchar(255) NOT NULL, \`protein\` varchar(255) NOT NULL, \`carbs\` varchar(255) NOT NULL, \`fat\` varchar(255) NOT NULL, \`servingSize\` varchar(255) NOT NULL, \`mealPlanId\` int NULL, PRIMARY KEY (\`mealId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`mealPlan\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`mealPlanId\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`userId\` int NOT NULL, \`totalCalories\` int NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`mealPlanId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NOT NULL AUTO_INCREMENT, \`fullName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workoutplan\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`workoutPlanId\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`workoutPlanId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workout\` (\`workoutId\` int NOT NULL AUTO_INCREMENT, \`exerciseName\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`duration\` varchar(255) NOT NULL, \`intensity\` varchar(255) NOT NULL, \`workoutPlanId\` int NULL, PRIMARY KEY (\`workoutId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`goal_management\` ADD CONSTRAINT \`FK_27e39814f9b2ad3521870afde75\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`check_in\` ADD CONSTRAINT \`FK_bf6f31f3f4c20b7cd20b6e674f6\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activityTracking\` ADD CONSTRAINT \`FK_0282691d0e42351179f1d410a85\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`intakeTracking\` ADD CONSTRAINT \`FK_46b791591ba375487f0486612ac\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`weightTracking\` ADD CONSTRAINT \`FK_31fd86b1787474a7791fa2d3e18\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`meals\` ADD CONSTRAINT \`FK_4a0b86d259b3a2448e741bbebde\` FOREIGN KEY (\`mealPlanId\`) REFERENCES \`mealPlan\`(\`mealPlanId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mealPlan\` ADD CONSTRAINT \`FK_42cb269aad92e952b15d3d3d8cf\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`workoutplan\` ADD CONSTRAINT \`FK_6ef4237f39b4b2e57834280ee6f\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`workout\` ADD CONSTRAINT \`FK_f9e23b6c0e611b88ed0c05f2485\` FOREIGN KEY (\`workoutPlanId\`) REFERENCES \`workoutplan\`(\`workoutPlanId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`workout\` DROP FOREIGN KEY \`FK_f9e23b6c0e611b88ed0c05f2485\``);
        await queryRunner.query(`ALTER TABLE \`workoutplan\` DROP FOREIGN KEY \`FK_6ef4237f39b4b2e57834280ee6f\``);
        await queryRunner.query(`ALTER TABLE \`mealPlan\` DROP FOREIGN KEY \`FK_42cb269aad92e952b15d3d3d8cf\``);
        await queryRunner.query(`ALTER TABLE \`meals\` DROP FOREIGN KEY \`FK_4a0b86d259b3a2448e741bbebde\``);
        await queryRunner.query(`ALTER TABLE \`weightTracking\` DROP FOREIGN KEY \`FK_31fd86b1787474a7791fa2d3e18\``);
        await queryRunner.query(`ALTER TABLE \`intakeTracking\` DROP FOREIGN KEY \`FK_46b791591ba375487f0486612ac\``);
        await queryRunner.query(`ALTER TABLE \`activityTracking\` DROP FOREIGN KEY \`FK_0282691d0e42351179f1d410a85\``);
        await queryRunner.query(`ALTER TABLE \`check_in\` DROP FOREIGN KEY \`FK_bf6f31f3f4c20b7cd20b6e674f6\``);
        await queryRunner.query(`ALTER TABLE \`goal_management\` DROP FOREIGN KEY \`FK_27e39814f9b2ad3521870afde75\``);
        await queryRunner.query(`DROP TABLE \`workout\``);
        await queryRunner.query(`DROP TABLE \`workoutplan\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`mealPlan\``);
        await queryRunner.query(`DROP TABLE \`meals\``);
        await queryRunner.query(`DROP TABLE \`weightTracking\``);
        await queryRunner.query(`DROP TABLE \`intakeTracking\``);
        await queryRunner.query(`DROP TABLE \`activityTracking\``);
        await queryRunner.query(`DROP TABLE \`check_in\``);
        await queryRunner.query(`DROP TABLE \`goal_management\``);
    }

}
