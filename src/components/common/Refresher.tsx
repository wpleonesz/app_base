import { IonRefresher, IonRefresherContent } from '@ionic/react';

const Refresher = ({ action }: any) => {
  return (
    <IonRefresher
      slot="fixed"
      onIonRefresh={action}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <IonRefresherContent
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      ></IonRefresherContent>
    </IonRefresher>
  );
};

export default Refresher;
