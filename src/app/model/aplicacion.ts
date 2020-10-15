import { Punto } from './punto';

export class Aplicacion{
  public id: string;
  public operario: string;
  public pulverizadora: string;
  public receta_espendio: string;
  public receta_aplicacion: string;
  public datos_aplicacion: Array<Punto>;
}