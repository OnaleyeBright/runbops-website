import AdminLayout from "../components/AdminLayout";

export default function Settings() {
  const settings = [
    "General",
    "Website",
    "Contact Information",
    "Social Links",
    "Integrations",
    "Admin Account",
  ];

  return (
    <AdminLayout page="settings">
      <div className="admin-content">
        <div className="settings-list">
          {settings.map((setting) => (
            <div key={setting}>
              <h2>{setting}</h2>
              <p>
                Configure {setting.toLowerCase()} settings and preferences.
              </p>
              <button>Manage →</button>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}