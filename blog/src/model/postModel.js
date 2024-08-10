import React from "react";

export class Post {
    constructor(pid, title, content, likes) {
      this.pid = pid;
      this.title = title;
      this.content = content;
      this.likes = likes;
    }
}
