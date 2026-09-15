/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    /** Per-page guard so /diagram.js is emitted at most once. Set by the first
     *  of Doc.astro or Diagram.astro to render on the page. */
    diagramScript?: boolean;
  }
}
