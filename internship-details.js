// Internship Details Modal Functionality
document.addEventListener("DOMContentLoaded", () => {
    // Get the modal
    const internshipModal = document.getElementById("internship-modal")
  
    // Get the button that opens the modal
    const viewDetailsBtn = document.getElementById("view-internship-details")
  
    // Get the <span> element that closes the modal
    const closeBtn = document.querySelector(".close-internship-modal")
  
    // When the user clicks the button, open the modal
    if (viewDetailsBtn) {
      viewDetailsBtn.addEventListener("click", () => {
        internshipModal.classList.add("show")
        document.body.style.overflow = "hidden" // Prevent scrolling behind modal
      })
    }
  
    // When the user clicks on <span> (x), close the modal
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        internshipModal.classList.remove("show")
        document.body.style.overflow = "" // Restore scrolling
      })
    }
  
    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener("click", (event) => {
      if (event.target === internshipModal) {
        internshipModal.classList.remove("show")
        document.body.style.overflow = "" // Restore scrolling
      }
    })
  
    // Prevent modal content clicks from closing the modal
    if (internshipModal) {
      const modalContent = internshipModal.querySelector(".internship-modal-content")
      if (modalContent) {
        modalContent.addEventListener("click", (event) => {
          event.stopPropagation()
        })
      }
    }
  
    // Add smooth scrolling for anchor links within the modal
    const modalLinks = document.querySelectorAll('.internship-modal-content a[href^="#"]')
    modalLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          const modalContent = document.querySelector(".internship-modal-content")
          modalContent.scrollTo({
            top: targetElement.offsetTop - 20,
            behavior: "smooth",
          })
        }
      })
    })
  })
  