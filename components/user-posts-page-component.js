
import { renderHeaderComponent } from "./header-component.js"
import { posts } from "../index.js"
import { renderLikeButtonComponent } from "./like-button-component.js"

import { formatDistanceToNow } from "date-fns"
import { ru } from "date-fns/locale"

export function renderUserPostsPageComponent({ appEl }) {
  const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>

      ${posts.filter((post, index) => index === 0).map((post) =>
        `<div class="post-header" data-user-id="${post.user.id}">
          <img class="post-header__user-image" src="${post.user.imageUrl}">
          <p class="post-header__user-name">${post.user.name.sanitize()}: Все публикации пользователя</p>
        </div>`
      ).join("")}

      <ul class="posts">
      ${posts.map((post) => {
    return `
          <li class="post" data-post-id="${post.id}">
          
            <div class="post-image-container" data-post-id="${post.id}">
              <img class="post-image" src="${post.imageUrl}">
            </div>

            <div class="post-likes" data-post-id="${post.id}"></div>

            <p class="post-text">
              <span class="user-name">${post.user.name.sanitize()}</span>
              ${post.description.sanitize()}
            </p>

            <p class="post-date">
              ${formatDistanceToNow(new Date(post.createdAt), {addSuffix: true, locale: ru})}
            </p>
          </li>`
  }).join("")}
      </ul>
    </div>`

  appEl.innerHTML = appHtml

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  })

  document.querySelectorAll(".post-likes").forEach((element) => {
    const filteredPosts = posts.filter((post) => post.id === element.dataset.postId)

    if (filteredPosts.length)
      renderLikeButtonComponent(element, filteredPosts[0])
  })
}
