import { Route, Routes, useParams } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import ServicesOverview from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import CaseStudies from "./pages/CaseStudies";
import CaseDetail from "./pages/CaseDetail";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import AdminLogin from "./admin/pages/AdminLogin";
import AdminOverview from "./admin/pages/AdminOverview";
import AdminCases from "./admin/pages/AdminCases";
import AdminTeam from "./admin/pages/AdminTeam";
import AdminLeads from "./admin/pages/AdminLeads";
import AdminForm from "./admin/pages/AdminForm";
import Settings from "./admin/pages/Settings";
import ProtectedRoute from "./admin/components/ProtectedRoute";

function ServiceDetailRoute() {
  const { type } = useParams<{ type: string }>();

  return <ServiceDetail type={type || "crm"} />;
}

function CaseDetailRoute() {
  const { slug } = useParams<{ slug: string }>();

  return <CaseDetail slug={slug || ""} />;
}

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />

      <Route path="/services" element={<ServicesOverview />} />
      <Route
        path="/services/:type"
        element={<ServiceDetailRoute />}
      />

      <Route path="/case-studies" element={<CaseStudies />} />
      <Route
        path="/case-studies/:slug"
        element={<CaseDetailRoute />}
      />

      <Route path="/team" element={<Team />} />
      <Route path="/contact" element={<Contact />} />

      {/* Admin routes */}
<Route path="/admin/login" element={<AdminLogin />} />

<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminOverview />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/case-studies"
  element={
    <ProtectedRoute>
      <AdminCases />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/case-studies/new"
  element={
    <ProtectedRoute>
      <AdminForm type="case" />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/case-studies/:id/edit"
  element={
    <ProtectedRoute>
      <AdminForm type="case" />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/team"
  element={
    <ProtectedRoute>
      <AdminTeam />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/team/new"
  element={
    <ProtectedRoute>
      <AdminForm type="team" />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/team/:id/edit"
  element={
    <ProtectedRoute>
      <AdminForm type="team" />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/leads"
  element={
    <ProtectedRoute>
      <AdminLeads />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/settings"
  element={
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  }
/>
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}