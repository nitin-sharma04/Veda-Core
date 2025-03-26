"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Filter,
  Search,
  Star,
  Heart,
  ShoppingCart,
  Tag,
  Leaf,
  Droplets,
  Wind,
  ArrowLeft,
  Sparkles,
  AlertCircle,
  Clock,
  Check,
  Package,
  ShieldCheck,
  Zap,
  Award,
  Info,
  Flame,
  Minus,
  Plus,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useEffect } from "react"

interface Product {
  id: string
  name: string
  description: string
  price: number
  rating: number
  category: string
  image: string
  dosha: string[]
  ritualTokens: number
  benefits: string[]
  ingredients?: string[]
  usage?: string
  safetyInfo?: string[]
  stock: number
  isPersonalized?: boolean
  personalizedReason?: string
  reviews?: number
  discountPercent?: number
  tags?: string[]
}

interface CartItem {
  id: string
  quantity: number
}

interface Order {
  id: string
  date: string
  status: "processing" | "shipped" | "delivered" | "cancelled"
  items: {
    id: string
    name: string
    quantity: number
    price: number
    image: string
  }[]
  total: number
  trackingNumber?: string
  estimatedDelivery?: string
}

interface UserProfile {
  name: string
  email: string
  ritualTokens: number
  doshaProfile: {
    vata: number
    pitta: number
    kapha: number
  }
  healthConcerns: string[]
  allergies: string[]
  preferences: string[]
  level: number
  progress: number
}

const productsData = [
  {
    id: "1",
    name: "Ashwagandha Root Powder",
    description: "Organic adaptogenic herb to support stress response and energy levels.",
    price: 24.99,
    rating: 4.8,
    category: "herbs",
    image: "/placeholder.svg?height=200&width=200",
    dosha: ["Vata", "Kapha"],
    ritualTokens: 15,
    benefits: [
      "Reduces stress and anxiety",
      "Improves energy and stamina",
      "Supports immune function",
      "Enhances mental clarity",
    ],
    ingredients: ["Organic Ashwagandha Root Powder (Withania somnifera)"],
    usage: "Take 1/2 teaspoon (2-3g) daily mixed with warm milk or water, preferably before bedtime.",
    safetyInfo: [
      "Not recommended during pregnancy",
      "Consult physician if taking medications",
      "May cause drowsiness in some individuals",
    ],
    stock: 45,
    isPersonalized: true,
    personalizedReason: "Recommended for your Vata imbalance and reported stress levels",
    reviews: 128,
    tags: ["Stress Relief", "Energy", "Sleep Support"],
  },
  {
    id: "2",
    name: "Triphala Supplement",
    description: "Traditional Ayurvedic formula for digestive health and detoxification.",
    price: 19.99,
    rating: 4.6,
    category: "supplements",
    image: "/placeholder.svg?height=200&width=200",
    dosha: ["Vata", "Pitta", "Kapha"],
    ritualTokens: 12,
    benefits: [
      "Supports healthy digestion",
      "Gentle detoxification",
      "Promotes regular elimination",
      "Rich in antioxidants",
    ],
    ingredients: [
      "Organic Amalaki (Emblica officinalis)",
      "Organic Bibhitaki (Terminalia bellirica)",
      "Organic Haritaki (Terminalia chebula)",
    ],
    usage: "Take 2 capsules before bedtime with warm water.",
    safetyInfo: ["Safe for most individuals", "May increase bowel movements initially"],
    stock: 32,
    isPersonalized: true,
    personalizedReason: "Recommended for your digestive concerns",
    reviews: 94,
    tags: ["Digestion", "Detox", "Tridoshic"],
  },
  {
    id: "3",
    name: "Brahmi Mind Oil",
    description: "Cooling herb infused oil for mental clarity and cognitive support.",
    price: 32.99,
    rating: 4.7,
    category: "oils",
    image: "/placeholder.svg?height=200&width=200",
    dosha: ["Pitta", "Vata"],
    ritualTokens: 20,
    benefits: [
      "Enhances memory and concentration",
      "Calms the mind",
      "Reduces mental fatigue",
      "Supports healthy hair growth",
    ],
    ingredients: ["Organic Sesame Oil", "Brahmi (Bacopa monnieri) Extract", "Coconut Oil"],
    usage:
      "Apply a small amount to the crown of the head and gently massage for 5-10 minutes. Can be left in for 30 minutes or overnight.",
    safetyInfo: ["For external use only", "Discontinue if irritation occurs"],
    stock: 18,
    reviews: 76,
    tags: ["Mental Clarity", "Hair Care", "Cooling"],
  },
  {
    id: "4",
    name: "Copper Tongue Scraper",
    description: "Traditional Ayurvedic tool for oral hygiene and detoxification.",
    price: 14.99,
    rating: 4.9,
    category: "tools",
    image: "/placeholder.svg?height=200&width=200",
    dosha: ["Vata", "Pitta", "Kapha"],
    ritualTokens: 8,
    benefits: [
      "Removes toxins and bacteria from the tongue",
      "Improves taste sensation",
      "Promotes fresh breath",
      "Supports overall oral health",
    ],
    usage: "Gently scrape from the back of the tongue to the front 7-14 times each morning before brushing teeth.",
    safetyInfo: ["Clean after each use", "Replace every 3-6 months"],
    stock: 50,
    reviews: 215,
    tags: ["Oral Care", "Morning Ritual", "Detox"],
  },
  {
    id: "5",
    name: "Rose Petal Tea",
    description: "Cooling herbal tea to balance Pitta dosha and support emotional wellbeing.",
    price: 16.99,
    rating: 4.5,
    category: "teas",
    image: "/placeholder.svg?height=200&width=200",
    dosha: ["Pitta"],
    ritualTokens: 10,
    benefits: ["Cools excess Pitta", "Supports emotional balance", "Gentle digestive aid", "Promotes clear skin"],
    ingredients: ["Organic Rose Petals", "Organic Hibiscus Flowers", "Organic Cardamom"],
    usage: "Steep 1 teaspoon in hot water for 5-7 minutes. Enjoy 1-2 cups daily.",
    safetyInfo: ["Safe for most individuals", "Avoid if allergic to any ingredients"],
    stock: 27,
    isPersonalized: true,
    personalizedReason: "Recommended to balance your Pitta dosha",
    reviews: 68,
    discountPercent: 15,
    tags: ["Cooling", "Emotional Balance", "Skin Health"],
  },
  {
    id: "6",
    name: "Sesame Oil",
    description: "Warming oil for Vata-balancing massage and self-care rituals.",
    price: 22.99,
    rating: 4.7,
    category: "oils",
    image: "/placeholder.svg?height=200&width=200",
    dosha: ["Vata"],
    ritualTokens: 15,
    benefits: [
      "Nourishes and moisturizes skin",
      "Calms the nervous system",
      "Promotes sound sleep",
      "Supports joint health",
    ],
    ingredients: ["100% Organic Cold-Pressed Sesame Oil"],
    usage: "Warm slightly and apply to the body for self-massage (abhyanga) before bathing.",
    safetyInfo: ["For external use only", "Perform patch test before full application"],
    stock: 35,
    isPersonalized: true,
    personalizedReason: "Recommended for your dominant Vata dosha",
    reviews: 103,
    tags: ["Massage", "Sleep Support", "Skin Care"],
  },
  {
    id: "7",
    name: "Neem & Tulsi Face Wash",
    description: "Purifying facial cleanser for clear, balanced skin.",
    price: 18.99,
    rating: 4.6,
    category: "skincare",
    image: "/placeholder.svg?height=200&width=200",
    dosha: ["Pitta", "Kapha"],
    ritualTokens: 12,
    benefits: [
      "Cleanses without stripping natural oils",
      "Helps prevent breakouts",
      "Reduces inflammation",
      "Balances skin microbiome",
    ],
    ingredients: ["Aqua", "Organic Neem Extract", "Organic Tulsi Extract", "Aloe Vera Gel", "Glycerin"],
    usage: "Apply to damp face, massage gently, and rinse. Use morning and evening.",
    safetyInfo: ["Avoid contact with eyes", "Discontinue if irritation occurs"],
    stock: 22,
    reviews: 87,
    tags: ["Skin Care", "Purifying", "Anti-inflammatory"],
  },
  {
    id: "8",
    name: "Chyawanprash",
    description: "Traditional Ayurvedic jam packed with herbs and antioxidants for immunity and vitality.",
    price: 29.99,
    rating: 4.8,
    category: "supplements",
    image: "/placeholder.svg?height=200&width=200",
    dosha: ["Vata", "Kapha"],
    ritualTokens: 18,
    benefits: [
      "Boosts immunity",
      "Supports respiratory health",
      "Enhances energy and vitality",
      "Rich in antioxidants",
    ],
    ingredients: ["Amla (Indian Gooseberry)", "Ghee", "Honey", "40+ Ayurvedic herbs and spices"],
    usage: "Take 1-2 teaspoons daily in the morning with warm milk or water.",
    safetyInfo: ["Contains honey - not suitable for infants", "Monitor blood sugar if diabetic"],
    stock: 15,
    reviews: 142,
    tags: ["Immunity", "Energy", "Antioxidants"],
  },
  {
    id: "9",
    name: "Meditation Cushion Set",
    description: "Ergonomic cushion and mat set for comfortable meditation practice.",
    price: 49.99,
    rating: 4.9,
    category: "tools",
    image: "/placeholder.svg?height=200&width=200",
    dosha: ["Vata", "Pitta", "Kapha"],
    ritualTokens: 25,
    benefits: [
      "Supports proper posture",
      "Reduces discomfort during meditation",
      "Helps maintain consistent practice",
      "Durable and eco-friendly materials",
    ],
    usage: "Place cushion on mat and sit with crossed legs, keeping spine straight.",
    stock: 8,
    reviews: 56,
    discountPercent: 20,
    tags: ["Meditation", "Yoga", "Comfort"],
  },
  {
    id: "10",
    name: "Nasya Oil",
    description: "Herbal nasal oil for clear breathing and mental clarity.",
    price: 26.99,
    rating: 4.7,
    category: "oils",
    image: "/placeholder.svg?height=200&width=200",
    dosha: ["Vata"],
    ritualTokens: 16,
    benefits: [
      "Clears nasal passages",
      "Relieves sinus congestion",
      "Supports mental clarity",
      "Nourishes nasal tissues",
    ],
    ingredients: ["Sesame Oil", "Eucalyptus Oil", "Brahmi Extract", "Ginger Extract"],
    usage: "Place 2-3 drops in each nostril while lying down with head tilted back.",
    safetyInfo: ["Not for use during acute sinus infections", "Avoid if allergic to any ingredients"],
    stock: 12,
    isPersonalized: true,
    personalizedReason: "Recommended for your Vata imbalance and sinus concerns",
    reviews: 73,
    tags: ["Respiratory", "Sinus Care", "Mental Clarity"],
  },
  {
    id: "11",
    name: "Dosha Balance Tea Set",
    description: "Set of three teas formulated to balance Vata, Pitta, and Kapha doshas.",
    price: 34.99,
    rating: 4.8,
    category: "teas",
    image: "/placeholder.svg?height=200&width=200",
    dosha: ["Vata", "Pitta", "Kapha"],
    ritualTokens: 20,
    benefits: [
      "Customized support for all doshas",
      "Promotes overall balance",
      "Supports digestive health",
      "Enhances daily wellness routine",
    ],
    ingredients: ["Organic herbs and spices specific to each dosha"],
    usage: "Select tea based on your current imbalance. Steep 1 teaspoon in hot water for 5-7 minutes.",
    safetyInfo: ["Review individual tea ingredients for allergies", "Consult healthcare provider if pregnant"],
    stock: 18,
    reviews: 92,
    tags: ["Dosha Balance", "Customizable", "Wellness"],
  },
  {
    id: "12",
    name: "Kansa Wand Facial Massager",
    description: "Traditional Ayurvedic facial massage tool made from healing Kansa metal.",
    price: 39.99,
    rating: 4.6,
    category: "tools",
    image: "/placeholder.svg?height=200&width=200",
    dosha: ["Vata", "Pitta", "Kapha"],
    ritualTokens: 22,
    benefits: [
      "Improves facial circulation",
      "Reduces puffiness and tension",
      "Promotes lymphatic drainage",
      "Enhances natural glow",
    ],
    usage: "Apply facial oil and gently massage face in circular motions for 5-10 minutes.",
    safetyInfo: ["Clean after each use", "Avoid on broken skin or active acne"],
    stock: 9,
    reviews: 64,
    tags: ["Facial Care", "Massage", "Anti-aging"],
  },
]

const products = [
  {
    id: 1,
    name: "Ashwagandha Root Extract",
    description: "Organic stress-relief supplement for Vata balance",
    price: 24.99,
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?height=200&width=200",
    category: "supplements",
    dosha: "vata",
    tags: ["stress-relief", "organic", "adaptogen"],
    sale: false,
    stock: 15,
    ritualTokens: 5,
  },
  {
    id: 2,
    name: "Triphala Digestive Support",
    description: "Traditional Ayurvedic formula for digestive health",
    price: 19.99,
    rating: 4.6,
    reviews: 89,
    image: "/placeholder.svg?height=200&width=200",
    category: "supplements",
    dosha: "all",
    tags: ["digestion", "detox", "organic"],
    sale: true,
    salePrice: 16.99,
    stock: 8,
    ritualTokens: 4,
  },
  {
    id: 3,
    name: "Cooling Pitta Balancing Tea",
    description: "Herbal blend to calm and cool Pitta dosha",
    price: 14.99,
    rating: 4.9,
    reviews: 56,
    image: "/placeholder.svg?height=200&width=200",
    category: "teas",
    dosha: "pitta",
    tags: ["cooling", "calming", "organic"],
    sale: false,
    stock: 22,
    ritualTokens: 3,
  },
  {
    id: 4,
    name: "Kapha Stimulating Body Oil",
    description: "Warming massage oil to invigorate Kapha constitution",
    price: 29.99,
    rating: 4.7,
    reviews: 42,
    image: "/placeholder.svg?height=200&width=200",
    category: "body-care",
    dosha: "kapha",
    tags: ["warming", "stimulating", "organic"],
    sale: true,
    salePrice: 24.99,
    stock: 5,
    ritualTokens: 6,
  },
  {
    id: 5,
    name: "Brahmi Mind Support",
    description: "Cognitive enhancement and mental clarity supplement",
    price: 27.99,
    rating: 4.5,
    reviews: 78,
    image: "/placeholder.svg?height=200&width=200",
    category: "supplements",
    dosha: "vata",
    tags: ["focus", "memory", "organic"],
    sale: false,
    stock: 18,
    ritualTokens: 5,
  },
  {
    id: 6,
    name: "Neem Purifying Face Wash",
    description: "Antibacterial cleanser for Pitta skin types",
    price: 18.99,
    rating: 4.4,
    reviews: 63,
    image: "/placeholder.svg?height=200&width=200",
    category: "skin-care",
    dosha: "pitta",
    tags: ["purifying", "cooling", "organic"],
    sale: false,
    stock: 12,
    ritualTokens: 4,
  },
  {
    id: 7,
    name: "Turmeric Golden Milk Blend",
    description: "Anti-inflammatory drink mix with adaptogens",
    price: 22.99,
    rating: 4.9,
    reviews: 105,
    image: "/placeholder.svg?height=200&width=200",
    category: "teas",
    dosha: "all",
    tags: ["anti-inflammatory", "warming", "organic"],
    sale: true,
    salePrice: 19.99,
    stock: 3,
    ritualTokens: 5,
  },
  {
    id: 8,
    name: "Vata Grounding Essential Oil Blend",
    description: "Calming aromatherapy blend for anxiety and stress",
    price: 32.99,
    rating: 4.7,
    reviews: 47,
    image: "/placeholder.svg?height=200&width=200",
    category: "aromatherapy",
    dosha: "vata",
    tags: ["calming", "grounding", "organic"],
    sale: false,
    stock: 9,
    ritualTokens: 7,
  },
]

export default function VitalMarketPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [activeTab, setActiveTab] = useState("recommended")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [sortOption, setSortOption] = useState<string>("recommended")
  const [orders, setOrders] = useState<Order[]>([])
  const [showOrderHistory, setShowOrderHistory] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Arjun Sharma",
    email: "arjun@example.com",
    ritualTokens: 245,
    doshaProfile: {
      vata: 42,
      pitta: 35,
      kapha: 23,
    },
    healthConcerns: ["Sleep issues", "Stress", "Digestion"],
    allergies: ["Peanuts", "Shellfish"],
    preferences: ["Organic", "Vegetarian"],
    level: 3,
    progress: 65,
  })

  // Sample orders data
  const sampleOrders: Order[] = [
    {
      id: "ORD-2023-1254",
      date: "2023-03-15",
      status: "delivered",
      items: [
        {
          id: "1",
          name: "Ashwagandha Root Powder",
          quantity: 1,
          price: 24.99,
          image: "/placeholder.svg?height=80&width=80",
        },
        {
          id: "4",
          name: "Copper Tongue Scraper",
          quantity: 1,
          price: 14.99,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
      total: 39.98,
      trackingNumber: "TRK928374651",
      estimatedDelivery: "Delivered on March 18, 2023",
    },
    {
      id: "ORD-2023-1892",
      date: "2023-05-22",
      status: "delivered",
      items: [
        {
          id: "6",
          name: "Sesame Oil",
          quantity: 1,
          price: 22.99,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
      total: 22.99,
      trackingNumber: "TRK736459821",
      estimatedDelivery: "Delivered on May 25, 2023",
    },
    {
      id: "ORD-2024-0347",
      date: "2024-02-10",
      status: "shipped",
      items: [
        {
          id: "2",
          name: "Triphala Supplement",
          quantity: 2,
          price: 19.99,
          image: "/placeholder.svg?height=80&width=80",
        },
        {
          id: "5",
          name: "Rose Petal Tea",
          quantity: 1,
          price: 16.99,
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
      total: 56.97,
      trackingNumber: "TRK102938475",
      estimatedDelivery: "Expected delivery on February 15, 2024",
    },
  ]

  // Initialize orders
  useEffect(() => {
    setOrders(sampleOrders)
  }, [])

  // Filter products based on search query and active filters
  const filteredProducts = productsData.filter((product) => {
    // Search filter
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.dosha.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.tags && product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())))

    // Category filter
    const matchesCategory = activeTab === "recommended" || product.category === activeTab

    // Additional filters
    const matchesFilters =
      activeFilters.length === 0 ||
      activeFilters.some((filter) => {
        if (filter === "personalized") return product.isPersonalized
        if (filter === "vata") return product.dosha.includes("Vata")
        if (filter === "pitta") return product.dosha.includes("Pitta")
        if (filter === "kapha") return product.dosha.includes("Kapha")
        if (filter === "discounted") return !!product.discountPercent
        if (filter === "inStock") return product.stock > 0
        return false
      })

    return matchesSearch && matchesCategory && matchesFilters
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "priceAsc") return a.price - b.price
    if (sortOption === "priceDesc") return b.price - a.price
    if (sortOption === "rating") return b.rating - a.rating
    if (sortOption === "newest") return Number.parseInt(b.id) - Number.parseInt(a.id)
    if (sortOption === "popular") return (b.reviews || 0) - (a.reviews || 0)
    if (sortOption === "tokensHigh") return b.ritualTokens - a.ritualTokens

    // Default: recommended (personalized first, then rating)
    if (a.isPersonalized && !b.isPersonalized) return -1
    if (!a.isPersonalized && b.isPersonalized) return 1
    return b.rating - a.rating
  })

  // Add to cart function
  const addToCart = (productId: string) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === productId)

      if (existingItem) {
        return prev.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prev, { id: productId, quantity: 1 }]
      }
    })
  }

  // Remove from cart function
  const removeFromCart = (productId: string) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === productId)

      if (existingItem && existingItem.quantity > 1) {
        return prev.map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
      } else {
        return prev.filter((item) => item.id !== productId)
      }
    })
  }

  // Calculate cart total
  const cartTotal = cartItems.reduce((total, item) => {
    const product = productsData.find((p) => p.id === item.id)
    if (!product) return total

    const price = product.discountPercent ? product.price * (1 - product.discountPercent / 100) : product.price

    return total + price * item.quantity
  }, 0)

  // Calculate total ritual tokens
  const totalRitualTokens = cartItems.reduce((total, item) => {
    const product = productsData.find((p) => p.id === item.id)
    return total + (product ? product.ritualTokens * item.quantity : 0)
  }, 0)

  // Handle checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) return

    // Create new order
    const newOrder: Order = {
      id: `ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split("T")[0],
      status: "processing",
      items: cartItems.map((item) => {
        const product = productsData.find((p) => p.id === item.id)!
        return {
          id: product.id,
          name: product.name,
          quantity: item.quantity,
          price: product.discountPercent ? product.price * (1 - product.discountPercent / 100) : product.price,
          image: product.image,
        }
      }),
      total: cartTotal,
      estimatedDelivery: `Expected delivery on ${new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`,
    }

    // Add order to history
    setOrders((prev) => [newOrder, ...prev])

    // Add ritual tokens to user profile
    setUserProfile((prev) => ({
      ...prev,
      ritualTokens: prev.ritualTokens + totalRitualTokens,
    }))

    // Clear cart
    setCartItems([])

    // Close cart sheet
    setIsCartOpen(false)

    // Show order history
    setShowOrderHistory(true)
  }

  // Toggle filter
  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  const products = [
    {
      id: 1,
      name: "Ashwagandha Root Extract",
      description: "Organic stress-relief supplement for Vata balance",
      price: 24.99,
      rating: 4.8,
      reviews: 124,
      image: "/placeholder.svg?height=200&width=200",
      category: "supplements",
      dosha: "vata",
      tags: ["stress-relief", "organic", "adaptogen"],
      sale: false,
      stock: 15,
      ritualTokens: 5,
    },
    {
      id: 2,
      name: "Triphala Digestive Support",
      description: "Traditional Ayurvedic formula for digestive health",
      price: 19.99,
      rating: 4.6,
      reviews: 89,
      image: "/placeholder.svg?height=200&width=200",
      category: "supplements",
      dosha: "all",
      tags: ["digestion", "detox", "organic"],
      sale: true,
      salePrice: 16.99,
      stock: 8,
      ritualTokens: 4,
    },
    {
      id: 3,
      name: "Cooling Pitta Balancing Tea",
      description: "Herbal blend to calm and cool Pitta dosha",
      price: 14.99,
      rating: 4.9,
      reviews: 56,
      image: "/placeholder.svg?height=200&width=200",
      category: "teas",
      dosha: "pitta",
      tags: ["cooling", "calming", "organic"],
      sale: false,
      stock: 22,
      ritualTokens: 3,
    },
    {
      id: 4,
      name: "Kapha Stimulating Body Oil",
      description: "Warming massage oil to invigorate Kapha constitution",
      price: 29.99,
      rating: 4.7,
      reviews: 42,
      image: "/placeholder.svg?height=200&width=200",
      category: "body-care",
      dosha: "kapha",
      tags: ["warming", "stimulating", "organic"],
      sale: true,
      salePrice: 24.99,
      stock: 5,
      ritualTokens: 6,
    },
    {
      id: 5,
      name: "Brahmi Mind Support",
      description: "Cognitive enhancement and mental clarity supplement",
      price: 27.99,
      rating: 4.5,
      reviews: 78,
      image: "/placeholder.svg?height=200&width=200",
      category: "supplements",
      dosha: "vata",
      tags: ["focus", "memory", "organic"],
      sale: false,
      stock: 18,
      ritualTokens: 5,
    },
    {
      id: 6,
      name: "Neem Purifying Face Wash",
      description: "Antibacterial cleanser for Pitta skin types",
      price: 18.99,
      rating: 4.4,
      reviews: 63,
      image: "/placeholder.svg?height=200&width=200",
      category: "skin-care",
      dosha: "pitta",
      tags: ["purifying", "cooling", "organic"],
      sale: false,
      stock: 12,
      ritualTokens: 4,
    },
    {
      id: 7,
      name: "Turmeric Golden Milk Blend",
      description: "Anti-inflammatory drink mix with adaptogens",
      price: 22.99,
      rating: 4.9,
      reviews: 105,
      image: "/placeholder.svg?height=200&width=200",
      category: "teas",
      dosha: "all",
      tags: ["anti-inflammatory", "warming", "organic"],
      sale: true,
      salePrice: 19.99,
      stock: 3,
      ritualTokens: 5,
    },
    {
      id: 8,
      name: "Vata Grounding Essential Oil Blend",
      description: "Calming aromatherapy blend for anxiety and stress",
      price: 32.99,
      rating: 4.7,
      reviews: 47,
      image: "/placeholder.svg?height=200&width=200",
      category: "aromatherapy",
      dosha: "vata",
      tags: ["calming", "grounding", "organic"],
      sale: false,
      stock: 9,
      ritualTokens: 7,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <header className="bg-white border-b border-orange-100 sticky top-0 z-10">
        <div className="container mx-auto py-4 px-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-slate-700 mr-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-slate-900">Vital Market</h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 w-full md:w-64 bg-white border-orange-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="border-orange-200">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="p-2">
                  <div className="font-medium mb-2">Sort By</div>
                  <div className="space-y-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full justify-start",
                        sortOption === "recommended" && "bg-orange-100 text-orange-900",
                      )}
                      onClick={() => setSortOption("recommended")}
                    >
                      Recommended
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full justify-start",
                        sortOption === "priceAsc" && "bg-orange-100 text-orange-900",
                      )}
                      onClick={() => setSortOption("priceAsc")}
                    >
                      Price: Low to High
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full justify-start",
                        sortOption === "priceDesc" && "bg-orange-100 text-orange-900",
                      )}
                      onClick={() => setSortOption("priceDesc")}
                    >
                      Price: High to Low
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn("w-full justify-start", sortOption === "rating" && "bg-orange-100 text-orange-900")}
                      onClick={() => setSortOption("rating")}
                    >
                      Highest Rated
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full justify-start",
                        sortOption === "popular" && "bg-orange-100 text-orange-900",
                      )}
                      onClick={() => setSortOption("popular")}
                    >
                      Most Popular
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full justify-start",
                        sortOption === "tokensHigh" && "bg-orange-100 text-orange-900",
                      )}
                      onClick={() => setSortOption("tokensHigh")}
                    >
                      Most Ritual Tokens
                    </Button>
                  </div>
                </div>

                <Separator className="my-2" />

                <div className="p-2">
                  <div className="font-medium mb-2">Filter By</div>
                  <div className="space-y-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full justify-start",
                        activeFilters.includes("personalized") && "bg-orange-100 text-orange-900",
                      )}
                      onClick={() => toggleFilter("personalized")}
                    >
                      <div className="flex items-center">
                        {activeFilters.includes("personalized") ? (
                          <Check className="h-4 w-4 mr-2" />
                        ) : (
                          <div className="h-4 w-4 mr-2 rounded-sm border border-slate-300" />
                        )}
                        Personalized for You
                      </div>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full justify-start",
                        activeFilters.includes("vata") && "bg-orange-100 text-orange-900",
                      )}
                      onClick={() => toggleFilter("vata")}
                    >
                      <div className="flex items-center">
                        {activeFilters.includes("vata") ? (
                          <Check className="h-4 w-4 mr-2" />
                        ) : (
                          <div className="h-4 w-4 mr-2 rounded-sm border border-slate-300" />
                        )}
                        Vata Balancing
                      </div>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full justify-start",
                        activeFilters.includes("pitta") && "bg-orange-100 text-orange-900",
                      )}
                      onClick={() => toggleFilter("pitta")}
                    >
                      <div className="flex items-center">
                        {activeFilters.includes("pitta") ? (
                          <Check className="h-4 w-4 mr-2" />
                        ) : (
                          <div className="h-4 w-4 mr-2 rounded-sm border border-slate-300" />
                        )}
                        Pitta Balancing
                      </div>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full justify-start",
                        activeFilters.includes("kapha") && "bg-orange-100 text-orange-900",
                      )}
                      onClick={() => toggleFilter("kapha")}
                    >
                      <div className="flex items-center">
                        {activeFilters.includes("kapha") ? (
                          <Check className="h-4 w-4 mr-2" />
                        ) : (
                          <div className="h-4 w-4 mr-2 rounded-sm border border-slate-300" />
                        )}
                        Kapha Balancing
                      </div>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full justify-start",
                        activeFilters.includes("discounted") && "bg-orange-100 text-orange-900",
                      )}
                      onClick={() => toggleFilter("discounted")}
                    >
                      <div className="flex items-center">
                        {activeFilters.includes("discounted") ? (
                          <Check className="h-4 w-4 mr-2" />
                        ) : (
                          <div className="h-4 w-4 mr-2 rounded-sm border border-slate-300" />
                        )}
                        On Sale
                      </div>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full justify-start",
                        activeFilters.includes("inStock") && "bg-orange-100 text-orange-900",
                      )}
                      onClick={() => toggleFilter("inStock")}
                    >
                      <div className="flex items-center">
                        {activeFilters.includes("inStock") ? (
                          <Check className="h-4 w-4 mr-2" />
                        ) : (
                          <div className="h-4 w-4 mr-2 rounded-sm border border-slate-300" />
                        )}
                        In Stock
                      </div>
                    </Button>
                  </div>
                </div>

                {activeFilters.length > 0 && (
                  <>
                    <Separator className="my-2" />
                    <div className="p-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-center text-orange-600"
                        onClick={() => setActiveFilters([])}
                      >
                        Clear All Filters
                      </Button>
                    </div>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="border-orange-200 relative">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  <span>Cart</span>
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItems.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md flex flex-col">
                <SheetHeader>
                  <SheetTitle>Your Cart</SheetTitle>
                  <SheetDescription>
                    {cartItems.length === 0
                      ? "Your cart is empty"
                      : `${cartItems.reduce((total, item) => total + item.quantity, 0)} items in your cart`}
                  </SheetDescription>
                </SheetHeader>

                {cartItems.length > 0 ? (
                  <>
                    <div className="flex-1 overflow-auto py-4">
                      <div className="space-y-4">
                        {cartItems.map((item) => {
                          const product = productsData.find((p) => p.id === item.id)
                          if (!product) return null

                          const itemPrice = product.discountPercent
                            ? product.price * (1 - product.discountPercent / 100)
                            : product.price

                          return (
                            <div
                              key={item.id}
                              className="flex items-center justify-between border-b border-orange-100 pb-4"
                            >
                              <div className="flex items-center">
                                <img
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  className="w-16 h-16 object-contain bg-orange-50 rounded-md mr-4"
                                />
                                <div>
                                  <h3 className="font-medium text-slate-900">{product.name}</h3>
                                  <div className="flex items-center mt-1">
                                    <Sparkles className="h-3 w-3 text-amber-500 mr-1" />
                                    <span className="text-xs text-amber-700">{product.ritualTokens} Tokens</span>
                                  </div>
                                  {product.discountPercent && (
                                    <div className="flex items-center mt-1">
                                      <span className="text-xs line-through text-slate-500 mr-1">
                                        ${product.price.toFixed(2)}
                                      </span>
                                      <span className="text-xs text-red-600">-{product.discountPercent}%</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-4">
                                <div className="flex items-center">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-7 w-7 border-orange-200"
                                    onClick={() => removeFromCart(product.id)}
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span className="mx-2 font-medium w-5 text-center">{item.quantity}</span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-7 w-7 border-orange-200"
                                    onClick={() => addToCart(product.id)}
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>

                                <div className="text-right min-w-[80px]">
                                  <div className="font-bold">${(itemPrice * item.quantity).toFixed(2)}</div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="border-t border-orange-100 pt-4 mt-auto">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Subtotal</span>
                          <span className="font-medium">${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Shipping</span>
                          <span className="font-medium">$5.99</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Ritual Tokens Earned</span>
                          <span className="font-medium text-amber-700">{totalRitualTokens} Tokens</span>
                        </div>
                        <div className="border-t border-orange-100 pt-2 mt-2 flex justify-between">
                          <span className="font-bold">Total</span>
                          <span className="font-bold">${(cartTotal + 5.99).toFixed(2)}</span>
                        </div>
                      </div>

                      <Button
                        className="w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600"
                        onClick={handleCheckout}
                      >
                        Proceed to Checkout
                      </Button>

                      <div className="mt-4 flex items-center justify-center text-xs text-slate-500">
                        <ShieldCheck className="h-3 w-3 mr-1" />
                        <span>Secure checkout • Free returns • Satisfaction guaranteed</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                      <ShoppingCart className="h-8 w-8 text-orange-500" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">Your cart is empty</h3>
                    <p className="text-slate-500 text-center mb-6">
                      Add some products to your cart to continue shopping
                    </p>
                    <Button variant="outline" className="border-orange-200" onClick={() => setIsCartOpen(false)}>
                      Continue Shopping
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>

            <Sheet open={showOrderHistory} onOpenChange={setShowOrderHistory}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-slate-700">
                  <Clock className="h-5 w-5" />
                  <span className="sr-only">Order History</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Order History</SheetTitle>
                  <SheetDescription>View your past orders and track current shipments</SheetDescription>
                </SheetHeader>

                <div className="py-4">
                  {orders.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-slate-500">You haven't placed any orders yet</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <div key={order.id} className="border border-orange-100 rounded-lg overflow-hidden">
                          <div className="bg-orange-50 p-4 flex justify-between items-center">
                            <div>
                              <div className="text-sm font-medium text-slate-900">{order.id}</div>
                              <div className="text-xs text-slate-500">
                                Ordered on{" "}
                                {new Date(order.date).toLocaleDateString("en-US", {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </div>
                            </div>
                            <Badge
                              className={cn(
                                "capitalize",
                                order.status === "processing" && "bg-blue-100 text-blue-800 hover:bg-blue-100",
                                order.status === "shipped" && "bg-amber-100 text-amber-800 hover:bg-amber-100",
                                order.status === "delivered" && "bg-green-100 text-green-800 hover:bg-green-100",
                                order.status === "cancelled" && "bg-red-100 text-red-800 hover:bg-red-100",
                              )}
                            >
                              {order.status}
                            </Badge>
                          </div>

                          <div className="p-4 border-b border-orange-100">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex items-center py-2">
                                <img
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  className="w-12 h-12 object-contain bg-orange-50 rounded-md mr-3"
                                />
                                <div className="flex-1">
                                  <div className="text-sm font-medium">{item.name}</div>
                                  <div className="text-xs text-slate-500">Qty: {item.quantity}</div>
                                </div>
                                <div className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                              </div>
                            ))}
                          </div>

                          <div className="p-4">
                            <div className="flex justify-between mb-2">
                              <span className="text-sm text-slate-500">Total</span>
                              <span className="text-sm font-bold">${order.total.toFixed(2)}</span>
                            </div>

                            {order.status !== "delivered" && order.status !== "cancelled" && (
                              <div className="mt-3">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs font-medium">Order Status</span>
                                  <span className="text-xs text-slate-500">{order.estimatedDelivery}</span>
                                </div>
                                <div className="relative pt-1">
                                  <Progress
                                    value={order.status === "processing" ? 25 : order.status === "shipped" ? 75 : 100}
                                    className="h-2 bg-orange-100"
                                    indicatorClassName="bg-gradient-to-r from-amber-500 to-orange-500"
                                  />
                                </div>
                                <div className="flex justify-between mt-1 text-xs text-slate-500">
                                  <span>Processing</span>
                                  <span>Shipped</span>
                                  <span>Delivered</span>
                                </div>
                              </div>
                            )}

                            {order.trackingNumber && (
                              <div className="mt-3 text-xs">
                                <span className="text-slate-500">Tracking Number: </span>
                                <span className="font-medium">{order.trackingNumber}</span>
                              </div>
                            )}

                            <div className="mt-4 flex justify-end">
                              <Button variant="outline" size="sm" className="text-xs border-orange-200">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden px-4 pb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10 w-full bg-white border-orange-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        {/* User profile summary */}
        <div className="mb-8 bg-white rounded-xl border border-orange-100 p-4 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex-1">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg mr-3">
                  {userProfile.name.charAt(0)}
                </div>
                <div>
                  <h2 className="font-bold text-slate-900">{userProfile.name}</h2>
                  <div className="flex items-center text-sm text-slate-500">
                    <span className="mr-2">Level {userProfile.level}</span>
                    <div className="w-24 h-2 bg-orange-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                        style={{ width: `${userProfile.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 md:mt-0 flex items-center">
              <div className="bg-amber-50 rounded-lg p-3 flex items-center mr-4">
                <Sparkles className="h-5 w-5 text-amber-500 mr-2" />
                <div>
                  <div className="text-sm font-medium text-slate-900">{userProfile.ritualTokens}</div>
                  <div className="text-xs text-slate-500">Ritual Tokens</div>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="border-orange-200">
                    View Health Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Your Health Profile</DialogTitle>
                    <DialogDescription>
                      Your personalized Ayurvedic profile used for product recommendations
                    </DialogDescription>
                  </DialogHeader>

                  <div className="py-4">
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-slate-900 mb-2">Dosha Balance</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm">Vata</span>
                            <span className="text-sm font-medium text-blue-600">{userProfile.doshaProfile.vata}%</span>
                          </div>
                          <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500"
                              style={{ width: `${userProfile.doshaProfile.vata}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm">Pitta</span>
                            <span className="text-sm font-medium text-red-600">{userProfile.doshaProfile.pitta}%</span>
                          </div>
                          <div className="w-full h-2 bg-red-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-red-500"
                              style={{ width: `${userProfile.doshaProfile.pitta}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm">Kapha</span>
                            <span className="text-sm font-medium text-green-600">
                              {userProfile.doshaProfile.kapha}%
                            </span>
                          </div>
                          <div className="w-full h-2 bg-green-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500"
                              style={{ width: `${userProfile.doshaProfile.kapha}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-slate-900 mb-2">Health Concerns</h3>
                        <div className="flex flex-wrap gap-2">
                          {userProfile.healthConcerns.map((concern) => (
                            <Badge
                              key={concern}
                              variant="outline"
                              className="bg-orange-50 text-orange-700 border-orange-200"
                            >
                              {concern}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-slate-900 mb-2">Allergies</h3>
                        <div className="flex flex-wrap gap-2">
                          {userProfile.allergies.map((allergy) => (
                            <Badge key={allergy} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                              {allergy}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-slate-900 mb-2">Preferences</h3>
                      <div className="flex flex-wrap gap-2">
                        {userProfile.preferences.map((preference) => (
                          <Badge
                            key={preference}
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-200"
                          >
                            {preference}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-white">
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
              <TabsTrigger value="herbs">Herbs & Supplements</TabsTrigger>
              <TabsTrigger value="oils">Oils & Massage</TabsTrigger>
              <TabsTrigger value="teas">Teas</TabsTrigger>
              <TabsTrigger value="tools">Tools & Accessories</TabsTrigger>
              <TabsTrigger value="skincare">Skincare</TabsTrigger>
            </TabsList>

            {/* Personalized recommendations banner */}
            {activeTab === "recommended" && (
              <div className="mt-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-6 text-white shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold mb-2">Personalized Recommendations</h2>
                    <p className="text-white/90 mb-4 md:mb-0">
                      Based on your Vata-Pitta dominant profile and health concerns, we've curated these products just
                      for you.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex items-center">
                      <ShieldCheck className="h-5 w-5 text-white mr-2" />
                      <div className="text-sm">
                        <div className="font-medium">Safety Checked</div>
                        <div className="text-white/80 text-xs">Allergen-free for you</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Product grid */}
            <TabsContent value={activeTab} className="mt-6">
              {sortedProducts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-orange-500" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">No products found</h3>
                  <p className="text-slate-500 mb-6">Try adjusting your search or filter criteria</p>
                  <Button
                    variant="outline"
                    className="border-orange-200"
                    onClick={() => {
                      setSearchQuery("")
                      setActiveFilters([])
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {sortedProducts.map((product) => (
                    <Card
                      key={product.id}
                      className="bg-white/80 backdrop-blur-sm border-orange-100 overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div
                        className="aspect-square bg-orange-50 flex items-center justify-center relative cursor-pointer"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="object-contain h-48 w-48"
                        />

                        {product.isPersonalized && (
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-none">
                              <Sparkles className="h-3 w-3 mr-1" />
                              For You
                            </Badge>
                          </div>
                        )}

                        {product.discountPercent && (
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-red-500 text-white border-none">{product.discountPercent}% OFF</Badge>
                          </div>
                        )}

                        {product.stock < 10 && (
                          <div className="absolute bottom-2 left-2">
                            <Badge
                              variant="outline"
                              className="bg-white/80 backdrop-blur-sm text-orange-700 border-orange-200"
                            >
                              Only {product.stock} left
                            </Badge>
                          </div>
                        )}
                      </div>

                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle
                            className="text-lg cursor-pointer hover:text-orange-600 transition-colors"
                            onClick={() => setSelectedProduct(product)}
                          >
                            {product.name}
                          </CardTitle>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                            <span className="text-sm font-medium ml-1">{product.rating}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mt-1">
                          {product.dosha.map((dosha) => (
                            <Badge
                              key={dosha}
                              variant="outline"
                              className={cn(
                                "bg-opacity-20 border-opacity-30",
                                dosha === "Vata" && "bg-blue-50 text-blue-700 border-blue-200",
                                dosha === "Pitta" && "bg-red-50 text-red-700 border-red-200",
                                dosha === "Kapha" && "bg-green-50 text-green-700 border-green-200",
                              )}
                            >
                              {dosha}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>

                      <CardContent className="py-2">
                        <p className="text-sm text-slate-600 line-clamp-2">{product.description}</p>

                        <div className="flex items-center mt-3">
                          <Sparkles className="h-4 w-4 text-amber-500 mr-1" />
                          <span className="text-sm font-medium text-amber-700">
                            {product.ritualTokens} Ritual Tokens
                          </span>
                        </div>

                        {product.isPersonalized && (
                          <div className="mt-2 text-xs text-orange-600 flex items-start">
                            <Info className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                            <span>{product.personalizedReason}</span>
                          </div>
                        )}
                      </CardContent>

                      <CardFooter className="flex justify-between items-center pt-2">
                        <div>
                          {product.discountPercent ? (
                            <div>
                              <span className="text-lg font-bold text-red-600">
                                ${(product.price * (1 - product.discountPercent / 100)).toFixed(2)}
                              </span>
                              <span className="text-sm line-through text-slate-500 ml-2">
                                ${product.price.toFixed(2)}
                              </span>
                            </div>
                          ) : (
                            <div className="text-lg font-bold">${product.price.toFixed(2)}</div>
                          )}
                        </div>

                        {cartItems.some((item) => item.id === product.id) ? (
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 border-orange-200"
                              onClick={() => removeFromCart(product.id)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="mx-2 font-medium">
                              {cartItems.find((item) => item.id === product.id)?.quantity || 0}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 border-orange-200"
                              onClick={() => addToCart(product.id)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600"
                            onClick={() => addToCart(product.id)}
                          >
                            Add to Cart
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Product detail dialog */}
        <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
          <DialogContent className="sm:max-w-4xl">
            {selectedProduct && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="bg-orange-50 rounded-lg p-6 flex items-center justify-center">
                    <img
                      src={selectedProduct.image || "/placeholder.svg"}
                      alt={selectedProduct.name}
                      className="object-contain max-h-64"
                    />
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="bg-orange-50 rounded-lg p-3 flex flex-col items-center justify-center text-center">
                      <Leaf className="h-5 w-5 text-green-600 mb-1" />
                      <span className="text-xs font-medium">Natural</span>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-3 flex flex-col items-center justify-center text-center">
                      <Award className="h-5 w-5 text-amber-600 mb-1" />
                      <span className="text-xs font-medium">Certified</span>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-3 flex flex-col items-center justify-center text-center">
                      <Zap className="h-5 w-5 text-blue-600 mb-1" />
                      <span className="text-xs font-medium">Effective</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">{selectedProduct.name}</h2>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                          <span className="text-sm font-medium ml-1">{selectedProduct.rating}</span>
                        </div>
                        <span className="mx-2 text-slate-300">|</span>
                        <span className="text-sm text-slate-500">{selectedProduct.reviews} reviews</span>
                      </div>
                    </div>

                    <div>
                      {selectedProduct.discountPercent ? (
                        <div>
                          <div className="text-2xl font-bold text-red-600">
                            ${(selectedProduct.price * (1 - selectedProduct.discountPercent / 100)).toFixed(2)}
                          </div>
                          <div className="text-sm line-through text-slate-500">${selectedProduct.price.toFixed(2)}</div>
                        </div>
                      ) : (
                        <div className="text-2xl font-bold">${selectedProduct.price.toFixed(2)}</div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {selectedProduct.dosha.map((dosha) => (
                      <Badge
                        key={dosha}
                        variant="outline"
                        className={cn(
                          "bg-opacity-20 border-opacity-30",
                          dosha === "Vata" && "bg-blue-50 text-blue-700 border-blue-200",
                          dosha === "Pitta" && "bg-red-50 text-red-700 border-red-200",
                          dosha === "Kapha" && "bg-green-50 text-green-700 border-green-200",
                        )}
                      >
                        {dosha}
                      </Badge>
                    ))}

                    {selectedProduct.tags?.map((tag) => (
                      <Badge key={tag} variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <p className="mt-4 text-slate-600">{selectedProduct.description}</p>

                  <div className="mt-6">
                    <h3 className="font-medium text-slate-900 mb-2">Benefits</h3>
                    <ul className="space-y-1">
                      {selectedProduct.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mt-1 mr-2" />
                          <span className="text-sm text-slate-600">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {selectedProduct.ingredients && (
                    <div className="mt-4">
                      <h3 className="font-medium text-slate-900 mb-2">Ingredients</h3>
                      <p className="text-sm text-slate-600">{selectedProduct.ingredients.join(", ")}</p>
                    </div>
                  )}

                  {selectedProduct.usage && (
                    <div className="mt-4">
                      <h3 className="font-medium text-slate-900 mb-2">Recommended Usage</h3>
                      <p className="text-sm text-slate-600">{selectedProduct.usage}</p>
                    </div>
                  )}

                  {selectedProduct.safetyInfo && (
                    <div className="mt-4">
                      <h3 className="font-medium text-slate-900 mb-2">Safety Information</h3>
                      <ul className="space-y-1">
                        {selectedProduct.safetyInfo.map((info, index) => (
                          <li key={index} className="flex items-start">
                            <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 mr-2" />
                            <span className="text-sm text-slate-600">{info}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-6 flex items-center">
                    <div className="flex items-center mr-4">
                      <Sparkles className="h-5 w-5 text-amber-500 mr-2" />
                      <div>
                        <div className="text-sm font-medium">{selectedProduct.ritualTokens} Tokens</div>
                        <div className="text-xs text-slate-500">Earn with purchase</div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Package className="h-5 w-5 text-slate-500 mr-2" />
                      <div>
                        <div className="text-sm font-medium">
                          {selectedProduct.stock > 0 ? "In Stock" : "Out of Stock"}
                        </div>
                        <div className="text-xs text-slate-500">Ships in 1-2 business days</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    {cartItems.some((item) => item.id === selectedProduct.id) ? (
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-10 w-10 border-orange-200"
                          onClick={() => removeFromCart(selectedProduct.id)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="mx-4 font-medium text-lg">
                          {cartItems.find((item) => item.id === selectedProduct.id)?.quantity || 0}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-10 w-10 border-orange-200"
                          onClick={() => addToCart(selectedProduct.id)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 flex-1"
                        onClick={() => addToCart(selectedProduct.id)}
                        disabled={selectedProduct.stock <= 0}
                      >
                        {selectedProduct.stock > 0 ? "Add to Cart" : "Out of Stock"}
                      </Button>
                    )}

                    <Button variant="outline" className="border-orange-200">
                      <Heart className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>

                  {selectedProduct.isPersonalized && (
                    <div className="mt-4 bg-orange-50 border border-orange-100 rounded-lg p-3 flex items-start">
                      <Sparkles className="h-4 w-4 text-orange-500 mt-0.5 mr-2" />
                      <div>
                        <div className="text-sm font-medium text-orange-800">Personalized Recommendation</div>
                        <div className="text-xs text-orange-700">{selectedProduct.personalizedReason}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}

function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  const getDoshaBadge = (dosha) => {
    switch (dosha) {
      case "vata":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Wind className="mr-1 h-3 w-3" />
            Vata
          </Badge>
        )
      case "pitta":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <Flame className="mr-1 h-3 w-3" />
            Pitta
          </Badge>
        )
      case "kapha":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Droplets className="mr-1 h-3 w-3" />
            Kapha
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            <Leaf className="mr-1 h-3 w-3" />
            All Doshas
          </Badge>
        )
    }
  }

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative">
        <div className="aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className="object-cover w-full h-full transition-transform hover:scale-105"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white"
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
        </Button>
        {product.sale && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-red-500">Sale</Badge>
          </div>
        )}
        {product.stock <= 5 && (
          <div className="absolute bottom-2 left-2">
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              Low Stock: {product.stock} left
            </Badge>
          </div>
        )}
      </div>
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>
          {getDoshaBadge(product.dosha)}
        </div>
        <CardTitle className="text-base mt-2 line-clamp-1">{product.name}</CardTitle>
        <CardDescription className="line-clamp-2 h-10">{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex items-center gap-1">
          <Tag className="h-4 w-4 text-muted-foreground" />
          <div className="flex gap-1 flex-wrap">
            {product.tags.map((tag) => (
              <span key={tag} className="text-xs text-muted-foreground">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        <div className="w-full">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-amber-500" />
              <span className="text-xs font-medium">{product.ritualTokens} tokens</span>
            </div>
            <div>
              {product.sale ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm line-through text-muted-foreground">${product.price}</span>
                  <span className="text-base font-bold">${product.salePrice}</span>
                </div>
              ) : (
                <span className="text-base font-bold">${product.price}</span>
              )}
            </div>
          </div>
          <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-800">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

