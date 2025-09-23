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
import { useState, useEffect, useCallback } from 'react';
import { institutionService } from 'services/institution.service';
import { authService, Credentials } from 'services/auth.service';
import { profileData } from 'storage/profile';
import store from 'storage/store';
import './Signin.css';
import { isEmpty } from 'lodash';
import { institutionData } from 'storage/institution';
import Recover from 'pages/user/recover';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';

const defaultCredentials = { username: '', password: '' };

const Signin = (props: any) => {
  const [form, setForm] = useState<Credentials>(defaultCredentials);
  const [, setInstitution] = useState<any>('');
  const [, setLogo] = useState<any>('');
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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isUsernameEmpty = form.username.trim() === '';
  const isPasswordEmpty = form.password.trim() === '';

  return (
    <IonApp>
      <IonPage
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <IonContent
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <IonRow
            className="custom-row"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <IonCol
              size="12"
              size-sm="12"
              size-md="12"
              size-lg="12"
              size-xl="12"
              className="ion-align-self-center"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <div>
                <div className="logo-container">
                  <img
                    className="logo-sign"
                    src="assets/images/logo.png"
                    alt="logo"
                  />
                </div>
              </div>
            </IonCol>
          </IonRow>
          <IonRow
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <IonCol
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <div className="login-container">
                <div className="form-container">
                  <div className="custom-div">
                    <IonLabel
                      position="stacked"
                      className="custom-label"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      USUARIO
                    </IonLabel>
                    <IonInput
                      value={form.username}
                      onIonChange={(e) =>
                        setForm({ ...form, username: e.detail.value!.trim() })
                      }
                      className="custom-input-sign"
                      required
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    />
                    {submitted && isUsernameEmpty && (
                      <IonLabel
                        color="danger"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        Por favor ingrese su nombre de usuario.
                      </IonLabel>
                    )}
                  </div>

                  <div className="ion-padding-bottom custom-div">
                    <IonLabel
                      position="stacked"
                      className="custom-label"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      CONTRASEÑA
                    </IonLabel>
                    <div className="custom-input-container">
                      <IonInput
                        type={showPassword ? 'text' : 'password'}
                        value={form.password}
                        onIonChange={(e) =>
                          setForm({ ...form, password: e.detail.value! })
                        }
                        className="ion-padding-end custom-input-sign"
                        required
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      />
                      <IonIcon
                        slot="end"
                        icon={showPassword ? eyeOutline : eyeOffOutline}
                        onClick={toggleShowPassword}
                        className="icon-smaller icon-adjust"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      />
                    </div>
                    {submitted && isPasswordEmpty && (
                      <IonLabel
                        color="danger"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        Por favor ingrese su contraseña.
                      </IonLabel>
                    )}
                  </div>

                  <div className="custom-div">
                    <IonLabel
                      position="stacked"
                      className="custom-label"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      INSTITUCIÓN
                    </IonLabel>
                    {loadingInstitutions ? (
                      <IonSpinner
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      />
                    ) : (
                      <IonSelect
                        value={form.institutionId}
                        placeholder="Seleccione"
                        onIonChange={(e) => {
                          setForm({ ...form, institutionId: e.detail.value! });
                          const selected: any = institutions.find(
                            (item: any) => item.id === e.detail.value,
                          );
                          setInstitution(selected.name);
                          setLogo(selected.logo);
                        }}
                        className="custom-input-sign"
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {institutions.map((item: any) => (
                          <IonSelectOption
                            value={item.id}
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          >
                            {item.name}
                          </IonSelectOption>
                        ))}
                      </IonSelect>
                    )}
                  </div>
                </div>
              </div>
            </IonCol>
          </IonRow>
          <IonRow
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <IonCol
              className="ion-align-self-center"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {isEmpty(institutions) && !loadingInstitutions && (
                <div className="custom-center">
                  <div className="submit-button">
                    <IonButton
                      expand="block"
                      onClick={load}
                      color="danger"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      <IonIcon
                        slot="start"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      />
                      <IonLabel
                        color="light"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        Recargar instituciones
                      </IonLabel>
                    </IonButton>
                  </div>
                </div>
              )}
              <div className="custom-center">
                <div className="submit-button">
                  <IonButton
                    color="tertiary"
                    className="custom-button"
                    expand="block"
                    size="small"
                    shape="round"
                    onClick={onSubmit}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    INICIAR SESIÓN
                  </IonButton>
                </div>
              </div>
              <div className="custom-center">
                <Recover />
              </div>
            </IonCol>
          </IonRow>
          <IonFooter
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <IonRow
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <IonCol
                className="ion-align-self-center"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <div className="custom-center">
                  <p className="custom-text">
                    <IonRouterLink
                      color="primary"
                      href="https://app.uea.edu.ec/policies"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
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
