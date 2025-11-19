import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout";
import axios from "axios";
import { server } from "../../main";
import "./dashboard.css";
import '../../assets/css/style.css'
import CoursePieChart from "../../components/charts/CoursePieChart";
import CustomLineChart from "../../components/charts/ApexChart";
import SmallColumnChart from "../../components/charts/smallColumnChart";



const AdminDashbord = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin") return navigate("/");

  const [stats, setStats] = useState([]);

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setStats(data.stats);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);
  return (
    <div>
      <Layout>
        <div className="main-panel">
      <div className="content-wrapper">
        <div className="row">
          <div className="col-xl-6 grid-margin stretch-card flex-column">
            <h5 className="mb-2 text-titlecase mb-4">Status statistics</h5>
            <div className="row">
              <div className="col-md-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <p className="mb-0 text-muted">Total Users</p>
                    </div>
                    <h4>{stats.totalUsers}</h4>
                  </div>
                </div>
              </div>
              <div className="col-md-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div>
                        <p className="mb-2 text-muted">Courses</p>
                        <h6 className="mb-0">{stats.totalCoures}</h6>
                      </div>
                      <div>
                        <p className="mb-2 text-muted">Lectures</p>
                        <h6 className="mb-0">{stats.totalLectures}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row h-100">

            <div className="pie_box">
            <div className="card">
              <div className="card-body">
                <h6 className="text-uppercase fw-medium">Overall</h6>
                <CoursePieChart />
              </div>
            </div>
          </div>

              <div className="stat_box">
                <div className="card">
                  <div className="card-body d-flex flex-column justify-content-between">
                    <p className="text-muted">System Analytics</p>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h3 className="mb-">27632</h3>
                      <h3 className="mb-">78%</h3>
                    </div>
                    <SmallColumnChart/>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
          <div className="col-xl-6 grid-margin stretch-card flex-column">
            <div className="row h-100">
              <div className="col-md-12 bye">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start flex-wrap">
                      <div>
                        <p className="mb-3">Monthly Increase</p>
                        <h3>67842</h3>
                      </div>
                      <div id="income-chart-legend" className="d-flex flex-wrap mt-1 mt-md-0"></div>
                    </div>
                    <CustomLineChart/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="row">
          <div className="col-xl-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h6 className="text-uppercase fw-medium">Overall</h6>
                <CoursePieChart />
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
      </Layout>
    </div>
  );
};

export default AdminDashbord;

