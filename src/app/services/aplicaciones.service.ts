import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aplicacion } from '../model/aplicacion';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
  
export class AplicacionesService {

  private aplicaciones: Array<Aplicacion> = [];

  constructor(private httpClient:HttpClient) { };

  public obtenerTodas(){
    return this.httpClient.get<Aplicacion[]>("http://192.168.1.103:3000/aplicaciones");
  };

  public obtenerPorId(id: string) {
    return this.httpClient.get<Aplicacion>("http://192.168.1.103:3000/aplicaciones/"+id);
  };

}
