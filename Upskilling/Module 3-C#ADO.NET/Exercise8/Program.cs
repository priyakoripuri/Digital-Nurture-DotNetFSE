using System;

class Student
{
    public string Name;
    public int Age;

    // Default Constructor
    public Student()
    {
        Name = "Unknown";
        Age = 0;
    }

    // Parameterized Constructor
    public Student(string name, int age)
    {
        Name = name;
        Age = age;
    }

    public void Display()
    {
        Console.WriteLine("Name: " + Name);
        Console.WriteLine("Age: " + Age);
    }
}

class Program
{
    static void Main()
    {
        Student s1 = new Student();
        Student s2 = new Student("Priya", 20);

        Console.WriteLine("Student 1:");
        s1.Display();

        Console.WriteLine("\nStudent 2:");
        s2.Display();
    }
}
