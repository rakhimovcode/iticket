import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";
import { Injectable, BadRequestException } from "@nestjs/common";
import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@ValidatorConstraint({ async: true })
@Injectable()
export class IsExistsConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectModel("User") private readonly userModel: Model<any> 
  ) {}

  async validate(value: any, args: ValidationArguments) {
    const [model] = args.constraints;
    if (!Types.ObjectId.isValid(value)) return false;

    const found = await model.findById(value).exec();
    return !!found;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} does not exist`;
  }
}

export function IsExists(model: any, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [model],
      validator: IsExistsConstraint,
    });
  };
}
