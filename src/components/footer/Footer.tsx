import { IonFooter, IonToolbar } from '@ionic/react';
import './Footer.css';

const Footer = () => {
  return (
    <IonFooter
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <IonToolbar
        className="ion-text-center"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div className="footer-text">
          © Universidad Estatal Amazónica. Todos los derechos reservados.
          <br />
          Desarrollado por la DGTIC.
        </div>
      </IonToolbar>
    </IonFooter>
  );
};

export default Footer;
