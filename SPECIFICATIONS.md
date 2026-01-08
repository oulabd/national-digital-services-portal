# 📋 المواصفات التقنية | Technical Specifications

## بوابة الخدمات الرقمية الوطنية - الإصدار 1.0
## Arabic RTL National Digital Services Portal - v1.0

---

## 1️⃣ متطلبات النظام | System Requirements

### المتصفحات المدعومة
```
✓ Chrome/Chromium 90+
✓ Firefox 88+
✓ Safari 14+
✓ Edge 90+
✓ Opera 76+
```

### متطلبات الجهاز الأدنى
```
RAM:           512 MB
Storage:       5 MB (جميع الملفات)
Internet:      أي سرعة اتصال
Browser:       أي متصفح حديث
```

### الأنظمة المشغلة
```
✓ Windows (Vista+)
✓ macOS (10.14+)
✓ Linux (جميع التوزيعات)
✓ Android (6.0+)
✓ iOS (12.0+)
```

---

## 2️⃣ معايير الأداء | Performance Standards

### أوقات التحميل
```
First Byte (TTFB):        < 100ms
First Paint (FP):         < 500ms
First Contentful Paint:    < 1s
Largest Contentful Paint:  < 2s
Time to Interactive:       < 3s
```

### حجم الملفات
```
HTML (all pages):  ~150 KB (before compression)
CSS:              ~45 KB
JavaScript:       ~12 KB
Total:            ~207 KB (uncompressed)
After gzip:       ~40-50 KB
```

### أداء JavaScript
```
Initial load:     < 500ms
Form validation:  < 50ms
Tab switching:    < 100ms
Modal animation:  < 300ms
```

---

## 3️⃣ المواصفات الفنية | Technical Specs

### HTML5 Semantic
```
✓ DOCTYPE html
✓ lang="ar" dir="rtl"
✓ Meta viewport responsive
✓ UTF-8 encoding
✓ Semantic tags (header, nav, main, section, article)
✓ Proper heading hierarchy (h1-h6)
✓ Form elements with labels
✓ ARIA attributes for accessibility
```

### CSS3 Features
```
✓ CSS Custom Properties (Variables)
✓ Grid Layout (auto-fit, minmax)
✓ Flexbox (flex-direction, gap)
✓ Transitions (300ms easing)
✓ Animations (keyframes)
✓ Media queries (responsive)
✓ Box-shadow (elevation)
✓ Border-radius (8px standard)
```

### JavaScript ES6+
```
✓ Arrow functions
✓ Template literals
✓ Destructuring
✓ Default parameters
✓ Event listeners (DOMContentLoaded)
✓ LocalStorage API
✓ FormData API
✓ classList manipulation
```

---

## 4️⃣ معايير التصميم | Design Standards

### وحدات المسافة | Spacing Scale
```
xs: 0.25rem  (4px)
sm: 0.5rem   (8px)
md: 1rem     (16px)
lg: 1.5rem   (24px)
xl: 2rem     (32px)
2xl: 3rem    (48px)
```

### تقييس الخط | Type Scale
```
h1: 2.5rem   (40px)
h2: 2rem     (32px)
h3: 1.5rem   (24px)
h4: 1.25rem  (20px)
body: 1rem   (16px)
small: 0.875rem (14px)
```

### نصف القطر | Border Radius
```
sm: 0.25rem  (4px)    - inputs
md: 0.5rem   (8px)    - buttons
lg: 1rem     (16px)   - cards
```

### الظلال | Shadows
```
sm: 0 1px 2px 0 rgba(0,0,0,0.05)
md: 0 4px 6px -1px rgba(0,0,0,0.1)
lg: 0 10px 15px -3px rgba(0,0,0,0.1)
```

---

## 5️⃣ نظام الألوان | Color System

### الألوان الأساسية | Primary
```
Primary Olive:   #2F4F3E  (RGB: 47, 79, 62)
Dark Olive:      #21362B  (RGB: 33, 54, 43)
Gold:            #C8A24A  (RGB: 200, 162, 74)
Light Gold:      #E6D19A  (RGB: 230, 209, 154)
```

### الألوان المحايدة | Neutrals
```
White:           #FFFFFF  (RGB: 255, 255, 255)
Light Gray:      #F6F7F8  (RGB: 246, 247, 248)
Gray:            #E5E7EB  (RGB: 229, 231, 235)
Dark Gray:       #6B7280  (RGB: 107, 114, 128)
Text Dark:       #111827  (RGB: 17, 24, 39)
```

### الألوان الدلالية | Semantic
```
Success:         #10B981  (أخضر)
Warning:         #F59E0B  (برتقالي)
Danger:          #EF4444  (أحمر)
Info:            #3B82F6  (أزرق)
```

### تدرجات اللون | Gradients
```
Header:          (Dark Olive → Primary Olive)
ID Badge:        (Dark Olive → Primary Olive)
Gold Accent:     (Gold → Light Gold)
```

---

## 6️⃣ مكونات النظام | Component Library

### الأزرار
```
Button Types:    6 (primary, secondary, outline, danger, success, link)
Button Sizes:    3 (sm, md/default, lg)
Button States:   4 (normal, hover, active, disabled)
Min Width:       100px
Padding:         md (16px 24px)
```

### المدخلات
```
Input Types:     text, email, tel, date, password, textarea, select
Border:          1px solid #E5E7EB
Focus:           3px rgba(200,162,74,0.1) shadow
Padding:         16px
Border Radius:   8px
Font Size:       16px
```

### البطاقات
```
Padding:         24px
Border Radius:   16px
Box Shadow:      md (on normal), lg (on hover)
Background:      #FFFFFF
Transition:      300ms ease
```

### الشارات
```
Padding:         4px 8px
Border Radius:   8px
Font Size:       14px
Font Weight:     600
Types:           6+ (primary, gold, info, success, warning, danger)
```

### الجداول
```
Header BG:       #2F4F3E
Header Color:    #FFFFFF
Row Height:      auto (min 48px)
Cell Padding:    16px
Border:          1px solid #E5E7EB
Hover:           #F6F7F8 background
```

---

## 7️⃣ صفحات وشاشات | Pages & Screens

### 1. صفحة تسجيل الدخول (index.html)
```
Structure:
├── Centered card (max-width: 450px)
├── Logo + Title
├── Form group (2 inputs)
├── Checkbox + Link
├── CTA Button
├── Divider
└── Sign up link

Form Fields:
├── National ID (required, minlength 6)
├── Password (required, minlength 8)
└── Remember me (optional)

Validation:
├── Required fields
├── Min length check
└── Real-time feedback
```

### 2. لوحة التحكم (dashboard.html)
```
Structure:
├── Header (sticky)
├── Sidebar (fixed)
├── Main (flex: 1)
│   ├── Welcome section
│   ├── ID Badge (gradient)
│   ├── Service Cards (grid 3)
│   └── Stats Summary (grid 4)

Components:
├── 6 Service cards (clickable)
├── ID Badge (gradient background)
├── 4 Stats cards
└── Navigation sidebar (7 links)
```

### 3-7. صفحات الخدمات
```
Common Structure:
├── Header (sticky)
├── Sidebar (fixed)
├── Main content
│   ├── Page title + description
│   ├── Search/Filter section
│   ├── Main content area
│   ├── Tables/Cards/Forms
│   └── Modals (if needed)

Responsive:
├── Desktop: Sidebar visible
├── Tablet: Sidebar narrower
└── Mobile: Sidebar may hide
```

---

## 8️⃣ النماذج | Forms

### نموذج تسجيل الدخول
```
Fields:     2 (ID, Password)
Required:   Both
Validation: Min length, format
Submit:     Stores to localStorage
```

### نموذج حجز المواعيد الطبية
```
Fields:     8 (Province, Hospital, Department, Doctor, Date, Time, Reason, Notes)
Required:   6 fields
Steps:      5 (visual progress)
Validation: Required, date validation
Submit:     Shows success message
```

### نموذج البحث عن المخالفات
```
Fields:     2 (Car Number, National ID)
Required:   Both
Submit:     Populates table with results
```

### نموذج الدفع
```
Fields:     4 (Payment Method, Card Number, Expiry, CVV)
Required:   All
Validation: Card format, expiry date
Submit:     Closes modal, shows confirmation
```

---

## 9️⃣ الجداول | Tables

### جدول المخالفات
```
Columns:    6 (Type, Date, Location, Amount, Status, Action)
Rows:       5+ mock data
Status Badge: 4 types (pending, completed, approved, rejected)
Action:     Payment button
Responsive: Scrollable on mobile
```

### جدول الدرجات
```
Columns:    7 (Subject, Teacher, Exam1, Exam2, Assignment, Final, Grade)
Rows:       5+ mock data
Format:     Numbers, letters, badges
Responsive: Scrollable
```

### جدول المعالم السياحية
```
Columns:    6 (Site, Type, Province, Rating, Duration, Action)
Rows:       5+ mock data
Badges:     Type category
Actions:    Details, Booking buttons
```

---

## 🔟 التبويبات | Tabs

### التبويبات المتقدمة
```
Tab Types:  4 (University tabs)
            4 (School tabs)
            
Behavior:
├── Click to switch
├── Show/hide content
├── Fade animation (300ms)
└── Remember active state

Content:
├── Hidden by default (display: none)
├── Active tab shown (display: block)
└── Smooth animation
```

---

## 1️⃣1️⃣ النوافذ المنبثقة | Modals

### خصائص Modal
```
Background:     rgba(0,0,0,0.5) overlay
Animation:      Fade in
Size:           Max 500px width, 90% on mobile
Close:          Button, Escape key, Click outside
Position:       Center screen, fixed
Z-index:        1000
```

### أنواع Modals
```
1. Payment Modal (traffic.html)
2. Booking Modal (tourism.html)
3. Confirmation Modals (generic)
```

---

## 1️⃣2️⃣ التحقق من البيانات | Validation

### قواعد التحقق
```
Required:       Check if value exists
Email:          Regex validation
Phone:          Length and format check
Min Length:     Compare length
Date:           Valid date format
Number:         Numeric check
```

### رسائل الخطأ
```
Arabic only:    "الحقل مطلوب"
Specific:       "رقم هاتف غير صحيح"
Real-time:      Show on blur
Clear on:       Focus and fix
Style:          Red border + error message
```

---

## 1️⃣3️⃣ الاستجابة | Responsive Design

### نقاط الانقطاع | Breakpoints
```
Desktop:   ≥ 1024px  (min-width)
Tablet:    768-1024px (media query)
Mobile:    < 768px   (max-width)
```

### تعديلات لكل حجم
```
Desktop (1024px+):
├── Grid: 3-4 columns
├── Sidebar: Fixed visible
├── Font: 16px base
└── Spacing: Full

Tablet (768-1024px):
├── Grid: 2 columns
├── Sidebar: Normal/narrower
├── Font: 16px base
└── Spacing: Adjusted

Mobile (<768px):
├── Grid: 1 column (stacked)
├── Sidebar: May hide (menu)
├── Font: 14px base
├── Spacing: Reduced
└── Tables: Horizontal scroll
```

---

## 1️⃣4️⃣ إمكانية الوصول | Accessibility

### معايير WCAG 2.1
```
✓ Semantic HTML
✓ Proper heading structure
✓ Alt text for images
✓ Label for inputs
✓ Color contrast (4.5:1)
✓ Focus indicators
✓ Keyboard navigation
✓ ARIA attributes
```

### الملاحة بلوحة المفاتيح
```
Tab:            Navigate through elements
Shift+Tab:      Reverse navigation
Enter/Space:    Activate buttons
Escape:         Close modals
Arrow keys:     Select in dropdowns
```

---

## 1️⃣5️⃣ الأمان | Security

### على الواجهة الأمامية
```
✓ Input validation
✓ XSS prevention (escape HTML)
✓ No sensitive data in localStorage
✓ CSRF tokens (if backend)
✓ Content Security Policy headers
```

### على الخادم (يجب إضافته)
```
[ ] Input sanitization
[ ] SQL injection prevention
[ ] Authentication (OAuth/JWT)
[ ] Authorization checks
[ ] Rate limiting
[ ] HTTPS/TLS
[ ] HSTS headers
[ ] X-Frame-Options
```

---

## 1️⃣6️⃣ التكامل مع الخوادم | Backend Integration

### API Endpoints (مثال)
```
POST   /api/auth/login              - تسجيل دخول
GET    /api/appointments            - قائمة المواعيد
POST   /api/appointments            - حجز موعد جديد
GET    /api/violations              - البحث عن المخالفات
POST   /api/violations/{id}/pay     - دفع مخالفة
GET    /api/university/courses      - قائمة المقررات
POST   /api/university/register     - تسجيل مقرر
GET    /api/tourism/sites           - قائمة المواقع
POST   /api/tourism/booking         - حجز جولة
```

### معايير الطلبات
```
Method:         GET, POST, PUT, DELETE
Content-Type:   application/json
Headers:
├── Authorization: Bearer TOKEN
├── Accept-Language: ar
└── Accept: application/json

Response:
├── Status: 200, 201, 400, 401, 404, 500
├── Body: JSON with data/error
└── Headers: Content-Type: application/json
```

---

## 1️⃣7️⃣ قاعدة البيانات | Database

### الجداول المقترحة
```
users
├── id
├── national_id
├── password_hash
├── name
├── email
├── phone
└── created_at

appointments
├── id
├── user_id
├── doctor_id
├── date
├── time
├── status
└── created_at

violations
├── id
├── user_id
├── car_number
├── type
├── date
├── amount
├── status
└── created_at
```

---

## 1️⃣8️⃣ النشر | Deployment

### خادم محلي (Development)
```bash
# Python
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

### خادم الإنتاج
```
Platform options:
├── GitHub Pages (static)
├── Netlify (static)
├── Vercel (static)
├── AWS S3 + CloudFront
├── DigitalOcean App Platform
├── Heroku (with backend)
└── Traditional hosting
```

### خيارات الخادم
```
Backend:
├── Node.js + Express
├── Python + Flask/Django
├── PHP + Laravel
├── Java + Spring
└── .NET + ASP.NET

Database:
├── PostgreSQL
├── MySQL
├── MongoDB
└── Firebase
```

---

## 1️⃣9️⃣ الصيانة | Maintenance

### المراقبة
```
✓ Error tracking (Sentry)
✓ Performance monitoring (New Relic)
✓ Uptime monitoring (UptimeRobot)
✓ Log aggregation (ELK Stack)
✓ Analytics (Google Analytics)
```

### التحديثات
```
Security patches:   فوري
Bug fixes:         أسبوعي
Feature updates:    شهري
Major versions:     سنوي
```

---

## 2️⃣0️⃣ الاختبار | Testing

### أنواع الاختبارات
```
Unit Testing:       Jest, Jasmine
Integration:        Cypress, Selenium
Performance:        Lighthouse, WebPageTest
Accessibility:      axe DevTools, WAVE
Security:           OWASP ZAP, Burp Suite
```

### خطوط أساسية | Baselines
```
Lighthouse Score:   ≥ 90
Performance:        ≥ 90
Accessibility:      ≥ 95
Best Practices:     ≥ 90
SEO:               ≥ 90
```

---

## 📝 الملاحظات النهائية | Final Notes

### ما تم بناؤه
✅ نظام تصميم كامل (Design System)  
✅ 8 صفحات HTML احترافية  
✅ CSS متقدم مع استجابة  
✅ JavaScript تفاعلي  
✅ نماذج مع تحقق  
✅ جداول وبيانات  
✅ نوافذ منبثقة  
✅ توثيق شامل  

### ما يمكن إضافته
❌ معالجة خادم backend  
❌ قاعدة بيانات حقيقية  
❌ مصادقة حقيقية  
❌ HTTPS/SSL  
❌ CDN  
❌ Analytics  
❌ A/B Testing  
❌ Push Notifications  

---

**آخر تحديث:** 7 يناير 2026  
**الإصدار:** v1.0  
**الحالة:** ✅ مكتمل

