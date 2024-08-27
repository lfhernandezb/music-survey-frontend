import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError, TimeoutError, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { EstiloMusical } from '../interfaces/estilo-musical';
import { Score } from '../interfaces/score';

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
export class ScoreService {

  constructor(private httpClient: HttpClient) { }

  public getScore(): Observable<Score[]> {
  	//argument: string = 'criteria=';

    // console.log('environment.apiEstiloMusical: '+environment.apiEstiloMusical);
    return this.httpClient.get<Score[]>(environment.scoreStyleApiUrl+'/api/scores/all', httpOptions); //get(environment.apiEstiloMusical+'/api/companys?criteria='+criteria, httpOptions);
    //return this.httpClient.get<EstiloMusical[]>(environment.apiUrl+'/api/companies/all', httpOptions); //get(environment.apiEstiloMusical+'/api/companys?criteria='+criteria, httpOptions);
  }

}
