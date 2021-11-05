function attachEvents() {
  const loadPostsButton = document.getElementById("btnLoadPosts");
  const postsSelect = document.getElementById("posts");
  const viewButton = document.getElementById("btnViewPost");
  const postTitle = document.getElementById("post-title");
  const postBody = document.getElementById("post-body");
  const postComments = document.getElementById("post-comments");

  const postsUrl = "http://localhost:3030/jsonstore/blog/posts";
  const commentsUrl = "http://localhost:3030/jsonstore/blog/comments";

  loadPostsButton.addEventListener("click", async () => {
    const posts = await fetch(postsUrl);
    const postsJson = await posts.json();
    const keys = Object.keys(postsJson);

    for (let key of keys) {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = postsJson[key].title;
      postsSelect.appendChild(option);
    }
  });

  viewButton.addEventListener("click", async () => {
    const postId = postsSelect.value;
    const selectedPost = await fetch(
      `http://localhost:3030/jsonstore/blog/posts/${postId}`
    );
    const selectedPostJson = await selectedPost.json();

    postTitle.textContent = selectedPostJson.title;
    postBody.textContent = selectedPostJson.body;

    const allComments = await fetch(commentsUrl);
    const allCommentsJson = await allComments.json();
    const keys = Object.keys(allCommentsJson);

    for (let key of keys) {
      const comment = allCommentsJson[key];
      if (comment.postId === postId) {
        console.log(comment.postId, postId);
        const li = document.createElement("li");
        li.id = comment.id;
        li.textContent = comment.text;
        postComments.innerHTML = "";
        postComments.appendChild(li);
      }
    }
  });
}

attachEvents();
