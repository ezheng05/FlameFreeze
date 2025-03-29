"use client";

import React, { useState } from 'react';
import CommunityForum from '../components/community/CommunityForum';
import { Users, Bell, BookOpen, MapPin, Shield, ClipboardList, UserCheck, Calendar } from 'lucide-react';

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="space-y-8">
      <section className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Community Engagement</h1>
        <p className="text-xl">
          Join our community-driven approach to wildfire management. Together, we can create safer neighborhoods
          through education, collaboration, and active participation.
        </p>
      </section>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-6 text-center font-medium text-sm flex-shrink-0 transition-colors duration-200 ${
              activeTab === 'overview'
                ? 'bg-orange-100 text-orange-700 border-b-2 border-orange-500'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('fire-warden')}
            className={`py-4 px-6 text-center font-medium text-sm flex-shrink-0 transition-colors duration-200 ${
              activeTab === 'fire-warden'
                ? 'bg-orange-100 text-orange-700 border-b-2 border-orange-500'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Fire Warden Program
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`py-4 px-6 text-center font-medium text-sm flex-shrink-0 transition-colors duration-200 ${
              activeTab === 'notifications'
                ? 'bg-orange-100 text-orange-700 border-b-2 border-orange-500'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Notification System
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`py-4 px-6 text-center font-medium text-sm flex-shrink-0 transition-colors duration-200 ${
              activeTab === 'education'
                ? 'bg-orange-100 text-orange-700 border-b-2 border-orange-500'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Educational Resources
          </button>
          <button
            onClick={() => setActiveTab('forum')}
            className={`py-4 px-6 text-center font-medium text-sm flex-shrink-0 transition-colors duration-200 ${
              activeTab === 'forum'
                ? 'bg-orange-100 text-orange-700 border-b-2 border-orange-500'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Community Forum
          </button>
        </div>
        
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Community-Driven Wildfire Management</h2>
              <p className="text-gray-600">
                Our approach to wildfire management in Los Angeles goes beyond technology. We believe that engaged, 
                informed communities are essential to effective wildfire prevention, detection, and response. 
                Our community engagement initiatives empower residents to take an active role in protecting their 
                neighborhoods from wildfire threats.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-200 text-center hover:shadow-md transition-shadow">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserCheck className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-orange-800 mb-2">Fire Warden Program</h3>
                  <p className="text-sm text-gray-600">
                    Volunteer neighborhood representatives trained in fire safety and emergency response
                  </p>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-200 text-center hover:shadow-md transition-shadow">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bell className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-orange-800 mb-2">Alert System</h3>
                  <p className="text-sm text-gray-600">
                    Real-time notifications for fire threats and evacuation orders
                  </p>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-200 text-center hover:shadow-md transition-shadow">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-orange-800 mb-2">Educational Resources</h3>
                  <p className="text-sm text-gray-600">
                    Comprehensive learning materials on wildfire prevention, safety, and response
                  </p>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-200 text-center hover:shadow-md transition-shadow">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-orange-800 mb-2">Community Forum</h3>
                  <p className="text-sm text-gray-600">
                    Online platform for residents to share information, ask questions, and collaborate
                  </p>
                </div>
              </div>
              
              <div className="bg-amber-50 p-6 rounded-xl border border-amber-200 mt-8 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-amber-800 mb-3">Community Impact</h3>
                <p className="text-gray-700 mb-4">
                  Our community engagement initiatives have demonstrated significant impact in pilot neighborhoods:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-amber-700 text-lg mb-1">85%</h4>
                    <p className="text-sm text-gray-600">Increase in community wildfire preparedness</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-amber-700 text-lg mb-1">92%</h4>
                    <p className="text-sm text-gray-600">Of residents feel more informed about wildfire risks</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-amber-700 text-lg mb-1">73%</h4>
                    <p className="text-sm text-gray-600">Reduction in preventable fire incidents</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Fire Warden Program Tab */}
          {activeTab === 'fire-warden' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Fire Warden Program</h2>
              <p className="text-gray-600">
                Our Fire Warden Program empowers community members to take leadership roles in wildfire preparedness 
                and response. Fire Wardens serve as the vital link between emergency services and local residents.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-orange-800 mb-3">Warden Responsibilities</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Shield className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Coordinate neighborhood evacuation drills and safety meetings</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Monitor local conditions and report potential hazards</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Distribute educational materials and safety updates</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Assist vulnerable residents during emergencies</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Provide feedback on system performance and community needs</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-orange-800 mb-3">Warden Training</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <ClipboardList className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Comprehensive 16-hour certification program</span>
                    </li>
                    <li className="flex items-start">
                      <ClipboardList className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>First aid and basic emergency response</span>
                    </li>
                    <li className="flex items-start">
                      <ClipboardList className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Wildfire behavior and safety protocols</span>
                    </li>
                    <li className="flex items-start">
                      <ClipboardList className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Communication systems and procedures</span>
                    </li>
                    <li className="flex items-start">
                      <ClipboardList className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Quarterly refresher courses and updates</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-orange-50 p-6 rounded-xl border border-orange-200 mt-8 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-orange-800 mb-3">Become a Fire Warden</h3>
                <p className="text-gray-700 mb-4">
                  We're currently recruiting Fire Wardens for neighborhoods throughout Los Angeles. 
                  Join our team of dedicated volunteers and help protect your community.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-orange-700 mb-2">Requirements</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Los Angeles resident (18+ years)</li>
                      <li>• Commitment to community safety</li>
                      <li>• Ability to complete training program</li>
                      <li>• Good communication skills</li>
                      <li>• Reliable transportation</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-orange-700 mb-2">Next Training Sessions</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li className="flex items-center">
                        <Calendar className="h-4 w-4 text-orange-600 mr-2" />
                        <span>April 15-16, 2025 - West LA</span>
                      </li>
                      <li className="flex items-center">
                        <Calendar className="h-4 w-4 text-orange-600 mr-2" />
                        <span>May 8-9, 2025 - San Fernando Valley</span>
                      </li>
                      <li className="flex items-center">
                        <Calendar className="h-4 w-4 text-orange-600 mr-2" />
                        <span>May 22-23, 2025 - East LA</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <button className="mt-4 bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300">
                  Apply Now
                </button>
              </div>
            </div>
          )}
          
          {/* Notification System Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Notification System</h2>
              <p className="text-gray-600">
                Stay informed about wildfire threats and emergency situations through our comprehensive notification system.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-orange-800 mb-3">Alert Types</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Bell className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Fire risk warnings and updates</span>
                    </li>
                    <li className="flex items-start">
                      <Bell className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Evacuation orders and instructions</span>
                    </li>
                    <li className="flex items-start">
                      <Bell className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Community safety meetings and events</span>
                    </li>
                    <li className="flex items-start">
                      <Bell className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Training and certification opportunities</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-orange-800 mb-3">Delivery Methods</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Bell className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Mobile app notifications</span>
                    </li>
                    <li className="flex items-start">
                      <Bell className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>SMS text messages</span>
                    </li>
                    <li className="flex items-start">
                      <Bell className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Email updates</span>
                    </li>
                    <li className="flex items-start">
                      <Bell className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Community bulletin boards</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-orange-50 p-6 rounded-xl border border-orange-200 mt-8 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-orange-800 mb-3">Sign Up for Alerts</h3>
                <p className="text-gray-700 mb-4">
                  Register to receive important updates about wildfire threats and community safety in your area.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-orange-700 mb-2">Personal Information</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Name and contact details</li>
                      <li>• Address and neighborhood</li>
                      <li>• Preferred notification methods</li>
                      <li>• Emergency contact information</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-orange-700 mb-2">Alert Preferences</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Customize alert types</li>
                      <li>• Set quiet hours</li>
                      <li>• Choose delivery methods</li>
                      <li>• Update notification settings</li>
                    </ul>
                  </div>
                </div>
                <button className="mt-4 bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300">
                  Register for Alerts
                </button>
              </div>
            </div>
          )}
          
          {/* Educational Resources Tab */}
          {activeTab === 'education' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Educational Resources</h2>
              <p className="text-gray-600">
                Access comprehensive learning materials and guides to help you understand wildfire risks and prepare for emergencies.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-orange-800 mb-3">Learning Materials</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <BookOpen className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Wildfire prevention guides</span>
                    </li>
                    <li className="flex items-start">
                      <BookOpen className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Emergency preparedness checklists</span>
                    </li>
                    <li className="flex items-start">
                      <BookOpen className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Safety protocol videos</span>
                    </li>
                    <li className="flex items-start">
                      <BookOpen className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Community workshop materials</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-orange-800 mb-3">Training Programs</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <BookOpen className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Basic fire safety certification</span>
                    </li>
                    <li className="flex items-start">
                      <BookOpen className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Emergency response training</span>
                    </li>
                    <li className="flex items-start">
                      <BookOpen className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Community leadership workshops</span>
                    </li>
                    <li className="flex items-start">
                      <BookOpen className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Environmental awareness courses</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-orange-50 p-6 rounded-xl border border-orange-200 mt-8 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-orange-800 mb-3">Resource Library</h3>
                <p className="text-gray-700 mb-4">
                  Browse our collection of educational materials and download resources for offline use.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-orange-700 mb-2">Available Resources</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• PDF guides and manuals</li>
                      <li>• Video tutorials</li>
                      <li>• Interactive quizzes</li>
                      <li>• Printable checklists</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-orange-700 mb-2">Access Options</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Online streaming</li>
                      <li>• Download for offline use</li>
                      <li>• Mobile app access</li>
                      <li>• Community center copies</li>
                    </ul>
                  </div>
                </div>
                <button className="mt-4 bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300">
                  Access Resources
                </button>
              </div>
            </div>
          )}
          
          {/* Community Forum Tab */}
          {activeTab === 'forum' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Community Forum</h2>
              <p className="text-gray-600">
                Connect with other community members, share experiences, and learn from each other in our moderated forum.
              </p>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                <CommunityForum />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
