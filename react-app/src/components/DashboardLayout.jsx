import Sidebar from './Sidebar'
import DashboardHeader from './DashboardHeader'
import Footer from './Footer'

export default function DashboardLayout({ title, subtitle, children }) {
  return (
    <>
      <Sidebar />
      <div className="main-wrapper">
        <DashboardHeader title={title} subtitle={subtitle} />
        <div className="dashboard-container">{children}</div>
        <Footer />
      </div>
    </>
  )
}
