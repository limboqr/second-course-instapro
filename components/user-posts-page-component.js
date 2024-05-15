
import { renderHeaderComponent } from "./header-component.js"
import { posts, goToPage } from "../index.js"

export function renderUserPostsPageComponent({ appEl }) {
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
                <p class="post-header__user-name">${post.user.name}</p>
            </div>

            <div class="post-image-container" data-post-id="${post.id}">
              <img class="post-image" src="${post.imageUrl}">
            </div>

            <div class="post-likes">
              <button class="like-button"  data-post-id="${post.isLiked}">

              ${
                post.isLiked
                  ? `<img src="./assets/images/like-active.svg">`
                  : `<img src="./assets/images/like-not-active.svg">`
              }

              </button>
              <p class="post-likes-text">
                Нравится: <strong>${post.likes}</strong>
              </p>
            </div>

            <p class="post-text">
              <span class="user-name">${post.user.name}</span>
              ${post.description}
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
}
