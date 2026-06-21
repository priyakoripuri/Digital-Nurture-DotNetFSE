using System;

class Program
{
    static void Main()
    {
        Console.Write("Enter Score: ");
        int score = Convert.ToInt32(Console.ReadLine());

        // Using if-else
        if (score >= 90)
            Console.WriteLine("Grade: A");
        else if (score >= 80)
            Console.WriteLine("Grade: B");
        else if (score >= 70)
            Console.WriteLine("Grade: C");
        else if (score >= 60)
            Console.WriteLine("Grade: D");
        else
            Console.WriteLine("Grade: F");

        // Using switch expression
        string grade = score switch
        {
            >= 90 => "A",
            >= 80 => "B",
            >= 70 => "C",
            >= 60 => "D",
            _ => "F"
        };

        Console.WriteLine("Grade using switch: " + grade);
    }
}