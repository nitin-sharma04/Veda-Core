"use client"

import * as React from "react"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Activity, Smartphone, Watch, Fingerprint, Plus, Check, RefreshCw } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

// Define the form schema for manual data entry
const manualDataFormSchema = z.object({
  heartRate: z.string().regex(/^\d+$/, {
    message: "Heart rate must be a number",
  }),
  bloodPressureSystolic: z.string().regex(/^\d+$/, {
    message: "Blood pressure must be a number",
  }),
  bloodPressureDiastolic: z.string().regex(/^\d+$/, {
    message: "Blood pressure must be a number",
  }),
  sleepHours: z.string().regex(/^\d+(\.\d+)?$/, {
    message: "Sleep hours must be a number",
  }),
  steps: z.string().regex(/^\d+$/, {
    message: "Steps must be a number",
  }),
  stressLevel: z.string().regex(/^[1-5]$/, {
    message: "Stress level must be between 1-5",
  }),
  date: z.string(),
})

type ManualDataFormValues = z.infer<typeof manualDataFormSchema>

// Define the available device types
const deviceTypes = [
  {
    id: "smartwatch",
    name: "Smart Watch",
    icon: Watch,
    examples: ["Apple Watch", "Fitbit", "Samsung Galaxy Watch", "Garmin"]
  },
  {
    id: "smartphone",
    name: "Smartphone",
    icon: Smartphone,
    examples: ["iPhone Health", "Google Fit", "Samsung Health"]
  },
  {
    id: "smartring",
    name: "Smart Ring",
    icon: Fingerprint,
    examples: ["Oura Ring", "Circular Ring"]
  },
  {
    id: "manual",
    name: "Manual Entry",
    icon: Plus,
    examples: ["Enter your own data"]
  }
]

// Define the health metrics to sync
const healthMetrics = [
  { id: "heartRate", name: "Heart Rate", unit: "BPM" },
  { id: "bloodPressure", name: "Blood Pressure", unit: "mmHg" },
  { id: "sleepData", name: "Sleep Data", unit: "hours" },
  { id: "steps", name: "Steps", unit: "count" },
  { id: "stressLevel", name: "Stress Level", unit: "1-5" },
  { id: "doshaBalance", name: "Dosha Balance", unit: "%" },
]

export function HealthDataSyncButton() {
  const [open, setOpen] = useState(false)
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-purple-600 to-indigo-800 text-white">
          <Activity className="mr-2 h-4 w-4" />
          Sync Latest Health Data
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Sync Health Data</DialogTitle>
          <DialogDescription>
            Connect your wearable devices or manually enter your health data to keep your metrics up to date.
          </DialogDescription>
        </DialogHeader>
        
        <HealthDataSyncContent onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

function HealthDataSyncContent({ onSuccess }: { onSuccess: () => void }) {
  const [syncingDevice, setSyncingDevice] = useState<string | null>(null)
  const [syncComplete, setSyncComplete] = useState(false)
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null)
  
  // Handle device connection
  const handleConnectDevice = (deviceId: string) => {
    setSyncingDevice(deviceId)
    
    // Simulate connection and data sync
    setTimeout(() => {
      setSyncComplete(true)
      setSyncingDevice(null)
      
      toast({
        title: "Health data synchronized",
        description: `Successfully synced data from your ${deviceTypes.find(d => d.id === deviceId)?.name}`,
      })
    }, 2000)
  }
  
  return (
    <Tabs defaultValue="devices" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="devices">Connect Device</TabsTrigger>
        <TabsTrigger value="manual">Manual Entry</TabsTrigger>
      </TabsList>
      
      <TabsContent value="devices" className="space-y-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {deviceTypes.filter(d => d.id !== "manual").map((device) => (
            <Card 
              key={device.id} 
              className={`cursor-pointer transition-all ${selectedDevice === device.id ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setSelectedDevice(device.id)}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{device.name}</CardTitle>
                <device.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-4">Compatible with: {device.examples.join(", ")}</p>
                {selectedDevice === device.id && (
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation()
                      handleConnectDevice(device.id)
                    }} 
                    className="w-full" 
                    variant="outline"
                    disabled={syncingDevice === device.id}
                  >
                    {syncingDevice === device.id ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Syncing...
                      </>
                    ) : syncComplete ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Connected
                      </>
                    ) : (
                      "Connect & Sync"
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="space-y-4 mt-6">
          <h3 className="text-sm font-medium">Data to Sync</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {healthMetrics.map((metric) => (
              <div key={metric.id} className="flex items-center space-x-2">
                <Checkbox id={`sync-${metric.id}`} defaultChecked />
                <label
                  htmlFor={`sync-${metric.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {metric.name} ({metric.unit})
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mt-6">
          <Switch id="auto-sync" />
          <label
            htmlFor="auto-sync"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Enable automatic daily sync
          </label>
        </div>
        
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onSuccess}>Cancel</Button>
          <Button onClick={onSuccess} disabled={!syncComplete && !selectedDevice}>Done</Button>
        </DialogFooter>
      </TabsContent>
      
      <TabsContent value="manual" className="space-y-4 py-4">
        <ManualDataEntryForm onSuccess={onSuccess} />
      </TabsContent>
    </Tabs>
  )
}

function ManualDataEntryForm({ onSuccess }: { onSuccess: () => void }) {
  // Get current date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0]
  
  // Initialize form with default values
  const form = useForm<ManualDataFormValues>({
    resolver: zodResolver(manualDataFormSchema),
    defaultValues: {
      heartRate: "",
      bloodPressureSystolic: "",
      bloodPressureDiastolic: "",
      sleepHours: "",
      steps: "",
      stressLevel: "",
      date: today,
    },
  })

  // Handle form submission
  function onSubmit(data: ManualDataFormValues) {
    // In a real app, this would save the data to your backend
    console.log(data)
    
    toast({
      title: "Health data saved",
      description: "Your manually entered health data has been saved successfully.",
    })
    
    onSuccess()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="heartRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Heart Rate (BPM)</FormLabel>
                <FormControl>
                  <Input placeholder="72" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="space-y-2">
            <FormLabel>Blood Pressure (mmHg)</FormLabel>
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="bloodPressureSystolic"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="120" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <span className="flex items-center">/</span>
              <FormField
                control={form.control}
                name="bloodPressureDiastolic"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="80" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <FormField
            control={form.control}
            name="sleepHours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sleep Hours</FormLabel>
                <FormControl>
                  <Input placeholder="7.5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="steps"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Steps</FormLabel>
                <FormControl>
                  <Input placeholder="8432" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="stressLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stress Level (1-5)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stress level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">1 - Very Low</SelectItem>
                    <SelectItem value="2">2 - Low</SelectItem>
                    <SelectItem value="3">3 - Moderate</SelectItem>
                    <SelectItem value="4">4 - High</SelectItem>
                    <SelectItem value="5">5 - Very High</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onSuccess} type="button">Cancel</Button>
          <Button type="submit">Save Data</Button>
        </DialogFooter>
      </form>
    </Form>
  )
}