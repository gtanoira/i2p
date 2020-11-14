import { Prop } from "@nestjs/mongoose";

export class Orden {

  @Prop({unique: true})
  public sapId!: string;

  @Prop()
  public name!: string;
};
