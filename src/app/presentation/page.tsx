import React from 'react';
import { Presentation, ChevronRight, Award, Flame, CloudRain, Users, Zap, Shield, ThumbsUp } from 'lucide-react';

export default function PresentationPage() {
  return (
    <div className="space-y-8">
      <section className="bg-gradient-to-r from-amber-700 to-red-600 text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Presentation Outline</h1>
        <p className="text-xl">
          A compelling story-driven presentation structure for showcasing the Summit-Based Wildfire Suppression System
          with integrated Aerosol Air Purification technology.
        </p>
      </section>

      {/* Introduction */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <div className="bg-amber-100 w-10 h-10 rounded-full flex items-center justify-center mr-4">
            <Presentation className="h-5 w-5 text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Presentation Structure</h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          This presentation outline is designed to tell a compelling story about our solution, engage the audience,
          and clearly demonstrate how our approach addresses the wildfire challenges in Los Angeles while meeting
          all the requirements of the design brief.
        </p>
        
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mb-6">
          <h3 className="font-semibold text-amber-800 mb-2">Presentation Tips</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <ChevronRight className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>Practice your presentation multiple times to ensure smooth delivery</span>
            </li>
            <li className="flex items-start">
              <ChevronRight className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>Maintain eye contact with the judges and speak with confidence</span>
            </li>
            <li className="flex items-start">
              <ChevronRight className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>Use the web application to demonstrate key features during your presentation</span>
            </li>
            <li className="flex items-start">
              <ChevronRight className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>Be prepared to answer questions about technical details and implementation</span>
            </li>
            <li className="flex items-start">
              <ChevronRight className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>Emphasize community engagement and appropriate technology aspects</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Presentation Outline */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Detailed Presentation Outline</h2>
        
        <div className="space-y-8">
          {/* Section 1 */}
          <div className="relative pl-8 pb-8 border-l-2 border-amber-500">
            <div className="absolute -left-3 top-0">
              <div className="bg-amber-500 w-6 h-6 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">1</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-700 mb-2">The Burning Problem (2 minutes)</h3>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Flame className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Open with a powerful statistic or story about wildfire impact in LA</p>
                      <p className="text-sm text-gray-600 mt-1">
                        "In the past decade, Los Angeles County has lost over 1,500 homes and 150,000 acres to wildfires, 
                        with damages exceeding $3 billion."
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Flame className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Highlight the specific challenges of LA's wildfire situation</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Urban-wildland interface, Santa Ana winds, drought conditions, and increasing population in fire-prone areas
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Flame className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Identify the gap in current solutions</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Current approaches are reactive rather than preventative, lack integration, and don't adequately 
                        address smoke pollution impacts on communities
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Section 2 */}
          <div className="relative pl-8 pb-8 border-l-2 border-amber-500">
            <div className="absolute -left-3 top-0">
              <div className="bg-amber-500 w-6 h-6 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">2</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-700 mb-2">Our Vision: A Comprehensive Solution (3 minutes)</h3>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CloudRain className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Introduce the Summit-Based Wildfire Suppression System concept</p>
                      <p className="text-sm text-gray-600 mt-1">
                        An integrated approach combining early detection, automated suppression, and community protection
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CloudRain className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Present the key components of our solution</p>
                      <p className="text-sm text-gray-600 mt-1">
                        AI fire mapping, water collection & storage, sprinkler & fire retardant system, 
                        aerosol air purification, and community engagement
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CloudRain className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Share the "aha moment" that led to this innovative approach</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Combining existing technologies in a novel way to create a comprehensive system that addresses 
                        both fire suppression and smoke pollution
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Section 3 */}
          <div className="relative pl-8 pb-8 border-l-2 border-amber-500">
            <div className="absolute -left-3 top-0">
              <div className="bg-amber-500 w-6 h-6 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">3</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-700 mb-2">System Components & Technology (5 minutes)</h3>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Zap className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">AI Fire Mapping Technology</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Demonstrate how Google's FireStat technology detects fires as small as a swimming pool within minutes
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Zap className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Water Collection & Storage System</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Show how stormwater is captured, stored, and distributed through existing infrastructure
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Zap className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Sprinkler & Fire Retardant System</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Explain the high-pressure adjustable nozzles and environmentally-friendly fire retardant
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Zap className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Aerosol Air Purification System</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Showcase the wall-mounted units that protect buildings and homes from smoke pollution
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Zap className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">AI-Driven Monitoring & Automation</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Highlight how AI optimizes system response based on fire characteristics and weather conditions
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Section 4 */}
          <div className="relative pl-8 pb-8 border-l-2 border-amber-500">
            <div className="absolute -left-3 top-0">
              <div className="bg-amber-500 w-6 h-6 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">4</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-700 mb-2">Live Demonstration (3 minutes)</h3>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Shield className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Interactive 3D Simulation</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Show the 3D wildfire simulation with terrain, trees, buildings, sprinklers, and aerosol units
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">System Response Timeline</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Walk through the timeline from fire detection to containment, highlighting key response stages
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Resource Allocation Map</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Demonstrate the interactive map showing firefighting resources across Los Angeles
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Section 5 */}
          <div className="relative pl-8 pb-8 border-l-2 border-amber-500">
            <div className="absolute -left-3 top-0">
              <div className="bg-amber-500 w-6 h-6 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">5</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-700 mb-2">Community Engagement (3 minutes)</h3>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Users className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Fire Warden Program</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Explain how community volunteers serve as the vital link between emergency services and residents
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Users className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Notification System</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Showcase the multi-channel alert system integrated with NotifyLA
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Users className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Educational Resources</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Highlight the comprehensive learning materials for wildfire prevention and safety
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Users className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Community Forum</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Show how the online platform enables residents to share information and collaborate
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Section 6 */}
          <div className="relative pl-8 pb-8 border-l-2 border-amber-500">
            <div className="absolute -left-3 top-0">
              <div className="bg-amber-500 w-6 h-6 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">6</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-700 mb-2">Appropriate Technology & Environmental Impact (2 minutes)</h3>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ThumbsUp className="h-5 w-5 text-teal-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Appropriate Technology Principles</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Explain how our solution aligns with appropriate technology principles: locally managed, 
                        environmentally sustainable, and accessible
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ThumbsUp className="h-5 w-5 text-teal-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Environmental Benefits</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Highlight reduced wildfire damage, water conservation through stormwater capture, 
                        and improved air quality
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ThumbsUp className="h-5 w-5 text-teal-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Long-term Sustainability</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Address maintenance requirements, system lifespan, and community ownership
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Section 7 */}
          <div className="relative pl-8">
            <div className="absolute -left-3 top-0">
              <div className="bg-amber-500 w-6 h-6 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">7</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-700 mb-2">Conclusion & Call to Action (2 minutes)</h3>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Award className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Recap the key benefits</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Faster detection, immediate response, comprehensive protection, and community empowerment
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Award className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Present implementation roadmap</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Pilot program in high-risk neighborhoods, phased expansion, and long-term vision
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Award className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">End with a powerful vision statement</p>
                      <p className="text-sm text-gray-600 mt-1">
                        "Together, we can transform Los Angeles from one of the most wildfire-vulnerable cities 
                        into a model of community-driven resilience and protection."
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Aids */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Visual Aids & Supporting Materials</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3">Presentation Slides</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span>Use high-quality images of Los Angeles wildfire-prone areas</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span>Include diagrams of system components and their integration</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span>Show before/after comparisons of wildfire response times</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span>Use consistent color scheme and branding throughout</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span>Minimize text, maximize visuals and key statistics</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3">Web Application Demo</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span>Prepare specific demo paths to showcase key features</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span>Practice transitions between presentation and demo</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span>Have backup screenshots in case of technical issues</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span>Focus on the 3D simulation and interactive elements</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span>Highlight community engagement features</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3">Handouts & Leave-Behinds</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span>One-page executive summary with key benefits</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span>Technical specifications sheet for system components</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span>Implementation roadmap with timeline and milestones</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span>QR code linking to web application demo</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span>Contact information for follow-up questions</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3">Q&A Preparation</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span>Prepare answers for technical feasibility questions</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span>Address potential cost and implementation challenges</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span>Be ready to explain appropriate technology aspects</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span>Prepare examples of community engagement success stories</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span>Have additional technical details available if requested</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Storytelling Elements */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Storytelling Elements</h2>
        
        <div className="space-y-6">
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-800 mb-2">The Hero's Journey Structure</h3>
            <p className="text-gray-700 mb-4">
              Frame your presentation as a journey from problem to solution:
            </p>
            <ol className="space-y-2">
              <li className="flex items-start">
                <span className="bg-purple-200 rounded-full w-6 h-6 flex items-center justify-center text-purple-800 mr-2 flex-shrink-0">1</span>
                <div>
                  <p className="font-medium">The Call: Los Angeles faces increasing wildfire threats</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-purple-200 rounded-full w-6 h-6 flex items-center justify-center text-purple-800 mr-2 flex-shrink-0">2</span>
                <div>
                  <p className="font-medium">The Challenge: Current solutions are inadequate</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-purple-200 rounded-full w-6 h-6 flex items-center justify-center text-purple-800 mr-2 flex-shrink-0">3</span>
                <div>
                  <p className="font-medium">The Insight: Combining technologies in a novel way</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-purple-200 rounded-full w-6 h-6 flex items-center justify-center text-purple-800 mr-2 flex-shrink-0">4</span>
                <div>
                  <p className="font-medium">The Solution: Our integrated system approach</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-purple-200 rounded-full w-6 h-6 flex items-center justify-center text-purple-800 mr-2 flex-shrink-0">5</span>
                <div>
                  <p className="font-medium">The Transformation: A safer, more resilient Los Angeles</p>
                </div>
              </li>
            </ol>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">Personal Connection</h3>
            <p className="text-gray-700 mb-4">
              Consider including a brief personal story that connects you to the wildfire issue:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>A personal experience with wildfires or evacuation</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>A family member or friend affected by wildfire damage</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Your connection to the Los Angeles community</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>What inspired you to work on this solution</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2">Memorable Metaphors</h3>
            <p className="text-gray-700 mb-4">
              Use these metaphors to make complex concepts more relatable:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <div>
                  <p className="font-medium">"Immune System" Metaphor</p>
                  <p className="text-sm text-gray-600 mt-1">
                    "Our system works like an immune system for the city - detecting threats early, 
                    responding rapidly, and protecting vulnerable areas."
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <div>
                  <p className="font-medium">"Safety Net" Metaphor</p>
                  <p className="text-sm text-gray-600 mt-1">
                    "The integrated components create a safety net that catches fires before they can spread, 
                    while the aerosol system provides a shield against smoke pollution."
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <div>
                  <p className="font-medium">"Neighborhood Watch" Metaphor</p>
                  <p className="text-sm text-gray-600 mt-1">
                    "Our community engagement approach is like a high-tech neighborhood watch, 
                    where technology and people work together to keep communities safe."
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Rubric Alignment */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Rubric Alignment</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rubric Criteria
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  How Our Presentation Addresses It
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-medium text-gray-800">Problem Definition</span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-600">
                    Section 1 clearly defines the wildfire problem in Los Angeles with specific statistics and challenges
                  </p>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-medium text-gray-800">Appropriate Technology</span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-600">
                    Section 6 explicitly addresses how our solution aligns with appropriate technology principles
                  </p>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-medium text-gray-800">Technical Feasibility</span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-600">
                    Section 3 details each component's technology and implementation, while Section 4 demonstrates functionality
                  </p>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-medium text-gray-800">Community Engagement</span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-600">
                    Section 5 is dedicated to our comprehensive community engagement initiatives
                  </p>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-medium text-gray-800">Environmental Impact</span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-600">
                    Section 6 highlights environmental benefits including reduced wildfire damage and water conservation
                  </p>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-medium text-gray-800">Presentation Quality</span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-600">
                    Our storytelling approach, visual aids, and interactive demonstration create an engaging presentation
                  </p>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-medium text-gray-800">Innovation</span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-600">
                    Section 2 emphasizes our novel approach of integrating existing technologies in a new way, with Section 3 highlighting the aerosol system innovation
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
