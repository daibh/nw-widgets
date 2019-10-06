// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  FAKE_API: '',
  demoAPI: 'localhost:3000/api',
  meta: {
    url: window.location.href,
    type: 'article',
    title: '♥ Hữu Đại ♥ - ♦ Nw-Widgets ♦ - ○ library built in with angular 8',
    author: 'oNiwa',
    image: `${window.location.origin}/assets/images/logo-527x274.png`,
    description: 'Nw-Widgets is a smart library use angular techique. It\'s contains some module can be usage and decrement develop time with developer as search engine, timeline, ...',
    keywords: 'angular, autocomplete, ng-select, typedhead, search, search-engine, searchengine, autocomplete, typescript, javascript, directive, nw-widgets, nw, widget, widgets, oniwa, niwa, timeline',
    site_name: '♥ Hữu Đại ♥',
    email: 'oniwa1102@gmail.com',
    phone_number: '(+84) 349 803 665',
    card: 'summary',
    site: '@buihuudaitb'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
