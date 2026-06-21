
using System;

class Student
{
    public string Name { get; set; }

    public Student(string name)
    {
        Name = name;
    }
}

class Program
{
    static void Main()
    {
        var number = 100;
        var text = "Hello C#";

        Student s1 = new("Priya");

        Console.WriteLine($"Value: {number}, Type: {number.GetType()}");
        Console.WriteLine($"Value: {text}, Type: {text.GetType()}");
        Console.WriteLine($"Student Name: {s1.Name}, Type: {s1.GetType()}");
    }
}