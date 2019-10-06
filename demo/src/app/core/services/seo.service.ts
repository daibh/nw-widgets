import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private title: Title, private meta: Meta) { }

  updateTitle(title: string) {
    this.title.setTitle(title);
  }

  updateMetaOrganizationTag(og: IMetaOrganization) {
    Object.keys(og).forEach(key => this.meta.updateTag({
      property: `og:${key}`,
      content: og[key]
    }));
  }

  updateMetaTwitterTag(tw: IMetaTwitter) {
    Object.keys(tw).forEach(key => this.meta.updateTag({
      property: `twitter:${key}`,
      content: tw[key]
    }));
  }

}

export interface IMetaOrganization {
  url: string,
  type: string,
  title: string,
  image: string,
  description: string,
  keywords: string,
  site_name: string,
  email: string,
  phone_number: string,
}

export interface IMetaTwitter {
  card: string,
  site: string,
  title: string,
  description: string,
  image: string,
}
