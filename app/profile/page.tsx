"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { User, Settings, Bell, Shield, Activity, Calendar, Edit, Camera, Download, Lock, Sun, Moon, Laptop } from "lucide-react"

export default function ProfilePage() {
  // In a real app, this would come from a database or API
  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg?height=128&width=128",
    level: 3,
    progress: 65,
    ritualTokens: 245,
    joinDate: "March 2023",
    doshaProfile: {
      vata: 40,
      pitta: 35,
      kapha: 25,
    },
    healthConcerns: ["Stress", "Sleep", "Digestion"],
    allergies: ["Dairy", "Peanuts"],
    preferences: ["Vegetarian", "Morning Routine", "Meditation"],
  })

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Sidebar */}
        <div className="md:w-1/3 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                    <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                  >
                    <Camera className="h-4 w-4" />
                    <span className="sr-only">Change avatar</span>
                  </Button>
                </div>
                <h2 className="text-2xl font-bold">{userProfile.name}</h2>
                <p className="text-muted-foreground">{userProfile.email}</p>
                
                <div className="mt-4 w-full">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Level {userProfile.level}</span>
                    <span>{userProfile.progress}%</span>
                  </div>
                  <Progress value={userProfile.progress} className="h-2" />
                </div>
                
                <div className="mt-6 flex items-center justify-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="text-amber-500">✦</span>
                    <span className="font-medium">{userProfile.ritualTokens}</span>
                    <span className="text-muted-foreground text-xs">Tokens</span>
                  </div>
                  <div className="h-4 w-px bg-border"></div>
                  <div className="text-muted-foreground text-sm">
                    Member since {userProfile.joinDate}
                  </div>
                </div>
                
                <div className="mt-6 w-full">
                  <Button className="w-full">Edit Profile</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Dosha Profile</CardTitle>
              <CardDescription>Your Ayurvedic constitution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Vata</span>
                    <span className="text-sm font-medium text-blue-600">{userProfile.doshaProfile.vata}%</span>
                  </div>
                  <div className="h-2 w-full bg-blue-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full" 
                      style={{ width: `${userProfile.doshaProfile.vata}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Pitta</span>
                    <span className="text-sm font-medium text-red-600">{userProfile.doshaProfile.pitta}%</span>
                  </div>
                  <div className="h-2 w-full bg-red-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-500 rounded-full" 
                      style={{ width: `${userProfile.doshaProfile.pitta}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Kapha</span>
                    <span className="text-sm font-medium text-green-600">{userProfile.doshaProfile.kapha}%</span>
                  </div>
                  <div className="h-2 w-full bg-green-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full" 
                      style={{ width: `${userProfile.doshaProfile.kapha}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full">
                  <Activity className="mr-2 h-4 w-4" />
                  Take Dosha Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">
                <User className="mr-2 h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="health">
                <Activity className="mr-2 h-4 w-4" />
                Health Data
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Health Profile</CardTitle>
                  <CardDescription>Your health concerns and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Health Concerns</h3>
                      <div className="flex flex-wrap gap-2">
                        {userProfile.healthConcerns.map((concern) => (
                          <Badge key={concern} variant="secondary">{concern}</Badge>
                        ))}
                        <Button variant="outline" size="sm" className="h-6 gap-1">
                          <Edit className="h-3 w-3" />
                          <span className="text-xs">Edit</span>
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Allergies</h3>
                      <div className="flex flex-wrap gap-2">
                        {userProfile.allergies.map((allergy) => (
                          <Badge key={allergy} variant="destructive">{allergy}</Badge>
                        ))}
                        <Button variant="outline" size="sm" className="h-6 gap-1">
                          <Edit className="h-3 w-3" />
                          <span className="text-xs">Edit</span>
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Preferences</h3>
                      <div className="flex flex-wrap gap-2">
                        {userProfile.preferences.map((preference) => (
                          <Badge key={preference} variant="outline">{preference}</Badge>
                        ))}
                        <Button variant="outline" size="sm" className="h-6 gap-1">
                          <Edit className="h-3 w-3" />
                          <span className="text-xs">Edit</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent interactions with Veda</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Activity className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Completed Pulse Scan</p>
                        <p className="text-sm text-muted-foreground">Your dosha balance was updated</p>
                        <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Scheduled Consultation</p>
                        <p className="text-sm text-muted-foreground">Ayurvedic consultation with Dr. Sharma</p>
                        <p className="text-xs text-muted-foreground mt-1">1 week ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Shield className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Updated Privacy Settings</p>
                        <p className="text-sm text-muted-foreground">Changed data sharing preferences</p>
                        <p className="text-xs text-muted-foreground mt-1">2 weeks ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="health" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Health Metrics</CardTitle>
                  <CardDescription>Your recent health measurements</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Connect your wearable devices or manually enter your health data to see your metrics here.</p>
                  <Button>
                    <Activity className="mr-2 h-4 w-4" />
                    Sync Health Data
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Name</label>
                        <Input 
                          type="text" 
                          className="mt-1" 
                          value={userProfile.name}
                          onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <Input 
                          type="email" 
                          className="mt-1" 
                          value={userProfile.email}
                          onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button>
                        <Settings className="mr-2 h-4 w-4" />
                        Update Account Settings
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive updates via email</p>
                      </div>
                      <Switch defaultChecked id="email-notifications" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive alerts on your device</p>
                      </div>
                      <Switch id="push-notifications" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Health Reminders</p>
                        <p className="text-sm text-muted-foreground">Daily reminders for health routines</p>
                      </div>
                      <Switch defaultChecked id="health-reminders" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Weekly Reports</p>
                        <p className="text-sm text-muted-foreground">Receive weekly health summaries</p>
                      </div>
                      <Switch defaultChecked id="weekly-reports" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Control your data and privacy preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Data Sharing</p>
                        <p className="text-sm text-muted-foreground">Share anonymized health data to improve recommendations</p>
                      </div>
                      <Switch defaultChecked id="data-sharing" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Profile Visibility</p>
                        <p className="text-sm text-muted-foreground">Allow other users to see your profile</p>
                      </div>
                      <Switch id="profile-visibility" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Activity Tracking</p>
                        <p className="text-sm text-muted-foreground">Track your app usage for personalized experience</p>
                      </div>
                      <Switch defaultChecked id="activity-tracking" />
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div>
                      <h3 className="font-medium mb-2">Data Export</h3>
                      <p className="text-sm text-muted-foreground mb-4">Download a copy of your personal data</p>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export Data
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize how Veda looks for you</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Theme</h3>
                      <div className="grid grid-cols-3 gap-2">
                        <Button variant="outline" className="justify-start" size="sm">
                          <Sun className="mr-2 h-4 w-4" />
                          Light
                        </Button>
                        <Button variant="outline" className="justify-start" size="sm">
                          <Moon className="mr-2 h-4 w-4" />
                          Dark
                        </Button>
                        <Button variant="outline" className="justify-start bg-primary/5" size="sm">
                          <Laptop className="mr-2 h-4 w-4" />
                          System
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Reduce Animations</p>
                        <p className="text-sm text-muted-foreground">Use simpler transitions throughout the app</p>
                      </div>
                      <Switch id="reduce-animations" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Password & Security</CardTitle>
                  <CardDescription>Manage your account security settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Change Password</h3>
                      <div className="space-y-2">
                        <div>
                          <label className="text-sm font-medium">Current Password</label>
                          <Input type="password" className="mt-1" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">New Password</label>
                          <Input type="password" className="mt-1" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Confirm New Password</label>
                          <Input type="password" className="mt-1" />
                        </div>
                      </div>
                      <Button className="mt-4">
                        <Lock className="mr-2 h-4 w-4" />
                        Update Password
                      </Button>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Switch id="two-factor" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}