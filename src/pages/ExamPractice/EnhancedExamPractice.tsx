import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  LinearProgress,
  Chip,
  Alert,
  Tab,
  Tabs,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Card,
  CardContent,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Timer,
  Assignment,
  PlayArrow,
  Pause,
  Stop,
  CheckCircle,
  Schedule,
} from '@mui/icons-material';

interface ExamSet {
  id: number;
  title: string;
  duration: number; // in minutes
  tasks: Task[];
}

interface Task {
  id: number;
  title: string;
  description: string;
  content: string;
  marks: number;
  timeAllocation: number;
  instructions: string[];
  type: 'passage' | 'letter' | 'memo' | 'itinerary' | 'table';
}

const examSets: ExamSet[] = [
  {
    id: 1,
    title: "Information Processing I - Paper 1 (Technology Focus)",
    duration: 150, // 2.5 hours
    tasks: [
      {
        id: 1,
        title: "Task 1: Passage Typing",
        description: "Type the following passage in double line spacing, justify your margins.",
        content: `The rapid advancement of artificial intelligence has transformed the way we work and communicate in the modern business environment. Companies worldwide are integrating AI systems to enhance productivity, streamline operations, and improve customer service. Machine learning algorithms now process vast amounts of data to provide insights that were previously impossible to obtain through traditional methods.

However, this technological revolution also brings challenges that organizations must address. Privacy concerns, data security, and the need for employee retraining have become critical issues. Businesses must balance the benefits of automation with the human element that remains essential for creative problem-solving and relationship building.

The future workplace will likely feature human-AI collaboration, where technology augments human capabilities rather than replacing them entirely. This symbiotic relationship requires new skills and adaptation from the workforce. Organizations that successfully navigate this transition will gain significant competitive advantages in their respective markets.

Educational institutions play a crucial role in preparing students for this evolving landscape. Curricula must incorporate digital literacy, critical thinking, and adaptability to ensure graduates can thrive in an AI-enhanced workplace.`,
        marks: 10,
        timeAllocation: 25,
        instructions: [
          "Use double line spacing throughout",
          "Justify both left and right margins", 
          "Maintain consistent formatting",
          "Proofread for accuracy"
        ],
        type: 'passage'
      },
      {
        id: 2,
        title: "Task 2: Business Letter",
        description: "Type the following business letter using appropriate business format.",
        content: `TechSolutions Ltd
15 Innovation Drive
SILICON VALLEY
CA 94301
Tel: (555) 123-4567
Email: info@techsolutions.com

Our Ref: TS/2024/001

[Today's Date]

Ms Sarah Johnson
Operations Manager
Digital Dynamics Corp
25 Technology Parkway
TECH CITY
TX 75001

Dear Ms Johnson

RE: PARTNERSHIP PROPOSAL FOR AI DEVELOPMENT PROJECT

Thank you for your interest in collaborating with TechSolutions Ltd on the upcoming artificial intelligence development project. Following our productive meeting last week, I am pleased to outline our partnership proposal.

Our company has been at the forefront of AI innovation for over eight years, with a team of 50 experienced developers and data scientists. We have successfully completed more than 200 projects across various industries, including healthcare, finance, and manufacturing. Our expertise in machine learning, natural language processing, and computer vision makes us an ideal partner for your ambitious project.

We propose a joint venture structure where both companies contribute equally to resources and expertise. TechSolutions will provide the technical infrastructure and AI development capabilities, while Digital Dynamics will contribute domain expertise and market access. This collaboration will allow us to leverage our combined strengths to deliver innovative solutions.

The proposed timeline spans 18 months, with key milestones at 6-month intervals. Initial development will focus on creating the core AI algorithms, followed by testing and refinement phases. We estimate the total project value at $2.5 million, with costs shared equally between our organizations.

I have enclosed detailed project specifications, timeline charts, and financial projections for your review. Our legal team is prepared to draft the partnership agreement pending your approval of these terms.

I look forward to your response and hope we can formalize this partnership soon. Please contact me directly if you require any clarification or wish to discuss modifications to the proposal.

Yours sincerely

Michael Rodriguez
Chief Executive Officer

Enclosures: Project specifications, Timeline charts, Financial projections`,
        marks: 30,
        timeAllocation: 45,
        instructions: [
          "Use appropriate business letter format",
          "Include all header information",
          "Use today's date",
          "Ensure proper spacing and alignment",
          "Include all enclosures mentioned"
        ],
        type: 'letter'
      },
      {
        id: 3,
        title: "Task 3: Memorandum", 
        description: "Type the following memorandum using standard memo format.",
        content: `MEMORANDUM

TO: All Department Managers
FROM: Jennifer Chen, Human Resources Director  
DATE: [Today's Date]
REF: JC/hr/2024/015

SUBJECT: IMPLEMENTATION OF REMOTE WORK POLICY

Following extensive consultation with department heads and employee representatives, management has approved a comprehensive remote work policy effective from next month. This memorandum outlines the key provisions and implementation procedures.

ELIGIBILITY CRITERIA
All permanent employees with at least six months of satisfactory service are eligible to apply for remote work arrangements. Positions involving customer-facing activities, equipment operation, or security-sensitive tasks may have limited remote work options. Department managers will assess individual applications based on job requirements and performance history.

WORK ARRANGEMENTS
Approved remote workers may work from home up to three days per week. Core business hours (10:00 AM to 3:00 PM) must be maintained regardless of location. Employees must maintain reliable internet connectivity, appropriate workspace, and professional communication standards during remote work hours.

EQUIPMENT AND SUPPORT
The company will provide necessary equipment including laptops, software licenses, and communication tools. IT support will be available for remote workers through a dedicated helpdesk. Employees are responsible for maintaining secure work environments and protecting company data.

PERFORMANCE MONITORING
Managers will conduct monthly check-ins with remote workers to assess productivity and address any challenges. Performance evaluation criteria remain unchanged, focusing on output quality and deadline adherence rather than physical presence.

TRIAL PERIOD
The policy will undergo a six-month trial period with comprehensive review and feedback collection. Based on the results, permanent adoption or modifications will be considered. Department managers must submit monthly reports on remote work effectiveness.

Training sessions on remote work best practices will be conducted next week. Please ensure all eligible staff receive this information promptly and encourage applications from suitable candidates.`,
        marks: 20,
        timeAllocation: 30,
        instructions: [
          "Use standard memorandum format",
          "Include all header information", 
          "Use appropriate spacing",
          "Maintain professional tone",
          "Use today's date"
        ],
        type: 'memo'
      },
      {
        id: 4,
        title: "Task 4: Business Itinerary",
        description: "Display the following business itinerary in an appropriate format.",
        content: `BUSINESS TRIP TO SINGAPORE
Digital Marketing Conference

Monday 15 July to Thursday 18 July 2024

MONDAY 15 JULY

Time                    Activity
0630 hours             Taxi from home to London Heathrow Airport
0800 hours             Check-in for Flight SQ321 to Singapore Changi
0930 hours             Flight departure from London Heathrow
                       (Flight time: 13 hours 30 minutes)
0505 hours (Tue)       Arrive Singapore Changi Airport (local time)
0630 hours             Immigration and baggage collection
0730 hours             Taxi to Marina Bay Sands Hotel
0900 hours             Hotel check-in and breakfast
1100 hours             Conference registration and welcome session
1300 hours             Networking lunch with delegates
1500 hours             Keynote presentation: "Future of Digital Marketing"
1700 hours             Break and refreshments
1800 hours             Panel discussion: "AI in Marketing Strategy"
2000 hours             Welcome dinner at Sky Restaurant

TUESDAY 16 JULY

Time                    Activity
0700 hours             Hotel breakfast
0830 hours             Workshop: "Social Media Analytics"
1030 hours             Coffee break and networking
1100 hours             Presentation: "Customer Journey Mapping"
1300 hours             Lunch with potential clients
1500 hours             Site visit: Singapore Digital Hub
1700 hours             Return to hotel
1930 hours             Business dinner with Asian partners

WEDNESDAY 17 JULY

Time                    Activity
0700 hours             Hotel breakfast
0900 hours             Final conference sessions
1200 hours             Conference closing ceremony
1400 hours             Lunch and departure preparations
1600 hours             Shopping at Orchard Road
1900 hours             Farewell dinner with conference organizers
2200 hours             Return to hotel and packing

THURSDAY 18 JULY

Time                    Activity
0600 hours             Hotel checkout
0730 hours             Taxi to Singapore Changi Airport
0930 hours             Check-in for Flight SQ322 to London
1130 hours             Flight departure from Singapore
                       (Flight time: 13 hours 45 minutes)
1715 hours             Arrive London Heathrow (local time)
1900 hours             Immigration and baggage collection
2030 hours             Taxi home

CONTACTS:
Conference Organizer: Ms Lisa Wang (+65 9123 4567)
Hotel Concierge: Marina Bay Sands (+65 6688 8868)
Local Transport: Singapore Taxi Service (+65 6555 1234)
Emergency Contact: Embassy (+65 6424 4200)`,
        marks: 20,
        timeAllocation: 25,
        instructions: [
          "Use clear tabular format for times and activities",
          "Maintain consistent spacing and alignment",
          "Include all contact information",
          "Use appropriate headings and subheadings"
        ],
        type: 'itinerary'
      },
      {
        id: 5,
        title: "Task 5: Tabulated Document",
        description: "Display the following information in an appropriate tabular format.",
        content: `QUARTERLY SALES PERFORMANCE REPORT
Information Technology Division

PRODUCT CATEGORY ANALYSIS - Q3 2024

Product Category | Target Sales ($) | Actual Sales ($) | Variance ($) | Variance (%) | Units Sold | Market Share (%)

Software Licenses | 250,000 | 287,500 | +37,500 | +15.0 | 1,150 | 28.5
Hardware Systems | 180,000 | 165,750 | -14,250 | -7.9 | 85 | 22.1
Cloud Services | 320,000 | 356,800 | +36,800 | +11.5 | 892 | 35.7
Support Contracts | 150,000 | 142,500 | -7,500 | -5.0 | 475 | 18.9
Training Programs | 75,000 | 89,250 | +14,250 | +19.0 | 298 | 12.3

TOTALS | 975,000 | 1,041,800 | +66,800 | +6.9 | 2,900 | 23.5

REGIONAL PERFORMANCE BREAKDOWN

Region | Q1 Sales ($) | Q2 Sales ($) | Q3 Sales ($) | Growth Rate (%) | Target Achievement (%)

North America | 185,450 | 198,720 | 215,680 | +8.5 | 108.4
Europe | 156,890 | 172,340 | 188,920 | +9.6 | 105.2
Asia Pacific | 142,630 | 159,880 | 178,450 | +11.6 | 112.3
Latin America | 89,340 | 95,680 | 103,250 | +7.9 | 97.8
Middle East/Africa | 67,230 | 72,150 | 79,580 | +10.3 | 106.7

SALES REPRESENTATIVE PERFORMANCE

Representative | Territory | Q3 Sales ($) | Commission ($) | Deals Closed | Average Deal Size ($)

Sarah Mitchell | Northeast | 125,680 | 6,284 | 28 | 4,489
James Rodriguez | Southeast | 118,750 | 5,938 | 25 | 4,750  
Patricia Wong | West Coast | 142,350 | 7,118 | 31 | 4,592
Michael Chen | Midwest | 108,920 | 5,446 | 22 | 4,951
Angela Davis | Southwest | 134,280 | 6,714 | 29 | 4,630

Note: Commission rate is 5% of gross sales
Target achievement calculations based on individual quarterly targets
Market share data sourced from TechAnalytics Research Q3 2024 Report`,
        marks: 25,
        timeAllocation: 35,
        instructions: [
          "Use appropriate table formatting with clear borders",
          "Align numerical data consistently", 
          "Include all headings and subheadings",
          "Maintain neat presentation throughout",
          "Include notes and source information"
        ],
        type: 'table'
      }
    ]
  },
  {
    id: 2,
    title: "Information Processing I - Paper 2 (Business Communication)",
    duration: 150,
    tasks: [
      {
        id: 1,
        title: "Task 1: Passage Typing",
        description: "Type the following passage in double line spacing, justify your margins.",
        content: `Effective business communication forms the backbone of successful organizations in today's competitive marketplace. Clear, concise, and purposeful communication ensures that messages reach their intended audiences with maximum impact and minimal misunderstanding. Companies that prioritize communication excellence consistently outperform their competitors in customer satisfaction, employee engagement, and overall business results.

The digital transformation has revolutionized how businesses communicate internally and externally. Email, instant messaging, video conferencing, and collaborative platforms have replaced many traditional communication methods. However, this technological advancement has also created new challenges, including information overload, reduced personal interaction, and the need for digital communication etiquette.

Professional writing skills remain fundamental despite technological changes. Whether drafting emails, preparing reports, or creating presentations, employees must convey information clearly and professionally. Poor communication can lead to costly misunderstandings, project delays, and damaged business relationships.

Modern businesses must also consider multicultural communication as global expansion brings diverse teams together. Understanding cultural differences in communication styles, nonverbal cues, and business protocols becomes essential for international success. Training programs focusing on cross-cultural communication competency are increasingly valuable investments for forward-thinking organizations.`,
        marks: 10,
        timeAllocation: 25,
        instructions: [
          "Use double line spacing throughout",
          "Justify both left and right margins",
          "Maintain consistent formatting",
          "Proofread for accuracy"
        ],
        type: 'passage'
      },
      {
        id: 2,
        title: "Task 2: Business Letter",
        description: "Type the following business letter using appropriate business format.",
        content: `Global Marketing Solutions
42 Commerce Street
BUSINESS DISTRICT
NY 10001
Tel: (212) 555-0199
Email: contact@globalmktg.com

Our Ref: GMS/2024/078

[Today's Date]

Mr David Thompson
Procurement Director  
Nationwide Retail Chain
18 Shopping Center Boulevard
RETAIL PARK
IL 60601

Dear Mr Thompson

RE: PROPOSAL FOR COMPREHENSIVE MARKETING CAMPAIGN

Thank you for requesting our proposal for your upcoming national marketing campaign. After careful analysis of your requirements and market research, we are excited to present our comprehensive solution for increasing brand awareness and driving sales growth.

Our team has developed a multi-channel approach combining traditional and digital marketing strategies tailored to your target demographic. The campaign will include television advertising during prime time slots, social media marketing across major platforms, and strategic outdoor advertising in high-traffic urban areas.

The proposed campaign timeline spans six months, beginning with market research and creative development, followed by a phased rollout across your target regions. We recommend starting with your strongest markets to build momentum before expanding to new territories. Our analytics team will monitor performance metrics continuously and provide monthly reports with actionable insights.

Budget allocation includes creative development (25%), media buying (60%), and campaign management (15%). Based on our experience with similar retail clients, we project a 35% increase in brand recognition and 20% growth in sales within the first quarter post-launch.

Our creative team has extensive experience in retail marketing, having worked with leading brands including Fashion Forward, Home Essentials, and Tech Depot. We understand the unique challenges of retail marketing and have proven strategies for driving both online and in-store traffic.

I have attached detailed campaign concepts, media planning schedules, and case studies from our recent successful campaigns. Our account management team is ready to begin immediately upon contract signing.

I look forward to discussing this proposal with you in detail. Please let me know your availability for a presentation meeting within the next two weeks.

Yours sincerely

Rebecca Martinez
Campaign Director

Enclosures: Campaign concepts, Media schedules, Case studies, Budget breakdown`,
        marks: 30,
        timeAllocation: 45,
        instructions: [
          "Use appropriate business letter format",
          "Include all header information",
          "Use today's date",
          "Ensure proper spacing and alignment",
          "Include all enclosures mentioned"
        ],
        type: 'letter'
      },
      {
        id: 3,
        title: "Task 3: Memorandum",
        description: "Type the following memorandum using standard memo format.",
        content: `MEMORANDUM

TO: All Sales Staff
FROM: Robert Kim, Sales Manager
DATE: [Today's Date]  
REF: RK/sales/2024/092

SUBJECT: NEW CUSTOMER RELATIONSHIP MANAGEMENT SYSTEM

I am pleased to announce the implementation of our new Customer Relationship Management (CRM) system, which will significantly enhance our sales processes and customer service capabilities. The system will be fully operational from the beginning of next month.

SYSTEM FEATURES
The new CRM platform includes comprehensive customer profiles, automated follow-up scheduling, and integrated communication tracking. Sales representatives will have access to complete customer history, purchase patterns, and preference data. The system also features advanced reporting capabilities and real-time performance dashboards.

TRAINING SCHEDULE
Mandatory training sessions will commence next week. Each sales team member must attend one four-hour training session and complete online modules. Training will cover system navigation, data entry procedures, and report generation. Additional refresher sessions will be available for staff requiring extra support.

DATA MIGRATION  
All existing customer data will be migrated to the new system over the weekend. Our IT department will ensure data integrity and provide backup support during the transition. Sales staff should avoid scheduling customer appointments during the migration period to prevent any service disruptions.

BENEFITS AND EXPECTATIONS
The new system will streamline lead management, improve customer communication tracking, and provide better sales forecasting capabilities. Management expects improved customer satisfaction scores and increased sales conversion rates. Individual performance metrics will be enhanced through better activity tracking.

SUPPORT RESOURCES
A dedicated help desk will be available during business hours for the first month after implementation. Quick reference guides and video tutorials will be accessible through the company intranet. System administrators will provide ongoing support and regular system updates.

Please ensure you attend your assigned training session and complete all required modules before the system launch date. Contact the IT helpdesk if you experience any technical difficulties during the transition period.`,
        marks: 20,
        timeAllocation: 30,
        instructions: [
          "Use standard memorandum format",
          "Include all header information",
          "Use appropriate spacing",
          "Maintain professional tone",
          "Use today's date"
        ],
        type: 'memo'
      },
      {
        id: 4,
        title: "Task 4: Business Itinerary",
        description: "Display the following business itinerary in an appropriate format.",
        content: `BUSINESS TRIP TO TOKYO
International Trade Exhibition

Wednesday 3 September to Saturday 6 September 2024

WEDNESDAY 3 SEPTEMBER

Time                    Activity
0500 hours             Taxi from home to Manchester Airport
0630 hours             Check-in for Flight JL012 to Tokyo Narita
0820 hours             Flight departure from Manchester
                       (Flight time: 11 hours 45 minutes)
0605 hours (Thu)       Arrive Tokyo Narita Airport (local time)
0730 hours             Immigration and customs clearance
0845 hours             Airport Express train to central Tokyo
0930 hours             Arrive at Imperial Hotel Tokyo
1030 hours             Hotel check-in and room preparation
1200 hours             Lunch meeting with Japanese distributor
1430 hours             Site visit to Tokyo Trade Center
1630 hours             Exhibition hall inspection and setup
1800 hours             Welcome reception for international exhibitors
2030 hours             Business dinner with potential partners

THURSDAY 4 SEPTEMBER  

Time                    Activity
0630 hours             Hotel breakfast and preparation
0800 hours             Travel to Tokyo Big Sight Exhibition Center
0900 hours             Exhibition opening ceremony
1000 hours             Trade show activities and customer meetings
1230 hours             Networking lunch with industry leaders
1400 hours             Afternoon exhibition sessions
1600 hours             Product demonstration appointments
1800 hours             Exhibition day close and briefing
2000 hours             Team dinner and day review

FRIDAY 5 SEPTEMBER

Time                    Activity  
0700 hours             Hotel breakfast
0830 hours             Final exhibition day activities
1100 hours             Press conference and media interviews
1300 hours             Closing lunch with key clients
1500 hours             Exhibition breakdown and packing
1700 hours             Departure from exhibition center
1800 hours             Cultural visit to Tokyo Imperial Palace
2030 hours             Farewell dinner with Japanese partners

SATURDAY 6 SEPTEMBER

Time                    Activity
0800 hours             Hotel checkout and departure
1000 hours             Shopping at Ginza district
1230 hours             Final business lunch
1430 hours             Travel to Tokyo Narita Airport
1630 hours             Check-in for Flight JL011 to Manchester
1830 hours             Flight departure from Tokyo
                       (Flight time: 12 hours 15 minutes)  
2245 hours             Arrive Manchester Airport (local time)
0015 hours (Sun)       Immigration and baggage collection
0145 hours             Taxi home

IMPORTANT CONTACTS:
Exhibition Organizer: Mr Hiroshi Tanaka (+81 3 1234 5678)
Hotel Reception: Imperial Hotel Tokyo (+81 3 3504 1111)
Local Representative: Ms Yuki Sato (+81 90 1234 5678)
UK Embassy Tokyo: (+81 3 5211 1100)`,
        marks: 20,
        timeAllocation: 25,
        instructions: [
          "Use clear tabular format for times and activities",
          "Maintain consistent spacing and alignment",
          "Include all contact information",
          "Use appropriate headings and subheadings"
        ],
        type: 'itinerary'
      },
      {
        id: 5,
        title: "Task 5: Tabulated Document", 
        description: "Display the following information in an appropriate tabular format.",
        content: `ANNUAL EMPLOYEE PERFORMANCE REVIEW SUMMARY
Human Resources Department

DEPARTMENTAL PERFORMANCE RATINGS - 2024

Department | Total Staff | Exceeds Expectations | Meets Expectations | Needs Improvement | Performance Score | Budget Utilization (%)

Sales | 45 | 12 | 28 | 5 | 4.2 | 96.8
Marketing | 28 | 8 | 18 | 2 | 4.3 | 89.5  
Finance | 22 | 6 | 15 | 1 | 4.4 | 92.3
Operations | 38 | 9 | 25 | 4 | 4.1 | 98.1
IT | 31 | 11 | 18 | 2 | 4.5 | 87.9
HR | 15 | 4 | 10 | 1 | 4.2 | 94.6
Customer Service | 52 | 13 | 32 | 7 | 4.0 | 95.2

TOTALS | 231 | 63 | 146 | 22 | 4.2 | 93.5

SALARY BAND DISTRIBUTION

Salary Range ($) | Number of Employees | Average Performance Score | Promotion Rate (%) | Retention Rate (%)

25,000 - 35,000 | 58 | 3.9 | 12.1 | 87.9
35,001 - 50,000 | 72 | 4.1 | 15.3 | 91.7
50,001 - 70,000 | 54 | 4.3 | 18.5 | 94.4  
70,001 - 90,000 | 32 | 4.5 | 21.9 | 96.9
90,001 - 120,000 | 12 | 4.6 | 25.0 | 100.0
120,000+ | 3 | 4.8 | 33.3 | 100.0

TRAINING AND DEVELOPMENT PARTICIPATION

Training Program | Participants | Completion Rate (%) | Performance Improvement | Cost per Employee ($)

Leadership Development | 45 | 88.9 | +0.8 points | 2,850
Technical Skills | 89 | 94.4 | +0.6 points | 1,650  
Communication Skills | 67 | 91.0 | +0.5 points | 980
Project Management | 34 | 85.3 | +0.7 points | 2,200
Customer Service | 78 | 96.2 | +0.4 points | 750
Safety Training | 231 | 100.0 | N/A | 125

PERFORMANCE IMPROVEMENT ACTIONS

Action Required | Number of Staff | Target Completion | Success Rate (%) | Follow-up Required

Mentoring Program | 22 | March 2025 | 73.9 | Yes
Additional Training | 35 | February 2025 | 81.4 | Yes  
Role Restructuring | 8 | January 2025 | 62.5 | Yes
Performance Coaching | 15 | April 2025 | 86.7 | No

Notes:
- Performance scores calculated on 5-point scale (5.0 = Exceeds Expectations)
- Retention rates based on 12-month rolling average
- Training costs include materials, instructor fees, and facility expenses
- Performance improvement data from previous year cohorts`,
        marks: 25,
        timeAllocation: 35,
        instructions: [
          "Use appropriate table formatting with clear borders",
          "Align numerical data consistently",
          "Include all headings and subheadings", 
          "Maintain neat presentation throughout",
          "Include notes and calculation methods"
        ],
        type: 'table'
      }
    ]
  },
  {
    id: 3,
    title: "Information Processing I - Paper 3 (Environmental & Science)",
    duration: 150,
    tasks: [
      {
        id: 1,
        title: "Task 1: Passage Typing",
        description: "Type the following passage in double line spacing, justify your margins.",
        content: `Climate change represents one of the most pressing challenges facing humanity in the twenty-first century. Rising global temperatures, melting ice caps, and extreme weather events demonstrate the urgent need for comprehensive environmental action. Scientists worldwide have reached consensus that human activities, particularly greenhouse gas emissions, are the primary drivers of current climate trends.

Renewable energy technologies offer promising solutions for reducing carbon emissions and achieving sustainable development goals. Solar, wind, and hydroelectric power systems have become increasingly cost-effective alternatives to fossil fuels. Many countries have implemented ambitious renewable energy targets and supporting policies to accelerate the transition to clean energy infrastructure.

Corporate sustainability initiatives play a crucial role in environmental protection efforts. Companies are adopting circular economy principles, reducing waste generation, and implementing carbon-neutral operations. Green technology innovations, sustainable supply chain management, and environmental reporting have become standard business practices for responsible organizations.

Individual actions also contribute significantly to environmental conservation. Energy-efficient appliances, sustainable transportation choices, and conscious consumption patterns help reduce personal carbon footprints. Educational programs and awareness campaigns encourage communities to adopt environmentally friendly lifestyles and support conservation initiatives.`,
        marks: 10,
        timeAllocation: 25,
        instructions: [
          "Use double line spacing throughout",
          "Justify both left and right margins",
          "Maintain consistent formatting",
          "Proofread for accuracy"
        ],
        type: 'passage'
      },
      {
        id: 2,
        title: "Task 2: Business Letter",
        description: "Type the following business letter using appropriate business format.",
        content: `Green Energy Consultants Ltd
88 Renewable Way
ECO PARK
CA 90210
Tel: (310) 555-0156
Email: info@greenenergy.com

Our Ref: GEC/2024/145

[Today's Date]

Ms Elena Rodriguez
Environmental Manager
Sustainable Manufacturing Corp
77 Industrial Boulevard
GREEN VALLEY
TX 78901

Dear Ms Rodriguez

RE: RENEWABLE ENERGY ASSESSMENT AND IMPLEMENTATION PROPOSAL

Thank you for your inquiry regarding renewable energy solutions for your manufacturing facilities. Following our initial consultation and site assessment, I am pleased to present our comprehensive proposal for transitioning your operations to sustainable energy sources.

Our analysis indicates that your facilities are ideally positioned to benefit from a hybrid renewable energy system combining solar photovoltaic panels and wind turbines. The proposed installation would generate approximately 2.5 megawatts of clean energy, covering 85% of your current electricity requirements and reducing your carbon footprint by an estimated 1,200 tons of CO2 annually.

The solar component includes 1,500 high-efficiency panels strategically positioned across your facility rooftops and available ground areas. These panels would generate peak output during daylight hours, aligning well with your primary production schedule. The wind turbines would provide complementary power generation during evening hours and seasonal variations.

Financial projections show significant long-term benefits despite the initial capital investment. The total project cost of $3.8 million would be offset by energy savings of approximately $450,000 annually. Various government incentives and tax credits could reduce the initial investment by up to 30%. We estimate a complete return on investment within eight years, followed by decades of reduced operating costs.

Our implementation timeline spans 18 months, beginning with detailed engineering designs and regulatory approvals. Construction would commence in phase two, with careful coordination to minimize disruption to your ongoing operations. Our experienced project management team ensures on-time delivery and compliance with all safety and environmental standards.

I have attached detailed technical specifications, financial analyses, and case studies from similar installations we have completed for manufacturing clients. Our team is ready to schedule a presentation meeting to discuss this proposal in detail.

Please contact me at your earliest convenience to arrange a meeting with your decision-making team. We are confident this renewable energy solution will provide substantial environmental and economic benefits for your organization.

Yours sincerely

Dr Marcus Thompson
Senior Renewable Energy Consultant

Enclosures: Technical specifications, Financial analysis, Case studies, Implementation timeline`,
        marks: 30,
        timeAllocation: 45,
        instructions: [
          "Use appropriate business letter format",
          "Include all header information",
          "Use today's date",
          "Ensure proper spacing and alignment",
          "Include all enclosures mentioned"
        ],
        type: 'letter'
      },
      {
        id: 3,
        title: "Task 3: Memorandum",
        description: "Type the following memorandum using standard memo format.",
        content: `MEMORANDUM

TO: All Department Heads
FROM: Sarah Williams, Sustainability Director
DATE: [Today's Date]
REF: SW/env/2024/203

SUBJECT: IMPLEMENTATION OF COMPANY-WIDE ENVIRONMENTAL SUSTAINABILITY PROGRAM

I am pleased to announce the launch of our comprehensive environmental sustainability program, designed to reduce our organization's environmental impact while improving operational efficiency. The program will be implemented across all departments over the next six months.

PROGRAM OBJECTIVES
Our sustainability initiative aims to achieve carbon neutrality by 2027, reduce waste generation by 50%, and implement circular economy principles throughout our operations. The program includes energy conservation measures, waste reduction strategies, and sustainable procurement policies. We expect significant cost savings alongside environmental benefits.

ENERGY CONSERVATION MEASURES
All departments must implement energy-saving practices including automatic lighting controls, computer power management, and HVAC optimization. LED lighting upgrades will be completed in all facilities by year-end. Department heads should identify additional energy-saving opportunities and submit recommendations to the sustainability committee.

WASTE REDUCTION AND RECYCLING
New recycling stations will be installed throughout the facility, with separate collection for paper, plastics, electronics, and organic waste. Single-use items will be replaced with reusable alternatives in cafeterias and meeting rooms. Departments must track waste generation and report monthly statistics to measure progress.

SUSTAINABLE PROCUREMENT
All purchasing decisions must consider environmental impact alongside cost and quality factors. Preference should be given to suppliers with verified sustainability credentials and eco-friendly products. The procurement team will develop updated vendor evaluation criteria incorporating environmental performance metrics.

EMPLOYEE ENGAGEMENT
Sustainability training sessions will be conducted for all staff members to ensure understanding of program goals and individual responsibilities. Department champions will be appointed to coordinate local initiatives and communicate best practices. Monthly progress reports will be shared with all employees.

MONITORING AND REPORTING
Environmental performance indicators will be tracked monthly, including energy consumption, waste generation, and resource usage. Quarterly reports will be submitted to senior management and shared with regulatory authorities as required. Department heads must designate staff members responsible for data collection and reporting.

Please ensure all staff in your department receive information about this program and understand their roles in achieving our sustainability goals. Training materials and implementation guidelines are available on the company intranet.`,
        marks: 20,
        timeAllocation: 30,
        instructions: [
          "Use standard memorandum format",
          "Include all header information",
          "Use appropriate spacing",
          "Maintain professional tone",
          "Use today's date"
        ],
        type: 'memo'
      },
      {
        id: 4,
        title: "Task 4: Business Itinerary",
        description: "Display the following business itinerary in an appropriate format.",
        content: `BUSINESS TRIP TO VANCOUVER
International Environmental Conference

Monday 8 April to Thursday 11 April 2025

MONDAY 8 APRIL

Time                    Activity
0445 hours             Taxi from home to Edinburgh Airport
0600 hours             Check-in for Flight AC854 to Vancouver
0750 hours             Flight departure from Edinburgh
                       (Flight time: 9 hours 30 minutes)
1020 hours (local)     Arrive Vancouver International Airport
1145 hours             Immigration and baggage collection
1230 hours             Airport shuttle to Fairmont Pacific Hotel
1330 hours             Hotel check-in and lunch
1500 hours             Pre-conference briefing with UK delegation
1630 hours             Registration for Environmental Summit
1800 hours             Opening reception and networking
2030 hours             Welcome dinner with conference organizers

TUESDAY 9 APRIL

Time                    Activity
0700 hours             Hotel breakfast and preparation
0830 hours             Opening ceremony and keynote address
1000 hours             Session 1: "Carbon Neutrality Strategies"
1130 hours             Coffee break and exhibition viewing
1200 hours             Session 2: "Renewable Energy Innovations"
1330 hours             Networking lunch with industry experts
1500 hours             Workshop: "Sustainable Business Practices"
1630 hours             Panel discussion: "Climate Finance"
1800 hours             End of day sessions
2000 hours             Conference gala dinner

WEDNESDAY 10 APRIL

Time                    Activity
0700 hours             Hotel breakfast
0900 hours             Site visit: Vancouver Clean Technology Centre
1100 hours             Meetings with Canadian environmental agencies
1300 hours             Lunch with potential research partners
1500 hours             Conference sessions: "Green Technology Transfer"
1630 hours             Bilateral meetings with delegation members
1800 hours             Free time for personal activities
2030 hours             Farewell reception at conference venue

THURSDAY 11 APRIL

Time                    Activity
0800 hours             Hotel checkout and departure
1000 hours             Final meetings with local contacts
1200 hours             Lunch and last-minute shopping
1400 hours             Travel to Vancouver International Airport
1530 hours             Check-in for Flight AC855 to Edinburgh
1730 hours             Flight departure from Vancouver
                       (Flight time: 8 hours 45 minutes)
1215 hours (Fri)       Arrive Edinburgh Airport (local time)
1400 hours             Immigration and baggage collection
1530 hours             Taxi home

ESSENTIAL CONTACTS:
Conference Coordinator: Dr James Chen (+1 604 123 4567)
Hotel Reception: Fairmont Pacific (+1 604 684 3131)
UK Consulate Vancouver: (+1 604 683 4421)
Emergency Services: 911
Local Transport: Vancouver Taxi (+1 604 871 1111)`,
        marks: 20,
        timeAllocation: 25,
        instructions: [
          "Use clear tabular format for times and activities",
          "Maintain consistent spacing and alignment",
          "Include all contact information",
          "Use appropriate headings and subheadings"
        ],
        type: 'itinerary'
      },
      {
        id: 5,
        title: "Task 5: Tabulated Document",
        description: "Display the following information in an appropriate tabular format.",
        content: `ENVIRONMENTAL IMPACT ASSESSMENT REPORT
Sustainability Department

CARBON FOOTPRINT ANALYSIS BY DEPARTMENT - 2024

Department | Staff Count | Energy Use (MWh) | CO2 Emissions (tonnes) | Water Usage (liters) | Waste Generated (kg) | Sustainability Score

Manufacturing | 145 | 2,850 | 1,425 | 145,000 | 8,950 | 6.2
Administration | 65 | 485 | 243 | 12,500 | 1,280 | 7.8
Research & Development | 38 | 680 | 340 | 8,900 | 950 | 8.1
Sales & Marketing | 42 | 320 | 160 | 6,800 | 750 | 7.5
Logistics | 28 | 750 | 375 | 18,500 | 2,100 | 6.9
Maintenance | 22 | 425 | 213 | 15,200 | 1,850 | 6.4
Cafeteria | 18 | 380 | 190 | 25,600 | 3,200 | 5.8

TOTALS | 358 | 5,890 | 2,946 | 232,500 | 19,080 | 6.9

RENEWABLE ENERGY ADOPTION PROGRESS

Energy Source | Capacity (kW) | 2023 Generation (MWh) | 2024 Generation (MWh) | Growth (%) | Cost Savings ($)

Solar Panels | 850 | 1,020 | 1,275 | +25.0 | 89,250
Wind Turbines | 420 | 1,680 | 1,890 | +12.5 | 132,300
Geothermal | 150 | 210 | 245 | +16.7 | 17,150
Hydroelectric | 85 | 118 | 135 | +14.4 | 9,450
Biomass | 45 | 62 | 75 | +21.0 | 5,250

TOTAL | 1,550 | 3,090 | 3,620 | +17.2 | 253,400

WASTE MANAGEMENT PERFORMANCE

Waste Category | Generated (kg) | Recycled (kg) | Composted (kg) | Landfill (kg) | Recycling Rate (%) | Cost Impact ($)

Paper & Cardboard | 8,500 | 7,650 | 0 | 850 | 90.0 | -2,550
Plastic Materials | 3,200 | 2,240 | 0 | 960 | 70.0 | -1,120
Electronic Waste | 650 | 585 | 0 | 65 | 90.0 | -292
Organic Waste | 4,800 | 0 | 4,320 | 480 | 90.0 | -1,944
Metal Components | 1,250 | 1,125 | 0 | 125 | 90.0 | -562
Glass Materials | 420 | 378 | 0 | 42 | 90.0 | -189
Hazardous Waste | 260 | 156 | 0 | 104 | 60.0 | -78

TOTALS | 19,080 | 12,134 | 4,320 | 2,626 | 86.2 | -6,735

ENVIRONMENTAL INITIATIVES IMPACT

Initiative | Implementation Date | Participants | CO2 Reduction (tonnes) | Cost Savings ($) | ROI (%)

LED Lighting Upgrade | Jan 2024 | All Departments | 185 | 28,750 | 156
Paperless Office | Mar 2024 | 280 employees | 45 | 15,500 | 233
Electric Vehicle Fleet | Jun 2024 | Logistics Dept | 95 | 18,900 | 89
Smart HVAC System | Aug 2024 | All Buildings | 220 | 35,200 | 178
Water Conservation | Feb 2024 | All Facilities | 12 | 8,900 | 198
Sustainable Catering | Apr 2024 | 358 employees | 85 | 12,400 | 145

Notes:
- Sustainability scores calculated on 10-point scale (10 = excellent performance)
- Cost savings include reduced utility bills and waste disposal fees
- ROI calculations based on first-year performance versus implementation costs
- Data collection period: January 1 - December 31, 2024`,
        marks: 25,
        timeAllocation: 35,
        instructions: [
          "Use appropriate table formatting with clear borders",
          "Align numerical data consistently",
          "Include all headings and subheadings",
          "Maintain neat presentation throughout",
          "Include notes and calculation methods"
        ],
        type: 'table'
      }
    ]
  },
  {
    id: 4,
    title: "Information Processing I - Paper 4 (Healthcare & Education)",
    duration: 150,
    tasks: [
      {
        id: 1,
        title: "Task 1: Passage Typing",
        description: "Type the following passage in double line spacing, justify your margins.",
        content: `Healthcare technology continues to revolutionize medical practice and patient care delivery worldwide. Electronic health records, telemedicine platforms, and artificial intelligence diagnostics have transformed how healthcare professionals diagnose, treat, and monitor patients. These technological advances improve treatment accuracy, reduce medical errors, and enhance patient outcomes across diverse medical specialties.

Digital learning platforms have similarly transformed educational institutions at all levels. Online courses, virtual classrooms, and interactive learning management systems provide flexible access to education for students regardless of geographical location or personal circumstances. Educational technology tools enable personalized learning experiences, real-time progress tracking, and collaborative learning opportunities.

The integration of technology in healthcare and education faces several challenges including data privacy concerns, digital literacy requirements, and infrastructure limitations. Healthcare organizations must ensure patient confidentiality while leveraging technology benefits. Educational institutions must provide adequate technical support and training to ensure effective technology adoption by students and faculty.

Future developments in both sectors promise even greater technological integration. Artificial intelligence will enhance diagnostic capabilities in healthcare while providing personalized tutoring in education. Virtual and augmented reality technologies will offer immersive learning experiences and advanced medical training simulations. These innovations will continue reshaping professional practices and service delivery in both critical sectors.`,
        marks: 10,
        timeAllocation: 25,
        instructions: [
          "Use double line spacing throughout",
          "Justify both left and right margins",
          "Maintain consistent formatting",
          "Proofread for accuracy"
        ],
        type: 'passage'
      },
      {
        id: 2,
        title: "Task 2: Business Letter",
        description: "Type the following business letter using appropriate business format.",
        content: `HealthTech Solutions International
25 Medical Center Drive
HEALTH VALLEY
FL 33101
Tel: (305) 555-0187
Email: partnerships@healthtech.net

Our Ref: HTS/2024/298

[Today's Date]

Dr Patricia Anderson
Chief Medical Officer
Regional Medical Center
150 Hospital Boulevard
MEDICAL CITY
GA 30309

Dear Dr Anderson

RE: ELECTRONIC HEALTH RECORD SYSTEM UPGRADE AND TRAINING PARTNERSHIP

Thank you for your interest in upgrading your medical center's electronic health record system. Following our comprehensive assessment of your current infrastructure and future requirements, I am pleased to present our tailored solution for enhancing your healthcare information management capabilities.

Our latest EHR platform, MedConnect Pro, integrates seamlessly with existing medical devices and laboratory systems while providing enhanced security features and improved user interfaces. The system supports real-time patient monitoring, automated medication tracking, and comprehensive clinical decision support tools. Implementation includes data migration from your current system with zero downtime during the transition period.

The proposed training program addresses the specific needs of your 350 medical staff members across all departments. Our certified trainers will conduct on-site sessions covering system navigation, patient data management, and advanced reporting features. Training will be delivered in small groups to ensure personalized attention and hands-on practice with actual patient scenarios relevant to each department's workflow.

Technical specifications include cloud-based hosting with 99.9% uptime guarantee, HIPAA-compliant data encryption, and 24/7 technical support. The system accommodates your current patient volume of 15,000 active records with scalability for future growth. Advanced analytics tools provide valuable insights for quality improvement initiatives and regulatory compliance reporting.

Project timeline spans four months from contract signing to full implementation. Phase one involves system configuration and staff training, followed by pilot testing in selected departments. Full deployment occurs in phase three with ongoing support and system optimization. Our project management team ensures minimal disruption to patient care during all implementation phases.

Investment costs include software licensing, training delivery, and technical support for the first year. Detailed pricing information is provided in the attached proposal document. Financing options are available to spread costs over multiple years while maintaining budget flexibility for other operational priorities.

I have enclosed comprehensive technical documentation, training curricula, and references from similar medical centers we have successfully served. Our implementation team is available to begin work within two weeks of contract execution.

Please contact me to schedule a demonstration for your senior medical staff and IT team. We are confident that MedConnect Pro will significantly enhance your patient care capabilities while improving operational efficiency.

Yours sincerely

Robert Chen
Senior Healthcare Technology Consultant

Enclosures: Technical specifications, Training curriculum, Client references, Pricing proposal`,
        marks: 30,
        timeAllocation: 45,
        instructions: [
          "Use appropriate business letter format",
          "Include all header information",
          "Use today's date",
          "Ensure proper spacing and alignment",
          "Include all enclosures mentioned"
        ],
        type: 'letter'
      },
      {
        id: 3,
        title: "Task 3: Memorandum",
        description: "Type the following memorandum using standard memo format.",
        content: `MEMORANDUM

TO: All Faculty Members
FROM: Dr Michelle Taylor, Dean of Academic Affairs
DATE: [Today's Date]
REF: MT/academic/2024/156

SUBJECT: IMPLEMENTATION OF HYBRID LEARNING MODEL AND DIGITAL ASSESSMENT PLATFORM

Following extensive consultation with department heads and student representatives, the university will implement a comprehensive hybrid learning model beginning next semester. This initiative combines traditional classroom instruction with online learning components to provide flexible and enhanced educational experiences.

HYBRID LEARNING STRUCTURE
The new model requires all courses to include both face-to-face and online components. Lecture-based courses will conduct 60% of sessions in traditional classrooms with 40% delivered through live online platforms. Laboratory and practical courses will maintain in-person requirements while incorporating virtual simulations and online theoretical components.

DIGITAL ASSESSMENT PLATFORM
A new assessment system will replace traditional paper-based examinations with secure online testing capabilities. The platform includes anti-cheating measures, automatic grading for objective questions, and plagiarism detection software. Faculty members will receive comprehensive training on creating effective online assessments and maintaining academic integrity standards.

TECHNOLOGY REQUIREMENTS
All faculty must ensure reliable internet connectivity and appropriate presentation equipment for online sessions. The university will provide necessary software licenses and technical training. Students will receive access to learning management systems, collaboration tools, and digital library resources. Technical support will be available during business hours for both faculty and students.

CURRICULUM ADAPTATION
Course syllabi must be updated to reflect hybrid delivery methods and revised assessment criteria. Online components should include interactive elements such as discussion forums, virtual group projects, and multimedia presentations. Faculty development workshops will provide guidance on effective online teaching strategies and student engagement techniques.

QUALITY ASSURANCE
Regular evaluation of hybrid learning effectiveness will be conducted through student feedback surveys, academic performance analysis, and peer review processes. Department heads will monitor course delivery quality and provide additional support where needed. Best practices will be shared across departments to ensure consistent educational standards.

SUPPORT RESOURCES
The Center for Teaching Excellence will offer ongoing professional development opportunities focused on digital pedagogy and online course design. Technical helpdesk services will be expanded to accommodate increased support requests. Additional instructional design consultants will be available to assist with complex course conversions.

Faculty training sessions will begin next week with mandatory participation for all teaching staff. Please review the attached guidelines and contact the academic affairs office with any questions or concerns about the implementation process.`,
        marks: 20,
        timeAllocation: 30,
        instructions: [
          "Use standard memorandum format",
          "Include all header information",
          "Use appropriate spacing",
          "Maintain professional tone",
          "Use today's date"
        ],
        type: 'memo'
      },
      {
        id: 4,
        title: "Task 4: Business Itinerary",
        description: "Display the following business itinerary in an appropriate format.",
        content: `BUSINESS TRIP TO MELBOURNE
International Education Technology Conference

Tuesday 21 May to Friday 24 May 2025

TUESDAY 21 MAY

Time                    Activity
0400 hours             Taxi from home to Birmingham Airport
0530 hours             Check-in for Flight QF010 to Melbourne
0720 hours             Flight departure from Birmingham
                       (Flight time: 21 hours 30 minutes via Dubai)
0550 hours (Wed)       Arrive Melbourne Airport (local time)
0715 hours             Immigration and baggage collection
0830 hours             Taxi to Crown Towers Melbourne
0930 hours             Hotel check-in and breakfast
1130 hours             Meeting with Melbourne University delegation
1330 hours             Lunch with conference organizing committee
1500 hours             Conference venue inspection and setup
1700 hours             Technical rehearsal for presentation
1900 hours             Welcome cocktail reception

WEDNESDAY 22 MAY

Time                    Activity
0700 hours             Hotel breakfast and preparation
0830 hours             Conference opening ceremony
1000 hours             Keynote: "Future of Educational Technology"
1130 hours             Coffee break and networking session
1200 hours             Panel discussion: "AI in Education"
1400 hours             Lunch and exhibition viewing
1530 hours             Workshop: "Virtual Reality Learning"
1700 hours             Presentation: "Digital Assessment Methods"
1830 hours             End of day sessions
2000 hours             Conference dinner at Eureka Skydeck

THURSDAY 23 MAY

Time                    Activity
0700 hours             Hotel breakfast
0900 hours             School visits: Melbourne Grammar School
1100 hours             Technology demonstration sessions
1300 hours             Lunch with Australian education officials
1500 hours             University campus tour: RMIT University
1630 hours             Meetings with potential research partners
1800 hours             Free time for personal activities
2030 hours             Networking dinner with international delegates

FRIDAY 24 MAY

Time                    Activity
0730 hours             Hotel checkout
0900 hours             Final conference sessions and closing ceremony
1200 hours             Farewell lunch with organizers
1400 hours             Last-minute shopping at Queen Victoria Market
1630 hours             Travel to Melbourne Airport
1830 hours             Check-in for Flight QF009 to Birmingham
2030 hours             Flight departure from Melbourne
                       (Flight time: 22 hours via Dubai)
0630 hours (Sat)       Arrive Birmingham Airport (local time)
0800 hours             Immigration and baggage collection
0930 hours             Taxi home

IMPORTANT CONTACTS:
Conference Director: Prof Susan Walsh (+61 3 9123 4567)
Hotel Concierge: Crown Towers (+61 3 9292 8888)
Melbourne University: Dr Michael Foster (+61 3 8344 4000)
Australian Embassy: (+61 2 6270 6666)
Airport Transport: SkyBus Melbourne (+61 3 9335 2811)`,
        marks: 20,
        timeAllocation: 25,
        instructions: [
          "Use clear tabular format for times and activities",
          "Maintain consistent spacing and alignment",
          "Include all contact information",
          "Use appropriate headings and subheadings"
        ],
        type: 'itinerary'
      },
      {
        id: 5,
        title: "Task 5: Tabulated Document",
        description: "Display the following information in an appropriate tabular format.",
        content: `UNIVERSITY DIGITAL LEARNING PLATFORM PERFORMANCE REPORT
Information Technology Department

STUDENT ENGAGEMENT METRICS BY FACULTY - AUTUMN 2024

Faculty | Total Students | Platform Logins | Assignment Submissions | Discussion Posts | Average Grade (%) | Satisfaction Score

Arts & Humanities | 2,450 | 156,800 | 18,650 | 12,480 | 72.3 | 8.1
Science & Engineering | 1,890 | 198,500 | 22,340 | 8,950 | 68.9 | 7.8
Business Administration | 3,200 | 224,600 | 28,800 | 19,200 | 75.6 | 8.4
Medicine & Health | 1,250 | 187,500 | 16,750 | 6,250 | 81.2 | 8.9
Education | 980 | 78,400 | 9,310 | 7,840 | 77.8 | 8.6
Law | 650 | 58,500 | 6,175 | 4,550 | 74.1 | 8.2
Social Sciences | 1,580 | 126,400 | 15,170 | 11,060 | 73.5 | 8.0

TOTALS | 12,000 | 1,030,700 | 117,195 | 70,330 | 74.7 | 8.3

ONLINE COURSE COMPLETION RATES

Course Type | Enrolled Students | Completed | Withdrawn | Pass Rate (%) | Student Feedback | Technical Issues

Undergraduate Core | 4,800 | 4,512 | 288 | 94.0 | Excellent | Minimal
Postgraduate Taught | 2,100 | 1,995 | 105 | 95.0 | Very Good | Low
Professional Development | 1,650 | 1,485 | 165 | 90.0 | Good | Moderate
Certificate Programs | 890 | 801 | 89 | 90.0 | Good | Low
Research Methods | 750 | 675 | 75 | 90.0 | Very Good | Minimal
Language Courses | 1,200 | 1,080 | 120 | 90.0 | Excellent | Low
Skills Workshops | 610 | 549 | 61 | 90.0 | Good | Moderate

DIGITAL ASSESSMENT PLATFORM USAGE

Assessment Type | Total Assessments | Submissions | Late Submissions | Technical Failures | Average Score (%) | Time Saved (hours)

Multiple Choice Quizzes | 5,450 | 5,341 | 89 | 20 | 78.5 | 1,635
Essay Assignments | 3,200 | 3,104 | 76 | 20 | 71.2 | 480
Case Study Analysis | 1,890 | 1,834 | 41 | 15 | 73.8 | 567
Laboratory Reports | 2,100 | 2,037 | 48 | 15 | 79.1 | 315
Group Projects | 980 | 951 | 19 | 10 | 76.4 | 196
Practical Examinations | 650 | 637 | 8 | 5 | 82.3 | 130
Oral Presentations | 430 | 421 | 6 | 3 | 80.1 | 86

FACULTY TECHNOLOGY ADOPTION

Department | Staff Count | Training Completed | Platform Usage (%) | Support Requests | Satisfaction Level | Innovation Index

Computer Science | 45 | 45 | 98 | 12 | Excellent | 9.2
Engineering | 62 | 59 | 95 | 23 | Very Good | 8.8
Business | 78 | 74 | 95 | 31 | Very Good | 8.5
Medicine | 89 | 85 | 96 | 38 | Excellent | 9.0
Education | 34 | 34 | 100 | 8 | Excellent | 9.4
Arts | 56 | 52 | 93 | 28 | Good | 7.9
Social Sciences | 41 | 38 | 93 | 22 | Good | 8.1

Note: 
- Satisfaction scores on 10-point scale (1=poor, 10=excellent)
- Innovation Index measures adoption of advanced platform features
- Technical failure rate maintained below 0.5% for all assessment types
- Data collection period: September - December 2024`,
        marks: 25,
        timeAllocation: 35,
        instructions: [
          "Use appropriate table formatting with clear borders",
          "Align numerical data consistently",
          "Include all headings and subheadings",
          "Maintain neat presentation throughout",
          "Include notes and methodology information"
        ],
        type: 'table'
      }
    ]
  },
  {
    id: 5,
    title: "Information Processing I - Paper 5 (Finance & Economics)",
    duration: 150,
    tasks: [
      {
        id: 1,
        title: "Task 1: Passage Typing",
        description: "Type the following passage in double line spacing, justify your margins.",
        content: `Global financial markets have experienced unprecedented volatility in recent years due to various economic and geopolitical factors. Central banks worldwide have implemented diverse monetary policies to address inflation concerns, supply chain disruptions, and employment challenges. Interest rate adjustments, quantitative easing programs, and fiscal stimulus packages have significant impacts on investment strategies and business planning decisions.

Cryptocurrency and digital payment systems continue to reshape traditional banking and financial services industries. Blockchain technology offers enhanced security and transparency for financial transactions while reducing processing costs and settlement times. However, regulatory frameworks struggle to adapt to rapidly evolving digital financial instruments and their associated risks.

International trade relationships and economic partnerships significantly influence global market stability and growth prospects. Trade agreements, tariff policies, and currency exchange rates affect import-export activities and multinational business operations. Companies must navigate complex regulatory environments while maintaining competitive positioning in diverse international markets.

Sustainable finance and environmental, social, and governance (ESG) criteria increasingly influence investment decisions and corporate governance practices. Investors prioritize companies demonstrating environmental responsibility, social impact, and ethical governance standards. This trend drives innovation in green technologies and sustainable business models while creating new opportunities for responsible investment strategies.`,
        marks: 10,
        timeAllocation: 25,
        instructions: [
          "Use double line spacing throughout",
          "Justify both left and right margins",
          "Maintain consistent formatting",
          "Proofread for accuracy"
        ],
        type: 'passage'
      },
      {
        id: 2,
        title: "Task 2: Business Letter",
        description: "Type the following business letter using appropriate business format.",
        content: `Global Investment Advisory Services
120 Financial District Plaza
CAPITAL CITY
NV 89101
Tel: (702) 555-0198
Email: advisory@globalinvest.com

Our Ref: GIAS/2024/756

[Today's Date]

Mr Jonathan Mitchell
Chief Financial Officer
Innovative Technologies Corporation
85 Corporate Center Drive
TECH VALLEY
WA 98101

Dear Mr Mitchell

RE: COMPREHENSIVE INVESTMENT PORTFOLIO REVIEW AND STRATEGIC RECOMMENDATIONS

Thank you for engaging our services to conduct a thorough review of your corporation's investment portfolio and provide strategic recommendations for optimizing returns while managing risk exposure. Following our detailed analysis of your current holdings and financial objectives, I am pleased to present our comprehensive findings and recommendations.

Our assessment reveals a well-diversified portfolio with total assets under management valued at $125 million across various asset classes. Current allocation includes 45% equity securities, 30% fixed-income instruments, 15% alternative investments, and 10% cash equivalents. While this distribution provides reasonable diversification, several optimization opportunities exist to enhance risk-adjusted returns.

We recommend rebalancing your equity portfolio to include greater exposure to emerging market securities and technology sector investments. These sectors demonstrate strong growth potential despite short-term volatility concerns. Specifically, we suggest allocating 15% of equity holdings to emerging market funds and increasing technology sector exposure from 12% to 18% of total equity investments.

Fixed-income strategy should emphasize shorter-duration instruments given current interest rate environment and inflation expectations. We recommend reducing exposure to long-term government bonds while increasing allocation to corporate bonds and inflation-protected securities. This adjustment will help preserve capital while maintaining steady income generation during uncertain economic conditions.

Alternative investments present excellent diversification opportunities through real estate investment trusts, commodity futures, and private equity partnerships. We suggest increasing alternative allocation from 15% to 20% of total portfolio value. These investments provide inflation protection and often demonstrate low correlation with traditional stock and bond markets.

Risk management strategies include implementing systematic rebalancing procedures, establishing stop-loss orders for volatile positions, and maintaining adequate liquidity reserves. We recommend quarterly portfolio reviews with annual strategic assessments to ensure alignment with changing market conditions and corporate objectives.

Implementation timeline spans six months with gradual position adjustments to minimize market impact and transaction costs. Our portfolio management team will oversee all transitions while maintaining communication with your finance department throughout the process.

I have attached detailed analysis reports, recommended portfolio allocations, and projected performance scenarios based on various market conditions. Our investment committee is available to present these findings to your board of directors at your convenience.

Please contact me to schedule a comprehensive presentation meeting with your senior management team. We look forward to supporting your corporation's long-term financial growth and investment success.

Yours sincerely

Amanda Rodriguez
Senior Investment Advisor

Enclosures: Portfolio analysis, Asset allocation recommendations, Performance projections, Implementation timeline`,
        marks: 30,
        timeAllocation: 45,
        instructions: [
          "Use appropriate business letter format",
          "Include all header information",
          "Use today's date",
          "Ensure proper spacing and alignment",
          "Include all enclosures mentioned"
        ],
        type: 'letter'
      },
      {
        id: 3,
        title: "Task 3: Memorandum",
        description: "Type the following memorandum using standard memo format.",
        content: `MEMORANDUM

TO: All Department Managers
FROM: David Park, Chief Financial Officer
DATE: [Today's Date]
REF: DP/finance/2024/412

SUBJECT: IMPLEMENTATION OF NEW FINANCIAL REPORTING SYSTEM AND BUDGET CONTROLS

Effective from the beginning of next quarter, the organization will implement a comprehensive financial reporting system designed to improve budget monitoring, expense tracking, and financial analysis capabilities. This system replaces our current manual processes with automated workflows and real-time reporting features.

SYSTEM CAPABILITIES
The new platform integrates with existing accounting software and provides department-level budget tracking, expense approval workflows, and automated variance reporting. Managers will have access to real-time budget status, historical spending patterns, and projected year-end results. The system includes mobile applications for expense reporting and approval processes while traveling or working remotely.

BUDGET CONTROL MEASURES
Enhanced authorization limits require supervisor approval for expenditures exceeding $500 and senior management approval for amounts over $2,500. All purchase orders must be processed through the new system with proper budget coding and justification documentation. Quarterly budget reviews will be conducted with department managers to assess performance against targets and identify corrective actions.

TRAINING AND IMPLEMENTATION
Mandatory training sessions begin next week for all managers and their designated financial coordinators. Training covers system navigation, expense reporting procedures, and budget monitoring techniques. Additional workshops will address advanced reporting features and financial analysis tools. Online tutorials and help documentation will be available through the company intranet.

REPORTING REQUIREMENTS
Monthly financial reports must be submitted by the fifth working day of each month using standardized templates provided by the system. Reports should include budget variance analysis, explanations for significant deviations, and corrective action plans where necessary. Quarterly forecasts must be updated to reflect current trends and anticipated changes in operating conditions.

COMPLIANCE AND AUDIT
The new system maintains comprehensive audit trails for all financial transactions and includes built-in controls to ensure compliance with corporate policies and regulatory requirements. Internal audit procedures will be updated to leverage system capabilities for continuous monitoring and exception reporting. External auditors will receive training on system functionality to facilitate annual audit processes.

SUPPORT RESOURCES
A dedicated help desk will be available during business hours for system-related questions and technical issues. The finance team will provide ongoing support for budget analysis and reporting interpretation. Regular system updates and enhancements will be implemented based on user feedback and changing business requirements.

Please ensure all staff in your department understand these new procedures and attend required training sessions. Contact the finance department immediately if you encounter any difficulties during the transition period.`,
        marks: 20,
        timeAllocation: 30,
        instructions: [
          "Use standard memorandum format",
          "Include all header information",
          "Use appropriate spacing",
          "Maintain professional tone",
          "Use today's date"
        ],
        type: 'memo'
      },
      {
        id: 4,
        title: "Task 4: Business Itinerary",
        description: "Display the following business itinerary in an appropriate format.",
        content: `BUSINESS TRIP TO ZURICH
International Banking Conference

Sunday 12 October to Wednesday 15 October 2025

SUNDAY 12 OCTOBER

Time                    Activity
1300 hours             Taxi from home to London Gatwick Airport
1430 hours             Check-in for Flight LX333 to Zurich
1620 hours             Flight departure from London Gatwick
                       (Flight time: 1 hour 45 minutes)
1805 hours             Arrive Zurich Airport (local time)
1900 hours             Immigration and baggage collection
1945 hours             Train from airport to Zurich Hauptbahnhof
2030 hours             Taxi to Baur au Lac Hotel
2100 hours             Hotel check-in and evening meal
2230 hours             Review conference materials and preparation

MONDAY 13 OCTOBER

Time                    Activity
0700 hours             Hotel breakfast and preparation
0830 hours             Travel to Swiss Banking Institute
0930 hours             Conference registration and welcome session
1030 hours             Opening keynote: "Digital Banking Revolution"
1200 hours             Panel discussion: "Cryptocurrency Regulation"
1330 hours             Networking lunch with international delegates
1500 hours             Workshop: "Risk Management in Digital Assets"
1630 hours             Coffee break and exhibition viewing
1700 hours             Presentation: "Sustainable Finance Initiatives"
1830 hours             End of conference sessions
2000 hours             Welcome dinner at Restaurant Kronenhalle

TUESDAY 14 OCTOBER

Time                    Activity
0700 hours             Hotel breakfast
0900 hours             Bilateral meetings with Swiss banks
1100 hours             Visit to UBS headquarters
1300 hours             Business lunch with potential partners
1500 hours             Conference session: "Central Bank Digital Currencies"
1630 hours             Panel: "Future of International Banking"
1800 hours             Private banking tour and demonstrations
2000 hours             Conference gala dinner at Lake Zurich

WEDNESDAY 15 OCTOBER

Time                    Activity
0800 hours             Hotel checkout
1000 hours             Final conference sessions and closing remarks
1200 hours             Farewell lunch with organizers
1400 hours             Shopping at Bahnhofstrasse
1600 hours             Travel to Zurich Airport
1730 hours             Check-in for Flight LX334 to London Gatwick
1915 hours             Flight departure from Zurich
                       (Flight time: 2 hours 10 minutes)
2025 hours             Arrive London Gatwick (local time)
2130 hours             Immigration and baggage collection
2230 hours             Taxi home

ESSENTIAL CONTACTS:
Conference Organizer: Dr Hans Mueller (+41 44 123 4567)
Hotel Reception: Baur au Lac (+41 44 220 5020)
Swiss Banking Institute: (+41 44 254 3000)
UK Embassy Bern: (+41 31 359 7700)
Airport Information: (+41 43 816 2211)`,
        marks: 20,
        timeAllocation: 25,
        instructions: [
          "Use clear tabular format for times and activities",
          "Maintain consistent spacing and alignment",
          "Include all contact information",
          "Use appropriate headings and subheadings"
        ],
        type: 'itinerary'
      },
      {
        id: 5,
        title: "Task 5: Tabulated Document",
        description: "Display the following information in an appropriate tabular format.",
        content: `QUARTERLY FINANCIAL PERFORMANCE ANALYSIS
Finance Department

REVENUE BREAKDOWN BY BUSINESS UNIT - Q4 2024

Business Unit | Q4 Revenue ($000) | Q4 Target ($000) | Variance ($000) | Variance (%) | Market Share (%) | Growth Rate (%)

Corporate Banking | 12,850 | 12,000 | +850 | +7.1 | 15.2 | +12.3
Investment Services | 8,750 | 9,200 | -450 | -4.9 | 8.9 | +5.7
Retail Banking | 15,600 | 15,800 | -200 | -1.3 | 22.1 | +8.9
Wealth Management | 6,400 | 6,100 | +300 | +4.9 | 11.7 | +15.2
Insurance Products | 4,950 | 4,800 | +150 | +3.1 | 6.8 | +9.4
Digital Services | 3,200 | 2,900 | +300 | +10.3 | 4.2 | +28.7
International | 7,850 | 8,100 | -250 | -3.1 | 9.3 | +6.8

TOTALS | 59,600 | 58,900 | +700 | +1.2 | 12.8 | +11.0

EXPENSE ANALYSIS BY CATEGORY

Expense Category | Q4 Actual ($000) | Q4 Budget ($000) | Variance ($000) | Variance (%) | % of Revenue | YoY Change (%)

Personnel Costs | 28,500 | 29,200 | -700 | -2.4 | 47.8 | +8.5
Technology & IT | 8,950 | 8,600 | +350 | +4.1 | 15.0 | +15.3
Marketing & Advertising | 4,200 | 4,500 | -300 | -6.7 | 7.0 | +12.7
Facilities & Operations | 3,850 | 3,900 | -50 | -1.3 | 6.5 | +5.2
Regulatory Compliance | 2,600 | 2,400 | +200 | +8.3 | 4.4 | +18.9
Professional Services | 1,950 | 2,100 | -150 | -7.1 | 3.3 | +7.8
Other Operating | 2,150 | 2,200 | -50 | -2.3 | 3.6 | +9.1

TOTALS | 52,200 | 52,900 | -700 | -1.3 | 87.6 | +9.8

PROFITABILITY METRICS

Metric | Q4 2024 | Q4 2023 | Q3 2024 | Change QoQ (%) | Change YoY (%) | Industry Average

Operating Income ($000) | 7,400 | 6,100 | 6,850 | +8.0 | +21.3 | 6,800
Net Income ($000) | 5,550 | 4,575 | 5,138 | +8.0 | +21.3 | 5,100
Operating Margin (%) | 12.4 | 11.2 | 12.1 | +0.3 | +1.2 | 11.8
Net Margin (%) | 9.3 | 8.4 | 9.1 | +0.2 | +0.9 | 8.8
Return on Assets (%) | 1.8 | 1.5 | 1.7 | +0.1 | +0.3 | 1.6
Return on Equity (%) | 15.2 | 12.8 | 14.1 | +1.1 | +2.4 | 13.5

LIQUIDITY AND CAPITAL RATIOS

Ratio | Current Value | Target Range | Industry Benchmark | Rating | Trend | Risk Level

Current Ratio | 1.45 | 1.20-1.60 | 1.35 | Good | Stable | Low
Quick Ratio | 1.18 | 1.00-1.30 | 1.15 | Good | Improving | Low
Debt-to-Equity | 0.68 | 0.40-0.80 | 0.72 | Acceptable | Decreasing | Medium
Interest Coverage | 8.5 | >6.0 | 7.2 | Excellent | Increasing | Low
Capital Adequacy | 14.2 | >12.0 | 13.1 | Strong | Stable | Low
Tier 1 Capital | 12.8 | >10.5 | 11.9 | Strong | Increasing | Low

Notes:
- All revenue figures exclude extraordinary items and one-time adjustments
- Expense variance analysis includes impact of foreign exchange fluctuations
- Industry averages sourced from Financial Services Benchmarking Report 2024
- Capital ratios calculated according to Basel III requirements`,
        marks: 25,
        timeAllocation: 35,
        instructions: [
          "Use appropriate table formatting with clear borders",
          "Align numerical data consistently",
          "Include all headings and subheadings",
          "Maintain neat presentation throughout",
          "Include notes and data sources"
        ],
        type: 'table'
      }
    ]
  }
];

const EnhancedExamPractice: React.FC = () => {
  const [selectedExam, setSelectedExam] = useState<number>(1);
  const [currentTask, setCurrentTask] = useState<number>(0);
  const [examStarted, setExamStarted] = useState<boolean>(false);
  const [examPaused, setExamPaused] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [taskStartTime, setTaskStartTime] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showInstructions, setShowInstructions] = useState<boolean>(true);
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());

  const currentExam = examSets.find(exam => exam.id === selectedExam);
  const currentTaskData = currentExam?.tasks[currentTask];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (examStarted && !examPaused && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examStarted, examPaused, timeRemaining]);

  const startExam = () => {
    if (currentExam) {
      setTimeRemaining(currentExam.duration * 60); // Convert to seconds
      setTaskStartTime(Date.now());
      setExamStarted(true);
      setExamPaused(false);
      setShowInstructions(false);
      setCurrentTask(0);
      setUserAnswers({});
      setCompletedTasks(new Set());
    }
  };

  const pauseExam = () => {
    setExamPaused(!examPaused);
  };

  const stopExam = () => {
    setExamStarted(false);
    setExamPaused(false);
    setTimeRemaining(0);
    setCurrentTask(0);
    setShowInstructions(true);
  };

  const nextTask = () => {
    if (currentExam && currentTask < currentExam.tasks.length - 1) {
      setCompletedTasks(prev => new Set([...prev, currentTaskData!.id]));
      setCurrentTask(prev => prev + 1);
      setTaskStartTime(Date.now());
    }
  };

  const previousTask = () => {
    if (currentTask > 0) {
      setCurrentTask(prev => prev - 1);
    }
  };

  const handleAnswerChange = (taskId: number, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [taskId]: answer
    }));
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = (): number => {
    if (!currentExam) return 0;
    return ((currentTask + 1) / currentExam.tasks.length) * 100;
  };

  if (showInstructions) {
    return (
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
            Information Processing I - Examination Practice
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Select Examination Paper
                  </Typography>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Choose Exam Paper</InputLabel>
                    <Select
                      value={selectedExam}
                      onChange={(e) => setSelectedExam(Number(e.target.value))}
                      label="Choose Exam Paper"
                    >
                      {examSets.map((exam) => (
                        <MenuItem key={exam.id} value={exam.id}>
                          {exam.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  
                  {currentExam && (
                    <Box>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        <strong>Duration:</strong> {Math.floor(currentExam.duration / 60)} hours {currentExam.duration % 60} minutes
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        <strong>Total Tasks:</strong> {currentExam.tasks.length}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Total Marks:</strong> {currentExam.tasks.reduce((sum, task) => sum + task.marks, 0)}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Examination Instructions
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>NATIONAL CERTIFICATE IN SECRETARIAL STUDIES</strong><br/>
                    INFORMATION PROCESSING I PART I
                  </Typography>
                  
                  <Alert severity="info" sx={{ mb: 2 }}>
                    <Typography variant="body2">
                      <strong>INSTRUCTIONS TO CANDIDATES:</strong>
                    </Typography>
                    <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                      <li>The tasks may be completed in any order but should be submitted in numerical order</li>
                      <li>Use today's date for letters and memoranda</li>
                      <li>Any appropriate method of display may be used except when specific instructions are given</li>
                      <li>Use a ragged right margin except when justified margins are specified</li>
                      <li>Read all instructions carefully before beginning each task</li>
                      <li>Manage your time effectively across all tasks</li>
                    </ul>
                  </Alert>

                  {currentExam && (
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="h6" gutterBottom>
                        Task Overview:
                      </Typography>
                      {currentExam.tasks.map((task, index) => (
                        <Box key={task.id} sx={{ mb: 1 }}>
                          <Typography variant="body2">
                            <strong>Task {index + 1}:</strong> {task.title} ({task.marks} marks)
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrow />}
              onClick={startExam}
              disabled={!currentExam}
              sx={{ px: 4, py: 2 }}
            >
              Start Examination
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  }

  if (!currentExam || !currentTaskData) {
    return null;
  }

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto', p: 2 }}>
      {/* Exam Header */}
      <Paper sx={{ p: 2, mb: 2, background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)', color: 'white' }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {currentExam.title}
            </Typography>
            <Typography variant="body2">
              Task {currentTask + 1} of {currentExam.tasks.length}
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <Timer />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {formatTime(timeRemaining)}
              </Typography>
            </Box>
            <Typography variant="body2">
              Time Remaining
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4} sx={{ textAlign: 'right' }}>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                color="warning"
                size="small"
                startIcon={examPaused ? <PlayArrow /> : <Pause />}
                onClick={pauseExam}
              >
                {examPaused ? 'Resume' : 'Pause'}
              </Button>
              <Button
                variant="contained" 
                color="error"
                size="small"
                startIcon={<Stop />}
                onClick={stopExam}
              >
                Stop
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Progress Bar */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" sx={{ minWidth: '100px' }}>
            Progress:
          </Typography>
          <LinearProgress
            variant="determinate"
            value={getProgressPercentage()}
            sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
          />
          <Typography variant="body2" sx={{ minWidth: '50px' }}>
            {Math.round(getProgressPercentage())}%
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
          {currentExam.tasks.map((task, index) => (
            <Chip
              key={task.id}
              label={`Task ${index + 1}`}
              variant={index === currentTask ? 'filled' : 'outlined'}
              color={completedTasks.has(task.id) ? 'success' : index === currentTask ? 'primary' : 'default'}
              icon={completedTasks.has(task.id) ? <CheckCircle /> : <Assignment />}
              onClick={() => setCurrentTask(index)}
              sx={{ cursor: 'pointer' }}
            />
          ))}
        </Box>
      </Paper>

      {/* Task Content */}
      <Paper sx={{ p: 3, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {currentTaskData.title}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {currentTaskData.description}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Chip
              label={`${currentTaskData.marks} marks`}
              color="primary"
              variant="filled"
              sx={{ mb: 1 }}
            />
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Schedule fontSize="small" />
              Suggested: {currentTaskData.timeAllocation} min
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Task Instructions */}
        {currentTaskData.instructions.length > 0 && (
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
              Instructions:
            </Typography>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              {currentTaskData.instructions.map((instruction, index) => (
                <li key={index}>
                  <Typography variant="body2">{instruction}</Typography>
                </li>
              ))}
            </ul>
          </Alert>
        )}

        {/* Task Content */}
        <Paper sx={{ p: 2, bgcolor: 'grey.50', mb: 3 }}>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', lineHeight: 1.6 }}>
            {currentTaskData.content}
          </Typography>
        </Paper>

        {/* Answer Area */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Your Answer:
          </Typography>
          <TextField
            multiline
            fullWidth
            rows={12}
            variant="outlined"
            placeholder={`Begin typing your answer for ${currentTaskData.title}...`}
            value={userAnswers[currentTaskData.id] || ''}
            onChange={(e) => handleAnswerChange(currentTaskData.id, e.target.value)}
            disabled={examPaused}
            sx={{
              '& .MuiInputBase-root': {
                fontFamily: 'monospace',
                fontSize: '14px',
                lineHeight: 1.5,
              }
            }}
          />
        </Box>
      </Paper>

      {/* Navigation */}
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            variant="outlined"
            onClick={previousTask}
            disabled={currentTask === 0 || examPaused}
          >
            Previous Task
          </Button>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2">
              Task {currentTask + 1} of {currentExam.tasks.length}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Words typed: {(userAnswers[currentTaskData.id] || '').split(' ').filter(word => word.length > 0).length}
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            onClick={nextTask}
            disabled={currentTask === currentExam.tasks.length - 1 || examPaused}
          >
            {currentTask === currentExam.tasks.length - 1 ? 'Complete Exam' : 'Next Task'}
          </Button>
        </Box>
      </Paper>

      {/* Time Warning Dialog */}
      <Dialog open={timeRemaining <= 300 && timeRemaining > 0 && examStarted && !examPaused}>
        <DialogTitle sx={{ color: 'error.main' }}>
          ⚠️ Time Warning
        </DialogTitle>
        <DialogContent>
          <Typography>
            You have less than 5 minutes remaining! Please complete your current work and submit your examination.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {}} color="primary">
            Continue Working
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EnhancedExamPractice;