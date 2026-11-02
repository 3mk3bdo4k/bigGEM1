const questions = [
    {
        question: "أين يقع المتحف المصري الكبير؟",
        options: ["وسط القاهرة", "بالقرب من أهرامات الجيزة", "في الإسكندرية", "في الأقصر"],
        answer: 1
    },
    {
        question: "ما اسم الملك الذي يرتبط اسمه بأحد أشهر كنوز المتحف؟",
        options: ["رمسيس الثاني", "توت عنخ آمون", "أخناتون", "زوسر"],
        answer: 1
    },
    {
        question: "ما اسم التمثال الضخم الذي يستقبل زوار المتحف في البهو العظيم؟",
        options: ["تمثال أبو الهول", "تمثال رمسيس الثاني", "تمثال خوفو", "تمثال إخناتون"],
        answer: 1
    },
    {
        question: "ما اسم الكتابة المصرية القديمة التي استخدمت الرموز المصورة؟",
        options: ["المسمارية", "اللاتينية", "الهيروغليفية", "الفينيقية"],
        answer: 2
    },
    {
        question: "ما اسم الملك الذي بنى الهرم الأكبر؟",
        options: ["خفرع", "منقرع", "خوفو", "زوسر"],
        answer: 2
    },
    {
        question: "ما المادة التي اشتهر المصري القديم باستخدامها في صناعة التوابيت؟",
        options: ["الخشب", "البلاستيك", "المطاط", "الألومنيوم"],
        answer: 0
    },
    {
        question: "ما الهدف الأساسي من عملية التحنيط عند المصري القديم؟",
        options: ["الزينة فقط", "الحفاظ على الجسد", "العلاج", "التجارة"],
        answer: 1
    },
    {
        question: "ما اسم الحجر الذي ساعد في فك رموز اللغة الهيروغليفية؟",
        options: ["حجر رشيد", "حجر الأهرامات", "حجر الكرنك", "حجر أسوان"],
        answer: 0
    },
    {
        question: "أي من الآتي يُعد من أشهر مقتنيات توت عنخ آمون؟",
        options: ["قناع الذهب", "ساعة شمسية حديثة", "درع روماني", "تاج بطلمي"],
        answer: 0
    },
    {
        question: "ما اسم الملكة المصرية الشهيرة التي حكمت مصر؟",
        options: ["نفرتيتي", "حتشبسوت", "كليوباترا السابعة", "جميع ما سبق"],
        answer: 3
    },
    {
        question: "ما الوظيفة الأساسية لعلم ترميم الآثار؟",
        options: ["تغيير شكل الأثر", "الحفاظ على الآثار ومعالجتها", "بيع القطع الأثرية", "إعادة كتابة التاريخ"],
        answer: 1
    },
    {
        question: "ما اسم المادة التي استخدمها المصري القديم بكثرة في صناعة أدوات الكتابة؟",
        options: ["البردي", "البلاستيك", "الورق المقوى", "النايلون"],
        answer: 0
    },
    {
        question: "أي من هذه المدن تشتهر بمعابد الكرنك؟",
        options: ["الجيزة", "الأقصر", "الإسكندرية", "الفيوم"],
        answer: 1
    },
    {
        question: "ما اسم التمثال الشهير الذي يجمع بين جسم الأسد ورأس الإنسان؟",
        options: ["أبو الهول", "تمثال رمسيس", "تمثال الكاتب", "تمثال حورس"],
        answer: 0
    },
    {
        question: "لماذا تُعد المتاحف مهمة للحضارات؟",
        options: [
            "لأنها أماكن للترفيه فقط",
            "لأنها تحفظ التراث وتتيح دراسته والتعرف عليه",
            "لأنها تستبدل الآثار القديمة",
            "لأنها تمنع البحث العلمي"
        ],
        answer: 1
    }
];

const intro = document.getElementById("quizIntro");
const quizContent = document.getElementById("quizContent");
const resultSection = document.getElementById("resultSection");
const questionsArea = document.getElementById("questionsArea");
const timerElement = document.getElementById("timer");
const progressBar = document.getElementById("progressBar");

let remainingSeconds = 15 * 60;
let timerInterval = null;
let submitted = false;

function renderQuestions() {
    questionsArea.innerHTML = "";

    questions.forEach((q, index) => {
        const card = document.createElement("div");
        card.className = "question-card";

        const title = document.createElement("h3");
        title.textContent = `${index + 1}. ${q.question}`;
        card.appendChild(title);

        q.options.forEach((option, optionIndex) => {
            const label = document.createElement("label");
            label.className = "answer-option";

            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = `question-${index}`;
            radio.value = optionIndex;

            radio.addEventListener("change", updateProgress);

            const text = document.createElement("span");
            text.textContent = option;

            label.appendChild(radio);
            label.appendChild(text);
            card.appendChild(label);
        });

        questionsArea.appendChild(card);
    });
}

function updateProgress() {
    const answered = questions.filter((q, index) =>
        document.querySelector(`input[name="question-${index}"]:checked`)
    ).length;

    const percentage = (answered / questions.length) * 100;
    progressBar.style.width = `${percentage}%`;
    document.getElementById("questionCounter").textContent =
        `تمت الإجابة عن ${answered} من ${questions.length} سؤالًا`;
}

function updateTimer() {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    timerElement.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    if (remainingSeconds <= 60) {
        timerElement.classList.add("warning");
    }

    if (remainingSeconds <= 0) {
        clearInterval(timerInterval);
        finishQuiz();
        return;
    }

    remainingSeconds--;
}

function startQuiz() {
    intro.hidden = true;
    resultSection.hidden = true;
    quizContent.hidden = false;

    submitted = false;
    remainingSeconds = 15 * 60;
    timerElement.classList.remove("warning");

    renderQuestions();
    updateProgress();
    updateTimer();

    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
}

function finishQuiz() {
    if (submitted) return;

    submitted = true;
    clearInterval(timerInterval);

    let score = 0;

    questions.forEach((q, index) => {
        const selected = document.querySelector(
            `input[name="question-${index}"]:checked`
        );

        if (selected && Number(selected.value) === q.answer) {
            score++;
        }
    });

    quizContent.hidden = true;
    resultSection.hidden = false;

    document.getElementById("resultScore").textContent =
        `${score} / ${questions.length}`;

    const passed = score >= 12;

    document.getElementById("resultTitle").textContent =
        passed ? "أحسنت! لقد اجتزت التحدي" : "حاول مرة أخرى";

    document.getElementById("resultIcon").textContent =
        passed ? "🏆" : "📚";

    document.getElementById("resultMessage").textContent =
        passed
            ? "أثبتَّ معرفتك بالمتحف المصري الكبير، تستحق التهنئة!"
            : "لم تصل إلى درجة النجاح هذه المرة. راجع معلوماتك وحاول من جديد.";

    document.getElementById("certificateArea").hidden = !passed;
}

function printCertificate() {
    const name = document.getElementById("studentName").value.trim();

    if (!name) {
        alert("من فضلك اكتب اسمك أولًا.");
        return;
    }

    const score = document.getElementById("resultScore").textContent;

    let certificate = document.getElementById("printCertificate");

    if (!certificate) {
        certificate = document.createElement("div");
        certificate.id = "printCertificate";
        document.body.appendChild(certificate);
    }

    certificate.innerHTML = `
        <div style="font-size:55px; margin-bottom:20px;">🏆</div>
        <h1 style="color:#b8952e; font-size:38px;">شهادة اجتياز</h1>
        <h2 style="font-size:25px; margin-top:35px;">تحدي معرفة المتحف المصري الكبير</h2>
        <p style="font-size:21px; margin-top:45px;">تشهد إدارة GEM Explorer بأن الطالب</p>
        <h2 style="font-size:34px; color:#b8952e;">${escapeHTML(name)}</h2>
        <p style="font-size:21px;">قد اجتاز التحدي بنجاح وحصل على الدرجة:</p>
        <h2 style="font-size:32px; color:#b8952e;">${score}</h2>
        <p style="font-size:18px; margin-top:50px;">مع أطيب التمنيات بمزيد من التفوق والنجاح</p>
        <p style="margin-top:65px; font-size:16px;">GEM Explorer</p>
    `;

    window.print();
}

function escapeHTML(value) {
    return value.replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}

document.getElementById("startBtn").addEventListener("click", startQuiz);

document.getElementById("quizForm").addEventListener("submit", event => {
    event.preventDefault();
    finishQuiz();
});

document.getElementById("certificateBtn").addEventListener("click", printCertificate);

document.getElementById("retryBtn").addEventListener("click", startQuiz);