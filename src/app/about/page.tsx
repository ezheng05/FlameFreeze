import React from 'react';
import { Info, FileText, Github } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <section className="bg-gradient-to-r from-gray-800 to-gray-700 text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">About This Project</h1>
        <p className="text-xl">
          FlameFreeze is an innovative solution designed for EWB Design Corner 2025 
          to address wildfire management challenges in Los Angeles through appropriate technology and community engagement.
        </p>
      </section>

      {/* Project Overview */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-start space-x-4">
          <Info className="h-10 w-10 text-amber-600 flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Project Overview</h2>
            <p className="text-gray-600 mb-4">
              This project was developed as part of the Engineers Without Borders (EWB) Design Corner 2025, focusing on 
              creating sustainable solutions for wildfire management in Los Angeles. Our approach combines innovative 
              technology with community engagement to create a comprehensive system that addresses both prevention and response.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">The Challenge</h3>
                <p className="text-gray-600">
                  Los Angeles faces increasing wildfire threats due to climate change, urban expansion into wildland areas, 
                  and prolonged drought conditions. Traditional firefighting methods often struggle with rapid detection 
                  and response, particularly in hard-to-reach areas.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Our Solution</h3>
                <p className="text-gray-600">
                  Our team (BUilders) developed FlameFreeze, a system that combines AI-powered early detection, stormwater harvesting, 
                  automated sprinkler systems, air purification, and community engagement to create a comprehensive approach to wildfire 
                  management that is both effective and environmentally sustainable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-start space-x-4">
          <Github className="h-10 w-10 text-gray-700 flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Technology Stack</h2>
            <p className="text-gray-600 mb-4">
              This web application was built using modern web technologies to create an interactive and informative 
              experience that showcases the FlameFreeze system.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Frontend</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• Next.js (React framework)</li>
                  <li>• Tailwind CSS</li>
                  <li>• Three.js (3D visualizations)</li>
                  <li>• Recharts (data visualization)</li>
                  <li>• Mapbox GL (mapping)</li>
                  <li>• Lucide Icons</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Backend</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• Next.js API routes</li>
                  <li>• SQLite database</li>
                  <li>• Custom simulation engine</li>
                  <li>• Cloudflare Workers</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Development Tools</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• TypeScript</li>
                  <li>• Node.js</li>
                  <li>• npm</li>
                  <li>• Git</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appropriate Technology */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-start space-x-4">
          <FileText className="h-10 w-10 text-green-600 flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Appropriate Technology Approach</h2>
            <p className="text-gray-600 mb-4">
              Our solution follows appropriate technology principles, ensuring that it is sustainable, 
              environmentally friendly, and adaptable to the specific needs of Los Angeles communities.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <h3 className="font-semibold text-green-800 mb-2">Environmental Sustainability</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Uses stormwater collection to reduce dependency on municipal water supplies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Solar-powered pumps and monitoring systems minimize energy consumption</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Biodegradable fire retardants reduce environmental impact</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Gravity-fed distribution reduces pumping requirements</span>
                  </li>
                </ul>
              </div>
              
              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <h3 className="font-semibold text-green-800 mb-2">Community Integration</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Involves local residents through the fire warden program</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Provides educational resources for community empowerment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Integrates with existing notification systems (NotifyLA)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Creates community forums for knowledge sharing and collaboration</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h3 className="font-semibold text-amber-800 mb-2">Differentiation from Existing Solutions</h3>
              <p className="text-amber-900 mb-3">
                While other wildfire management systems focus primarily on detection or suppression, our solution provides a comprehensive 
                approach that addresses the entire lifecycle of wildfire management:
              </p>
              <ol className="list-decimal pl-6 space-y-1 text-amber-900">
                <li>Early detection through AI and sensor networks</li>
                <li>Automated response with smart sprinkler systems</li>
                <li>Sustainable water usage through stormwater collection</li>
                <li>Community engagement and education</li>
                <li>Integration with existing emergency response systems</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Team & Acknowledgments */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Team & Acknowledgments</h2>
        <p className="text-gray-600 mb-6">
          This project was developed for EWB Design Corner 2025, with inspiration and guidance from various sources.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Project Team</h3>
            <ul className="space-y-1 text-gray-600">
              <li>• Ellen Zheng</li>
              <li>• Clara Armon</li>
              <li>• Melinda Tran</li>
              <li>• Sara Mcdermott</li>
              <li>• Jiayi Zhang</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Acknowledgments</h3>
            <ul className="space-y-1 text-gray-600">
              <li>• Engineers Without Borders</li>
              <li>• Google FireSat Project</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
