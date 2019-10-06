import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivationStart, ActivationEnd } from '@angular/router';
import { tap, distinctUntilChanged, filter, map, mergeMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMetaOrganization, SeoService, IMetaTwitter } from './core/services/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'demo';
  subRouter: Subscription;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService
  ) { }

  ngOnInit() {
    this.subRouter = this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data),
      tap((event) => {
        const og: IMetaOrganization = {
          url: event.url || environment.meta.url,
          type: event.type || environment.meta.type,
          title: event.title || environment.meta.title,
          image: event.image || environment.meta.image,
          description: event.description || environment.meta.description,
          keywords: event.keywords || environment.meta.keywords,
          site_name: event.site_name || environment.meta.site_name,
          email: event.email || environment.meta.email,
          phone_number: event.phone_number || environment.meta.phone_number,
        };
        const tw: IMetaTwitter = {
          card: event.card || environment.meta.card,
          site:  event.site || environment.meta.site,
          title: event.title || environment.meta.title,
          description: event.description || environment.meta.description,
          image: event.image || environment.meta.image,
        }
        this.seoService.updateTitle(`♥ Hữu Đại ♥ - ♦ Nw-Widgets ♦ - ○ ${og.title}`);
        this.seoService.updateMetaOrganizationTag(og);
        this.seoService.updateMetaTwitterTag(tw);
      })
    ).subscribe();
  }
}
