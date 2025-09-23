import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonList,
  IonPage,
  IonBackButton,
  IonToast,
  IonLoading,
  IonIcon,
  IonModal,
  useIonAlert,
  IonInput,
  IonRow,
  IonCol,
  IonLabel,
  IonText,
} from '@ionic/react';
import { userService, RecoverPassword } from 'services/user.service';
import { useState } from 'react';
import './recover.css';
import { informationCircleOutline } from 'ionicons/icons';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

interface IProps {
  showModal: boolean;
  closeModal: () => void;
}

const Content = ({ showModal, closeModal }: IProps) => {
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState<any>({});
  const [present] = useIonAlert();
  const [form] = useState<RecoverPassword>({
    email: '',
  });

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: form,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const openToast = (message: string, color: string) => {
    setToastData({ message, color });
    setShowToast(true);
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await userService.recoverPassword(data.email);
      present({
        cssClass: 'my-css',
        header: 'Confirmación',
        message:
          'Se te ha enviado un enlace de recuperación, por favor verifica tu correo y sigue las instrucciones',
        buttons: [{ text: 'Confirmar', handler: (d) => closeModal() }],
      });
    } catch (error: any) {
      openToast(error, 'danger');
    } finally {
      setLoading(false);
    }
  };
  return (
    <IonModal
      isOpen={showModal}
      onDidDismiss={closeModal}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
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
              <IonBackButton defaultHref="menu" text="Atrás" />
            </IonButtons>
            <IonTitle
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Recuperar contraseña
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
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <div className="form_ui">
              <IonRow
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
                  <div className="audun_info">
                    <p>
                      <IonText
                        color="success"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <IonIcon
                          icon={informationCircleOutline}
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        />
                      </IonText>{' '}
                      Por favor, ingrese su correo electrónico institucional{' '}
                      <IonText
                        color="success"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <i>(@uea.edu.ec)</i>
                      </IonText>{' '}
                      en el campo de texto a continuación. Luego, haga clic en
                      el botón "Confirmar" y recibirá un enlace en su correo
                      electrónico con instrucciones para cambiar su contraseña.
                    </p>
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
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-container">
                      <div className="custom-div">
                        <IonLabel
                          position="stacked"
                          className="custom-label"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          CORREO ELECTRÓNICO
                        </IonLabel>
                        <Controller
                          control={control}
                          render={({ field }) => (
                            <IonInput
                              value={field.value}
                              onIonChange={(e) =>
                                setValue('email', e.detail.value!)
                              }
                              className="custom-input"
                              placeholder={undefined}
                              onPointerEnterCapture={undefined}
                              onPointerLeaveCapture={undefined}
                            />
                          )}
                          name="email"
                          rules={{
                            required:
                              'El correo electrónico institucional es un campo obligatorio',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@uea\.edu\.ec$/i,
                              message:
                                'Por favor ingrese un correo electrónico institucional válido (Ej: usuario@uea.edu.ec)',
                            },
                          }}
                        />
                        <ErrorMessage
                          errors={errors}
                          name="email"
                          as={<div style={{ color: 'red' }} />}
                        />
                      </div>
                    </div>
                    <div className="custom-center">
                      <div className="submit-button">
                        <IonButton
                          color="primary"
                          expand="block"
                          type="submit"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          Confirmar
                        </IonButton>
                      </div>
                    </div>
                  </form>
                </IonCol>
              </IonRow>
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
            position="top"
          />
        </IonContent>
      </IonPage>
    </IonModal>
  );
};

const Recover = (props: any) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Content showModal={showModal} closeModal={() => setShowModal(false)} />
      <IonButton
        fill="clear"
        size="small"
        color="tertiary"
        className="custom-button2"
        onClick={() => setShowModal(true)}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        ¿OLVIDASTE TU CONTRASEÑA?
      </IonButton>
    </>
  );
};

export default Recover;
