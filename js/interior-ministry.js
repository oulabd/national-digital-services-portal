/* ============================================
   INTERIOR MINISTRY JAVASCRIPT
   Accordion & Service Functions
   ============================================ */

// Toggle Accordion Section
function toggleAccordion(sectionId) {
  const targetSection = document.querySelector(`#${sectionId}`).closest('.accordion-section');
  
  // Check if this section is already open
  const isOpen = targetSection.classList.contains('active');
  
  if (isOpen) {
    // If open, close it
    targetSection.classList.remove('active');
  } else {
    // If closed, close all others and open this one
    const sections = document.querySelectorAll('.accordion-section');
    sections.forEach(section => {
      section.classList.remove('active');
    });
    
    // Open the target section
    targetSection.classList.add('active');
    
    // Smooth scroll to section
    setTimeout(() => {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }
}

/* =====================
   CIVIL REGISTRY SERVICES
   ===================== */

// Open Civil Registry Service
function openCivilService(serviceType) {
  let message = '';
  
  switch(serviceType) {
    case 'individual':
      message = `📄 قيد فردي
      
سيتم عرض القيد الفردي الخاص بك مع جميع البيانات الشخصية المسجلة.

المعلومات المتضمنة:
• الاسم الكامل
• رقم الهوية الوطنية
• تاريخ ومكان الولادة
• الجنسية والديانة
• الحالة الاجتماعية
• عنوان السكن

هل تريد المتابعة؟`;
      break;
      
    case 'family':
      message = `👨‍👩‍👧‍👦 قيد عائلي

سيتم عرض القيد العائلي الشامل لجميع أفراد الأسرة.

المعلومات المتضمنة:
• بيانات رب الأسرة
• بيانات الزوجة/الزوجات
• بيانات الأبناء والبنات
• صلات القرابة
• الوضع القانوني لكل فرد

هل تريد المتابعة؟`;
      break;
      
    case 'identity':
      message = `🆔 بيانات الهوية الوطنية

سيتم عرض بياناتك الكاملة المسجلة في سجلات الأحوال المدنية.

المعلومات المتضمنة:
• رقم الهوية الوطنية
• صورة الهوية
• تاريخ الإصدار والانتهاء
• مكان الإصدار
• بيانات البطاقة البيومترية
• حالة الهوية (سارية/منتهية)

هل تريد المتابعة؟`;
      break;
  }
  
  if (confirm(message)) {
    alert('🔄 جاري تحميل المعلومات...\n\nفي النظام الفعلي، سيتم عرض الوثيقة الرسمية مع إمكانية الطباعة والتحميل.');
    // In real implementation:
    // window.location.href = `civil-registry.html?service=${serviceType}`;
  }
}

/* =====================
   CRIMINAL RECORD SERVICES
   ===================== */

// Request Criminal Record Certificate
function requestCriminalRecord(recordType) {
  let message = '';
  let title = '';
  
  if (recordType === 'noCriminal') {
    title = '✅ طلب شهادة "لا حكم عليه"';
    message = `سيتم إصدار شهادة رسمية تثبت عدم وجود أحكام قضائية أو سوابق جنائية.

معلومات الشهادة:
• صادرة من السجل العدلي
• معتمدة رسمياً
• رقم تحقق إلكتروني
• صالحة لمدة 3 أشهر
• قابلة للطباعة

الاستخدامات:
✓ التوظيف الحكومي والخاص
✓ استخراج جواز السفر
✓ الدراسة في الخارج
✓ المعاملات الرسمية

هل تريد طلب الشهادة؟`;
  } else {
    title = '📋 عرض حالة الصحيفة العدلية';
    message = `سيتم عرض تقرير شامل عن حالة السجل العدلي الخاص بك.

المعلومات المتضمنة:
• الأحكام القضائية (إن وجدت)
• تواريخ الأحكام وأنواعها
• حالة التنفيذ
• ملاحظات قانونية

⚠️ هذه المعلومات سرية تماماً ولا يمكن لأي جهة الاطلاع عليها إلا بموافقتك.

هل تريد المتابعة؟`;
  }
  
  if (confirm(`${title}\n\n${message}`)) {
    if (recordType === 'noCriminal') {
      // Simulate certificate issuance
      setTimeout(() => {
        alert(`✅ تم إصدار الشهادة بنجاح!

رقم الشهادة: CR-2026-${Math.floor(Math.random() * 100000)}
تاريخ الإصدار: ${new Date().toLocaleDateString('ar-SY')}
صالحة حتى: ${new Date(Date.now() + 90*24*60*60*1000).toLocaleDateString('ar-SY')}

يمكنك الآن طباعة الشهادة أو تحميلها بصيغة PDF.`);
      }, 1500);
    } else {
      alert('🔄 جاري استرجاع المعلومات...\n\nفي النظام الفعلي، سيتم عرض التقرير الكامل للصحيفة العدلية.');
    }
    // In real implementation:
    // window.location.href = `criminal-record.html?type=${recordType}`;
  }
}

// View Criminal Record Sample
function viewCriminalRecordSample(recordType) {
  alert(`📄 عرض نموذج الشهادة

سيتم فتح نافذة جديدة تحتوي على نموذج توضيحي للشهادة.

في النظام الفعلي:
• سيتم عرض الشهادة الفعلية بياناتك
• مع ختم رسمي ورقم تحقق
• قابلة للطباعة بجودة عالية
• يمكن التحقق منها إلكترونياً`);
  // In real implementation:
  // window.open(`samples/criminal-record-sample.pdf`, '_blank');
}

// Print Criminal Record
function printCriminalRecord(recordType) {
  if (confirm('هل تريد طباعة التقرير؟\n\nسيتم فتح نافذة الطباعة.')) {
    alert('🖨️ جاري تحضير الوثيقة للطباعة...\n\nفي النظام الفعلي، سيتم فتح معاينة الطباعة.');
    // In real implementation:
    // window.print();
  }
}

/* =====================
   INITIALIZATION
   ===================== */

document.addEventListener('DOMContentLoaded', function() {
  
  // Set first accordion section as active by default
  const firstSection = document.querySelector('.accordion-section');
  if (firstSection) {
    firstSection.classList.add('active');
  }
  
  // Add keyboard navigation for accordion headers
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });
  
  // Smooth scroll behavior
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  console.log('✅ Interior Ministry portal initialized');
  
  // =====================
  // VIOLATION IMAGES VIEWER
  // =====================
  // Sample image sets per violation (placeholder SVGs). Replace with real URLs when available.
  const violationImagesMap = {
    'VIO-2024-00156': [
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="100%" height="100%" fill="%23111"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="48">صورة المخالفة VIO-2024-00156 (1)</text></svg>',
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="100%" height="100%" fill="%231b5e20"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="48">صورة المخالفة VIO-2024-00156 (2)</text></svg>'
    ],
    'VIO-2024-00155': [
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="100%" height="100%" fill="%23212b36"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="48">صورة المخالفة VIO-2024-00155 (1)</text></svg>'
    ],
    'VIO-2024-00152': [
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="100%" height="100%" fill="%232b2b2b"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="48">صورة المخالفة VIO-2024-00152 (1)</text></svg>'
    ]
  };

  function populateViolationImagesModal(violationId) {
    const modal = document.getElementById('violationImagesModal');
    if (!modal) return;
    const main = modal.querySelector('.image-main');
    const thumbs = modal.querySelector('.thumbs');

    const images = violationImagesMap[violationId] || [];

    // Populate main image
    if (main) {
      if (images.length) {
        main.innerHTML = `<img src="${images[0]}" alt="صورة المخالفة ${violationId}" style="max-width:100%; max-height:100%; border-radius: var(--radius-lg);" />`;
      } else {
        main.innerHTML = '<div style="color:#fff; font-size: 2rem;">لا توجد صور</div>';
      }
    }

    // Populate thumbnails
    if (thumbs) {
      thumbs.innerHTML = '';
      images.forEach((src, idx) => {
        const btn = document.createElement('button');
        btn.style.cssText = 'height: 96px; background: transparent; border: none; padding: 0; cursor: pointer;';
        btn.setAttribute('aria-label', `عرض الصورة ${idx+1}`);
        const img = document.createElement('img');
        img.src = src;
        img.alt = `مصغّر صورة المخالفة ${violationId} (${idx+1})`;
        img.style.cssText = 'width: 100%; height: 96px; object-fit: cover; border-radius: var(--radius-md);';
        btn.appendChild(img);
        btn.addEventListener('click', () => {
          if (main) {
            main.innerHTML = `<img src="${src}" alt="صورة المخالفة ${violationId}" style="max-width:100%; max-height:100%; border-radius: var(--radius-lg);" />`;
          }
        });
        thumbs.appendChild(btn);
      });
      if (!images.length) {
        const empty = document.createElement('div');
        empty.textContent = '—';
        empty.style.cssText = 'height:96px; background:#E5E7EB; border-radius: var(--radius-md); display:flex; align-items:center; justify-content:center; color:#6B7280;';
        thumbs.appendChild(empty);
      }
    }
  }
  
  // Expose globally for traffic.js
  window.populateViolationImagesModal = populateViolationImagesModal;

  // Bind click handlers to "عرض الصور" buttons to load the correct images
  document.querySelectorAll('.images-cell .action-btn[data-modal-target="violationImagesModal"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const row = e.target.closest('tr');
      const violationId = row?.querySelector('.violation-id')?.textContent?.trim() || '';
      if (violationId) {
        populateViolationImagesModal(violationId);
      } else {
        // Fallback for items outside the table (recent violations section)
        populateViolationImagesModal('VIO-2024-00156');
      }
    });
  });
  
});

// Export functions for HTML inline usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    toggleAccordion,
    openCivilService,
    requestCriminalRecord,
    viewCriminalRecordSample,
    printCriminalRecord
  };
}
