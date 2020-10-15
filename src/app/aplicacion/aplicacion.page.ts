import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Aplicacion } from '../model/aplicacion';
import { Punto } from '../model/punto';
import { AplicacionesService } from '../services/aplicaciones.service';

declare var google;

@Component({
  selector: 'app-aplicacion',
  templateUrl: './aplicacion.page.html',
  styleUrls: ['./aplicacion.page.scss'],
})
  
export class AplicacionPage implements OnInit {

  private aplicacion = new Aplicacion;
  private marcadores: Array<any> = [];
  private fecha: string;
  private hora_inicio: string;
  private hora_fin: string;
  private temp_prom: string;
  private hum_prom: string;
  private vel_prom: string;
  private lat_prom: number;
  private long_prom: number;
  
  constructor(private activateRoute: ActivatedRoute,
              private aplicSrv: AplicacionesService,
              private alertController: AlertController,
              private loading: LoadingController) { }

  public async ngOnInit() {
    const loading = await this.loading.create();
    loading.present();
    this.activateRoute.paramMap.subscribe(paramMap => {
      this.aplicSrv.obtenerPorId(paramMap.get("id")).subscribe(datos => {
        this.aplicacion = datos;
        this.calcularPromedios();
        this.generarMapa();
        loading.dismiss();
      });
    });
    
  }

  public async generarAlert(pto: Punto) {
    const cuerpoAlerta = {
      header: "Parametros",
      subHeader: "Hora: " + pto.hora, 
      message: "Latitud: " + pto.latitud + "<br>" +
        "Longitud: " + pto.longitud + "<br>" +
        "Temperatura: " + pto.temperatura + "ºC<br>" +
        "Humedad: " + pto.humedad + "%<br>" + 
        "Velocidad Viento: " + pto.velocidad + "km/h<br>" + 
        "Dirección Viento: " + pto.direccion + "º",
      buttons: ["OK"]
    };
    const alerta = await this.alertController.create(cuerpoAlerta);
    await alerta.present();
  }

  public calcularPromedios() {
    let temp_prom = 0;
    let hum_prom = 0;
    let vel_prom = 0;
    let lat_prom = 0;
    let long_prom = 0;
    this.fecha = this.aplicacion.datos_aplicacion[0].fecha;
    for (let dat of this.aplicacion.datos_aplicacion) {
      temp_prom = temp_prom + dat.temperatura;
      hum_prom = hum_prom + dat.humedad;
      vel_prom = vel_prom + dat.velocidad;
      lat_prom = lat_prom + dat.latitud;
      long_prom = long_prom + dat.longitud;
    }
    let n = this.aplicacion.datos_aplicacion.length;
    this.temp_prom = (temp_prom / n).toFixed(2);
    this.hum_prom = (hum_prom / n).toFixed(2);
    this.vel_prom = (vel_prom / n).toFixed(2);
    this.hora_inicio = this.aplicacion.datos_aplicacion[0].hora;
    this.hora_fin = this.aplicacion.datos_aplicacion[n - 1].hora;
    this.lat_prom = lat_prom / n;
    this.long_prom = long_prom / n;
  }

  public async generarMapa() {

    const divMapa = document.getElementById("mapa");
    const map = new google.maps.Map(divMapa,
      {
        center: {
          lat: this.lat_prom,
          lng: this.long_prom
        },
        zoom: 15
      }
    );
    let i = 0;
    for (let pto of this.aplicacion.datos_aplicacion) {
      this.marcadores.push(new google.maps.Marker({
        position: {
          lat: pto.latitud,
          lng: pto.longitud
        },
        map: map
      }))
      this.marcadores[i].addListener('click', this.generarAlert.bind(this, pto));
      i = i + 1;
    }
  }
}
