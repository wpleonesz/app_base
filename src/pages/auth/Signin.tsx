import {
  IonApp,
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonInput,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonLoading,
  IonSpinner,
  IonToast,
  IonRow,
  IonCol,
  IonRouterLink,
  IonFooter,
} from '@ionic/react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { institutionService } from 'services/institution.service';
import { authService, Credentials } from 'services/auth.service';
import { profileData } from 'storage/profile';
import store from 'storage/store';
import './Signin.css';
import { isEmpty } from 'lodash';
import { institutionData } from 'storage/institution';
import Recover from 'pages/user/recover';
import { eyeOutline, eyeOffOutline, logInOutline } from 'ionicons/icons';

const defaultCredentials = { username: '', password: '' };

const Signin = (props: any) => {
  const [form, setForm] = useState<Credentials>(defaultCredentials);
  const [, setInstitution] = useState<any>('');
  const [, setLogo] = useState<any>('');
  const usernameRef = useRef<HTMLIonInputElement | null>(null);
  const [institutions, setInstitutions] = useState([]);
  const [loadingInstitutions, setLoadingInstitutions] = useState(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const setLogged: Function = props.setLogged;

  const showError = (error: string) => {
    setError(error);
    setShowToast(true);
  };

  const defineInstitution = useCallback(
    (institutions: any) => {
      if (form.institutionId) return;
      setInstitutions(institutions);
      if (!isEmpty(institutions)) {
        const institution = institutions[0];
        setForm({ ...form, institutionId: institution?.id });
        setInstitution(institution.name);
        setLogo(institution.logo);
      }
    },
    [form],
  );

  const load = useCallback(async () => {
    if (form.institutionId) return;
    setLoadingInstitutions(true);
    try {
      const institutions = await institutionService.public.getAll();
      setInstitutions(institutions);
      institutionData.set(institutions);
      defineInstitution(institutions);
    } catch (error: any) {
      const institutions = await institutionData.get();
      setInstitutions(institutions);
      defineInstitution(institutions);
      showError(error.error || error.message || error);
    } finally {
      setLoadingInstitutions(false);
    }
  }, [form, defineInstitution]);

  useEffect(() => {
    load();
  }, [load]);

  const onSubmit = async () => {
    setLoading(true);
    setSubmitted(true);
    if (!form.username || !form.password) {
      showError('Los campos de usuario y contraseña son requeridos');
      setLoading(false);
      return;
    }
    try {
      const user = await authService.signin(form);
      await profileData.set(user);
      try {
        const cookie = await store.get('cookie');
        console.log('Login exitoso, usuario:', user);
        console.log('Cookie almacenada tras login:', cookie);
      } catch (e) {
        console.log('Login exitoso, pero fallo al obtener cookie:', e);
      }
      setLogged(true);
    } catch (error: any) {
      showError(error.message || error.error || error);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      // Evitar doble submit si ya está cargando
      if (!loading) onSubmit();
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isUsernameEmpty = form.username.trim() === '';
  const isPasswordEmpty = form.password.trim() === '';

  return (
    <IonApp>
      <IonPage>
        <IonContent>
          {/* Cabecera reducida: el logo ya está dentro de la tarjeta de login */}
          <IonRow>
            <IonCol>
              <div className="login-container">
                <div className="login-card">
                  <div className="logo-container">
                    <img
                      className="logo-sign"
                      src="assets/images/logo.png"
                      alt="logo"
                    />
                  </div>

                  <div className="headline">Bienvenido</div>
                  <div className="subhead">Inicia sesión para continuar</div>

                  <div className="form-container">
                    <div>
                      <label className="custom-label">USUARIO</label>
                      <IonInput
                        ref={usernameRef}
                        value={form.username}
                        onIonChange={(e) =>
                          setForm({
                            ...form,
                            username: (e.detail.value || '').toString(),
                          })
                        }
                        onKeyDown={onKeyDown}
                        inputmode="text"
                        className="custom-input"
                        required
                        aria-label="Nombre de usuario"
                      />
                      {submitted && isUsernameEmpty && (
                        <IonLabel color="danger" role="alert">
                          Por favor ingrese su nombre de usuario.
                        </IonLabel>
                      )}
                    </div>

                    <div>
                      <label className="custom-label">CONTRASEÑA</label>
                      <div className="custom-input-container">
                        <IonInput
                          type={showPassword ? 'text' : 'password'}
                          value={form.password}
                          onIonChange={(e) =>
                            setForm({
                              ...form,
                              password: (e.detail.value || '').toString(),
                            })
                          }
                          onKeyDown={onKeyDown}
                          className="custom-input"
                          required
                          aria-label="Contraseña"
                        />
                        <IonIcon
                          icon={showPassword ? eyeOutline : eyeOffOutline}
                          onClick={toggleShowPassword}
                          className="icon-smaller"
                          role="button"
                          aria-label={
                            showPassword
                              ? 'Ocultar contraseña'
                              : 'Mostrar contraseña'
                          }
                        />
                      </div>
                      {submitted && isPasswordEmpty && (
                        <IonLabel color="danger" role="alert">
                          Por favor ingrese su contraseña.
                        </IonLabel>
                      )}
                    </div>

                    <div>
                      <label className="custom-label">INSTITUCIÓN</label>
                      {loadingInstitutions ? (
                        <IonSpinner />
                      ) : (
                        <IonSelect
                          value={form.institutionId}
                          placeholder="Seleccione"
                          onIonChange={(e) => {
                            setForm({
                              ...form,
                              institutionId: e.detail.value!,
                            });
                            const selected: any = institutions.find(
                              (item: any) => item.id === e.detail.value,
                            );
                            setInstitution(selected.name);
                            setLogo(selected.logo);
                          }}
                          className="custom-input"
                        >
                          {institutions.map((item: any) => (
                            <IonSelectOption value={item.id} key={item.id}>
                              {item.name}
                            </IonSelectOption>
                          ))}
                        </IonSelect>
                      )}
                    </div>
                  </div>

                  {/* Acciones: botón de recarga (si aplica), botón de login y enlace de recuperar */}
                  <div className="actions">
                    {isEmpty(institutions) && !loadingInstitutions && (
                      <IonButton
                        expand="block"
                        onClick={load}
                        className="submit-button"
                        style={{ marginBottom: '0.5rem' }}
                      >
                        Recargar instituciones
                      </IonButton>
                    )}

                    <IonButton
                      className="submit-button"
                      expand="block"
                      onClick={onSubmit}
                      disabled={loading || isUsernameEmpty || isPasswordEmpty}
                    >
                      {loading ? (
                        <>
                          <IonSpinner name="crescent" />
                          &nbsp;Cargando...
                        </>
                      ) : (
                        <>
                          <IonIcon icon={logInOutline} className="btn-icon" />
                          <span className="btn-text">INICIAR SESIÓN</span>
                        </>
                      )}
                    </IonButton>
                  </div>

                  <div className="custom-center">
                    <Recover />
                  </div>
                </div>
              </div>
            </IonCol>
          </IonRow>
          <IonFooter>
            <IonRow>
              <IonCol className="ion-align-self-center">
                <div className="custom-center">
                  <p className="custom-text">
                    <IonRouterLink
                      color="primary"
                      href="https://app.uea.edu.ec/policies"
                    >
                      Políticas de privacidad
                    </IonRouterLink>
                  </p>
                </div>
              </IonCol>
            </IonRow>
          </IonFooter>
          <IonLoading isOpen={loading} message={'Por favor espere...'} />
          <IonToast
            isOpen={showToast}
            color="danger"
            onDidDismiss={() => {
              setError('');
              setShowToast(false);
            }}
            message={error}
            duration={2000}
            position="top"
          />
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default Signin;
