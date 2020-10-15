import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AplicacionPage } from './aplicacion.page';

describe('AplicacionPage', () => {
  let component: AplicacionPage;
  let fixture: ComponentFixture<AplicacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AplicacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AplicacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
