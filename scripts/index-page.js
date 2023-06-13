document.addEventListener("DOMContentLoaded", function () {
  const preExistingComments = [
    {
      name: "Connor Walton",
      comment:
        "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
      date: "02/17/2021",
    },

    {
      name: "Emilie Beach",
      comment:
        "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive this would be it. What an incredible day.",
      date: "01/09/2021",
    },
    {
      name: "Miles Acosta",
      comment:
        "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
      date: "12/20/2020",
    },
  ];

  const commentsContainer = document.querySelector(".comments__new-comments");

  function printExistingComments() {
    if (commentsContainer.children.length > 0) {
      return;
    }

    preExistingComments.forEach((commentData) => {
      const commentArticle = createCommentElement(commentData);
      commentsContainer.appendChild(commentArticle);
    });
  }

  printExistingComments();

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
        date: currentDate,
      };
      const commentArticle = createCommentElement(commentData);

      commentsContainer.insertBefore(
        commentArticle,
        commentsContainer.firstChild
      );

      inputName.value = "";
      inputComment.value = "";
    });

  function createCommentElement(commentData) {
    const { name, comment, date } = commentData;

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
    dateset.textContent = date;
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
