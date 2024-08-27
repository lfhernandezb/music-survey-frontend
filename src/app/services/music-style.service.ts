import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError, TimeoutError, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { EstiloMusical } from '../interfaces/estilo-musical';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Content-Security-Policy': 'default-src ' + environment.musicStyleApiUrl + '/;'
  }),
  observe: 'body' as const
};

@Injectable({
  providedIn: 'root'
})
export class MusicStyleService {

  constructor(private httpClient: HttpClient) { }

  public getByEstiloMusicalId(idEstiloMusical: string): Observable<EstiloMusical> {
  	//argument: string = 'criteria=';
    if (!idEstiloMusical) {
      idEstiloMusical = '';
    }
    // console.log('environment.apiEstiloMusical: '+environment.apiEstiloMusical);
    return this.httpClient.get<EstiloMusical>(environment.musicStyleApiUrl+'/api/musicstyles/'+idEstiloMusical, httpOptions); //get(environment.apiEstiloMusical+'/api/companys?criteria='+criteria, httpOptions);
    //return this.httpClient.get<EstiloMusical[]>(environment.apiUrl+'/api/companies/all', httpOptions); //get(environment.apiEstiloMusical+'/api/companys?criteria='+criteria, httpOptions);
  }

  public getAllEstiloMusical(): Observable<EstiloMusical[]> {
  	//argument: string = 'criteria=';

    // console.log('environment.apiEstiloMusical: '+environment.apiEstiloMusical);
    return this.httpClient.get<EstiloMusical[]>(environment.musicStyleApiUrl+'/api/musicstyles/all', httpOptions); //get(environment.apiEstiloMusical+'/api/companys?criteria='+criteria, httpOptions);
    //return this.httpClient.get<EstiloMusical[]>(environment.apiUrl+'/api/companies/all', httpOptions); //get(environment.apiEstiloMusical+'/api/companys?criteria='+criteria, httpOptions);
  }

}
