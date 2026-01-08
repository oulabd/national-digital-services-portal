// ==========================================
// TRAFFIC VIOLATIONS - INTERACTIVE FUNCTIONS
// ==========================================

// State Management
const trafficState = {
  violations: [
    { id: 'VIO-2024-00156', type: 'تجاوز السرعة', date: '2024-12-15', location: 'شارع الثورة', amount: 500, status: 'unpaid' },
    { id: 'VIO-2024-00155', type: 'تجاوز إشارة حمراء', date: '2024-12-10', location: 'ساحة الميسات', amount: 300, status: 'unpaid' },
    { id: 'VIO-2024-00154', type: 'الوقوف في منطقة ممنوعة', date: '2024-12-05', location: 'شارع بغداد', amount: 200, status: 'paid' },
    { id: 'VIO-2024-00153', type: 'الإضاءة المعطلة', date: '2024-11-28', location: 'المزة جبل ', amount: 250, status: 'paid' },
    { id: 'VIO-2024-00152', type: 'تجاوز السرعة', date: '2024-11-20', location: 'المزرعة', amount: 500, status: 'paid' },
    { id: 'VIO-2024-00151', type: 'عدم ارتداء حزام الأمان', date: '2024-11-15', location: 'شارع فلسطين', amount: 400, status: 'unpaid' },
    { id: 'VIO-2024-00150', type: 'استخدام الهاتف أثناء القيادة', date: '2024-11-10', location: 'الميدان', amount: 450, status: 'paid' },
  ],
  filters: {
    vehicleNumber: '',
    dateFrom: '',
    dateTo: '',
    violationType: '',
    status: ''
  },
  currentTab: 'myViolations'
};

// ==========================================
// TAB SWITCHING FUNCTIONALITY
// ==========================================

function switchTab(tabId) {
  // Hide all tabs
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(tab => tab.classList.remove('active'));
  
  // Remove active class from buttons
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => btn.classList.remove('active'));
  
  // Show selected tab
  const selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }
  
  // Mark button as active
  event.target.classList.add('active');
  
  // Update state
  trafficState.currentTab = tabId;
  
  // Refresh data if needed
  if (tabId === 'violationRecord') {
    refreshViolationTable();
  }
}

// ==========================================
// VIOLATION DETAILS VIEW
// ==========================================

function viewViolationDetails(violationId) {
  const violation = trafficState.violations.find(v => v.id === violationId);
  
  if (violation) {
    // In production, this would navigate to a detailed view or open a modal
    // For now, redirect to violation details page
    window.location.href = `violation-details.html?id=${violationId}`;
  }
}

// ==========================================
// PRINT FUNCTIONALITY
// ==========================================

function printViolation(violationId) {
  // Redirect to print-friendly page
  window.location.href = `violation-details.html?id=${violationId}&print=true`;
  
  // Alternative: Open in print dialog
  // setTimeout(() => {
  //   window.print();
  // }, 500);
}

// ==========================================
// DOCUMENT GENERATION
// ==========================================

function generateDocument(docType, isPrint = false) {
  const documentTypes = {
    'violations-statement': 'بيان المخالفات',
    'notice': 'إخطار رسمي',
    'no-violations-cert': 'شهادة عدم وجود مخالفات',
    'full-record': 'السجل الكامل',
    'amounts-due': 'بيان المبالغ المستحقة',
    'safe-driving-cert': 'شهادة السياقة الآمنة'
  };
  
  const docName = documentTypes[docType] || docType;
  
  if (isPrint) {
    alert(`سيتم فتح ${docName} للطباعة`);
    // In production: window.open(`generate-doc.php?type=${docType}`, '_blank');
  } else {
    alert(`سيتم استخراج ${docName}`);
    // In production: window.open(`generate-doc.php?type=${docType}&download=true`);
  }
}

// ==========================================
// PAYMENT MODAL FUNCTIONALITY
// ==========================================

function openPaymentModal(violationId, amount) {
  const modal = document.getElementById('paymentModal');
  if (modal) {
    modal.style.display = 'flex';
    
    // Populate modal with violation data
    const violationInfo = document.getElementById('violationInfo');
    if (violationInfo) {
      violationInfo.innerHTML = `
        <p><strong>رقم المخالفة:</strong> ${violationId}</p>
        <p><strong>المبلغ المستحق:</strong> ${amount} ر.س</p>
      `;
    }
    
    // Store current violation for payment processing
    trafficState.currentPaymentViolation = { id: violationId, amount };
  }
}

function closePaymentModal() {
  const modal = document.getElementById('paymentModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
  const modal = document.getElementById('paymentModal');
  if (modal && event.target === modal) {
    closePaymentModal();
  }
});

// ==========================================
// PAYMENT PROCESSING
// ==========================================

function simulatePayment() {
  const cardNumber = document.getElementById('cardNumber')?.value;
  const expiryDate = document.getElementById('expiryDate')?.value;
  const cvv = document.getElementById('cvv')?.value;
  
  // Simple validation
  if (!cardNumber || !expiryDate || !cvv) {
    alert('يرجى ملء جميع حقول بيانات الدفع');
    return;
  }
  
  if (cardNumber.length < 16) {
    alert('رقم البطاقة غير صحيح');
    return;
  }
  
  // Simulate payment
  alert('جاري معالجة الدفع...');
  
  // In production: Send to payment gateway
  // const response = await processPayment({
  //   cardNumber,
  //   expiryDate,
  //   cvv,
  //   amount: trafficState.currentPaymentViolation.amount,
  //   violationId: trafficState.currentPaymentViolation.id
  // });
  
  // For demo: Mark violation as paid
  const violation = trafficState.violations.find(v => v.id === trafficState.currentPaymentViolation.id);
  if (violation) {
    violation.status = 'paid';
  }
  
  // Show success message
  setTimeout(() => {
    alert('تم الدفع بنجاح! شكراً لك.');
    closePaymentModal();
    
    // Clear form
    document.getElementById('paymentForm')?.reset();
    
    // Refresh violation table if visible
    refreshViolationTable();
    updateSummaryCards();
  }, 1000);
}

// ==========================================
// FILTERING & TABLE MANAGEMENT
// ==========================================

function applyFilters() {
  // Get filter values
  trafficState.filters.vehicleNumber = document.getElementById('vehicleNumber')?.value || '';
  trafficState.filters.dateFrom = document.getElementById('dateFrom')?.value || '';
  trafficState.filters.dateTo = document.getElementById('dateTo')?.value || '';
  trafficState.filters.violationType = document.getElementById('violationType')?.value || '';
  trafficState.filters.status = document.getElementById('violationStatus')?.value || '';
  
  // Refresh table with filters
  refreshViolationTable();
}

function clearFilters() {
  // Reset filter state
  trafficState.filters = {
    vehicleNumber: '',
    dateFrom: '',
    dateTo: '',
    violationType: '',
    status: ''
  };
  
  // Clear input fields
  document.getElementById('vehicleNumber').value = '';
  document.getElementById('dateFrom').value = '';
  document.getElementById('dateTo').value = '';
  document.getElementById('violationType').value = '';
  document.getElementById('violationStatus').value = '';
  
  // Refresh table
  refreshViolationTable();
}

function refreshViolationTable() {
  const tbody = document.querySelector('.violations-table tbody');
  if (!tbody) return;
  
  // Filter violations
  let filtered = trafficState.violations;
  
  if (trafficState.filters.status) {
    filtered = filtered.filter(v => v.status === trafficState.filters.status);
  }
  
  if (trafficState.filters.violationType) {
    filtered = filtered.filter(v => v.type.includes(trafficState.filters.violationType));
  }
  
  if (trafficState.filters.dateFrom) {
    filtered = filtered.filter(v => new Date(v.date) >= new Date(trafficState.filters.dateFrom));
  }
  
  if (trafficState.filters.dateTo) {
    filtered = filtered.filter(v => new Date(v.date) <= new Date(trafficState.filters.dateTo));
  }
  
  // Map violations to include images flag
  const violationsWithImages = {
    'VIO-2024-00156': true,
    'VIO-2024-00155': true,
    'VIO-2024-00153': true,
    'VIO-2024-00152': true
  };

  // Generate table rows
  tbody.innerHTML = filtered.map(v => `
    <tr class="violation-row ${v.status === 'paid' ? 'paid' : 'unpaid'}">
      <td class="violation-id">${v.id}</td>
      <td>${v.type}</td>
      <td>${formatDate(v.date)}</td>
      <td>${v.location}</td>
      <td>${v.amount} ر.س</td>
      <td>
        <span class="status-badge ${v.status === 'paid' ? 'paid' : 'unpaid'}">
          ${v.status === 'paid' ? 'مدفوعة' : 'غير مدفوعة'}
        </span>
      </td>
      <td class="images-cell">
        ${violationsWithImages[v.id] 
          ? `<button class="action-btn" data-modal-target="violationImagesModal" title="عرض الصور">📷 عرض الصور</button>`
          : `<span style="color: var(--dark-gray);">لا توجد صور</span>`
        }
      </td>
      <td class="actions-cell">
        <button class="action-btn" onclick="viewViolationDetails('${v.id}')" title="عرض">👁️</button>
        <button class="action-btn" onclick="printViolation('${v.id}')" title="طباعة">🖨️</button>
      </td>
    </tr>
  `).join('');
  
  // Re-bind image viewer buttons after table refresh
  setTimeout(() => {
    document.querySelectorAll('.images-cell .action-btn[data-modal-target="violationImagesModal"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        const violationId = row?.querySelector('.violation-id')?.textContent?.trim() || '';
        if (violationId && typeof window.populateViolationImagesModal === 'function') {
          window.populateViolationImagesModal(violationId);
        }
      });
    });
  }, 0);
}

// ==========================================
// EXPORT FUNCTIONALITY
// ==========================================

function exportTableAsCSV() {
  const table = document.querySelector('.violations-table');
  if (!table) return;
  
  let csv = 'رقم المخالفة,نوع المخالفة,التاريخ,المكان,القيمة,الحالة\n';
  
  const rows = table.querySelectorAll('tbody tr');
  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    const rowData = [
      cells[0]?.textContent || '',
      cells[1]?.textContent || '',
      cells[2]?.textContent || '',
      cells[3]?.textContent || '',
      cells[4]?.textContent || '',
      cells[5]?.textContent || ''
    ];
    csv += rowData.map(cell => `"${cell.trim()}"`).join(',') + '\n';
  });
  
  // Download CSV
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'violations-record.csv');
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ==========================================
// SUMMARY CARDS UPDATE
// ==========================================

function updateSummaryCards() {
  const totalViolations = trafficState.violations.length;
  const unpaidViolations = trafficState.violations.filter(v => v.status === 'unpaid').length;
  const paidViolations = trafficState.violations.filter(v => v.status === 'paid').length;
  const totalAmount = trafficState.violations.filter(v => v.status === 'unpaid').reduce((sum, v) => sum + v.amount, 0);
  
  // Update summary cards (if they exist)
  const cards = document.querySelectorAll('.summary-card');
  if (cards.length >= 4) {
    // Assuming order: total, unpaid, paid, amount
    cards[0].querySelector('.card-value').textContent = totalViolations;
    cards[1].querySelector('.card-value').textContent = unpaidViolations;
    cards[2].querySelector('.card-value').textContent = paidViolations;
    cards[3].querySelector('.card-value').textContent = `${totalAmount} ر.س`;
  }
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
  // Set first tab as active
  const firstTabButton = document.querySelector('.tab-btn');
  if (firstTabButton) {
    firstTabButton.classList.add('active');
  }
  
  const firstTab = document.querySelector('.tab-content');
  if (firstTab) {
    firstTab.classList.add('active');
  }
  
  // Initialize summary cards
  updateSummaryCards();
  
  // Initialize violation table
  refreshViolationTable();
  
  console.log('Traffic Violations Module Loaded Successfully');
});

// ==========================================
// EXPORT FOR MODULE COMPATIBILITY
// ==========================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    switchTab,
    viewViolationDetails,
    printViolation,
    generateDocument,
    openPaymentModal,
    closePaymentModal,
    simulatePayment,
    applyFilters,
    clearFilters,
    exportTableAsCSV
  };
}
