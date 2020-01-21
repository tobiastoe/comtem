import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PushupComponent } from './pushup.component';

describe('PushupComponent', () => {
  let component: PushupComponent;
  let fixture: ComponentFixture<PushupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PushupComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PushupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
