import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlertCustomerEntersComponent } from './alert-customer-enters.component';

describe('AlertCustomerEntersComponent', () => {
  let component: AlertCustomerEntersComponent;
  let fixture: ComponentFixture<AlertCustomerEntersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertCustomerEntersComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertCustomerEntersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
