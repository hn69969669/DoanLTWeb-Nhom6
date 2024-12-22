const faqs = document.querySelectorAll(".faq");

// click vào hiện ra văn bản
faqs.forEach((faq) => {
  faq.addEventListener("click", () => {
    faq.classList.toggle("active");
  });
});
