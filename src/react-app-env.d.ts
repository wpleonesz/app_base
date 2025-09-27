/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="react-scripts" />

// Mantener solo las extensiones necesarias del namespace JSX para evitar
// sobrescribir las definiciones oficiales de React que proporcionan tipos como
// React.FC / React.FunctionComponent.
declare global {
  namespace JSX {
    // No hacer extensiones locales aquí para evitar conflictos con
    // las definiciones oficiales de React y de @ionic/react.
  }
}

// Evitar redeclarar módulos como 'react' o 'react-router-dom' en este archivo;
// tales cambios deben hacerse mediante module augmentation en archivos separados
// y con mucho cuidado para no romper las definiciones provistas por @types.
