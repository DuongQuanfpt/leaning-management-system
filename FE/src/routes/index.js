import { lazy } from 'react'

//Common pages
const HomePage = lazy(() => import('~/pages/common/HomePage'))
const Login = lazy(() => import('~/pages/common/Login'))
const ForgetPassword = lazy(() => import('~/pages/common/ForgetPassword'))
const ForgetPasswordProcessed = lazy(() => import('~/pages/common/ForgetPasswordProcessed'))
const Register = lazy(() => import('~/pages/common/Register'))
const RegisterProcessed = lazy(() => import('~/pages/common/RegisterProcessed'))
const Verify = lazy(() => import('~/pages/common/Verify'))
const AccessDenied = lazy(() => import('~/pages/common/AccessDenied'))

// Admin pages
const Dashboard = lazy(() => import('~/pages/admin/AdminDashboard'))
const Profile = lazy(() => import('~/pages/user/Profile'))
const ChangePassword = lazy(() => import('~/pages/user/ChangePassword'))
const SettingList = lazy(() => import('~/pages/admin/AdminSettingList'))
const SettingDetail = lazy(() => import('~/pages/admin/AdminSettingDetail'))
const SettingAdd = lazy(() => import('~/pages/admin/AdminSettingAdd'))
const UserList = lazy(() => import('~/pages/admin/AdminUserList'))
const UserDetail = lazy(() => import('~/pages/admin/AdminUserDetail'))
const UserAdd = lazy(() => import('~/pages/admin/AdminUserAdd'))
const SystemPermission = lazy(() => import('~/pages/admin/SystemPermission'))
const SubjectList = lazy(() => import('~/pages/manager/SubjectList'))
const SubjectDetail = lazy(() => import('~/pages/manager/SubjectDetail'))
const SubjectAdd = lazy(() => import('~/pages/manager/SubjectAdd'))
const AssignmentList = lazy(() => import('~/pages/manager/AssignmentList'))
const AssignmentDetail = lazy(() => import('~/pages/manager/AssignmentDetail'))
const AssignmentAdd = lazy(() => import('~/pages/manager/AssignmentAdd'))
const EvalCriteriaList = lazy(() => import('~/pages/manager/EvalCriteriaList'))
const EvalCriteriaDetail = lazy(() => import('~/pages/manager/EvalCriteriaDetail'))
const EvalCriteriaAdd = lazy(() => import('~/pages/manager/EvalCriteriaAdd'))

//Manager pages
const ClassList = lazy(() => import('~/pages/manager/ClassList'))
const ClassDetail = lazy(() => import('~/pages/manager/ClassDetail'))
const ClassAdd = lazy(() => import('~/pages/manager/ClassAdd'))
const SubjectSettingList = lazy(() => import('~/pages/manager/SubjectSettingList'))
const SubjectSettingDetail = lazy(() => import('~/pages/manager/SubjectSettingDetail'))
const SubjectSettingAdd = lazy(() => import('~/pages/manager/SubjectSettingAdd'))

//Supporter pages
const ContactList = lazy(() => import('~/pages/supporter/ContactList'))
const ContactDetail = lazy(() => import('~/pages/supporter/ContactDetail'))

const ScheduleList = lazy(() => import('~/pages/supporter/ScheduleList'))
const ScheduleDetail = lazy(() => import('~/pages/supporter/ScheduleDetail'))
const ScheduleAdd = lazy(() => import('~/pages/supporter/ScheduleAdd'))

//Trainer
const TraineeList = lazy(() => import('~/pages/trainer/TraineeList'))
const TraineeDetail = lazy(() => import('~/pages/trainer/TraineeDetail'))
const TraineeImport = lazy(() => import('~/pages/trainer/TraineeImport'))

const ClassSettingList = lazy(() => import('~/pages/trainer/ClassSettingList'))
const ClassSettingDetail = lazy(() => import('~/pages/trainer/ClassSettingDetail'))
const ClassSettingAdd = lazy(() => import('~/pages/trainer/ClassSettingAdd'))

const MilestoneList = lazy(() => import('~/pages/trainer/MilestoneList'))
const MilestoneDetail = lazy(() => import('~/pages/trainer/MilestoneDetail'))
const NewMilestone = lazy(() => import('~/pages/trainer/NewMilestone'))

const ClassEvalCriteriaList = lazy(() => import('~/pages/trainer/ClassEvalCriteriaList'))
const ClassEvalCriteriaDetail = lazy(() => import('~/pages/trainer/ClassEvalCriteriaDetail'))
const ClassEvalCriteriaAdd = lazy(() => import('~/pages/trainer/ClassEvalCriteriaAdd'))

const GroupList = lazy(() => import('~/pages/trainer/GroupList'))
const NewGroup = lazy(() => import('~/pages/trainer/NewGroup'))
const GroupDetail = lazy(() => import('~/pages/trainer/GroupDetail'))

const IssueList = lazy(() => import('~/pages/trainer/IssueList'))
const IssueDetail = lazy(() => import('~/pages/trainer/IssueDetail'))
const IssueAdd = lazy(() => import('~/pages/trainer/IssueAdd'))
const RequirementAdd = lazy(() => import('~/pages/trainer/RequirementAdd'))

//404 pages
const PageNotFound = lazy(() => import('~/pages/common/PageNotFound'))

// Common routes
const commonRoutes = [
  { path: '*', component: HomePage },
  { path: '/', component: HomePage },
  { path: '/login', component: Login },
  { path: '/forget-password', component: ForgetPassword },
  { path: '/forget-password-processed', component: ForgetPasswordProcessed },
  { path: '/register', component: Register },
  { path: '/register-processed', component: RegisterProcessed },
  { path: '/verify', component: Verify },
  { path: '/404', component: PageNotFound },
  { path: '/access-denied', component: AccessDenied },
]
// User routes
const userRoutes = [
  { path: '/dashboard', component: Dashboard },
  { path: '/profile', component: Profile },
  { path: '/change-password', component: ChangePassword },
]

// Admin routes
const adminRoutes = [
  { path: '/setting-list', component: SettingList },
  { path: '/setting-detail/:id', component: SettingDetail },
  { path: '/setting-add', component: SettingAdd },
  { path: '/user-list', component: UserList },
  { path: '/user-detail/:id', component: UserDetail },
  { path: '/user-add', component: UserAdd },
  { path: '/system-permission', component: SystemPermission },
]

// Manager routes
const managerRoutes = [
  { path: '/class-add', component: ClassAdd },

  { path: '/subject-setting-list', component: SubjectSettingList },
  { path: '/subject-setting-detail/:id', component: SubjectSettingDetail },
  { path: '/subject-setting-add', component: SubjectSettingAdd },
  { path: '/assignment-list', component: AssignmentList },
  { path: '/assignment-detail/:id', component: AssignmentDetail },
  { path: '/assignment-add', component: AssignmentAdd },
  { path: '/criteria-list', component: EvalCriteriaList },
  { path: '/criteria-detail/:id', component: EvalCriteriaDetail },
  { path: '/criteria-add', component: EvalCriteriaAdd },
]

// Supporter routes
const supporterRoutes = [
  { path: '/contact-list', component: ContactList },
  { path: '/contact-detail/:id', component: ContactDetail },
]

// Trainer routes
const trainerRoutes = [
  { path: '/new-milestone', component: NewMilestone },
  { path: '/new-group/:id', component: NewGroup },
]

// Trainee routes
const traineeRoutes = []

//Admin and manager routes
const subjectListRoutes = [
  { path: '/subject-list', component: SubjectList },
  { path: '/subject-detail/:id', component: SubjectDetail },
  { path: '/subject-add', component: SubjectAdd },
]

const classListRoutes = [
  { path: '/class-list', component: ClassList },
  { path: '/class-detail/:id', component: ClassDetail },
]

const traineeListRoutes = [
  { path: '/trainee-list', component: TraineeList },
  { path: '/trainee-detail/:classId/:id', component: TraineeDetail },
  { path: '/trainee-import', component: TraineeImport },
]

const classSettingListRoutes = [
  { path: '/class-setting-list', component: ClassSettingList },
  { path: '/class-setting-detail/:id', component: ClassSettingDetail },
  { path: '/class-setting-add', component: ClassSettingAdd },
]

const milestoneListRoutes = [
  { path: '/milestone-list', component: MilestoneList },
  { path: '/milestone-detail/:id', component: MilestoneDetail },
]

const classEvalCriteriaListRoutes = [
  { path: '/class-criteria-list', component: ClassEvalCriteriaList },
  { path: '/class-criteria-detail/:id', component: ClassEvalCriteriaDetail },
  { path: '/class-criteria-add', component: ClassEvalCriteriaAdd },
]

const groupListRoutes = [
  { path: '/group-list', component: GroupList },
  { path: '/group-detail/:id', component: GroupDetail },
]

const scheduleListRoutes = [
  { path: '/schedule-list', component: ScheduleList },
  { path: '/schedule-detail/:id', component: ScheduleDetail },
  { path: '/schedule-add', component: ScheduleAdd },
]

const issueRoutes = [
  { path: '/issue-list', component: IssueList },
  { path: '/issue-detail/:id', component: IssueDetail },
  { path: '/issue-add', component: IssueAdd },
  { path: '/requirement-add', component: RequirementAdd },
]

export {
  commonRoutes,
  userRoutes,
  adminRoutes,
  managerRoutes,
  supporterRoutes,
  trainerRoutes,
  traineeRoutes,
  subjectListRoutes,
  traineeListRoutes,
  classListRoutes,
  classSettingListRoutes,
  milestoneListRoutes,
  classEvalCriteriaListRoutes,
  groupListRoutes,
  scheduleListRoutes,
  issueRoutes,
}
