import {
  IonCard,
  IonIcon,
  IonRow,
  IonCol,
  IonLabel,
  IonButton,
  IonToast,
} from '@ionic/react';
import { useEffect } from 'react';
import { profileData } from 'storage/profile';
import { useState, useCallback } from 'react';
import { userService } from 'services/user.service';
//import { photoDefault } from 'lib/photoDefault';
import { cameraOutline } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import './ProfileCard.css';

const PHOTO = '/assets/images/default-profile.png';

const ProfileCard = () => {
  const [user, setUser] = useState<any>({});
  const [person, setPerson] = useState<any>({});
  const [photo, setPhoto] = useState(PHOTO);
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState<any>({});
  const setDefaultPhoto = () => setPhoto(PHOTO);

  const openToast = (message: string, color: string) => {
    setToastData({ message, color });
    setShowToast(true);
  };

  const load = useCallback(async () => {
    const user = await profileData.get();
    //console.log('🔍 Usuario cargado desde profileData:', user);

    setUser(user);

    try {
      const [response, person] = await Promise.all([
        userService.getPhoto(user.id),
        userService.getById(user.id),
      ]);

      //console.log('📷 Foto obtenida desde API:', response);
      //console.log('👤 Persona obtenida:', person);

      setPerson(person.Person);

      if (response?.photo) {
        //console.log('✅ Foto encontrada en la API:', response.photo);
        setPhoto(response.photo);
        localStorage.setItem(`user_photo_${user.id}`, response.photo);
        profileData.add('photo', response.photo);
      } else {
        //console.log('⚠️ Foto no encontrada en la API');
        const storedPhoto = localStorage.getItem(`user_photo_${user.id}`);
        if (storedPhoto) {
          //console.log('📂 Foto recuperada desde localStorage:', storedPhoto);
          setPhoto(storedPhoto);
        } else {
          setPhoto(PHOTO);
        }
      }
    } catch (error) {
      //console.error('❌ Error al obtener la foto:', error);
      const storedPhoto = localStorage.getItem(`user_photo_${user.id}`);
      if (storedPhoto) {
        //console.log('📂 Usando foto de localStorage:', storedPhoto);
        setPhoto(storedPhoto);
      } else if (user.photo) {
        setPhoto(user.photo);
      } else {
        setDefaultPhoto();
      }
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // 📏 Función para redimensionar imágenes a 512x512 píxeles y comprimirlas
  const resizeImage = async (
    base64String: string,
    maxWidth: number,
    maxHeight: number,
    quality = 0.9,
  ) => {
    return new Promise<string>((resolve, reject) => {
      const img = new Image();
      img.src = base64String;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = maxWidth;
        canvas.height = maxHeight;

        if (ctx) {
          ctx.drawImage(img, 0, 0, maxWidth, maxHeight);
          const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedBase64);
        } else {
          reject('No se pudo procesar la imagen');
        }
      };
      img.onerror = () => reject('Error al cargar la imagen');
    });
  };

  // 📸 Función para capturar o seleccionar foto
  const handlePhotoSelection = async () => {
    try {
      const permissionRequest = await Camera.requestPermissions();
      if (
        permissionRequest.camera !== 'granted' ||
        permissionRequest.photos !== 'granted'
      ) {
        openToast(
          'Se requiere permiso de cámara/galería para subir fotos',
          'danger',
        );
        return;
      }

      const image = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Prompt,
        quality: 90,
      });

      if (image.base64String) {
        let resizedPhoto = await resizeImage(
          `data:image/jpeg;base64,${image.base64String}`,
          512,
          512,
          0.8,
        );

        const byteSize = atob(resizedPhoto.split(',')[1]).length;
        if (byteSize > 2 * 1024 * 1024) {
          openToast('La imagen es demasiado grande (máx. 2MB)', 'danger');
          return;
        }

        await userService.updatePhoto(person.id, resizedPhoto);

        setPhoto(resizedPhoto);
        localStorage.setItem(`user_photo_${person.id}`, resizedPhoto);
        profileData.add('photo', resizedPhoto);

        openToast('Foto modificada correctamente', 'success');
      }
    } catch (error: any) {
      openToast(error, 'danger');
    }
  };

  return (
    <>
      <IonCard
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <IonRow
          className="ion-align-items-center"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <IonCol
            size="12"
            className="ion-align-self-center ion-text-center"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <div className="avatar-wrapper">
              <img className="avatar" src={photo} alt="profile_image" />
              <div className="edit-icon">
                <IonButton
                  fill="clear"
                  color="secondary"
                  onClick={handlePhotoSelection}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <IonIcon
                    icon={cameraOutline}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                </IonButton>
              </div>
            </div>
          </IonCol>
        </IonRow>
        <IonRow
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <IonCol
            size="12"
            className="ion-align-self-center ion-text-center"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <IonLabel
              color="dark"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <b>{user?.name}</b>
            </IonLabel>
            <IonLabel
              color="dark"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <p>{user?.institutionId}</p>
            </IonLabel>
            <IonLabel
              color="dark"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <p>{user?.email}</p>
            </IonLabel>
          </IonCol>
        </IonRow>
      </IonCard>
      <IonToast
        isOpen={showToast}
        color={toastData?.color}
        onDidDismiss={() => {
          setShowToast(false);
          setToastData({});
        }}
        message={toastData?.message}
        duration={2000}
        position="middle"
      />
    </>
  );
};

export default ProfileCard;
