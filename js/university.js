/* ========== UNIVERSITY PAGE JAVASCRIPT ========== */

/**
 * Toggle university accordion sections
 * Only one section can be open at a time
 */
function toggleUniversityAccordion(sectionId) {
  const targetSection = document.getElementById(sectionId)?.parentElement;
  
  if (!targetSection) return;

  // Check if section is already open
  const isOpen = targetSection.classList.contains('active');

  // If open, close it
  if (isOpen) {
    targetSection.classList.remove('active');
  } else {
    // If closed, close all other sections and open this one
    document.querySelectorAll('.university-accordion .accordion-section').forEach(section => {
      section.classList.remove('active');
    });
    targetSection.classList.add('active');
  }

  // Smooth scroll to section
  setTimeout(() => {
    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

/**
 * Switch between tabs in main university section
 */
function switchTab(tabGroup, tabIndex) {
  const allTabs = document.querySelectorAll(`[data-tab-group="${tabGroup}"]`);
  const allContents = document.querySelectorAll(`[data-tab-content="${tabGroup}"]`);

  // Remove active class from all tabs and contents
  allTabs.forEach(tab => tab.classList.remove('active'));
  allContents.forEach(content => content.classList.remove('active'));

  // Add active class to selected tab and content
  if (allTabs[tabIndex]) {
    allTabs[tabIndex].classList.add('active');
  }
  if (allContents[tabIndex]) {
    allContents[tabIndex].classList.add('active');
  }
}

/**
 * Switch between private university tabs (Academic Services / Tuition)
 */
function switchPrivateTab(tabName) {
  // Hide all subtabs
  document.querySelectorAll('.subtab-content').forEach(content => {
    content.style.display = 'none';
  });

  // Remove active class from all subtabs
  document.querySelectorAll('.subtab').forEach(button => {
    button.classList.remove('active');
  });

  // Show selected tab
  const tabElement = document.getElementById(`${tabName}-private`);
  if (tabElement) {
    tabElement.style.display = 'block';
    
    // Mark corresponding button as active
    const activeButton = Array.from(document.querySelectorAll('.subtab')).find(btn => 
      btn.textContent.includes(tabName === 'courses' ? 'المقررات' : 
                               tabName === 'grades' ? 'الدرجات' : 
                               tabName === 'schedule' ? 'الجدول' : 
                               'تسجيل')
    );
    if (activeButton) {
      activeButton.classList.add('active');
    }
  }
}

/**
 * Select a private university
 */
function selectPrivateUniversity(universityId, universityName) {
  console.log(`Selected University: ${universityName} (${universityId})`);
  
  // Show success message
  const message = document.createElement('div');
  message.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background-color: #10B981;
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
    animation: slideIn 0.3s ease-out;
  `;
  message.innerHTML = `✓ تم اختيار جامعة ${universityName}`;
  document.body.appendChild(message);

  // Remove message after 3 seconds
  setTimeout(() => {
    message.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => message.remove(), 300);
  }, 3000);

  // Scroll to private university section if needed
  const privateSection = document.getElementById('privateUniversities');
  if (privateSection) {
    privateSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * View payment receipt
 */
function viewPaymentReceipt(receiptId) {
  console.log(`Viewing Receipt: ${receiptId}`);
  
  // Get receipt data
  const receiptData = {
    'RECEIPT-001': {
      date: '2025-12-15',
      amount: '3,500 ل.س',
      method: 'تحويل بنكي',
      status: 'مدفوع'
    }
  };

  const receipt = receiptData[receiptId];
  
  if (receipt) {
    const message = `
      📄 إيصال الدفع
      ─────────────────────
      التاريخ: ${receipt.date}
      المبلغ: ${receipt.amount}
      طريقة الدفع: ${receipt.method}
      الحالة: ${receipt.status}
      ─────────────────────
      رقم الإيصال: ${receiptId}
    `;
    
    alert(message);
  }
}

/**
 * Open payment interface
 */
function openPaymentInterface(tuitionId) {
  console.log(`Opening Payment Interface for: ${tuitionId}`);
  
  const message = `
    💳 واجهة الدفع الآمنة
    ─────────────────────
    
    المبلغ المستحق: 3,500 ل.س
    الفصل: الفصل الثاني 2025-2026
    
    خيارات الدفع:
    • تحويل بنكي مباشر
    • بطاقة ائتمان
    • محفظة رقمية
    • تحويل من خلال التطبيق
    
    ملاحظة: هذه واجهة محاكاة.
    سيتم تحويلك للبوابة الآمنة للدفع.
  `;
  
  alert(message);
}

/**
 * Load university courses when university is selected
 */
function loadUniversityCourses(event) {
  const selectedUniversity = event.target.value;
  console.log(`Loading courses for: ${selectedUniversity}`);
  
  // In a real application, this would load courses from a server
  // For now, it's just a placeholder
}

/**
 * Logout user
 */
function logoutUser() {
  if (confirm('هل تريد تسجيل الخروج؟')) {
    alert('تم تسجيل الخروج بنجاح');
    // Redirect to login page
    window.location.href = 'index.html';
  }
}

/**
 * Private universities data
 */
const privateUniversitiesData = [
  { id: 'giu', name: 'الجامعة الألمانية الدولية', city: 'damascus', location: 'دمشق - منطقة الضاحية', specializations: ['engineering', 'business', 'it'] },
  { id: 'qassyoun', name: 'جامعة قاصيون', city: 'damascus', location: 'دمشق - جرمانا', specializations: ['medicine', 'pharmacy'] },
  { id: 'rafidain', name: 'جامعة الرافدين الدولية', city: 'aleppo', location: 'حلب - القصور', specializations: ['law', 'business'] },
  { id: 'damascus-intl', name: 'جامعة دمشق الدولية', city: 'damascus', location: 'دمشق - المزة', specializations: ['engineering', 'it', 'business'] },
  { id: 'arab-intl', name: 'الجامعة العربية الدولية', city: 'homs', location: 'حمص - الوعر', specializations: ['medicine', 'engineering', 'pharmacy'] }
];

/**
 * Get specialization label in Arabic
 */
function getSpecializationLabel(spec) {
  const labels = {
    'engineering': 'الهندسة',
    'medicine': 'الطب',
    'business': 'إدارة الأعمال',
    'it': 'الحاسوب',
    'law': 'القانون',
    'pharmacy': 'الصيدلة'
  };
  return labels[spec] || spec;
}

/**
 * Filter and display private universities
 */
function filterPrivateUniversities() {
  const universityFilter = document.getElementById('privateUniversity')?.value || '';
  const cityFilter = document.getElementById('privateCity')?.value || '';
  const specializationFilter = document.getElementById('privateSpecialization')?.value || '';
  
  let filtered = privateUniversitiesData;
  
  // Filter by university name
  if (universityFilter) {
    filtered = filtered.filter(u => u.id === universityFilter);
  }
  
  // Filter by city
  if (cityFilter) {
    filtered = filtered.filter(u => u.city === cityFilter);
  }
  
  // Filter by specialization
  if (specializationFilter) {
    filtered = filtered.filter(u => u.specializations.includes(specializationFilter));
  }
  
  // Display results
  displayPrivateUniversities(filtered);
}

/**
 * Display private universities in the grid
 */
function displayPrivateUniversities(universities) {
  const grid = document.getElementById('privateUniversitiesGrid');
  if (!grid) return;
  
  if (universities.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: var(--spacing-2xl); color: var(--dark-gray);">
        <p style="font-size: 1.25rem;">لا توجد جامعات تطابق معايير البحث</p>
        <button class="btn btn-outline" onclick="clearPrivateFilters()" style="margin-top: var(--spacing-lg);">إعادة تعيين البحث</button>
      </div>
    `;
    return;
  }
  
  grid.innerHTML = universities.map(u => `
    <div class="private-university-card">
      <div class="university-card-header">
        <div class="university-icon">🏢</div>
        <h3>${u.name}</h3>
      </div>
      <div class="university-card-content">
        <p><strong>الموقع:</strong> ${u.location}</p>
        <p><strong>التخصصات:</strong> ${u.specializations.map(s => getSpecializationLabel(s)).join('، ')}</p>
      </div>
      <button class="btn btn-primary btn-block" onclick="selectPrivateUniversity('${u.id}', '${u.name}')">عرض التفاصيل</button>
    </div>
  `).join('');
}

/**
 * Clear private university filters
 */
function clearPrivateFilters() {
  document.getElementById('privateUniversity').value = '';
  document.getElementById('privateCity').value = '';
  document.getElementById('privateSpecialization').value = '';
  displayPrivateUniversities(privateUniversitiesData);
}

/**
 * Logout user
 */
function logoutUser() {
  if (confirm('هل تريد تسجيل الخروج؟')) {
    alert('تم تسجيل الخروج بنجاح');
    // Redirect to login page
    window.location.href = 'index.html';
  }
}

/**
 * Toggle sidebar (same as main.js)
 */
function toggleSidebar() {
  const sidebar = document.querySelector('aside');
  if (sidebar) {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      sidebar.classList.toggle('active');
    } else {
      sidebar.classList.toggle('expanded');
    }
  }
}

/**
 * Initialize page on document ready
 */
document.addEventListener('DOMContentLoaded', function() {
  // Set up tab click handlers (buttons only)
  const tabButtons = document.querySelectorAll('.tab[data-tab-group]');
  tabButtons.forEach((btn) => {
    btn.addEventListener('click', function() {
      const group = this.getAttribute('data-tab-group');
      const tabs = Array.from(document.querySelectorAll(`.tab[data-tab-group="${group}"]`));
      const contents = Array.from(document.querySelectorAll(`[data-tab-content="${group}"]`));

      // Remove active from all in this group
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      // Activate clicked tab and its content
      this.classList.add('active');
      const idx = tabs.indexOf(this);
      if (contents[idx]) {
        contents[idx].classList.add('active');
      }
    });
  });

  // Initialize default active tab per group
  document.querySelectorAll('.tabs[data-tab-group]').forEach(container => {
    const group = container.getAttribute('data-tab-group');
    const tabs = Array.from(container.querySelectorAll(`.tab[data-tab-group="${group}"]`));
    const contents = Array.from(document.querySelectorAll(`[data-tab-content="${group}"]`));
    if (tabs.length && contents.length) {
      // If none active, set first as active
      const hasActive = tabs.some(t => t.classList.contains('active'));
      if (!hasActive) {
        tabs[0].classList.add('active');
        contents[0].classList.add('active');
      }
    }
  });

  // Set up accordion click handlers
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function(e) {
      // Prevent double-triggering if onclick already exists
      if (!e.target.closest('.btn') && !e.target.closest('input')) {
        // onclick handler will be called naturally
      }
    });
  });

  // Set up subtab click handlers
  const subtabs = document.querySelectorAll('.subtab');
  subtabs.forEach(subtab => {
    subtab.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active from all subtabs
      document.querySelectorAll('.subtab').forEach(s => {
        s.classList.remove('active');
      });
      
      // Hide all subtab contents
      document.querySelectorAll('.subtab-content').forEach(content => {
        content.style.display = 'none';
      });
      
      // Add active to clicked
      this.classList.add('active');
      
      // Determine which subtab was clicked and show corresponding content
      const subtabText = this.textContent.trim();
      if (subtabText.includes('المقررات')) {
        document.getElementById('courses-private').style.display = 'block';
      } else if (subtabText.includes('الدرجات')) {
        document.getElementById('grades-private').style.display = 'block';
      } else if (subtabText.includes('الجدول')) {
        document.getElementById('schedule-private').style.display = 'block';
      } else if (subtabText.includes('تسجيل')) {
        document.getElementById('registration-private').style.display = 'block';
      }
    });
  });

  // Initialize first subtab as active
  const firstSubtab = document.querySelector('.subtab');
  if (firstSubtab) {
    firstSubtab.classList.add('active');
    document.getElementById('courses-private').style.display = 'block';
  }

  // Set up form submissions
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const formType = this.closest('.tab-content')?.querySelector('h2')?.textContent || 'النموذج';
      alert(`✓ تم إرسال ${formType} بنجاح`);
    });
  });

  // Add smooth scroll behavior
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Keyboard navigation for accessibility
  document.addEventListener('keydown', function(e) {
    // Close accordion with Escape key
    if (e.key === 'Escape') {
      document.querySelectorAll('.accordion-section.active').forEach(section => {
        section.classList.remove('active');
      });
    }

    // Navigate tabs with arrow keys
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      const currentTab = document.activeElement;
      if (currentTab && currentTab.classList.contains('tab')) {
        const allTabs = Array.from(document.querySelectorAll('.tab'));
        const currentIndex = allTabs.indexOf(currentTab);
        let nextIndex;

        if (e.key === 'ArrowRight') {
          nextIndex = (currentIndex + 1) % allTabs.length;
        } else {
          nextIndex = (currentIndex - 1 + allTabs.length) % allTabs.length;
        }

        allTabs[nextIndex].focus();
        allTabs[nextIndex].click();
      }
    }
  });
  
  // Initialize private universities display
  displayPrivateUniversities(privateUniversitiesData);

  console.log('University page initialized successfully');
});

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(20px);
    }
  }
`;
document.head.appendChild(style);
