
import { Component } from '@angular/core';

@Component({
  selector: 'app-login-elegante',
  standalone: true,
  templateUrl: './login-elegante.component.html',
  styleUrl: './login-elegante.component.css'
})
export class LoginEleganteComponent {

  // Inicia la autenticación mediante Azure Easy Auth.
  iniciarSesion(): void {

    const bffUrl =
      'https://ca-legga-documentos.kindsand-630031cb.chilecentral.azurecontainerapps.io';

    const destino =
      'https://agreeable-forest-0ef55150f.3.azurestaticapps.net/dashboard';

    const loginUrl =
      `${bffUrl}/.auth/login/leggaexternal` +
      `?post_login_redirect_uri=${encodeURIComponent(destino)}`;

    window.location.href = loginUrl;
  }
}

