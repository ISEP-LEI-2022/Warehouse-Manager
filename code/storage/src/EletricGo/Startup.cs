using DDDSample1.Infrastructure;
using EletricGo.Domain.Deliveries;
using EletricGo.Domain.Shared;
using EletricGo.Domain.Storages;
using EletricGo.Infrastructure;
using EletricGo.Infrastructure.Deliveries;
using EletricGo.Infrastructure.Shared;
using EletricGo.Infrastructure.Storages;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.OpenApi.Models;
using System;

namespace EletricGo
{
    public class Startup
    {

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        //string ConnectionString = "Server=tcp:arqsi.database.windows.net,1433;Database= ARQSI;Persist Security Info=False;User ID=dba;Password=123qweASD@;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
        string ConnectionString = "Server = localhost; Database= EletricGo; Integrated Security = SSPI;";
        //string ConnectionString = "tcp:local.sqlserver,1433;Database=ARQSI;User ID = SA; Password=Adminxyz22#;Trusted_Connection=False;Connection Timeout=10;";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            ConfigureMyServices(services);
            services.AddControllers().AddNewtonsoftJson();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)


        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ARQSI_1 v1"));
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            UpdateDatabase(app);

            //var context = app.ApplicationServices.GetRequiredService<DbContext>();
            //context.Database.Migrate();

        }

        private static void UpdateDatabase(IApplicationBuilder app) {
            using( var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope() ) {
                using(var context = serviceScope.ServiceProvider.GetService<DDDSample1DbContext>()) {
                    context.Database.Migrate();
                }
            }
        }

        public void ConfigureMyServices(IServiceCollection services)
        {
            //services.AddControllersWithViews().AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            //services.AddDbContext<DDDSample1DbContext>(options => options.UseSqlServer(ConnectionString).ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());


            var EnvConnectionString = Environment.GetEnvironmentVariable("DATABASE");
            if (EnvConnectionString != null) ConnectionString = EnvConnectionString;

             services.AddDbContext<DDDSample1DbContext>(options => options.UseSqlServer(ConnectionString).ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());

            

            services.AddTransient<IUnitOfWork, UnitOfWork>();


            services.AddTransient<IStorageRepository, StorageRepository>();
            services.AddTransient<StorageService>();

            //Deliveries
            services.AddTransient<IDeliveryRepository, DeliveryRepository>();
            services.AddTransient<DeliveryService>();

            //
            services.AddSwaggerGen(c => {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "ARQSI_1", Version = "v1" });
            });

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:8080");
                        policy.AllowAnyOrigin();
                    });
            });



            /*services.AddCors(o => o.AddPolicy("MyPolicy", builder => {
                builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            }));*/

        }
    }
}

