import { Module } from "@nestjs/common";
import { Bcrypt } from "./bcrypt/bcrypt";

@Module({
    providers: [Bcrypt],
    exports: [Bcrypt]
})
export class AuthModule {}