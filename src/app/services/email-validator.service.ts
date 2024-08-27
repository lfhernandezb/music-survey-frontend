import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { Survey } from '../interfaces/survey';
import { SurveyService } from './survey.service';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService {

  constructor(private surveyService: SurveyService) {

  }

  public checkEmail(): any {

    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return this.surveyService.getByEmail(control.value).pipe(map(
        (survey: Survey) => {
          return (survey && survey.correo == control.value) ? { "existsEmail": true } : null;
        }

      ));
    };

  }
}
