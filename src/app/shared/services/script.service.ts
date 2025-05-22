import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScriptService {
  private renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  public loadScript(url: string): void {
    const script = this.renderer.createElement('script');
    this.renderer.setAttribute(script, 'src', url);
    this.renderer.appendChild(this.document.head, script);
  }
}
