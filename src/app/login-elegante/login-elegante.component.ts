
import { Component } from '@angular/core';

@Component({
  selector: 'app-login-elegante',
  standalone: true,
  templateUrl: './login-elegante.component.html',
  styleUrl: './login-elegante.component.css'
})
export class LoginEleganteComponent {

  // Inicia la autenticación del usuario mediante Azure Easy Auth.
  iniciarSesion(): void {

    // URL del Backend for Frontend (BFF) desplegado en Azure Container Apps.
    const bffUrl =
      'https://ca-legga-documentos.kindsand-630031cb.chilecentral.azurecontainerapps.io';

    // Destino al que regresará el usuario después de autenticarse.
    // Corresponde al Dashboard de LEGGA en Azure Static Web Apps.
    const destino =
      'https://agreeable-forest-0ef55150f3.azurestaticapps.net/dashboard';

    // Construye la URL de autenticación utilizando el proveedor
    // personalizado de Entra External ID configurado en Easy Auth.
    const loginUrl =
      `${bffUrl}/.auth/login/leggaexternal` +
      `?post_login_redirect_uri=${encodeURIComponent(destino)}`;

    // Redirige el navegador al proceso de autenticación de Azure.
    window.location.href = loginUrl;
  }
}
