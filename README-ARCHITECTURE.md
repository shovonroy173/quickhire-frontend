# QuickHire Job Board - Component Architecture

## 🏗️ Architecture Overview

This project follows the **Atomic Design Pattern** for component organization:

### Component Hierarchy
- **Atoms**: Basic building blocks (e.g., Button, Input, Text).
- **Molecules**: Combinations of atoms that form functional units (e.g., JobCard, SearchBar).
- **Organisms**: Complex sections of the UI composed of molecules (e.g., HeroSection, CompanyStrip).
- **Templates**: Page-level layouts that structure organisms  (e.g., HomeTemplate).
- **Screens**: Actual pages that use templates to render content (e.g., HomeScreen).
- **Hooks**: Custom React hooks for state management and logic (e.g., useJobs).
- **Types**: TypeScript interfaces and types for data structures (e.g., Job, Category, Company).
- **Utils**: Utility functions for formatting, validation, and responsive design. (e.g., responsiveWidth, spacing). 
- **Styles**: Global and component-specific styles (e.g., Tailwind CSS configuration).  
- **App Router**: Next.js 13+ file-based routing structure for page navigation. 
- **Skeletons**: Placeholder components for loading states (e.g., JobCardSkeleton). 

## 📁 Directory Structure
```src/
├── app/
│   ├── layout.tsx        
│   ├── page.tsx
│   ├── jobs/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
├── components/
│   ├── atoms/
│   │   ├── Button/     
│   │   ├── Input/
│   │   └── ...
│   ├── molecules/    
│   │   ├── JobCard/  
│   │   ├── SearchBar/
│   │   └── ...
│   ├── organisms/
│   │   ├── HeroSection/
│   │   ├── CompanyStrip/     
│   │   └── ...
│   ├── templates/
│   │   ├── HomeTemplate/
│   │   └── MainLayout/   
│   └── index.ts
├── hooks/        
│   ├── useJobs.ts
│   └── ...   
├── types/
│   ├── job.types.ts      
│   ├── category.types.ts
│   └── company.types.ts      
├── utils/
│   ├── responsive/
│   │   ├── responsiveWidth.ts      
│   │   └── spacing.ts
│   └── index.ts
├── styles/     
│   └── globals.css
├── tailwind.config.js
└── README-ARCHITECTURE.md  
``` 

## 🧩 Component Details
### Atoms 
- **Button**: Reusable button component with variants and sizes.
- **Input**: Reusable input field with label, error handling, and icons.
- **Text**: Reusable text component for consistent typography.    
### Molecules
- **JobCard**: Displays job information in a card format.   
- **SearchBar**: Combines input fields for job search and location.
- **CategoryCard**: Displays job category information.    


### Organisms   
- **HeroSection**: Top section of the homepage with search functionality.
- **CompanyStrip**: Displays logos of partner companies.
- **CategoryGrid**: Displays job categories in a grid layout.   
### Templates   
- **HomeTemplate**: Layout for the homepage combining multiple organisms.   
- **MainLayout**: Overall page layout with header and footer.   
### Screens
- **HomeScreen**: Main landing page of the application.     
- **JobsScreen**: Page displaying job listings. 

- **JobDetailScreen**: Page displaying detailed information about a specific job.   
### Hooks
- **useJobs**: Custom hook for fetching and managing job data.
### Types   
- **Job**: Interface representing a job listing.
- **Category**: Interface representing a job category.      
- **Company**: Interface representing a company.   
### Utils   
- **responsiveWidth**: Utility function for generating responsive width classes.            
- **spacing**: Utility function for consistent spacing values.   
### Styles      
- Global styles using Tailwind CSS with custom configurations.   
### App Router                    
- Next.js 13+ file-based routing for page navigation.   
### Skeletons
- Placeholder components for loading states (e.g., JobCardSkeleton).    
## 🚀 Conclusion
This architecture promotes modularity, reusability, and maintainability by organizing components based on their
complexity and role in the UI. It allows for easy scalability as the application grows, while keeping the codebase clean and organized.
