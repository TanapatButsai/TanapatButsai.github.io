// Theme toggle functionality
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle")
  const htmlElement = document.documentElement
  const themeIcon = themeToggle.querySelector("i")
  const welcomePage = document.getElementById("welcome-page")
  const portfolioContent = document.getElementById("portfolio-content")
  const enterPortfolioBtn = document.getElementById("enter-portfolio")

  // Create animated background for welcome page
  createAnimatedBackground()

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

  // Animated background for welcome page
  function createAnimatedBackground() {
    if (!welcomePage) return

    // Create particles container
    const particlesContainer = document.createElement("div")
    particlesContainer.className = "particles-container"
    welcomePage.appendChild(particlesContainer)

    // Create particles
    const particleCount = 50
    const particles = []

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"

      // Random size between 2px and 6px
      const size = Math.random() * 4 + 2
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`

      // Random position
      const x = Math.random() * 100
      const y = Math.random() * 100
      particle.style.left = `${x}%`
      particle.style.top = `${y}%`

      // Random opacity
      particle.style.opacity = (Math.random() * 0.5 + 0.1).toString()

      // Add to container
      particlesContainer.appendChild(particle)

      // Store particle data for animation
      particles.push({
        element: particle,
        x,
        y,
        speedX: Math.random() * 0.2 - 0.1,
        speedY: Math.random() * 0.2 - 0.1,
        size,
      })
    }

    // Animate particles
    function animateParticles() {
      particles.forEach((p) => {
        // Update position
        p.x += p.speedX
        p.y += p.speedY

        // Bounce off edges
        if (p.x < 0 || p.x > 100) p.speedX *= -1
        if (p.y < 0 || p.y > 100) p.speedY *= -1

        // Apply position
        p.element.style.left = `${p.x}%`
        p.element.style.top = `${p.y}%`
      })

      // Continue animation if welcome page is visible
      if (welcomePage.style.display !== "none") {
        requestAnimationFrame(animateParticles)
      }
    }

    // Start animation
    animateParticles()
  }

  // Welcome page to portfolio transition
  if (enterPortfolioBtn) {
    enterPortfolioBtn.addEventListener("click", () => {
      welcomePage.style.opacity = "0"
      welcomePage.style.transform = "translateY(-20px)"

      setTimeout(() => {
        welcomePage.style.display = "none"
        portfolioContent.style.display = "block"

        // Trigger a reflow before adding the class
        void portfolioContent.offsetWidth

        portfolioContent.style.opacity = "1"

        // Save that user has entered portfolio
        sessionStorage.setItem("enteredPortfolio", "true")
      }, 500)
    })
  }

  // Check if user has already entered the portfolio
  const hasEnteredPortfolio = sessionStorage.getItem("enteredPortfolio")
  if (hasEnteredPortfolio) {
    welcomePage.style.display = "none"
    portfolioContent.style.display = "block"
    portfolioContent.style.opacity = "1"
  }

  // Profile photo modal functionality
  const profileImg = document.getElementById("profile-img")
  const photoModal = document.getElementById("photo-modal")
  const modalImg = document.getElementById("modal-img")
  const closeModal = document.querySelector(".close-modal")

  if (profileImg && photoModal) {
    // Open modal when profile image is clicked
    profileImg.addEventListener("click", () => {
      // Set the modal image source to match the profile image
      modalImg.src = profileImg.src.replace("height=300&width=300", "height=600&width=600")

      // Show the modal
      photoModal.style.display = "block"
      // Use setTimeout to ensure the display change happens before adding the show class
      setTimeout(() => {
        photoModal.classList.add("show")
      }, 10)

      // Prevent scrolling on the body
      document.body.style.overflow = "hidden"
    })

    // Close modal when X is clicked
    closeModal.addEventListener("click", closePhotoModal)

    // Close modal when clicking outside the image
    photoModal.addEventListener("click", (e) => {
      if (e.target === photoModal) {
        closePhotoModal()
      }
    })

    // Close modal with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && photoModal.classList.contains("show")) {
        closePhotoModal()
      }
    })

    function closePhotoModal() {
      photoModal.classList.remove("show")
      // Wait for animation to complete before hiding
      setTimeout(() => {
        photoModal.style.display = "none"
        document.body.style.overflow = "auto"
      }, 300)
    }
  }

  // Gallery functionality
  const galleryTrack = document.querySelector(".gallery-track")
  const gallerySlides = document.querySelectorAll(".gallery-slide")
  const prevButton = document.querySelector(".gallery-control.prev")
  const nextButton = document.querySelector(".gallery-control.next")
  const indicators = document.querySelectorAll(".gallery-indicator")

  if (galleryTrack && gallerySlides.length > 0) {
    let currentIndex = 0
    const slideCount = gallerySlides.length / 2 // Divide by 2 because we have duplicated slides
    const slideWidth = 100 / slideCount
    let autoSlideInterval

    // Set initial position
    galleryTrack.style.transform = `translateX(0%)`

    // Function to move to a specific slide
    function moveToSlide(index) {
      // Ensure index is within bounds
      if (index < 0) {
        index = slideCount - 1
      } else if (index >= slideCount) {
        index = 0
      }

      currentIndex = index
      const offset = -currentIndex * slideWidth
      galleryTrack.style.transform = `translateX(${offset}%)`

      // Update indicators
      indicators.forEach((indicator, i) => {
        indicator.classList.toggle("active", i === Math.floor(currentIndex / 4))
      })
    }

    // Event listeners for controls
    if (prevButton) {
      prevButton.addEventListener("click", () => {
        moveToSlide(currentIndex - 1)
        resetAutoSlide()
      })
    }

    if (nextButton) {
      nextButton.addEventListener("click", () => {
        moveToSlide(currentIndex + 1)
        resetAutoSlide()
      })
    }

    // Event listeners for indicators
    indicators.forEach((indicator, i) => {
      indicator.addEventListener("click", () => {
        moveToSlide(i * 4) // Each indicator represents a group of 4 images
        resetAutoSlide()
      })
    })

    // Auto slide functionality
    function startAutoSlide() {
      autoSlideInterval = setInterval(() => {
        moveToSlide(currentIndex + 1)
      }, 5000) // Change slide every 5 seconds
    }

    function resetAutoSlide() {
      clearInterval(autoSlideInterval)
      startAutoSlide()
    }

    // Start auto sliding
    startAutoSlide()

    // Load images from folder (in a real implementation)
    function loadImagesFromFolder() {
      // This is a placeholder function
      // In a real implementation, you would use server-side code to read the folder
      // or have a predefined list of images

      // For demonstration purposes, we'll use the images from the gallery folder
      const galleryImages = document.querySelectorAll(".gallery-image")

      // Use the correct path to your gallery images
      const imagePaths = [
        "images/gallery/temp.png",
        "images/gallery/temp.png",
        "images/gallery/temp.png",
        "images/gallery/temp.png",
        "images/gallery/temp.png",
        "images/gallery/temp.png",
        "images/gallery/temp.png",
        "images/gallery/temp.png",
      ]

      // Set image sources
      galleryImages.forEach((img, index) => {
        const imageIndex = index % imagePaths.length
        img.src = imagePaths[imageIndex]
        img.alt = `Gallery Image ${imageIndex + 1}`
      })
    }

    // Call the function to load images
    loadImagesFromFolder()
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

  // Document download handling
  const downloadResumeLink = document.getElementById("download-resume")
  const downloadTranscriptLink = document.getElementById("download-transcript")

  // Resume download
  if (downloadResumeLink) {
    downloadResumeLink.addEventListener("click", (e) => {
      e.preventDefault()

      // In a real implementation, you would set the actual file path
      const resumeFilePath = "path/to/your/resume.pdf"

      // Create a temporary anchor element to trigger the download
      const tempLink = document.createElement("a")
      tempLink.href = resumeFilePath
      tempLink.setAttribute("download", "Thanapat_Butsai_Resume.pdf")

      // Simulate click to trigger download
      // In a real implementation, this would download the actual file
      // For now, show an alert
      alert("Resume download would start now. In production, replace this with the actual file path.")

      // document.body.appendChild(tempLink);
      // tempLink.click();
      // document.body.removeChild(tempLink);
    })
  }

  // Transcript download
  if (downloadTranscriptLink) {
    downloadTranscriptLink.addEventListener("click", (e) => {
      e.preventDefault()

      // In a real implementation, you would set the actual file path
      const transcriptFilePath = "path/to/your/transcript.pdf"

      // Create a temporary anchor element to trigger the download
      const tempLink = document.createElement("a")
      tempLink.href = transcriptFilePath
      tempLink.setAttribute("download", "Thanapat_Butsai_Transcript.pdf")

      // Simulate click to trigger download
      // In a real implementation, this would download the actual file
      // For now, show an alert
      alert("Transcript download would start now. In production, replace this with the actual file path.")

      // document.body.appendChild(tempLink);
      // tempLink.click();
      // document.body.removeChild(tempLink);
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
