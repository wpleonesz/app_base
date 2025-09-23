import { IonCard, IonCardHeader } from '@ionic/react';

const Forbidden = () => {
  return (
    <IonCard
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <IonCardHeader
        color="danger"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        NO TIENE PERMITIDO VISUALIZAR ESTE CONTENIDO
      </IonCardHeader>
    </IonCard>
  );
};

export default Forbidden;
