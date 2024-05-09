import './styles.css';

const groupContainer = document.querySelector(".group-container")

// creates Html of a group and has listBtn eventListener and deleteBtn eventlistener
const createGroupHtml = (groupName) => {

  const newDiv = document.createElement("div")
  newDiv.classList.add("group")
  newDiv.id = groupCount

  let divHeader = document.createElement("div")
  divHeader.classList.add("groupHeader")

  newDiv.appendChild(divHeader)

  let groupTitle = document.createElement("h3")
  groupTitle.textContent = groupName

  divHeader.appendChild(groupTitle)

  let divBody = document.createElement("div")
  divBody.classList.add("groupBody")

  newDiv.appendChild(divBody)

  let listBtn = document.createElement("button")
  listBtn.classList.add("createListBtn")
  listBtn.textContent = "add item"

  divHeader.appendChild(listBtn)

  const deleteBtn = document.createElement("div")
  deleteBtn.classList.add("deleteBtn")
  deleteBtn.setAttribute("id", groupCount)

  const deleteBtnInner = document.createElement("div")

  deleteBtn.appendChild(deleteBtnInner)

  divHeader.appendChild(deleteBtn)

  return newDiv
}

// function that adds a listener to group delete buttons
const addGroupDeleteBtnEvent = () => {

  const groupDeleteButtonArr = Array.from(document.querySelectorAll(".deleteBtn"))

  groupDeleteButtonArr.forEach(item => {

    item.addEventListener("mousedown", () => {
      item.firstChild.style.backgroundImage = "linear-gradient(92.88deg, #455EB5 9.16%, #5643CC 43.89%, #673FD7 64.72%)"
    })
    // deletes group
    item.addEventListener("click", () => {
      const parent = item.parentElement.parentElement
      console.log(parent)
      groupContainer.removeChild(parent, item)

      delete groups[item.id]

      localStorage.setItem("groupsHtml", groupContainer.innerHTML)
      localStorage.setItem("groupsObj", JSON.stringify(groups))

      console.log(item.id, "group deleted")
      console.log(groups)
    })

  });
}


// clears inputs from all input elements
const clearInputs = () => {
  const inputs = document.querySelectorAll("input");

  let arr = Array.from(inputs)

  arr.forEach(elem => {
    elem.value = ""
  });
}

// event listener to create groups
const createGroupBtn = document.querySelector(".group-create-btn");

createGroupBtn.addEventListener("click", () => {
  const nameInput = document.querySelector(".name-input");

  if (!nameInput.checkValidity()) {
    nameInput.setCustomValidity("Name must be at least 2 characters long")
    return
  }

  groupContainer.appendChild(createGroupHtml(nameInput.value))

  console.log(groupCount, groups)
  groups[groupCount] = {}
  console.log(groups)
  clearInputs()
  closeGroupForm()
  addGroupDeleteBtnEvent()
  addListButtonEvent()
  localStorage.setItem("groupsHtml", groupContainer.innerHTML)
  localStorage.setItem("groupsObj", JSON.stringify(groups))
  groupCount++
  localStorage.setItem("groupCount", groupCount)
})

const inputForm = document.querySelector(".group-form-popup")

// prevents the form being able to be submitted by just pressing enter
inputForm.addEventListener("submit", (e) => {
  e.preventDefault()
})





// creates lists/tasks

const addList = (group, listInfo) => {

  class CreateList {
    constructor(content, priority) {
      this.content = content
      this.priority = priority
    }
  }

  groups[group.id][listCount] = new CreateList(listInfo[0], listInfo[1])

  const createListHtml = () => {

    const newDiv = document.createElement("div")
    newDiv.classList.add("list")
    console.log(listCount, "listCo")
    newDiv.setAttribute("id", listCount)

    const divHeader = document.createElement("div")
    divHeader.classList.add("listHeader")
    newDiv.appendChild(divHeader)

    const divBody = document.createElement("div")
    divBody.classList.add("listBody")
    newDiv.appendChild(divBody)

    let content = document.createElement("h3")
    content.textContent = `. ${listInfo[0]}`
    let priority = document.createElement("p")
    priority.textContent = `Priority: ${listInfo[1]}`

    const deleteBtn = document.createElement("div")
    deleteBtn.classList.add("listDeleteBtn")
    deleteBtn.setAttribute("id", listCount)

    const deleteBtnInner = document.createElement("div")

    deleteBtn.appendChild(deleteBtnInner)

    divHeader.appendChild(deleteBtn)
      .insertAdjacentElement('afterend', priority)

    divBody.appendChild(content)

    console.log(groups)

    return newDiv
  }

  return createListHtml()
}

// function to add event listener to open the list form
let currentList

const addListButtonEvent = () => {

  const listButtonArr = Array.from(document.querySelectorAll(".createListBtn"))

  listButtonArr.forEach(btn => {
    btn.addEventListener("click", () => {
      openListForm()
      currentList = btn
    })
  });
}

// function to add event listener to create button on list form
const addCreateListEvent = () => {
  const listFormCreateBtn = document.querySelector(".list-create-btn")

  listFormCreateBtn.addEventListener("click", () => {

    const parent = currentList.parentElement.parentElement
    console.log(parent)

    const listNameInput = document.querySelector(".list-name-input")
    const prioritySelect = document.querySelector(".priority-select")

    if (!listNameInput.checkValidity()) {
      listNameInput.setCustomValidity("Name must be at least 2 characters long")
      return
    }

    let infoArr = []
    infoArr.push(listNameInput.value)
    infoArr.push(prioritySelect.value)

    currentList.parentElement.nextSibling.appendChild(addList(parent, infoArr))
    addListDeleteButtonEvent()

    localStorage.setItem("groupsHtml", groupContainer.innerHTML)
    localStorage.setItem("groupsObj", JSON.stringify(groups))

    listCount++
    localStorage.setItem("listCount", listCount)

    clearInputs()
    closeListForm()
  })
}

// function to add event listener to list delete button
const addListDeleteButtonEvent = () => {

  const listDeleteButtonArr = Array.from(document.querySelectorAll(".listDeleteBtn"))

  listDeleteButtonArr.forEach(item => {

    item.addEventListener("mousedown", () => {
      item.firstChild.style.backgroundImage = "linear-gradient(92.88deg, #455EB5 9.16%, #5643CC 43.89%, #673FD7 64.72%)"
    })
    // deletes list
    item.addEventListener("click", () => {

      const groupBody = item.parentElement.parentElement.parentElement

      groupBody.removeChild(item.parentElement.parentElement)

      delete groups[groupBody.parentElement.id][item.id]

      localStorage.setItem("groupsHtml", groupContainer.innerHTML)
      localStorage.setItem("groupsObj", JSON.stringify(groups))

      console.log(item.id, "group deleted")
      console.log(groups)
    })
  });
}





// initalise everything

let groups, groupCount, listCount

groupContainer.innerHTML = localStorage.getItem("groupsHtml")

// initialise / get from local storage on window load
window.addEventListener("load", () => {

  // initialise groups obj and groupsObj key value pair in localStorage
  if (localStorage.getItem("groupsObj") == undefined || localStorage.getItem("groupsObj") == null) {
    groups = {}
    localStorage.setItem("groupsObj", JSON.stringify({}))
  } else {
    groups = JSON.parse(localStorage.getItem("groupsObj")) //json parse here
  }

  console.log(groups)

  //initialise groupCount variable and groupCount key value pair in localStorage


  if (localStorage.getItem("groupCount") == undefined || localStorage.getItem("groupCount") == null) {
    groupCount = 0
    localStorage.setItem("groupCount", groupCount)
  } else {
    groupCount = localStorage.getItem("groupCount")
  }

  console.log(groupCount)

  // initialise listCount and in local storage

  if (localStorage.getItem("listCount") == undefined || localStorage.getItem("listCount") == null) {
    listCount = 0
    localStorage.setItem("listCount", listCount)
  } else {
    listCount = localStorage.getItem("listCount")
  }

  console.log(listCount)

  addGroupDeleteBtnEvent()
  addListButtonEvent()
  addListDeleteButtonEvent()
  addCreateListEvent()
})


// open/close group form functions/listeners

function openGroupForm() {
  document.getElementById("myGroupForm").style.display = "block";
}

function closeGroupForm() {
  document.getElementById("myGroupForm").style.display = "none";
}

const groupFormOpenBtn = document.querySelector(".open-button")

groupFormOpenBtn.addEventListener("click", () => {
  openGroupForm()
})

const groupFormCloseBtn = document.querySelector(".group-cancel-btn")

groupFormCloseBtn.addEventListener("click", () => {
  closeGroupForm()
  clearInputs()
})

// open/close group form functions/listeners

function openListForm() {
  document.getElementById("myListForm").style.display = "block";
}

function closeListForm() {
  document.getElementById("myListForm").style.display = "none";
}

const listFormOpenBtns = Array.from(document.querySelectorAll(".createListBtn"))

listFormOpenBtns.forEach(item => {
  item.addEventListener("click", () => {
    openListForm()
  })
})

const listFormCloseBtn = document.querySelector(".list-cancel-btn")

listFormCloseBtn.addEventListener("click", () => {
  closeListForm()
  clearInputs()
})