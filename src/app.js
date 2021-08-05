import { inject, PLATFORM } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";
import { PostService } from "./common/services/post-service";
import { AuthService } from "./common/services/auth-service";

@inject(PostService, AuthService, EventAggregator)
export class App {
  constructor(PostService, AuthService, EventAggregator) {
    this.postService = PostService;
    this.authService = AuthService;
    this.ea = EventAggregator;
  }

  attached() {
    this.user = this.authService.currentUser;

    this.subscription = this.ea.subscribe("currentUser", (currentUser) => {
      this.user = this.authService.currentUser;
    });

    this.postService
      .allTags()
      .then((data) => {
        this.tags = data.tags;
      })
      .catch((error) => {
        this.error = error.message;
      });

    this.postService
      .allArchives()
      .then((data) => {
        this.archives = data.archives;
      })
      .catch((error) => {
        this.error = error.message;
      });
  }

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
      {
        route: "archive/:archive",
        name: "archive-view",
        moduleId: PLATFORM.moduleName("posts/archive-view"),
        title: "View Post by archive",
      },
      {
        route: "tag/:tag",
        name: "tag-view",
        moduleId: PLATFORM.moduleName("posts/tag-view"),
        title: "View Post by Archive",
      },
      {
        route: "login",
        name: "login",
        moduleId: PLATFORM.moduleName("auth/login"),
        title: "Log In",
      },
    ]);
  }

  detached() {
    this.subscription.dispose();
  }

  logOut() {
    this.authService
      .logout()
      .then((data) => {
        this.ea.publish("currentUser", null);
        console.log(data.success);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
}

//libararies added
// moment
