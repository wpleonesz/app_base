import ProfileCard from 'components/user/ProfileCard';
import { IonPage, IonToast, IonLoading } from '@ionic/react';
import { useState } from 'react';
import { clearCookies } from 'lib/api';
import { authService } from 'services/auth.service';
import { userService } from 'services/user.service';
import { profileData } from 'storage/profile';
import './Menu.css';
import Footer from 'components/footer/Footer';
import IonContentBacgraund from 'components/background/Background';
import Header from 'components/header/Header';
import MenuButton from 'components/menuButton/MenuButton';
//import { getMenuByRole } from 'lib/getMenuByRole';
//import { MenuItem } from 'interfaces/menu';
import { repeatOutline, returnUpBackOutline, logOut } from 'ionicons/icons';

const Menu = (props: any) => {
  const setLogged: Function = props.setLogged;
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState<any>({});

  const recoverAccount = async () => {
    setLoading(true);
    try {
      const username = await profileData.get('username');
      await userService.recoverPasswordByEmail(username);
      openToast(
        'Se te ha enviado un enlace de recuperación, por favor verifica tu correo y sigue las instrucciones',
        'primary',
      );
    } catch (error: any) {
      openToast(error.error || error.message || error, 'danger');
    } finally {
      setLoading(false);
    }
  };

  const serverSignout = async () => {
    try {
      await authService.signout();
    } catch {}
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await serverSignout();
      await profileData.clear();
      await clearCookies();
      await setLogged(false);
    } catch (error: any) {
      openToast(error, 'danger');
    } finally {
      setLoading(false);
    }
  };

  const openToast = (message: string, color: string) => {
    setToastData({ message, color });
    setShowToast(true);
  };

  // Obtiene los menús por roles

  return (
    <IonPage
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <Header label={'Menú'} />
      <IonContentBacgraund>
        <ProfileCard />

        {/* Sección de Contraseña */}
        <section className="menu-section">
          <div className="section-header">Contraseña</div>
          <div className="menu-grid">
            <MenuButton
              title="Cambiar"
              logo={repeatOutline}
              link="/menu/password/change"
            />
            <MenuButton
              title="Recuperar"
              logo={returnUpBackOutline}
              onClick={() => recoverAccount()}
            />
          </div>
        </section>

        <section className="menu-section">
          <div className="section-header">Cuenta</div>
          <div className="menu-grid">
            <MenuButton title="Cerrar Sesión" logo={logOut} onClick={signOut} />
          </div>
        </section>
      </IonContentBacgraund>
      <Footer />
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
    </IonPage>
  );
};

export default Menu;
