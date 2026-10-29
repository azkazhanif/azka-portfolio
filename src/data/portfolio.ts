import { Portfolio } from "@/types/Portfolio";

export const portfolios: Portfolio[] = [
  // Project dengan image "" otomatis menampilkan placeholder di kartu & halaman detail.
  {
    id: 8,
    title: "FraudLens",
    slug: "fraudlens",
    description: `FraudLens is an early scam detection and reporting platform built by our team for the PIDI Hackathon, where it advanced to the semifinals. I worked as the Frontend Developer, building the web application with ReactJS and connecting it to the team's backend services.

Online scams often spread faster than victims can react, and reporting them is usually confusing: people are unsure whether a message is really a scam, where to report it, and what happens after they do. FraudLens shortens that journey by meeting users where they already are, starting with a Telegram chatbot.

Users forward a suspicious message or link to the FraudLens bot, which analyzes it with Google Gemini through the AI SDK and replies with a scam probability score as a percentage, so users know how risky it is before they act. When the score is high, the bot gives the user a verified link to report the case directly on the FraudLens website, without having to start over.

On the web side, I built the reporting and tracking experience. The multi-step report form is pre-filled through the bot session: the reporter's phone number is verified automatically via Telegram, ID card details can be extracted with OCR, and the bot verification token keeps the report tied to the original conversation. After submitting, users receive a tracking code and can follow their report on a status page with a step-by-step progress tracker (Received, Analyst Verification, Investigation, Completed), an activity timeline, an incident summary with severity level, and a printable proof of report while they wait for it to be accepted.`,
    image: "/images/portfolio/fraudlens/report-tracking.jpg",
    technologies: ["ReactJS", "Gemini AI SDK", "Telegram Bot"],
    role: "Frontend Developer",
    challenge: "Turning an AI scam score from a Telegram chat into a seamless web reporting flow: carrying the bot session into a verified, pre-filled report form and giving users clear, real-time visibility into their report's status, all within the tight timeline of the PIDI Hackathon.",
    duration: "2026",
    features: [
      "Telegram chatbot where users submit suspicious messages or links for analysis",
      "AI scam detection with Google Gemini (AI SDK) that returns a scam probability score in percent",
      "Direct hand-off from the bot to the web report form when the scam score is high",
      "Multi-step report form with Telegram-verified phone number and OCR extraction from ID card uploads",
      "Tracking code and status page with a step-by-step investigation progress tracker",
      "Activity timeline, incident summary with severity level, and printable proof of report",
    ],
    gallery: [
      { src: "/images/portfolio/fraudlens/telegram-bot.jpg", caption: "Telegram bot — where users submit suspicious messages for AI analysis" },
      { src: "/images/portfolio/fraudlens/report-form.png", caption: "Report form — pre-filled and verified through the Telegram session" },
    ],
  },
  {
    id: 9,
    title: "Saldoin",
    slug: "saldoin",
    description: `Saldoin is a personal finance management web app I designed and built on my own with Next.js and Supabase. It started from a problem I faced myself: I struggled to manage my money and rarely knew where it actually went.

My money was spread across several bank accounts, e-wallets, and cash, so it was hard to know how much I really had or how much I had spent. Each banking app only shows its own account, and without a simple habit of recording transactions, small daily expenses quietly added up. I needed one place that showed my whole financial picture and made recording money as quick as spending it.

Saldoin brings every wallet together. Bank accounts, e-wallets, and cash each get their own wallet with a live balance, all adding up to a single total. Recording income, expenses, or transfers between wallets takes just a few taps from the dashboard's quick actions, and every transaction is categorized so it can be searched, filtered, and edited later. The dashboard turns that data into insight: total income, expenses, and current balance compared with last month, an income vs. expense chart for the past 12 months, daily spending trends, recent activity, and upcoming bills.

To stay in control rather than just looking back, Saldoin lets me set spending limits per category on a daily, monthly, or yearly basis and warns me before a budget runs out. Supabase powers the data layer, keeping every transaction and wallet balance in sync so the numbers are always up to date. Building it for my own daily use meant every feature had to earn its place by actually making money management easier.`,
    image: "/images/portfolio/saldoin/dashboard.jpg",
    link: "https://saldoin.vercel.app",
    technologies: ["NextJS", "Supabase"],
    duration: "2026",
    role: "Fullstack Developer",
    challenge: "Solving my own money-management problem by making financial tracking fast enough to become a daily habit: unifying multiple bank accounts, e-wallets, and cash in one place, and turning raw transactions into clear insights and budget warnings.",
    features: [
      "Multi-wallet management for bank accounts, e-wallets, and cash with a combined total balance",
      "Quick actions to add income, add expenses, and transfer funds between wallets",
      "Dashboard with month-over-month comparison, 12-month income vs. expense chart, and daily spending trends",
      "Transaction history with search, category filter, income/expense toggle, and editing",
      "Per-category budgets on a daily, monthly, or yearly basis with warnings before a limit is reached",
      "Landing page with an interactive demo dashboard",
    ],
    gallery: [
      { src: "/images/portfolio/saldoin/wallet.jpg", caption: "Wallets — bank accounts, e-wallets, and cash in one total balance" },
      { src: "/images/portfolio/saldoin/transactions.jpg", caption: "Transactions — searchable, filterable history by category" },
      { src: "/images/portfolio/saldoin/budget.jpg", caption: "Budget — spending limits per category, daily to yearly" },
      { src: "/images/portfolio/saldoin/landing.jpg", caption: "Landing page — introducing Saldoin with an interactive demo" },
    ],
  },
  {
    id: 10,
    title: "Padel Booking System",
    slug: "padel-booking-system",
    description: `Padel Booking System (PBS) is a web platform for booking padel courts online, built with Laravel for the backend and React for the frontend, with payments fully integrated through Midtrans. It connects two sides of the same court: players who want to secure a slot quickly, and court owners who need to keep their schedule full and their payments in order.

As padel grows in popularity, booking a court is often still done through chat messages and manual transfers. Players have to ask which slots are free, wait for a reply, send payment proof, and hope the slot hasn't been taken in the meantime. Owners, on the other hand, spend their time answering the same questions, checking transfers one by one, and keeping schedules up to date by hand, which easily leads to double bookings and missed payments.

PBS turns that entire process into a single self-service flow. For users, a schedule view compares free hours across every court on one screen, and booking takes three steps: pick a date up to 30 days ahead, choose a court, and select 60-minute slots. The chosen slot is held for 15 minutes while the user pays through Midtrans using QRIS, e-wallets, or virtual accounts, and the booking is confirmed automatically once Midtrans reports a successful payment. Prices are calculated on the server per slot, with different rates for off-peak and weekend hours, and vouchers can be applied at checkout. Guests can book without an account, while registered members unlock a 30% down payment option, a saved booking history with e-tickets, and automatic invoices.

For owners, PBS comes with an admin panel to run the venue day to day: managing courts, pricing, and blocked schedule slots, monitoring bookings and payments, handling cancellations and refunds, creating vouchers, managing customers, and exporting reports. On the venue floor, staff can scan a booking to check players in.

By putting availability, booking, and payment into one connected system, PBS removes the back-and-forth for players and the manual admin work for owners, so every booked slot is backed by a payment and the schedule always reflects reality.`,
    image: "/images/portfolio/pbs/home.jpg",
    link: "https://paddel-booking-system.vercel.app",
    technologies: ["Laravel", "React", "Midtrans"],
    duration: "2026",
    role: "Fullstack Developer",
    challenge: "Keeping availability and payment in sync: holding a slot only while the user pays, confirming it automatically from Midtrans payment notifications, and releasing it when payment never arrives, all while serving players, members, and owners with very different needs in one system.",
    features: [
      "Separate experiences for users (guests and members) and owners, with an admin panel for the venue",
      "Schedule view comparing free hours across all courts, bookable up to 30 days ahead",
      "Midtrans payments via QRIS, e-wallets, and virtual accounts, with automatic confirmation",
      "15-minute slot hold during checkout to prevent double bookings",
      "Server-side pricing per slot with off-peak and weekend rates, plus vouchers",
      "Member benefits: 30% down payment, booking history with e-tickets, and automatic invoices",
      "Owner tools for courts, pricing, slot blocking, refunds, customers, and exportable reports",
      "Staff check-in by scanning the player's booking",
    ],
    gallery: [
      { src: "/images/portfolio/pbs/booking.jpg", caption: "Booking — pick a date, court, and 60-minute slots, then pay via Midtrans" },
      { src: "/images/portfolio/pbs/schedule.jpg", caption: "Schedule — free hours across every court on one screen" },
      { src: "/images/portfolio/pbs/pricing.jpg", caption: "Pricing — transparent per-slot rates for off-peak and weekend hours" },
      { src: "/images/portfolio/pbs/membership.jpg", caption: "Membership — 30% down payment, e-tickets, and automatic invoices" },
    ],
  },
  {
    id: 7,
    title: "Room Booking System",
    slug: "room-booking-system",
    description: `Room Booking System is a module of Pratama Digital System (PDS), the internal platform at PT Pratama Abadi Industri, that I built as a Web Developer using Laravel for the backend and Vue.js for the frontend. It gives everyone in the office a single, shared place to see which meeting rooms are in use and to reserve one in just a few clicks.

Before this system, booking a meeting room depended entirely on an admin. Employees had to contact the admin just to find out which rooms were free, wait for a reply, and then ask again to confirm the reservation. Schedules were tracked manually, so availability was hard to see at a glance, double bookings happened, and even a short meeting could take several messages to arrange.

Room Booking System replaces that back-and-forth with a self-service flow. Bookings are shown on an interactive calendar with Day, Week, and Month views, color-coded per room, so employees can instantly see when and where meetings are happening. Creating a booking takes a single form: meeting title, description, key person, room, date, and time. While the form is being filled in, the system checks availability in real time and shows how many rooms are still free for the selected slot, so a room can only be booked when it is actually available. Every booking has a detail view showing who created it, the key person, schedule, and duration, and can be printed when needed.

The result is a booking process that no longer waits on an admin: employees schedule meetings on their own, conflicts are prevented by the system instead of caught afterwards, and the whole office works from the same up-to-date schedule.`,
    image: "/images/portfolio/rbs/week-view.png",
    technologies: ["Laravel", "Vue.js"],
    duration: "2025",
    role: "Web Developer",
    challenge: "Replacing an admin-dependent, manually tracked booking process with a self-service flow where anyone can book a room directly, while making sure the system itself prevents double bookings by validating room availability in real time.",
    features: [
      "Interactive calendar with Day, Week, and Month views, color-coded per room",
      "Real-time availability check that shows how many rooms are free for the selected time",
      "Self-service booking form with meeting title, description, key person, room, date, and time",
      "Booking search and per-room filtering",
      "Booking detail view with creator, key person, schedule, and duration, plus print support",
      "Light and dark theme",
    ],
    gallery: [
      { src: "/images/portfolio/rbs/day-view.png", caption: "Day view — every room's schedule for the day side by side" },
      { src: "/images/portfolio/rbs/month-view.png", caption: "Month view — booking load per day at a glance" },
      { src: "/images/portfolio/rbs/booking-form.png", caption: "Create booking — live room availability for the selected slot" },
      { src: "/images/portfolio/rbs/booking-detail.png", caption: "Booking detail — schedule, key person, duration, and print" },
    ],
  },
  {
    id: 2,
    title: "Gazkifa",
    slug: 'gazkifa',
    description: "A web-based inventory control system specifically designed for managing gas distribution and logistics. Built with ReactJS for the frontend, Express for the backend, and styled using Tailwind CSS, the application provides a modern, responsive interface that enhances usability across devices. At its core, Gazkifa allows administrators and staff to efficiently monitor, update, and track gas inventory levels, including distribution status, refill logs, and supply movements. The system includes a secure authentication mechanism powered by bcrypt, ensuring that user credentials are encrypted and protected against unauthorized access. From a user experience perspective, Gazkifa delivers a clean and intuitive dashboard where users can easily view inventory status, input transactions, and generate reports in real time. The use of ReactJS allows for dynamic interactions and quick updates without full page reloads, while Tailwind CSS ensures a sleek, minimalist design that prioritizes clarity and ease of navigation. Whether it’s managing cylinder returns, tracking daily stock flow, or auditing supply levels, Gazkifa streamlines complex processes into a user-friendly system tailored for the operational needs of gas distribution businesses.",
    image: "/images/portfolio/Gazkifa.png",
    link: "https://github.com/azkazhanif/gazkifa",
    technologies: ["ReactJS", "ExpressJS", "NodeJS", "bcryptjs", "TailwindCSS", "PostgreSQL"],
    duration: "March 2024",
  },
  {
    id: 3,
    title: "Tracy",
    slug: "tracy",
    description: "A comprehensive training center and competency management system designed to enhance employee development and promote professionalism within an organization. Built using ASP.NET as the core framework and supported by Bootstrap, jQuery, DataTables, Calendar.js, and SurveyJS, the system delivers a dynamic and interactive learning environment tailored to individual roles and organizational goals. Tracy enables employees to participate in training programs through two flexible approaches: self-learning, where employees can independently select courses based on their interests or required competencies, and manager-assigned training, where supervisors can assign specific learning modules relevant to each team member's role. The system features an intuitive dashboard where managers and supervisors can easily monitor training progress, track completion rates, and assess competency levels through built-in quizzes and surveys. Using Calendar.js, training sessions and deadlines are clearly organized and visually displayed, helping both employees and managers stay on top of schedules. SurveyJS powers customizable quizzes and assessments, allowing for accurate measurement of learning outcomes. The integration of jQuery and DataTables ensures smooth interactions and efficient data management throughout the platform. Overall, Tracy provides a structured yet flexible learning experience that supports continuous professional development, fosters accountability, and aligns training initiatives with business objectives.",
    image: "/images/portfolio/Tracy.jpg",
    technologies: [
      "ASP.NET",
      "Bootstrap",
      "SQL Server",
      "DataTables",
      "jQuery",
      "SurveyJS"
    ],
    duration: "August 2023 - December 2024",
  },
  {
    id: 4,
    title: "Hearme",
    slug: "hearme",
    description: "A mobile application designed to provide users with a safe and accessible platform to engage in conversations with a psychology-focused chatbot. The app aims to support mental well-being by offering empathetic and intelligent interactions that simulate speaking with a real counselor. On the backend—where my primary focus was—I developed a robust system using Flask to handle all server-side logic and data processing. The Flask backend securely connects to a PostgreSQL database to store user inputs, session histories, and emotional response data, ensuring reliable data management and future analysis. Additionally, the system integrates seamlessly with a machine learning model tailored for psychological conversation, enabling the chatbot to understand user emotions and provide context-aware, supportive responses. The architecture is designed to be scalable and secure, using RESTful APIs for smooth communication between the mobile frontend and the backend services. This backend infrastructure not only powers the intelligent dialogue experience but also ensures that all data interactions are handled efficiently and safely, offering users a smooth, responsive, and emotionally aware experience within the Hearme app.",
    image: "/images/portfolio/Hearme.png",
    technologies: ["Python", "Flask", "NGROK", "PostgreSQL", "SQLAchemy"],
    duration: "December 2024 - April 2024",
  },
  {
    id: 5,
    title: "GLAD",
    slug: "glad",
    description: "Redesigned laboratory dashboard project focused on enhancing user experience (UX) and visual engagement through a modern and intuitive interface. The system was rebuilt using HTML, CSS, and Bootstrap to ensure a responsive layout and consistent styling across devices, while GSAP (GreenSock Animation Platform) was integrated to bring smooth, dynamic animations that elevate the overall user interaction. The main goal of GLAD was to transform a previously static and outdated dashboard into a visually appealing and user-friendly platform that allows laboratory staff to navigate data, monitor activities, and access critical information more efficiently. Every element—from the layout structure to button transitions and page interactions—was carefully crafted to provide a clean and professional look while maintaining functionality. The use of animations through GSAP not only improves the aesthetic appeal but also guides user attention to key actions and data points, making the system feel more interactive and engaging. By focusing on both usability and design, GLAD successfully delivers a more enjoyable and productive user experience for laboratory professionals.",
    image: "/images/portfolio/Glad.png",
    technologies: ["ASP.NET", "Bootstrap", "SQL Server", "GSAP", "jQuery"],
    duration: "January 2024 - February 2024",
  },
  {
    id: 6,
    title: "Ecoloops",
    slug: "ecoloops",
    description: "An innovative API-based system designed to promote environmental sustainability by leveraging machine learning to detect waste from images and encourage recycling through a reward-based approach. The platform allows users to upload images of waste, which are then processed by an integrated machine learning model to identify the type of waste—such as plastic, metal, paper, or organic. Based on the detection results, users receive reward points and personalized suggestions on how to properly recycle the items. My primary responsibility in this project was developing the backend system, where I used Python and Flask to handle core logic, process image inputs, and establish seamless communication with the machine learning model. Additionally, I utilized Express.js to structure RESTful APIs and MySQL for secure and efficient data storage, including user profiles, reward points, and recycling history. The backend is designed for scalability and real-time performance, ensuring quick responses and accurate feedback to users. Overall, EcoLoops delivers a meaningful user experience by combining environmental awareness with interactive technology, encouraging users to make smarter, more sustainable decisions in their daily lives.",
    image: "/images/portfolio/EcoLoops.png",
    link: "https://github.com/ishakharel/Bangkit-Project",
    technologies: ["ExpressJS", "Flask", "Python", "MySQL", "Google Cloud"],
    duration: "May 2023 - June 2023",
  },
  // {
  //   id: 6,
  //   title: "Equipment Calibration Master List",
  //   description: "",
  //   image: "/images/portfolio/equipment.png",
  //   technologies: ["Microsoft Excel", "VBA Macro", "SQL Server"],
  //   duration: "January 2024 - February 2024",
  // },
  // {
  //   id: 7,
  //   title: "Quality Assurance Chemical Logbook",
  //   description: "",
  //   image: "/images/portfolio/equipment.png",
  //   technologies: ["Microsoft Excel", "VBA Macro", "SQL Server"],
  //   duration: "January 2024 - February 2024",
  // },
];