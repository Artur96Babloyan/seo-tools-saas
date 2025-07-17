# 🏗️ Feature-Sliced Design (FSD) Architecture

This document explains the Feature-Sliced Design architecture implementation in the AuditCraft SEO Tools SaaS project.

## 📁 Project Structure

```
src/
├── app/                    # 🎯 App Layer (Next.js App Router)
│   ├── api/               # API routes
│   ├── auth/              # Auth pages
│   ├── dashboard/         # Dashboard pages
│   ├── providers/         # App-level providers
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Root page
├── pages/                 # 📄 Pages Layer
│   ├── home/              # Home page
│   └── dashboard/         # Dashboard pages
├── widgets/               # 🧩 Widgets Layer
│   ├── header/            # Header widget
│   ├── sidebar/           # Sidebar widget
│   ├── footer/            # Footer widget
│   └── dashboard/         # Dashboard widgets
├── features/              # ⚡ Features Layer
│   ├── auth/              # Authentication feature
│   ├── seo-optimizer/     # SEO Content Optimizer
│   ├── page-speed/        # Page Speed Auditor
│   ├── sitemap/           # Sitemap Generator
│   ├── meta-tags/         # Meta Tag Validator
│   ├── keyword-tracker/   # Keyword Tracker
│   ├── competitor-analysis/ # Competitor Analysis
│   └── reports/           # Reports Management
├── entities/              # 🏢 Entities Layer
│   ├── user/              # User entity
│   ├── report/            # Report entity
│   └── analysis/          # Analysis entity
└── shared/                # 🔧 Shared Layer
    ├── ui/                # Shared UI components
    ├── lib/               # Shared utilities
    ├── api/               # Shared API utilities
    ├── types/             # Shared types
    └── config/            # Shared configuration
```

## 🎯 Layer Dependencies

The architecture follows strict dependency rules:

```
app → pages → widgets → features → entities → shared
```

- **App Layer**: Can import from all layers
- **Pages Layer**: Can import from widgets, features, entities, shared
- **Widgets Layer**: Can import from features, entities, shared
- **Features Layer**: Can import from entities, shared
- **Entities Layer**: Can import from shared only
- **Shared Layer**: Cannot import from any other layer

## 📋 Layer Descriptions

### 🎯 App Layer (`src/app/`)

- **Purpose**: Application configuration and routing
- **Contains**: Next.js App Router pages, layouts, providers
- **Dependencies**: All layers
- **Examples**: `layout.tsx`, `page.tsx`, API routes

### 📄 Pages Layer (`src/pages/`)

- **Purpose**: Page-level components and routing
- **Contains**: Page components, page-specific logic
- **Dependencies**: widgets, features, entities, shared
- **Examples**: `HomePage`, `DashboardPage`

### 🧩 Widgets Layer (`src/widgets/`)

- **Purpose**: Complex UI components composed of features
- **Contains**: Reusable UI blocks, business logic composition
- **Dependencies**: features, entities, shared
- **Examples**: `Sidebar`, `Header`, `Dashboard`

### ⚡ Features Layer (`src/features/`)

- **Purpose**: Business features and user actions
- **Contains**: Feature-specific components, logic, API calls
- **Dependencies**: entities, shared
- **Examples**: `SeoOptimizer`, `KeywordTracker`, `PageSpeed`

### 🏢 Entities Layer (`src/entities/`)

- **Purpose**: Business entities and domain models
- **Contains**: Entity types, UI components, API services
- **Dependencies**: shared only
- **Examples**: `User`, `Report`, `Analysis`

### 🔧 Shared Layer (`src/shared/`)

- **Purpose**: Reusable utilities and components
- **Contains**: UI components, utilities, types, configuration
- **Dependencies**: None (base layer)
- **Examples**: `Button`, `Input`, `utils`, `constants`

## 📁 Feature Structure

Each feature follows a consistent structure:

```
feature-name/
├── model/                 # Business logic and state
│   ├── types.ts          # Feature-specific types
│   ├── store.ts          # State management
│   └── selectors.ts      # State selectors
├── ui/                   # UI components
│   ├── ComponentName.tsx # Feature components
│   └── index.ts          # UI exports
├── api/                  # API integration
│   ├── featureApi.ts     # API services
│   └── index.ts          # API exports
└── index.ts              # Feature exports
```

## 🏢 Entity Structure

Each entity follows a consistent structure:

```
entity-name/
├── model/                # Entity models
│   ├── types.ts          # Entity types
│   └── store.ts          # Entity state
├── ui/                   # Entity UI components
│   ├── EntityComponent.tsx
│   └── index.ts
├── api/                  # Entity API services
│   ├── entityApi.ts
│   └── index.ts
└── index.ts              # Entity exports
```

## 🔧 Shared Layer Structure

```
shared/
├── ui/                   # Shared UI components
│   ├── button/
│   ├── input/
│   ├── modal/
│   ├── card/
│   ├── loading/
│   ├── theme/
│   └── index.ts
├── lib/                  # Shared utilities
│   ├── utils.ts          # Common utilities
│   ├── constants.ts      # Application constants
│   ├── validation.ts     # Validation utilities
│   └── index.ts
├── api/                  # Shared API utilities
│   ├── base.ts           # Base API configuration
│   ├── types.ts          # API types
│   └── index.ts
├── types/                # Shared types
│   ├── auth.ts
│   ├── seo-optimizer.ts
│   └── index.ts
├── config/               # Shared configuration
│   ├── app.ts
│   ├── theme.ts
│   └── index.ts
└── index.ts              # Shared exports
```

## 🚀 Key Benefits

### 1. **Scalability**

- Easy to add new features without affecting existing code
- Clear separation of concerns
- Modular architecture

### 2. **Maintainability**

- Predictable file structure
- Clear dependencies
- Easy to locate and modify code

### 3. **Reusability**

- Shared components and utilities
- Consistent patterns across features
- DRY principle

### 4. **Team Collaboration**

- Clear ownership boundaries
- Reduced merge conflicts
- Parallel development

### 5. **Testing**

- Isolated feature testing
- Clear test boundaries
- Easy mocking

## 📝 Best Practices

### 1. **Import Rules**

- Always use absolute imports with `@/` prefix
- Follow dependency direction strictly
- Use barrel exports (`index.ts` files)

### 2. **Naming Conventions**

- Use kebab-case for folders
- Use PascalCase for components
- Use camelCase for functions and variables

### 3. **File Organization**

- Keep related files close together
- Use consistent file naming
- Group by feature, not by type

### 4. **State Management**

- Keep state close to where it's used
- Use React hooks for local state
- Use context for global state

### 5. **API Integration**

- Feature-specific API services
- Shared base API utilities
- Consistent error handling

## 🔄 Migration Guide

### From Old Structure to FSD

1. **Identify Features**: Group related functionality
2. **Create Entity Models**: Extract business entities
3. **Move Shared Code**: Identify reusable components
4. **Update Imports**: Use new absolute paths
5. **Test Thoroughly**: Ensure functionality works

### Example Migration

**Before (Old Structure):**

```
src/
├── components/
│   ├── SeoOptimizer.tsx
│   └── Button.tsx
├── hooks/
│   └── useSeoOptimizer.ts
└── services/
    └── seoService.ts
```

**After (FSD Structure):**

```
src/
├── features/
│   └── seo-optimizer/
│       ├── model/
│       │   ├── types.ts
│       │   └── store.ts
│       ├── ui/
│       │   └── SeoOptimizer.tsx
│       └── api/
│           └── seoOptimizerApi.ts
└── shared/
    └── ui/
        └── button/
            └── index.ts
```

## 🧪 Testing Strategy

### Unit Tests

- Test individual components
- Test utility functions
- Test API services

### Integration Tests

- Test feature workflows
- Test API integration
- Test state management

### E2E Tests

- Test complete user journeys
- Test cross-feature interactions
- Test real-world scenarios

## 📚 Additional Resources

- [Feature-Sliced Design Methodology](https://feature-sliced.design/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [React Best Practices](https://react.dev/learn)
- [TypeScript Guidelines](https://www.typescriptlang.org/docs/)

## 🤝 Contributing

When contributing to this project:

1. Follow the FSD architecture
2. Use the established patterns
3. Update this documentation
4. Write tests for new features
5. Follow the import rules

---

**Last Updated**: December 2024
**Version**: 1.0.0
