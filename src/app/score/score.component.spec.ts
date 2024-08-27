import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreComponent } from './score.component';
import { HttpClientModule } from '@angular/common/http';

describe('ScoreComponent', () => {
  let component: ScoreComponent;
  let fixture: ComponentFixture<ScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ScoreComponent,
        HttpClientModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
