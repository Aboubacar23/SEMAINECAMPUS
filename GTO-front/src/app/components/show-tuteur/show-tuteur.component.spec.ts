import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTuteurComponent } from './show-tuteur.component';

describe('ShowTuteurComponent', () => {
  let component: ShowTuteurComponent;
  let fixture: ComponentFixture<ShowTuteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowTuteurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowTuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
