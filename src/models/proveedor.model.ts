import { Prop } from "@nestjs/mongoose";

export class Proveedor {

  @Prop()
  public sapId!: string;

  @Prop()
  public name!: string;

  @Prop()
  public sapCondPago?: string;
};
