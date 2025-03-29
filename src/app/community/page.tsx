"use client";

import React, { useState } from 'react';
import CommunityForum from '../components/community/CommunityForum';
import { Users, Bell, BookOpen, MapPin, Shield, ClipboardList, UserCheck, Calendar } from 'lucide-react';

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="space-y-8">
      <section className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Community Engagement</h1>
        <p className="text-xl">
          Join our community-driven approach to wildfire management. Together, we can create safer neighborhoods
          through education, collaboration, and active participation.
        </p>
      </section>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-6 text-center font-medium text-sm flex-shrink-0 ${
              activeTab === 'overview'
                ? 'bg-orange-100 text-orange-700 border-b-2 border-orange-500'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('fire-warden')}
            className={`py-4 px-6 text-center font-medium text-sm flex-shrink-0 ${
              activeTab === 'fire-warden'
                ? 'bg-orange-100 text-orange-700 border-b-2 border-orange-500'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Fire Warden Program
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`py-4 px-6 text-center font-medium text-sm flex-shrink-0 ${
              activeTab === 'notifications'
                ? 'bg-orange-100 text-orange-700 border-b-2 border-orange-500'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Notification System
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`py-4 px-6 text-center font-medium text-sm flex-shrink-0 ${
              activeTab === 'education'
                ? 'bg-orange-100 text-orange-700 border-b-2 border-orange-500'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Educational Resources
          </button>
          <button
            onClick={() => setActiveTab('forum')}
            className={`py-4 px-6 text-center font-medium text-sm flex-shrink-0 ${
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
                <div className="bg-orange-50 p-6 rounded-lg border border-orange-200 text-center">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserCheck className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-orange-800 mb-2">Fire Warden Program</h3>
                  <p className="text-sm text-gray-600">
                    Volunteer neighborhood representatives trained in fire safety and emergency response
                  </p>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-lg border border-orange-200 text-center">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bell className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-orange-800 mb-2">Alert System</h3>
                  <p className="text-sm text-gray-600">
                    Real-time notifications for fire threats and evacuation orders
                  </p>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-lg border border-orange-200 text-center">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-orange-800 mb-2">Educational Resources</h3>
                  <p className="text-sm text-gray-600">
                    Comprehensive learning materials on wildfire prevention, safety, and response
                  </p>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-lg border border-orange-200 text-center">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-orange-800 mb-2">Community Forum</h3>
                  <p className="text-sm text-gray-600">
                    Online platform for residents to share information, ask questions, and collaborate
                  </p>
                </div>
              </div>
              
              <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 mt-8">
                <h3 className="text-xl font-semibold text-amber-800 mb-3">Community Impact</h3>
                <p className="text-gray-700 mb-4">
                  Our community engagement initiatives have demonstrated significant impact in pilot neighborhoods:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-amber-700 text-lg mb-1">85%</h4>
                    <p className="text-sm text-gray-600">Increase in community wildfire preparedness</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-amber-700 text-lg mb-1">92%</h4>
                    <p className="text-sm text-gray-600">Of residents feel more informed about wildfire risks</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
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
                <div>
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
                
                <div>
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
              
              <div className="bg-orange-50 p-6 rounded-lg border border-orange-200 mt-8">
                <h3 className="text-xl font-semibold text-orange-800 mb-3">Become a Fire Warden</h3>
                <p className="text-gray-700 mb-4">
                  We're currently recruiting Fire Wardens for neighborhoods throughout Los Angeles. 
                  Join our team of dedicated volunteers and help protect your community.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-orange-700 mb-2">Requirements</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Los Angeles resident (18+ years)</li>
                      <li>• Commitment to community safety</li>
                      <li>• Ability to complete training program</li>
                      <li>• Good communication skills</li>
                      <li>• Reliable transportation</li>
                    </ul>
                  </div>
                  <div>
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
                <button className="mt-4 bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded transition-colors duration-300">
                  Apply Now
                </button>
              </div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center mb-3">
                    <UserCheck className="h-5 w-5 text-orange-600 mr-2" />
                    <h4 className="font-semibold text-gray-800">125</h4>
                  </div>
                  <p className="text-sm text-gray-600">Active Fire Wardens</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center mb-3">
                    <MapPin className="h-5 w-5 text-orange-600 mr-2" />
                    <h4 className="font-semibold text-gray-800">42</h4>
                  </div>
                  <p className="text-sm text-gray-600">Neighborhoods Covered</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center mb-3">
                    <Users className="h-5 w-5 text-orange-600 mr-2" />
                    <h4 className="font-semibold text-gray-800">15,000+</h4>
                  </div>
                  <p className="text-sm text-gray-600">Residents Served</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Notification System Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Community Notification System</h2>
              <p className="text-gray-600">
                Our integrated notification system ensures that community members receive timely, accurate information 
                during wildfire events. The system leverages multiple communication channels to reach residents 
                regardless of their location or preferred method of communication.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">NotifyLA Integration</h3>
                  <p className="text-gray-700 mb-4">
                    Our system integrates with NotifyLA, the City's official mass notification system, to provide:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Bell className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Emergency alerts via text, email, and phone calls</span>
                    </li>
                    <li className="flex items-start">
                      <Bell className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Evacuation notices with real-time route information</span>
                    </li>
                    <li className="flex items-start">
                      <Bell className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Status updates throughout emergency events</span>
                    </li>
                    <li className="flex items-start">
                      <Bell className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>All-clear notifications when threats have passed</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">Additional Notification Channels</h3>
                  <p className="text-gray-700 mb-4">
                    To ensure comprehensive coverage, our system also includes:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Bell className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Mobile app push notifications with interactive maps</span>
                    </li>
                    <li className="flex items-start">
                      <Bell className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Social media alerts on multiple platforms</span>
                    </li>
                    <li className="flex items-start">
                      <Bell className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Digital signage in public spaces and transportation hubs</span>
                    </li>
                    <li className="flex items-start">
                      <Bell className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Fire Warden direct outreach for vulnerable populations</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Notification Types</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Alert Level
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Channels
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Frequency
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Emergency
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Immediate threat requiring action
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          All available channels
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Immediate + 30 min updates
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                            Warning
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Potential threat in next 24-48 hours
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Text, email, app, social media
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Initial + 2 hour updates
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            Advisory
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Elevated risk conditions
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          App, email, social media
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Daily updates
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Information
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          General updates and information
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          App, email, website
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          As needed
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">Sign Up for Notifications</h3>
                <p className="text-gray-700 mb-4">
                  Register to receive wildfire alerts and updates for your neighborhood. You can customize 
                  your notification preferences and choose your preferred communication channels.
                </p>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                      placeholder="Enter your zip code"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notification Preferences</label>
                    <div className="flex flex-wrap gap-4">
                      <label className="inline-flex items-center">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" defaultChecked />
                        <span className="ml-2 text-sm text-gray-700">Text Messages</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" defaultChecked />
                        <span className="ml-2 text-sm text-gray-700">Email</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" defaultChecked />
                        <span className="ml-2 text-sm text-gray-700">Phone Calls</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" defaultChecked />
                        <span className="ml-2 text-sm text-gray-700">App Notifications</span>
                      </label>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-colors duration-300">
                      Register for Notifications
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          {/* Educational Resources Tab */}
          {activeTab === 'education' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Educational Resources</h2>
              <p className="text-gray-600">
                Knowledge is a powerful tool in wildfire prevention and safety. Our educational resources 
                provide community members with the information they need to protect themselves, their families, 
                and their properties from wildfire threats.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Wildfire Prevention</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>Creating defensible space around your home</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>Fire-resistant landscaping techniques</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>Home hardening strategies</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>Community-wide prevention measures</span>
                    </li>
                  </ul>
                  <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 text-sm">
                    View Resources
                  </button>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Emergency Preparedness</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">•</span>
                      <span>Creating a family emergency plan</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">•</span>
                      <span>Building emergency supply kits</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">•</span>
                      <span>Evacuation procedures and routes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">•</span>
                      <span>Communication during emergencies</span>
                    </li>
                  </ul>
                  <button className="mt-4 w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 text-sm">
                    View Resources
                  </button>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">System Education</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>How the Summit-Based System works</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Aerosol system installation and maintenance</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Community integration and support</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Reporting system issues or concerns</span>
                    </li>
                  </ul>
                  <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 text-sm">
                    View Resources
                  </button>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Featured Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex">
                    <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Wildfire Safety Video Series</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        A comprehensive 5-part video series covering all aspects of wildfire safety and preparedness.
                      </p>
                      <button className="mt-2 text-purple-600 hover:text-purple-800 text-sm font-medium">
                        Watch Videos →
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex">
                    <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Homeowner's Wildfire Guide</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        A downloadable guide with checklists and resources for protecting your home from wildfires.
                      </p>
                      <button className="mt-2 text-purple-600 hover:text-purple-800 text-sm font-medium">
                        Download PDF →
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex">
                    <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Community Workshop Calendar</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Schedule of upcoming workshops, training sessions, and community events.
                      </p>
                      <button className="mt-2 text-purple-600 hover:text-purple-800 text-sm font-medium">
                        View Calendar →
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex">
                    <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Aerosol System Installation Guide</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Step-by-step instructions for installing and maintaining your aerosol protection system.
                      </p>
                      <button className="mt-2 text-purple-600 hover:text-purple-800 text-sm font-medium">
                        View Guide →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-xl font-semibold text-green-800 mb-3">Educational Programs</h3>
                <p className="text-gray-700 mb-4">
                  We offer a variety of educational programs for different age groups and audiences:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-green-700">School Programs</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Age-appropriate wildfire education for K-12 students, including classroom materials and field trips.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-green-700">Community Workshops</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Hands-on workshops covering topics like home hardening, evacuation planning, and fire safety.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-green-700">Business Preparedness</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Specialized training for businesses to develop continuity plans and protect assets during wildfires.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-green-700">Senior Safety Program</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Tailored resources and assistance for seniors and those with mobility challenges.
                    </p>
                  </div>
                </div>
                <button className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition-colors duration-300">
                  Request a Program
                </button>
              </div>
            </div>
          )}
          
          {/* Community Forum Tab */}
          {activeTab === 'forum' && (
            <CommunityForum />
          )}
        </div>
      </div>
    </div>
  );
}
