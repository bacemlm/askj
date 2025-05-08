// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Navigation scroll effect
  const navbar = document.getElementById("navbar")
  const menuToggle = document.querySelector(".menu-toggle")
  const navMenu = document.querySelector(".nav-menu")
  const navLinks = document.querySelectorAll(".nav-menu a")
  const backToTop = document.querySelector(".back-to-top")

  // Scroll event for navbar and back to top button
  window.addEventListener("scroll", () => {
    // Navbar background change on scroll
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
      backToTop.classList.add("active")
    } else {
      navbar.classList.remove("scrolled")
      backToTop.classList.remove("active")
    }

    // Reveal elements on scroll
    revealElements()

    // Active nav link on scroll
    updateActiveNavLink()
  })

  // Mobile menu toggle
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    menuToggle.classList.toggle("active")
  })

  // Close mobile menu when clicking a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      menuToggle.classList.remove("active")
    })
  })

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // Update active nav link based on scroll position
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section")

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        document.querySelector(".nav-menu a.active")?.classList.remove("active")
        document.querySelector(`.nav-menu a[href="#${sectionId}"]`)?.classList.add("active")
      }
    })
  }

  // Reveal elements on scroll
  function revealElements() {
    const revealLeft = document.querySelectorAll(".reveal-left")
    const revealRight = document.querySelectorAll(".reveal-right")
    const revealItems = document.querySelectorAll(".reveal-item")

    const windowHeight = window.innerHeight
    const revealPoint = 150

    // Reveal left elements
    revealLeft.forEach((element) => {
      const revealTop = element.getBoundingClientRect().top

      if (revealTop < windowHeight - revealPoint) {
        element.classList.add("active")
      }
    })

    // Reveal right elements
    revealRight.forEach((element) => {
      const revealTop = element.getBoundingClientRect().top

      if (revealTop < windowHeight - revealPoint) {
        element.classList.add("active")
      }
    })

    // Reveal items
    revealItems.forEach((element) => {
      const revealTop = element.getBoundingClientRect().top

      if (revealTop < windowHeight - revealPoint) {
        element.classList.add("active")
      }
    })
  }

  // Animate hero text
  function animateHeroText() {
    const animateText = document.querySelectorAll(".animate-text")

    animateText.forEach((text, index) => {
      setTimeout(() => {
        text.style.opacity = "1"
        text.style.transform = "translateY(0)"
      }, 300 * index)
    })
  }

  // Counter animation for stats
  function animateCounters() {
    const counters = document.querySelectorAll(".counter")
    const speed = 200

    counters.forEach((counter) => {
      const updateCount = () => {
        const target = Number.parseInt(counter.getAttribute("data-target"))
        const count = Number.parseInt(counter.innerText)

        const increment = Math.trunc(target / speed)

        if (count < target) {
          counter.innerText = count + increment
          setTimeout(updateCount, 1)
        } else {
          counter.innerText = target
        }
      }

      updateCount()
    })
  }

  // Testimonial slider
  const testimonialSlides = document.querySelectorAll(".testimonial-slide")
  const dots = document.querySelectorAll(".dot")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")
  let currentSlide = 0

  function showSlide(n) {
    testimonialSlides.forEach((slide) => slide.classList.remove("active"))
    dots.forEach((dot) => dot.classList.remove("active"))

    currentSlide = (n + testimonialSlides.length) % testimonialSlides.length

    testimonialSlides[currentSlide].classList.add("active")
    dots[currentSlide].classList.add("active")
  }

  // Next/previous controls
  prevBtn.addEventListener("click", () => {
    showSlide(currentSlide - 1)
  })

  nextBtn.addEventListener("click", () => {
    showSlide(currentSlide + 1)
  })

  // Dots controls
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index)
    })
  })

  // Auto slide testimonials
  setInterval(() => {
    showSlide(currentSlide + 1)
  }, 5000)

  // Form submission
  const contactForm = document.getElementById("contactForm")
  const newsletterForm = document.getElementById("newsletterForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()
      alert("Thank you for your message! We will get back to you soon.")
      contactForm.reset()
    })
  }

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault()
      alert("Thank you for subscribing to our newsletter!")
      newsletterForm.reset()
    })
  }

  // Initialize animations
  animateHeroText()
  setTimeout(animateCounters, 1000)
  revealElements()
  updateActiveNavLink()
})
