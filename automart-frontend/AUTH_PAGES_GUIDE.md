# 🔐 Login & Signup Pages

## ✨ Overview

Two separate authentication pages with clean forms, validation, and navigation!

---

## 📁 File Structure

```
src/
├── pages/
│   ├── Login.jsx       # Login page component
│   └── Signup.jsx      # Signup page component
├── App.jsx             # Updated with routing
└── AdPopup.jsx         # Existing popup
```

---

## 🔑 Login Page (`Login.jsx`)

### Features:
- ✅ Email input with icon
- ✅ Password input with show/hide toggle
- ✅ Remember me checkbox
- ✅ Forgot password link
- ✅ Form validation
- ✅ Social login buttons (Google, Facebook)
- ✅ Link to signup page
- ✅ Back to home button

### Form Fields:
1. **Email** - Required, email validation
2. **Password** - Required, show/hide toggle

### Design:
- Blue gradient theme
- Car icon in header
- Clean white form card
- Shadow and rounded corners
- Responsive layout

### Navigation:
- "Sign Up" → Goes to signup page
- "Back to Home" → Returns to homepage
- Submit → Shows success alert (demo)

---

## 📝 Signup Page (`Signup.jsx`)

### Features:
- ✅ Full name input
- ✅ Email input
- ✅ Phone number input
- ✅ Password input with show/hide toggle
- ✅ Confirm password with validation
- ✅ Terms & conditions checkbox
- ✅ Form validation
- ✅ Social signup buttons (Google, Facebook)
- ✅ Link to login page
- ✅ Back to home button

### Form Fields:
1. **Full Name** - Required
2. **Email** - Required, email validation
3. **Phone** - Required
4. **Password** - Required, min 6 characters
5. **Confirm Password** - Must match password

### Design:
- Purple gradient theme
- Car icon in header
- Clean white form card
- Shadow and rounded corners
- Responsive layout

### Validation:
- All fields required
- Password minimum 6 characters
- Passwords must match
- Terms must be accepted

### Navigation:
- "Sign In" → Goes to login page
- "Back to Home" → Returns to homepage
- Submit → Shows success alert (demo)

---

## 🔄 Routing in App.jsx

### How It Works:

```javascript
const [currentPage, setCurrentPage] = useState('home');

// Conditional rendering
if (currentPage === 'login') {
  return <Login onNavigate={setCurrentPage} />;
}

if (currentPage === 'signup') {
  return <Signup onNavigate={setCurrentPage} />;
}

// Regular pages with navbar/footer
return (
  <div>
    <Navbar />
    <main>
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'cars' && <CarsPage />}
      ...
    </main>
    <Footer />
  </div>
);
```

### Pages Available:
1. **home** - Homepage
2. **cars** - Browse cars
3. **services** - Services page
4. **about** - About us
5. **contact** - Contact page
6. **login** - Login page (no navbar/footer)
7. **signup** - Signup page (no navbar/footer)

---

## 🎨 Design Features

### Login Page:
- **Color:** Blue gradient
- **Icon:** Blue car icon
- **Button:** Blue gradient
- **Social:** Google & Facebook
- **Layout:** Centered, max-width 28rem

### Signup Page:
- **Color:** Purple gradient
- **Icon:** Purple car icon
- **Button:** Purple to pink gradient
- **Social:** Google & Facebook
- **Layout:** Centered, max-width 28rem

### Common Features:
- ✅ Icon inputs (Mail, Lock, User, Phone)
- ✅ Show/hide password toggle
- ✅ Form validation with error messages
- ✅ Social login/signup buttons
- ✅ Navigation links
- ✅ Responsive design
- ✅ Hover effects
- ✅ Shadow and rounded corners

---

## 🔐 Form Validation

### Login Validation:
```javascript
- Email required
- Password required
```

### Signup Validation:
```javascript
- Name required
- Email required
- Phone required
- Password required (min 6 chars)
- Confirm password must match
- Terms must be accepted
```

### Error Display:
- Red border on invalid fields
- Error message below field
- Clears on input change

---

## 🎯 User Flow

### New User:
1. Click "Sign Up" in navbar
2. Fill signup form
3. Submit → Success message
4. Redirected to login
5. Login with credentials
6. Access full website

### Existing User:
1. Click "Login" in navbar
2. Fill login form
3. Submit → Success message
4. Redirected to home
5. Browse website

### Navigation:
- From Login → Signup (link at bottom)
- From Signup → Login (link at bottom)
- From Auth → Home (back button)
- From Navbar → Login/Signup (buttons)

---

## 📱 Responsive Design

### Desktop:
- Centered form
- Max width 28rem
- Full padding
- Large text

### Mobile:
- Full width with padding
- Stacked inputs
- Touch-friendly buttons
- Readable text

---

## 🎨 Color Schemes

### Login:
```css
Background: from-blue-50 via-white to-purple-50
Icon: bg-blue-600
Button: from-blue-600 to-indigo-600
Links: text-blue-600
```

### Signup:
```css
Background: from-purple-50 via-white to-blue-50
Icon: bg-purple-600
Button: from-purple-600 to-pink-600
Links: text-purple-600
```

---

## 🔧 Customization

### Change Colors:
```javascript
// In Login.jsx
className="bg-blue-600" → className="bg-green-600"

// In Signup.jsx
className="bg-purple-600" → className="bg-red-600"
```

### Add Fields:
```javascript
<div>
  <label>New Field</label>
  <input
    type="text"
    value={formData.newField}
    onChange={(e) => setFormData({...formData, newField: e.target.value})}
  />
</div>
```

### Change Validation:
```javascript
if (formData.password.length < 8) {
  newErrors.password = 'Password must be at least 8 characters';
}
```

---

## 🚀 To See It

```bash
npm run dev
```

Then:
1. Click "Login" in navbar → See login page
2. Click "Sign Up" in navbar → See signup page
3. Click links to navigate between pages
4. Fill forms and submit (demo alerts)

---

## ✨ Summary

You now have:
- ✅ **Login page** with email/password
- ✅ **Signup page** with full registration
- ✅ **Form validation** with error messages
- ✅ **Password show/hide** toggle
- ✅ **Social login** buttons (Google, Facebook)
- ✅ **Navigation** between pages
- ✅ **Responsive design** for all devices
- ✅ **Clean, modern UI** with gradients
- ✅ **Separate routing** in App.jsx

**Your website now has complete authentication pages! 🔐✨**
