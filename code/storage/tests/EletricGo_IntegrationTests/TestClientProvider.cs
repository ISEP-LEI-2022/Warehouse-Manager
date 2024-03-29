﻿using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using EletricGo;

namespace EletricGo_IntegrationTests {
    public class TestClientProvider {
        public HttpClient Client { get; private set; }

        public TestClientProvider() {
            var server = new TestServer(new WebHostBuilder().UseStartup<Startup>());

            Client = server.CreateClient();
        }
    }

}
