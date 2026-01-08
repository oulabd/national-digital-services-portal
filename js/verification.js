/* ============================================
   Verification Status JavaScript
   Arabic RTL - Citizen Digital Identity
   ============================================ */

// Show different status states
function showStatus(status) {
  const icon = document.getElementById('statusIcon');
  const title = document.getElementById('statusTitle');
  const message = document.getElementById('statusMessage');
  
  // Remove all status classes
  icon.className = 'status-icon';
  
  if (status === 'pending') {
    icon.classList.add('pending');
    icon.textContent = '⏳';
    title.textContent = 'حسابك قيد المراجعة';
    message.textContent = 'يتم حاليًا التحقق من البيانات المدخلة ومطابقتها مع قاعدة البيانات الوطنية';
    
    updateTimeline([
      { completed: true, active: false },
      { completed: false, active: true },
      { completed: false, active: false },
      { completed: false, active: false }
    ]);
    
  } else if (status === 'verified') {
    icon.classList.add('verified');
    icon.textContent = '✅';
    title.textContent = 'تم التحقق من حسابك بنجاح!';
    message.textContent = 'تم التحقق من بياناتك بنجاح. يمكنك الآن الوصول إلى جميع الخدمات الحكومية باستخدام هويتك الرقمية الموحدة';
    
    updateTimeline([
      { completed: true, active: false },
      { completed: true, active: false },
      { completed: true, active: false },
      { completed: true, active: false }
    ]);
    
    // Change action buttons
    const actionButtons = document.querySelector('.action-buttons');
    actionButtons.innerHTML = `
      <button class="btn btn-success" onclick="window.location.href='profile.html'">عرض ملفي الشخصي</button>
      <button class="btn btn-primary" onclick="window.location.href='dashboard.html'">الذهاب للخدمات</button>
    `;
    
    // Update time estimate
    const timeEstimate = document.querySelector('.time-estimate');
    timeEstimate.innerHTML = `
      <div class="estimate-icon">✓</div>
      <div class="estimate-text">
        <strong>تم إنشاء هويتك الرقمية:</strong>
        <span style="color: var(--success);">CD-2026-${Math.floor(Math.random() * 100000)}</span>
      </div>
    `;
    timeEstimate.style.background = 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)';
    timeEstimate.style.borderColor = 'var(--success)';
    
  } else if (status === 'rejected') {
    icon.classList.add('rejected');
    icon.textContent = '❌';
    title.textContent = 'البيانات غير مطابقة';
    message.textContent = 'لم نتمكن من التحقق من بياناتك. الرجاء التأكد من صحة المعلومات المدخلة ومطابقتها للبطاقة الوطنية';
    
    updateTimeline([
      { completed: true, active: false },
      { completed: false, active: false, error: true },
      { completed: false, active: false },
      { completed: false, active: false }
    ]);
    
    // Change action buttons
    const actionButtons = document.querySelector('.action-buttons');
    actionButtons.innerHTML = `
      <button class="btn btn-outline" onclick="window.location.href='index.html'">العودة للرئيسية</button>
      <button class="btn btn-danger" onclick="window.location.href='register.html'">تسجيل من جديد</button>
    `;
    
    // Update time estimate to show error
    const timeEstimate = document.querySelector('.time-estimate');
    timeEstimate.innerHTML = `
      <div class="estimate-icon">⚠️</div>
      <div class="estimate-text">
        <strong>أسباب محتملة للخطأ:</strong>
        <span style="color: var(--danger); font-size: 1rem; font-weight: normal;">
          الرقم الوطني غير صحيح • الاسم غير مطابق • تاريخ الولادة خاطئ
        </span>
      </div>
    `;
    timeEstimate.style.background = 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)';
    timeEstimate.style.borderColor = 'var(--danger)';
  }
}

// Update timeline states
function updateTimeline(states) {
  const items = document.querySelectorAll('.timeline-item');
  
  states.forEach((state, index) => {
    const item = items[index];
    if (!item) return;
    
    // Remove all classes
    item.classList.remove('completed', 'active', 'error');
    
    // Add appropriate class
    if (state.completed) {
      item.classList.add('completed');
    } else if (state.active) {
      item.classList.add('active');
    } else if (state.error) {
      const icon = item.querySelector('.timeline-icon');
      icon.style.background = 'linear-gradient(135deg, var(--danger) 0%, #DC2626 100%)';
      icon.textContent = '✗';
    }
  });
}

// Simulate verification process (for demo)
function simulateVerification() {
  const states = ['pending', 'verified', 'rejected'];
  const randomState = states[Math.floor(Math.random() * states.length)];
  
  // Show loading
  const btn = event.target;
  btn.textContent = 'جاري التحديث...';
  btn.disabled = true;
  
  setTimeout(() => {
    showStatus(randomState);
    btn.textContent = 'تحديث الحالة';
    btn.disabled = false;
  }, 1500);
}

// Auto-simulate verification on page load (for demo)
document.addEventListener('DOMContentLoaded', function() {
  // Check if we have registration data
  const registrationData = localStorage.getItem('citizenRegistration');
  
  if (registrationData) {
    // Simulate verification process
    setTimeout(() => {
      // Move to step 2
      const timeline = document.querySelectorAll('.timeline-item');
      timeline[1].classList.remove('active');
      timeline[1].classList.add('completed');
      timeline[2].classList.add('active');
      
      setTimeout(() => {
        // Move to step 3
        timeline[2].classList.remove('active');
        timeline[2].classList.add('completed');
        timeline[3].classList.add('active');
        
        setTimeout(() => {
          // Complete verification
          showStatus('verified');
        }, 2000);
      }, 2000);
    }, 3000);
  }
});
