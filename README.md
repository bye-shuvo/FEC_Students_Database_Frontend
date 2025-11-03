# FEC Students Database Frontend

React + Vite frontend for the Students Database application.

### Features
- Student search with filters (registration number, department, batch)
- Pageless modal for search results with expandable student details
- Multi‑step student registration form with validation
- Toast notifications for confirmations and messages
- Responsive UI styled with Tailwind CSS
- Clean, accessible components and semantic HTML

## Folder structure
```
public/
  vite.svg

src/
  assets/
    data-searching.png
    fecdb-favicon.svg
    form_header_photo.svg
    form-body.svg
    no-result-found.svg
    searched-result-found.svg
  App.jsx          # App shell: search/add tabs, orchestrates modals
  Form.jsx         # Multi-step registration form with validation
  Result.jsx       # Search results modal with expandable details
  Toast.jsx        # Reusable toast notification component
  main.jsx         # App entry and bootstrap
  index.css        # TailwindCSS and base styles
index.html         # Root HTML template
```

## Overall benefits
- Fast and lightweight frontend powered by Vite
- Intuitive student discovery and registration workflows
- Consistent, responsive design for desktop and mobile
- Modular components that are easy to extend and maintain
- Clear separation of concerns and assets for smooth development

## License
This project is for educational use within the FEC Students Database context.
