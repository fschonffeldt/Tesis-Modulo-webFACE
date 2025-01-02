import React from 'react';
import 'bulma/css/bulma.min.css';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login, register } from '../services/auth.service';
import { showErrorLogin } from '../helpers/swaHelper.js';
import Swal from 'sweetalert2';

function LoginForm() {
  const navigate = useNavigate();
  const { register: formRegister, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    login(data)
      .then(() => navigate('/listar-avisos'))
      .catch(() => showErrorLogin());
  };

  const handleActivateAccount = () => {
    Swal.fire({
      title: 'Activar cuenta',
      input: 'email',
      inputLabel: 'Ingresa tu correo electrónico para activar la cuenta',
      inputPlaceholder: 'ejemplo@dominio.com',
      showCancelButton: true,
      confirmButtonText: 'Activar',
      cancelButtonText: 'Cancelar',
      inputValidator: (email) => {
        if (!email) return 'El correo es obligatorio';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Ingresa un correo válido';
      },
    }).then((result) => {
      if (result.isConfirmed) {
        register(result.value)
          .then(() => Swal.fire('Cuenta activada', 'Revisa tu correo para más detalles', 'success'))
          .catch((error) => Swal.fire('Error', error.response?.data?.message || 'Error al activar la cuenta', 'error'));
      }
    });
  };

  return (
    <div className="page-container">
      <img src="UB.jpg" alt="Background" />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'rgba(245, 245, 245, 0.8)' }}>
        <div style={{ width: '400px', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', textAlign: 'center' }}>
          <h1 className="title is-3">Iniciar sesión</h1>
          <p>Ingresa tu correo electrónico para acceder a tu cuenta.</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label className="label" htmlFor="email" style={{ textAlign: 'left' }}>Correo electrónico</label>
              <div className="control">
                <input
                  className={`input ${errors.email ? 'is-danger' : ''}`}
                  type="email"
                  id="email"
                  placeholder="ejemplo@dominio.com"
                  {...formRegister('email', { required: 'Este campo es obligatorio' })}
                />
              </div>
              {errors.email && <p className="help is-danger">{errors.email.message}</p>}
            </div>
            <div className="field">
              <label className="label" htmlFor="password" style={{ textAlign: 'left' }}>Contraseña</label>
              <div className="control">
                <input
                  className={`input ${errors.password ? 'is-danger' : ''}`}
                  type="password"
                  id="password"
                  placeholder="●●●●●●●●"
                  {...formRegister('password', { required: 'Este campo es obligatorio' })}
                />
              </div>
              {errors.password && <p className="help is-danger">{errors.password.message}</p>}
            </div>
            <div className="field">
              <div className="control">
                <button type="submit" className="button is-link">Iniciar sesión</button>
              </div>
            </div>
          </form>
          <div className="field has-text-centered">
            <p>
              <a href="#" onClick={handleActivateAccount} style={{ fontWeight: 'bold', textDecoration: 'none' }}>
                Activar cuenta
              </a>
              {' '}|{' '}
              <a href="#" style={{ fontWeight: 'bold', textDecoration: 'none' }}>
                ¿Olvidaste tu contraseña?
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
