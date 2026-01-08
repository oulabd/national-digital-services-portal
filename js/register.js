/* ============================================
   Registration Form JavaScript
   Arabic RTL - Citizen Digital Identity
   ============================================ */

let currentStep = 1;
const formData = {};

// Password strength checker
document.addEventListener('DOMContentLoaded', function() {
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  
  if (passwordInput) {
    passwordInput.addEventListener('input', checkPasswordStrength);
    passwordInput.addEventListener('input', validatePasswordRules);
  }
  
  if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener('input', checkPasswordMatch);
  }
  
  // National ID validation
  const nationalIdInput = document.getElementById('nationalId');
  if (nationalIdInput) {
    nationalIdInput.addEventListener('input', function(e) {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
  }

  // Family book validation
  const familyBookInput = document.getElementById('familyBook');
  if (familyBookInput) {
    familyBookInput.addEventListener('input', function(e) {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
  }
  
  // Phone validation
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
  }
});

// Check password strength
function checkPasswordStrength() {
  const password = document.getElementById('password').value;
  const strengthFill = document.getElementById('strengthFill');
  const strengthText = document.getElementById('strengthText');
  
  let strength = 0;
  
  if (password.length >= 8) strength++;
  if (password.match(/[a-z]/)) strength++;
  if (password.match(/[A-Z]/)) strength++;
  if (password.match(/[0-9]/)) strength++;
  if (password.match(/[^a-zA-Z0-9]/)) strength++;
  
  strengthFill.className = 'strength-fill';
  
  if (strength <= 1) {
    strengthFill.classList.add('weak');
    strengthText.textContent = 'ضعيفة جدًا';
    strengthText.style.color = 'var(--danger)';
  } else if (strength === 2) {
    strengthFill.classList.add('fair');
    strengthText.textContent = 'ضعيفة';
    strengthText.style.color = 'var(--warning)';
  } else if (strength === 3) {
    strengthFill.classList.add('good');
    strengthText.textContent = 'جيدة';
    strengthText.style.color = 'var(--info)';
  } else {
    strengthFill.classList.add('strong');
    strengthText.textContent = 'قوية';
    strengthText.style.color = 'var(--success)';
  }
}

// Validate password rules
function validatePasswordRules() {
  const password = document.getElementById('password').value;
  
  const rules = {
    'rule-length': password.length >= 8,
    'rule-uppercase': /[A-Z]/.test(password),
    'rule-lowercase': /[a-z]/.test(password),
    'rule-number': /[0-9]/.test(password)
  };
  
  for (const [ruleId, isValid] of Object.entries(rules)) {
    const ruleElement = document.getElementById(ruleId);
    if (isValid) {
      ruleElement.textContent = ruleElement.textContent.replace('✗', '✓');
      ruleElement.classList.add('valid');
    } else {
      ruleElement.textContent = ruleElement.textContent.replace('✓', '✗');
      ruleElement.classList.remove('valid');
    }
  }
}

// Check password match
function checkPasswordMatch() {
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const confirmInput = document.getElementById('confirmPassword');
  const errorDiv = document.getElementById('confirmPassword-error');
  
  if (confirmPassword && password !== confirmPassword) {
    confirmInput.classList.add('error');
    confirmInput.classList.remove('success');
    errorDiv.textContent = 'كلمتا المرور غير متطابقتين';
    errorDiv.classList.add('show');
  } else if (confirmPassword && password === confirmPassword) {
    confirmInput.classList.remove('error');
    confirmInput.classList.add('success');
    errorDiv.classList.remove('show');
  }
}

// Navigate to next step
function nextStep(step) {
  if (validateStep(step)) {
    saveStepData(step);
    
    // Update step visual
    document.querySelector(`[data-step="${step}"]`).classList.add('completed');
    document.querySelector(`[data-step="${step + 1}"]`).classList.add('active');
    
    // Hide current form, show next
    document.getElementById(`step${step}`).classList.remove('active');
    document.getElementById(`step${step + 1}`).classList.add('active');
    
    // If going to step 4, populate review
    if (step === 3) {
      populateReview();
    }
    
    currentStep = step + 1;
    scrollToTop();
  }
}

// Navigate to previous step
function prevStep(step) {
  // Update step visual
  document.querySelector(`[data-step="${step}"]`).classList.remove('active');
  document.querySelector(`[data-step="${step - 1}"]`).classList.add('active');
  
  // Hide current form, show previous
  document.getElementById(`step${step}`).classList.remove('active');
  document.getElementById(`step${step - 1}`).classList.add('active');
  
  currentStep = step - 1;
  scrollToTop();
}

// Validate current step
function validateStep(step) {
  let isValid = true;
  
  if (step === 1) {
    // Validate identity information
    const nationalId = document.getElementById('nationalId');
    const familyBook = document.getElementById('familyBook');
    const fullName = document.getElementById('fullName');
    const motherName = document.getElementById('motherName');
    const birthDate = document.getElementById('birthDate');
    const gender = document.getElementById('gender');
    
    if (!nationalId.value || nationalId.value.length !== 11) {
      showError('nationalId', 'الرقم الوطني يجب أن يكون 11 رقمًا');
      isValid = false;
    } else {
      hideError('nationalId');
    }

    if (!familyBook.value || familyBook.value.length < 8) {
      showError('familyBook', 'رقم دفتر العائلة يجب أن يكون 8 أرقام على الأقل');
      isValid = false;
    } else {
      hideError('familyBook');
    }
    
    if (!fullName.value || fullName.value.trim().split(' ').length < 3) {
      showError('fullName', 'الرجاء إدخال الاسم الثلاثي كاملاً');
      isValid = false;
    } else {
      hideError('fullName');
    }
    
    if (!motherName.value) {
      showError('motherName', 'اسم الأم مطلوب');
      isValid = false;
    } else {
      hideError('motherName');
    }
    
    if (!birthDate.value) {
      showError('birthDate', 'تاريخ الولادة مطلوب');
      isValid = false;
    } else {
      hideError('birthDate');
    }
    
    if (!gender.value) {
      showError('gender', 'الرجاء اختيار الجنس');
      isValid = false;
    } else {
      hideError('gender');
    }
  }
  
  if (step === 2) {
    // Validate contact information
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
    
    if (!phone.value || phone.value.length < 10) {
      showError('phone', 'رقم الهاتف يجب أن يكون 10 أرقام على الأقل');
      isValid = false;
    } else {
      hideError('phone');
    }
    
    if (email.value && !isValidEmail(email.value)) {
      showError('email', 'البريد الإلكتروني غير صحيح');
      isValid = false;
    } else {
      hideError('email');
    }
  }
  
  if (step === 3) {
    // Validate password
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    
    if (!password.value || password.value.length < 8) {
      showError('password', 'كلمة المرور يجب أن تكون 8 أحرف على الأقل');
      isValid = false;
    } else if (!isStrongPassword(password.value)) {
      showError('password', 'كلمة المرور لا تستوفي جميع الشروط');
      isValid = false;
    } else {
      hideError('password');
    }
    
    if (password.value !== confirmPassword.value) {
      showError('confirmPassword', 'كلمتا المرور غير متطابقتين');
      isValid = false;
    } else {
      hideError('confirmPassword');
    }
  }
  
  return isValid;
}

// Show error message
function showError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const errorDiv = document.getElementById(`${fieldId}-error`);
  
  if (!input || !errorDiv) return; // لا تكمل إن لم يوجد العنصر
  input.classList.add('error');
  input.classList.remove('success');
  errorDiv.textContent = message;
  errorDiv.classList.add('show');
}

// Hide error message
function hideError(fieldId) {
  const input = document.getElementById(fieldId);
  const errorDiv = document.getElementById(`${fieldId}-error`);
  
  if (!input || !errorDiv) return; // لا تكمل إن لم يوجد العنصر
  input.classList.remove('error');
  input.classList.add('success');
  errorDiv.classList.remove('show');
}

// Validate email
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Check strong password
function isStrongPassword(password) {
  return password.length >= 8 &&
         /[a-z]/.test(password) &&
         /[A-Z]/.test(password) &&
         /[0-9]/.test(password);
}

// Save step data
function saveStepData(step) {
  if (step === 1) {
    formData.nationalId = document.getElementById('nationalId').value;
    formData.familyBook = document.getElementById('familyBook').value;
    formData.fullName = document.getElementById('fullName').value;
    formData.motherName = document.getElementById('motherName').value;
    formData.birthDate = document.getElementById('birthDate').value;
    formData.gender = document.getElementById('gender').value;
  }
  
  if (step === 2) {
    formData.phone = document.getElementById('phone').value;
    formData.email = document.getElementById('email').value;
    formData.province = document.getElementById('province').value;
    formData.city = document.getElementById('city').value;
  }
  
  if (step === 3) {
    formData.password = document.getElementById('password').value;
  }
}

// Populate review section
function populateReview() {
  document.getElementById('review-nationalId').textContent = formData.nationalId;
  document.getElementById('review-familyBook').textContent = formData.familyBook;
  document.getElementById('review-fullName').textContent = formData.fullName;
  document.getElementById('review-motherName').textContent = formData.motherName;
  document.getElementById('review-birthDate').textContent = formData.birthDate;
  document.getElementById('review-gender').textContent = formData.gender === 'male' ? 'ذكر' : 'أنثى';
  
  document.getElementById('review-phone').textContent = formData.phone;
  document.getElementById('review-email').textContent = formData.email || 'غير محدد';
  
  const provinceSelect = document.getElementById('province');
  const provinceText = provinceSelect.options[provinceSelect.selectedIndex]?.text || 'غير محدد';
  document.getElementById('review-province').textContent = provinceText;
  document.getElementById('review-city').textContent = formData.city || 'غير محدد';
}

// Submit registration
function submitRegistration() {
  const confirmCheckbox = document.getElementById('confirmData');
  
  if (!confirmCheckbox.checked) {
    alert('الرجاء تأكيد صحة البيانات المدخلة');
    return;
  }
  
  // Show loading state
  const submitBtn = document.querySelector('.btn-submit');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<span>جاري إنشاء الحساب...</span>';
  submitBtn.disabled = true;
  
  // Simulate API call
  setTimeout(() => {
    // Store registration data (in real app, this would be sent to server)
    localStorage.setItem('citizenRegistration', JSON.stringify(formData));
    
    // Redirect to verification page
    window.location.href = 'verification.html';
  }, 2000);
}

// Scroll to top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
