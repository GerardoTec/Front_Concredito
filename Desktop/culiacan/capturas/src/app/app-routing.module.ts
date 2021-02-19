import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministracionComponent } from './administracion/administracion.component';
import { CapturarComponent } from './capturar/capturar.component';
import { ListaProspectosComponent } from './lista-prospectos/lista-prospectos.component';

const routes: Routes = [
  {path:'capturar', component:CapturarComponent},
  {path:'lista', 
   component:ListaProspectosComponent},
   
     {
       path:'administracion',
       component:AdministracionComponent
     },
  {path:'**', redirectTo:'capturar'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
