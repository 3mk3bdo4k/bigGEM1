
// =====================================
// GEM EXPLORER - JAVASCRIPT
// =====================================


// 1. Mobile Navigation

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");

    menuToggle.textContent =
        navLinks.classList.contains("show") ? "✕" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        menuToggle.textContent = "☰";
    });
});


// 2. Animated Statistics

const counters = document.querySelectorAll("[data-count]");

const observer = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;
            const target = Number(counter.dataset.count);
            const suffix = counter.dataset.suffix || "";

            const duration = 1800;
            const startTime = performance.now();

            function updateCounter(currentTime) {

                const progress = Math.min(
                    (currentTime - startTime) / duration,
                    1
                );

                const easedProgress =
                    1 - Math.pow(1 - progress, 4);

                const value = Math.floor(target * easedProgress);

                counter.textContent =
                    value.toLocaleString("en-US") + suffix;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }

            requestAnimationFrame(updateCounter);

            observer.unobserve(counter);
        }

    });

}, { threshold: 0.4 });

counters.forEach(counter => observer.observe(counter));


// 3. Website Search

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const searchNote = document.getElementById("searchNote");

const searchPages = [

    {
        keywords: ["المتحف", "تاريخ المتحف", "الانشاء", "المساحة"],
        title: "عن المتحف",
        url: "pages/about.html"
    },

    {
        keywords: ["رمسيس", "البهو", "المسلة"],
        title: "البهو العظيم",
        url: "pages/grand-hall.html"
    },

    {
        keywords: ["الدرج", "السلم", "التماثيل"],
        title: "الدرج العظيم",
        url: "pages/grand-staircase.html"
    },

    {
        keywords: ["القاعات", "قاعات العرض", "المجتمع", "المعتقدات"],
        title: "قاعات العرض",
        url: "pages/galleries.html"
    },

    {
        keywords: ["توت", "عنخ", "القناع الذهبي", "هوارد كارتر"],
        title: "توت عنخ آمون",
        url: "pages/tutankhamun.html"
    },

    {
        keywords: ["خوفو", "المراكب", "مراكب الشمس"],
        title: "مراكب خوفو",
        url: "pages/khufu-boats.html"
    },

    {
        keywords: ["الترميم", "الكيمياء", "الفيزياء", "التكنولوجيا"],
        title: "الترميم والتكنولوجيا",
        url: "pages/restoration.html"
    },

    {
        keywords: ["الزمن", "التاريخ", "العصور", "الاسرات"],
        title: "الخط الزمني",
        url: "pages/timeline.html"
    },

    {
        keywords: ["المجوهرات", "الحلي"],
        title: "المجوهرات",
        url: "pages/jewelry.html"
    },

    {
        keywords: ["التماثيل"],
        title: "التماثيل الملكية",
        url: "pages/statues.html"
    },

    {
        keywords: ["الصور", "معرض الصور"],
        title: "معرض الصور",
        url: "pages/gallery.html"
    }

];

searchForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
        searchNote.textContent = "من فضلك اكتب كلمة للبحث.";
        return;
    }

    const result = searchPages.find(page => {

        return page.keywords.some(keyword =>
            keyword.includes(query) || query.includes(keyword)
        );

    });

    if (result) {

        searchNote.textContent = "تم العثور على: " + result.title;

        window.location.href = result.url;

    } else {

        searchNote.textContent =
            "لم نعثر على نتيجة مطابقة. جرب البحث بكلمة أخرى.";

    }

});


// 4. Current Year

const footerYear = document.querySelector(".footer-bottom p");

if (footerYear) {
    footerYear.textContent =
        "© " + new Date().getFullYear() +
        " GEM Explorer - جميع الحقوق محفوظة";
}


// 5. Smooth Page Interactions

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(event) {

        const targetId = this.getAttribute("href");

        if (targetId === "#") {
            event.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }

    });

});


// 6. Header Shadow on Scroll

window.addEventListener("scroll", () => {

    const header = document.querySelector(".header");

    if (window.scrollY > 50) {
        header.style.boxShadow = "0 5px 25px rgba(0,0,0,0.25)";
    } else {
        header.style.boxShadow = "none";
    }

});
