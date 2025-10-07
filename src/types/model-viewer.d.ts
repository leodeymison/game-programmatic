/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      src?: string;
      alt?: string;
      poster?: string;
      ar?: boolean;
      arModes?: string;
      arScale?: string;
      cameraControls?: boolean;
      autoRotate?: boolean;
      rotationPerSecond?: string;
      disableZoom?: boolean;
      exposure?: string;
      shadowIntensity?: string;
      shadowSoftness?: string;
      [key: string]: any; // para aceitar props futuras
    };
  }
}
