import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LogingService } from '../services/loging.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  private usuario: string;
  private contrasena: string;
  private resp: any = { "type": "error" };
  
  constructor(private logSrv: LogingService,
              private alertController: AlertController,
              private router: Router) { }

  ngOnInit() {
  }

  public button_click(): void {
    this.logSrv.logearUsr(this.usuario, this.contrasena).subscribe(async datos =>{
      this.resp = datos;
      if (this.resp.type == "User" || this.resp.type == "Admin") {
        this.router.navigate(['/home']);
      }
      if (this.resp.type == "error") {
        const cuerpoAlerta = {
          header: "ERROR!",
          message: "Usuario o Contraseña incorrectos",
          buttons: ["OK"]
        };
        const alerta = await this.alertController.create(cuerpoAlerta);
        await alerta.present();
        this.usuario = "";
        this.contrasena = "";
      }
    });
    
    
  }

  //[routerLink]="['/home']
}
