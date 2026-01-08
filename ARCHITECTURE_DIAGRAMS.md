# 🎨 Layout Architecture - Visual Diagrams & Flow

## 📐 Desktop Layout (≥ 769px)

```
╔════════════════════════════════════════════════════════════════╗
║                        HEADER (Grid: 1)                        ║
║    [Logo] [Menu☰ Hidden] [User Info] [Logout Button]           ║
╠════════════════════════════════════════════════════════════════╦════════════╗
║                                                                ║            ║
║                      MAIN CONTENT                              ║  SIDEBAR   ║
║                   (Grid: Column 1)                             ║ (Grid: C2) ║
║                                                                ║            ║
║    - Full responsive width                                    ║  280px     ║
║    - Auto grid columns                                        ║  Fixed     ║
║    - Service cards, tables, forms                             ║  Right     ║
║    - Takes up all available space                             ║  Full Ht   ║
║                                                                ║            ║
║                                                                ║ Navigation ║
║                                                                ║   Links:   ║
║                                                                ║   🏠 Home  ║
║                                                                ║   🏥 Health║
║                                                                ║   🚗 Traffic
║                                                                ║   🎓 University
║                                                                ║   📚 School
║                                                                ║   ✈️ Tourism
║                                                                ║   ⚙️ Settings
║                                                                ║   ❓ Help   ║
║                                                                ║            ║
╚════════════════════════════════════════════════════════════════╩════════════╝

Grid Structure:
body {
  display: grid;
  grid-template-columns: 1fr 280px;
  grid-template-rows: auto 1fr;
  grid-gap: 0; /* No gap, sidebar fixed */
}
```

---

## 📱 Mobile Layout (≤ 768px)

### Sidebar Collapsed (Default)
```
╔════════════════════════════╗
║  HEADER (Grid: 1)          ║
║ [Logo] [Menu☰] [User Info] ║
╠════════════════════════════╣
║    SIDEBAR (Grid: 2)       ║ ← max-height: 0 (Hidden)
║ (Collapsed - Not shown)    ║
╠════════════════════════════╣
║                            ║
║   MAIN CONTENT (Grid: 3)   ║
║   (Full Width)             ║
║                            ║
║   - All service content    ║
║   - Single column grid     ║
║   - Responsive sizing      ║
║                            ║
╚════════════════════════════╝

Grid Structure (Mobile):
body {
  display: grid;
  grid-template-columns: 1fr;          /* Single column */
  grid-template-rows: auto auto 1fr;   /* 3 rows */
}
```

### Sidebar Expanded (User Clicked ☰)
```
╔════════════════════════════╗
║  HEADER (Grid: 1)          ║
║ [Logo] [Menu☰] [User Info] ║
╠════════════════════════════╣
║    SIDEBAR (Grid: 2)       ║ ← max-height: 500px (Expanded)
║  🏠 الرئيسية               ║ ← Navigation visible
║  🏥 صحتي                  ║
║  🚗 المخالفات             ║
║  🎓 الجامعات              ║
║  📚 المدارس               ║
║  ✈️ السياحة               ║
║  ⚙️ الإعدادات              ║
║  ❓ المساعدة               ║
╠════════════════════════════╣
║                            ║
║   MAIN CONTENT (Grid: 3)   ║
║   (Full Width)             ║
║                            ║
╚════════════════════════════╝

Animation:
Transition: max-height 0.3s ease
From: max-height: 0
To:   max-height: 500px
```

---

## 🔄 Responsive Breakpoints Flow

```
                VIEWPORT WIDTH
                      |
        ______________|______________
       |                             |
   ≤ 768px                      ≥ 769px
   (Mobile)                   (Desktop)
       |                             |
       |                             |
  ┌────────────────┐          ┌──────────────┐
  │ Single Column  │          │ Two Columns  │
  │ Layout         │          │ Layout       │
  ├────────────────┤          ├──────────────┤
  │ Header         │          │ Header       │
  │ Sidebar        │          │ Main Content │
  │ (Collapsed)    │          │              │
  │ Content        │          │ Sidebar      │
  │ (Full Width)   │          │ (280px Fixed)│
  │                │          │              │
  │ Menu Button:   │          │ Menu Button: │
  │ ☰ Visible      │          │ ☰ Hidden    │
  └────────────────┘          └──────────────┘
```

---

## 🎯 Component Hierarchy

```
<html dir="rtl">
├── <body> (Grid Container)
│   ├── <header> (Grid: 1,1)
│   │   └── .header-content (Flex RTL)
│   │       ├── .logo
│   │       └── .header-actions (Flex RTL)
│   │           ├── .menu-toggle (☰) ← Mobile only
│   │           ├── User Info
│   │           └── .logout-btn
│   │
│   ├── <aside> (Grid: 2,1/-1) ← Fixed RIGHT
│   │   └── .sidebar-nav
│   │       ├── .sidebar-title
│   │       ├── <li> → <a> (Active on current page)
│   │       ├── <li> → <a>
│   │       ├── <li> → <a>
│   │       └── ... (9 links total)
│   │
│   └── <main> (Grid: 1,2)
│       └── Page-specific content
│           ├── Cards
│           ├── Tables
│           ├── Forms
│           └── ...
│
└── <script src="js/main.js"></script>
```

---

## 📐 CSS Grid Structure

### Desktop Grid
```
                    Column 1           Column 2
                  (Main Area)         (Sidebar)
              ────────────────────┬──────────────
Row 1         │                  │
(Header)      │    HEADER        │  (Empty)
              ├──────────────────┼──────────────
Row 2         │                  │
(Content)     │                  │   SIDEBAR
              │  MAIN CONTENT    │  (Fixed)
              │                  │
              │                  │
              └──────────────────┴──────────────

grid-template-columns: 1fr 280px;
grid-template-rows: auto 1fr;
```

### Mobile Grid
```
Column 1 (100%)
───────────────────
│      Row 1       │
│     HEADER       │
│ [Logo] [☰] [Info]│
├──────────────────┤
│      Row 2       │ ← max-height: 0/500px
│     SIDEBAR      │ ← Collapsed/Expanded
│  (Navigation)    │ ← Hidden by default
├──────────────────┤
│      Row 3       │
│ MAIN CONTENT     │
│  (Full Width)    │
│                  │
└──────────────────┘

grid-template-columns: 1fr;
grid-template-rows: auto auto 1fr;
```

---

## 🔀 RTL Flow Direction

### Header Layout (Row-Reverse)
```
Default (LTR):  [Logo] [Space] [User Info] [Logout]
RTL Reversed:   [Logout] [User Info] [Space] [Logo]

Implemented:
<header>
  <div class="header-content" style="flex-direction: row-reverse;">
    <div class="logo">...</div>                    ← RIGHT side
    <div class="header-actions" style="flex-direction: row-reverse;">
      <button class="menu-toggle">☰</button>      ← LEFT side (first)
      <div>User Info</div>                         ← Middle
      <button class="logout-btn">...</button>     ← RIGHT side (last)
    </div>
  </div>
</header>
```

### Sidebar Navigation (Right-Aligned)
```
Desktop View (RTL):
┌─ Sidebar (280px Fixed Right) ─┐
│                                │
│ القائمة الرئيسية              │ ← Title RIGHT
│ ┌────────────────────────────┐ │
│ │ 🏠 الرئيسية               │ ← Icon | Text
│ │                            │    (Icon BEFORE for RTL)
│ ├────────────────────────────┤
│ │ 🏥 صحتي                   │
│ │                            │
│ └────────────────────────────┘
│                                │
│ border-right: 4px solid        │ ← Border on RIGHT
│                                │
└────────────────────────────────┘
```

---

## 🎬 Interaction Flow

### Desktop (No Interaction)
```
Page Load
   ↓
Initialize App
   ↓
Setup Event Listeners
   ↓
Check Window Width (≥ 769px)
   ↓
Menu Button: Hidden (display: none)
Sidebar: Always Visible
   ↓
User Navigation
   ↓
Click Navigation Link
   ↓
Navigate to New Page
   ↓
Sidebar Remains Visible
```

### Mobile (Interactive)
```
Page Load
   ↓
Initialize App
   ↓
Setup Event Listeners
   ↓
Check Window Width (≤ 768px)
   ↓
Menu Button: Visible (☰)
Sidebar: Hidden (max-height: 0)
   ↓
User Clicks Menu Button (☰)
   ↓
setupMobileSidebar() Function
   ├─ Toggle 'active' class
   └─ Transition: max-height 0 → 500px
   ↓
Sidebar Slides In (0.3s ease)
   ↓
User Clicks Navigation Link
   ↓
Navigate to New Page
   ↓
Sidebar Auto-Closes
   ├─ Check: window.innerWidth ≤ 768px
   ├─ Remove 'active' class
   └─ Transition: max-height 500px → 0
   ↓
Page Loads with Sidebar Hidden
```

---

## 🔐 CSS Specificity Stack

### For Sidebar (Layering)
```
Layer 1: Base Styles
  └─ aside { position: fixed; right: 0; width: 280px; ... }

Layer 2: Mobile Override (@media ≤ 768px)
  └─ aside { position: relative; right: auto; width: 100%; max-height: 0; }

Layer 3: Active State
  └─ aside.active { max-height: 500px; }

JavaScript Hook:
  sidebar.classList.toggle('active')  ← Toggles between states
```

### For Navigation Links
```
Default State:
  .sidebar-nav a { 
    color: white;
    border-right: 4px solid transparent;
  }

Hover State:
  .sidebar-nav a:hover {
    border-right-color: var(--gold);
    background-color: rgba(200, 162, 74, 0.15);
  }

Active State:
  .sidebar-nav a.active {
    border-right-color: var(--gold);
    color: var(--gold);
  }
```

---

## 📊 State Machine

```
SIDEBAR STATES:

Desktop (≥769px):
  ┌─────────────────┐
  │   ALWAYS SHOWN  │
  │  max-height: ∞  │
  │  position: fixed│
  │  width: 280px   │
  └─────────────────┘

Mobile (≤768px):
  ┌──────────────────────────────────────┐
  │                                      │
  │ ┌─────────────────┐                 │
  │ │  COLLAPSED      │  ← Menu ☰ click │
  │ │  max-height: 0  │                 │
  │ │  position: rel  │                 │
  │ └────────┬────────┘                 │
  │          │ Transition 0.3s          │
  │          ↓                          │
  │ ┌─────────────────┐                 │
  │ │  EXPANDED       │  ← Link click   │
  │ │ max-height:500px│                 │
  │ │ .active class   │                 │
  │ └────────┬────────┘                 │
  │          │ Transition 0.3s          │
  │          ↓                          │
  │ ┌─────────────────┐                 │
  │ │  COLLAPSED      │  ← Back to start│
  │ │  max-height: 0  │                 │
  │ └─────────────────┘                 │
  │                                      │
  └──────────────────────────────────────┘
```

---

## 🎯 Z-Index Hierarchy

```
100 │ Modal / Overlay (top priority)
    │ ┌───────────────────────────┐
    │ │  .modal.active            │
    │ │  .modal-overlay           │
    │ │                           │
80  │ └───────────────────────────┘
    │
70  │ (Reserved for future modals)
    │
60  │
    │
50  │ ┌───────────────────────────┐
    │ │  <aside> (Sidebar)        │
    │ │  position: fixed          │
    │ │  z-index: 50              │
    │ └───────────────────────────┘
    │
40  │
    │
100 │ ┌───────────────────────────┐
 (header) │  <header>                 │
    │ │  position: sticky         │
    │ │  z-index: 100             │
    │ └───────────────────────────┘
    │
10  │ Normal content (forms, cards, etc.)
    │
1   │ Background

Result: Modals always on top > Sidebar > Header > Content
```

---

## ✅ Summary

The layout architecture uses:
- **CSS Grid** for main layout structure
- **Fixed Positioning** for sidebar (desktop)
- **Responsive Media Queries** for mobile adaptation
- **CSS Transitions** for smooth animations
- **JavaScript Classes** for state management
- **Flexbox** for component alignment (with RTL)

This creates a professional, maintainable, and user-friendly Arabic government portal interface.
