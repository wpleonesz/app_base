import React from 'react';
import { IonIcon, IonRippleEffect } from '@ionic/react';
import { Link } from 'react-router-dom';
import './MenuButton.css';

const MenuButton = ({ title, logo, link, onClick }: any) => {
  return (
    <Link
      to={link}
      className="menu-button ion-activatable ripple-parent rounded-rectangle"
      onClick={onClick}
      color="secondary"
    >
      <IonRippleEffect
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      ></IonRippleEffect>
      <div className="menu-item">
        <IonIcon
          icon={logo}
          size="large"
          color="secondary"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
        <div className="menu-item-text">{title}</div>
      </div>
    </Link>
  );
};

export default MenuButton;
