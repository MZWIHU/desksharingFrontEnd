import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesksharingHeaderComponent } from './desksharingHeader.component';

describe('HeaderComponent', () => {
  let component: DesksharingHeaderComponent;
  let fixture: ComponentFixture<DesksharingHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesksharingHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesksharingHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
