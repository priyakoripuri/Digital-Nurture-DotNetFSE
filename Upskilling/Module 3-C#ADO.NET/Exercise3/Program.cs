using System;

class Person(string name, int age)
{
    public string Name { get; set; } = name;
    public int Age { get; set; } = age;

    public void DisplayInfo()
    {
        Console.WriteLine($"Name: {Name}");
        Console.WriteLine($"Age: {Age}");
    }
}

class Program
{
    static void Main()
    {
        Person p = new Person("Sai Priya", 21);
        p.DisplayInfo();
    }
}
