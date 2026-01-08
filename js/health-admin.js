/* ============================================
   HEALTH MINISTRY ADMIN INTERACTIONS
   ============================================ */

// Demo Data for Health Admin
const healthAdminData = {
  facilities: [
    { id: 1, name: 'مستشفى الجمهورية', type: 'hospital', city: 'دمشق', beds: 150, staff: 85, status: 'active' },
    { id: 2, name: 'مركز صحي الشام', type: 'center', city: 'دمشق', beds: 0, staff: 15, status: 'active' },
    { id: 3, name: 'مستشفى الهلال الأحمر', type: 'hospital', city: 'حلب', beds: 120, staff: 65, status: 'active' },
    { id: 4, name: 'مركز صحي النيل', type: 'center', city: 'حمص', beds: 0, staff: 12, status: 'active' },
    { id: 5, name: 'مستشفى الاستقلال', type: 'hospital', city: 'اللاذقية', beds: 100, staff: 55, status: 'inactive' },
  ],
  departments: [
    { id: 1, name: 'الطوارئ', facility: 'مستشفى الجمهورية', staff: 20, status: 'active' },
    { id: 2, name: 'الجراحة', facility: 'مستشفى الجمهورية', staff: 18, status: 'active' },
    { id: 3, name: 'الداخلية', facility: 'مستشفى الجمهورية', staff: 15, status: 'active' },
    { id: 4, name: 'أمراض النساء والولادة', facility: 'مستشفى الهلال الأحمر', staff: 12, status: 'active' },
    { id: 5, name: 'الأطفال', facility: 'مستشفى الهلال الأحمر', staff: 16, status: 'active' },
  ],
  staff: [
    { id: 1, name: 'د. أحمد محمود', specialization: 'جراح عام', facility: 'مستشفى الجمهورية', license: '12345', status: 'active' },
    { id: 2, name: 'د. فاطمة علي', specialization: 'طبيبة أسرة', facility: 'مركز صحي الشام', license: '12346', status: 'active' },
    { id: 3, name: 'د. محمد حسن', specialization: 'قلب', facility: 'مستشفى الجمهورية', license: '12347', status: 'active' },
    { id: 4, name: 'أ. سارة إبراهيم', specialization: 'ممرضة', facility: 'مستشفى الهلال الأحمر', license: '67890', status: 'active' },
    { id: 5, name: 'د. علي محمد', specialization: 'أشعات', facility: 'مستشفى الاستقلال', license: '12348', status: 'inactive' },
  ],
  appointments: [
    { id: 1, doctor: 'د. أحمد محمود', patient: 'محمود علي', date: '2024-02-15', time: '09:00', status: 'confirmed' },
    { id: 2, doctor: 'د. فاطمة علي', patient: 'سارة حسن', date: '2024-02-15', time: '10:00', status: 'confirmed' },
    { id: 3, doctor: 'د. محمد حسن', patient: 'علي محمود', date: '2024-02-15', time: '14:00', status: 'pending' },
    { id: 4, doctor: 'د. أحمد محمود', patient: 'فاطمة أحمد', date: '2024-02-16', time: '09:30', status: 'confirmed' },
    { id: 5, doctor: 'د. فاطمة علي', patient: 'حسن محمد', date: '2024-02-16', time: '11:00', status: 'cancelled' },
  ],
  records: [
    { id: 1, patient: 'محمود علي', type: 'تقرير طبي', date: '2024-02-10', facility: 'مستشفى الجمهورية', status: 'archived' },
    { id: 2, patient: 'سارة حسن', type: 'نتائج تحاليل', date: '2024-02-09', facility: 'مركز صحي الشام', status: 'archived' },
    { id: 3, patient: 'علي محمود', type: 'تقرير أشعات', date: '2024-02-08', facility: 'مستشفى الاستقلال', status: 'archived' },
    { id: 4, patient: 'فاطمة أحمد', type: 'سجل تطعيمات', date: '2024-02-07', facility: 'مركز صحي النيل', status: 'archived' },
    { id: 5, patient: 'حسن محمد', type: 'استشارة', date: '2024-02-06', facility: 'مستشفى الجمهورية', status: 'archived' },
  ]
};

// Initialize Health Admin Page
document.addEventListener('DOMContentLoaded', function() {
  initHealthAdmin();
});

function initHealthAdmin() {
  // Set up section switching
  const sectionButtons = document.querySelectorAll('[data-health-section]');
  sectionButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      switchHealthSection(this.getAttribute('data-health-section'));
    });
  });

  // Set up modal interactions
  setupModalHandlers();

  // Set up form handlers
  setupFormHandlers();

  // Load initial data
  loadFacilities();
  loadDepartments();
  loadMedicalStaff();
  loadAppointments();
  loadMedicalRecords();

  // Update dashboard metrics
  updateDashboardMetrics();
}

/* ============================================
   SECTION SWITCHING
   ============================================ */

function switchHealthSection(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll('.health-section');
  sections.forEach(section => section.classList.remove('active'));

  // Remove active state from sidebar buttons
  const buttons = document.querySelectorAll('[data-health-section]');
  buttons.forEach(btn => btn.classList.remove('active'));

  // Show selected section
  const selectedSection = document.getElementById(sectionId);
  if (selectedSection) {
    selectedSection.classList.add('active');
  }

  // Mark button as active
  const activeButton = document.querySelector(`[data-health-section="${sectionId}"]`);
  if (activeButton) {
    activeButton.classList.add('active');
  }

  // Scroll to top
  window.scrollTo(0, 0);
}

/* ============================================
   DASHBOARD METRICS
   ============================================ */

function updateDashboardMetrics() {
  // Calculate statistics
  const totalFacilities = healthAdminData.facilities.length;
  const activeFacilities = healthAdminData.facilities.filter(f => f.status === 'active').length;
  const totalStaff = healthAdminData.staff.length;
  const totalAppointments = healthAdminData.appointments.length;
  const totalRecords = healthAdminData.records.length;

  // Update dashboard cards (if they exist)
  const metrics = {
    'hospitals-count': totalFacilities,
    'staff-count': totalStaff,
    'appointments-count': totalAppointments,
    'records-count': totalRecords
  };

  Object.keys(metrics).forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = metrics[id];
    }
  });
}

/* ============================================
   FACILITIES MANAGEMENT
   ============================================ */

function loadFacilities() {
  const tbody = document.getElementById('facilities-table-body');
  if (!tbody) return;

  tbody.innerHTML = '';

  healthAdminData.facilities.forEach(facility => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${facility.name}</td>
      <td><span class="type-badge ${facility.type === 'hospital' ? 'hospital' : 'center'}">${facility.type === 'hospital' ? 'مستشفى' : 'مركز صحي'}</span></td>
      <td>${facility.city}</td>
      <td>${facility.beds}</td>
      <td>${facility.staff}</td>
      <td>
        <span class="status-badge ${facility.status === 'active' ? 'active' : 'inactive'}">
          ${facility.status === 'active' ? 'نشط' : 'معطل'}
        </span>
      </td>
      <td>
        <div class="actions-cell">
          <button class="action-btn edit" onclick="openEditFacilityModal(${facility.id})" title="تعديل">✏️</button>
          <button class="action-btn delete" onclick="deleteFacility(${facility.id})" title="حذف">🗑️</button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function openAddFacilityModal() {
  const modal = document.getElementById('facility-modal');
  if (modal) {
    const form = modal.querySelector('form');
    if (form) {
      form.reset();
      form.dataset.facilityId = '';
    }
    modal.classList.add('active');
  }
}

function openEditFacilityModal(facilityId) {
  const facility = healthAdminData.facilities.find(f => f.id === facilityId);
  if (!facility) return;

  const modal = document.getElementById('facility-modal');
  if (modal) {
    const form = modal.querySelector('form');
    if (form) {
      form.dataset.facilityId = facilityId;
      form.querySelector('input[name="name"]').value = facility.name;
      form.querySelector('select[name="type"]').value = facility.type;
      form.querySelector('input[name="city"]').value = facility.city;
      form.querySelector('input[name="beds"]').value = facility.beds;
      form.querySelector('input[name="staff"]').value = facility.staff;
      form.querySelector('select[name="status"]').value = facility.status;
    }
    modal.classList.add('active');
  }
}

function deleteFacility(facilityId) {
  if (confirm('هل أنت متأكد من حذف هذه المنشأة الصحية؟')) {
    healthAdminData.facilities = healthAdminData.facilities.filter(f => f.id !== facilityId);
    loadFacilities();
    showSuccessMessage('تم حذف المنشأة الصحية بنجاح');
  }
}

/* ============================================
   DEPARTMENTS MANAGEMENT
   ============================================ */

function loadDepartments() {
  const tbody = document.getElementById('departments-table-body');
  if (!tbody) return;

  tbody.innerHTML = '';

  healthAdminData.departments.forEach(dept => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${dept.name}</td>
      <td>${dept.facility}</td>
      <td>${dept.staff}</td>
      <td>
        <span class="status-badge ${dept.status === 'active' ? 'active' : 'inactive'}">
          ${dept.status === 'active' ? 'نشط' : 'معطل'}
        </span>
      </td>
      <td>
        <div class="actions-cell">
          <button class="action-btn edit" onclick="openEditDepartmentModal(${dept.id})" title="تعديل">✏️</button>
          <button class="action-btn delete" onclick="deleteDepartment(${dept.id})" title="حذف">🗑️</button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function openAddDepartmentModal() {
  const modal = document.getElementById('department-modal');
  if (modal) {
    const form = modal.querySelector('form');
    if (form) {
      form.reset();
      form.dataset.departmentId = '';
    }
    modal.classList.add('active');
  }
}

function openEditDepartmentModal(deptId) {
  const dept = healthAdminData.departments.find(d => d.id === deptId);
  if (!dept) return;

  const modal = document.getElementById('department-modal');
  if (modal) {
    const form = modal.querySelector('form');
    if (form) {
      form.dataset.departmentId = deptId;
      form.querySelector('input[name="name"]').value = dept.name;
      form.querySelector('select[name="facility"]').value = dept.facility;
      form.querySelector('input[name="staff"]').value = dept.staff;
      form.querySelector('select[name="status"]').value = dept.status;
    }
    modal.classList.add('active');
  }
}

function deleteDepartment(deptId) {
  if (confirm('هل أنت متأكد من حذف هذا القسم؟')) {
    healthAdminData.departments = healthAdminData.departments.filter(d => d.id !== deptId);
    loadDepartments();
    showSuccessMessage('تم حذف القسم بنجاح');
  }
}

/* ============================================
   MEDICAL STAFF MANAGEMENT
   ============================================ */

function loadMedicalStaff() {
  const tbody = document.getElementById('staff-table-body');
  if (!tbody) return;

  tbody.innerHTML = '';

  healthAdminData.staff.forEach(person => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${person.name}</td>
      <td>${person.specialization}</td>
      <td>${person.facility}</td>
      <td>${person.license}</td>
      <td>
        <span class="status-badge ${person.status === 'active' ? 'active' : 'inactive'}">
          ${person.status === 'active' ? 'نشط' : 'معطل'}
        </span>
      </td>
      <td>
        <div class="actions-cell">
          <button class="action-btn edit" onclick="openEditStaffModal(${person.id})" title="تعديل">✏️</button>
          <button class="action-btn delete" onclick="deleteStaff(${person.id})" title="حذف">🗑️</button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function openAddStaffModal() {
  const modal = document.getElementById('staff-modal');
  if (modal) {
    const form = modal.querySelector('form');
    if (form) {
      form.reset();
      form.dataset.staffId = '';
    }
    modal.classList.add('active');
  }
}

function openEditStaffModal(staffId) {
  const staff = healthAdminData.staff.find(s => s.id === staffId);
  if (!staff) return;

  const modal = document.getElementById('staff-modal');
  if (modal) {
    const form = modal.querySelector('form');
    if (form) {
      form.dataset.staffId = staffId;
      form.querySelector('input[name="name"]').value = staff.name;
      form.querySelector('input[name="specialization"]').value = staff.specialization;
      form.querySelector('select[name="facility"]').value = staff.facility;
      form.querySelector('input[name="license"]').value = staff.license;
      form.querySelector('select[name="status"]').value = staff.status;
    }
    modal.classList.add('active');
  }
}

function deleteStaff(staffId) {
  if (confirm('هل أنت متأكد من حذف هذا الموظف؟')) {
    healthAdminData.staff = healthAdminData.staff.filter(s => s.id !== staffId);
    loadMedicalStaff();
    showSuccessMessage('تم حذف الموظف بنجاح');
  }
}

/* ============================================
   APPOINTMENTS MANAGEMENT
   ============================================ */

function loadAppointments() {
  const tbody = document.getElementById('appointments-table-body');
  if (!tbody) return;

  tbody.innerHTML = '';

  healthAdminData.appointments.forEach(appointment => {
    const row = document.createElement('tr');
    const statusDisplay = {
      'confirmed': 'مؤكد',
      'pending': 'قيد الانتظار',
      'cancelled': 'ملغاة'
    };
    const statusClass = appointment.status;

    row.innerHTML = `
      <td>${appointment.patient}</td>
      <td>${appointment.doctor}</td>
      <td>${appointment.date}</td>
      <td>${appointment.time}</td>
      <td>
        <span class="status-badge ${statusClass}">
          ${statusDisplay[statusClass] || appointment.status}
        </span>
      </td>
      <td>
        <div class="actions-cell">
          ${appointment.status === 'pending' ? `<button class="action-btn confirm" onclick="confirmAppointment(${appointment.id})" title="تأكيد">✓</button>` : ''}
          <button class="action-btn delete" onclick="cancelAppointment(${appointment.id})" title="إلغاء">✕</button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function confirmAppointment(appointmentId) {
  const appointment = healthAdminData.appointments.find(a => a.id === appointmentId);
  if (appointment) {
    appointment.status = 'confirmed';
    loadAppointments();
    showSuccessMessage('تم تأكيد الموعد');
  }
}

function cancelAppointment(appointmentId) {
  if (confirm('هل تريد إلغاء هذا الموعد؟')) {
    const appointment = healthAdminData.appointments.find(a => a.id === appointmentId);
    if (appointment) {
      appointment.status = 'cancelled';
      loadAppointments();
      showSuccessMessage('تم إلغاء الموعد');
    }
  }
}

/* ============================================
   MEDICAL RECORDS (READ-ONLY)
   ============================================ */

function loadMedicalRecords() {
  const tbody = document.getElementById('records-table-body');
  if (!tbody) return;

  tbody.innerHTML = '';

  healthAdminData.records.forEach(record => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${record.patient}</td>
      <td>${record.type}</td>
      <td>${record.date}</td>
      <td>${record.facility}</td>
      <td>
        <span class="status-badge archived">محفوظ</span>
      </td>
      <td>
        <div class="actions-cell">
          <button class="action-btn view" onclick="viewMedicalRecord(${record.id})" title="عرض">👁️</button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function viewMedicalRecord(recordId) {
  const record = healthAdminData.records.find(r => r.id === recordId);
  if (record) {
    alert(`سجل طبي: ${record.patient}\nالنوع: ${record.type}\nالتاريخ: ${record.date}\nالمنشأة: ${record.facility}`);
  }
}

/* ============================================
   MODAL HANDLERS
   ============================================ */

function setupModalHandlers() {
  // Close buttons
  const closeButtons = document.querySelectorAll('.modal-close');
  closeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const modal = this.closest('.modal');
      if (modal) {
        modal.classList.remove('active');
      }
    });
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

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
  }
}

/* ============================================
   FORM HANDLERS
   ============================================ */

function setupFormHandlers() {
  // Facility form
  const facilityForm = document.querySelector('#facility-modal form');
  if (facilityForm) {
    facilityForm.addEventListener('submit', handleFacilitySave);
  }

  // Department form
  const deptForm = document.querySelector('#department-modal form');
  if (deptForm) {
    deptForm.addEventListener('submit', handleDepartmentSave);
  }

  // Staff form
  const staffForm = document.querySelector('#staff-modal form');
  if (staffForm) {
    staffForm.addEventListener('submit', handleStaffSave);
  }
}

function handleFacilitySave(e) {
  e.preventDefault();
  const form = e.target;
  const facilityId = parseInt(form.dataset.facilityId) || null;

  const data = {
    id: facilityId || Math.max(...healthAdminData.facilities.map(f => f.id), 0) + 1,
    name: form.querySelector('input[name="name"]').value,
    type: form.querySelector('select[name="type"]').value,
    city: form.querySelector('input[name="city"]').value,
    beds: parseInt(form.querySelector('input[name="beds"]').value) || 0,
    staff: parseInt(form.querySelector('input[name="staff"]').value) || 0,
    status: form.querySelector('select[name="status"]').value
  };

  if (facilityId) {
    const index = healthAdminData.facilities.findIndex(f => f.id === facilityId);
    if (index >= 0) {
      healthAdminData.facilities[index] = data;
    }
  } else {
    healthAdminData.facilities.push(data);
  }

  loadFacilities();
  closeModal('facility-modal');
  showSuccessMessage(facilityId ? 'تم تحديث المنشأة' : 'تم إضافة منشأة جديدة');
}

function handleDepartmentSave(e) {
  e.preventDefault();
  const form = e.target;
  const deptId = parseInt(form.dataset.departmentId) || null;

  const data = {
    id: deptId || Math.max(...healthAdminData.departments.map(d => d.id), 0) + 1,
    name: form.querySelector('input[name="name"]').value,
    facility: form.querySelector('select[name="facility"]').value,
    staff: parseInt(form.querySelector('input[name="staff"]').value) || 0,
    status: form.querySelector('select[name="status"]').value
  };

  if (deptId) {
    const index = healthAdminData.departments.findIndex(d => d.id === deptId);
    if (index >= 0) {
      healthAdminData.departments[index] = data;
    }
  } else {
    healthAdminData.departments.push(data);
  }

  loadDepartments();
  closeModal('department-modal');
  showSuccessMessage(deptId ? 'تم تحديث القسم' : 'تم إضافة قسم جديد');
}

function handleStaffSave(e) {
  e.preventDefault();
  const form = e.target;
  const staffId = parseInt(form.dataset.staffId) || null;

  const data = {
    id: staffId || Math.max(...healthAdminData.staff.map(s => s.id), 0) + 1,
    name: form.querySelector('input[name="name"]').value,
    specialization: form.querySelector('input[name="specialization"]').value,
    facility: form.querySelector('select[name="facility"]').value,
    license: form.querySelector('input[name="license"]').value,
    status: form.querySelector('select[name="status"]').value
  };

  if (staffId) {
    const index = healthAdminData.staff.findIndex(s => s.id === staffId);
    if (index >= 0) {
      healthAdminData.staff[index] = data;
    }
  } else {
    healthAdminData.staff.push(data);
  }

  loadMedicalStaff();
  closeModal('staff-modal');
  showSuccessMessage(staffId ? 'تم تحديث الموظف' : 'تم إضافة موظف جديد');
}

/* ============================================
   SEARCH & FILTER
   ============================================ */

function searchFacilities(query) {
  const tbody = document.getElementById('facilities-table-body');
  if (!tbody) return;

  const rows = tbody.querySelectorAll('tr');
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(query.toLowerCase()) ? '' : 'none';
  });
}

function searchDepartments(query) {
  const tbody = document.getElementById('departments-table-body');
  if (!tbody) return;

  const rows = tbody.querySelectorAll('tr');
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(query.toLowerCase()) ? '' : 'none';
  });
}

function searchStaff(query) {
  const tbody = document.getElementById('staff-table-body');
  if (!tbody) return;

  const rows = tbody.querySelectorAll('tr');
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(query.toLowerCase()) ? '' : 'none';
  });
}

function searchAppointments(query) {
  const tbody = document.getElementById('appointments-table-body');
  if (!tbody) return;

  const rows = tbody.querySelectorAll('tr');
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(query.toLowerCase()) ? '' : 'none';
  });
}

/* ============================================
   REPORTING & EXPORT
   ============================================ */

function generateReport(reportType) {
  let content = '';
  const date = new Date().toLocaleDateString('ar-SY');

  switch(reportType) {
    case 'facilities':
      content = generateFacilitiesReport();
      break;
    case 'staff':
      content = generateStaffReport();
      break;
    case 'appointments':
      content = generateAppointmentsReport();
      break;
    default:
      content = 'تقرير لم يتم تحديده';
  }

  alert(`تقرير ${reportType}\nالتاريخ: ${date}\n\n${content}`);
}

function generateFacilitiesReport() {
  let report = `إجمالي المنشآت الصحية: ${healthAdminData.facilities.length}\n`;
  report += `المنشآت النشطة: ${healthAdminData.facilities.filter(f => f.status === 'active').length}\n`;
  report += `إجمالي الأسرة: ${healthAdminData.facilities.reduce((sum, f) => sum + f.beds, 0)}\n`;
  report += `إجمالي الموظفين: ${healthAdminData.facilities.reduce((sum, f) => sum + f.staff, 0)}\n`;
  return report;
}

function generateStaffReport() {
  let report = `إجمالي الموظفين الطبيين: ${healthAdminData.staff.length}\n`;
  report += `الموظفين النشطين: ${healthAdminData.staff.filter(s => s.status === 'active').length}\n`;
  const specialties = [...new Set(healthAdminData.staff.map(s => s.specialization))];
  report += `عدد التخصصات: ${specialties.length}\n`;
  return report;
}

function generateAppointmentsReport() {
  let report = `إجمالي المواعيد: ${healthAdminData.appointments.length}\n`;
  report += `المواعيد المؤكدة: ${healthAdminData.appointments.filter(a => a.status === 'confirmed').length}\n`;
  report += `المواعيد المعلقة: ${healthAdminData.appointments.filter(a => a.status === 'pending').length}\n`;
  report += `المواعيد الملغاة: ${healthAdminData.appointments.filter(a => a.status === 'cancelled').length}\n`;
  return report;
}

function exportToCSV(dataType) {
  let csv = '';
  let filename = '';

  switch(dataType) {
    case 'facilities':
      csv = 'الاسم,النوع,المدينة,الأسرة,الموظفين,الحالة\n';
      healthAdminData.facilities.forEach(f => {
        csv += `${f.name},${f.type === 'hospital' ? 'مستشفى' : 'مركز صحي'},${f.city},${f.beds},${f.staff},${f.status}\n`;
      });
      filename = 'المنشآت_الصحية.csv';
      break;
    case 'staff':
      csv = 'الاسم,التخصص,المنشأة,الرخصة,الحالة\n';
      healthAdminData.staff.forEach(s => {
        csv += `${s.name},${s.specialization},${s.facility},${s.license},${s.status}\n`;
      });
      filename = 'الموظفين_الطبيين.csv';
      break;
    case 'appointments':
      csv = 'المريض,الطبيب,التاريخ,الوقت,الحالة\n';
      healthAdminData.appointments.forEach(a => {
        csv += `${a.patient},${a.doctor},${a.date},${a.time},${a.status}\n`;
      });
      filename = 'المواعيد.csv';
      break;
  }

  if (csv) {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

function showSuccessMessage(message) {
  // Create a simple alert for now; could be replaced with toast notification
  console.log('Success:', message);
  
  // Show brief notification (optional)
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #10B981;
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 2000;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function printPage() {
  window.print();
}

function logout() {
  if (confirm('هل تريد تسجيل الخروج؟')) {
    window.location.href = 'index.html';
  }
}
