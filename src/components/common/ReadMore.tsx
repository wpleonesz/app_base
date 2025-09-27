import React, { useState } from 'react';
import 'react-quill/dist/quill.core.css';
import './common.css';
import { IonText, IonItem } from '@ionic/react';

const ReadMore = ({ children }: any) => {
  const MAX_LENGTH = 40;
  const text = children;
  const [isTruncated, setIsTruncated] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
    setShowButton(!showButton);
  };
  const textToShow = isTruncated ? `${text.slice(0, MAX_LENGTH)}...` : text;

  return (
    <IonItem
      lines="none"
      className="post-content ion-no-margin ion-no-padding"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <IonText
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span
            className="view ql-editor"
            dangerouslySetInnerHTML={{ __html: textToShow }}
          />
          {showButton && text.length > MAX_LENGTH && (
            <span
              onClick={toggleTruncate}
              style={{
                color: 'var(--ion-color-primary)',
                display: 'inline-block',
              }}
            >
              Ver todo
            </span>
          )}
        </div>
        {!isTruncated && (
          <span
            onClick={toggleTruncate}
            style={{ color: 'var(--ion-color-primary)' }}
          >
            Ver menos
          </span>
        )}
      </IonText>
    </IonItem>
  );
};

export default ReadMore;
