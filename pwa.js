// Register service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("ServiceWorker registration successful with scope: ", registration.scope)
      })
      .catch((error) => {
        console.log("ServiceWorker registration failed: ", error)
      })
  })
}

// Add to home screen functionality
let deferredPrompt
const addBtn = document.createElement("button")
addBtn.style.display = "none"
addBtn.classList.add("add-to-home")
addBtn.textContent = "Add to Home Screen"

window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault()
  // Stash the event so it can be triggered later
  deferredPrompt = e
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = "block"

  addBtn.addEventListener("click", () => {
    // Hide our user interface that shows our A2HS button
    addBtn.style.display = "none"
    // Show the prompt
    deferredPrompt.prompt()
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt")
      } else {
        console.log("User dismissed the A2HS prompt")
      }
      deferredPrompt = null
    })
  })
})

// Add the button to the DOM
document.addEventListener("DOMContentLoaded", () => {
  // Add the button to the navbar-right
  const navbarRight = document.querySelector(".navbar-right")
  if (navbarRight) {
    addBtn.style.display = "none" // Initially hidden
    addBtn.innerHTML = '<i class="fas fa-plus-square"></i>'
    addBtn.classList.add("nav-dropdown")
    navbarRight.appendChild(addBtn)
  }
})
