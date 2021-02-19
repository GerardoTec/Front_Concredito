import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProspectoI } from '../interfaces/interface.prospecto';
//http://localhost:3000/api/prospectos/
const url = environment.url;
@Injectable({
  providedIn: 'root'
})
export class ProspectoService {

  constructor(private http: HttpClient) { }



  crearProspecto(prospecto:ProspectoI){
    return this.http.post(`${url}/api/prospectos/`,prospecto);
  }

  obtenerProspectos(){
    return this.http.get(`${url}/api/prospectos/`);
  }

}
