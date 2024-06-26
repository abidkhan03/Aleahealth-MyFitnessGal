import { ValueTransformer } from "typeorm";
import { Hash } from "../../utils/hash.util";


export class PasswordTransformer implements ValueTransformer {
    to(value: string) {
        return Hash.make(value);
    }

    from(value: string) {
        return value;
    }
}