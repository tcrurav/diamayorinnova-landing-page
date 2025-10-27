const articles = document.querySelectorAll("article");
const menuLinks = document.querySelectorAll(".table-of-contents a");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute("id");
      const link = document.querySelector(`.table-of-contents a[href="#${id}"]`);

      if (entry.isIntersecting) {
        menuLinks.forEach(a => a.classList.remove("active"));
        link?.classList.add("active");
      }
    });
  },
  {
    threshold: 0.6 // 60% visible = activa el link
  }
);

articles.forEach(article => observer.observe(article));