using System.Collections.Generic;
using API.Entities;
using RestSharp;
using Xunit;
using Xunit.Abstractions;

namespace API.Tests.Integration
{
    public class UnitTest1
    {
        private readonly ITestOutputHelper _testOutputHelper;

        public UnitTest1(ITestOutputHelper testOutputHelper)
        {
            _testOutputHelper = testOutputHelper;
        }

        [Fact]
        public async void Test1()
        {
            var client = new RestClient();
            var req = new RestRequest("https://localhost:5001/api/users");
            var res = await client.GetAsync<IEnumerable<AppUser>>(req);
        }
    }
}
