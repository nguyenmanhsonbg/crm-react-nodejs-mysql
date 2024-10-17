import ContentCreatorLayout from "@/layout/CommonLayout";
import { teacherRoutes } from "@/router";
import { Navigate, Route, Routes } from "react-router-dom";

function ContentCreatorRouter() {
  const TeacherRoutesComponent = teacherRoutes.map((item, index) => {
    const path = item.path;
    const ContentComponent = item.element;
    return (
      <Route key={index} path={path} element={<> <ContentComponent /> </>}/>
    );
  });
  
  return (
    <>
      <ContentCreatorLayout>
        <Routes>
          <Route path="" element={<Navigate to={"/teacher/computer-rooms-management"} />} />
          {TeacherRoutesComponent}
        </Routes>
      </ContentCreatorLayout>
    </>
  );
}

export default ContentCreatorRouter;
