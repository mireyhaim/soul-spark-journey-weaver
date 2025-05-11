
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, FileText, Upload, Video } from "lucide-react";

const TeacherPortal: React.FC = () => {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-serif font-semibold mb-2">Teacher Portal</h1>
          <p className="text-earth-600">Create and manage your spiritual guidance processes.</p>
        </div>
        
        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="create">Create Process</TabsTrigger>
            <TabsTrigger value="manage">Manage Processes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>Create New Process</CardTitle>
                <CardDescription>
                  Design a guided journey for spiritual growth.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="process-title">Process Title</Label>
                  <Input id="process-title" placeholder="e.g., Journey to Inner Peace" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="process-description">Description</Label>
                  <Textarea 
                    id="process-description" 
                    placeholder="Describe what participants will experience and learn..."
                    className="min-h-[120px]"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="process-category">Category</Label>
                    <Select>
                      <SelectTrigger id="process-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="meditation">Meditation</SelectItem>
                        <SelectItem value="forgiveness">Forgiveness</SelectItem>
                        <SelectItem value="abundance">Abundance</SelectItem>
                        <SelectItem value="gratitude">Gratitude</SelectItem>
                        <SelectItem value="relationships">Relationships</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="process-duration">Duration (Days)</Label>
                    <Select>
                      <SelectTrigger id="process-duration">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 Days</SelectItem>
                        <SelectItem value="14">14 Days</SelectItem>
                        <SelectItem value="21">21 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Content Components</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    <Button variant="outline" className="h-auto flex flex-col items-center space-y-2 py-6">
                      <FileText className="h-8 w-8 text-spirit-600" />
                      <span>Add Text</span>
                    </Button>
                    
                    <Button variant="outline" className="h-auto flex flex-col items-center space-y-2 py-6">
                      <Upload className="h-8 w-8 text-spirit-600" />
                      <span>Upload Audio</span>
                    </Button>
                    
                    <Button variant="outline" className="h-auto flex flex-col items-center space-y-2 py-6">
                      <Video className="h-8 w-8 text-spirit-600" />
                      <span>Add Video</span>
                    </Button>
                    
                    <Button variant="outline" className="h-auto flex flex-col items-center space-y-2 py-6">
                      <Calendar className="h-8 w-8 text-spirit-600" />
                      <span>Add Exercise</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button variant="outline">Save Draft</Button>
                <Button>Create Process</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="manage">
            <Card>
              <CardHeader>
                <CardTitle>Your Processes</CardTitle>
                <CardDescription>
                  Manage and track your created spiritual journeys.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="rounded-lg border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-earth-50">
                        <th className="py-3 px-4 text-left font-medium">Process</th>
                        <th className="py-3 px-4 text-left font-medium">Duration</th>
                        <th className="py-3 px-4 text-left font-medium">Category</th>
                        <th className="py-3 px-4 text-left font-medium">Status</th>
                        <th className="py-3 px-4 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="py-3 px-4">Journey to Forgiveness</td>
                        <td className="py-3 px-4">7 days</td>
                        <td className="py-3 px-4">Forgiveness</td>
                        <td className="py-3 px-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span></td>
                        <td className="py-3 px-4 text-right"><Button variant="ghost" size="sm">Edit</Button></td>
                      </tr>
                      <tr className="border-t">
                        <td className="py-3 px-4">Abundance Meditation</td>
                        <td className="py-3 px-4">14 days</td>
                        <td className="py-3 px-4">Abundance</td>
                        <td className="py-3 px-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span></td>
                        <td className="py-3 px-4 text-right"><Button variant="ghost" size="sm">Edit</Button></td>
                      </tr>
                      <tr className="border-t">
                        <td className="py-3 px-4">Inner Child Healing</td>
                        <td className="py-3 px-4">21 days</td>
                        <td className="py-3 px-4">Healing</td>
                        <td className="py-3 px-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Draft</span></td>
                        <td className="py-3 px-4 text-right"><Button variant="ghost" size="sm">Edit</Button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeacherPortal;
