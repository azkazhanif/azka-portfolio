import { Portfolio } from "@/types/Portfolio";

export const portfolios: Portfolio[] = [
  // TODO: isi image & duration untuk 3 project baru di bawah.
  // Selama image masih "", kartu & halaman detail menampilkan placeholder.
  {
    id: 7,
    title: "Room Booking System",
    slug: "room-booking-system",
    description: "A web-based room booking application built for the office using Laravel for the backend and Vue.js for the frontend. Previously, employees who wanted to reserve a meeting room had to go through an admin first just to find out which rooms were free, which slowed down even the simplest booking. Room Booking System removes that bottleneck: anyone in the office can now see room availability directly and book a room on their own, as long as it is still available for the chosen time. Built around a clear, self-service flow, the system cuts out the back-and-forth with admins, prevents double bookings, and makes scheduling meetings faster and more transparent for everyone.",
    image: "", // contoh: "/images/portfolio/RoomBooking.png"
    technologies: ["Laravel", "Vue.js"],
    duration: "",
    challenge: "Replacing an admin-dependent booking process with a self-service flow where anyone can book a room directly, as long as it is still available.",
  },
  {
    id: 8,
    title: "FraudLens",
    slug: "fraudlens",
    description: "A web platform for early fraud detection, built as our team's entry for the PIDI Hackathon. FraudLens aims to surface suspicious activity as early as possible so it can be reviewed before it turns into real losses. In this project I was responsible for the frontend, which I developed with ReactJS: building the interface that presents the detection results and handling the connectivity between the frontend and the backend services, so the data and analysis produced by the backend reach users in a clear, usable way. Working within the tight timeline of a hackathon, the focus was on delivering a reliable integration and a clean interface that makes the fraud signals easy to understand at a glance.",
    image: "", // contoh: "/images/portfolio/FraudLens.png"
    technologies: ["ReactJS"],
    role: "Frontend Developer",
    challenge: "Connecting the frontend to the backend reliably and presenting fraud signals clearly, all within the tight timeline of the PIDI Hackathon.",
    duration: "",
  },
  {
    id: 9,
    title: "Saldoin",
    slug: "saldoin",
    description: "A personal finance management application built with Next.js. Saldoin helps users keep track of their money in one place, recording where it comes from and where it goes, so they can understand their spending habits and stay in control of their personal finances. The app is designed to make everyday money management simple and approachable, turning scattered transactions into a clear picture of one's financial condition.",
    image: "", // contoh: "/images/portfolio/Saldoin.png"
    technologies: ["NextJS"],
    duration: "",
  },
  {
    id: 1,
    title: "Haniza Store",
    slug: "haniza-store",
    description: "A web-based e-commerce platform that I developed using Laravel for the backend and Tailwind CSS for the frontend, combining robust functionality with a clean, responsive user interface. Designed to serve both as a public-facing marketplace and an internal business management tool, Haniza Store allows customers to browse and purchase products seamlessly, while providing powerful inventory control and financial tracking features for administrators. From the user’s perspective, the storefront offers a smooth and intuitive shopping experience, complete with organized product categories, real-time stock updates, and a secure checkout process. On the administrative side, the system features a dedicated dashboard where admins can manage product listings, monitor stock levels, and track both income and expenses in real time. This dual-purpose design not only simplifies day-to-day operations but also helps business owners make informed decisions based on accurate and up-to-date financial insights. The user experience is further enhanced by Tailwind’s utility-first styling, which ensures a modern, responsive layout across devices, making Haniza Store both a functional and visually appealing solution for small to medium-sized businesses looking to streamline their online sales and inventory management.",
    image: "/images/portfolio/Haniza.png",
    technologies: ["Laravel", "TailwindCSS", "SQLite", "Figma"],
    duration: "March 2024 - Now",
  },
  {
    id: 2,
    title: "Gazkifa",
    slug: 'gazkifa',
    description: "A web-based inventory control system specifically designed for managing gas distribution and logistics. Built with ReactJS for the frontend, Express for the backend, and styled using Tailwind CSS, the application provides a modern, responsive interface that enhances usability across devices. At its core, Gazkifa allows administrators and staff to efficiently monitor, update, and track gas inventory levels, including distribution status, refill logs, and supply movements. The system includes a secure authentication mechanism powered by bcrypt, ensuring that user credentials are encrypted and protected against unauthorized access. From a user experience perspective, Gazkifa delivers a clean and intuitive dashboard where users can easily view inventory status, input transactions, and generate reports in real time. The use of ReactJS allows for dynamic interactions and quick updates without full page reloads, while Tailwind CSS ensures a sleek, minimalist design that prioritizes clarity and ease of navigation. Whether it’s managing cylinder returns, tracking daily stock flow, or auditing supply levels, Gazkifa streamlines complex processes into a user-friendly system tailored for the operational needs of gas distribution businesses.",
    image: "/images/portfolio/Gazkifa.png",
    technologies: ["ReactJS", "ExpressJS", "NodeJS", "bcryptjs", "TailwindCSS", "PostgreSQL"],
    duration: "March 2024",
  },
  {
    id: 3,
    title: "Tracy",
    slug: "tracy",
    description: "A comprehensive training center and competency management system designed to enhance employee development and promote professionalism within an organization. Built using ASP.NET as the core framework and supported by Bootstrap, jQuery, DataTables, Calendar.js, and SurveyJS, the system delivers a dynamic and interactive learning environment tailored to individual roles and organizational goals. Tracy enables employees to participate in training programs through two flexible approaches: self-learning, where employees can independently select courses based on their interests or required competencies, and manager-assigned training, where supervisors can assign specific learning modules relevant to each team member's role. The system features an intuitive dashboard where managers and supervisors can easily monitor training progress, track completion rates, and assess competency levels through built-in quizzes and surveys. Using Calendar.js, training sessions and deadlines are clearly organized and visually displayed, helping both employees and managers stay on top of schedules. SurveyJS powers customizable quizzes and assessments, allowing for accurate measurement of learning outcomes. The integration of jQuery and DataTables ensures smooth interactions and efficient data management throughout the platform. Overall, Tracy provides a structured yet flexible learning experience that supports continuous professional development, fosters accountability, and aligns training initiatives with business objectives.",
    image: "/images/portfolio/Tracy.png",
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