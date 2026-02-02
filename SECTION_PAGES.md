# 📄 Section Detail Pages

Each section now has a dedicated page with preview, code, and CLI installation instructions - just like Aceternity UI!

## 🎯 Features

### 1. **Dedicated Routes**
Every section has its own URL:
- `/sections/ecommerce-hero`
- `/sections/portfolio-hero`
- `/sections/restaurant-menu`
- `/sections/saas-pricing`

### 2. **Three Tabs**

#### 🎨 Preview Tab
- Live component preview
- Full metadata display
- Dependency list
- Tags and details
- Complexity indicators
- Dark mode & responsive info

#### 💻 Code Tab
- Syntax-highlighted code
- Three files displayed:
  - `component.tsx` - Main component
  - `metadata.ts` - Section metadata
  - `preview-data.ts` - Sample data
- Copy button for each file
- Line numbers for easy reference

#### 🚀 CLI Tab
- Quick install command (coming soon)
- Manual installation steps:
  1. Install NPM dependencies
  2. Install Shadcn components
  3. Copy component file
  4. Import and use
- Copy-to-clipboard for all commands
- Usage example code

## 📍 Navigation

### From Showcase
1. **Hover over any section** → "View Details" button appears
2. **Click the button** → Opens section detail page

### From Sidebar
1. **Hover over a section name** → External link icon appears
2. **Click the icon** → Opens section detail page in same tab

### From Sections Library
1. Visit `/sections` to see all sections in a grid
2. Click any card to view details

### Direct URL
Simply navigate to `/sections/{section-id}`

## 🎨 UI Components

### Code Block
- Syntax highlighting with `react-syntax-highlighter`
- Dark theme (VS Code Dark+)
- Line numbers
- Copy button (shows "Copied" feedback)
- Hover-activated controls
- Filename display
- Scrollable for long code

### Header
- Back to Showcase button
- Section name and description
- Metadata badges:
  - Domain (e.g., "ecommerce")
  - Category (e.g., "hero")
  - Tier (free/pro)

### Tabs
- Icon + label for each tab
- Active state highlighting
- Keyboard accessible

## 📁 File Structure

```
app/sections/
├── page.tsx                    # Sections library grid
├── [id]/
│   ├── page.tsx               # Server component (data fetching)
│   ├── section-detail-client.tsx  # Client component (UI)
│   └── not-found.tsx          # 404 page

components/
└── code-block.tsx             # Reusable code display

lib/sections/
└── get-source-code.ts         # Server-side file reading
```

## 🔧 Technical Details

### Server-Side Rendering
- Section data fetched on the server
- Source code read from files
- Static params generated at build time
- Fast page loads with RSC

### Client-Side Interactivity
- Tab switching
- Copy to clipboard
- Hover effects
- Smooth transitions

### Code Display
- Uses `react-syntax-highlighter`
- Theme: VS Code Dark+
- Supports multiple languages:
  - TypeScript/TSX
  - Bash/Shell
  - JSON

## 🚀 Usage Examples

### Navigating to a Section
```typescript
// From a Link component
<Link href="/sections/ecommerce-hero">
  View E-Commerce Hero
</Link>

// Programmatically
router.push('/sections/ecommerce-hero');
```

### Copying Installation Commands
1. Click the CLI tab
2. Hover over code block
3. Click "Copy" button
4. Paste in your terminal

### Viewing Code
1. Click the Code tab
2. Scroll through component.tsx
3. Click "Copy" to copy entire file
4. Paste in your project

## 🎯 Best Practices

### For Users
1. **Explore from Sections page** (`/sections`) to see all available sections
2. **Use Showcase** (`/showcase`) to see sections in action
3. **Copy CLI commands** from the CLI tab for quick setup
4. **View code** in the Code tab to understand implementation

### For Developers
1. Keep source code files readable and well-formatted
2. Ensure preview-data.ts has realistic sample data
3. Write clear descriptions in metadata
4. List all dependencies accurately

## 🔗 Related Pages

- `/sections` - Grid view of all sections
- `/showcase` - Side-by-side preview of all sections
- `/sections/[id]` - Individual section detail page

## 📱 Responsive Design

All section detail pages are fully responsive:
- Mobile: Stacked layout, full-width code
- Tablet: Comfortable reading width
- Desktop: Wide code blocks, side padding

## 🎨 Dark Mode

Full dark mode support:
- Syntax highlighting adapts
- UI elements follow theme
- Code blocks use dark theme
- Proper contrast ratios

## ⚡ Performance

- **Static Generation**: Pages pre-rendered at build time
- **Code Splitting**: Only loads what's needed
- **Lazy Loading**: Syntax highlighter loads on demand
- **Optimized**: Fast Time to Interactive (TTI)

## 🧪 Testing

Test your section pages:
1. Visit `/sections` - Should show all sections in grid
2. Click a section card - Should open detail page
3. Switch between tabs - Should be instant
4. Copy code - Should show "Copied" feedback
5. Test on mobile - Should be fully responsive
6. Toggle dark mode - Should look good in both themes

## 🐛 Troubleshooting

**Section not found?**
- Check section is registered in `lib/sections/registry.ts`
- Verify section ID matches exactly
- Try `/sections` to see all available IDs

**Code not displaying?**
- Check file exists at correct path
- Verify folder mapping in `get-source-code.ts`
- Check console for file read errors

**Copy not working?**
- Ensure HTTPS (clipboard API requires secure context)
- Check browser permissions
- Try on a different browser

**Styling issues?**
- Clear Next.js cache: `rm -rf .next`
- Restart dev server
- Check Tailwind CSS is processing correctly

## 🎉 What's Next?

Future enhancements:
- [ ] Live code editor
- [ ] Multiple preview modes (mobile, tablet, desktop)
- [ ] Direct copy to project via CLI
- [ ] Version history
- [ ] Community contributions
- [ ] Search and filters
- [ ] Related sections suggestions
