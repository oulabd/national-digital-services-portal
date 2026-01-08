/* ============================================
   SUPER ADMIN DASHBOARD JAVASCRIPT
   ============================================ */

// Switch between admin sections
function switchAdminTab(sectionId) {
  // Hide all sections
  document.querySelectorAll('.admin-section').forEach(section => {
    section.classList.remove('active');
  });
  
  // Show selected section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('active');
  }
  
  // Update sidebar active state
  document.querySelectorAll('.sidebar-nav a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${sectionId}` || 
        (sectionId === 'overview' && link.getAttribute('href') === 'super-admin.html')) {
      link.classList.add('active');
    }
  });
  
  // Smooth scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// MINISTRY MANAGEMENT
// ==========================================

function openAddMinistryModal() {
  const modal = document.getElementById('addMinistryModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

function submitAddMinistry() {
  if (confirm('هل تريد إضافة هذه الوزارة؟')) {
    alert('✓ تم إضافة الوزارة بنجاح');
    closeModal('addMinistryModal');
    // In production: send data to server
  }
}

function viewMinistry(ministryId) {
  if (ministryId === 'health') {
    window.location.href = 'health-admin.html';
  } else {
    alert(`عرض تفاصيل الوزارة: ${ministryId}`);
    // In production: navigate to ministry details page
  }
}

function editMinistry(ministryId) {
  if (confirm('هل تريد تعديل بيانات هذه الوزارة؟')) {
    alert(`فتح نموذج تعديل الوزارة: ${ministryId}`);
    // In production: open edit modal with ministry data
  }
}

function toggleMinistry(ministryId) {
  if (confirm('هل أنت متأكد من تغيير حالة هذه الوزارة؟')) {
    alert(`تم تغيير حالة الوزارة: ${ministryId}`);
    // In production: toggle ministry active status
  }
}

// ==========================================
// USER MANAGEMENT
// ==========================================

function filterUsers(searchTerm) {
  const tbody = document.getElementById('usersTableBody');
  const rows = tbody.querySelectorAll('tr');
  
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    if (text.includes(searchTerm.toLowerCase())) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

function filterUsersByRole(role) {
  const tbody = document.getElementById('usersTableBody');
  const rows = tbody.querySelectorAll('tr');
  
  rows.forEach(row => {
    const roleBadge = row.querySelector('.role-badge');
    if (!role || !roleBadge) {
      row.style.display = '';
      return;
    }
    
    if (roleBadge.classList.contains(role)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

function viewUser(userId) {
  alert(`عرض تفاصيل المستخدم: ${userId}`);
  // In production: open user details modal or navigate to user page
}

function editUserRole(userId) {
  const newRole = prompt('اختر الدور الجديد:\n1 = مواطن\n2 = موظف وزارة\n3 = Admin وزارة\n4 = Super Admin', '1');
  
  if (newRole) {
    const roles = {
      '1': 'مواطن',
      '2': 'موظف وزارة',
      '3': 'Admin وزارة',
      '4': 'Super Admin'
    };
    
    if (roles[newRole]) {
      if (confirm(`هل تريد تغيير دور المستخدم إلى: ${roles[newRole]}؟`)) {
        alert(`✓ تم تغيير الدور بنجاح`);
        // In production: send role update to server
      }
    }
  }
}

function toggleUser(userId) {
  if (confirm('هل تريد تغيير حالة هذا المستخدم (تفعيل/تعطيل)؟')) {
    alert(`تم تغيير حالة المستخدم: ${userId}`);
    // In production: toggle user active status
  }
}

// ==========================================
// REQUESTS MANAGEMENT
// ==========================================

function filterRequests(status) {
  // Update active tab
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  event.target.classList.add('active');
  
  // Filter table rows
  const rows = document.querySelectorAll('#requests tbody tr');
  rows.forEach(row => {
    const badge = row.querySelector('.badge');
    if (!badge) return;
    
    if (status === 'all') {
      row.style.display = '';
    } else if (status === 'pending' && badge.classList.contains('badge-warning')) {
      row.style.display = '';
    } else if (status === 'approved' && badge.classList.contains('badge-success')) {
      row.style.display = '';
    } else if (status === 'rejected' && badge.classList.contains('badge-danger')) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

function approveRequest(requestId) {
  if (confirm('هل تريد الموافقة على هذا الطلب؟\n\n⚠️ هذا الإجراء لا يمكن التراجع عنه.')) {
    alert(`✓ تمت الموافقة على الطلب: ${requestId}`);
    // In production: send approval to server and update UI
  }
}

function rejectRequest(requestId) {
  const reason = prompt('يرجى إدخال سبب الرفض:');
  
  if (reason) {
    if (confirm(`هل تريد رفض هذا الطلب؟\n\nالسبب: ${reason}\n\n⚠️ هذا الإجراء لا يمكن التراجع عنه.`)) {
      alert(`✗ تم رفض الطلب: ${requestId}`);
      // In production: send rejection to server with reason
    }
  }
}

// ==========================================
// SYSTEM UTILITIES
// ==========================================

function generateSystemReport() {
  if (confirm('هل تريد إنشاء تقرير شامل للنظام؟\n\nسيتم تحميل ملف PDF يحتوي على:\n• إحصائيات النظام\n• نشاط المستخدمين\n• حالة الوزارات\n• الطلبات المعلقة')) {
    alert('🔄 جاري إنشاء التقرير...\n\nفي النظام الفعلي، سيتم تحميل ملف PDF.');
    // In production: generate and download PDF report
  }
}

function logoutAdmin() {
  if (confirm('هل تريد تسجيل الخروج من لوحة التحكم؟')) {
    alert('تم تسجيل الخروج بنجاح');
    window.location.href = 'index.html';
  }
}

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
  
  // Show overview section by default
  const overviewSection = document.getElementById('overview');
  if (overviewSection) {
    overviewSection.classList.add('active');
  }
  
  // Setup modal close on outside click
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  });
  
  // Setup modal close buttons
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', function() {
      const modal = this.closest('.modal');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  });
  
  // Setup form submissions
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('✓ تم حفظ البيانات بنجاح');
    });
  });
  
  // Setup keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Escape key closes modals
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.active').forEach(modal => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    }
  });
  
  // Log initialization
  console.log('✅ Super Admin Dashboard initialized successfully');
  console.log('🔐 Access Level: Super Administrator');
  
});

// Export functions for HTML inline usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    switchAdminTab,
    openAddMinistryModal,
    closeModal,
    submitAddMinistry,
    viewMinistry,
    editMinistry,
    toggleMinistry,
    filterUsers,
    filterUsersByRole,
    viewUser,
    editUserRole,
    toggleUser,
    filterRequests,
    approveRequest,
    rejectRequest,
    generateSystemReport,
    logoutAdmin
  };
}
