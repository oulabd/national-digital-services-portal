# Quick Reference: Ministry of Health Admin Portal

## 🚀 Quick Start

**URL**: `health-admin.html`

**Access From**:
- Click "وزارة الصحة" button in Super Admin Dashboard
- Direct navigation to `health-admin.html`

---

## 📱 Main Sections

| Icon | Section | Purpose |
|------|---------|---------|
| 🏥 | Dashboard | Overview & metrics |
| 🏗️ | Facilities | Hospital & center management |
| 🔬 | Departments | Department administration |
| 👨‍⚕️ | Staff | Medical professional management |
| 📅 | Appointments | Appointment oversight |
| 📋 | Records | Medical record review (read-only) |
| 📊 | Reports | Generate & export reports |

---

## 🎯 Key Actions

### **Add New Entity**
- Click "➕" button in section header
- Fill form in modal
- Click "حفظ" (Save)
- Success message appears

### **Edit Entity**
- Click "✏️" button in table row
- Update fields in modal
- Click "حفظ" (Save)

### **Delete Entity**
- Click "🗑️" button in table row
- Confirm in dialog
- Entity removed from list

### **Search/Filter**
- Type in search box
- Results filter in real-time
- Use dropdowns to filter by type

### **Export Data**
- Click export button in Reports section
- Select data type
- CSV file downloads automatically

### **Print**
- Click "🖨️ طباعة" in sidebar
- Modals hide automatically
- Print with Ctrl+P

---

## 📊 Demo Data Summary

- **5 Facilities**: Mix of hospitals and health centers
- **5 Departments**: Across different facilities
- **5 Medical Staff**: Various specializations
- **5 Appointments**: Different statuses
- **5 Medical Records**: Read-only access

---

## 🔐 Permission Levels

| Action | Facilities | Depts | Staff | Appts | Records |
|--------|-----------|-------|-------|-------|---------|
| View | ✅ | ✅ | ✅ | ✅ | ✅ |
| Add | ✅ | ✅ | ✅ | ❌ | ❌ |
| Edit | ✅ | ✅ | ✅ | ⚠️* | ❌ |
| Delete | ✅ | ✅ | ✅ | ✅ | ❌ |

*Appointments: Can only confirm/cancel, not edit directly

---

## 📝 Form Fields

### **Facility Form**
- Name, Type, City, Beds, Staff, Status

### **Department Form**
- Name, Facility, Staff Count, Status

### **Staff Form**
- Name, Specialization, Facility, License #, Status

---

## 🎨 Color Codes

- 🟢 Green = Active/Confirmed
- 🟠 Orange = Pending/Warning
- 🔴 Red = Inactive/Cancelled
- 🔵 Blue = Info/System

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Escape | Close modal |
| Ctrl+P | Print page |
| Tab | Navigate forms |

---

## 🔄 Navigation

**Sidebar Links**:
- 🏠 Go to Dashboard (index.html)
- 🖨️ Print current page

**From Super Admin**:
- View Ministry button links here directly

**Logout**:
- Click "تسجيل الخروج" (Logout)
- Returns to login page

---

## ⚠️ Important Notes

1. **Medical Records**: Read-only access only
2. **Deletions**: All require confirmation
3. **Search**: Works across all visible fields
4. **Responsive**: Auto-adjusts on mobile
5. **Print**: Optimized for paper output

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Modal won't close | Click X button or outside modal |
| Search not working | Clear and try again |
| Form won't submit | Check required fields |
| Data not updating | Refresh page |

---

## 📞 Contact

For issues or questions about the Ministry of Health Admin Portal, refer to main documentation or contact system administrator.

**Status**: ✅ Production Ready
**Last Updated**: January 2026
