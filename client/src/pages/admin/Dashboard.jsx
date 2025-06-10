import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { FaFileAlt, FaComments, FaRegEdit } from 'react-icons/fa';
import { assets } from '../../assets/assets';
import BlogTableItem from '../../components/admin/BlogTableItem';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
  const { axios } = useAppContext();

  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get('/api/admin/dashboard');
      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      await fetchDashboard();
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col justify-center items-center bg-black z-50">
        <img
          src={assets.successkeylogo}
          alt="SuccessKeyAgency Logo"
          className="w-32 h-32 mb-4"
        />
        <p className="text-green-500 text-lg font-semibold">
          <span className="text-white">Created by</span> SuccessKeyAgency LLC
        </p>
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12 mt-6"></div>
      </div>
    );
  }

  const chartLabels = ['Blogs', 'Comments', 'Drafts'];
  const chartValues = [dashboardData.blogs, dashboardData.comments, dashboardData.drafts];
  const chartColors = ['#3B82F6', '#10B981', '#F59E0B'];

  const pieData = {
    labels: chartLabels,
    datasets: [
      {
        data: chartValues,
        backgroundColor: chartColors,
        borderWidth: 0,
      },
    ],
  };

  const barData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Overview',
        data: chartValues,
        backgroundColor: chartColors,
      },
    ],
  };

  const stats = [
    {
      title: 'Total Blogs',
      value: dashboardData.blogs,
      icon: <FaFileAlt className="text-blue-400 text-3xl" />,
    },
    {
      title: 'Total Comments',
      value: dashboardData.comments,
      icon: <FaComments className="text-green-400 text-3xl" />,
    },
    {
      title: 'Drafts',
      value: dashboardData.drafts,
      icon: <FaRegEdit className="text-yellow-400 text-3xl" />,
    },
  ];

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-[#0f0f0f] px-4 sm:px-6 md:px-10 py-6">
      <h1 className="text-3xl font-bold text-white mb-8">📊 Admin Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map(({ title, value, icon }, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 p-5 rounded-xl bg-white/10 backdrop-blur-md shadow-lg border border-white/20 cursor-pointer hover:scale-105 transition-transform duration-300"
          >
            <div>{icon}</div>
            <div>
              <p className="text-xl font-semibold text-white">{value}</p>
              <p className="text-gray-300">{title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <section className="p-6 rounded-xl bg-white/10 backdrop-blur-md shadow-lg border border-white/20">
          <h2 className="mb-4 text-lg font-semibold text-white">Content Distribution</h2>
          <div className="h-[250px] sm:h-[320px]">
            <Pie
              data={pieData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    labels: { color: 'white' },
                  },
                },
              }}
            />
          </div>
        </section>

        <section className="p-6 rounded-xl bg-white/10 backdrop-blur-md shadow-lg border border-white/20">
          <h2 className="mb-4 text-lg font-semibold text-white">Activity Breakdown</h2>
          <div className="h-[250px] sm:h-[320px]">
            <Bar
              data={barData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: { color: 'white' },
                    grid: { color: 'rgba(255,255,255,0.1)' },
                  },
                  x: {
                    ticks: { color: 'white' },
                    grid: { color: 'rgba(255,255,255,0.1)' },
                  },
                },
              }}
            />
          </div>
        </section>
      </div>

      {/* Latest Blogs */}
      <section className="p-6 rounded-xl bg-white/10 backdrop-blur-md shadow-lg border border-white/20">
        <h2 className="mb-4 text-lg font-semibold text-white">📝 Latest Blogs</h2>
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left text-gray-300 text-sm">
            <thead className="uppercase border-b border-gray-600 text-xs text-gray-400">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Blog Title</th>
                <th className="px-4 py-3 hidden md:table-cell">Date</th>
                <th className="px-4 py-3 hidden md:table-cell">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentBlogs.map((blog, i) => (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchDashboard}
                  index={i + 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
