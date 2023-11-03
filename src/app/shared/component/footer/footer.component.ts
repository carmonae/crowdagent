import { Component, OnInit } from '@angular/core';
import { VerticalNavService } from '../../services/vertical-nav.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit{

  constructor(public navService: VerticalNavService) {}

  public footerLight = false;
  public footerDark = false;
  public footerFix = false;

  ngDoCheck(){
    if(window.location.pathname == '/page-layout/footer-dark'){
      this.footerDark = true;
      this.footerLight = false;
      this.footerFix = false;
    }else if(window.location.pathname == '/page-layout/footer-light'){
      this.footerLight = true;
      this.footerDark = false;
      this.footerFix = false;
    }else if(window.location.pathname == '/page-layout/footer-fixed'){
      this.footerFix = true;
      this.footerLight = false;
      this.footerDark = false;
    }
  }
  ngOnInit(): void {
  }

}
