using NUnit.Framework;

namespace CalcLibrary.Tests
{
    [TestFixture]
    public class CalculatorTests
    {
        [SetUp]
        public void Setup()
        {
        }

        [TearDown]
        public void Cleanup()
        {
        }

        [TestCase(2, 3, 5)]
        [TestCase(10, 20, 30)]
        [TestCase(-1, 1, 0)]
        public void Add_Test(int a, int b, int expected)
        {
            int result = a + b;
            Assert.That(result, Is.EqualTo(expected));
        }
    }
}