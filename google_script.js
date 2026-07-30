// =================================================================
// 🚀 Google Apps Script - SilaSoft POS Lead Capture Automation
// =================================================================
// انقل هذا الكود كاملاً إلى Google Apps Script داخل جدول Google Sheets

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // إنشاء الهيدر والعناوين تلقائياً في السطر الأول إذا كان الجدول فارغاً
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["التاريخ والوقت", "اسم المحل/الزبون", "رقم الهاتف", "الولاية", "حالة الطلب"]);
      // تنسيق السطر الأول باللون الأخضر والخط العريض
      var headerRange = sheet.getRange(1, 1, 1, 5);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#10b981");
      headerRange.setFontColor("#ffffff");
      headerRange.setHorizontalAlignment("center");
    }
    
    // قراءة البيانات المنسقة القادمة من استمارة صفحة الهبوط
    var data = JSON.parse(e.postData.contents);
    
    // توقيت التسجيل بتوقيت الجزائر
    var timestamp = new Date().toLocaleString("ar-DZ", { timeZone: "Africa/Algiers" });
    
    // إضافة السطر الجديد في الجدول
    sheet.appendRow([
      timestamp,
      data.name || "غير محدد",
      "'" + (data.phone || ""), // الحفاظ على الصفر في بداية رقم الهاتف
      data.state || "غير محدد",
      "جديد ⚡"
    ]);
    
    // إعادة استجابة ناجحة لصفحة الهبوط
    return ContentService.createTextOutput(JSON.stringify({ "result": "success", "message": "تم تسجيل الطلب بنجاح" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// دالة تجريبية للتأكد من عمل السكريبت
function doGet(e) {
  return ContentService.createTextOutput("SilaSoft POS Webhook is Active & Ready!");
}
