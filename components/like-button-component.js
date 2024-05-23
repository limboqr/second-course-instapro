import { toggleLike } from "../api.js"
import { user } from "../index.js"

export function renderLikeButtonComponent(element, post) {
   const render = (post) => {
      const likeImg = post.isLiked ? "like-active" : "like-not-active"
      const likeParts = []

      let likesCount = post.likes.length

      if (likesCount === 0)
         likeParts.push("<i>Жду первого лайка =)</i>")
      else {
         if (post.isLiked) {
            --likesCount

            likeParts.push("<strong>Вам</strong>")

            if (likesCount)
               likeParts.push(" и ещё ")
         }

         if (likesCount) {
            likeParts.push(likesCount)
         }
      }

      element.innerHTML = `
         <button data-post-id="${post.id}" data-post-like="${Number(post.isLiked)}" class="like-button">
            <img src="./assets/images/${likeImg}.svg" alt="heart"/>
         </button>
         <p class="post-likes-text">
            Нравится: ${likeParts.join("")}
         </p>`

      const likeButton = element.querySelector(".like-button")

      likeButton.addEventListener("click", () => {
         if (!user)
            return alert("Чтобы лайкать, необходимо авторизоваться на сайте")

         toggleLike(likeButton.dataset.postId, likeButton.dataset.postLike !== "1")
            .then((post) => {
               render(post)
            })
      })
   }

   render(post)
}