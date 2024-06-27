import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSVGComponent } from './map-svg.component';

describe('MapSVGComponent', () => {
  let component: MapSVGComponent;
  let fixture: ComponentFixture<MapSVGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapSVGComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapSVGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
