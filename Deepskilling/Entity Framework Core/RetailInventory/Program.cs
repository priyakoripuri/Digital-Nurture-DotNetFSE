using Microsoft.EntityFrameworkCore;
using RetailInventory;
using RetailInventory.Models;

var options = new DbContextOptionsBuilder<AppDbContext>()
    .UseSqlServer("Server=localhost;Database=RetailInventoryDB;Trusted_Connection=True;TrustServerCertificate=True;")
    .Options;

using var context = new AppDbContext(options);

// Create Categories
var electronics = new Category
{
    CategoryName = "Electronics"
};

var groceries = new Category
{
    CategoryName = "Groceries"
};

await context.Categories.AddRangeAsync(electronics, groceries);

// Create Products
var product1 = new Product
{
    ProductName = "Laptop",
    Price = 75000,
    Category = electronics
};

var product2 = new Product
{
    ProductName = "Rice Bag",
    Price = 1200,
    Category = groceries
};

await context.Products.AddRangeAsync(product1, product2);

// Save to database
await context.SaveChangesAsync();

Console.WriteLine("Data inserted successfully!");