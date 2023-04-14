let b = document.querySelector(".add_button");
let t = document.querySelector(".text1");
let body = document.querySelector("body");

// const newList = document.createElement("div");
// newList.className = "addlist";
// .innerHTML = `<div class="pop_up">
// <div class="part">
//   <div class="part1">Add New Task</div>

// </div>
// <br />
// <br />

// <input type="text" class="para3" id="card-input-text" placeholder="add new task"/>
// <br />
// <br />newList
// <button class="button3" onClick="closeAddCardPopup()">close</button>
//  <button class="button4" onClick="handleAddCard()">add</button>
// </div>
// `;

let data = [];
let cardId;
// console.log("data", data);

function showAddCardPop() {
  let p = document.getElementsByClassName("pop_up");
  p[0].style.display = "block";
}

function closeAddCardPopup() {
  const popup1 = document.getElementsByClassName("pop_up");
  popup1[0].style.display = "none";
}

function handleAddCard() {
  const cardText = document.getElementById("card-input-text").value;
  const card = {
    id: new Date().getTime().toString(),
    cardTitle: cardText,
    content: [],
  };
  if (cardText) {
    data.push(card);
    renderCards();
  } else {
    alert("Please add card Name");
  }
  document.getElementById("card-input-text").value = "";
  closeAddCardPopup();

  const each_card = document.querySelector(".each-card");
  each_card.innerHTML = "";

  const navBar = document.querySelector(".head");
  navBar.style.display = "block";

  const backButton = document.querySelector(".back");
  backButton.style.display = "none";
}

function renderContent() {
  for (let i = 0; i < data.length; i++) {
    const ulElement = document.getElementById(`content_list_${data[i].id}`);
    let child = "";
    for (let j = 0; j < data[i].content.length; j++) {
      const content = data[i].content[j];
      child += `<li class="content ${
        content.done ? "ckecked" : ""
      }" id="content_${content.id}"  onclick="doneTask(${content.id}, ${
        data[i].id
      })">${content.contentText}</li>`;
    }
    ulElement.innerHTML = child;
  }
}

function renderCards() {
  console.log("rendering cards", data);
  const cardcontainer = document.getElementById("card-container");
  let child = "";
  for (let i = 0; i < data.length; i++) {
    // console.log("data[i]:", data[i], `card_${data[i].id}`);
    child += `<div id="${data[i].id}" class="card">
        <p value="${data[i].cardTitle}" onclick="CardView(${data[i].id},this.getAttribute('value'))"class="p2">${data[i].cardTitle}</p>
        <hr>
        <ul id="content_list_${data[i].id}">
        </ul>
        <div class="container2">
        <Button onclick="deleteCard(${data[i].id})" class="delete"><i class="fa fa-trash-o" style="font-size:24px; color:white"></i></Button>
        <Button onclick="showAddContentToCardPopup(${data[i].id})" class="add"><i class="fa fa-plus" style="font-size:20px;color:white""></i></Button>
        </div>
        </div>`;
  }
  cardcontainer.innerHTML = child;
  renderContent();
}

function deleteCard(id) {
  // const cardcontainer = document.getElementById("card-container");
  const cardId = `${id}`;
  const card = document.getElementById(cardId);
  //remove child from parent node
  card.parentNode.removeChild(card);
  data = data.filter((item) => item.id != id);
}

function showAddContentToCardPopup(id) {
  const popup2 = document.getElementById("popup2");
  popup2.style.display = "block";
  cardId = id;
}

function removeAddContentToCardPopup() {
  const popup2 = document.getElementById("popup2");
  popup2.style.display = "none";
}

function addContentToCard() {
  const contentListId = `content_list_${cardId}`;
  const Ul = document.getElementById(contentListId);
  const contentText = document.getElementById("card-content-input").value;
  if (!contentText) {
    alert("Please add task name");
  } else {
    document.getElementById("card-content-input").value = "";
    const liNode = document.createElement("li");
    const listId = new Date().getTime().toString();
    liNode.innerHTML = contentText;
    liNode.className = "content";
    liNode.id = `content_${listId}`;
    liNode.onclick = function () {
      doneTask(listId, cardId);
    };
    Ul.appendChild(liNode);
    removeAddContentToCardPopup();
    // console.log("data", data);
    for (let i = 0; i < data.length; i++) {
      // console.log("contentttttttttt", data[i].id, cardId);
      if (data[i].id == cardId) {
        const content = {
          id: listId,
          contentText: contentText,
          done: false,
        };
        data[i].content.push(content);
        // console.log(data[i]);
      }
    }

    // liNode.addEventListener("click", () => {
    //   liNode.style.textDecoration = "line-through";
    // });
  }
}

function doneTask(listId, cardId) {
  const contentId = `content_${listId}`;
  const liElement = document.getElementById(contentId);
  liElement.classList.toggle("ckecked");

  for (let i = 0; i < data.length; i++) {
    if (data[i].id == cardId) {
      for (let j = 0; j < data[i].content.length; j++) {
        const content = data[i].content[j];
        if (content.id == listId) {
          data[i].content[j].done = !data[i].content[j].done;
        }
      }
    }
  }
}

function CardView(id, value) {
  console.log(id);
  console.log(value);
  const each_card = document.querySelector(".each-card");
  each_card.innerHTML = value;

  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.style.display = "none";
  });

  const cardToShow = document.getElementById(id);
  cardToShow.style.display = "block";

  const navBar = document.querySelector(".head");
  navBar.style.display = "none";

  const backButton = document.querySelector(".back");
  backButton.style.display = "block";
}

function openFirstPage() {
  const cards = document.querySelectorAll(".card");
  const each_card = document.querySelector(".each-card");
  each_card.innerHTML = " ";

  cards.forEach((allcards) => {
    allcards.style.display = "block";
  });
  const navBar = document.querySelector(".head");
  navBar.style.display = "block";

  const backButton = document.querySelector(".back");
  backButton.style.display = "none";
}
