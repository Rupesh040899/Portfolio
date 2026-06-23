import { Routes, Route } from 'react-router-dom';
import AdminLayout from './AdminLayout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import SingletonEditor from './pages/SingletonEditor.jsx';
import CollectionManager from './pages/CollectionManager.jsx';
import Messages from './pages/Messages.jsx';

export default function AdminApp() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="hero" element={<SingletonEditor resource="hero" />} />
        <Route path="about" element={<SingletonEditor resource="about" />} />
        <Route path="skills" element={<CollectionManager resource="skills" />} />
        <Route path="projects" element={<CollectionManager resource="projects" />} />
        <Route path="experiences" element={<CollectionManager resource="experiences" />} />
        <Route path="education" element={<CollectionManager resource="education" />} />
        <Route path="certifications" element={<CollectionManager resource="certifications" />} />
        <Route path="testimonials" element={<CollectionManager resource="testimonials" />} />
        <Route path="messages" element={<Messages />} />
      </Route>
    </Routes>
  );
}
