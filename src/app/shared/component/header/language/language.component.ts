import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavService } from 'src/app/shared/services/nav.service';

interface selectedlanguage{
  language? : string;
  code? : any;
  type? : string;
  icon? : string;
}
@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class LanguageComponent {

  public language: boolean = false;

  public languages : selectedlanguage[] = [{
    language: 'English',
    code: 'en',
    type: 'US',
    icon: 'us'
  },
  {
    language: 'Español',
    code: 'es',
    icon: 'es'
  },
  {
    language: 'Français',
    code: 'fr',
    icon: 'fr'
  },
  {
    language: 'Português',
    code: 'pt',
    type: 'BR',
    icon: 'pt'
  }]

  public selectedLanguage : selectedlanguage = {
    language: 'English',
    code: 'en',
    type: 'US',
    icon: 'us'
  }

  constructor(public navServices: NavService, private translate: TranslateService) { }

  ngOnInit() {
  }

  changeLanguage(lang: selectedlanguage) {
    this.translate.use(lang.code)
    this.selectedLanguage = lang;
  }
}
