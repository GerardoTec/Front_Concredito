import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProspectoService } from '../services/prospecto.service';

@Component({
  selector: 'app-capturar',
  templateUrl: './capturar.component.html',
  styleUrls: ['./capturar.component.css']
})
export class CapturarComponent implements OnInit {
public formCaptura = this.fb.group({
  nombre:['',[Validators.required]],
  primerApellido:['',[Validators.required]],
  segundoApellido:[''],
  calle:['', Validators.required],
  numero:['', Validators.required],
  colonia:['', Validators.required],
  codigoPostal:['', Validators.required],
  telefono:['', Validators.required],
  rfc:['',Validators.required]

})
  constructor(private fb:FormBuilder,
              private prospectoService: ProspectoService
              ) { }

  ngOnInit(): void {

  }

  crearProspecto(){
    if(this.formCaptura.valid){
      this.prospectoService.crearProspecto(this.formCaptura.value)
          .subscribe( (res:any) =>{
            console.log(res);
            Swal.fire('Guardado',`${res.prospecto.nombre} Se guardo`, 'success');
          }, (err)=>{
            Swal.fire('Error', err.error.msg, 'error');
          });
          this.formCaptura.reset();
      
    }else{
      Swal.fire('Error', 'Por favor LLena todos los campos', 'error');   
    }
    
  }
  

}
