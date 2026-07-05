using Microsoft.EntityFrameworkCore;
using RetailInventory;
using RetailInventory.Models;

var options = new DbContextOptionsBuilder<AppDbContext>()
    .UseSqlServer("Server=localhost;Database=RetailInventoryDB;Trusted_Connection=True;TrustServerCertificate=True;")
    .Options;

using var context = new AppDbContext(options);

// ------------------------------
// Retrieve All Products
// ------------------------------
Console.WriteLine("===== ALL PRODUCTS =====");

var products = await context.Products.ToListAsync();

foreach (var p in products)
{
    Console.WriteLine($"{p.ProductName} - ₹{p.Price}");
}

// ------------------------------
// Find by ID
// ------------------------------
Console.WriteLine();
Console.WriteLine("===== FIND BY ID =====");

var product = await context.Products.FindAsync(1);

Console.WriteLine($"Found: {product?.ProductName}");

// ------------------------------
// FirstOrDefault with Condition
// ------------------------------
Console.WriteLine();
Console.WriteLine("===== FIRST PRODUCT PRICE > 50000 =====");

var expensive = await context.Products
    .FirstOrDefaultAsync(p => p.Price > 50000);

Console.WriteLine($"Expensive: {expensive?.ProductName}");