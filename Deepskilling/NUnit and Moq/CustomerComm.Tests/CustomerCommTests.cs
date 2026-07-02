using NUnit.Framework;
using Moq;
using CustomerCommLib;

namespace CustomerCommLib.Tests
{
    [TestFixture]
    public class CustomerCommTests
    {
        private Mock<IMailSender> mockMailSender;

        [OneTimeSetUp]
        public void Init()
        {
            mockMailSender = new Mock<IMailSender>();
        }

        [Test]
        public void SendMailToCustomer_ShouldReturnTrue()
        {
            mockMailSender
                .Setup(x => x.SendMail(It.IsAny<string>(), It.IsAny<string>()))
                .Returns(true);

           CustomerCommLib.CustomerComm customer =
    new CustomerCommLib.CustomerComm(mockMailSender.Object);

            bool result = customer.SendMailToCustomer();

            Assert.That(result, Is.True);
        }
    }
}