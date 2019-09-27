import { Component, OnInit } from '@angular/core';
import { VIEWS_ROUTES } from '../../views/views-routing.module';
import { Route } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  routes = VIEWS_ROUTES;
  navs: {
    name: string,
    title?: string,
    route: string[]
  }[] = [];
  constructor() { }

  ngOnInit() {
    this.routes.forEach(r => this.getNavFromRoute(r));
    console.log(this.navs);
  }

  getNavFromRoute = (r: Route) => {
    if (r.path === '' && r.children && r.children.length) {
      r.children.forEach(c => {
        this.navs.push({
          name: c.data && c.data.name ? c.data.name : c.path,
          route: ['', c.path],
          title: c.data && c.data.title ? c.data.title : c.path
        })
      })
    } else {
      this.navs.push({
        name: r.data && r.data.name ? r.data.name : r.path,
        route: [r.path],
        title: r.data && r.data.title ? r.data.title : r.path
      })
    }
  }

}
