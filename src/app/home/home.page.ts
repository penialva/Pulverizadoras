import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Aplicacion } from '../model/aplicacion';
import { AplicacionesService } from '../services/aplicaciones.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
  
export class HomePage implements OnInit{
  
  private aplicaciones: Array<Aplicacion> = [];

  constructor(private aplicSrv: AplicacionesService,
              private loading: LoadingController) { }
  
  public async ngOnInit() {
    const loading = await this.loading.create();
    loading.present();
    this.aplicSrv.obtenerTodas().subscribe(datos =>{
      this.aplicaciones = datos;
      loading.dismiss();
    });
  };

  public hayAlarmas(aplic: Aplicacion) {
    let alarma: boolean = false;
    for (let dat of aplic.datos_aplicacion) {
      if (dat.alarma == "S") {
        alarma = true;
      }
    }
    return alarma;
  }
}
