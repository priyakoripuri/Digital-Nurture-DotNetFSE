using System;

public class Calculator
{
    public int Add(int a, int b)
    {
        return a + b;
    }
}

class Program
{
    static void Main()
    {
        Calculator calc = new Calculator();

        Console.WriteLine(calc.Add(2, 3));
        Console.WriteLine(calc.Add(10, 20));
        Console.WriteLine(calc.Add(-1, 1));
    }
}
