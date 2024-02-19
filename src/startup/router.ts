import { Express, Request, Response } from "express";
import doctorRoute from "../controllers/doctor.controller";
import accrediationRoute from "../controllers/accrediation.controller";
import awardRoute from "../controllers/award.controller";
import galleryRoute from "../controllers/gallery.controller";
import comitteeRoute from "../controllers/comittee.controller";
import faqRoute from "../controllers/faq.controller";
import faqImageRoute from "../controllers/faqImage.controller";
import contactDetailRoute from "../controllers/contactDetail.controller";
import departmentRoute from "../controllers/department.controller";
import noticeRoute from "../controllers/notice.controller";
import eventRoute from "../controllers/event.controller";
import testimonialRoute from "../controllers/testimonial.controller";
import featureRoute from "../controllers/feature.controller";
import aboutSectionRoute from "../controllers/aboutSection.controller";
import facilityRoute from "../controllers/facility.controller";
import valueRoute from "../controllers/coreValue.controller";
import adminRoute from "../controllers/admin.controller";
import doctorDepartmentRoute from "../controllers/doctprDepartment.controller";
import appointmentRoute from "../controllers/appointment.controller";
import healthPackageRoute from "../controllers/healthPackage.controller";
import missionVisionRoute from "../controllers/ourMissionVisionGoal.controller";
import videoRoute from "../controllers/video.controller";

const routerSetup = (app: Express) =>
  app
    .get("/", async (req: Request, res: Response) => {
      res.send("Hello from webX Learning API Server!");
    })
    .use("/api/doctors", doctorRoute)
    .use("/api/accrediations", accrediationRoute)
    .use("/api/awards", awardRoute)
    .use("/api/galleries", galleryRoute)
    .use("/api/committees", comitteeRoute)
    .use("/api/faqs", faqRoute)
    .use("/api/faq-images", faqImageRoute)
    .use("/api/contact-details", contactDetailRoute)
    .use("/api/departments", departmentRoute)
    .use("/api/notices", noticeRoute)
    .use("/api/events", eventRoute)
    .use("/api/testimonials", testimonialRoute)
    .use("/api/features", featureRoute)
    .use("/api/about-sections", aboutSectionRoute)
    .use("/api/facilities", facilityRoute)
    .use("/api/values", valueRoute)
    .use("/api/admins", adminRoute)
    .use("/api/doctors-departments", doctorDepartmentRoute)
    .use("/api/appointments", appointmentRoute)
    .use("/api/health-packages", healthPackageRoute)
    .use("/api/mission-vision", missionVisionRoute)
    .use("/api/videos", videoRoute);

export default routerSetup;
