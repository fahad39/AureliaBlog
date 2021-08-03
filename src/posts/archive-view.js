import { inject } from "aurelia-framework";
import { PostService } from "../common/services/post-service";

@inject(PostService)
export class ArchiveView {
  constructor(PostService) {
    this.postService = PostService;
  }

  activate(params) {
    this.archive = params.archive;
    console.log("archiece", this.archive);
    this.postService
      .postsByArchive(this.archive)
      .then((data) => {
        this.posts = data.archive;
      })
      .catch((error) => {
        this.error = error.message;
      });
  }
}
