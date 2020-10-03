import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaTopHeadLines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';


const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headLinesPage = 0;

  categoriaActial = '';
  categoriaPage = 0;

  constructor( private http: HttpClient) { }

  private ejecutarQuery<T>( query: string ) {
    query = apiUrl + query ;
    return this.http.get<T>( query, { headers } );
  }


  getTopHeadLines() {

    this.headLinesPage++;

    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=mx&page=${ this.headLinesPage }`);
  }

  getTopHEadLinesCategoria( categoria: string ) {

    if (this.categoriaActial == categoria) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActial = categoria;
    }
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=mx&category=${ categoria }&page=${ this.categoriaPage }`);
  }
}
