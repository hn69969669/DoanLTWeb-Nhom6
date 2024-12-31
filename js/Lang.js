async function loadTranslations() {
  try {
    const response = await fetch("./assets/translations/translations.json");
    if (!response.ok) throw new Error("Failed to load translations");
    return await response.json();
  } catch (error) {
    console.error("Error loading translations:", error);
    return null;
  }
}

async function changeLanguage(lang) {
  const translations = await loadTranslations();
  if (!translations || !translations[lang]) return;

  // Lưu ngôn ngữ đã chọn
  localStorage.setItem("language", lang);

  // Tìm tất cả các phần tử có `data-translate`
  const elements = document.querySelectorAll("[data-translate]");

  elements.forEach((element) => {
    const key = element.getAttribute("data-translate");
    if (translations[lang][key]) {
      // Nếu là placeholder
      if (element.placeholder) {
        element.placeholder = translations[lang][key];
      } else {
        element.textContent = translations[lang][key];
      }
    }
  });

  console.log(`Language changed to: ${lang}`);
}

// Áp dụng ngôn ngữ khi tải trang
document.addEventListener("DOMContentLoaded", async () => {
  const savedLang = localStorage.getItem("language") || "en";
  document.querySelector(".language-switch").value = savedLang;
  await changeLanguage(savedLang);
});
function openModal(type) {
  document.getElementById(type + "Modal").classList.add("active");
  document.getElementById(type + "Overlay").classList.add("active");
}

function closeModal(type) {
  document.getElementById(type + "Modal").classList.remove("active");
  document.getElementById(type + "Overlay").classList.remove("active");
}

// Update click handlers
document.querySelector('[data-bs-target="#signinModal"]').onclick = () =>
  openModal("signin");
document.querySelector('[data-bs-target="#signupModal"]').onclick = () =>
  openModal("signup");

// Close modal when clicking overlay
document.querySelectorAll(".modal-overlay").forEach((overlay) => {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closeModal(overlay.id.replace("Overlay", ""));
    }
  });
});
