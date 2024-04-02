import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateMealplaneDto {
    user_id: number;
    
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        required: true
    })

    description: string;
}
