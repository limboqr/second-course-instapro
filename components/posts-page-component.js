import { USER_POSTS_PAGE } from "../routes.js"
import { renderHeaderComponent } from "./header-component.js"
import { renderLikeButtonComponent } from "./like-button-component.js"
import { posts, goToPage } from "../index.js"

export function renderPostsPageComponent({ appEl }) {
  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>

      <ul class="posts">
      ${posts.map((post) => {
    return `
          <li class="post" data-post-id="${post.id}">
            <div class="post-header" data-user-id="${post.user.id}">
                <img class="post-header__user-image" src="${post.user.imageUrl}">
                <p class="post-header__user-name">${post.user.name.sanitize()}</p>
            </div>

            <div class="post-image-container" data-post-id="${post.id}">
              <img class="post-image" src="${post.imageUrl}">
            </div>

            <div class="post-likes" data-post-id="${post.id}"></div>

            <p class="post-text">
              <span class="user-name">${post.user.name.sanitize()}</span>
              ${post.description.sanitize()}
            </p>

            <p class="post-date">
              ${new Date(post.createdAt)}
            </p>
          </li>`
  }).join("")}
      </ul>
    </div>`

  appEl.innerHTML = appHtml

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  })

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      })
    })
  }

  document.querySelectorAll(".post-likes").forEach((element) => {
    const filteredPosts = posts.filter((post) => post.id === element.dataset.postId)

    if (filteredPosts.length)
      renderLikeButtonComponent(element, filteredPosts[0])
  })
}
