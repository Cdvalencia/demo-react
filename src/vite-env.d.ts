/// <reference types="vite/client" />

declare namespace React {
  namespace JSX {
    interface IntrinsicElements {
      'iconify-icon': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { icon?: string },
        HTMLElement
      >;
    }
  }
}
