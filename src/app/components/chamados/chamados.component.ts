import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ChamadosService } from '../../services/chamados.service';

@Component({
  selector: 'app-chamados',
  standalone: true,
  imports: [],
  templateUrl: './chamados.component.html',
  styleUrl: './chamados.component.scss'
})
export class ChamadosComponent {
  chamadosList: Object = []
  constructor(private loginService: LoginService, private chamadosService: ChamadosService){
      loginService.getUserId().subscribe({
        next: (value: any) => {
          const { id } = value
          chamadosService.getChamados(id).subscribe({
            next: (value) => this.chamadosList = value,
            error: () => console.log('error')
          })
          
        },
        error: () => console.log('error')
      })
      console.log(this.chamadosList)
   }
}
