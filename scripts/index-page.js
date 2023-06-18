document.addEventListener("DOMContentLoaded", function () {

  const commentsContainer = document.querySelector(".comments__new-comments");
  let preExistingComments;
  function printExistingComments() {
    if (commentsContainer.children.length > 0) {
      return;
    }

    preExistingComments.forEach((commentData) => {
      const commentArticle = createCommentElement(commentData);
      commentsContainer.appendChild(commentArticle);
    });
  }
  fetch("https://project-1-api.herokuapp.com/comments?api_key=e0eea5f0-0f8c-4b54-9fc4-ff50843766d4")
    .then(response => response.json())
    .then(data => {
      preExistingComments = data;
      printExistingComments(); 
    })
    .catch(error => {
      console.error('Error:', error);
    });

  document
    .querySelector(".comments__form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const inputName = document.querySelector("#name");
      const inputComment = document.querySelector("#comment");

      const nameValue = inputName.value.trim();
      const commentValue = inputComment.value.trim();



      if (nameValue === "" || commentValue === "") {
        inputName.classList.add("comments__error");
        inputComment.classList.add("comments__error");
        return;
      } else {
        inputName.classList.remove("comments__error");
        inputComment.classList.remove("comments__error");
        inputName.classList.add("comments__success");
        inputComment.classList.add("comments__success");
      }

      const currentDate = new Date().toLocaleDateString();

      const commentData = {
        name: nameValue,
        comment: commentValue,
        timestamp: currentDate,
      };
      const postData= {
        name:nameValue,
        comment:commentValue,
      };
      
      const commentArticle = createCommentElement(commentData);

      commentsContainer.insertBefore(
        commentArticle,
        commentsContainer.firstChild
      );
      fetch("https://project-1-api.herokuapp.com/comments?api_key=e0eea5f0-0f8c-4b54-9fc4-ff50843766d4", {
  method: 'POST',
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(postData)
})
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error: ' + response.status);
    }
  })
  .then(data => {
    console.log("Response:", data)
  })
  .catch(error => {
    console.error('Error:', error);
  });


      inputName.value = "";
      inputComment.value = "";
    });

  function createCommentElement(commentData) {
    const { name, comment, timestamp } = commentData;

    const commentArticle = document.createElement("article");
    commentArticle.classList.add("comments__image-wrap");

    const imagePlaceholder = document.createElement("img");
    imagePlaceholder.classList.add("comments__image-placeholder");

    const innerArticle = document.createElement("article");
    innerArticle.classList.add("comments__comment-data");

    const nameAndDateArticle = document.createElement("article");
    nameAndDateArticle.classList.add("comments__time-datset");

    const nameHeading = document.createElement("h3");
    nameHeading.textContent = name;

    const dateset = document.createElement("p");
    currentDate = new Date(timestamp).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' });
    dateset.textContent = currentDate ;
    dateset.classList.add("comments__date");

    const commentParagraph = document.createElement("p");
    commentParagraph.textContent = comment;
    commentParagraph.classList.add("comments__wrapper");

    nameAndDateArticle.appendChild(nameHeading);
    nameAndDateArticle.appendChild(dateset);

    innerArticle.appendChild(nameAndDateArticle);
    innerArticle.appendChild(commentParagraph);

    commentArticle.appendChild(imagePlaceholder);
    commentArticle.appendChild(innerArticle);

    return commentArticle;
  }
});