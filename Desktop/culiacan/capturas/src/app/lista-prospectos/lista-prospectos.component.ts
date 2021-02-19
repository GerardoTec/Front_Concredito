import { Component, OnInit } from '@angular/core';
import { ProspectoService } from '../services/prospecto.service';

@Component({
  selector: 'app-lista-prospectos',
  templateUrl: './lista-prospectos.component.html',
  styleUrls: ['./lista-prospectos.component.css']
})
export class ListaProspectosComponent implements OnInit {

  prospetos:any[];
  constructor(private prospectoServices: ProspectoService) { }

  ngOnInit(): void {
    this.obtenerProspectos();
  }

  obtenerProspectos(){
    this.prospectoServices.obtenerProspectos()
        .subscribe( (res:any)=>{
          this.prospetos = res.prospecto;
    console.log(res);
        })
  }

}
