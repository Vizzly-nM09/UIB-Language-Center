# 🎓 UCLC Help System Documentation

## 📋 Overview

Complete help system with 4 major components designed to guide users through the UCLC admin platform. The system includes:

1. **Modal/Popover Help** - Comprehensive help modal with step-by-step guide
2. **Tooltip + Inline Help** - Contextual tooltips and inline help badges
3. **Guided Tour** - Step-by-step interactive walkthrough with element highlighting
4. **Help Sidebar** - Persistent right-side panel with quick access to help

---

## 🏗️ Architecture

### Context & State Management
- **File**: `src/contexts/help-context.tsx`
- Manages all help system state globally using React Context
- State includes: modal visibility, tour progress, sidebar state, active tooltips

### Help Content
- **File**: `src/constants/help-content.ts`
- Centralized repository for all help content
- Supports 6 pages: dashboard, score-test, upload-center, management-user, management-modul, management-usergroup
- Each page includes: title, description, steps, and tooltips

### Components
Located in `src/components/help-system/`

#### 1. HelpModal.tsx
Opens when user clicks help icon in header. Shows complete guide with all steps and tips.

**Features:**
- Numbered steps with descriptions
- Text-to-speech audio for accessibility
- Organized tips section
- Styled with gradient header

#### 2. HelpTooltip.tsx
Three sub-components:
- `HelpTooltip` - Positioned tooltip on hover/click
- `InlineHelp` - Full-width info box with icon and description
- `HelpHint` - Small circular help icon with popup

**Features:**
- Smart positioning (top/bottom/left/right)
- Works on hover or click
- Accessible with keyboard

#### 3. GuidedTour.tsx
Interactive step-by-step walkthrough highlighting page elements.

**Features:**
- Element highlighting with overlay
- Auto-scroll to current element
- Progress bar showing step completion
- Previous/Next navigation
- Exit anytime

#### 4. HelpSidebar.tsx
Collapsible right-side panel with help content.

**Features:**
- Toggle button (fixed bottom-right corner)
- Quick action buttons (Start Tour, Close)
- Step list with descriptions
- Tips preview
- Smooth slide-in animation

---

## 📖 How to Use

### For Users

#### 1. View Help Modal
- Click the question mark **?** icon (HelpCircle) in the header
- See complete guide for current page
- Read through all steps and tips

#### 2. Interactive Tour
- In Help Modal: Click "Start Tour" button in Sidebar
- Or: Click **?** button (bottom-right) → "Mulai Tour"
- Follow highlighted elements step-by-step
- Use Previous/Next to navigate

#### 3. Tooltips
- Hover over buttons/fields with help icons
- See contextual tooltip text
- Some fields have **?** buttons for additional info

#### 4. Quick Reference
- Click **?** button (bottom-right) to open Help Sidebar
- Quick overview of all page steps
- Tips section with useful hints
- One-click access to start tour

### For Developers

#### Adding Help to a New Page

1. **Create new entry in help content**:
```typescript
// src/constants/help-content.ts
export const HELP_CONTENT: Record<string, PageHelp> = {
  'my-new-page': {
    pageKey: 'my-new-page',
    title: 'My Page Title',
    description: 'Page description...',
    steps: [
      {
        id: 'step-1',
        title: 'Step 1 Title',
        description: 'Detailed description...',
        element: '[data-help="element-id"]', // Optional: for tour
      },
      // More steps...
    ],
    tooltips: {
      'button-1': 'Tooltip for button 1',
      'field-1': 'Tooltip for field 1',
      // More tooltips...
    },
  },
};
```

2. **Update layout pathname mapping**:
```typescript
// src/app/(main)/layout.tsx
if (segments.includes('my-new-page')) pageKey = 'my-new-page';
```

3. **Add data-help attributes to elements** (for tour highlighting):
```tsx
<div data-help="element-id">Content</div>
```

4. **Use Tooltip components**:
```tsx
import { HelpTooltip, InlineHelp, HelpHint } from '@/components/help-system';

// Tooltip on hover
<HelpTooltip
  trigger={<button>Click me</button>}
  content="This is helpful info"
  position="top"
/>

// Inline help box
<InlineHelp
  title="Need help?"
  content="Here's what this section does..."
  icon="🎯"
/>

// Small help hint
<HelpHint content="Quick tip about this field" />
```

#### Using Help Context in Components

```typescript
import { useHelp } from '@/contexts/help-context';

export function MyComponent() {
  const {
    openModal,      // Open help modal
    closeModal,     // Close help modal
    startTour,      // Start guided tour
    endTour,        // End guided tour
    toggleSidebar,  // Toggle sidebar
    showTooltip,    // Show specific tooltip
    hideTooltip,    // Hide tooltip
  } = useHelp();

  return (
    <button onClick={openModal}>
      Help
    </button>
  );
}
```

---

## 📄 Pages with Help Content

### 1. Dashboard (`dashboard`)
- Filter data explanation
- Stat cards overview
- Tren grafik interpretation
- Rasio kelulusan details
- Student table guide

### 2. Score Test (`score-test`)
- Form upload guide
- Date picker usage
- Submit process
- Submission status tracking

### 3. Upload Center (`upload-center`)
- Submenu explanation
- Template download
- File upload process
- Validation and confirmation

### 4. Management User (`management-user`)
- Search functionality
- User cards explanation
- Create new user
- Edit user information
- Delete user process

### 5. Management Modul (`management-modul`)
- Modul cards overview
- Creating new modules
- Icon picker with boxicons
- Main menu toggle
- Edit and delete operations

### 6. Management Usergroup (`management-usergroup`)
- Usergroup cards
- Creating new groups
- Admin vs Staff levels
- Module assignment
- Edit and delete operations

---

## 🎨 Styling

All components use:
- **Color scheme**: Purple (#9969ff) as primary
- **Tailwind CSS** for utility classes
- **Lucide React** for icons
- **Responsive design** for mobile/tablet

---

## 🔧 Configuration

### Modify Help Content
Edit `src/constants/help-content.ts` to change:
- Step descriptions
- Tooltip texts  
- Page titles and descriptions
- Add new pages or steps

### Customize Colors
Update color classes in components:
- Primary: `#9969ff` → `bg-[#9969ff]`
- Secondary: `#8651ff`
- Accent colors as needed

### Add Audio Support
Already built-in! Text-to-speech triggers on:
- Read aloud button in modal
- Uses Web Speech API

---

## 📱 Accessibility Features

✅ **Text-to-Speech** - Read content aloud  
✅ **Keyboard Navigation** - Previous/Next with arrow keys  
✅ **Focus Management** - Proper focus states  
✅ **Color Contrast** - WCAG compliant  
✅ **Semantic HTML** - Proper heading hierarchy  
✅ **Tooltips** - Clear, positioned help text  

---

## 🚀 Implementation Status

✅ Help Context & State Management  
✅ Help Modal Component  
✅ Help Tooltip Components  
✅ Guided Tour Component  
✅ Help Sidebar Component  
✅ Comprehensive Help Content  
✅ Integration in Layout  
✅ Header Integration  

---

## 📞 Support

For extending the help system:
1. Update `help-content.ts` with new pages
2. Add `data-help` attributes to page elements  
3. Update pathname mapping in `(main)/layout.tsx`
4. Use `HelpTooltip` components for contextual hints

---

**Last Updated**: February 23, 2026
**Version**: 1.0.0
