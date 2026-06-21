
using System;

class Car
{
    public string Make;
    public string Model;
    public int Year;

    // Default Constructor
    public Car()
    {
        Make = "Unknown";
        Model = "Unknown";
        Year = 0;
    }

    // Parameterized Constructor
    public Car(string make, string model, int year)
    {
        Make = make;
        Model = model;
        Year = year;
    }

    public void Display()
    {
        Console.WriteLine($"Make: {Make}");
        Console.WriteLine($"Model: {Model}");
        Console.WriteLine($"Year: {Year}");
    }
}

class Program
{
    static void Main()
    {
        Car car1 = new Car();

        Car car2 = new Car(
            "Toyota",
            "Camry",
            2024
        );

        Console.WriteLine("Car 1:");
        car1.Display();

        Console.WriteLine("\nCar 2:");
        car2.Display();
    }
}