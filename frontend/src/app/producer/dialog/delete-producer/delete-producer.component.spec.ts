import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProducerComponent } from './delete-producer.component';

describe('DeleteProducerComponent', () => {
  let component: DeleteProducerComponent;
  let fixture: ComponentFixture<DeleteProducerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteProducerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
