import { Component, ElementRef, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';


import { LoadingBarService } from '@ngx-loading-bar/core';
import { LoaderComponent } from "./shared/component/loader/loader.component";
import { TapToTopComponent } from "./shared/component/tap-to-top/tap-to-top.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
    LoaderComponent,
    TapToTopComponent,
    RouterOutlet,
]
})
export class AppComponent {
  title = 'Crowd Agent';

  constructor(private loader: LoadingBarService, private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit() {
    this.loadScript('../assets/crowdagent.webflow/js/webflow.js');
  }

  ngOnDestroy() {
    localStorage.clear()
    this.removeScript('../assets/crowdagent.js/webflow.js');
  }

  private loadScript(scriptUrl: string) {
    const script = this.renderer.createElement('script');
    script.src = scriptUrl;
    script.type = 'text/javascript';
    script.onload = () => {
      console.log('Script loaded successfully', scriptUrl);
    };
    script.onerror = () => {
      console.error('Error loading script', scriptUrl);
    };
    this.renderer.appendChild(this.el.nativeElement, script);
  }

  private removeScript(scriptUrl: string) {
    const script = document.querySelector(`script[src="${scriptUrl}"]`);
    if (script) {
      script.remove();
      console.log('Script removed successfully', scriptUrl);
    }
  }
}
