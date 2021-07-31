import { inject } from "aurelia-framework";
import { PostService } from "../common/services/post-service";

@inject(PostService)
export class View {
  constructor(PostService) {
    this.postService = PostService;
  }

  //aurelia life cycle hook to receive params passed in url
  activate(params) {
    this.error = "";
    this.postService
      .find(params.slug)
      .then((data) => {
        this.post = data.post;
      })
      .catch((error) => {
        this.error = error.message;
      });
  }
}
