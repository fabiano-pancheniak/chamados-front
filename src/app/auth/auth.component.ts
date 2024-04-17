import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})

export class AuthComponent {
  loginService = inject(LoginService);
  loginForm = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private router: Router){ }

  async onSubmit(): Promise<void> {
    const login: any = this.loginForm.get('login')?.value
    const password: any = this.loginForm.get('password')?.value
    const token = await this.loginService.login(login, password);

    if(token){
      this.router.navigate(['/home'])
    }
  }
  

}
