/* ============================================
   Arabic RTL National Digital Portal
   Vanilla JavaScript - No Dependencies
   ============================================ */

// Initialize app on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

// Main initialization function
function initializeApp() {
  setupEventListeners();
  initializeTabs();
  initializeModals();
  setActiveNavigation();
  setupMobileSidebar();
  hideSidebarLinksOnSpecificPages();
  
  // Clear any modal-related hashes from URL to prevent auto-opening
  if (window.location.hash === '#settings' || window.location.hash === '#help') {
    window.history.replaceState(null, '', window.location.pathname);
  }
  
  // Ensure all modals are hidden on page load (safeguard)
  const allModals = document.querySelectorAll('.modal');
  allModals.forEach(modal => {
    modal.classList.remove('active');
  });
}

// Hide sidebar links on specific pages
function hideSidebarLinksOnSpecificPages() {
  const currentPage = window.location.pathname.split('/').pop();
  const pagesWithoutSidebarLinks = ['awqaf.html', 'hajj-register.html', 'hajj-tracking.html', 'mosque-lessons.html'];
  
  if (pagesWithoutSidebarLinks.includes(currentPage)) {
    const sidebarNav = document.querySelector('.sidebar-nav');
    if (sidebarNav) {
      // Find and hide the "إضافي" (Additional) section and its links
      const sidebarTitles = sidebarNav.querySelectorAll('.sidebar-title');
      sidebarTitles.forEach(title => {
        if (title.textContent.includes('إضافي')) {
          title.style.display = 'none';
          // Hide the next ul after this title
          const nextUl = title.nextElementSibling;
          if (nextUl && nextUl.tagName === 'UL') {
            nextUl.style.display = 'none';
          }
        }
      });
    }
  }
}

// Setup mobile sidebar toggle
function setupMobileSidebar() {
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('aside');
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  
  // Toggle sidebar on menu button click (header button for mobile)
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });
  }
  
  // Toggle sidebar on square card click (desktop/all screens)
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isMobile = window.innerWidth <= 768;
      sidebar.classList.toggle(isMobile ? 'active' : 'expanded');
    });
  }
  
  // Close sidebar when clicking outside
  document.addEventListener('click', (e) => {
    // Don't close sidebar when interacting with form elements
    if (e.target.tagName === 'SELECT' || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      return;
    }
    if (sidebar && !sidebar.contains(e.target) && sidebar.classList.contains('expanded')) {
      sidebar.classList.remove('expanded');
    }
  });
  
  // Close sidebar when clicking on a link
  const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('active');
      }
      // Optional: close expanded state on navigation
      sidebar.classList.remove('expanded');
    });
  });
}

// ============================================
// 1. EVENT LISTENERS SETUP
// ============================================
function setupEventListeners() {
  // Sidebar navigation - handled by setupMobileSidebar
  // Links navigate normally, active state set on page load
  
  // Form submissions
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', handleFormSubmit);
  });
  
  // Input validation
  const inputs = document.querySelectorAll('input, select');
  inputs.forEach(input => {
    input.addEventListener('blur', validateInput);
    input.addEventListener('focus', clearError);
  });
  
  // Tab switching
  const tabButtons = document.querySelectorAll('.tab');
  tabButtons.forEach(tab => {
    tab.addEventListener('click', handleTabSwitch);
  });
  
  // Modal controls
  const closeButtons = document.querySelectorAll('.modal-close');
  closeButtons.forEach(btn => {
    btn.addEventListener('click', closeNearestModal);
  });
  
  // Click outside modal to close
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.remove('active');
      }
    });
  });
}

// ============================================
// 2. NAVIGATION HANDLING
// ============================================
function handleNavigation(e) {
  // Don't prevent navigation - allow links to work normally
  // The active state will be set by setActiveNavigation() on page load
}

function setActiveNavigation() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.sidebar-nav a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ============================================
// 3. FORM HANDLING
// ============================================
function handleFormSubmit(e) {
  e.preventDefault();
  
  // Validate all inputs
  const inputs = this.querySelectorAll('input, select, textarea');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!validateInput.call(input)) {
      isValid = false;
    }
  });
  
  if (isValid) {
    showSuccessMessage('تم إرسال النموذج بنجاح');
    console.log('Form submitted:', new FormData(this));
    // Reset form
    this.reset();
  }
}

function validateInput() {
  const input = this;
  const value = input.value.trim();
  const type = input.type;
  const name = input.name;
  const formGroup = input.closest('.form-group');
  
  let isValid = true;
  let errorMessage = '';
  
  // Required validation
  if (input.hasAttribute('required') && !value) {
    isValid = false;
    errorMessage = `${input.getAttribute('data-label') || name} مطلوب`;
  }
  
  // Email validation
  if (isValid && type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = 'بريد إلكتروني غير صحيح';
    }
  }
  
  // Phone validation
  if (isValid && type === 'tel' && value) {
    const phoneRegex = /^[0-9\-\+\(\)\s]+$/;
    if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 9) {
      isValid = false;
      errorMessage = 'رقم هاتف غير صحيح';
    }
  }
  
  // Min length
  if (isValid && input.hasAttribute('minlength') && value) {
    const minLength = parseInt(input.getAttribute('minlength'));
    if (value.length < minLength) {
      isValid = false;
      errorMessage = `الحد الأدنى للأحرف: ${minLength}`;
    }
  }
  
  // Update UI
  if (!isValid) {
    formGroup.classList.add('error');
    let errorEl = formGroup.querySelector('.error-message');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'error-message';
      input.parentNode.insertBefore(errorEl, input.nextSibling);
    }
    errorEl.textContent = errorMessage;
  } else {
    formGroup.classList.remove('error');
    const errorEl = formGroup.querySelector('.error-message');
    if (errorEl) errorEl.remove();
  }
  
  return isValid;
}

function clearError() {
  const formGroup = this.closest('.form-group');
  formGroup.classList.remove('error');
  const errorEl = formGroup.querySelector('.error-message');
  if (errorEl) errorEl.remove();
}

// ============================================
// 4. TAB SWITCHING
// ============================================
function initializeTabs() {
  const tabGroups = document.querySelectorAll('[data-tab-group]');
  
  tabGroups.forEach(group => {
    const tabs = group.querySelectorAll('.tab');
    if (tabs.length > 0) {
      tabs[0].classList.add('active');
      const firstContent = document.querySelector(`[data-tab-content="${group.dataset.tabGroup}"][data-tab="0"]`);
      if (firstContent) {
        firstContent.classList.add('active');
      }
    }
  });
}

function handleTabSwitch(e) {
  e.preventDefault();
  
  const tabGroup = this.dataset.tabGroup;
  const tabIndex = Array.from(this.parentElement.children).indexOf(this);
  
  // Remove active from all tabs in group
  const allTabs = document.querySelectorAll(`.tab[data-tab-group="${tabGroup}"]`);
  allTabs.forEach(tab => tab.classList.remove('active'));
  
  // Remove active from all content in group
  const allContents = document.querySelectorAll(`[data-tab-content="${tabGroup}"]`);
  allContents.forEach(content => content.classList.remove('active'));
  
  // Add active to clicked tab and corresponding content
  this.classList.add('active');
  const content = document.querySelector(`[data-tab-content="${tabGroup}"][data-tab="${tabIndex}"]`);
  if (content) {
    content.classList.add('active');
  }
}

// ============================================
// 5. MODAL HANDLING
// ============================================
function initializeModals() {
  ensureUtilityModals();

  // Setup modal trigger buttons
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      openModal(this.dataset.modalTarget);
    });
  });
}

// Create shared Settings/Help modals if missing
function ensureUtilityModals() {
  // Skip modal creation on specific pages
  const currentPage = window.location.pathname.split('/').pop();
  const pagesWithoutModals = ['awqaf.html', 'hajj-register.html', 'hajj-tracking.html', 'mosque-lessons.html'];
  if (pagesWithoutModals.includes(currentPage)) {
    // Remove any existing modals and modal triggers from these pages
    const helpLink = document.querySelector('[data-modal-target="help-modal"]');
    const settingsLink = document.querySelector('[data-modal-target="settings-modal"]');
    if (helpLink) helpLink.parentElement.remove();
    if (settingsLink) settingsLink.parentElement.remove();
    return;
  }
  
  if (!document.getElementById('settings-modal')) {
    const settingsModal = document.createElement('div');
    settingsModal.id = 'settings-modal';
    settingsModal.className = 'modal'; // Explicitly not 'modal active'
    settingsModal.setAttribute('role', 'dialog');
    settingsModal.setAttribute('aria-hidden', 'true');
    settingsModal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">⚙️ الإعدادات</h2>
          <button class="modal-close" aria-label="إغلاق" onclick="closeModal('settings-modal')">✕</button>
        </div>
        <div class="modal-body">
          <div style="margin-bottom: 1rem;">
            <h4 style="margin: 0 0 0.5rem;">إدارة الحساب</h4>
            <button class="btn btn-small" style="margin-left: 0.5rem;">تعديل البيانات الشخصية</button>
            <button class="btn btn-small">تغيير كلمة المرور</button>
          </div>
          <div style="margin-bottom: 1rem;">
            <h4 style="margin: 0 0 0.5rem;">الإشعارات</h4>
            <label style="display: flex; align-items: center; margin-bottom: 0.25rem;"><input type="checkbox" checked style="margin-left: 0.5rem;"> إشعارات البريد الإلكتروني</label>
            <label style="display: flex; align-items: center;"><input type="checkbox" checked style="margin-left: 0.5rem;"> إشعارات الرسائل النصية</label>
          </div>
          <div>
            <h4 style="margin: 0 0 0.5rem;">الخصوصية</h4>
            <label style="display: flex; align-items: center;"><input type="checkbox" checked style="margin-left: 0.5rem;"> مشاركة البيانات مع الخدمات الأخرى</label>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" onclick="closeModal('settings-modal')">حفظ الإعدادات</button>
        </div>
      </div>`;
    document.body.appendChild(settingsModal);
    
    // Attach close listeners to dynamically created modal
    settingsModal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeModal('settings-modal');
      }
    });
    settingsModal.querySelector('.modal-close').addEventListener('click', function() {
      closeModal('settings-modal');
    });
  }

  if (!document.getElementById('help-modal')) {
    const helpModal = document.createElement('div');
    helpModal.id = 'help-modal';
    helpModal.className = 'modal'; // Explicitly not 'modal active'
    helpModal.setAttribute('role', 'dialog');
    helpModal.setAttribute('aria-hidden', 'true');
    helpModal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">❓ المساعدة والدعم</h2>
          <button class="modal-close" aria-label="إغلاق" onclick="closeModal('help-modal')">✕</button>
        </div>
        <div class="modal-body">
          <details style="margin-bottom: 0.75rem;">
            <summary style="cursor: pointer;">كيف أتابع حالة طلبي؟</summary>
            <p style="margin-top: 0.5rem; color: var(--dark-gray);">من خلال هذه الصفحة أو لوحة التحكم الخاصة بالخدمة.</p>
          </details>
          <details style="margin-bottom: 0.75rem;">
            <summary style="cursor: pointer;">ما هي المستندات المطلوبة؟</summary>
            <p style="margin-top: 0.5rem; color: var(--dark-gray);">تجدها في قسم المستندات المطلوبة في الصفحة.</p>
          </details>
          <details>
            <summary style="cursor: pointer;">كيف أتواصل مع الدعم؟</summary>
            <p style="margin-top: 0.5rem; color: var(--dark-gray);">الهاتف: +966-11-XXXX-XXXX — البريد: support@gov.sa</p>
          </details>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" onclick="closeModal('help-modal')">إغلاق</button>
        </div>
      </div>`;
    document.body.appendChild(helpModal);
    
    // Attach close listeners to dynamically created modal
    helpModal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeModal('help-modal');
      }
    });
    helpModal.querySelector('.modal-close').addEventListener('click', function() {
      closeModal('help-modal');
    });
  }
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    // Disable body scroll
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    // Enable body scroll
    document.body.style.overflow = 'auto';
  }
}

function closeNearestModal(e) {
  const modal = this.closest('.modal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
  }
}

// ============================================
// 6. UTILITY FUNCTIONS
// ============================================

// Show success message
function showSuccessMessage(message) {
  const alert = document.createElement('div');
  alert.className = 'alert alert-success';
  alert.innerHTML = `<span>${message}</span>`;
  
  const container = document.querySelector('main') || document.body;
  container.insertBefore(alert, container.firstChild);
  
  setTimeout(() => {
    alert.remove();
  }, 4000);
}

// Show error message
function showErrorMessage(message) {
  const alert = document.createElement('div');
  alert.className = 'alert alert-danger';
  alert.innerHTML = `<span>${message}</span>`;
  
  const container = document.querySelector('main') || document.body;
  container.insertBefore(alert, container.firstChild);
  
  setTimeout(() => {
    alert.remove();
  }, 4000);
}

// Format currency (Syrian Pound)
function formatCurrency(amount) {
  return new Intl.NumberFormat('ar-SY', {
    style: 'currency',
    currency: 'SYP',
    minimumFractionDigits: 0
  }).format(amount);
}

// Format date (Arabic)
function formatDate(date) {
  return new Intl.DateTimeFormat('ar-SY', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
}

// Get national ID from localStorage
function getLoggedInUser() {
  return localStorage.getItem('loggedInUser');
}

// Set logged in user
function setLoggedInUser(nationalId) {
  localStorage.setItem('loggedInUser', nationalId);
}

// Logout user
function logoutUser() {
  localStorage.removeItem('loggedInUser');
  window.location.href = 'index.html';
}

// Generate mock data for tables
function generateMockData(count = 5) {
  const data = [];
  for (let i = 1; i <= count; i++) {
    data.push({
      id: i,
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      status: ['معلق', 'موافق عليه', 'مرفوض'][Math.floor(Math.random() * 3)],
      amount: Math.floor(Math.random() * 10000) + 1000
    });
  }
  return data;
}

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Toggle sidebar (responsive: mobile uses 'active', desktop uses 'expanded')
function toggleSidebar() {
  const sidebar = document.querySelector('aside');
  if (!sidebar) return;
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    sidebar.classList.toggle('active');
  } else {
    sidebar.classList.toggle('expanded');
  }
}

// ============================================
// 7. SPECIFIC PAGE FUNCTIONS
// ============================================

// Login form handler
function handleLogin(e) {
  e.preventDefault();
  
  const nationalId = document.querySelector('input[name="nationalId"]');
  const password = document.querySelector('input[name="password"]');
  
  if (nationalId && password && nationalId.value && password.value) {
    // Mock authentication
    setLoggedInUser(nationalId.value);
    showSuccessMessage('تم تسجيل الدخول بنجاح');
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1500);
  }
}

// Healthcare appointment handler
function bookAppointment(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  
  // Mock booking
  showSuccessMessage('تم حجز موعدك بنجاح. رقم الحجز: ' + Math.floor(Math.random() * 100000));
  form.reset();
}

// Traffic violation search handler
function searchViolations(e) {
  e.preventDefault();
  
  const carNumber = document.querySelector('input[name="carNumber"]');
  const resultTable = document.querySelector('table tbody');
  
  if (resultTable) {
    resultTable.innerHTML = `
      <tr>
        <td>تجاوز السرعة</td>
        <td>2024-01-15</td>
        <td>5,000 ل.س</td>
        <td><span class="status-badge status-pending">معلق</span></td>
      </tr>
      <tr>
        <td>مخالفة وقوف</td>
        <td>2023-12-20</td>
        <td>2,000 ل.س</td>
        <td><span class="status-badge status-completed">مدفوع</span></td>
      </tr>
    `;
    showSuccessMessage('تم البحث بنجاح');
  }
}

// University courses handler
function loadUniversityCourses(e) {
  const selectedUniversity = e.target.value;
  
  const coursesTable = document.querySelector('[data-table="courses"] tbody');
  if (coursesTable) {
    coursesTable.innerHTML = `
      <tr>
        <td>برمجة الويب</td>
        <td>د. أحمد محمد</td>
        <td>الفصل الأول</td>
        <td><span class="badge badge-info">3 ساعات</span></td>
      </tr>
      <tr>
        <td>هياكل البيانات</td>
        <td>أ.د فاطمة علي</td>
        <td>الفصل الأول</td>
        <td><span class="badge badge-info">3 ساعات</span></td>
      </tr>
    `;
  }
}

// ============================================
// 8. ACCESSIBILITY & UTILITIES
// ============================================

// Keyboard navigation
document.addEventListener('keydown', function(e) {
  // Close modal with Escape
  if (e.key === 'Escape') {
    const activeModal = document.querySelector('.modal.active');
    if (activeModal) {
      activeModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }
});

// Print utility
function printPage() {
  window.print();
}

// Export to CSV (basic)
function exportToCSV(tableId, filename) {
  const table = document.getElementById(tableId);
  if (!table) return;
  
  let csv = [];
  const rows = table.querySelectorAll('tr');
  
  rows.forEach(row => {
    const cols = row.querySelectorAll('td, th');
    const rowData = [];
    cols.forEach(col => {
      rowData.push('"' + col.innerText.replace(/"/g, '""') + '"');
    });
    csv.push(rowData.join(','));
  });
  
  downloadCSV(csv.join('\n'), filename);
}

function downloadCSV(csv, filename) {
  const link = document.createElement('a');
  link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(csv));
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
