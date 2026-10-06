from app.core.database import SessionLocal, Base, engine
from app.models.product import Product

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        if db.query(Product).count() > 0:
            print("Database already contains data, skipping seed.")
            return

        print("Seeding initial inventory products...")

        products_data = [
            ("Apex Ultra Wireless Headset", "APX-AUD-001", "Electronics", 149.99, 45, "High-fidelity active noise canceling Bluetooth 5.3 headset with 40-hour battery life."),
            ("ErgoPro Mesh Office Chair", "ERG-CHR-102", "Furniture", 289.50, 12, "Lumbar-support ergonomic desk chair with 4D armrests and breathable mesh."),
            ("Titanium Mechanical Keyboard", "KB-TIT-033", "Electronics", 129.00, 24, "Hot-swappable mechanical keyboard with RGB backlighting and tactile switches."),
            ("Streamline 4K Ultra-Wide Monitor", "DISP-4K-404", "Electronics", 499.99, 8, "34-inch curved gaming & productivity monitor with HDR400 and USB-C hub."),
            ("Precision Thermal Label Printer", "PRN-LBL-505", "Office Supplies", 89.95, 30, "High-speed 300 DPI direct thermal shipping label printer compatible with major carriers."),
            ("Rugged Barcode Scanner 2D", "SCN-RUG-606", "Warehouse", 115.00, 18, "Industrial drop-resistant handheld 2D QR and barcode scanner with Bluetooth dongle."),
            ("EcoCraft Heavy-Duty Corrugated Boxes (Pack of 25)", "BOX-CRG-707", "Packaging", 34.50, 150, "Double-walled reinforced packaging boxes suitable for ecommerce fulfillment."),
            ("AirCushion Packaging Bubble Roll (500ft)", "BBL-ROL-808", "Packaging", 42.00, 65, "Perforated lightweight air bubble cushioning roll for parcel protection."),
            ("Industrial Stretch Film (4 Rolls)", "STR-FLM-909", "Packaging", 58.75, 40, "High-cling heavy gauge pallet wrapping film for secure freight transit."),
            ("Smart Temperature & Humidity Sensor", "IOT-SEN-111", "Logistics Tech", 39.99, 85, "Wireless cold-chain sensor with real-time temperature telemetry."),
            ("Asset GPS Tracking Beacon", "GPS-TRK-222", "Logistics Tech", 79.50, 50, "Solar-assisted cellular GPS beacon for fleet container asset monitoring."),
            ("Heavy-Duty Platform Hand Truck", "TRK-PLT-333", "Warehouse", 185.00, 15, "Steel folding platform cart with 660 lbs load rating for warehouse freight handling."),
            ("High-Visibility Safety Vest (Pack of 10)", "SAF-VST-444", "Safety", 29.99, 110, "ANSI Class 2 certified reflective high-visibility safety vests with multi-pocket design."),
            ("Steel Toe Work Boots (Size 10.5)", "SAF-BOT-555", "Safety", 94.00, 28, "Waterproof puncture-resistant industrial safety work boots."),
            ("Warehouse Anti-Fatigue Floor Mat", "MAT-FAT-666", "Warehouse", 65.50, 20, "Beveled ergonomic non-slip foam mat for packing station operators."),
            ("Self-Adhesive Packing Tape (Pack of 6)", "TPE-PCK-777", "Packaging", 18.50, 200, "Commercial grade clear acrylic shipping tape for cardboard box sealing."),
            ("Electronic Postal Shipping Scale (150lb)", "SCL-PST-888", "Office Supplies", 52.00, 35, "Precision parcel weighing scale with detached LCD readout and tare function."),
            ("All-Weather Waterproof Courier Backpack", "BAG-CUR-999", "Courier Gear", 75.00, 42, "Reflective high-capacity courier bag designed for urban cycle dispatch."),
            ("USB-C Fast Charging Multi-Hub (10-Port)", "HUB-USC-101", "Electronics", 68.00, 19, "Industrial grade powered charging dock for driver dispatch mobile terminals."),
            ("Barcode Label Rewinder Machine", "REW-LBL-202", "Warehouse", 210.00, 5, "Automatic label rewinder with speed synchronization for industrial printers."),
            ("Fleet Driver First Aid Kit (OSHA)", "MED-FAK-303", "Safety", 32.50, 48, "Comprehensive 100-piece vehicle trauma and first aid kit in weatherproof case."),
            ("Handheld Inkjet Batch Date Coder", "COD-INK-404", "Warehouse", 345.00, 4, "Portable handheld batch lot and expiration date printer for boxes and pallets."),
            ("Heavy-Duty Cargo Securing Straps (4-Pack)", "STP-CRG-505", "Courier Gear", 44.90, 60, "Ratchet tie-down straps with 2000 lbs working load capacity."),
            ("Reflective Safety Traffic Cones (Pack of 6)", "CNE-TRF-606", "Safety", 49.00, 30, "Weighted orange collapsible traffic safety cones for loading bay management."),
            ("Thermal Printhead Cleaning Pens (Pack of 5)", "CLN-PRN-707", "Office Supplies", 14.50, 0, "Specialized alcohol cleaning pens for direct thermal printer maintenance.")
        ]

        for name, sku, cat, price, qty, desc in products_data:
            p = Product(name=name, sku=sku, category=cat, price=price, quantity=qty, description=desc)
            db.add(p)

        db.commit()
        print(f"Successfully seeded {len(products_data)} products into the database.")

    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
