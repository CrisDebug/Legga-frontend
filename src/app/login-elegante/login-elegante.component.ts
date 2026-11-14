
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-elegante',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main class="login-page">
      <section class="brand-panel">
        <div class="brand-content">
          <div class="wordmark" aria-label="LEGGA">LEGGA</div>
        </div>
        <div class="divider"></div>
      </section>

      <section class="form-panel">
        <div class="login-form">
          <form (ngSubmit)="login($event)">
            <div class="field">
              <label for="email">Correo electrónico</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="nombre@correo.com"
                autocomplete="username"
                [(ngModel)]="email"
                required
                email
              />
            </div>

            <div class="field">
              <div class="field-heading">
                <label for="password">Contraseña</label>
                <a href="#" (click)="forgotPassword($event)">
                  ¿La olvidaste?
                </a>
              </div>

              <div class="password-wrapper">
                <input
                  id="password"
                  name="password"
                  [type]="showPassword ? 'text' : 'password'"
                  placeholder="Ingresa tu contraseña"
                  autocomplete="current-password"
                  [(ngModel)]="password"
                  required
                />

                <button
                  class="eye-button"
                  type="button"
                  (click)="showPassword = !showPassword"
                  [attr.aria-label]="showPassword
                    ? 'Ocultar contraseña'
                    : 'Mostrar contraseña'"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"
                    />
                    <circle cx="12" cy="12" r="3" />
                    <path *ngIf="showPassword" d="M4 4 20 20" />
                  </svg>
                </button>
              </div>
            </div>

            <button class="primary-button" type="submit">
              Iniciar sesión
            </button>

            <p class="feedback" *ngIf="message" role="status">
              {{ message }}
            </p>
          </form>
        </div>
      </section>
    </main>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      font-family: Arial, Helvetica, sans-serif;
      color: #39332f;
    }

    * {
      box-sizing: border-box;
    }

    .login-page {
      min-height: 100vh;
      display: grid;
      grid-template-columns: 1.08fr 1fr;
      align-items: stretch;
      gap: clamp(28px, 5vw, 76px);
      padding: 38px clamp(24px, 5vw, 80px);
      background: #f6f1e9;
    }

    .brand-panel {
      position: relative;
      display: flex;
      align-items: center;
      min-width: 0;
    }

    .brand-content {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 24px;
    }

    .wordmark {
      color: #a85d45;
      font-size: clamp(48px, 5.2vw, 78px);
      font-weight: 300;
      letter-spacing: .105em;
      line-height: 1;
      white-space: nowrap;
    }

    .divider {
      position: absolute;
      right: calc(clamp(28px, 5vw, 76px) / -2);
      width: 1px;
      height: 72%;
      background: #ded4c9;
    }

    .form-panel {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 0;
    }

    .login-form {
      width: 100%;
      max-width: 320px;
    }

    form {
      width: 100%;
      margin: 0;
    }

    .field {
      width: 100%;
      margin: 0 0 24px;
    }

    .field > label,
    .field-heading label {
      display: block;
      margin: 0;
      color: #39332f;
      font-size: 14px;
      font-weight: 600;
      line-height: 20px;
    }

    .field > label {
      margin-bottom: 8px;
    }

    .field-heading {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      min-height: 20px;
      margin-bottom: 8px;
    }

    .field-heading a {
      color: #91482f;
      font-size: 12px;
      line-height: 20px;
      text-decoration: none;
      white-space: nowrap;
    }

    .field-heading a:hover {
      text-decoration: underline;
    }

    .field input {
      display: block;
      width: 100%;
      height: 40px;
      margin: 0;
      padding: 0 12px;
      border: 1px solid #ded4c9;
      border-radius: 6px;
      outline: none;
      background: #fffcf7;
      color: #39332f;
      font-family: inherit;
      font-size: 14px;
      transition: border-color .2s, box-shadow .2s;
    }

    .field input::placeholder {
      color: #a18f81;
      opacity: 1;
    }

    .field input:focus {
      border-color: #a85d45;
      box-shadow: 0 0 0 3px rgba(168, 93, 69, .12);
    }

    .password-wrapper {
      position: relative;
      width: 100%;
    }

    .password-wrapper input {
      padding-right: 44px;
    }

    .eye-button {
      position: absolute;
      top: 50%;
      right: 5px;
      display: grid;
      place-items: center;
      width: 30px;
      height: 30px;
      padding: 0;
      transform: translateY(-50%);
      border: 0;
      background: transparent;
      color: #806047;
      cursor: pointer;
    }

    .eye-button svg {
      width: 19px;
      height: 19px;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.8;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .primary-button {
      display: block;
      width: 100%;
      height: 41px;
      margin: 0;
      padding: 0 16px;
      border: 0;
      border-radius: 6px;
      background: #783923;
      color: #fffaf4;
      font-family: inherit;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background .2s;
    }

    .primary-button:hover {
      background: #642d1c;
    }

    .primary-button:focus-visible,
    .eye-button:focus-visible {
      outline: 2px solid #a85d45;
      outline-offset: 3px;
    }

    .feedback {
      margin: 14px 0 0;
      color: #91482f;
      font-size: 12px;
      line-height: 1.5;
      text-align: center;
    }

    @media (max-width: 900px) {
      .login-page {
        grid-template-columns: 1fr;
        gap: 28px;
        padding: 28px 20px 36px;
      }

      .brand-panel {
        justify-content: center;
      }

      .brand-content {
        padding: 8px 0;
      }

      .wordmark {
        font-size: 48px;
      }

      .divider {
        display: none;
      }

      .form-panel {
        align-items: flex-start;
      }

      .login-form {
        max-width: 360px;
      }
    }

    @media (max-width: 420px) {
      .login-page {
        padding: 20px 18px 28px;
      }

      .wordmark {
        font-size: 42px;
      }

      .login-form {
        max-width: none;
      }
    }
  `]
})
export class LoginEleganteComponent {
  email = '';
  password = '';
  showPassword = false;
  message = '';

  login(event: Event): void {
    event.preventDefault();

    if (!this.email.trim() || !this.password) {
      this.message = 'Ingresa tu correo electrónico y contraseña.';
      return;
    }

    this.message =
      'La autenticación debe conectarse al proveedor de identidad de LEGGA.';
  }

  forgotPassword(event: Event): void {
    event.preventDefault();
    this.message =
      'La recuperación de contraseña debe gestionarse con la empresa.';
  }
}
