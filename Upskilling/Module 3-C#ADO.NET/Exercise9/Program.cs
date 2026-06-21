using System;

class Program
{
    static int CalculateFactorial(int n)
    {
        int Factorial(int x)
        {
            if (x == 0 || x == 1)
                return 1;

            return x * Factorial(x - 1);
        }

        return Factorial(n);
    }

    static void Main()
    {
        int num = 5;

        Console.WriteLine("Number: " + num);
        Console.WriteLine("Factorial: " + CalculateFactorial(num));
    }
}
