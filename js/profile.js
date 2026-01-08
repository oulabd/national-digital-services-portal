/* ============================================
   Citizen Profile JavaScript
   Arabic RTL - Citizen Digital Identity
   ============================================ */

// Toggle edit mode for sections
function toggleEditMode(section) {
  if (section === 'contact') {
    const form = document.getElementById('contactForm');
    const items = form.querySelectorAll('.info-item.editable');
    const actions = document.getElementById('contactActions');
    const btn = document.getElementById('editContactBtn');
    
    const isEditing = items[0].classList.contains('editing');
    
    if (isEditing) {
      // Cancel edit
      items.forEach(item => {
        item.classList.remove('editing');
        const input = item.querySelector('.info-input');
        if (input) input.disabled = true;
      });
      actions.style.display = 'none';
      btn.textContent = '✏️ تعديل';
    } else {
      // Enable edit
      items.forEach(item => {
        item.classList.add('editing');
        const input = item.querySelector('.info-input');
        if (input) input.disabled = false;
      });
      actions.style.display = 'flex';
      btn.textContent = '✕ إلغاء';
    }
  }
}

// Cancel edit mode
function cancelEdit(section) {
  if (section === 'contact') {
    const form = document.getElementById('contactForm');
    const items = form.querySelectorAll('.info-item.editable');
    const actions = document.getElementById('contactActions');
    const btn = document.getElementById('editContactBtn');
    
    items.forEach(item => {
      item.classList.remove('editing');
      const input = item.querySelector('.info-input');
      if (input) {
        input.disabled = true;
        // Reset to original value
        const originalValue = item.querySelector('.info-value').textContent;
        input.value = originalValue;
      }
    });
    
    actions.style.display = 'none';
    btn.textContent = '✏️ تعديل';
  }
}

// Save changes
function saveChanges(section) {
  if (section === 'contact') {
    const form = document.getElementById('contactForm');
    const items = form.querySelectorAll('.info-item.editable');
    
    // Validate inputs
    let isValid = true;
    items.forEach(item => {
      const input = item.querySelector('.info-input');
      if (input && input.type === 'tel') {
        const phoneRegex = /^09\d{8}$/;
        if (!phoneRegex.test(input.value)) {
          alert('رقم الهاتف يجب أن يبدأ بـ 09 ويتكون من 10 أرقام');
          isValid = false;
        }
      }
      if (input && input.type === 'email' && input.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
          alert('البريد الإلكتروني غير صحيح');
          isValid = false;
        }
      }
    });
    
    if (!isValid) return;
    
    // Show loading
    const saveBtn = event.target;
    saveBtn.textContent = 'جاري الحفظ...';
    saveBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      // Update display values
      items.forEach(item => {
        const input = item.querySelector('.info-input');
        const value = item.querySelector('.info-value');
        if (input && value) {
          if (input.tagName === 'SELECT') {
            value.textContent = input.options[input.selectedIndex].text;
          } else {
            value.textContent = input.value;
          }
        }
        item.classList.remove('editing');
        if (input) input.disabled = true;
      });
      
      // Hide actions
      const actions = document.getElementById('contactActions');
      actions.style.display = 'none';
      
      // Reset button
      const btn = document.getElementById('editContactBtn');
      btn.textContent = '✏️ تعديل';
      
      saveBtn.textContent = 'حفظ التغييرات';
      saveBtn.disabled = false;
      
      // Show success message
      showNotification('تم حفظ التغييرات بنجاح', 'success');
    }, 1500);
  }
}

// Show notification
function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    background: ${type === 'success' ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' : 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'};
    color: white;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    z-index: 10000;
    animation: slideDown 0.3s ease;
    font-weight: 600;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideUp 0.3s ease';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Logout
function logout() {
  if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
    localStorage.removeItem('citizenRegistration');
    window.location.href = 'index.html';
  }
}

// Load user data on page load
document.addEventListener('DOMContentLoaded', function() {
  const registrationData = localStorage.getItem('citizenRegistration');
  
  if (registrationData) {
    const data = JSON.parse(registrationData);
    
    // Update display name
    const displayName = document.getElementById('displayName');
    if (displayName && data.fullName) {
      displayName.textContent = data.fullName;
    }
    
    // Update avatar initials
    const avatar = document.querySelector('.avatar-circle');
    if (avatar && data.fullName) {
      const names = data.fullName.split(' ');
      const initials = names.slice(0, 2).map(n => n[0]).join('');
      avatar.textContent = initials;
    }
  }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translate(-50%, -20px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
  
  @keyframes slideUp {
    from {
      opacity: 1;
      transform: translate(-50%, 0);
    }
    to {
      opacity: 0;
      transform: translate(-50%, -20px);
    }
  }
`;
document.head.appendChild(style);
