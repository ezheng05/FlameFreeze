"use client";

import React, { useState } from 'react';
import { Users, MessageSquare, Bell, BookOpen, MapPin, Shield, ClipboardList, UserCheck } from 'lucide-react';

export default function CommunityForum() {
  const [activeTab, setActiveTab] = useState('discussions');
  const [newPostVisible, setNewPostVisible] = useState(false);
  
  // Mock forum data
  const discussions = [
    {
      id: 1,
      title: "Tips for clearing brush around homes",
      author: "Maria G.",
      replies: 23,
      lastActivity: "2 days ago",
      category: "Prevention",
      status: "active"
    },
    {
      id: 2,
      title: "Neighborhood evacuation drill - April 15th",
      author: "Fire Warden John",
      replies: 8,
      lastActivity: "1 day ago",
      category: "Announcement",
      status: "announcement"
    },
    {
      id: 3,
      title: "Questions about the sprinkler system coverage",
      author: "David T.",
      replies: 12,
      lastActivity: "3 days ago",
      category: "Question",
      status: "question"
    },
    {
      id: 4,
      title: "Aerosol system installation experiences",
      author: "Sarah M.",
      replies: 15,
      lastActivity: "5 hours ago",
      category: "Discussion",
      status: "active"
    },
    {
      id: 5,
      title: "Community fire safety workshop - Sign up now",
      author: "Fire Warden Lisa",
      replies: 7,
      lastActivity: "12 hours ago",
      category: "Event",
      status: "announcement"
    },
    {
      id: 6,
      title: "How effective are the aerosol units against smoke?",
      author: "Michael P.",
      replies: 19,
      lastActivity: "1 day ago",
      category: "Question",
      status: "question"
    }
  ];
  
  const experts = [
    {
      id: 1,
      name: "Dr. James Wilson",
      role: "Fire Ecology Specialist",
      organization: "LA Fire Department",
      posts: 47,
      joined: "January 2025"
    },
    {
      id: 2,
      name: "Elena Rodriguez",
      role: "Emergency Response Coordinator",
      organization: "LA County Emergency Management",
      posts: 32,
      joined: "February 2025"
    },
    {
      id: 3,
      name: "Robert Chen",
      role: "Environmental Engineer",
      organization: "Summit System Development Team",
      posts: 56,
      joined: "December 2024"
    }
  ];
  
  const categories = [
    { name: "System Updates", color: "blue" },
    { name: "Prevention Tips", color: "green" },
    { name: "Evacuation Plans", color: "amber" },
    { name: "Community Events", color: "purple" },
    { name: "Emergency Response", color: "red" },
    { name: "General Discussion", color: "gray" }
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Forum Header */}
      <div className="bg-orange-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MessageSquare className="h-8 w-8 mr-3" />
            <h2 className="text-2xl font-bold">Community Forum</h2>
          </div>
          <button 
            onClick={() => setNewPostVisible(!newPostVisible)}
            className="bg-white text-orange-700 hover:bg-orange-50 font-bold py-2 px-4 rounded transition-colors duration-300"
          >
            New Post
          </button>
        </div>
        <p className="mt-2 text-orange-100">
          Connect with neighbors, share experiences, and discuss wildfire prevention strategies
        </p>
      </div>
      
      {/* New Post Form */}
      {newPostVisible && (
        <div className="p-6 border-b border-gray-200 bg-orange-50">
          <h3 className="text-lg font-semibold text-orange-800 mb-4">Create New Post</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500" 
                placeholder="Enter post title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500">
                {categories.map((category, index) => (
                  <option key={index} value={category.name}>{category.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <textarea 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 h-32" 
                placeholder="Write your post here..."
              ></textarea>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                type="button"
                onClick={() => setNewPostVisible(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition-colors duration-300"
              >
                Cancel
              </button>
              <button 
                type="button"
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Forum Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('discussions')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'discussions'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Discussions
          </button>
          <button
            onClick={() => setActiveTab('experts')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'experts'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Community Experts
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'categories'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Categories
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="p-6">
        {/* Discussions Tab */}
        {activeTab === 'discussions' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Recent Discussions</h3>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">Sort by:</span>
                <select className="text-sm border border-gray-300 rounded-md p-1">
                  <option>Recent Activity</option>
                  <option>Most Replies</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-3">
              {discussions.map(discussion => (
                <div key={discussion.id} className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-800">{discussion.title}</h4>
                    <span className={`bg-${discussion.status === 'active' ? 'green' : discussion.status === 'announcement' ? 'blue' : 'amber'}-100 text-${discussion.status === 'active' ? 'green' : discussion.status === 'announcement' ? 'blue' : 'amber'}-800 text-xs px-2 py-1 rounded-full`}>
                      {discussion.status === 'active' ? 'Active' : discussion.status === 'announcement' ? 'Announcement' : 'Question'}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <span>Started by {discussion.author}</span>
                    <span className="mx-2">•</span>
                    <span>{discussion.replies} replies</span>
                    <span className="mx-2">•</span>
                    <span>{discussion.lastActivity}</span>
                  </div>
                  <div className="mt-2">
                    <span className={`inline-block bg-${discussion.category === 'Prevention' ? 'green' : discussion.category === 'Announcement' || discussion.category === 'Event' ? 'blue' : discussion.category === 'Question' ? 'amber' : 'purple'}-100 text-${discussion.category === 'Prevention' ? 'green' : discussion.category === 'Announcement' || discussion.category === 'Event' ? 'blue' : discussion.category === 'Question' ? 'amber' : 'purple'}-800 text-xs px-2 py-1 rounded-full`}>
                      {discussion.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-center">
              <button className="bg-orange-100 text-orange-700 hover:bg-orange-200 font-medium py-2 px-4 rounded transition-colors duration-300">
                Load More Discussions
              </button>
            </div>
          </div>
        )}
        
        {/* Experts Tab */}
        {activeTab === 'experts' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Community Experts</h3>
            <p className="text-gray-600 mb-6">
              Our forum features verified experts from local fire departments, forestry services, and emergency management agencies 
              who can answer your questions and provide guidance.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {experts.map(expert => (
                <div key={expert.id} className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center mb-4">
                    <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                      <UserCheck className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{expert.name}</h4>
                      <p className="text-sm text-orange-600">{expert.role}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-medium">Organization:</span> {expert.organization}</p>
                    <p><span className="font-medium">Posts:</span> {expert.posts}</p>
                    <p><span className="font-medium">Joined:</span> {expert.joined}</p>
                  </div>
                  <button className="mt-4 w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 text-sm">
                    View Profile
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">Become a Community Expert</h4>
              <p className="text-gray-700 mb-4">
                Are you a professional in fire management, emergency response, or environmental science? 
                Share your expertise with our community by becoming a verified expert.
              </p>
              <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 text-sm">
                Apply Now
              </button>
            </div>
          </div>
        )}
        
        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Discussion Categories</h3>
            <p className="text-gray-600 mb-6">
              Browse discussions by category to find topics that interest you.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((category, index) => (
                <div key={index} className={`p-4 bg-${category.color}-50 rounded-lg border border-${category.color}-200 hover:shadow-md transition-shadow duration-200`}>
                  <h4 className={`font-semibold text-${category.color}-800 mb-1`}>{category.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {category.name === "System Updates" && "Updates and information about the Summit-Based Wildfire Suppression System"}
                    {category.name === "Prevention Tips" && "Tips and strategies for preventing wildfires and protecting your property"}
                    {category.name === "Evacuation Plans" && "Information about evacuation routes, procedures, and planning"}
                    {category.name === "Community Events" && "Announcements for community drills, workshops, and meetings"}
                    {category.name === "Emergency Response" && "Guidance on how to respond during wildfire emergencies"}
                    {category.name === "General Discussion" && "General topics related to wildfire management and community safety"}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {Math.floor(Math.random() * 50) + 10} discussions
                    </span>
                    <button className={`text-${category.color}-700 hover:text-${category.color}-800 text-sm font-medium`}>
                      Browse →
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-2">Suggest a New Category</h4>
              <p className="text-gray-700 mb-4">
                Is there a topic you'd like to discuss that doesn't fit into existing categories? 
                Suggest a new category for our community forum.
              </p>
              <div className="flex">
                <input 
                  type="text" 
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:ring-orange-500 focus:border-orange-500" 
                  placeholder="Suggest a category name"
                />
                <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-r-md transition-colors duration-300">
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
