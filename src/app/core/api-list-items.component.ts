import {Injectable, Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from "@angular/router";
import {ActivatedApi} from "./current-api";
import {ApiRouteDataDefinition} from "./apis-routes";
import {LocationStrategy} from "@angular/common";

@Component({
  selector: "api-list-items",
  templateUrl: "./api-list-items.component.html",
  directives: [ROUTER_DIRECTIVES]
})
@Injectable()
export class ApiListItems implements OnInit {
  private apiData: ApiRouteDataDefinition;

  constructor(private activated: ActivatedApi, private router: Router, private parentRoute: ActivatedRoute, private location: LocationStrategy) {
  }

  private createAbsoluteLink(relativeLink: string) {
    const tree = this.router.createUrlTree([relativeLink], {relativeTo: this.parentRoute});
    return this.location.prepareExternalUrl(this.router.serializeUrl(tree));
  }

  createLink(item) {
    return this.createAbsoluteLink(this.apiData.apiVersion.name + "/" + item.apiTitle);
  }

  ngOnInit() {
    this.activated.api.subscribe((data: any) => {
      this.apiData = data;
    });
  }
}