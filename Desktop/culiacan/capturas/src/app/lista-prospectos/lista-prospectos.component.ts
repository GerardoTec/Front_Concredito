import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProspectoService } from '../services/prospecto.service';

@Component({
  selector: 'app-lista-prospectos',
  templateUrl: './lista-prospectos.component.html',
  styleUrls: ['./lista-prospectos.component.css']
})
export class ListaProspectosComponent implements OnInit {

  prospetos:any[];
  constructor(private prospectoServices: ProspectoService,
             private router: Router) { }

  ngOnInit(): void {
    this.obtenerProspectos();
  }

  obtenerProspectos(){
    this.prospectoServices.obtenerProspectos()
        .subscribe( (res:any)=>{
          this.prospetos = res.prospecto;
    // console.log(res);
        })
  }

  persona( persona ){
    // console.log(persona);
    
     localStorage.setItem('persona',JSON.stringify(persona));
     this.router.navigateByUrl('/administracion');

  }
}
