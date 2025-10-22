// Centralized icon management to prevent import errors
import {
  // Navigation & UI
  Menu,
  Home,
  AccountCircle,
  Settings,
  Close,
  ChevronLeft,
  ChevronRight,
  ExpandMore,
  ExpandLess,
  
  // Progress & Status
  CheckCircle,
  RadioButtonUnchecked,
  PlayArrow,
  Pause,
  Stop,
  Refresh,
  AccessTime,
  Schedule,
  Lock,
  LockOpen,
  
  // Learning & Education
  School,
  MenuBook,
  Psychology,
  Lightbulb,
  AutoAwesome,
  Star,
  EmojiEvents,
  Assessment,
  Speed,
  
  // Analytics & Data
  TrendingUp,
  Timeline,
  Insights,
  BarChart,
  PieChart,
  ShowChart,
  
  // Actions & Controls
  Add,
  Remove,
  Edit,
  Delete,
  Save,
  Download,
  Upload,
  Clear,
  Undo,
  Redo,
  
  // Communication
  Info,
  Warning,
  Error,
  CheckCircleOutline,
  ErrorOutline,
  InfoOutline,
  
  // Media & Content
  VolumeUp,
  VolumeOff,
  PlayCircle,
  PersonalVideo,
  Timer,
  
  // Business & Billing
  Payment,
  CreditCard,
  AccountBalance,
  MonetizationOn,
  
  // User & Auth
  Person,
  Group,
  Badge,
  SecurityShield,
  
  // System & Technical
  CloudSync,
  Sync,
  SyncAlt,
  Update,
  BugReport,
  
  // Content & Documents
  Description,
  Assignment,
  LibraryBooks,
  Folder,
  
  // Additional commonly used icons
  Notifications,
  Search,
  FilterList,
  Sort,
  ViewList,
  ViewModule,
  Visibility,
  VisibilityOff,
  Launch,
  ExitToApp,
  Help,
  HelpOutline,
  
  // Gamification
  Gamepad,
  SportsEsports,
  TrendingUp as Trophy,
  
  // Social & Sharing
  Share,
  ThumbUp,
  Favorite,
  BookmarkBorder,
  
  // Time & Calendar
  Today,
  DateRange,
  Event,
  
  // Location & Navigation
  MyLocation,
  GpsFixed,
  
  // Communication & Feedback
  Chat,
  Comment,
  Message,
  Mail,
  Phone,
  
  // File & Document Management
  AttachFile,
  CloudDownload,
  CloudUpload,
  FileCopy,
  
  // Advanced Features
  Extension,
  Code,
  Build,
  
} from '@mui/icons-material'

// Export all icons for consistent usage across components
export const AppIcons = {
  // Navigation & UI
  Menu,
  Home,
  AccountCircle,
  Settings,
  Close,
  ChevronLeft,
  ChevronRight,
  ExpandMore,
  ExpandLess,
  
  // Progress & Status - provide both Schedule and AccessTime
  CheckCircle,
  RadioButtonUnchecked,
  PlayArrow,
  Pause,
  Stop,
  Refresh,
  AccessTime,
  Schedule: AccessTime, // Use AccessTime as fallback for Schedule
  Lock,
  LockOpen,
  
  // Learning & Education
  School,
  MenuBook,
  Psychology,
  Lightbulb,
  AutoAwesome,
  Star,
  EmojiEvents,
  Assessment,
  Speed,
  
  // Analytics & Data
  TrendingUp,
  Timeline,
  Insights,
  BarChart,
  PieChart,
  ShowChart,
  
  // Actions & Controls
  Add,
  Remove,
  Edit,
  Delete,
  Save,
  Download,
  Upload,
  Clear,
  Undo,
  Redo,
  
  // Communication
  Info,
  Warning,
  Error,
  CheckCircleOutline,
  ErrorOutline,
  InfoOutline,
  
  // Media & Content
  VolumeUp,
  VolumeOff,
  PlayCircle,
  PersonalVideo,
  Timer,
  
  // Business & Billing
  Payment,
  CreditCard,
  AccountBalance,
  MonetizationOn,
  
  // User & Auth
  Person,
  Group,
  Badge,
  SecurityShield,
  
  // System & Technical
  CloudSync,
  Sync,
  SyncAlt,
  Update,
  BugReport,
  
  // Content & Documents
  Description,
  Assignment,
  LibraryBooks,
  Folder,
  
  // Additional commonly used icons
  Notifications,
  Search,
  FilterList,
  Sort,
  ViewList,
  ViewModule,
  Visibility,
  VisibilityOff,
  Launch,
  ExitToApp,
  Help,
  HelpOutline,
  
  // Gamification
  Gamepad,
  SportsEsports,
  Trophy: TrendingUp,
  
  // Social & Sharing
  Share,
  ThumbUp,
  Favorite,
  BookmarkBorder,
  
  // Time & Calendar
  Today,
  DateRange,
  Event,
  
  // Location & Navigation
  MyLocation,
  GpsFixed,
  
  // Communication & Feedback
  Chat,
  Comment,
  Message,
  Mail,
  Phone,
  
  // File & Document Management
  AttachFile,
  CloudDownload,
  CloudUpload,
  FileCopy,
  
  // Advanced Features
  Extension,
  Code,
  Build,
}

// Provide safe icon getter with fallbacks
export const getIcon = (iconName, fallback = Info) => {
  return AppIcons[iconName] || fallback
}

export default AppIcons