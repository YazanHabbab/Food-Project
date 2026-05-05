// myfunctions.js - يستخدم jQuery
$(document).ready(function () {
  const meals = [
    {
      code: "SF-001",
      title: "وجبة سمك بوري مشوي لشخصين",
      price: 110000,
      img: "images/sf001.jpg",
      details: {
        ingredients: [
          "4 سمكات بوري أحمر مغسولة ومنظفة",
          "أوراق أوريجانو طازجة",
          "ملح وفلفل أسود",
        ],
        weight: "حوالي 900 غرام (لشخصين)",
        sauces: ["صلصة ليمون وزيت زيتون", "صلصة ثوم خفيفة"],
        notes: "تُقدّم مع شرائح ليمون وبقدونس مفروم",
      },
    },
    {
      code: "SF-002",
      title: "وجبة كباب مشوي",
      price: 85000,
      img: "images/sf002.jpg",
      details: {
        ingredients: ["لحم غنم مفروم متبل", "بصل مفروم", "توابل خاصة"],
        weight: "حوالي 600 غرام",
        sauces: ["صلصة طحينة", "صلصة حارة اختيارية"],
        notes: "تُقدّم مع خبز عربي وسلطة",
      },
    },
    {
      code: "SF-003",
      title: "بيتزا مارجريتا",
      price: 45000,
      img: "images/sf003.jpg",
      details: {
        ingredients: ["عجينة بيتزا", "صلصة طماطم", "جبنة موزاريلا"],
        weight: "حوالي 500 غرام",
        sauces: ["زيت زيتون بلمسة ريحان"],
        notes: "مناسبة لشخصين",
      },
    },
    {
      code: "SF-004",
      title: "سلطة سيزر",
      price: 25000,
      img: "images/sf004.jpg",
      details: {
        ingredients: [
          "خس روماني",
          "قطع دجاج مشوي",
          "خبز محمص",
          "جبنة بارميزان",
        ],
        weight: "حوالي 300 غرام",
        sauces: ["صلصة سيزر الكريمية"],
        notes: "خيار صحي وخفيف",
      },
    },
    {
      code: "SF-005",
      title: "برغر لحم مع بطاطا",
      price: 60000,
      img: "images/sf005.jpg",
      details: {
        ingredients: ["برغر لحم 150غ", "جبنة شيدر", "خبز برغر", "بطاطا مقلية"],
        weight: "حوالي 450 غرام",
        sauces: ["كاتشب", "مايونيز", "صلصة خاصة"],
        notes: "يُقدّم مع مخللات",
      },
    },
  ];

  // توليد جدول الوجبات مع حماية من التكرار
  if ($("#mealsTableBody").length) {
    let tbody = $("#mealsTableBody");
    tbody.empty(); // يزيل أي محتوى سابق داخل tbody
    if (tbody.data("filled")) {
      // إذا امتلأ سابقاً لا نعيد الملء
      return;
    }

    meals.forEach((m, idx) => {
      // تأكد من عرض اسم الوجبة مرة واحدة فقط: نعرض الصورة ثم العنوان النصي
      let mealCell = `<div style="display:flex; align-items:center; justify-content:flex-end;">
                        <span style="display:inline-block; text-align:right;">${m.title}</span>
                        <img src="${m.img}" alt="${m.title}" class="meal-img">
                      </div>`;

      let detailsHtml = `<div class="meal-details" dir="rtl">
        <div><strong>المكونات:</strong> ${m.details.ingredients.join(" • ")}</div>
        <div><strong>الوزن:</strong> ${m.details.weight}</div>
        <div><strong>الصوصات:</strong> ${m.details.sauces.join(" • ")}</div>
        <em>${m.details.notes}</em>
      </div>`;

      let row = `<tr>
        <td>${m.code}</td>
        <td>${mealCell}</td>
        <td class="meal-price">${m.price.toLocaleString()}</td>
        <td><input type="checkbox" class="show-details" data-idx="${idx}" aria-label="إظهار تفاصيل ${m.title}"></td>
        <td><input type="checkbox" class="select-meal" data-idx="${idx}" aria-label="اختيار ${m.title}"></td>
      </tr>
      <tr class="details-row" id="details-${idx}" style="display:none;">
        <td colspan="5">${detailsHtml}</td>
      </tr>`;
      tbody.append(row);
    });

    tbody.data("filled", true); // علم أن tbody قد امتلأ
  }

  // إظهار/إخفاء التفاصيل
  $(document).on("change", ".show-details", function () {
    let idx = $(this).data("idx");
    $("#details-" + idx).toggle(this.checked);
  });

  // متابعة: إظهار نموذج الطلب
  $("#continueBtn").on("click", function (e) {
    e.preventDefault();
    let selected = [];
    $(".select-meal:checked").each(function () {
      selected.push(meals[$(this).data("idx")]);
    });
    if (selected.length === 0) {
      alert("الرجاء اختيار وجبة واحدة على الأقل قبل المتابعة.");
      return;
    }
    let formHtml = `<div id="orderForm">
      <h2>نموذج الطلب</h2>
      <div class="form-row"><label class="form-label">الاسم الكامل (عربي فقط)</label><input id="fullName" class="form-input" type="text" placeholder="الاسم بالعربية"></div>
      <div class="form-row"><label class="form-label">الرقم الوطني (11 خانة) *</label><input id="nationalId" class="form-input" type="text" placeholder="مثال: 01123456789"></div>
      <div class="form-row"><label class="form-label">تاريخ الولادة dd-mm-yyyy</label><input id="birthDate" class="form-input" type="text" placeholder="01-01-1990"></div>
      <div class="form-row"><label class="form-label">رقم الموبايل (Syriatel أو MTN)</label><input id="mobile" class="form-input" type="text" placeholder="09x1234567"></div>
      <div class="form-row"><label class="form-label">الإيميل</label><input id="email" class="form-input" type="email" placeholder="you@example.com"></div>
      <button id="submitOrder" class="btn">إرسال</button>
      <button id="cancelOrder" class="btn secondary">إلغاء</button>
      </div>`;
    $("#formContainer").html(formHtml);
    $("#formContainer").data("selected", selected);
  });

  // إلغاء
  $(document).on("click", "#cancelOrder", function () {
    $("#formContainer").empty();
  });

  // إرسال الطلب والتحقق
  $(document).on("click", "#submitOrder", function (e) {
    e.preventDefault();
    let selected = $("#formContainer").data("selected") || [];
    let name = $("#fullName").val().trim();
    let nid = $("#nationalId").val().trim();
    let birth = $("#birthDate").val().trim();
    let mobile = $("#mobile").val().trim();
    let email = $("#email").val().trim();

    // اسم عربي فقط
    let nameRe = /^[\u0600-\u06FF\s]+$/;
    if (name && !nameRe.test(name)) {
      alert("الاسم يجب أن يحتوي حروف عربية فقط.");
      return;
    }

    // الرقم الوطني 11 خانة وبداية 01-14
    let nidRe = /^(0[1-9]|1[0-4])\d{9}$/;
    if (!nidRe.test(nid)) {
      alert(
        "الرقم الوطني غير صحيح. يجب أن يكون 11 خانة والبداية ترمز للمحافظة.",
      );
      return;
    }

    // تاريخ dd-mm-yyyy
    let dateRe = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19|20)\d{2}$/;
    if (birth && !dateRe.test(birth)) {
      alert("تاريخ الولادة يجب أن يكون بالشكل dd-mm-yyyy.");
      return;
    }

    // موبايل Syriatel أو MTN (093|094|095)
    let mobileRe = /^(09[3-5])\d{7}$/;
    if (mobile && !mobileRe.test(mobile)) {
      alert("رقم الموبايل غير مطابق لشبكات Syriatel أو MTN.");
      return;
    }

    // إيميل
    let emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRe.test(email)) {
      alert("صيغة الإيميل غير صحيحة.");
      return;
    }

    // حساب المجموع والضريبة (تُضاف 5%)
    let subtotal = selected.reduce((s, it) => s + it.price, 0);
    let tax = Math.round(subtotal * 0.05);
    let total = subtotal + tax;

    // عرض نافذة تحتوي التفاصيل
    let details = "الوجبات المختارة:\n";
    selected.forEach((it) => {
      details += `${it.code} - ${it.title} - ${it.price.toLocaleString()} ل.س\n`;
    });
    details += `\nالمجموع: ${subtotal.toLocaleString()} ل.س\nالضريبة 5%: ${tax.toLocaleString()} ل.س\nالمبلغ النهائي: ${total.toLocaleString()} ل.س\n`;
    alert(details);

    // مسح النموذج بعد الإرسال
    $("#formContainer").empty();
  });
});

// home page students section
const students = [
  {
    AName: "علي لقمان يوسف",
    EName: "Ali Lokman Youssef",
    Id: "ali_203985",
    Class: "C2",
    Teacher: "الدكتور غيث",
  },
  {
    AName: "محمد سليمان الخليفو",
    EName: "Mohammad Sulayman Alkhaleefu",
    Id: "mohammed_343490",
    Class: "C3",
    Teacher: "الدكتور غيث",
  },
  {
    AName: "عبد العظيم محمد نعمان الغميس",
    EName: "Abdelazim Mohamad Noman Alghmis",
    Id: "abdlazim_345933",
    Class: "C4",
    Teacher: "الدكتور ضياء",
  },
  {
    AName: "شام صياح قيسر",
    EName: "Sham Siyah Qaisar",
    Id: "Sham_302899",
    Class: "C2",
    Teacher: "الدكتور غيث",
  },
  {
    AName: "مهند ياسين بريك",
    EName: "Mohannad Yaseen Breik",
    Id: "mohannad_245794",
    Class: "C3",
    Teacher: "الدكتور غيث",
  },
  {
    AName: "محمد يزن محمد زاهر حباب",
    EName: "Mohammad Yazan Mohammad Zaher Habbab",
    Id: "Mohammad_Yazan_387446",
    Class: "C6",
    Teacher: "الدكتور مازن",
  },
];

students.forEach((student) => {
  let studentTBody = $("#studentsTableBody");
  let row = `<tr>
        <td>${student.AName}</td>
        <td>${student.EName}</td>
        <td>${student.Id}</td>
        <td>${student.Class}</td>
        <td>${student.Teacher}</td>
      </tr>`;
  studentTBody.append(row);
});

studentTBody.data("filled", true);
