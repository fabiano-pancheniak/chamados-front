import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ChamadosService } from '../../services/chamados.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-chamados',
  standalone: true,
  imports: [NgFor],
  templateUrl: './chamados.component.html',
  styleUrl: './chamados.component.scss'
})
export class ChamadosComponent { 
  chamados: any = []
  constructor(private chamadosService: ChamadosService){
    chamadosService.getChamadosByUser()?.subscribe({
      next: (value) => {
        this.chamados = value
        console.log(this.chamados)
      },
      error: () => console.log("erro")
    })

  }
}
