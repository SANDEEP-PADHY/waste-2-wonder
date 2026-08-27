import { Listing, User, CategoryInfo, Review, Notification, MessageThread } from '../types';

export const CURRENT_USER: User = {
  id: 'user_curr_01',
  name: 'Aarav Patel',
  email: 'aarav.patel@greencircuit.in',
  phone: '+91 98250 14829',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  accountType: 'Recycler',
  location: {
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '380015',
    distanceKm: 0
  },
  verificationStatus: 'Verified',
  eprRegistrationNo: 'CPCB/EPR-2024/GJ-8849',
  cpcbCertificate: true,
  rating: 4.9,
  reviewCount: 42,
  completedListings: 88,
  activeListingsCount: 4,
  joinedDate: 'March 2024',
  about: 'CPCB Authorized E-Waste Recycler operating state-of-the-art hydrometallurgical extraction & component recovery unit in Sanand GIDC, Ahmedabad.'
};

export const MOCK_USERS: Record<string, User> = {
  user_seller_01: {
    id: 'user_seller_01',
    name: 'Rajesh Enterprise E-Waste Ltd',
    email: 'contact@rajeshewaste.com',
    phone: '+91 98790 32111',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    accountType: 'Scrap Dealer',
    location: {
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '382445',
      distanceKm: 8.5
    },
    verificationStatus: 'Verified',
    eprRegistrationNo: 'GPCB/EPR/2023/5512',
    cpcbCertificate: true,
    rating: 4.8,
    reviewCount: 127,
    completedListings: 142,
    activeListingsCount: 6,
    joinedDate: 'January 2023',
    about: 'Government certified electronic scrap aggregators specializing in IT enterprise decommissioning, bulk motherboards, and telecommunication scrap.'
  },
  user_seller_02: {
    id: 'user_seller_02',
    name: 'EcoMetals & Circular Tech Vadodara',
    email: 'info@ecometals.in',
    phone: '+91 94260 99882',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    accountType: 'Recycler',
    location: {
      city: 'Vadodara',
      state: 'Gujarat',
      pincode: '390010',
      distanceKm: 98
    },
    verificationStatus: 'Verified',
    eprRegistrationNo: 'CPCB/EPR-2022/GJ-1204',
    cpcbCertificate: true,
    rating: 4.9,
    reviewCount: 89,
    completedListings: 95,
    activeListingsCount: 5,
    joinedDate: 'August 2022',
    about: 'Precious metal recovery from high-grade telecommunication and industrial controller printed circuit boards.'
  },
  user_seller_03: {
    id: 'user_seller_03',
    name: 'Surat Chip & Hardware Refurbishers',
    email: 'deals@suratchip.co.in',
    phone: '+91 98241 77334',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    accountType: 'Repair Shop',
    location: {
      city: 'Surat',
      state: 'Gujarat',
      pincode: '395003',
      distanceKm: 240
    },
    verificationStatus: 'Verified',
    rating: 4.7,
    reviewCount: 64,
    completedListings: 78,
    activeListingsCount: 3,
    joinedDate: 'November 2023',
    about: 'Laptop motherboard rework specialist, GPU component harvesting, and tested salvage electronics.'
  },
  user_seller_04: {
    id: 'user_seller_04',
    name: 'Bharat Telecom Asset Disposal',
    email: 'disposals@bharattelecomscrap.in',
    phone: '+91 98112 34567',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80',
    accountType: 'Business',
    location: {
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400072',
      distanceKm: 490
    },
    verificationStatus: 'Verified',
    eprRegistrationNo: 'MPCB/DISP/2021/9920',
    cpcbCertificate: true,
    rating: 4.9,
    reviewCount: 210,
    completedListings: 340,
    activeListingsCount: 8,
    joinedDate: 'May 2021',
    about: 'Direct enterprise asset disposal partner for telecom towers, server centers, UPS battery arrays, and network switches.'
  }
};

export const MOCK_CATEGORIES: CategoryInfo[] = [
  {
    id: 'cat_pcb',
    name: 'PCBs & Circuit Boards',
    slug: 'pcb-boards',
    icon: 'Cpu',
    count: 48,
    description: 'Motherboards, RAM sticks, green/gold edge boards, server logic cards, telecoms PCBs.',
    subcategories: ['Motherboards', 'Server Boards', 'Telecom PCBs', 'Gold-Bearing Edge Connectors', 'Consumer Electronics PCBs']
  },
  {
    id: 'cat_servers',
    name: 'Servers & Networking',
    slug: 'servers-networking',
    icon: 'Server',
    count: 31,
    description: 'Rackmount servers, blade units, Cisco switches, routers, backplanes, telecom base stations.',
    subcategories: ['1U/2U Rack Servers', 'Network Switches', 'Server PSUs', 'Telecom Base Station Units', 'Storage Arrays']
  },
  {
    id: 'cat_batteries',
    name: 'Batteries & Energy Storage',
    slug: 'batteries-energy',
    icon: 'BatteryCharging',
    count: 24,
    description: 'Lithium-Ion 18650 packs, EV battery modules, UPS Lead-Acid cells, drone LiPo packs.',
    subcategories: ['Li-Ion 18650 Cells', 'UPS Sealed Lead Acid', 'EV Battery Scrap', 'Laptop Battery Packs', 'Solar Inverter Batteries']
  },
  {
    id: 'cat_computers',
    name: 'Laptops & Computers',
    slug: 'laptops-computers',
    icon: 'Laptop',
    count: 62,
    description: 'Corporate laptop lots, non-working desktop towers, all-in-one panels, thin clients.',
    subcategories: ['Corporate Laptop Lots', 'Desktop Motherboard Lots', 'Faulty GPUs / Graphics Cards', 'CPU Processors Scrap', 'SMPS Units']
  },
  {
    id: 'cat_phones',
    name: 'Smartphones & Tablets',
    slug: 'phones-tablets',
    icon: 'Smartphone',
    count: 39,
    description: 'Bulk smartphone scrap, cracked displays, faulty logic boards, flex cables, charger lots.',
    subcategories: ['Cracked Smartphone Lots', 'Logic Boards For Parts', 'Display Scrap (Gold Recovery)', 'Chargers & Accessories Scrap']
  },
  {
    id: 'cat_metals',
    name: 'Cables & Recoverable Metals',
    slug: 'cables-metals',
    icon: 'Layers',
    count: 29,
    description: 'Stripped copper wire lots, aluminum server heatsinks, gold-plated IC pins, brass connectors.',
    subcategories: ['Insulated Copper Wire', 'Stripped Copper Scrap', 'Extruded Aluminum Heatsinks', 'Gold-plated Connector Pins', 'Transformer Cores']
  },
  {
    id: 'cat_industrial',
    name: 'Industrial & Medical Electronics',
    slug: 'industrial-medical',
    icon: 'Activity',
    count: 17,
    description: 'PLC modules, CNC drive boards, medical imaging PCBs, power inverters, test equipment.',
    subcategories: ['PLC & CNC Controller Boards', 'Medical Device Electronics', 'Solar Inverters & Drivers', 'UPS Inverter Boards']
  }
];

export const MOCK_LISTINGS: Listing[] = [
  {
    id: 'list_dell_5490',
    sellerId: 'user_seller_01',
    seller: MOCK_USERS.user_seller_01,
    title: 'Dell Latitude 5490 Motherboard & Component Lot — 12 Units (Salvage)',
    description: 'Bulk lot of 12 original Dell Latitude 5490 laptop motherboards removed during enterprise IT refresh. Intel Core i5 8th Gen onboard. No power or display output on 8 units; 4 units exhibit intermittent reboot issues. Intact circuit tracks, zero physical burning, capacitors and choke coils intact. Ideal for component harvesting, chip-level micro-soldering rework, or precious metal recovery.',
    category: 'PCBs & Circuit Boards',
    subcategory: 'Motherboards',
    images: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80'
    ],
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    condition: 'For Parts',
    quantity: 12,
    unit: 'Units',
    weight: 8.4,
    technicalSpecs: {
      brand: 'Dell',
      model: 'Latitude 5490 (LA-F401P)',
      partNumber: 'CN-0N13FD-70166',
      manufacturingYear: 2019,
      voltagePower: '19.5V DC / 65W',
      capacitySpecs: 'Supports DDR4 SO-DIMM up to 32GB',
      compatibility: 'Dell Latitude 5490 / 5491 Chassis',
      serialNumberAvailable: true,
      dimensions: '240mm x 210mm each',
      weightKg: 8.4
    },
    eWasteDetails: {
      eWasteCategory: 'High Grade IT Motherboards',
      materialType: ['Multi-layer FR4 PCB', 'Gold Flash Pin Connectors', 'Copper Heat Pipes', 'BGA Solder Balls'],
      estimatedWeightKg: 8.4,
      reusableComponents: ['Realtek Audio ALC3246', 'Intel I219-LM Gigabit Controller', 'Type-C Controller TPS65988', 'Choke Inductors', 'MOSFETs 60A'],
      recyclableMaterials: ['Copper (Approx 18% wt)', 'Gold Pins (Approx 0.35g total)', 'Tin/Lead Free Alloy'],
      hazardousMaterial: false,
      hazardousDetails: 'RoHS compliant boards; lead-free SAC305 solder alloy used.',
      rohsCompliant: true,
      batteryIncluded: false,
      dataStoragePresent: false,
      dataWiped: true,
      dataWipingCertificateAvailable: true,
      dismantledStatus: 'Fully Intact',
      workingStatus: 'Non-working / Scrap'
    },
    logistics: {
      pickupAvailable: true,
      shippingAvailable: true,
      pickupAddress: 'Plot 42, Phase 2, Vatva GIDC Industrial Estate',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '382445',
      preferredPickupMethod: 'Direct Warehouse Pickup or BlueDart Surface Freight',
      loadingAssistanceAvailable: true,
      warehouseHours: 'Mon-Sat: 09:30 AM to 06:30 PM'
    },
    listingType: 'Auction',
    startingBid: 3500,
    currentBid: 4200,
    reservePrice: 4000,
    bidIncrement: 100,
    bids: [
      {
        id: 'bid_01',
        listingId: 'list_dell_5490',
        bidderId: 'bidder_anon_84',
        bidderAnonymousName: 'Bidder #842',
        amount: 3600,
        createdAt: '2026-08-27T06:12:00.000Z',
        status: 'Outbid'
      },
      {
        id: 'bid_02',
        listingId: 'list_dell_5490',
        bidderId: 'bidder_anon_19',
        bidderAnonymousName: 'Bidder #191',
        amount: 3900,
        createdAt: '2026-08-27T07:45:00.000Z',
        status: 'Outbid'
      },
      {
        id: 'bid_03',
        listingId: 'list_dell_5490',
        bidderId: 'bidder_anon_63',
        bidderAnonymousName: 'Bidder #634',
        amount: 4200,
        createdAt: '2026-08-27T09:18:00.000Z',
        status: 'Leading'
      }
    ],
    auctionStart: '2026-08-26T10:00:00.000Z',
    auctionEnd: '2026-08-28T18:00:00.000Z', // Live Auction ending soon
    status: 'Active',
    viewCount: 348,
    savesCount: 26,
    featured: true,
    verifiedListing: true,
    createdAt: '2026-08-26T10:00:00.000Z'
  },
  {
    id: 'list_mixed_pcb_18kg',
    sellerId: 'user_seller_02',
    seller: MOCK_USERS.user_seller_02,
    title: 'Grade-A High Yield Industrial PCB Boards — 18.5 KG Lot',
    description: 'Sorted high-grade telecom base station and server backplane PCBs. High concentration of gold edge fingers, tantalum capacitors, and ceramic IC chips. All heavy iron transformers, large capacitors, and zinc heat brackets have been professionally de-soldered. Ready for direct chemical hydrometallurgical refining.',
    category: 'PCBs & Circuit Boards',
    subcategory: 'Telecom PCBs',
    images: [
      'https://images.unsplash.com/photo-1597733336794-12d05021d510?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80'
    ],
    coverImage: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?w=800&auto=format&fit=crop&q=80',
    condition: 'Mixed Scrap Lot',
    quantity: 18.5,
    unit: 'KG',
    weight: 18.5,
    technicalSpecs: {
      brand: 'Ericsson / Huawei Telecom',
      model: 'Baseband BBU & RRU Boards',
      manufacturingYear: 2018,
      dimensions: 'Standard telecom enclosure cards',
      weightKg: 18.5
    },
    eWasteDetails: {
      eWasteCategory: 'High Grade Telecom Grade-A PCB',
      materialType: ['Double-sided Gold Finger PCB', 'Ceramic BGA ICs', 'Tantalum Capacitors', 'Silver traces'],
      estimatedWeightKg: 18.5,
      reusableComponents: ['Gold Finger connectors (Approx 850g total weight)', 'SMD inductors'],
      recyclableMaterials: ['Estimated Gold: 4.8g to 5.6g per lot', 'Silver: 12g', 'Copper: 4.2kg'],
      hazardousMaterial: false,
      rohsCompliant: true,
      batteryIncluded: false,
      dataStoragePresent: false,
      dataWiped: true,
      dismantledStatus: 'Fully Stripped PCB / Shell',
      workingStatus: 'Non-working / Scrap'
    },
    logistics: {
      pickupAvailable: true,
      shippingAvailable: true,
      pickupAddress: 'EcoMetals Yard 3, Makarpura GIDC',
      city: 'Vadodara',
      state: 'Gujarat',
      pincode: '390010',
      preferredPickupMethod: 'Commercial Transport / Local Pickup',
      loadingAssistanceAvailable: true,
      warehouseHours: 'Mon-Fri: 10:00 AM to 05:00 PM'
    },
    listingType: 'Negotiable Offer',
    askingPrice: 14500,
    negotiable: true,
    bids: [],
    status: 'Active',
    viewCount: 512,
    savesCount: 41,
    featured: true,
    verifiedListing: true,
    createdAt: '2026-08-25T14:30:00.000Z'
  },
  {
    id: 'list_rtx_salvage_lot',
    sellerId: 'user_seller_03',
    seller: MOCK_USERS.user_seller_03,
    title: 'NVIDIA GeForce RTX 3060 / 2060 Graphics Card Scrap & Parts — 8 Cards',
    description: '8 assorted non-working dual-fan graphics cards (5x RTX 3060 12GB, 3x RTX 2060 Super). Removed from gaming cafe decommission. Issue: Core short-circuit or missing VRAM chips. Die intact, heat pipes and aluminum heatsink blocks intact with dual 90mm fans. Excellent for micro-soldering repair or extracting GDDR6 memory chips.',
    category: 'Laptops & Computers',
    subcategory: 'Faulty GPUs / Graphics Cards',
    images: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=80'
    ],
    coverImage: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80',
    condition: 'Salvage / Non-Working',
    quantity: 8,
    unit: 'Units',
    weight: 6.8,
    technicalSpecs: {
      brand: 'Zotac / Gigabyte / Asus',
      model: 'GeForce RTX 3060 & 2060 Super',
      voltagePower: '8-Pin PCIe Power',
      compatibility: 'PCI Express 4.0 x16',
      serialNumberAvailable: true,
      weightKg: 6.8
    },
    eWasteDetails: {
      eWasteCategory: 'High Density GPU Scrap',
      materialType: ['Copper Vapor Chambers', 'Aluminum Heatsink Fin-stacks', 'Multi-layer PCIe PCB'],
      estimatedWeightKg: 6.8,
      reusableComponents: ['90mm Axial Fans (14 working)', 'DrMOS Power Stages', 'PWM Controllers (uP9512R)', 'Video Output Ports (HDMI 2.1 / DP 1.4)'],
      recyclableMaterials: ['High Grade Copper Heatpipes (approx 1.8kg)', 'Aluminum (approx 3.2kg)'],
      hazardousMaterial: false,
      rohsCompliant: true,
      batteryIncluded: false,
      dataStoragePresent: false,
      dataWiped: true,
      dismantledStatus: 'Partially Dismantled',
      workingStatus: 'Non-working / Scrap'
    },
    logistics: {
      pickupAvailable: true,
      shippingAvailable: true,
      pickupAddress: 'Shop 104, Nanpura Electronics Market',
      city: 'Surat',
      state: 'Gujarat',
      pincode: '395003',
      preferredPickupMethod: 'Overnight Courier / Store Handover',
      loadingAssistanceAvailable: false,
      warehouseHours: 'All days: 11:00 AM to 08:00 PM'
    },
    listingType: 'Auction',
    startingBid: 8000,
    currentBid: 10400,
    reservePrice: 9500,
    bidIncrement: 200,
    bids: [
      {
        id: 'bid_gpu_01',
        listingId: 'list_rtx_salvage_lot',
        bidderId: 'bidder_anon_09',
        bidderAnonymousName: 'Bidder #092',
        amount: 8500,
        createdAt: '2026-08-27T04:30:00.000Z',
        status: 'Outbid'
      },
      {
        id: 'bid_gpu_02',
        listingId: 'list_rtx_salvage_lot',
        bidderId: 'bidder_anon_77',
        bidderAnonymousName: 'Bidder #771',
        amount: 9800,
        createdAt: '2026-08-27T08:10:00.000Z',
        status: 'Outbid'
      },
      {
        id: 'bid_gpu_03',
        listingId: 'list_rtx_salvage_lot',
        bidderId: 'user_curr_01',
        bidderAnonymousName: 'Aarav Patel (You)',
        amount: 10400,
        createdAt: '2026-08-27T09:40:00.000Z',
        status: 'Leading',
        isUserBid: true
      }
    ],
    auctionStart: '2026-08-26T12:00:00.000Z',
    auctionEnd: '2026-08-27T17:30:00.000Z', // Ending very soon today!
    status: 'Ending Soon',
    viewCount: 890,
    savesCount: 74,
    featured: true,
    verifiedListing: true,
    createdAt: '2026-08-26T12:00:00.000Z'
  },
  {
    id: 'list_cisco_switches_mumbai',
    sellerId: 'user_seller_04',
    seller: MOCK_USERS.user_seller_04,
    title: 'Cisco Catalyst 3850 & 2960-X Enterprise Switches — 15 Units Lot',
    description: 'Enterprise rack decommission lot of 15 Cisco Managed Gigabit PoE+ Switches. Power tested: 11 units pass boot self-test and display console prompt; 4 units have faulty redundant power supply modules. Complete with 19-inch rack mount brackets. All NVRAM configurations and IP configs wiped as per corporate security protocols.',
    category: 'Servers & Networking',
    subcategory: 'Network Switches',
    images: [
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1597733336794-12d05021d510?w=800&auto=format&fit=crop&q=80'
    ],
    coverImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80',
    condition: 'Partially Working',
    quantity: 15,
    unit: 'Units',
    weight: 92.0,
    technicalSpecs: {
      brand: 'Cisco Systems',
      model: 'Catalyst WS-C3850-48P-S / 2960X-48FPS-L',
      voltagePower: '100-240V AC / 715W Redundant PSU',
      capacitySpecs: '48 Port Gigabit PoE+ with 4x 10G SFP+ Uplinks',
      serialNumberAvailable: true,
      dimensions: '1RU 19" Rackmount (44.5 x 44.5 x 4.45 cm)',
      weightKg: 92.0
    },
    eWasteDetails: {
      eWasteCategory: 'Enterprise Networking Hardware',
      materialType: ['Heavy Gauge Galvanized Steel Chassis', 'High Layer Gold-Bearing Networking PCB', 'Copper Wound Toroids'],
      estimatedWeightKg: 92.0,
      reusableComponents: ['Hot-swap Fan Modules (x30)', '715W Platinum Rated PSUs (x11 working)', 'SFP+ Transceiver Sockets', 'Console Ports'],
      recyclableMaterials: ['High Grade Steel: 65kg', 'Copper: 8.5kg', 'High Density Gold-Plated PCB: 16kg'],
      hazardousMaterial: false,
      rohsCompliant: true,
      batteryIncluded: false,
      dataStoragePresent: true,
      dataWiped: true,
      dataWipingCertificateAvailable: true,
      dismantledStatus: 'Fully Intact',
      workingStatus: 'Partially Working'
    },
    logistics: {
      pickupAvailable: true,
      shippingAvailable: true,
      pickupAddress: 'Godown 18, Marol Industrial Area, Andheri East',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400072',
      preferredPickupMethod: 'Commercial 3-Ton Truck / Buyer Arrangement',
      loadingAssistanceAvailable: true,
      warehouseHours: 'Mon-Fri: 09:00 AM to 05:30 PM'
    },
    listingType: 'Auction',
    startingBid: 28000,
    currentBid: 34500,
    reservePrice: 32000,
    bidIncrement: 500,
    bids: [
      {
        id: 'bid_cisco_01',
        listingId: 'list_cisco_switches_mumbai',
        bidderId: 'bidder_anon_50',
        bidderAnonymousName: 'Bidder #504',
        amount: 29000,
        createdAt: '2026-08-25T11:20:00.000Z',
        status: 'Outbid'
      },
      {
        id: 'bid_cisco_02',
        listingId: 'list_cisco_switches_mumbai',
        bidderId: 'bidder_anon_32',
        bidderAnonymousName: 'Bidder #328',
        amount: 32500,
        createdAt: '2026-08-26T15:10:00.000Z',
        status: 'Outbid'
      },
      {
        id: 'bid_cisco_03',
        listingId: 'list_cisco_switches_mumbai',
        bidderId: 'bidder_anon_11',
        bidderAnonymousName: 'Bidder #119',
        amount: 34500,
        createdAt: '2026-08-27T08:05:00.000Z',
        status: 'Leading'
      }
    ],
    auctionStart: '2026-08-25T09:00:00.000Z',
    auctionEnd: '2026-08-29T19:00:00.000Z',
    status: 'Active',
    viewCount: 420,
    savesCount: 38,
    featured: false,
    verifiedListing: true,
    createdAt: '2026-08-25T09:00:00.000Z'
  },
  {
    id: 'list_telecom_lithium_batteries',
    sellerId: 'user_seller_04',
    seller: MOCK_USERS.user_seller_04,
    title: 'Telecom Tower 48V 100Ah LiFePO4 Lithium Battery Packs — 6 Units (Scrap / Cell Harvest)',
    description: 'Decommissioned 48V 100Ah Lithium Iron Phosphate (LiFePO4) rack-mounted battery modules. Cell voltage checked: 4 units maintain 3.2V per cell (BMS communication lock issue); 2 units have degraded capacity. Massive recoverable prismatic grade-A cells, solid copper busbars, and heavy aluminum enclosure casing.',
    category: 'Batteries & Energy Storage',
    subcategory: 'EV Battery Scrap',
    images: [
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80'
    ],
    coverImage: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&auto=format&fit=crop&q=80',
    condition: 'For Parts',
    quantity: 6,
    unit: 'Units',
    weight: 270.0,
    technicalSpecs: {
      brand: 'Exide / Coslight Telecom',
      model: '48V 100Ah 16S LiFePO4 Module',
      voltagePower: 'Nominal 51.2V DC / 5120Wh each',
      serialNumberAvailable: true,
      dimensions: '442 x 480 x 177 mm (4U each)',
      weightKg: 270.0
    },
    eWasteDetails: {
      eWasteCategory: 'Hazardous Energy Storage Scrap',
      materialType: ['Lithium Iron Phosphate Prismatic Cells', 'Pure Copper Interconnect Busbars', 'Aluminum Heatsink Enclosure'],
      estimatedWeightKg: 270.0,
      reusableComponents: ['Active Cell Balancing BMS 100A', 'High Current DC Breakers 125A', 'Solid Copper Busbars'],
      recyclableMaterials: ['Lithium / Phosphate Cathode Recovery', 'Copper: 14kg', 'High Purity Aluminum: 45kg'],
      hazardousMaterial: true,
      hazardousDetails: 'Hazardous Class 9 Lithium Batteries. Must be transported as per central pollution board battery waste management rules.',
      rohsCompliant: true,
      batteryIncluded: true,
      batteryType: 'LiFePO4 Lithium Iron Phosphate',
      dataStoragePresent: false,
      dataWiped: true,
      dismantledStatus: 'Fully Intact',
      workingStatus: 'Partially Working'
    },
    logistics: {
      pickupAvailable: true,
      shippingAvailable: false,
      pickupAddress: 'Yard 4B, Navi Mumbai Heavy Industrial Zone, Turbhe',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400705',
      preferredPickupMethod: 'Direct Certified Battery Recycler Truck with CPCB Manifest',
      loadingAssistanceAvailable: true,
      warehouseHours: 'Mon-Sat: 08:30 AM to 05:00 PM'
    },
    listingType: 'Negotiable Offer',
    askingPrice: 52000,
    negotiable: true,
    bids: [],
    status: 'Active',
    viewCount: 680,
    savesCount: 59,
    featured: true,
    verifiedListing: true,
    createdAt: '2026-08-24T16:00:00.000Z'
  },
  {
    id: 'list_stripped_copper_cables',
    sellerId: 'user_seller_01',
    seller: MOCK_USERS.user_seller_01,
    title: 'High Purity Telecom & Server Power Cable Scrap (99.9% Cu) — 85 KG',
    description: 'Clean, stripped bright bare copper wire coils recovered from data center power distribution and industrial heavy bus installations. 0% PVC insulation remaining, no oil residue, 100% pure electrolytic copper grade. Ready for direct melting, foundry casting, or copper rod drawing.',
    category: 'Cables & Recoverable Metals',
    subcategory: 'Stripped Copper Scrap',
    images: [
      'https://images.unsplash.com/photo-1597733336794-12d05021d510?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80'
    ],
    coverImage: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?w=800&auto=format&fit=crop&q=80',
    condition: 'Mixed Scrap Lot',
    quantity: 85.0,
    unit: 'KG',
    weight: 85.0,
    technicalSpecs: {
      brand: 'Polycab / Finolex Industrial',
      model: 'Stripped 16mm² to 35mm² Heavy Conductor',
      weightKg: 85.0
    },
    eWasteDetails: {
      eWasteCategory: 'Pure Recovered Metal Scrap',
      materialType: ['Bare Bright Copper (Birch/Cliff grade)', '99.9% Electrolytic Grade'],
      estimatedWeightKg: 85.0,
      reusableComponents: [],
      recyclableMaterials: ['100% Recyclable Copper (85 KG)'],
      hazardousMaterial: false,
      rohsCompliant: true,
      batteryIncluded: false,
      dataStoragePresent: false,
      dataWiped: true,
      dismantledStatus: 'Fully Stripped PCB / Shell',
      workingStatus: 'Non-working / Scrap'
    },
    logistics: {
      pickupAvailable: true,
      shippingAvailable: true,
      pickupAddress: 'Plot 42, Vatva GIDC',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '382445',
      preferredPickupMethod: 'Buyer Vehicle / Transport',
      loadingAssistanceAvailable: true,
      warehouseHours: 'Mon-Sat: 09:30 AM to 06:30 PM'
    },
    listingType: 'Auction',
    startingBid: 58000,
    currentBid: 63500,
    reservePrice: 62000,
    bidIncrement: 500,
    bids: [
      {
        id: 'bid_copper_01',
        listingId: 'list_stripped_copper_cables',
        bidderId: 'bidder_anon_90',
        bidderAnonymousName: 'Bidder #901',
        amount: 60000,
        createdAt: '2026-08-26T14:00:00.000Z',
        status: 'Outbid'
      },
      {
        id: 'bid_copper_02',
        listingId: 'list_stripped_copper_cables',
        bidderId: 'bidder_anon_44',
        bidderAnonymousName: 'Bidder #449',
        amount: 63500,
        createdAt: '2026-08-27T08:30:00.000Z',
        status: 'Leading'
      }
    ],
    auctionStart: '2026-08-26T10:00:00.000Z',
    auctionEnd: '2026-08-28T14:00:00.000Z',
    status: 'Active',
    viewCount: 390,
    savesCount: 31,
    featured: false,
    verifiedListing: true,
    createdAt: '2026-08-26T10:00:00.000Z'
  },
  {
    id: 'list_siemens_plc_salvage',
    sellerId: 'user_seller_02',
    seller: MOCK_USERS.user_seller_02,
    title: 'Siemens SIMATIC S7-1200 / S7-300 PLC Modules Lot — 9 Units (For Spares)',
    description: 'Recovered from automotive plant control cabinet upgrades. Includes 4x CPU 1214C DC/DC/DC, 3x Digital Input/Output SM1223 expansion modules, and 2x S7-300 communication processors. 5 units power on with green RUN light; 4 units show SF (System Fault) light. Relays, optical isolators, and screw terminal blocks in mint physical condition.',
    category: 'Industrial & Medical Electronics',
    subcategory: 'PLC & CNC Controller Boards',
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=80'
    ],
    coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    condition: 'Partially Working',
    quantity: 9,
    unit: 'Units',
    weight: 7.2,
    technicalSpecs: {
      brand: 'Siemens Industrial Automation',
      model: 'SIMATIC S7-1200 / S7-300 Series',
      voltagePower: '24V DC Industrial Bus',
      compatibility: 'TIA Portal / STEP 7 Automation Systems',
      serialNumberAvailable: true,
      weightKg: 7.2
    },
    eWasteDetails: {
      eWasteCategory: 'High Grade Industrial Electronics',
      materialType: ['Conformal Coated Multi-layer Industrial PCB', 'Omron Miniature Relays', 'Optocouplers'],
      estimatedWeightKg: 7.2,
      reusableComponents: ['High Speed Digital Isolators', 'Screw Terminal Blocks (Removable)', '24V DC Miniature Switching Regulators'],
      recyclableMaterials: ['Gold Plated Backplane Connectors', 'Copper (approx 1.2kg)'],
      hazardousMaterial: false,
      rohsCompliant: true,
      batteryIncluded: false,
      dataStoragePresent: true,
      dataWiped: true,
      dismantledStatus: 'Fully Intact',
      workingStatus: 'Partially Working'
    },
    logistics: {
      pickupAvailable: true,
      shippingAvailable: true,
      pickupAddress: 'EcoMetals Yard 3, Makarpura GIDC',
      city: 'Vadodara',
      state: 'Gujarat',
      pincode: '390010',
      preferredPickupMethod: 'Speed Post / Courier / Yard Visit',
      loadingAssistanceAvailable: false,
      warehouseHours: 'Mon-Fri: 10:00 AM to 05:00 PM'
    },
    listingType: 'Auction',
    startingBid: 12000,
    currentBid: 16800,
    reservePrice: 15000,
    bidIncrement: 300,
    bids: [
      {
        id: 'bid_plc_01',
        listingId: 'list_siemens_plc_salvage',
        bidderId: 'bidder_anon_88',
        bidderAnonymousName: 'Bidder #882',
        amount: 13500,
        createdAt: '2026-08-26T18:00:00.000Z',
        status: 'Outbid'
      },
      {
        id: 'bid_plc_02',
        listingId: 'list_siemens_plc_salvage',
        bidderId: 'bidder_anon_14',
        bidderAnonymousName: 'Bidder #140',
        amount: 16800,
        createdAt: '2026-08-27T07:15:00.000Z',
        status: 'Leading'
      }
    ],
    auctionStart: '2026-08-26T15:00:00.000Z',
    auctionEnd: '2026-08-29T12:00:00.000Z',
    status: 'Active',
    viewCount: 298,
    savesCount: 22,
    featured: false,
    verifiedListing: true,
    createdAt: '2026-08-26T15:00:00.000Z'
  },
  {
    id: 'list_broken_smartphones_50pcs',
    sellerId: 'user_seller_03',
    seller: MOCK_USERS.user_seller_03,
    title: 'Smartphones Lot for Scrap & Harvest (Samsung / Redmi / Realme) — 50 Pieces',
    description: 'Bulk lot of 50 defective smartphones collected from repair shop trade-ins. Mixed conditions: cracked AMOLED screens, liquid damaged motherboards, locked units for parts only. All batteries have been removed and stored safely in fire-retardant enclosures. Ideal for IC desoldering, camera module harvesting, and high-purity gold PCB recovery.',
    category: 'Smartphones & Tablets',
    subcategory: 'Cracked Smartphone Lots',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&auto=format&fit=crop&q=80'
    ],
    coverImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
    condition: 'Salvage / Non-Working',
    quantity: 50,
    unit: 'Units',
    weight: 9.5,
    technicalSpecs: {
      brand: 'Mixed (Samsung, Xiaomi, Realme, Vivo)',
      model: 'Assorted 2020-2023 Android Models',
      weightKg: 9.5
    },
    eWasteDetails: {
      eWasteCategory: 'High Density Mobile Electronics',
      materialType: ['Ultra-dense Multi-layer Gold Substrate Motherboards', 'Glass AMOLED scrap', 'Magnesium Mid-frames'],
      estimatedWeightKg: 9.5,
      reusableComponents: ['Rear Triple/Quad Camera Modules', 'Vibration Motors', 'Earpiece speakers & USB Type-C daughter boards'],
      recyclableMaterials: ['Gold (approx 1.2g to 1.6g total)', 'Copper: 1.8kg', 'Magnesium frames: 3.5kg'],
      hazardousMaterial: false,
      rohsCompliant: true,
      batteryIncluded: false, // Batteries removed for safety
      dataStoragePresent: true,
      dataWiped: false,
      dismantledStatus: 'Partially Dismantled',
      workingStatus: 'Non-working / Scrap'
    },
    logistics: {
      pickupAvailable: true,
      shippingAvailable: true,
      pickupAddress: 'Shop 104, Nanpura Electronics Market',
      city: 'Surat',
      state: 'Gujarat',
      pincode: '395003',
      preferredPickupMethod: 'Courier or Hand Delivery',
      loadingAssistanceAvailable: false,
      warehouseHours: 'All days: 11:00 AM to 08:00 PM'
    },
    listingType: 'Negotiable Offer',
    askingPrice: 19500,
    negotiable: true,
    bids: [],
    status: 'Active',
    viewCount: 760,
    savesCount: 52,
    featured: false,
    verifiedListing: true,
    createdAt: '2026-08-25T17:00:00.000Z'
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev_01',
    listingId: 'list_dell_5490',
    reviewerId: 'rev_user_1',
    reviewerName: 'Vikas Sharma (GreenEarth Recyclers)',
    reviewerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    revieweeId: 'user_seller_01',
    rating: 5,
    comment: 'Exceptional transparency. Motherboard ICs were exactly as described with zero stripped tracks. Prompt warehouse loading in Vatva GIDC.',
    transactionType: 'Auction Purchase',
    createdAt: '2026-08-20T11:30:00.000Z'
  },
  {
    id: 'rev_02',
    listingId: 'list_cisco_switches_mumbai',
    reviewerId: 'rev_user_2',
    reviewerName: 'Pooja Nair (TechRefurb Pune)',
    reviewerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    revieweeId: 'user_seller_04',
    rating: 5,
    comment: 'Corporate asset disposal documentation and EPR compliance paperwork provided on the spot. Highly professional enterprise seller.',
    transactionType: 'Bulk Component Supply',
    createdAt: '2026-08-18T14:15:00.000Z'
  },
  {
    id: 'rev_03',
    listingId: 'list_mixed_pcb_18kg',
    reviewerId: 'rev_user_3',
    reviewerName: 'Karan Mehra (Precious Refineries)',
    reviewerAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop&q=80',
    revieweeId: 'user_seller_02',
    rating: 4.8,
    comment: 'Yield on gold-edge fingers matched the estimated spec sheet. Clean desoldering work. Recommended partner for scrap lots.',
    transactionType: 'Negotiated Scrap Lot',
    createdAt: '2026-08-12T09:40:00.000Z'
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif_01',
    userId: 'user_curr_01',
    title: 'You are Leading the Auction!',
    message: 'Your bid of ₹10,400 on NVIDIA RTX Salvage Lot is currently the highest bid.',
    type: 'new_bid',
    listingId: 'list_rtx_salvage_lot',
    read: false,
    createdAt: '2026-08-27T09:40:00.000Z'
  },
  {
    id: 'notif_02',
    userId: 'user_curr_01',
    title: 'Auction Ending in 4 Hours',
    message: 'NVIDIA RTX Graphics Card Scrap Auction will close today at 05:30 PM.',
    type: 'auction_ending',
    listingId: 'list_rtx_salvage_lot',
    read: false,
    createdAt: '2026-08-27T09:00:00.000Z'
  },
  {
    id: 'notif_03',
    userId: 'user_curr_01',
    title: 'New Offer Received on Your Listing',
    message: 'Buyer #491 submitted a negotiable offer of ₹13,800 on your Telecom Server PCBs.',
    type: 'offer_received',
    listingId: 'list_mixed_pcb_18kg',
    read: true,
    createdAt: '2026-08-26T16:20:00.000Z'
  },
  {
    id: 'notif_04',
    userId: 'user_curr_01',
    title: 'Outbid Alert',
    message: 'Another recycler placed a higher bid of ₹4,200 on Dell Latitude 5490 Motherboard Lot.',
    type: 'outbid',
    listingId: 'list_dell_5490',
    read: true,
    createdAt: '2026-08-27T09:18:00.000Z'
  }
];

export const MOCK_THREADS: MessageThread[] = [
  {
    id: 'thread_01',
    listingId: 'list_dell_5490',
    listingTitle: 'Dell Latitude 5490 Motherboard Lot — 12 Units',
    listingImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&auto=format&fit=crop&q=80',
    listingPriceOrBid: '₹4,200 (Highest Bid)',
    otherUser: MOCK_USERS.user_seller_01,
    lastMessage: 'Yes, all 12 boards have RAM slots intact with no broken solder pads.',
    lastMessageTime: '10:15 AM',
    unreadCount: 1,
    messages: [
      {
        id: 'msg_01',
        threadId: 'thread_01',
        listingId: 'list_dell_5490',
        senderId: 'user_curr_01',
        senderName: 'Aarav Patel',
        receiverId: 'user_seller_01',
        receiverName: 'Rajesh Enterprise',
        message: 'Hello Rajesh, are the DDR4 RAM slots physically intact without cracked solder joints on these 12 units?',
        createdAt: '2026-08-27T04:30:00.000Z',
        read: true
      },
      {
        id: 'msg_02',
        threadId: 'thread_01',
        listingId: 'list_dell_5490',
        senderId: 'user_seller_01',
        senderName: 'Rajesh Enterprise',
        receiverId: 'user_curr_01',
        receiverName: 'Aarav Patel',
        message: 'Yes, all 12 boards have RAM slots intact with no broken solder pads. You can inspect them at our Vatva warehouse prior to final auction settlement.',
        createdAt: '2026-08-27T04:45:00.000Z',
        read: false
      }
    ]
  },
  {
    id: 'thread_02',
    listingId: 'list_telecom_lithium_batteries',
    listingTitle: 'Telecom Tower 48V 100Ah LiFePO4 Battery Packs',
    listingImage: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=200&auto=format&fit=crop&q=80',
    listingPriceOrBid: '₹52,000 (Asking)',
    otherUser: MOCK_USERS.user_seller_04,
    lastMessage: 'Will you consider ₹48,000 if we arrange direct forklift loading this Friday?',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    messages: [
      {
        id: 'msg_03',
        threadId: 'thread_02',
        listingId: 'list_telecom_lithium_batteries',
        senderId: 'user_curr_01',
        senderName: 'Aarav Patel',
        receiverId: 'user_seller_04',
        receiverName: 'Bharat Telecom Disposal',
        message: 'Hi, we have CPCB battery transport authorization for Gujarat & Maharashtra. Will you consider ₹48,000 if we arrange direct forklift loading this Friday?',
        offerAmount: 48000,
        createdAt: '2026-08-26T12:10:00.000Z',
        read: true
      },
      {
        id: 'msg_04',
        threadId: 'thread_02',
        listingId: 'list_telecom_lithium_batteries',
        senderId: 'user_seller_04',
        senderName: 'Bharat Telecom Disposal',
        receiverId: 'user_curr_01',
        receiverName: 'Aarav Patel',
        message: 'We can accept ₹49,500 with immediate CPCB manifest signoff. Let us know if you want to lock this lot.',
        createdAt: '2026-08-26T13:00:00.000Z',
        read: true
      }
    ]
  }
];

export const INDIAN_CITIES = [
  'All India',
  'Ahmedabad, Gujarat',
  'Vadodara, Gujarat',
  'Surat, Gujarat',
  'Rajkot, Gujarat',
  'Mumbai, Maharashtra',
  'Pune, Maharashtra',
  'Bengaluru, Karnataka',
  'Delhi NCR',
  'Chennai, Tamil Nadu',
  'Hyderabad, Telangana',
  'Kolkata, West Bengal',
  'Jaipur, Rajasthan',
  'Indore, Madhya Pradesh'
];

export const PLATFORM_STATS = {
  tonsDiverted: '1,420+',
  co2AvoidedTons: '3,850',
  preciousMetalsGrams: '14.2 KG',
  valueRecoveredInr: '₹8.4 Cr',
  registeredRecyclers: '640+',
  activeLiveAuctions: '184',
  completedDealsToday: '28'
};
