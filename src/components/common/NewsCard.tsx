import React from 'react';
import { IonLabel, IonImg, IonCol } from '@ionic/react';
import 'react-quill/dist/quill.core.css';

const NewsCard = (props: any) => {
  const item: any = props.item;
  return (
    <IonCol
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <IonImg
        style={{ pointerEvents: 'none' }}
        src={item.img}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      />
      <IonLabel
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {item.title}
      </IonLabel>
    </IonCol>
  );
};
export default NewsCard;
