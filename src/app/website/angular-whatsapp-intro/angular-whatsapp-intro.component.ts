import {Component, OnInit} from "@angular/core";
import {MarkdownFileViewComponent} from "../../core/markdown-file.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: "angular-whatsapp",
  templateUrl: "./angular-whatsapp-intro.component.html",
  directives: [MarkdownFileViewComponent],
  styleUrls: [
    "./angular-whatsapp-intro.component.scss"
  ]
})
export class AngularWhatsappIntro implements OnInit {
  private isAngular1 = true;

  constructor(private currentRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.currentRoute.url.subscribe((url: Array<{path:string}>) => {
      this.isAngular1 = url[0].path === "whatsapp";
    });
  }
}