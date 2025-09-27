// Añade propiedades opcionales que algunas versiones de @ionic/react esperan
// en los atributos HTML de los componentes. Esto evita errores donde dichas
// propiedades aparecen como requeridas.

declare global {
  // Las definiciones de React (en @types/react) exponen `HTMLAttributes<T>`
  // dentro del namespace React. Aquí las ampliamos para añadir las props
  // opcionales que Ionic puede intentar exigir.
  namespace React {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface HTMLAttributes<T = any> {
      placeholder?: any;
      onPointerEnterCapture?: any;
      onPointerLeaveCapture?: any;
    }
  }
}

export {};
