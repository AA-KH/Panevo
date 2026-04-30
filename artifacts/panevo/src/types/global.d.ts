export {};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    hj: ((...args: unknown[]) => void) & { q?: unknown[] };
    _hjSettings: { hjid: number; hjsv: number };
    google: typeof google;
    initMap?: () => void;
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }

  namespace google.maps {
    class Map {
      constructor(el: HTMLElement, opts?: Record<string, unknown>);
      setCenter(latLng: { lat: number; lng: number }): void;
      setZoom(zoom: number): void;
    }
    class Marker {
      constructor(opts: Record<string, unknown>);
      setMap(map: Map | null): void;
    }
    enum SymbolPath {
      CIRCLE = 0,
      FORWARD_CLOSED_ARROW = 1,
      FORWARD_OPEN_ARROW = 2,
      BACKWARD_CLOSED_ARROW = 3,
      BACKWARD_OPEN_ARROW = 4,
    }
    class LatLngBounds {
      extend(latLng: { lat: number; lng: number }): void;
      isEmpty(): boolean;
    }
    interface MapMouseEvent {
      latLng: { lat(): number; lng(): number } | null;
    }
  }

  // Provided by Vite as part of the global namespace
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace google {}
}
