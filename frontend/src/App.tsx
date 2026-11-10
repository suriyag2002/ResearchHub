import { Navigate, Route, Routes } from 'react-router-dom'
import { DashboardLayout, PublicLayout, RequireAuth } from './components/layout'
import { BookMarked, BookOpen, FileText, Files, FlaskConical, Home, Inbox, LayoutDashboard, Library, MessageSquareText, Newspaper, Settings, Shield, Sparkles, User, Users } from 'lucide-react'
import HomePage from './pages/Home'
import AboutPage from './pages/About'
import ResearchAreasPage from './pages/ResearchAreas'
import SubjectPage from './pages/SubjectArea'
import PublicationsPage from './pages/Publications'
import JournalsPage from './pages/Journals'
import JournalDetailPage from './pages/JournalDetail'
import ContactPage from './pages/Contact'
import LoginPage from './pages/auth/Login'
import RegisterPage from './pages/auth/Register'
import ForgotPage from './pages/auth/ForgotPassword'
import ResetPage from './pages/auth/ResetPassword'
import AdminOverview from './pages/admin/Overview'
import AdminGeneric from './pages/admin/Generic'
import ResearcherOverview from './pages/researcher/Overview'
import ResearcherGeneric from './pages/researcher/Generic'
import AccountProfile from './pages/account/Profile'
import AiAssistantPage from './pages/AiAssistant'

const adminLinks = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/researchers', label: 'Researchers', icon: FlaskConical },
  { to: '/admin/subjects', label: 'Subjects', icon: Library },
  { to: '/admin/submissions', label: 'Submissions', icon: Inbox },
  { to: '/admin/journals', label: 'Journals', icon: Newspaper },
  { to: '/admin/publications', label: 'Publications', icon: BookOpen },
  { to: '/admin/processing', label: 'Document Processing', icon: Files },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]
const researcherLinks = [
  { to: '/researcher', label: 'Overview', icon: LayoutDashboard },
  { to: '/researcher/profile', label: 'Profile', icon: User },
  { to: '/researcher/submissions', label: 'My Submissions', icon: FileText },
  { to: '/researcher/publications', label: 'Publications', icon: BookOpen },
  { to: '/researcher/ai', label: 'AI Assistant', icon: Sparkles },
  { to: '/researcher/notifications', label: 'Notifications', icon: Inbox },
  { to: '/researcher/bookmarks', label: 'Saved Papers', icon: BookMarked },
]

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="research-areas" element={<ResearchAreasPage />} />
        <Route path="research-areas/:slug" element={<SubjectPage />} />
        <Route path="publications" element={<PublicationsPage />} />
        <Route path="journals" element={<JournalsPage />} />
        <Route path="journals/:slug" element={<JournalDetailPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPage />} />
        <Route path="reset-password" element={<ResetPage />} />
        <Route path="ai" element={<RequireAuth><AiAssistantPage /></RequireAuth>} />
        <Route path="account/profile" element={<RequireAuth><AccountProfile /></RequireAuth>} />
      </Route>

      <Route path="/admin" element={<RequireAuth roles={['admin','super_admin']}><DashboardLayout title="Super Admin Dashboard" links={adminLinks} /></RequireAuth>}>
        <Route index element={<AdminOverview />} />
        <Route path="users" element={<AdminGeneric title="User Management" subtitle="Manage registered users, roles, and account status. Role changes are enforced by backend/RLS policies." entity="users" />} />
        <Route path="researchers" element={<AdminGeneric title="Researcher Management" subtitle="Manage researcher profiles and permissions." entity="researchers" />} />
        <Route path="subjects" element={<AdminGeneric title="Subjects & Departments" subtitle="Manage dynamic research subjects and future departments. Initial subjects: Computer Science, English, Tamil." entity="subjects" />} />
        <Route path="submissions" element={<AdminGeneric title="Submission Review" subtitle="Review, approve, reject (with reason), request corrections, and publish submissions." entity="submissions" />} />
        <Route path="journals" element={<AdminGeneric title="Journal Management" subtitle="Create journals, volumes, issues, and maintain ISSN/editorial metadata (admin-entered only)." entity="journals" />} />
        <Route path="publications" element={<AdminGeneric title="Publications" subtitle="Manage approved/published research records and visibility." entity="publications" />} />
        <Route path="processing" element={<AdminGeneric title="Document Processing" subtitle="Monitor extraction/OCR/embedding jobs and retries. AWS S3 integration is currently deferred." entity="processing" />} />
        <Route path="settings" element={<AdminGeneric title="Platform Settings" subtitle="Configure limits, feature flags, and service providers (storage/AI) via environment-backed settings." entity="settings" />} />
      </Route>

      <Route path="/researcher" element={<RequireAuth roles={['researcher','admin','super_admin']}><DashboardLayout title="Researcher Dashboard" links={researcherLinks} /></RequireAuth>}>
        <Route index element={<ResearcherOverview />} />
        <Route path="profile" element={<ResearcherGeneric title="Researcher Profile" subtitle="Maintain your academic profile and affiliations." kind="profile" />} />
        <Route path="submissions" element={<ResearcherGeneric title="My Submissions" subtitle="Upload, track, edit, and resubmit research papers. PDF storage upload to AWS S3 is pending integration." kind="submissions" />} />
        <Route path="publications" element={<ResearcherGeneric title="My Publications" subtitle="View your approved and published research outputs." kind="publications" />} />
        <Route path="ai" element={<AiAssistantPage embedded />} />
        <Route path="notifications" element={<ResearcherGeneric title="Notifications" subtitle="Submission updates, review feedback, and platform alerts." kind="notifications" />} />
        <Route path="bookmarks" element={<ResearcherGeneric title="Saved Research Papers" subtitle="Bookmarked publications for quick access." kind="bookmarks" />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
