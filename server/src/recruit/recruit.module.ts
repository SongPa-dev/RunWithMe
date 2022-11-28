import { Module } from "@nestjs/common";
import { RecruitService } from "./recruit.service";
import { RecruitController } from "./recruit.controller";
import { TypeOrmCustomModule } from "src/common/typeorm/typeorm.module";
import { UserRepository } from "src/common/repositories/user.repository";
import { UserRecruitRepository } from "src/common/repositories/user_recruit.repository";
import { RecruitRepository } from "../common/repositories/recruit.repository";
import { CustomJwtModule } from "src/common/modules/custom-jwt/custom-jwt.module";

@Module({
    imports: [
        TypeOrmCustomModule.forCustomRepository([RecruitRepository, UserRepository, UserRecruitRepository]),
        CustomJwtModule,
    ],
    providers: [RecruitService],
    controllers: [RecruitController],
})
export class RecruitModule {}
