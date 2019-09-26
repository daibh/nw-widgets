# Nw Widgets - Angular powered widgets

[Angular](https://angular.io/) widgets built from the ground up using only [Bootstrap 4](https://getbootstrap.com/) CSS with APIs designed for the Angular.

Please check our [demo site](https://huudai.com/nw-widgets) and the list of
[issues](https://github.com/daibh/nw-widgets/issues) to see all the things we are working on. Feel free to make comments there.


## Table of Contents

- [Demo](#demo)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Supported browsers](#supported-browsers)
- [Getting help](#getting-help)
- [You think you've found a bug?](#you-think-youve-found-a-bug)
- [Contributing to the project](#contributing-to-the-project)
- [Code of conduct](#code-of-conduct)

## Demo

Please check all components we have in action at https://huudai.com/nw-widgets

## Dependencies

The only two dependencies are [Angular](https://angular.io) and [Bootstrap 4](https://getbootstrap.com) CSS.
Here is the list of minimal required versions:

| nw-widgets   | Angular | Bootstrap CSS |
| ------------ | ------- | ------------- |
| 0.x.x        | 8.0.2   | 4.3.1         |

## Installation

You need to have an Angular project with the supported Angular version. We strongly recommend using [Angular CLI](https://cli.angular.io) for this.

You also need to add Bootstrap 4 CSS to your application by using your preferred way (it really depends on the setup you're using). Ex. for Angular CLI you can [get Bootstrap from npm](https://www.npmjs.com/package/bootstrap) and update your `angular.json` with something like:

```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css"
]
```

Please note that you need only CSS and **should not** add other JavaScript dependencies like `bootstrap.js`, `jQuery` or `popper.js` as ng-bootstrap's goal is to completely replace them.

After installing the above dependencies, install `nw-widgets` via:
```shell
npm install @oniwa/nw-widgets --save
```
Once installed you need to import our main module:
```js
import {NwWidgetsModule} from '@oniwa/nw-widgets';

@NgModule({
  ...
  imports: [NwWidgetsModule, ...],
  ...
})
export class YourAppModule {
}
```

Alternatively you could only import modules with components you need, ex. pagination and alert.
The resulting bundle will be smaller in this case.

```js
import {SearchEngineModule} from '@oniwa/nw-widgets';

@NgModule({
  ...
  imports: [SearchEngineModule, ...],
  ...
})
export class YourAppModule {
}
```


## Supported browsers

We support the same browsers and versions supported by both Bootstrap 4 and Angular, whichever is _more_ restrictive. See [Angular browser support](https://angular.io/guide/browser-support) and [Bootstrap browser support](https://getbootstrap.com/docs/4.0/getting-started/browsers-devices/#supported-browsers) for more details, but on the high-level it should be something like:

* Chrome (45+)
* Firefox (40+)
* IE (10+)
* Edge (20+)
* Safari (7+)


## Getting help

Please, do not open issues for the general support questions as we want to keep GitHub issues for bug reports and feature requests. You've got much better chances of getting your question answered on [StackOverflow](http://stackoverflow.com/questions/tagged/nw-widgets) where maintainers are looking at questions tagged with `nw-widgets`.

StackOverflow is a much better place to ask questions since:
* there are hundreds of people willing to help on StackOverflow
* questions and answers stay available for public viewing so your question / answer might help someone else
* SO voting system assures that the best answers are prominently visible.

To save your and our time we will be systematically closing all the issues that are requests for general support and redirecting people to StackOverflow.


## You think you've found a bug?

We want to fix it ASAP! But before fixing a bug we need to reproduce and confirm it.

We ask you to respect two things:
* fill the GitHub issue template by providing the bug description and appropriate versions of Angular, ng-bootstrap and TypeScript
* provide a use-case that fails with a **minimal reproduction scenario** using [StackBlitz](https://stackblitz.com) (you can start by forking one from our [demo page](https://huudai.com/nw-widgets/components))

A minimal reproduction scenario allows us to quickly confirm a bug (or point out a coding problem) as well as confirm that we are fixing the right problem.

Please note that **we will be insisting on a minimal reproduce scenario** in order to save maintainers time and ultimately be able to fix more bugs. We'll mark the issue as non-actionable without it and close if not heard from the reporter.

Interestingly, from our experience users often find coding problems themselves while preparing a minimal StackBlitz. We understand that sometimes it might be hard to extract essentials bits of code from a larger code-base but we really need to isolate the problem before we can fix it.


## Contributing to the project

Please check the [DEVELOPER.md](DEVELOPER.md) for documentation on running the project locally and [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.


## Code of conduct

Please take a moment and read our [Code of Conduct](CODE_OF_CONDUCT.md)