import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadersComponent } from './readers.component';

describe('ReadersComponent', () => {
  let component: ReadersComponent;
  let fixture: ComponentFixture<ReadersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ReadersComponent]
});
    fixture = TestBed.createComponent(ReadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
