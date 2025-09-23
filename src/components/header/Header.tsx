import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { logoFacebook, logoInstagram, logoTiktok } from 'ionicons/icons';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IonBackButton } from '@ionic/react';
import { useLocation } from 'react-router-dom';
import { MENU_CONFIG } from 'lib/menuConfig'; // 📌 Importamos la configuración del menú
import './Header.css';

const Header = ({ label, roles }: any) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // 📌 Obtiene el menú basado en el rol del usuario
  const userMenu = roles?.isAdmin
    ? MENU_CONFIG.menu.admin || []
    : roles?.isTeacher && roles?.isStudent
    ? MENU_CONFIG.menu.teacherStudent || []
    : roles?.isEmployee && roles?.isStudent && !roles?.isTeacher
    ? MENU_CONFIG.menu.employeeStudent || []
    : roles?.isTecnicalTeacher
    ? MENU_CONFIG.menu.technicalTeacher || []
    : roles?.isStudent
    ? MENU_CONFIG.menu.studentOnly || []
    : roles?.isEmployee
    ? MENU_CONFIG.menu.employeeOnly || []
    : roles?.isTeacher
    ? MENU_CONFIG.menu.teacherOnly || []
    : [];

  // 📌 Verifica si la ruta está en la configuración del menú del usuario
  const isInsideMenu = userMenu.some(
    (item) => item.path === currentPath && item.insideMenu,
  );

  const openSocialUrl = (url: string) => {
    const options = '_system'; // Abre la URL en el navegador web predeterminado
    InAppBrowser.create(url, options);
  };

  return (
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
          {/* 📌 Si la página está en el menú según el rol del usuario, se muestra el botón "Atrás" */}
          {Boolean(isInsideMenu) && (
            <IonBackButton
              defaultHref="/menu"
              text="Atrás"
              className="small-back-button"
            />
          )}
        </IonButtons>

        {/* 📌 Oculta el logo si está dentro del menú */}
        {!isInsideMenu && (
          <div slot="start">
            <img
              src="assets/images/logo.png"
              alt="Logo de la institución"
              style={{ maxWidth: '140px' }}
              className="logo"
            />
          </div>
        )}

        <IonTitle
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {label}
        </IonTitle>

        {/* 📌 Oculta redes sociales si está dentro del menú */}
        {!isInsideMenu && (
          <IonButtons
            slot="end"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <IonButton
              onClick={() =>
                openSocialUrl('https://www.facebook.com/ueaeduec/')
              }
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <IonIcon
                icon={logoFacebook}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </IonButton>
            <IonButton
              onClick={() =>
                openSocialUrl('https://www.instagram.com/uea.edu.ec/')
              }
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <IonIcon
                icon={logoInstagram}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </IonButton>
            <IonButton
              onClick={() => openSocialUrl('https://www.tiktok.com/@ueaeduec')}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <IonIcon
                icon={logoTiktok}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </IonButton>
          </IonButtons>
        )}
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
