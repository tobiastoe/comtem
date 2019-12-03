import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RetailerPage } from './retailer.page';

describe('RetailerPage', () => {
  let component: RetailerPage;
  let fixture: ComponentFixture<RetailerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RetailerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
