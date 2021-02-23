import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProspectoService } from '../services/prospecto.service';



@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {

 archivos = [];

  public formAdmin = this.fb.group({
    motivo:['', Validators.required]
  });
  
  @Input() persona;
  constructor(private prospecto:ProspectoService,
             private fb: FormBuilder,
             private router: Router) { }

  ngOnInit(): void {
   this.persona= JSON.parse(localStorage.getItem('persona'));
   this.archivos = this.persona.archivo;
  }
  
  doc(archivo){
      let { _id}= this.persona;
      this.prospecto.retornarImage(archivo, _id);
   
    }

    aprobar(){
    const {_id } = this.persona;
    let estado = {
      estado:'aprobado',
      motivo:''
             }
   this.prospecto.actualizar(_id,estado )
       .subscribe( (res:any) => { 
        Swal.fire('Aprobado',`se Aprobo con exito a ${res.prospectoActualizado.nombre}`, 'success');
          this.router.navigateByUrl('/lista');
       }, (err) => {
         Swal.fire('Error', err.error.msg, 'error');
       });
    
    }
    rechazar(){
      const {_id}= this.persona;
      let {motivo} = this.formAdmin.value;
        let estado = {
          estado:'rechazado',
          motivo: motivo
        }
        if(this.formAdmin.get('motivo').value === ''){
          this.formAdmin.invalid;
          Swal.fire('Error', 'Tienes que especificar el motivo', 'error');
        }else{
            this.prospecto.actualizar(_id ,estado)
            .subscribe((res:any) =>{
              // console.log(res);
              Swal.fire('Rechazado',`Has rechazado a ${res.prospectoActualizado.nombre}`,'success');
              this.router.navigateByUrl('/lista');
            });
            this.formAdmin.reset();
        }
      
    }

  



}
