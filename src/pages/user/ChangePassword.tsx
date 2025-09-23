import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonList,
  IonLabel,
  IonInput,
  IonPage,
  IonBackButton,
  IonToast,
  useIonRouter,
  IonLoading,
  IonIcon,
} from '@ionic/react';
import { userService, PasswordChange } from 'services/user.service';
import { profileData } from 'storage/profile';
import { useState } from 'react';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';

type ShowPasswordsState = {
  [key: string]: boolean;
};

const ChangePassword = (props: any) => {
  const router = useIonRouter();
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [showPasswords, setShowPasswords] = useState<ShowPasswordsState>({
    current: false,
    password: false,
    confirm: false,
  });
  const [form, setForm] = useState<PasswordChange>({
    current: '',
    password: '',
    confirm: '',
  });

  const openToast = (message: string, color: string) => {
    setToastData({ message, color });
    setShowToast(true);
  };

  const onSubmit = async () => {
    setLoading(true);
    setSubmitted(true);
    if (!form.current || !form.password || !form.confirm) {
      openToast('Los campos de usuario y contraseña son requeridos', 'danger');
      setLoading(false);
      return;
    }
    try {
      const userId: number = await profileData.get('id');
      await userService.changePassword(userId, {
        current: form.current,
        password: form.password,
      });
      router.goBack();
      openToast('Su contraseña fue cambiada con éxito', 'primary');
    } catch (error: any) {
      openToast(error, 'danger');
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = (inputName: string) => {
    setShowPasswords((prevShowPasswords) => ({
      ...prevShowPasswords,
      [inputName]: !prevShowPasswords[inputName],
    }));
  };
  const isCurrentEmpty = form.current.trim() === '';
  const isPasswordEmpty = form.password.trim() === '';
  const isConfirmEmpty = form?.confirm?.trim() === '';
  return (
    <IonPage
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <IonHeader
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <IonToolbar
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <IonButtons
            slot="start"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <IonBackButton
              defaultHref="menu"
              text="Atrás"
              className="small-back-button"
            />
          </IonButtons>
          <IonTitle
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Contraseña
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent
        fullscreen
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <IonList
          inset={true}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="ion-padding-bottom custom-div">
            <IonLabel
              position="stacked"
              className="custom-label"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Indique su contraseña actual
            </IonLabel>
            <div className="custom-input-container">
              <IonInput
                className="ion-padding-end custom-input"
                type={showPasswords.current ? 'text' : 'password'}
                value={form.current}
                onIonChange={(e) =>
                  setForm({ ...form, current: e.detail.value! })
                }
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
              <IonIcon
                slot="end"
                icon={showPasswords.current ? eyeOutline : eyeOffOutline}
                onClick={() => toggleShowPassword('current')}
                className="icon-smaller icon-adjust"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </div>
            {submitted && isCurrentEmpty && (
              <IonLabel
                color="danger"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Por favor ingrese la contraseña actual.
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
              Nueva contraseña
            </IonLabel>
            <div className="custom-input-container">
              <IonInput
                className="ion-padding-end custom-input"
                type={showPasswords.password ? 'text' : 'password'}
                value={form.password}
                onIonChange={(e) =>
                  setForm({ ...form, password: e.detail.value! })
                }
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
              <IonIcon
                slot="end"
                icon={showPasswords.password ? eyeOutline : eyeOffOutline}
                onClick={() => toggleShowPassword('password')}
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
                Por favor ingrese la nueva contraseña.
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
              Repita su contraseña
            </IonLabel>
            <div className="custom-input-container">
              <IonInput
                className="ion-padding-end custom-input"
                type={showPasswords.confirm ? 'text' : 'password'}
                value={form.confirm}
                onIonChange={(e) =>
                  setForm({ ...form, confirm: e.detail.value! })
                }
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
              <IonIcon
                slot="end"
                icon={showPasswords.confirm ? eyeOutline : eyeOffOutline}
                onClick={() => toggleShowPassword('confirm')}
                className="icon-smaller icon-adjust"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </div>
            {submitted && isConfirmEmpty && (
              <IonLabel
                color="danger"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Por favor ingrese la nueva contraseña.
              </IonLabel>
            )}
          </div>
          <div className="ion-text-center">
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
              CAMBIAR
            </IonButton>
          </div>
        </IonList>
        <IonLoading isOpen={loading} message={'Por favor espere...'} />
        <IonToast
          isOpen={showToast}
          color={toastData?.color}
          onDidDismiss={() => {
            setShowToast(false);
            setToastData({});
          }}
          message={toastData?.message}
          duration={2000}
          position="middle"
        />
      </IonContent>
    </IonPage>
  );
};

export default ChangePassword;
