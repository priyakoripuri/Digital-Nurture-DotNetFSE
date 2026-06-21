using System;

class Student
{
    public string Name;
}

class Program
{
    static void ChangeValue(int x)
    {
        x = 100;
    }

    static void ChangeReference(Student s)
    {
        s.Name = "Priya";
    }

    static void Main()
    {
        int num = 10;
        Console.WriteLine("Before ChangeValue: " + num);

        ChangeValue(num);

        Console.WriteLine("After ChangeValue: " + num);

        Student st = new Student();
        st.Name = "Sai";

        Console.WriteLine("\nBefore ChangeReference: " + st.Name);

        ChangeReference(st);

        Console.WriteLine("After ChangeReference: " + st.Name);
    }
}
