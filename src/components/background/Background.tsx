import React from 'react';
import { IonContent } from '@ionic/react';
import './BackGround.css';

const IonContentBacgraund = ({ children }: any) => {
  return (
    <IonContent
      className="backgraunds"
      fullscreen
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      {children}
    </IonContent>
  );
};

export default IonContentBacgraund;
