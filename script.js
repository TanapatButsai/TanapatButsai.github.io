// Theme toggle functionality
document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle")
    const htmlElement = document.documentElement
    const themeIcon = themeToggle.querySelector("i")
  
    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem("theme") || "dark"
    htmlElement.setAttribute("data-theme", savedTheme)
    updateThemeIcon(savedTheme)
  
    // Toggle theme when button is clicked
    themeToggle.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-theme")
      const newTheme = currentTheme === "dark" ? "light" : "dark"
  
      htmlElement.setAttribute("data-theme", newTheme)
      localStorage.setItem("theme", newTheme)
      updateThemeIcon(newTheme)
    })
  
    function updateThemeIcon(theme) {
      if (theme === "dark") {
        themeIcon.className = "fas fa-sun"
      } else {
        themeIcon.className = "fas fa-moon"
      }
    }
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)
  
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: "smooth",
          })
        }
      })
    })
  
    // Simple form handling
    const contactForm = document.getElementById("contact-form")
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault()
  
        // Get form data
        const formData = new FormData(this)
        const formValues = Object.fromEntries(formData.entries())
  
        // In a real application, you would send this data to a server
        console.log("Form submitted:", formValues)
  
        // Show success message
        alert("Thank you for your message! I will get back to you soon.")
  
        // Reset form
        this.reset()
      })
    }
  
    // Add scroll reveal animations
    const revealElements = document.querySelectorAll(".section-container, .project-card, .experience-card")
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed")
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
      },
    )
  
    revealElements.forEach((element) => {
      observer.observe(element)
    })
  
    // Add active class to nav links based on scroll position
    const sections = document.querySelectorAll("section")
    const navLinks = document.querySelectorAll(".nav-links a")
  
    window.addEventListener("scroll", () => {
      let current = ""
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
  
        if (pageYOffset >= sectionTop - 200) {
          current = section.getAttribute("id")
        }
      })
  
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href").substring(1) === current) {
          link.classList.add("active")
        }
      })
    })
  })
  