import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannnerComponent } from './bannner.component';

describe('BannnerComponent', () => {
  let component: BannnerComponent;
  let fixture: ComponentFixture<BannnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
