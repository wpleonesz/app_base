import React from 'react';
import { IonButton, useIonToast, IonIcon } from '@ionic/react';
import { informationCircleOutline } from 'ionicons/icons';

const InfoButton = ({ message }: any) => {
  const [present] = useIonToast();

  const presentToast = (position: 'top' | 'middle' | 'bottom') => {
    present({
      message: message,
      duration: 2000,
      position: position,
      color: 'danger',
    });
  };

  return (
    <>
      <IonButton
        shape="round"
        fill="clear"
        size="small"
        color="secondary"
        onClick={() => presentToast('bottom')}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <IonIcon
          slot="start"
          icon={informationCircleOutline}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      </IonButton>
    </>
  );
};
export default InfoButton;
