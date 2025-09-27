import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  IonLoading,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Signin from 'pages/auth/Signin';
import Menu from 'pages/menu/Menu';
import Home from 'pages/home/Home';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';
import { authService } from 'services/auth.service';
import { clearCookies } from 'lib/api';
import { profileData } from 'storage/profile';
import { userService } from 'services/user.service';
import { getMenuByRole } from 'lib/getMenuByRole';
import store from 'storage/store';

setupIonicReact();

// Small local workarounds: algunos tipos de @ionic/react entran en conflicto
// con las augmentaciones locales de JSX. Para evitar que esos conflictos
// frenen la compilación de producción, creamos alias `any` de los
// componentes Ionic problemáticos usados en este archivo.
const IonRouterOutletAny: any = IonRouterOutlet as any;
const IonTabBarAny: any = IonTabBar as any;
const IonIconAny: any = IonIcon as any;
const IonLabelAny: any = IonLabel as any;

const App = (): JSX.Element => {
  const [logged, setLogged] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [access, setAccess] = React.useState<any>(
    JSON.parse(sessionStorage.getItem('access') || '{}'),
  );
  const [roles, setRoles] = React.useState<any>(
    JSON.parse(sessionStorage.getItem('roles') || '{}'),
  );

  React.useEffect(() => {
    const loadCookie = async () => {
      await store.create();
      const storedCookie = await store.get('cookie');
      console.log('🔍 Cookie almacenada al iniciar la app:', storedCookie);
    };

    loadCookie();
  }, []);

  const checkLogged = React.useCallback(async () => {
    const user = await profileData.get();
    setLogged(!!user);
  }, []);

  const logout = React.useCallback(async () => {
    try {
      await Promise.all([
        authService.signout(),
        profileData.clear(),
        clearCookies(),
      ]);
      sessionStorage.removeItem('access');
      sessionStorage.removeItem('roles');
      setLogged(false);
    } catch (error) {
      console.error('Error en logout:', error);
    }
  }, []);

  const checkDisabledUser = React.useCallback(async () => {
    const user = await profileData.get();
    if (!user) return;

    const loggeds = await userService.getDisabledPersonByDni(
      user?.dni,
      user?.email,
    );
    if (
      loggeds?.userAccountControl === '514' ||
      loggeds?.userAccountControl === '66050'
    ) {
      await logout();
    }
  }, [logout]);

  const loadAccess = React.useCallback(async () => {
    if (!logged) return;
    setLoading(true);
    try {
      const [accessDataResponse, rolesResponse] = await Promise.all([
        userService.getAccess(),
        userService.rolesBooleans(),
      ]);

      sessionStorage.setItem('access', JSON.stringify(accessDataResponse));
      sessionStorage.setItem('roles', JSON.stringify(rolesResponse));

      setAccess(accessDataResponse);
      setRoles(rolesResponse);
    } catch (error) {
      console.error('Error cargando accesos:', error);
    } finally {
      setLoading(false);
    }
  }, [logged]);

  React.useEffect(() => {
    checkLogged();
    loadAccess();
    const intervalId = setInterval(checkDisabledUser, 60000);
    return () => clearInterval(intervalId);
  }, [checkLogged, loadAccess, checkDisabledUser]);

  const { mainMenu } = React.useMemo(
    () => getMenuByRole(roles, access),
    [roles, access],
  );

  const homeTab = React.useMemo(
    () => mainMenu.find((item) => item.path === '/home'),
    [mainMenu],
  );
  const menuTab = React.useMemo(
    () => mainMenu.find((item) => item.path === '/menu'),
    [mainMenu],
  );
  const otherTabs = React.useMemo(
    () =>
      mainMenu.filter((item) => item.path !== '/home' && item.path !== '/menu'),
    [mainMenu],
  );

  if (!logged) {
    return <Signin setLogged={setLogged} />;
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs onIonTabsDidChange={loadAccess}>
          <IonRouterOutletAny>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/menu">
              <Menu setLogged={setLogged} roles={roles} access={access} />
            </Route>
            {otherTabs.map((item: any, index: number) => (
              <Route key={index} exact path={item.path}>
                {React.createElement(
                  (item as any).component as React.ComponentType<any>,
                )}
              </Route>
            ))}
          </IonRouterOutletAny>

          <IonTabBarAny slot="bottom">
            {homeTab && (
              <IonTabButton tab={homeTab.path} href={homeTab.path}>
                <IonIconAny icon={homeTab.icon} />
                <IonLabelAny>{homeTab.title}</IonLabelAny>
              </IonTabButton>
            )}

            {otherTabs.map((item: any, index: number) => (
              <IonTabButton key={index} tab={item.path} href={item.path}>
                <IonIconAny icon={item.icon} />
                <IonLabelAny>{item.title}</IonLabelAny>
              </IonTabButton>
            ))}

            {menuTab && (
              <IonTabButton tab={menuTab.path} href={menuTab.path}>
                <IonIconAny icon={menuTab.icon} />
                <IonLabelAny>{menuTab.title}</IonLabelAny>
              </IonTabButton>
            )}
          </IonTabBarAny>
        </IonTabs>
      </IonReactRouter>
      <IonLoading isOpen={loading} message={'Cargando perfil...'} />
    </IonApp>
  );
};

export default App;
