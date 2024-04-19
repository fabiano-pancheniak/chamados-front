import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  providers: [LoginService],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})

export class AuthComponent {
  loginForm = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private router: Router,
    private loginService: LoginService,
  ){}

  async onSubmit(): Promise<void> {
    this.loginService.login(this.loginForm.value.login, this.loginForm.value.password).subscribe({
      next: (value: any) =>  {
        const {userRole} = value
        if(userRole == "USER"){
          this.router.navigate(['home'])
          return
        }
          this.router.navigate(['chamados'])
      },
      error: () => console.log("erro no loginService")
    })
  }
  

}
