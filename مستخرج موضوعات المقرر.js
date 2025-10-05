// استخراج موضوعات المقررات من صفحة إضافة واجب
async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function readDependentDropdowns() {
  const result = {}; // <-- التغيير الأول: من مصفوفة إلى كائن

  const list1 = document.getElementById("SelectedTrees_1");
  if (!list1) return result;

  // نبدأ من 1 لتجاوز خيار "اختر"
  for (let i = 1; i < list1.options.length; i++) {
    list1.selectedIndex = i;
    list1.dispatchEvent(new Event("change")); // تشغيل onchange
    await sleep(2100); // مهلة حتى يتم تعبئة القائمة الثانية

    const list2 = document.getElementById("SelectedTrees_2");
    if (!list2) continue;

    for (let j = 1; j < list2.options.length; j++) {
      list2.selectedIndex = j;
      list2.dispatchEvent(new Event("change"));
      await sleep(2200); // مهلة حتى يتم تعبئة القائمة الثالثة

      const list3 = document.getElementById("SelectedTrees_3");
      if (!list3) continue;

const lessons = Array.from(list3.options)
        .filter((opt, k) => k > 0) // تجاهل "اختر"
        .map(opt => opt.text.trim()); // <-- هذا هو السطر الذي تم تعديله
      // --- بداية الجزء المعدل ---
      const subjectName = list1.options[i].text.trim();
      const unitName = list2.options[j].text.trim();

      // إذا لم تكن المادة موجودة في الكائن، قم بإنشائها
      if (!result[subjectName]) {
        result[subjectName] = {};
      }

      // أضف الوحدة والدروس التابعة لها تحت المادة
      result[subjectName][unitName] = lessons;
      // --- نهاية الجزء المعدل ---
    }
  }

  return result;
}

readDependentDropdowns().then(data => {
  console.log("📌 البيانات المستخرجة (بالهيكلة الجديدة):");
  console.log(JSON.stringify(data, null, 2));
});
