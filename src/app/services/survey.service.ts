import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError, TimeoutError, of } from 'rxjs';
import { Survey } from '../interfaces/survey';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Content-Security-Policy': 'default-src ' + environment.scoreStyleApiUrl + '/;'
  }),
  observe: 'body' as const
};

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private httpClient: HttpClient) { }

  public getByEmail(email: string): Observable<Survey> {
  	//argument: string = 'criteria=';
    if (!email) {
      email = '';
    }
    // console.log('environment.apiSurvey: '+environment.apiSurvey);
    return this.httpClient.get<Survey>(environment.surveyApiUrl+'/api/surveys/param?email='+email, httpOptions); //get(environment.apiSurvey+'/api/surveys?criteria='+criteria, httpOptions);
    //return this.httpClient.get<Survey[]>(environment.apiUrl+'/api/companies/all', httpOptions); //get(environment.apiSurvey+'/api/surveys?criteria='+criteria, httpOptions);
  }

  public existsByEmail(email: string): Observable<boolean> {

    this.getByEmail(email).
      subscribe(
        (data)=>{
          console.log(data);
          let survey = data as Survey;

          return true;

        },
        (error) => {
          console.log('oops', error);
          //return null;
        }
    );
    return of(false);
  }

  public save(survey: Survey): Observable<Survey> {
  	//argument: string = 'criteria=';
    // console.log('environment.apiSurvey: '+environment.apiSurvey);
    return this.httpClient.post<Survey>(environment.surveyApiUrl+'/api/surveys/save', survey, httpOptions); //get(environment.apiSurvey+'/api/surveys?criteria='+criteria, httpOptions);
    //return this.httpClient.get<Survey[]>(environment.apiUrl+'/api/companies/all', httpOptions); //get(environment.apiSurvey+'/api/surveys?criteria='+criteria, httpOptions);
  }
}
