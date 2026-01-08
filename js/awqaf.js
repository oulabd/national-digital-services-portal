/* ========================================
   MINISTRY OF AWQAF - JAVASCRIPT
   ======================================== */

// Hajj Registration Form State
const hajjFormData = {
  fullName: '',
  nationalId: '',
  phone: '',
  birthDate: '',
  province: '',
  district: '',
  address: '',
  hajjType: '',
  companion: 'no',
  companionName: '',
  companionRelation: '',
  notes: ''
};

// Initialize Hajj Registration
function initializeHajjForm() {
  // Auto-fill with user data
  const userFullName = localStorage.getItem('userFullName') || 'أحمد محمد علي';
  const userNationalId = localStorage.getItem('userNationalId') || '12345678901';
  const userBirthDate = localStorage.getItem('userBirthDate') || '1990-05-15';
  
  const fullNameInput = document.getElementById('fullName');
  const nationalIdInput = document.getElementById('nationalId');
  const birthDateInput = document.getElementById('birthDate');
  
  if (fullNameInput) fullNameInput.value = userFullName;
  if (nationalIdInput) nationalIdInput.value = userNationalId;
  if (birthDateInput) birthDateInput.value = userBirthDate;
  
  // Companion toggle
  const companionRadios = document.querySelectorAll('input[name="companion"]');
  companionRadios.forEach(radio => {
    radio.addEventListener('change', toggleCompanionDetails);
  });
}

function toggleCompanionDetails() {
  const companionValue = document.querySelector('input[name="companion"]:checked').value;
  const companionDetails = document.getElementById('companionDetails');
  
  if (companionValue === 'yes') {
    companionDetails.style.display = 'flex';
    companionDetails.style.flexDirection = 'column';
  } else {
    companionDetails.style.display = 'none';
  }
}

function nextHajjStep(currentStep) {
  // Validate current step
  if (!validateHajjStep(currentStep)) {
    return;
  }
  
  // Save data from current step
  saveHajjStepData(currentStep);
  
  // Show next step
  const nextStep = currentStep + 1;
  if (nextStep <= 4) {
    showHajjStep(nextStep);
    populateHajjReview();
    updateHajjProgress();
  }
}

function prevHajjStep(currentStep) {
  const prevStep = currentStep - 1;
  if (prevStep >= 1) {
    showHajjStep(prevStep);
    updateHajjProgress();
  }
}

function showHajjStep(step) {
  // Hide all forms
  document.querySelectorAll('.hajj-form-step').forEach(form => {
    form.classList.remove('active');
  });
  
  // Show target form
  const targetForm = document.getElementById(`step${step}`);
  if (targetForm) {
    targetForm.classList.add('active');
  }
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function validateHajjStep(step) {
  let isValid = true;
  const errors = [];
  
  switch(step) {
    case 1:
      // Validate phone
      const phone = document.getElementById('phone').value.trim();
      if (!phone) {
        errors.push('رقم الهاتف مطلوب');
        isValid = false;
      } else if (!/^\d{10,}$/.test(phone.replace(/\D/g, ''))) {
        errors.push('رقم الهاتف غير صحيح (10 أرقام على الأقل)');
        isValid = false;
      }
      break;
      
    case 2:
      // Validate location
      const province = document.getElementById('province').value;
      const district = document.getElementById('district').value.trim();
      
      if (!province) {
        errors.push('اختر المحافظة');
        isValid = false;
      }
      if (!district) {
        errors.push('أدخل المنطقة أو المدينة');
        isValid = false;
      }
      break;
      
    case 3:
      // Validate preferences
      const hajjType = document.getElementById('hajjType').value;
      if (!hajjType) {
        errors.push('اختر نوع الحج');
        isValid = false;
      }
      
      const companion = document.querySelector('input[name="companion"]:checked').value;
      if (companion === 'yes') {
        const companionName = document.getElementById('companionName').value.trim();
        const companionRelation = document.getElementById('companionRelation').value.trim();
        
        if (!companionName) {
          errors.push('أدخل اسم المرافق');
          isValid = false;
        }
        if (!companionRelation) {
          errors.push('أدخل العلاقة بالمرافق');
          isValid = false;
        }
      }
      break;
  }
  
  if (!isValid) {
    errors.forEach(error => {
      alert(error);
    });
  }
  
  return isValid;
}

function saveHajjStepData(step) {
  switch(step) {
    case 1:
      hajjFormData.fullName = document.getElementById('fullName').value;
      hajjFormData.nationalId = document.getElementById('nationalId').value;
      hajjFormData.phone = document.getElementById('phone').value;
      hajjFormData.birthDate = document.getElementById('birthDate').value;
      break;
      
    case 2:
      hajjFormData.province = document.getElementById('province').value;
      hajjFormData.district = document.getElementById('district').value;
      hajjFormData.address = document.getElementById('address').value;
      break;
      
    case 3:
      hajjFormData.hajjType = document.getElementById('hajjType').value;
      hajjFormData.companion = document.querySelector('input[name="companion"]:checked').value;
      hajjFormData.companionName = document.getElementById('companionName').value;
      hajjFormData.companionRelation = document.getElementById('companionRelation').value;
      hajjFormData.notes = document.getElementById('notes').value;
      break;
  }
}

function populateHajjReview() {
  // Set review values
  const provinceSelect = document.getElementById('province');
  const provinceName = provinceSelect ? provinceSelect.options[provinceSelect.selectedIndex].text : '-';
  
  const hajjTypeSelect = document.getElementById('hajjType');
  const hajjTypeName = hajjTypeSelect ? hajjTypeSelect.options[hajjTypeSelect.selectedIndex].text : '-';
  
  const companionValue = document.querySelector('input[name="companion"]:checked')?.value === 'yes' 
    ? hajjFormData.companionName + ' (' + hajjFormData.companionRelation + ')'
    : 'لا';
  
  document.getElementById('review-fullName').textContent = hajjFormData.fullName || '-';
  document.getElementById('review-nationalId').textContent = hajjFormData.nationalId || '-';
  document.getElementById('review-phone').textContent = hajjFormData.phone || '-';
  document.getElementById('review-province').textContent = provinceName;
  document.getElementById('review-district').textContent = hajjFormData.district || '-';
  document.getElementById('review-hajjType').textContent = hajjTypeName;
  document.getElementById('review-companion').textContent = companionValue;
}

function updateHajjProgress() {
  const currentStep = document.querySelector('.hajj-form-step.active');
  const stepId = currentStep?.id;
  const stepNumber = parseInt(stepId?.match(/\d+/)?.[0] || 1);
  
  document.querySelectorAll('.hajj-step').forEach((step, index) => {
    const stepNum = index + 1;
    if (stepNum < stepNumber) {
      step.classList.add('completed');
      step.classList.remove('active');
    } else if (stepNum === stepNumber) {
      step.classList.add('active');
      step.classList.remove('completed');
    } else {
      step.classList.remove('active', 'completed');
    }
  });
}

function submitHajjForm() {
  // Final validation
  const confirmCheckbox = document.getElementById('confirmData');
  if (!confirmCheckbox.checked) {
    alert('يجب الموافقة على الشروط');
    return;
  }
  
  // Save to localStorage for demo
  localStorage.setItem('hajjApplication', JSON.stringify(hajjFormData));
  localStorage.setItem('hajjApplicationId', 'HJ-2024-00425');
  localStorage.setItem('hajjApplicationDate', new Date().toISOString());
  
  // Show success message
  alert('تم تقديم طلبك بنجاح!\n\nرقم الطلب: HJ-2024-00425\nيمكنك متابعة حالة الطلب في صفحة المتابعة');
  
  // Redirect to tracking page
  setTimeout(() => {
    window.location.href = 'hajj-tracking.html';
  }, 2000);
}

// Track form changes
function trackFormInput(inputId) {
  const input = document.getElementById(inputId);
  if (input) {
    input.addEventListener('change', () => {
      console.log(`${inputId}: ${input.value}`);
    });
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.hajj-form-step')) {
    initializeHajjForm();
  }
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    hajjFormData,
    nextHajjStep,
    prevHajjStep,
    validateHajjStep,
    submitHajjForm
  };
}
