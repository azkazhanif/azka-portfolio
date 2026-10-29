import { Experience } from "@/types/Experience";

export const experiences: Experience[] = [
  {
    id: 5,
    title: "PT. Pratama Abadi Industri",
    position: "Fullstack Developer",
    description: `
        I develop and maintain Pratama Digital System (PDS), the company's internal platform made up of several modules that support day-to-day operations across departments. My work focuses on replacing manual Excel recaps with centralized, automated workflows—handling the full cycle from requirement gathering and design to development, testing, and deployment. Key contributions include the Master Material Inventory module, which automates the management of materials, vendors, and color lists, as well as optimizing SQL queries and backend logic to speed up data retrieval. I also build responsive, easy-to-use interfaces so every department can access accurate, real-time data from any device.
    `,
    duration: "June 2025 - Now",
    image: "/images/experiences/mattel.png",
  },
  {
    id: 1,
    title: "PT. Mattel Indonesia",
    position: "Fullstack Developer Intern",
    description: `
        I built and maintained several laboratory web systems to improve
        operational efficiency. On the Laboratory Website Dashboard, I
        improved UI consistency, fixed bugs, and added form validation to
        protect data integrity for consumable item submissions. I developed
        the Training Center for Laboratory from scratch with ASP.NET, with
        backend services optimized for fast data processing. For the Quality
        Assurance Logbook, I built a responsive tracking interface backed by
        dynamic SQL queries and Excel Macros that streamlined QA testing in a
        chemical laboratory. I also consolidated multiple test processes into
        a single scalable datasheet, improving result accuracy and keeping
        validation procedures compliant with evolving product requirements.
    `,
    duration: "Aug 2023 - Dec 2024",
    image: "/images/experiences/mattel.png",
  },
  {
    id: 3,
    title: "PUMA Computing (BEM Fakultas Informatika)",
    position: "Vice of Department Communication & Design",
    description: `
        I led the communication and design division of PUMA Computing for
        one year, coordinating the team to deliver digital content on time
        and aligned with each initiative's goals. I served as Person In
        Charge (PIC) for major events such as CSGO and PUMA REGEN, overseeing
        all event materials from planning to execution.
    `,
    duration: "Dec 2023 - Dec 2024",
    image: "/images/experiences/puma.png",
  },
  {
    id: 4,
    title: "Bangkit Academy 2023",
    position: "Backend Developer & Cloud Computing Engineer",
    description: `
        I designed MySQL databases on Google Cloud and optimized SQL queries for reliable transactions. I built Flask API endpoints that connect the app to machine learning models deployed on Cloud Run, and implemented file storage with Google Cloud Storage for secure data handling.
    `,
    duration: "Feb 2023 - June 2023",
    image: "/images/experiences/ecoloops.png",
  },
];