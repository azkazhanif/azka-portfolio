import { Experience } from "@/types/Experience";

export const experiences: Experience[] = [
  {
    id: 5,
    title: "PT. Pratama Abadi Industri",
    position: "Fullstack Developer",
    description: `
        I was responsible for developing internal systems to automate key business processes, covering the entire cycle from brainstorming and design to development, testing, and deployment. One of my main projects was building and enhancing the Master Material Inventory feature, which automated the management of materials, vendors, and color lists, improving overall accuracy and efficiency. I also optimized SQL queries and backend logic to enhance data retrieval speed and system performance. In addition, I contributed to designing and implementing user-friendly, responsive interfaces focused on improving user experience and accessibility across various devices.
    `,
    duration: "June 2025 - Now",
    image: "/images/experiences/mattel.png",
  },
  {
    id: 1,
    title: "PT. Mattel Indonesia",
    position: "Fullstack Developer Intern",
    description: `
        I contributed to several laboratory-related digital systems aimed
        at improving operational efficiency and user experience. For the
        Laboratory Website Dashboard, I enhanced the user interface to
        ensure consistency across the platform, conducted routine
        maintenance, resolved system bugs, and implemented robust form
        validation features to maintain data integrity during consumable
        item submissions. In the Training Center for Laboratory, I
        designed an intuitive user interface from scratch using Figma,
        specifically tailored to laboratory training workflows. The
        application was developed using ASP.NET with a focus on
        performance and scalability, including backend services optimized
        for efficient data processing and retrieval. Throughout the
        development, I prioritized both user experience and system
        reliability. For the Quality Assurance Logbook, I created custom
        Excel Macros to streamline QA testing procedures in a chemical
        laboratory environment and utilized SQL queries to provide dynamic
        data access based on user needs. I also developed a responsive
        logbook interface that supported efficient tracking and reporting
        for QA users. Additionally, in the Datasheet Testing for
        Laboratory project, I refined data collection methods to enhance
        result accuracy, consolidated various test processes into a single
        scalable workbook, and ensured compliance by maintaining and
        updating validation procedures in line with evolving product
        requirements.
    `,
    duration: "Aug 2023 - Dec 2024",
    image: "/images/experiences/mattel.png",
  },
  {
    id: 2,
    title: "Hearme (Thesis Capstone Project)",
    position: "Backend Developer",
    description: `
        I developed secure REST APIs using Python and Flask, incorporating
        an ORM to facilitate seamless database interactions and
        implementing data encryption to enhance user security. As part of
        the project, I integrated the system with a LLaMA2-based chatbot,
        utilizing server-side rendering to deliver accurate and
        context-aware responses. Additionally, I designed and optimized
        PostgreSQL databases, resulting in improved query performance and
        overall system efficiency.    
    `,
    duration: "Dec 2023 - Apr 2024",
    image: "/images/experiences/hearme.png",
  },
  {
    id: 3,
    title: "PUMA Computing (BEM Fakultas Informatika)",
    position: "Vice of Department Communication & Design",
    description: `
        I led the design division of PUMA Computing for one year, where I
        focused on elevating the quality of digital content across various
        initiatives. In this role, I coordinated closely with the design
        team to ensure alignment on project goals and deliverables,
        fostering a collaborative environment that emphasized creativity
        and precision. I was responsible for translating complex
        information into visually compelling and effective designs that
        enhanced communication and engagement. Additionally, I served as
        the Person In Charge (PIC) for major events such as CSGO and PUMA
        REGEN, overseeing the end-to-end design and execution of all
        event-related materials to ensure a cohesive and impactful visual
        presence.
    `,
    duration: "Dec 2023 - Dec 2024",
    image: "/images/experiences/puma.png",
  },
  {
    id: 4,
    title: "EcoLoops (Bangkit Academy 2023 Capstone Project)",
    position: "Backend Developer & Cloud Computing Engineer",
    description: `
        I managed database interactions using MySQL and Google Cloud, optimizing SQL queries and structuring tables to support efficient and reliable transactions. I also developed high-performance API endpoints using Flask, enabling fast and scalable communication with machine learning models deployed on Cloud Run. To support secure and efficient data handling, I implemented cloud-based file storage using Google Cloud Storage Bucket, ensuring seamless management of received data throughout the system.
    `,
    duration: "Feb 2023 - June 2023",
    image: "/images/experiences/ecoloops.png",
  },
];