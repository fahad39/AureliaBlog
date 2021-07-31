import { inject, PLATFORM } from "aurelia-framework";

export class App {
  configureRouter(config, router) {
    this.router = router;
    config.title = "FahadBlog";
    config.options.pushState = true;
    config.map([
      {
        route: "",
        name: "home",
        moduleId: PLATFORM.moduleName("posts/index"),
        title: "All Posts",
      },
      {
        route: "post/:slug",
        name: "post-view",
        moduleId: PLATFORM.moduleName("posts/view"),
        title: "View-Post",
      },
    ]);
  }
}

//libararies added
// moment
