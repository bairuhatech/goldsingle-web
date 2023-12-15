import React from "react";
import { useEffect } from "react";

function Blog() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
    return (
      <div>Blog</div>
    );
  }
  export default Blog;