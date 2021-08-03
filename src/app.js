import { inject, PLATFORM } from "aurelia-framework";
import { PostService } from "./common/services/post-service";

@inject(PostService)
export class App {
  constructor(PostService) {
    this.postService = PostService;
  }

  attached() {
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
    ]);
  }
}

//libararies added
// moment
