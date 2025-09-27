// Compat shim para resolver diferencias de tipos entre @ionic/react-router (v6) y
// react-router-dom v5 ambient types. Añade `refs` opcional a la interfaz Component
// para evitar errores de compatibilidad en tiempo de compilación.
//
// IMPORTANTE: este archivo se marca como módulo (con un export vacío) para que
// la declaración `declare module 'react' { ... }` actúe correctamente como
// una "module augmentation" en lugar de redeclarar/reescribir el módulo
// `react` completo. Sin un import/export de módulo, TypeScript puede tratar la
// declaración como una nueva declaración de módulo y ocultar las definiciones
// provistas por `@types/react` (causando errores como "Namespace 'react' has no
// exported member 'FC'").

// Augmentación segura del namespace global `React` para añadir `refs` a `Component`.
// Esto evita redeclaraciones del módulo 'react' y mantiene compatibilidad con
// las definiciones de `@types/react`.
declare global {
  namespace React {
    interface Component {
      refs?: any;
    }
  }
}

export {};
