// ============================================
// HEALTHCARE PORTAL JAVASCRIPT
// Tab Management and Navigation Functions
// ============================================

// Toggle Sidebar
function toggleSidebar() {
  const sidebar = document.querySelector('aside');
  if (sidebar) {
    sidebar.classList.toggle('expanded');
  }
}

// Tab Switching Function
function switchHealthTab(tabName) {
  // Hide all tab contents
  const allTabs = document.querySelectorAll('.tab-content');
  allTabs.forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Remove active class from all tab buttons
  const allButtons = document.querySelectorAll('.tab-btn');
  allButtons.forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Show selected tab
  const selectedTab = document.getElementById(tabName);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }
  
  // Add active class to clicked button
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => {
    if (btn.getAttribute('onclick').includes(tabName)) {
      btn.classList.add('active');
    }
  });
  
  // Scroll to top of page
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// View Lab Result Detail
function viewLabResult(labId) {
  // In a real application, this would pass the lab ID as a URL parameter
  window.location.href = `lab-result.html?id=${labId}`;
}

// Print Lab Result
function printLabResult(labId) {
  // Open the lab result in a new window and trigger print
  const printWindow = window.open(`lab-result.html?id=${labId}`, '_blank');
  printWindow.onload = function() {
    printWindow.print();
  };
}

// View Radiology Image
function viewRadiologyImage(radId) {
  window.location.href = `radiology-view.html?id=${radId}`;
}

// View Prescription Detail
function viewPrescriptionDetail(presId) {
  window.location.href = `prescription-view.html?id=${presId}`;
}

// Print Prescription
function printPrescription(presId) {
  const printWindow = window.open(`prescription-view.html?id=${presId}`, '_blank');
  printWindow.onload = function() {
    printWindow.print();
  };
}

// Logout Function
function logoutUser() {
  if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
    window.location.href = 'index.html';
  }
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Sidebar toggle functionality
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const aside = document.querySelector('aside');
  
  if (sidebarToggle && aside) {
    sidebarToggle.addEventListener('click', function() {
      aside.classList.toggle('expanded');
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
      const isClickInside = aside.contains(event.target);
      if (!isClickInside && aside.classList.contains('expanded') && window.innerWidth < 768) {
        aside.classList.remove('expanded');
      }
    });
  }
  
  // Add smooth scroll behavior
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Form validation for filters
  const filterForms = document.querySelectorAll('.filters-section form');
  filterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      // Handle filter submission
      alert('تم تطبيق الفلترة');
    });
  });
  
  // Add hover effects to table rows
  const tableRows = document.querySelectorAll('.health-table tbody tr');
  tableRows.forEach(row => {
    row.style.cursor = 'pointer';
    row.addEventListener('click', function(e) {
      // Don't trigger if clicking on action buttons
      if (!e.target.classList.contains('btn-icon')) {
        const firstButton = this.querySelector('.btn-icon');
        if (firstButton) {
          firstButton.click();
        }
      }
    });
  });
  
  // Add animation to cards on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe all cards and sections
  const animatedElements = document.querySelectorAll('.summary-card, .activity-item, .radiology-card, .prescription-card');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
});

// Mobile responsiveness helper
function handleResize() {
  const aside = document.querySelector('aside');
  if (window.innerWidth > 768) {
    // Desktop: ensure sidebar can expand
    aside.style.display = 'block';
  } else {
    // Mobile: collapse sidebar by default
    if (aside.classList.contains('expanded')) {
      aside.classList.remove('expanded');
    }
  }
}

window.addEventListener('resize', handleResize);
window.addEventListener('load', handleResize);

/* =====================
   APPOINTMENTS FUNCTIONS
   ===================== */

// Filter appointments by city, specialty, and hospital
function filterAppointments() {
  const city = document.getElementById('citySelect').value.toLowerCase();
  const specialty = document.getElementById('specialtySelect').value.toLowerCase();
  const hospital = document.getElementById('hospitalSelect').value.toLowerCase();
  
  const doctorCards = document.querySelectorAll('.doctor-card');
  const noResults = document.getElementById('noResults');
  let visibleCount = 0;
  
  doctorCards.forEach(card => {
    const cardCity = card.getAttribute('data-city').toLowerCase();
    const cardSpecialty = card.getAttribute('data-specialty').toLowerCase();
    const cardHospital = card.getAttribute('data-hospital').toLowerCase();
    
    const cityMatch = !city || cardCity === city;
    const specialtyMatch = !specialty || cardSpecialty === specialty;
    const hospitalMatch = !hospital || cardHospital === hospital;
    
    if (cityMatch && specialtyMatch && hospitalMatch) {
      card.style.display = 'block';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });
  
  // Show or hide no results message
  if (visibleCount === 0) {
    noResults.style.display = 'block';
    document.querySelector('.available-appointments-grid').style.display = 'none';
  } else {
    noResults.style.display = 'none';
    document.querySelector('.available-appointments-grid').style.display = 'grid';
  }
}

// Search appointments based on filters
function searchAppointments() {
  filterAppointments();
  
  // Scroll to results
  const resultsSection = document.querySelector('.available-appointments-grid');
  if (resultsSection) {
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Reset appointment search filters
function resetAppointmentSearch() {
  document.getElementById('citySelect').value = '';
  document.getElementById('specialtySelect').value = '';
  document.getElementById('hospitalSelect').value = '';
  document.getElementById('preferredDate').value = '';
  
  // Show all doctor cards
  const doctorCards = document.querySelectorAll('.doctor-card');
  doctorCards.forEach(card => {
    card.style.display = 'block';
  });
  
  document.getElementById('noResults').style.display = 'none';
  document.querySelector('.available-appointments-grid').style.display = 'grid';
}

// Book an appointment with a doctor
function bookAppointment(doctorId) {
  // In a real application, this would open a modal with available time slots
  const confirmed = confirm('هل تريد حجز موعد مع هذا الطبيب؟\n\nسيتم توجيهك إلى صفحة اختيار الموعد والوقت المناسب.');
  
  if (confirmed) {
    // In real implementation, navigate to booking page with doctor ID
    alert('تم تسجيل طلبك بنجاح!\n\nسيتم التواصل معك قريباً لتأكيد الموعد.');
    // window.location.href = `booking.html?doctor=${doctorId}`;
  }
}

// View appointment details
function viewAppointmentDetails(appointmentId) {
  // In real implementation, navigate to appointment detail page
  alert(`عرض تفاصيل الموعد: ${appointmentId}`);
  // window.location.href = `appointment-details.html?id=${appointmentId}`;
}

// Cancel an appointment
function cancelAppointment(appointmentId) {
  const confirmed = confirm('هل أنت متأكد من إلغاء هذا الموعد؟\n\nيمكنك حجز موعد جديد في أي وقت.');
  
  if (confirmed) {
    alert('تم إلغاء الموعد بنجاح.\n\nيمكنك حجز موعد جديد من خلال قسم المواعيد المتاحة.');
    // In real implementation, call API to cancel appointment
    // Then remove the appointment card or reload the page
  }
}

/* =====================
   END APPOINTMENTS
   ===================== */

// Export functions for use in HTML
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    switchHealthTab,
    viewLabResult,
    printLabResult,
    viewRadiologyImage,
    viewPrescriptionDetail,
    printPrescription,
    logoutUser,
    filterAppointments,
    searchAppointments,
    resetAppointmentSearch,
    bookAppointment,
    viewAppointmentDetails,
    cancelAppointment
  };
}
