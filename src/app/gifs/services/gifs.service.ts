import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];
  private apiKey: string = 'EpEEmaA6Iex9DwRsG6dQQ4W5OGTug9nj';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  public resultado: Gif[] = [];

  constructor(
    private http: HttpClient
  ) { 
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultado = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  get historial(): string[]{
    return [...this._historial];
  }

  buscarGifs( query:string )
  {
    
    query = query.trim().toLowerCase();

    if( !this._historial.includes( query ) )
    {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', '10')
        .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
            .subscribe(resp => {
              console.log(resp.data);
              this.resultado = resp.data;
            });

            localStorage.setItem('resultados', JSON.stringify(this.resultado));
  }

}
