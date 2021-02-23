import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
//http://localhost:3000/api/prospectos/
const url = environment.url;
@Injectable({
  providedIn: 'root'
})
export class ProspectoService {

  constructor(private http: HttpClient) { }


  obtenerProspectos(){
    return this.http.get(`${url}/api/prospectos/`);
  }
  actualizar(id, estado:{estado:string, motivo:string}){
    return this.http.put(`${url}/api/prospectos/${id}`,estado);
  }
  retornarImage(imagen, id){
    window.open(`${url}/api/subir/file/${id}/${imagen}`);
  }

}
