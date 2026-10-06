from typing import List, Dict

MOCK_DELIVERIES: List[Dict] = [
    {
        "id": "del-01-sf-982104",
        "trackingNumber": "TRK-982104-SF",
        "recipientName": "Eleanor Vance",
        "recipientPhone": "+1 (555) 234-8901",
        "address": "742 Evergreen Terrace, San Francisco, CA 94107",
        "status": "in_transit",
        "priority": "urgent",
        "driverName": "Marcus Ramirez",
        "driverPhone": "+1 (555) 887-1234",
        "scheduledTimeWindow": "09:00 AM - 11:30 AM",
        "timeline": [
            {
                "timestamp": "08:15 AM",
                "status": "Sorted",
                "notes": "Parcel scanned at SFO Logistics Hub",
                "location": "SF Hub Station #4"
            },
            {
                "timestamp": "08:45 AM",
                "status": "Loaded",
                "notes": "Loaded onto Van #402 (Driver: Marcus Ramirez)",
                "location": "SFO Bay Hub"
            },
            {
                "timestamp": "09:10 AM",
                "status": "In Transit",
                "notes": "Driver en route, 4 stops away",
                "location": "Market St & 4th"
            }
        ],
        "createdAt": "2026-10-05T08:15:00Z",
        "updatedAt": "2026-10-05T09:10:00Z"
    },
    {
        "id": "del-02-la-615409",
        "trackingNumber": "TRK-615409-LA",
        "recipientName": "David Sterling",
        "recipientPhone": "+1 (555) 345-6789",
        "address": "1200 Grand Ave, Suite 300, Los Angeles, CA 90015",
        "status": "in_transit",
        "priority": "express",
        "driverName": "Sarah Chen",
        "driverPhone": "+1 (555) 901-4567",
        "scheduledTimeWindow": "10:00 AM - 12:00 PM",
        "timeline": [
            {
                "timestamp": "07:30 AM",
                "status": "Sorted",
                "notes": "Arrival scan at Downtown Hub",
                "location": "DTLA Depot"
            },
            {
                "timestamp": "08:15 AM",
                "status": "Loaded",
                "notes": "Dispatched with Driver Sarah Chen",
                "location": "LA Bay 12"
            },
            {
                "timestamp": "09:50 AM",
                "status": "In Transit",
                "notes": "Arrived in delivery neighborhood",
                "location": "Grand Ave corridor"
            }
        ],
        "createdAt": "2026-10-05T07:30:00Z",
        "updatedAt": "2026-10-05T09:50:00Z"
    },
    {
        "id": "del-03-ny-334912",
        "trackingNumber": "TRK-334912-NY",
        "recipientName": "Amina Al-Mansoor",
        "recipientPhone": "+1 (555) 456-7890",
        "address": "350 5th Avenue, Fl 24, New York, NY 10118",
        "status": "in_transit",
        "priority": "urgent",
        "driverName": "Darnell Washington",
        "driverPhone": "+1 (555) 789-0123",
        "scheduledTimeWindow": "11:00 AM - 01:00 PM",
        "timeline": [
            {
                "timestamp": "08:00 AM",
                "status": "Manifest Created",
                "notes": "Priority courier dispatch authorized",
                "location": "Midtown NY Hub"
            },
            {
                "timestamp": "09:30 AM",
                "status": "In Transit",
                "notes": "Courier on bicycle route approaching building",
                "location": "34th & Broadway"
            }
        ],
        "createdAt": "2026-10-05T08:00:00Z",
        "updatedAt": "2026-10-05T09:30:00Z"
    },
    {
        "id": "del-04-at-771203",
        "trackingNumber": "TRK-771203-AT",
        "recipientName": "Robert Kowalski",
        "recipientPhone": "+1 (555) 567-8901",
        "address": "88 Peachtree St NE, Atlanta, GA 30303",
        "status": "in_transit",
        "priority": "standard",
        "driverName": "Jessica Taylor",
        "driverPhone": "+1 (555) 678-9012",
        "scheduledTimeWindow": "11:30 AM - 02:00 PM",
        "timeline": [
            {
                "timestamp": "08:45 AM",
                "status": "Loaded",
                "notes": "Van route assigned",
                "location": "Atlanta Hub"
            },
            {
                "timestamp": "10:15 AM",
                "status": "In Transit",
                "notes": "Departed regional depot",
                "location": "Peachtree Corridor"
            }
        ],
        "createdAt": "2026-10-05T08:45:00Z",
        "updatedAt": "2026-10-05T10:15:00Z"
    },
    {
        "id": "del-05-se-991204",
        "trackingNumber": "TRK-991204-SE",
        "recipientName": "Hannah Abbott",
        "recipientPhone": "+1 (555) 890-1234",
        "address": "1501 4th Ave, Seattle, WA 98101",
        "status": "in_transit",
        "priority": "express",
        "driverName": "Chloe Bennett",
        "driverPhone": "+1 (555) 321-9876",
        "scheduledTimeWindow": "12:00 PM - 02:30 PM",
        "timeline": [
            {
                "timestamp": "09:00 AM",
                "status": "Loaded",
                "notes": "Loaded into EV Delivery Van #7",
                "location": "Seattle West Terminal"
            },
            {
                "timestamp": "10:45 AM",
                "status": "In Transit",
                "notes": "Approaching Downtown grid",
                "location": "4th Ave & Pike"
            }
        ],
        "createdAt": "2026-10-05T09:00:00Z",
        "updatedAt": "2026-10-05T10:45:00Z"
    },
    {
        "id": "del-06-ch-554102",
        "trackingNumber": "TRK-554102-CH",
        "recipientName": "Samuel Vance",
        "recipientPhone": "+1 (555) 912-3456",
        "address": "100 N Riverside Plaza, Chicago, IL 60606",
        "status": "in_transit",
        "priority": "standard",
        "driverName": "Mateo Lopez",
        "driverPhone": "+1 (555) 432-5678",
        "scheduledTimeWindow": "01:00 PM - 03:30 PM",
        "timeline": [
            {
                "timestamp": "09:30 AM",
                "status": "Sorted",
                "notes": "Barcode scanned and verified",
                "location": "Chicago Central Hub"
            },
            {
                "timestamp": "11:00 AM",
                "status": "In Transit",
                "notes": "Driver en route",
                "location": "West Loop North"
            }
        ],
        "createdAt": "2026-10-05T09:30:00Z",
        "updatedAt": "2026-10-05T11:00:00Z"
    },
    {
        "id": "del-07-ch-440281",
        "trackingNumber": "TRK-440281-CH",
        "recipientName": "Elena Rostova",
        "recipientPhone": "+1 (555) 678-1234",
        "address": "233 S Wacker Dr, Chicago, IL 60606",
        "status": "delivered",
        "priority": "standard",
        "driverName": "Mateo Lopez",
        "driverPhone": "+1 (555) 432-5678",
        "scheduledTimeWindow": "08:30 AM - 10:30 AM",
        "timeline": [
            {
                "timestamp": "07:45 AM",
                "status": "Out for Delivery",
                "notes": "Driver Mateo Lopez en route",
                "location": "Chicago West Loop Hub"
            },
            {
                "timestamp": "09:22 AM",
                "status": "Delivered",
                "notes": "Signed by reception desk (Building Security: Frank R.)",
                "location": "Front Desk Reception"
            }
        ],
        "createdAt": "2026-10-05T07:45:00Z",
        "updatedAt": "2026-10-05T09:22:00Z"
    },
    {
        "id": "del-08-se-892147",
        "trackingNumber": "TRK-892147-SE",
        "recipientName": "Michael Chang",
        "recipientPhone": "+1 (555) 789-2345",
        "address": "400 Pine Street, Seattle, WA 98101",
        "status": "delivered",
        "priority": "express",
        "driverName": "Chloe Bennett",
        "driverPhone": "+1 (555) 321-9876",
        "scheduledTimeWindow": "09:00 AM - 11:00 AM",
        "timeline": [
            {
                "timestamp": "08:10 AM",
                "status": "Out for Delivery",
                "notes": "Dispatched via Electric Van #14",
                "location": "Seattle North Depot"
            },
            {
                "timestamp": "10:15 AM",
                "status": "Delivered",
                "notes": "Placed securely in package locker #14",
                "location": "Resident Package Room"
            }
        ],
        "createdAt": "2026-10-05T08:10:00Z",
        "updatedAt": "2026-10-05T10:15:00Z"
    },
    {
        "id": "del-09-au-109283",
        "trackingNumber": "TRK-109283-AU",
        "recipientName": "Sophia Morales",
        "recipientPhone": "+1 (555) 890-3456",
        "address": "111 Congress Ave, Austin, TX 78701",
        "status": "delivered",
        "priority": "standard",
        "driverName": "Liam Kelly",
        "driverPhone": "+1 (555) 654-3210",
        "scheduledTimeWindow": "09:30 AM - 11:30 AM",
        "timeline": [
            {
                "timestamp": "08:20 AM",
                "status": "Out for Delivery",
                "notes": "Driver on route",
                "location": "Austin South Hub"
            },
            {
                "timestamp": "10:48 AM",
                "status": "Delivered",
                "notes": "Handed directly to recipient with signature verified",
                "location": "Front Door"
            }
        ],
        "createdAt": "2026-10-05T08:20:00Z",
        "updatedAt": "2026-10-05T10:48:00Z"
    },
    {
        "id": "del-10-de-552910",
        "trackingNumber": "TRK-552910-DE",
        "recipientName": "Brian O'Connor",
        "recipientPhone": "+1 (555) 901-4567",
        "address": "1701 Wynkoop St, Denver, CO 80202",
        "status": "delivered",
        "priority": "standard",
        "driverName": "Avery Jenkins",
        "driverPhone": "+1 (555) 543-2109",
        "scheduledTimeWindow": "10:00 AM - 12:00 PM",
        "timeline": [
            {
                "timestamp": "08:30 AM",
                "status": "Out for Delivery",
                "notes": "Loaded for downtown route",
                "location": "Denver Depot"
            },
            {
                "timestamp": "11:05 AM",
                "status": "Delivered",
                "notes": "Left on front porch per delivery instructions",
                "location": "Porch"
            }
        ],
        "createdAt": "2026-10-05T08:30:00Z",
        "updatedAt": "2026-10-05T11:05:00Z"
    },
    {
        "id": "del-11-ny-881902",
        "trackingNumber": "TRK-881902-NY",
        "recipientName": "Claire Beauchamp",
        "recipientPhone": "+1 (555) 234-7890",
        "address": "10 Columbus Circle, New York, NY 10019",
        "status": "delivered",
        "priority": "urgent",
        "driverName": "Darnell Washington",
        "driverPhone": "+1 (555) 789-0123",
        "scheduledTimeWindow": "10:30 AM - 12:30 PM",
        "timeline": [
            {
                "timestamp": "09:00 AM",
                "status": "Out for Delivery",
                "notes": "Courier assigned",
                "location": "Central Park South Depot"
            },
            {
                "timestamp": "11:42 AM",
                "status": "Delivered",
                "notes": "Received by Concierge",
                "location": "Lobby Concierge"
            }
        ],
        "createdAt": "2026-10-05T09:00:00Z",
        "updatedAt": "2026-10-05T11:42:00Z"
    },
    {
        "id": "del-12-sf-772891",
        "trackingNumber": "TRK-772891-SF",
        "recipientName": "Jordan Mitchell",
        "recipientPhone": "+1 (555) 345-8901",
        "address": "500 Howard St, San Francisco, CA 94105",
        "status": "delivered",
        "priority": "express",
        "driverName": "Marcus Ramirez",
        "driverPhone": "+1 (555) 887-1234",
        "scheduledTimeWindow": "11:00 AM - 01:00 PM",
        "timeline": [
            {
                "timestamp": "09:15 AM",
                "status": "Out for Delivery",
                "notes": "Loaded onto Route 12",
                "location": "SF South Bay Depot"
            },
            {
                "timestamp": "12:10 PM",
                "status": "Delivered",
                "notes": "Delivered to suite reception desk",
                "location": "Suite 400"
            }
        ],
        "createdAt": "2026-10-05T09:15:00Z",
        "updatedAt": "2026-10-05T12:10:00Z"
    },
    {
        "id": "del-13-bo-901844",
        "trackingNumber": "TRK-901844-BO",
        "recipientName": "Lucas Moreau",
        "recipientPhone": "+1 (555) 012-3456",
        "address": "100 High Street, Boston, MA 02110",
        "status": "failed",
        "priority": "urgent",
        "driverName": "Tanya Volkova",
        "driverPhone": "+1 (555) 432-1098",
        "scheduledTimeWindow": "09:00 AM - 11:00 AM",
        "timeline": [
            {
                "timestamp": "08:40 AM",
                "status": "Out for Delivery",
                "notes": "Driver en route",
                "location": "Boston Harbor Hub"
            },
            {
                "timestamp": "10:35 AM",
                "status": "Delivery Attempt Failed",
                "notes": "Security gate access code required; customer phone unavailable after 3 attempts.",
                "location": "Building Security Gate"
            }
        ],
        "createdAt": "2026-10-05T08:40:00Z",
        "updatedAt": "2026-10-05T10:35:00Z"
    },
    {
        "id": "del-14-mi-220199",
        "trackingNumber": "TRK-220199-MI",
        "recipientName": "Gabriella Diaz",
        "recipientPhone": "+1 (555) 123-4567",
        "address": "300 Biscayne Blvd Way, Miami, FL 33131",
        "status": "failed",
        "priority": "express",
        "driverName": "Carlos Rivera",
        "driverPhone": "+1 (555) 321-0987",
        "scheduledTimeWindow": "10:30 AM - 12:30 PM",
        "timeline": [
            {
                "timestamp": "09:15 AM",
                "status": "Out for Delivery",
                "notes": "Dispatched",
                "location": "Miami Bay Logistics"
            },
            {
                "timestamp": "11:40 AM",
                "status": "Delivery Attempt Failed",
                "notes": "Business closed for observed holiday. Rescheduled for next business morning.",
                "location": "Commercial Suite 400"
            }
        ],
        "createdAt": "2026-10-05T09:15:00Z",
        "updatedAt": "2026-10-05T11:40:00Z"
    },
    {
        "id": "del-15-ph-330188",
        "trackingNumber": "TRK-330188-PH",
        "recipientName": "Derrick Palmer",
        "recipientPhone": "+1 (555) 567-4321",
        "address": "1500 Market St, Philadelphia, PA 19102",
        "status": "failed",
        "priority": "standard",
        "driverName": "Jessica Taylor",
        "driverPhone": "+1 (555) 678-9012",
        "scheduledTimeWindow": "11:00 AM - 01:00 PM",
        "timeline": [
            {
                "timestamp": "09:30 AM",
                "status": "Out for Delivery",
                "notes": "Departed regional hub",
                "location": "Center City Depot"
            },
            {
                "timestamp": "12:15 PM",
                "status": "Delivery Attempt Failed",
                "notes": "Recipient address incorrect; street number does not exist.",
                "location": "Market St Block"
            }
        ],
        "createdAt": "2026-10-05T09:30:00Z",
        "updatedAt": "2026-10-05T12:15:00Z"
    },
    {
        "id": "del-16-ph-774012",
        "trackingNumber": "TRK-774012-PH",
        "recipientName": "Jonathan Reed",
        "recipientPhone": "+1 (555) 234-5678",
        "address": "200 S Broad St, Philadelphia, PA 19102",
        "status": "pending",
        "priority": "standard",
        "driverName": "Unassigned",
        "driverPhone": None,
        "scheduledTimeWindow": "02:00 PM - 04:30 PM",
        "timeline": [
            {
                "timestamp": "09:30 AM",
                "status": "Order Placed",
                "notes": "Shipment documentation validated",
                "location": "PHL Distribution Hub"
            },
            {
                "timestamp": "10:45 AM",
                "status": "Awaiting Carrier",
                "notes": "Queued for afternoon dispatch shift",
                "location": "Outbound Staging Bay 3"
            }
        ],
        "createdAt": "2026-10-05T09:30:00Z",
        "updatedAt": "2026-10-05T10:45:00Z"
    },
    {
        "id": "del-17-sd-550921",
        "trackingNumber": "TRK-550921-SD",
        "recipientName": "Kelly Zimmerman",
        "recipientPhone": "+1 (555) 345-6780",
        "address": "600 B Street, San Diego, CA 92101",
        "status": "pending",
        "priority": "standard",
        "driverName": "Unassigned",
        "driverPhone": None,
        "scheduledTimeWindow": "03:00 PM - 05:30 PM",
        "timeline": [
            {
                "timestamp": "10:00 AM",
                "status": "Order Placed",
                "notes": "Pallet scanned into sorting buffer",
                "location": "San Diego Logistics Facility"
            }
        ],
        "createdAt": "2026-10-05T10:00:00Z",
        "updatedAt": "2026-10-05T10:00:00Z"
    }
]
