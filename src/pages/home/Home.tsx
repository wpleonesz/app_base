/* eslint-disable react-hooks/rules-of-hooks */
import {
  IonPage,
  IonToast,
  IonSpinner,
  IonLabel,
  IonList,
  IonListHeader,
  IonButton,
  IonItem,
  IonImg,
} from '@ionic/react';
import { useState, useEffect } from 'react';
import IonContentBacgraund from 'components/background/Background';
import Header from 'components/header/Header';
import { profileData } from 'storage/profile';
import Refresher from 'components/common/Refresher';
import './Home.css';
import { Network } from '@capacitor/network';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState<any>({});
  const [networkState, setNetworkState] = useState('offline');

  const doRefresh = async () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 600);
  };

  useEffect(() => {
    Network.addListener('networkStatusChange', (status) => {
      setNetworkState(status.connectionType);
    });
    // No periodic refresh needed when notices removed
    return () => undefined;
  }, []);

  const renderOfflineMessage = () => {
    if (networkState === 'none' || networkState === 'unknown') {
      return (
        <IonItem
          lines="none"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <IonLabel
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <IonImg
              style={{
                height: '350px',
                objectFit: 'cover',
                pointerEvents: 'none',
              }}
              src="/assets/images/desconectado.png"
              alt="Unstable Connection"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
            <p className="ion-text-center ion-text-wrap">
              La conexión a Internet es inestable. Verifica tu conexión y vuelve
              a intentarlo.
            </p>
            <IonButton
              color="success"
              size="default"
              expand="block"
              shape="round"
              onClick={doRefresh}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Intentar de nuevo
            </IonButton>
          </IonLabel>
        </IonItem>
      );
    }
    return null;
  };

  return (
    <IonPage
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <Header label={'Inicio'} />
      <IonContentBacgraund>
        {renderOfflineMessage()}
        {networkState !== 'none' && (
          <>
            <Refresher action={doRefresh} className="headers" />
            {loading ? (
              <div className="ion-text-center">
                <IonSpinner
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
              </div>
            ) : (
              <>
                <IonList
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <IonListHeader
                    style={{ display: 'flex', alignItems: 'center' }}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <IonLabel
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      Bienvenido
                    </IonLabel>
                  </IonListHeader>
                  <div style={{ padding: 16 }}>
                    <p className="ion-text-wrap">
                      Bienvenido a la aplicación. Aquí se mostrará contenido
                      cuando esté disponible.
                    </p>
                    <div style={{ marginTop: 12 }}>
                      <button
                        style={{
                          padding: '8px 12px',
                          borderRadius: 6,
                          border: '1px solid #ccc',
                          background: '#fff',
                        }}
                        onClick={async () => {
                          await profileData.clear();
                          // recargar para forzar mostrar Signin
                          window.location.reload();
                        }}
                      >
                        Cerrar sesión (dev)
                      </button>
                    </div>
                  </div>
                </IonList>
              </>
            )}
          </>
        )}
      </IonContentBacgraund>
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
    </IonPage>
  );
};

export default Home;
