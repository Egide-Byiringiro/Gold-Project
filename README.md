# TVET Career Catalyst

A comprehensive career matching platform connecting Rwanda's TVET (Technical and Vocational Education and Training) graduates with employers and career opportunities. Built with React + Vite, this application serves as a bridge between skilled technical professionals and the companies that need them.

## 🎯 Project Overview

TVET Career Catalyst addresses Rwanda's skills gap by connecting:
- **Students** with career paths that match their interests
- **Employers** with skilled TVET graduates
- **Parents** with information about TVET benefits
- **Graduates** with job opportunities and mentorship

## 🚀 Features

### Core Functionality
- **Career Matching Algorithm**: Intelligent matching based on user interests and scenarios
- **Real Success Stories**: Authentic graduate testimonials and employer feedback
- **Job Marketplace**: Current openings with filtering and application systems
- **School Directory**: TVET institutions with program details and contact information
- **Employer Dashboard**: Tools for companies to find and hire TVET talent
- **Parent Guide**: Comprehensive information about TVET benefits and career paths

### User Types & Journeys

#### 1. Students
- **Path**: Home → Scenario Selection → Career Match → Graduate Stories → Action Steps
- **Experience**: Interest-based career discovery with real salary data and success stories
- **Outcome**: Clear career path with actionable next steps

#### 2. Employers
- **Path**: Home → Employer Dashboard → Talent Search → Success Stories
- **Experience**: Access to qualified graduates, hiring statistics, and partnership opportunities
- **Outcome**: Direct connection with skilled talent and industry insights

#### 3. Parents
- **Path**: Home → Parent Guide → Career Information → Success Stories
- **Experience**: Comprehensive understanding of TVET benefits and career prospects
- **Outcome**: Informed decision-making for their children's education

## 🏗️ Technical Architecture

### Frontend Stack
- **Framework**: React 18.3.1 with Vite 5.4.8
- **Routing**: React Router DOM 6.27.0
- **Styling**: Tailwind CSS 3.4.17
- **Icons**: Lucide React 0.454.0
- **PWA**: Vite PWA Plugin with service worker support

### Project Structure
```
src/
├── components/          # React components
├── data/               # JSON data files
├── utils/              # Business logic and utilities
├── App.jsx            # Main application with routing
└── main.jsx           # Application entry point
```

## 🗺️ Application Routes

### 1. Home Page (`/`)
**Component**: `HomePage.jsx`
**Purpose**: Landing page with user type selection
**Features**:
- Hero section with compelling statistics
- Three user type cards (Student, Employer, Parent)
- Success metrics and trust indicators
- Responsive design with gradient backgrounds

### 2. Scenario Selection (`/scenarios/:userType`)
**Component**: `ScenarioSelector.jsx`
**Purpose**: Interest-based scenario selection for career matching
**Features**:
- 6 interest scenarios (fixing things, building, helping people, etc.)
- Progress indicator (4-step process)
- Interactive selection with visual feedback
- Dynamic content based on user type

**Scenarios Available**:
- **Fixing Things**: Automotive, Electronics careers
- **Building Things**: Solar Energy, Construction careers
- **Helping People**: ICT Support, Hospitality careers
- **Working with Computers**: ICT Support, Electronics careers
- **Creative Work**: Hospitality, Fashion careers
- **Business & Money**: Fashion, Automotive careers

### 3. Career Match (`/career-match/:scenarioId`)
**Component**: `CareerMatch.jsx`
**Purpose**: Display matched career with detailed information
**Features**:
- Career overview with salary ranges
- Employment rate and demand level
- Key skills and growth potential
- Why this career matches the user
- Progress tracking (step 2 of 4)

### 4. Graduate Stories (`/graduates/:careerId`)
**Component**: `GraduateStories.jsx`
**Purpose**: Show real success stories from TVET graduates
**Features**:
- Individual graduate profiles
- Salary progression data
- Contact information (WhatsApp, Phone)
- Company and role details
- Progress tracking (step 3 of 4)

### 5. Employer Dashboard (`/employers`)
**Component**: `EmployerDashboard.jsx`
**Purpose**: Help employers find and hire TVET talent
**Features**:
- Hiring statistics overview
- Skills-based talent matching
- Available graduates and schools
- Success stories from other employers
- Recent job postings
- Partnership opportunities

### 6. Employer Stories (`/employer-stories`)
**Component**: `EmployerStories.jsx`
**Purpose**: Showcase employer success with TVET graduates
**Features**:
- Industry-filtered success stories
- Hiring statistics and testimonials
- Current openings and salary ranges
- Contact information for partnerships

### 7. Job Postings (`/jobs`)
**Component**: `JobPostings.jsx`
**Purpose**: Display current job opportunities
**Features**:
- Comprehensive job listings
- Advanced filtering (career, location, urgency)
- Salary information and requirements
- Direct application links
- Urgent position highlighting

### 8. Parent Guide (`/parents`)
**Component**: `ParentGuide.jsx`
**Purpose**: Educate parents about TVET benefits
**Features**:
- TVET overview and statistics
- Career benefits explanation
- Support strategies for parents
- Success stories from other families
- Contact information for counselors

## 📊 Data Architecture

### Core Data Models

#### 1. Scenarios (`scenarios.json`)
- **Purpose**: Define user interests and map to careers
- **Structure**: ID, title, description, icon, career mappings
- **Usage**: Career matching algorithm foundation

#### 2. Careers (`careers.json`)
- **Purpose**: Career information with salary and demand data
- **Structure**: ID, title, description, salary range, skills, demand level
- **Usage**: Career recommendations and detailed information

#### 3. Graduates (`graduates.json`)
- **Purpose**: Real graduate success stories and contact information
- **Structure**: Personal details, career progression, contact methods
- **Usage**: Success stories and direct mentorship connections

#### 4. Employers (`employers.json`)
- **Purpose**: Company information and hiring success stories
- **Structure**: Company details, hiring statistics, testimonials
- **Usage**: Employer success stories and partnership opportunities

#### 5. Job Postings (`job_postings.json`)
- **Purpose**: Current job opportunities with detailed requirements
- **Structure**: Job details, requirements, responsibilities, application info
- **Usage**: Job marketplace and application system

#### 6. Schools (`schools.json`)
- **Purpose**: TVET institution information and program details
- **Structure**: School details, programs, employment rates, contact info
- **Usage**: School directory and application guidance

### Data Relationships
```
Scenarios → Careers → Graduates
Careers → Job Postings
Careers → Schools
Employers → Job Postings
```

## 🔧 Business Logic

### Core Utilities

#### 1. Matching Algorithm (`matching.js`)
- **`matchCareerToScenario(scenarioId)`**: Maps user interests to career recommendations
- **`getGraduatesForCareer(careerId)`**: Finds graduates in specific careers
- **`getSchoolsForCareer(careerId)`**: Identifies schools offering career programs
- **`formatSalary(min, max)`**: Formats salary ranges for display

#### 2. Employer Matching (`employer_matching.js`)
- **`matchTalentToNeeds(scenarioId)`**: Connects employer needs with available talent
- **`getSuccessStories(industryType)`**: Filters employer success stories
- **`getEmployerStats()`**: Calculates hiring statistics
- **`getTopPayingEmployers(limit)`**: Identifies highest-paying companies

### Career Matching Logic
1. **Interest Assessment**: User selects from 6 predefined scenarios
2. **Career Mapping**: Algorithm matches scenarios to relevant careers
3. **Data Enrichment**: Adds salary, demand, and growth information
4. **Success Stories**: Shows real graduates in matched careers
5. **Action Steps**: Provides next steps (school applications, mentorship)

## 🎨 UI/UX Features

### Design System
- **Color Palette**: Green (primary), Blue (secondary), Orange (accent)
- **Typography**: Clean, readable fonts with proper hierarchy
- **Components**: Consistent card designs, buttons, and navigation
- **Responsiveness**: Mobile-first design with tablet and desktop optimization

### Interactive Elements
- **Progress Indicators**: Visual progress tracking through user journey
- **Hover Effects**: Smooth transitions and visual feedback
- **Filter Systems**: Advanced filtering for jobs and content
- **Contact Integration**: Direct WhatsApp and phone integration

### Accessibility
- **Semantic HTML**: Proper heading structure and landmarks
- **Color Contrast**: WCAG compliant color combinations
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper ARIA labels and descriptions

## 📱 PWA Features

### Progressive Web App
- **Service Worker**: Offline functionality and caching
- **Manifest**: App-like installation experience
- **Responsive Design**: Works on all device sizes
- **Fast Loading**: Optimized bundle sizes and lazy loading

### Mobile Optimization
- **Touch-Friendly**: Large touch targets and gestures
- **Mobile Navigation**: Simplified navigation for small screens
- **Performance**: Optimized for mobile networks
- **Installation**: Easy app installation from browser

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm package manager

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd tvet-gold

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Commands
- **`npm run dev`**: Start Vite development server
- **`npm run build`**: Build production bundle
- **`npm run preview`**: Preview production build locally

## 🔌 API Integration

### Current Implementation
- **Static Data**: All data currently stored in JSON files
- **Mock APIs**: Simulated API responses for development
- **Contact Integration**: Direct WhatsApp and phone integration

### Future Enhancements
- **Backend API**: RESTful API for dynamic data
- **Database**: PostgreSQL or MongoDB for data persistence
- **Authentication**: User accounts and personalized experiences
- **Real-time Updates**: Live job postings and notifications

## 📈 Performance Features

### Optimization Strategies
- **Code Splitting**: Route-based code splitting with React Router
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Optimized images and lazy loading
- **Bundle Analysis**: Webpack bundle analyzer for optimization

### Caching Strategy
- **Service Worker**: Offline caching and background updates
- **Static Assets**: Long-term caching for static resources
- **API Responses**: Intelligent caching for data requests

## 🧪 Testing & Quality

### Code Quality
- **ESLint**: JavaScript/React code linting
- **Prettier**: Code formatting consistency
- **TypeScript**: Type safety (planned implementation)

### Testing Strategy
- **Unit Tests**: Component and utility function testing
- **Integration Tests**: User journey testing
- **E2E Tests**: Full application workflow testing

## 🚀 Deployment

### Build Process
1. **Development**: Vite dev server with hot reload
2. **Build**: Optimized production bundle generation
3. **Preview**: Local production build testing
4. **Deploy**: Static file deployment to hosting service

### Hosting Options
- **Vercel**: Optimized for React applications
- **Netlify**: Static site hosting with form handling
- **AWS S3**: Scalable cloud hosting
- **GitHub Pages**: Free hosting for open source projects

## 🔮 Future Roadmap

### Phase 1 (Current)
- ✅ Core career matching functionality
- ✅ Graduate success stories
- ✅ Employer dashboard
- ✅ Job marketplace
- ✅ Parent education resources

### Phase 2 (Planned)
- 🔄 User authentication and profiles
- 🔄 Advanced filtering and search
- 🔄 Real-time notifications
- 🔄 Mobile app development

### Phase 3 (Future)
- 🔮 AI-powered career recommendations
- 🔮 Video testimonials and content
- 🔮 International expansion
- 🔮 Advanced analytics dashboard

## 🤝 Contributing

### Development Guidelines
- **Code Style**: Follow existing patterns and conventions
- **Component Structure**: Use functional components with hooks
- **State Management**: Local state with React hooks
- **Styling**: Tailwind CSS classes for consistency

### Contribution Areas
- **UI/UX Improvements**: Better user experience and accessibility
- **Performance Optimization**: Faster loading and better performance
- **Feature Development**: New functionality and integrations
- **Documentation**: Better code documentation and guides

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support & Contact

- **Project Lead**: TVET Career Catalyst Team
- **Email**: info@tvetcareer.rw
- **Phone**: +250 788 123 456
- **Location**: Kigali, Rwanda

## 🙏 Acknowledgments

- **Rwanda TVET Institutions**: For program information and graduate data
- **Employer Partners**: For success stories and hiring insights
- **TVET Graduates**: For sharing their success stories and experiences
- **Development Team**: For building this platform to serve Rwanda's youth

---

**Built with ❤️ for Rwanda's TVET Community**

*Empowering the next generation of skilled professionals through technology and opportunity.*

