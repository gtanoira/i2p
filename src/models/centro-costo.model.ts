import { Prop } from "@nestjs/mongoose";

export class CentroCosto {

  @Prop({unique: true})
  public sapId!: string;

  @Prop()
  public name!: string;
};
