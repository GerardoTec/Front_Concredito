import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

const url = environment.url;
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
  rfc:['',Validators.required],
  archivo: new FormArray([])
 })

  constructor(private fb:FormBuilder,
              private http: HttpClient,
              private router: Router
              ) { }

  ngOnInit(): void {

  }

  public get archivos():FormArray{
  return this.formCaptura.get('archivo') as FormArray;
  };
  
   selectFiles(event){ 
    
       if(event.target.files.length>0){
         const file = event.target.files[0]
         this.archivos.push(this.fb.control(file));
       }
   }

  
   crearProspecto1(){
     
     const formData = new FormData();

     formData.append('nombre',this.formCaptura.get('nombre').value);
     formData.append('primerApellido',this.formCaptura.get('primerApellido').value);
     formData.append('segundoApellido',this.formCaptura.get('segundoApellido').value);
     formData.append('calle',this.formCaptura.get('calle').value);
     formData.append('numero',this.formCaptura.get('numero').value);
     formData.append('colonia',this.formCaptura.get('colonia').value);
     formData.append('codigoPostal',this.formCaptura.get('codigoPostal').value);
     formData.append('telefono',this.formCaptura.get('telefono').value);
     formData.append('rfc',this.formCaptura.get('rfc').value);
     this.archivos.controls.forEach( archivo=>{
          formData.append('archivo',archivo.value);
     });
        console.log(this.formCaptura.value);
            if(this.archivos.length === 0){
            Swal.fire('Error', 'debes cargar tu archivo','error');
          }

          else if(this.formCaptura.valid){
            this.http.post(`${url}/api/prospectos/`,formData).subscribe((res:any) =>{
       
               console.log(res);
               Swal.fire('Guardado', `se ha guardado ${res.prospectoDB.nombre}`,'success');
               this.formCaptura.reset();
               this.router.navigateByUrl('/lista');
            }, (err) =>{
              Swal.fire('Error', err.error.msg, 'error');
            });
          }else{
    
            Swal.fire('Error', 'Por favor LLena todos los campos', 'error');   

          }
     
        }

        salir(){

          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Seguro Desea Salir?',
            text: "Se Borraran Los Datos Capturados!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si,Salir!',
            cancelButtonText: 'No, Cancelar!',
            reverseButtons: true
          }).then((result) => {
            if (result.value) {
              swalWithBootstrapButtons.fire(
                'Borrado!',
                'Se a perdido los datos.',
                'success'
              )
              this.formCaptura.reset();
              console.log('se fue');
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
              ) {
                swalWithBootstrapButtons.fire(
                  'Cancelled',
                  'Sigamos Con el Formulario :)',
                  'error'
                  )
              console.log('permanece');
            }
          })
          
        }
   
  
      }