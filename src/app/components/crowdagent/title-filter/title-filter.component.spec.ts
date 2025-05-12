import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleFilterComponent } from './title-filter.component';

describe('TitleFilterComponent', () => {
  let component: TitleFilterComponent;
  let fixture: ComponentFixture<TitleFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [TitleFilterComponent]
});
    fixture = TestBed.createComponent(TitleFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
